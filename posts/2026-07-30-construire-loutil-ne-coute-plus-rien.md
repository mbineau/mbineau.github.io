---
title: "Construire l'outil ne coûte plus rien. Le croire, si."
description: "J'utilise l'IA pour construire les outils qui répondent à mes questions de sécurité. Ce qui prend le temps n'est plus l'écriture du code — c'est le harnais qui rend la sortie défendable."
tags: ["méthode", "ia", "audit d'accès"]
---

En sécurité, la même situation revient sans arrêt : on a une question précise, et y répondre exige un outil qui n'existe pas.

« Quelles personnes détiennent réellement des droits d'écriture sur la production ? » n'est pas une question exotique. Elle est pourtant sans réponse dans la plupart des organisations, parce que les privilèges vivent dans un dépôt d'infrastructure et les identités dans un annuaire, et que la jointure entre les deux — héritage de rôles compris — n'est calculée nulle part. Historiquement, il y avait deux issues : acheter un produit qui prétend le faire, ou ne pas répondre à la question. Construire soi-même coûtait plusieurs semaines, ce qui n'est jamais arbitrable pour lever un doute.

Ce coût s'est effondré. Une idée peut devenir un outil qui tourne en quelques jours. C'est ainsi que j'ai construit mon [explorateur de droits Snowflake](/projets/#snowflake-rights-explorer), et c'est une bonne nouvelle : les questions de sécurité qui restaient sans réponse parce que l'outillage n'en valait pas la peine deviennent traitables.

Mais l'économie du problème s'est déplacée, elle n'a pas disparu.

## Le goulot d'étranglement a changé de place

Quand construire coûtait cher, la difficulté était de produire l'outil. Maintenant que produire l'outil est presque gratuit, la difficulté est de **justifier ce qu'il affiche**.

Et en sécurité, cette difficulté n'est pas académique. Un outil d'analyse qui se trompe avec assurance est pire que pas d'outil du tout : il produit un rapport propre, lisible, et il **clôt la question**. Personne ne rouvre un sujet marqué comme traité. Un parseur de droits qui perd silencieusement une arête d'héritage ne renvoie pas une erreur — il renvoie une liste plus courte, qui ressemble en tout point à une bonne nouvelle.

C'est là que va désormais l'essentiel de mon travail. Trois choses, systématiquement.

## 1. Figer la sémantique avec un jeu de test déterministe

Sur l'explorateur de droits, la valeur tient entièrement à l'exactitude d'une jointure : rôle → privilège → groupe → personne, héritage transitif inclus. Le code qui la calcule peut être écrit vite. Ce qui ne peut pas l'être, c'est la garantie qu'il reste juste après la prochaine modification.

D'où une petite fixture déterministe qui couvre exprès les cas où la logique se casse en silence : un rôle qui hérite sur plusieurs niveaux, un utilisateur déclaré directement plutôt que par un groupe, l'expansion des grants génériques et « future », la propriété d'objet, les accès par environnement. Les tests s'exécutent à chaque changement.

Le critère de choix des cas n'est pas la couverture de code. C'est **la direction de l'erreur** : je teste en priorité ce qui, en cassant, produirait une sous-estimation des privilèges. Une sur-estimation fait perdre du temps ; une sous-estimation fait signer une revue d'accès fausse.

## 2. Porter la provenance jusqu'à la feuille

Mon [entraîneur de certification](/projets/#snowpro-core-trainer) contient 625 questions avec justifications, dont une large majorité a été rédigée à partir de la documentation officielle. Générer ce volume est trivial. Le rendre utilisable ne l'est pas : une justification fausse s'apprend aussi bien qu'une vraie, et avec la même conviction.

Chaque question porte donc son origine, et chaque leçon liste les pages exactes dont elle est tirée, sur un instantané daté. La règle est simple : **du contenu généré qu'on ne peut pas retracer est du contenu qu'on ne peut pas corriger.** Le jour où un comportement produit change — et sur un service qui livre chaque semaine, ça arrive — je dois pouvoir retrouver tout ce qui dépendait du fait devenu faux, sans relire six cents items.

La traçabilité a payé immédiatement, dans une direction que je n'attendais pas : elle a mis en évidence qu'un guide tiers largement diffusé décrivait encore la pondération de l'ancien référentiel d'examen. Sans provenance explicite, cette erreur se serait propagée silencieusement dans la banque.

## 3. Faire en sorte que l'outil n'ait besoin d'aucun privilège

Le générateur de l'explorateur ne se connecte jamais à Snowflake. Il lit l'intention déclarée dans l'infrastructure-as-code et conserve comme motifs les cas qui exigeraient une connexion vivante. C'est une limite assumée : certaines expansions restent des motifs au lieu d'être résolues.

Je la préfère largement à l'alternative. Un outil d'audit d'accès qui réclame des identifiants de production **devient lui-même un chemin privilégié** — un nouveau détenteur de secrets, une nouvelle cible, justifiés par l'envie de mesurer la surface d'attaque. On ne réduit pas un risque en en créant un autre du même ordre. Accessoirement, un outil qui ne demande aucun accès est un outil qu'on peut faire tourner tout de suite, sans traverser trois validations — et un audit qu'on exécute vraiment vaut mieux qu'un audit exhaustif qui attend son habilitation.

## Ce que l'IA n'a pas changé

Elle a changé qui écrit le code. Elle n'a pas changé qui répond de la sortie.

Le raisonnement est le même que pour [des métriques qu'on refuse d'appeler DORA](/blog/mes-metriques-ne-sont-pas-dora/) : ce qui compte n'est pas de produire un chiffre ou un rapport, c'est de pouvoir en défendre la définition et les limites devant quelqu'un de compétent. Un outil construit en trois jours et un outil acheté à prix d'or échouent exactement au même test — celui de la première question précise sur la façon dont le résultat a été obtenu.

La différence, c'est que sur l'outil que j'ai construit, j'ai la réponse.
