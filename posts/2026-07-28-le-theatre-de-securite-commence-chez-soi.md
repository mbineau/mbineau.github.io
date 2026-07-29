---
title: "Le théâtre de sécurité commence sur son propre dépôt"
description: "J'ai mis en place deux contrôles sur un dépôt dont j'étais le seul contributeur. L'un défendait contre une menace inexistante, l'autre ne contraignait personne."
tags: ["modèle de menace", "github", "politique de sécurité"]
---

Il est facile de repérer le théâtre de sécurité chez les autres : le contrôle qui coche une case d'audit sans rien empêcher, la politique que tout le monde contourne par le même chemin documenté. Il est nettement moins confortable de le repérer sur ses propres dépôts. Voici deux contrôles que j'avais mis en place, et que j'ai retirés.

## Contrôle n°1 — « Public » n'est pas « open bar »

**Ce que je croyais :** il fallait une branch protection pour empêcher n'importe qui sur Internet de pousser du code sur mon dépôt public.

**La réalité :** « public » veut dire lire, cloner, forker. Ça ne donne aucun droit de push. Pousser exige un accès en écriture, réservé aux collaborateurs. Mon dépôt a zéro collaborateur — personne d'autre que moi ne peut pousser, branche protégée ou pas. Je me défendais contre une menace qui n'existe pas.

**La leçon :** établir le modèle de menace — qui peut faire quoi, par quel chemin — *avant* d'empiler les contrôles. La visibilité n'est pas une permission.

Le coût d'un contrôle inutile n'est jamais nul. Il consomme de l'attention, il donne l'impression que le sujet est traité, et il rend le prochain contrôle plus difficile à justifier auprès de gens qui ont vu le précédent ne servir à rien.

## Contrôle n°2 — La branch protection en solo

**Ce que j'avais mis :** review obligatoire du `CODEOWNERS` avant tout merge sur `main`.

**La réalité :** je suis seul à avoir le droit d'écrire, et le `CODEOWNERS`, c'est moi. On ne peut pas approuver sa propre pull request. Copilot peut laisser une review, mais son approbation ne satisfait pas la règle. Résultat : la seule façon de merger, c'est de contourner en admin. Le contrôle ne me contraint pas — il fait joli.

**La leçon :** sur un dépôt solo, une gate de review humaine ne protège rien. Ce qui me protège réellement de moi-même est automatique :

- protection contre le push de secrets ;
- status checks obligatoires — c'est là que la [gate de sécurité](/projets/#pipeline-guard) a une vraie valeur contraignante ;
- blocage du force-push sur `main` ;
- commits signés.

Aucun de ces quatre contrôles ne demande un deuxième humain. Tous s'appliquent au moment où je fais l'erreur, pas au moment où quelqu'un aurait dû la relire.

## Le point commun

Les deux contrôles avaient l'air sérieux dans une capture d'écran de configuration. Aucun des deux ne changeait ce qu'il était possible de faire sur le dépôt.

C'est le test que j'applique désormais à toute règle que j'ajoute : **quelle action, concrètement, devient impossible ?** Si la réponse est « aucune, mais ça montre qu'on prend le sujet au sérieux », le contrôle n'est pas une mesure de sécurité. C'est une décoration — avec un coût de maintenance, et un effet secondaire plus gênant : il occupe la place mentale du contrôle qui, lui, aurait fonctionné.

La même logique vaut pour un contrôle qu'on contourne en permanence, [comme une gate qui crie au loup](/blog/le-faux-positif-coute-plus-cher-que-le-vrai/). Un garde-fou qu'on enjambe tous les jours n'est pas un garde-fou : c'est une marche.
