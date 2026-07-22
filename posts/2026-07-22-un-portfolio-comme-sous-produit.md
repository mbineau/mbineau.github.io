---
title: "Un portfolio comme sous-produit"
description: "Pourquoi ce site existe, ce qu'on y trouvera — et pourquoi je n'écris pas son front à la main."
tags: ["meta"]
---

Ma [roadmap](/roadmap/) a une règle n°4 : **un artefact public par projet**. Repo propre, README, write-up. Le portfolio n'est pas une phase finale qu'on fait « quand on aura le temps » — c'est un sous-produit de chaque étape. Ce site est cette règle appliquée à elle-même.

## Ce qu'on trouvera ici

- Des **write-ups** au format qui me sert de discipline : *ce que je voulais faire → comment ça a cassé → ce que j'ai compris → comment je l'ai sécurisé*.
- Les [projets](/projets/), avec de vraies captures d'écran plutôt que des promesses.
- La [roadmap](/roadmap/) complète, publique, avec ses « Definition of Done ».
- Un [journal des échecs](/echecs/) — règle n°6 : noter ce qui a cassé et pourquoi.

## Ce que ce site n'est pas

Une démo de frontend. Je n'ai aucune envie d'écrire du CSS à la main et je n'y trouve aucune valeur : mon sujet, c'est la plateforme et sa sécurité. Le front est donc traité comme tout le reste de mon outillage — **généré, versionné, déployé par la CI**. Publier un billet, c'est pousser un fichier Markdown sur `main`. Rien d'autre.

La pipeline de déploiement suit les règles que j'applique partout ailleurs : permissions minimales, actions épinglées au SHA du commit (pas de tag mutable), publication vers GitHub Pages via OIDC.

```yaml
permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
```

L'intégralité du workflow est [dans le repo](https://github.com/mbineau/mbineau.github.io/blob/main/.github/workflows/deploy.yml) — le site est sa propre démonstration.

Prochain billet : un vrai, sur la gate de sécurité multi-dépôts. En attendant, les [échecs](/echecs/) sont déjà en ligne — c'est par là que tout commence.
