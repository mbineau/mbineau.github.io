---
title: "Un tag n'est pas une version"
description: "J'avais laissé une action GitHub épinglée sur un tag, exprès, comme finding de démonstration. Le tag a été compromis pour de vrai."
tags: ["supply chain", "github actions"]
---

Dans Pipeline Guard, ma gate de sécurité réutilisable, une action tierce était volontairement épinglée sur un tag plutôt que sur un SHA de commit :

```yaml
uses: aquasecurity/trivy-action@0.28.0
```

C'était délibéré. L'audit de workflows ([zizmor](https://github.com/zizmorcore/zizmor)) tourne sur le repo et lève `unpinned-uses` en sévérité haute sur cette ligne — un finding réel, sur du vrai code, pour prouver que la gate attrape quelque chose. Une vulnérabilité de démonstration, en somme.

Puis `aquasecurity/trivy-action` a été touché par une attaque sur la chaîne d'approvisionnement. Les mainteneurs ont réagi en migrant tous les tags vers une convention préfixée `v` et en retirant les tags de version nus. Mon pipeline pointait sur `0.28.0` — désormais un tag considéré comme compromis. Le job Trivy est tombé.

## Ce que ça dit exactement

Un tag Git est un pointeur mutable. `@0.28.0` ne désigne pas un contenu, il désigne *ce que le mainteneur a décidé que `0.28.0` signifie aujourd'hui*. Entre le moment où vous lisez le code d'une action et le moment où elle s'exécute sur votre runner avec vos secrets en variables d'environnement, ce pointeur peut avoir bougé. Un SHA de commit, lui, désigne un contenu — c'est la seule référence qu'un attaquant ne peut pas réécrire sous vos pieds.

C'est précisément le modèle de menace que `unpinned-uses` décrit. Je l'avais mis en démonstration. La réalité s'est chargée de la démonstration à ma place.

## Le correctif, et son honnêteté

```yaml
# avant — tag compromis
uses: aquasecurity/trivy-action@0.28.0

# après
uses: aquasecurity/trivy-action@v0.36.0
```

Un autre tag. Pas un SHA. C'est un choix assumé et il mérite d'être expliqué plutôt que caché : ce repo *a besoin* de conserver ce finding, c'est sa raison d'être pédagogique. Épingler au SHA ferait passer la gate au vert et supprimerait le seul cas de test réel de l'audit `unpinned-uses`.

Ailleurs, la règle ne souffre aucune exception. Sur les dépôts que je durcis pour de bon, tout est épinglé au SHA, avec le tag en commentaire pour rester lisible :

```yaml
- uses: actions/checkout@fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09 # v5
- uses: actions/setup-python@a26af69be951a213d495a4c3e4e4022e16d87065 # v5
```

Le commentaire n'est pas décoratif : sans lui, plus personne ne sait quelle version tourne, et une dépendance qu'on ne sait pas lire est une dépendance qu'on ne met jamais à jour.

## Ce que j'en retiens

La leçon n'est pas « épinglez vos actions » — tout le monde l'a déjà lue quelque part. Elle est plus désagréable : **j'avais identifié le risque, je l'avais documenté, je l'avais même instrumenté, et je l'ai quand même pris.** Parce que la ligne était dans un repo de démonstration, dans une catégorie mentale « pas vraiment de la prod ».

Un runner CI qui exécute une action tierce a accès au checkout, au token du job et aux secrets qu'on lui passe. Il n'y a pas de repo de démonstration dans la chaîne d'approvisionnement : il n'y a que des machines qui exécutent du code que quelqu'un d'autre contrôle.
