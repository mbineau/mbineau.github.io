---
title: "À propos"
description: "Maxime Bineau — ingénieur sécurité : gates CI/CD, chaîne d'approvisionnement logicielle, durcissement de plateformes."
layout: layouts/page.njk
permalink: /a-propos/
---

Je suis ingénieur sécurité. Mon travail consiste à rendre le chemin sûr plus praticable que le raccourci : des contrôles qui s'exécutent systématiquement, dont la décision est auditable, et dont le coût d'usage reste assez bas pour que personne n'ait de raison de les contourner.

## Ce sur quoi je travaille

**Gates de sécurité CI/CD.** Orchestration multi-scanners (SAST, dépendances, IaC, secrets, audit de workflows), politique de blocage explicite et versionnée, résultats normalisés au format SARIF. La partie difficile n'est pas de faire tourner des scanners : c'est de définir un seuil qui tienne dans la durée et une exception qui reste lisible six mois plus tard.

**Sécurité de la chaîne d'approvisionnement logicielle.** Épinglage par SHA, versions d'outils verrouillées avec sommes de contrôle, parité stricte entre exécution locale et CI, audit statique des workflows eux-mêmes. Le runner de CI est le composant le plus privilégié d'une chaîne de livraison et le moins souvent examiné.

**Durcissement de plateformes.** Least privilege appliqué réellement, infrastructure décrite en code, détection branchée sur des signaux qu'on sait interpréter.

**Audit d'accès outillé.** Croiser les sources qui, séparément, ne répondent pas à la question — l'infrastructure-as-code sait quel rôle détient quel privilège, l'annuaire sait qui appartient à quel groupe, et le risque se trouve dans la jointure que personne ne calcule.

## Comment je travaille

Je construis la version qui échoue avant celle qui tient. Une politique de sécurité écrite dans l'abstrait produit des règles que personne ne peut appliquer ; une politique écrite après avoir vu le système casser produit des règles qui survivent au contact des équipes.

J'attaque ce que je construis. Un garde-fou que je ne sais pas contourner est un garde-fou dont je ne connais pas la limite — et cette limite est exactement ce qu'on me demandera en incident.

Je construis l'outil quand la question le mérite. L'IA a rendu ce coût presque nul, ce qui rend traitables des questions qu'on laissait tomber faute d'outillage — à condition de déplacer l'effort vers ce qui rend la sortie défendable : jeux de test déterministes, provenance des données, et des outils d'audit qui ne réclament aucun privilège de production. [Le détail de la méthode](/blog/construire-loutil-ne-coute-plus-rien/).

J'écris ce que je trouve, y compris quand le résultat est inconfortable. Les [écrits](/blog/) de ce site ne sont pas des tutoriels : ce sont des décisions techniques, leur raison d'être, et ce qu'elles ont coûté.

## Me contacter

Le plus simple est [GitHub](https://github.com/mbineau). Le code des projets présentés ici vit dans des dépôts privés ; je le présente volontiers de vive voix.

Ce site est [statique et open source](https://github.com/mbineau/mbineau.github.io) : aucun tracker, aucun cookie, aucune ressource tierce chargée.
