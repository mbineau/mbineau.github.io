---
title: "127.0.0.1 ne veut pas dire « local »"
description: "J'ai ajouté à mon dashboard une vue qui lit mes dépôts privés. Le travail intéressant n'était pas la fonctionnalité — c'était de ne pas transformer un tableau de bord local en fuite de données privées."
tags: ["api", "ci/cd", "modèle de menace"]
---

Mon [dashboard de gate de sécurité](/projets/#security-gate-dashboard) ne connaissait qu'une seule chose : les runs que le runner lui envoie après un scan. Utile, mais partiel — il ne savait pas quels workflows GitHub avaient tourné, ni quelles pull requests avaient des checks rouges. Un collègue maintient un moniteur GitHub Actions dont je me suis inspiré ; j'ai ajouté deux vues, Pull Requests et Actions, qui montrent ce que **GitHub lui-même rapporte**, à côté de ce que la gate décide.

La fonctionnalité est simple. Ce qui méritait de la réflexion, c'est qu'elle change la nature du service : jusque-là, le backend ne servait que des données que je lui avais poussées. Maintenant, il proxifie mon accès à des dépôts privés. Deux décisions en découlent.

## Le credential n'entre jamais dans le processus

Le réflexe serait de créer un token GitHub, de le mettre dans une variable d'environnement et d'appeler l'API REST. Le backend détiendrait alors un secret à long terme, avec tout ce que ça implique : il peut fuiter dans un log, dans une trace d'exception, dans une réponse d'erreur un peu bavarde, dans un core dump.

À la place, le module appelle le CLI `gh`, qui gère déjà son authentification :

```python
def _gh(args: List[str], timeout: int = 25):
    """Run `gh` with an argv list (never a shell) and parse its JSON output."""
    if not gh_available():
        raise GitHubError("the `gh` CLI is not installed or not on PATH")
    proc = subprocess.run(["gh", *args], capture_output=True, text=True, timeout=timeout)
```

Le processus ne détient aucun credential GitHub. Il ne peut donc pas en divulguer un. L'authentification reste là où elle est déjà gérée, chiffrée et révocable indépendamment — et si le dashboard est compromis, l'attaquant récupère un accès à un CLI sur ma machine, pas un token exfiltrable qu'il peut rejouer ailleurs.

Deux détails comptent dans ces quatre lignes. L'appel passe une **liste d'arguments, jamais une chaîne shell** : les noms de dépôts viennent de la base et n'ont donc rien à faire dans une invocation `sh -c`. Et il y a un `timeout` : un sous-processus sans limite de temps est une façon discrète de bloquer un worker.

Chaque couple (ressource, dépôt) est mis en cache une quarantaine de secondes, pour qu'un tableau de bord qui se rafraîchit ne consomme pas le quota d'API.

## Le piège : « local » ne se lit pas sur l'adresse du client

Ces endpoints exposent des données de dépôts privés, et ce backend n'a pas d'authentification propre. Il faut donc les garder. La règle évidente s'écrirait ainsi :

```python
if request.client.host not in ("127.0.0.1", "::1"):
    raise HTTPException(403)
```

Elle est fausse dans mon architecture, et elle l'est de façon silencieuse.

Ce backend est **conçu pour être exposé à travers un tunnel** : c'est comme ça que la CI lui envoie ses runs depuis GitHub Actions. Or le tunnel s'exécute sur cette machine. Une requête qui vient d'Internet, traverse le tunnel et ressort en local **arrive elle aussi depuis 127.0.0.1**. Le contrôle ci-dessus l'aurait laissée passer : le jour où je relance le tunnel pour une démo CI, j'ouvre au passage mes dépôts privés à quiconque connaît l'URL.

L'adresse du pair ne distingue pas les deux cas. Ce qui les distingue, c'est **l'en-tête `Host`** — seul lui porte la trace du nom par lequel le client a demandé le service :

```python
allowed = set(_LOCAL_HOSTS) | {...}   # + SGD_ALLOWED_HOSTS
host_header = (request.headers.get("host") or "").lower()
hostname = host_header.rsplit(":", 1)[0]
peer = request.client.host if request.client else ""
if hostname not in allowed or peer not in _LOCAL_HOSTS:
    raise HTTPException(status_code=403, detail="GitHub tracking is local-only …")
```

Les deux conditions sont exigées, pas l'une ou l'autre. Et vérifier le `Host` a un second bénéfice, gratuit : ça **neutralise le DNS rebinding**. Une page malveillante peut faire pointer son domaine vers 127.0.0.1 et demander au navigateur de la victime d'appeler le service local ; l'adresse du pair sera bien locale, mais le navigateur enverra `Host: attaquant.example`, qui n'est pas dans la liste.

Quand un token d'API est configuré, la règle bascule : un bearer valide est exigé, et il fonctionne à travers le tunnel — c'est le même credential que la CI utilise déjà. Sans token configuré, l'accès est strictement local. Il n'existe pas d'état où ces endpoints sont joignables sans l'un ou l'autre.

## Normaliser ce que GitHub raconte

Le reste est du travail de modélisation, moins risqué mais pas moins nécessaire. GitHub décrit l'état d'un run avec **deux champs** — `status` et `conclusion` — dont la combinaison ne se lit pas d'un coup d'œil. L'API les expose tels quels ; une interface ne peut pas.

Ils sont donc réduits à un seul état d'affichage, dont un que je tenais à rendre visible : `awaiting_approval`. Un workflow bloqué en attente d'approbation manuelle n'est ni en échec, ni en cours, ni réussi — c'est un run qui attend un humain, et c'est exactement le genre d'état qui reste invisible pendant deux jours.

Pour les pull requests, les checks individuels sont aplatis **le pire en premier**, et les drapeaux dérivés sont calculés côté backend plutôt que dans l'interface : `ready_to_merge` signifie approuvée, non brouillon, sans conflit, checks ni rouges ni en cours. La définition vit à un seul endroit, comme [la décision de gate](/blog/ma-gate-a-bloque-son-propre-build/) : une règle recopiée dans le front finit par diverger de celle du back, et c'est celle qu'on lit à l'écran qui donne le faux sentiment de sécurité.

## Ce que je n'ai pas construit

Une vue « déploiements » aurait été le troisième onglet évident. Ces dépôts n'ont ni environnements ni déploiements : la page serait vide. C'est le même raisonnement que pour [mes métriques qui ne sont pas DORA](/blog/mes-metriques-ne-sont-pas-dora/) — un écran qui promet une information qu'il n'a pas est pire qu'un écran absent.

Et une chose que je dois encore à ce code : le garde-fou décrit plus haut **n'a pas de test**. C'est la pièce la plus sensible de tout l'ajout, et la seule dont la régression serait silencieuse — rien ne casse visiblement le jour où elle laisse passer une requête tunnelée. Un test qui affirme qu'un `Host` étranger est rejeté même depuis 127.0.0.1, c'est dix lignes. C'est la prochaine chose que j'écris.
