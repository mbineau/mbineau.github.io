---
title: "Ma gate de sécurité a bloqué son premier build : le sien"
description: "Déploiement d'une gate bloquante sur deux dépôts réels. Le premier rouge ne venait pas du code applicatif, mais du workflow de la gate elle-même."
tags: ["ci/cd", "supply chain", "retour d'expérience"]
---

J'ai déployé la même gate de sécurité bloquante — Trivy, Semgrep, Gitleaks, versions épinglées — sur deux dépôts privés réels : une application Flutter/Dart et un outil d'analyse de droits en TypeScript et Python. Un fichier de workflow, un seuil (`CRITICAL,HIGH`), et le build échoue si quelque chose passe le seuil.

Le premier run a été rouge sur les deux. Pas à cause du code applicatif.

## Les findings venaient du workflow de la gate

Deux règles, levées par la gate contre le fichier qui la définit :

**`gha-curl-pipe-shell`** — la gate installait ses propres scanners comme ceci :

```bash
curl -sSfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh \
  | sh -s -- -b "$HOME/.local/bin" v0.72.0
```

Le numéro de version est épinglé, mais le script d'installation, lui, est récupéré depuis `main` et exécuté immédiatement. Autrement dit : à chaque build, ma gate de sécurité téléchargeait du code arbitraire depuis une branche mouvante et le passait à `sh`, avec le checkout et le token du job à portée.

**`github-actions-mutable-action-tag`** — `actions/checkout@v5`, `actions/setup-python@v5`. Des pointeurs mutables, [pour les raisons que j'ai détaillées ici](/blog/un-tag-nest-pas-une-version/).

## Le correctif

Des tarballs de release épinglés, vérifiables, au lieu du pipe vers le shell :

```bash
# Trivy — tarball de release épinglé (plus de curl|sh)
curl -sSfL -o /tmp/trivy.tgz \
  https://github.com/aquasecurity/trivy/releases/download/v0.72.0/trivy_0.72.0_Linux-64bit.tar.gz
tar -xzf /tmp/trivy.tgz -C "$HOME/.local/bin" trivy
```

Plus le SHA-pinning des actions, et un ajustement du seuil Semgrep sur lequel je reviens plus bas. Les deux dépôts sont passés au vert le jour même, et `main` exécute la gate bloquante depuis.

## Pourquoi c'est le bon résultat, et pas un échec

Il aurait été très facile de traiter ces findings comme du bruit. Ils ne concernaient pas le produit, ils concernaient la tuyauterie ; l'application Flutter, elle, était propre. La tentation d'ajouter une exclusion sur `.github/` est réelle — et c'est exactement comme ça que les gates deviennent décoratives.

Une gate de sécurité **fait partie de la chaîne d'approvisionnement qu'elle audite**. Elle s'exécute avant le code applicatif, avec au moins autant de privilèges, et c'est la première chose qu'un attaquant qui vise la CI regardera. Un scanner qui s'exempte lui-même de sa propre politique produit une conformité en trompe-l'œil : le voyant est vert et personne n'a regardé le seul composant qui a accès à tout.

Le fait que le premier finding de la gate ait été la gate elle-même n'est pas un raté du déploiement. C'est la preuve qu'elle regarde au bon endroit.

## Le réglage qui restait à faire

Un dernier point sur le seuil. Semgrep tournait initialement avec `--error` sur l'ensemble des findings, ce qui rendait bloquantes des remontées de sévérité moyenne — une fonction de hachage `sha1` utilisée pour générer un slug non cryptographique, un appel `urllib` dynamique vers une API connue. Des choses à savoir, pas des choses qui doivent arrêter une livraison.

```bash
semgrep scan --config p/default --severity ERROR --error --quiet .
```

Les moyennes sont remontées, pas bloquantes — cohérent avec le seuil `CRITICAL,HIGH` appliqué à Trivy. Une politique qui bloque sur tout est une politique que la première personne pressée contournera, et elle aura raison. Le sujet mérite [son propre billet](/blog/le-faux-positif-coute-plus-cher-que-le-vrai/).
