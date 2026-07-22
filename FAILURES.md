---
title: "Échecs"
description: "Journal public des échecs : ce qui a cassé, pourquoi, et ce que ça m'a appris."
layout: layouts/page.njk
permalink: /echecs/
intro: "Règle n°6 de la roadmap : noter ce qui a cassé et pourquoi. C'est le meilleur matériau de blog — et un signal de maturité rare."
---

# Failure n 1 : Public does not mean open bar.

Pas besoin de faire de branch protection sur un repo public Github où personne n'est contributeur.
Seul un contributeur à les droits de push.

# Failure n 2 : Branch protection

Si je suis le seul à pouvoir pousser, demander une review à CODEOWNERS est impossible. Je suis le seul.
Copilot ne compte également pas, il peut faire une revue, mais pas approve.
