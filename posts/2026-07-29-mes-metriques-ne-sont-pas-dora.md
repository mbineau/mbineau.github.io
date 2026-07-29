---
title: "Mes métriques ne sont pas DORA, et le dashboard le dit"
description: "Il est très tentant d'appeler DORA quatre chiffres calculés sur des données de CI. J'ai préféré les appeler des analogies — et l'écrire dans l'interface."
tags: ["métriques", "dashboard", "honnêteté technique"]
---

Mon dashboard de gate de sécurité affiche un onglet de métriques. Taux de blocage, temps de retour au vert, findings dans le temps, répartition par catégorie. Quatre chiffres qui ressemblent beaucoup à DORA, calculés sur les runs de gate de plusieurs dépôts.

Ils ne sont pas DORA. L'interface le dit, en toutes lettres, sous le titre.

## Ce que je n'ai pas

Le *Change Failure Rate* mesure la proportion de déploiements qui dégradent la production. Le *MTTR* mesure le temps de rétablissement d'un service après un incident.

Mes données n'ont ni déploiement, ni production, ni incident. Elles ont des scans de sécurité déclenchés sur des commits et des pull requests. Ce que je peux calculer honnêtement :

- **Taux de blocage** — la part des runs dont la gate a bloqué la livraison. C'est un *analogue* du Change Failure Rate : ce sont des changements arrêtés avant la production, pas des changements qui l'ont cassée. Le sens est presque inversé — un taux de blocage élevé peut signifier que la gate fait bien son travail.
- **Temps de retour au vert** — la durée entre un run bloquant et le premier run vert suivant, sur le même dépôt. C'est un analogue du MTTR sur un périmètre entièrement différent : on mesure la réactivité d'une équipe face à un finding de sécurité, pas le rétablissement d'un service en panne.

## Pourquoi je ne les appelle pas DORA quand même

Parce que la première personne compétente qui regarde le dashboard le verra en dix secondes, et que tout le reste deviendra suspect.

C'est le calcul qui compte : appeler ces chiffres « DORA » achète une crédibilité immédiate auprès de ceux qui ne creusent pas, et la détruit auprès de ceux qui creusent. Or les seules personnes dont l'avis compte sur un tableau de bord de sécurité sont exactement celles qui creusent. Il n'y a aucune version de ce compromis où mentir est rentable.

Il y a aussi une raison plus pratique. Une métrique mal nommée finit dans une revue trimestrielle, puis dans un objectif d'équipe. Le jour où quelqu'un fixe une cible sur un « MTTR » qui mesure en réalité un délai de correction de findings, on optimise une chose en croyant en piloter une autre — et le plus souvent en fermant des findings plutôt qu'en les corrigeant.

## Ce que ça change dans le produit

L'onglet porte la mention explicite en sous-titre : ce sont des analogues DevSecOps de DORA, mesurés sur la gate, et il n'y a pas de données de déploiement ici. Chaque tuile porte son étiquette — « CFR analog », « MTTR analog (red→green) ».

Le coût est nul. Le bénéfice, c'est qu'on peut discuter des chiffres pour ce qu'ils sont : le taux de blocage descend-il parce que le code s'améliore, ou parce que quelqu'un a relevé le seuil ? Le temps de retour au vert d'un dépôt est-il court parce que l'équipe est réactive, ou parce que les findings y sont triviaux ? Ce sont des conversations intéressantes. On ne peut les avoir qu'avec des métriques dont on assume le périmètre exact.

Une métrique de sécurité dont on ne peut pas défendre la définition en réunion n'est pas une métrique. C'est un argument de vente, et il se retournera.
