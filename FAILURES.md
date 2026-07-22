---
title: "Échecs"
description: "Journal public des échecs : ce qui a cassé, pourquoi, et ce que ça m'a appris."
layout: layouts/page.njk
permalink: /echecs/
intro: "Règle n°6 de la roadmap : noter ce qui a cassé et pourquoi. C'est le meilleur matériau de blog — et un signal de maturité rare."
---

## Failure #1 — Public ≠ open bar

**Ce que je croyais :** il fallait une branch protection pour empêcher
n'importe qui sur Internet de pousser du code sur mon repo public.

**La réalité :** "public" veut dire lire / cloner / forker. Ça ne donne
aucun droit de push. Pousser exige un accès write, réservé aux
collaborateurs. Mon repo a 0 collaborateur → personne d'autre que moi ne
peut push, protégée ou pas. Je me défendais contre une menace qui
n'existe pas.

**La leçon :** établir le modèle de menace (qui peut faire quoi, par quel
chemin) AVANT d'empiler des contrôles. La visibilité n'est pas une
permission.

## Failure #2 — Branch protection solo = théâtre

**Ce que j'avais mis :** review obligatoire du CODEOWNERS avant merge sur
main.

**La réalité :** je suis seul à avoir le droit d'écrire, et le CODEOWNERS,
c'est moi. On ne peut pas approuver sa propre PR. Copilot peut laisser une
review mais son approbation ne satisfait pas la gate. Résultat : la seule
façon de merger, c'est de bypasser en admin → le contrôle ne me contraint
pas, il fait juste joli.

**La leçon :** sur un repo solo, une gate de review humaine ne protège
rien. Ce qui me protège vraiment de moi-même est automatique : secret push
protection, status checks obligatoires, blocage du force-push sur main,
commits signés.
