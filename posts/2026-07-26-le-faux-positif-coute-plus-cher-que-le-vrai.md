---
title: "Le faux positif coûte plus cher que le vrai"
description: "Quatre secrets détectés dans un jeu de données généré de 40 Mo. Aucun n'en était un. Comment on règle ça sans désarmer le scanner — et la vraie vulnérabilité trouvée dans la même passe."
tags: ["secrets", "gitleaks", "politique de sécurité"]
---

Gitleaks a remonté quatre `generic-api-key` sur un dépôt que je venais d'équiper d'une gate bloquante. Quatre secrets critiques, donc build rouge, donc plus personne ne merge.

Aucun des quatre n'était un secret.

Ils se trouvaient tous dans `snowflake-rights-site/public/data/*.json` : environ 40 Mo de données générées par la machine — noms de rôles, identifiants, empreintes — dont les longues chaînes alphanumériques à forte entropie déclenchent l'heuristique `generic-api-key`. Le scanner faisait exactement ce qu'on lui demande. Le problème n'était pas la détection, c'était le contexte.

## Les trois issues, et pourquoi j'ai choisi la troisième

**Désactiver la règle `generic-api-key`.** C'est la règle qui attrape les clés qui ne ressemblent à rien de connu — donc précisément celles qu'aucune règle spécifique ne rattrapera. La retirer globalement pour quatre faux positifs, c'est éteindre le détecteur de fumée parce qu'on a fait brûler des toasts.

**Sortir Gitleaks du seuil bloquant.** Une gate qui ne bloque pas sur les secrets ne sert à rien. Un secret committé est déjà dans l'historique, déjà répliqué sur chaque clone, déjà à révoquer.

**Restreindre l'exception aux chemins concernés.** C'est ce que j'ai fait :

```toml
# Gitleaks configuration (auto-loaded by `gitleaks dir` from the repo root).
[extend]
useDefault = true

[allowlist]
description = "Generated analysis data artifacts (not secrets)"
paths = [
  '''snowflake-rights-site/public/data/.*\.json''',
]
```

Le jeu de règles par défaut reste entier — `useDefault = true`. L'exception est nominative, limitée à des artefacts générés, et surtout : **elle est versionnée dans le dépôt, en clair, avec la justification à côté.** La prochaine personne qui se demande pourquoi ces fichiers ne sont pas scannés a la réponse dans le même commit.

Un détail d'implémentation qui a pesé dans le choix : depuis la 8.30, Gitleaks charge automatiquement `.gitleaks.toml` depuis la racine du scan. La CI et le runner que je fais tourner en local honorent donc la même configuration, sans qu'on ait à la passer en argument des deux côtés. Une exception qui n'existe que dans la CI est une exception que personne ne voit et que le scan local contredira six mois plus tard.

## Pendant ce temps, la vraie vulnérabilité

La même passe de réglage a remonté autre chose, sur le même dépôt : `sharp`, tiré en dépendance transitive par `next`, dans une version affectée par [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) (CVE libvips). Rien à voir avec du code écrit à la main — une bibliothèque de traitement d'images embarquée trois niveaux plus bas dans l'arbre de dépendances, que personne n'a choisie explicitement.

Corrigée en forçant la résolution :

```json
"overrides": {
  "sharp": ">=0.35.0"
}
```

C'est tout l'argument, en une seule passe : **le bruit et le signal arrivent par le même canal.** Si le build est rouge en permanence à cause de quatre faux positifs dans un fichier de données, la vulnérabilité transitive réelle est noyée dans le même rouge — et l'équipe prend l'habitude de merger malgré la gate. À ce stade, la gate n'a plus aucune valeur défensive ; elle ne produit plus que de la friction et un faux sentiment de couverture.

## Le principe

Régler un scanner n'est pas l'affaiblir. C'est la condition pour qu'il reste allumé.

Une politique de sécurité se juge à ce qu'elle produit en pratique, pas à sa sévérité sur le papier. Trois critères, que j'applique à chaque exception :

1. **Nominative** — un chemin, une règle, jamais une catégorie entière.
2. **Justifiée sur place** — la raison est dans le fichier de configuration, pas dans un ticket fermé depuis.
3. **Symétrique** — même configuration en local et en CI, sinon l'exception dérive.

Le taux de faux positifs n'est pas une métrique de confort pour les développeurs. C'est une métrique de sécurité : au-delà d'un certain seuil, il détermine si votre gate protège encore quoi que ce soit.
