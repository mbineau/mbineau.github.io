---
# ── Modèle de billet ─────────────────────────────────────────────
# 1. Copier ce fichier vers : posts/AAAA-MM-JJ-mon-slug.md
#    (la date de publication vient du nom du fichier ;
#     l'URL sera https://mbineau.github.io/blog/mon-slug/)
# 2. Remplir le front matter ci-dessous, écrire en Markdown.
# 3. Commit + push sur main → le billet est en ligne.
# ─────────────────────────────────────────────────────────────────
title: "Titre du billet"
description: "Une phrase de résumé — affichée dans la liste des billets, le flux Atom et les partages."
tags: ["kubernetes", "supply-chain"]
---

L'accroche : ce que je voulais faire, en deux ou trois phrases.

## Comment ça a cassé

Le récit honnête, avec les vrais messages d'erreur.

```bash
kubectl get pods -A        # les blocs de code sont colorés automatiquement
```

## Ce que j'ai compris

- Point clé n°1.
- Point clé n°2.

## Comment je l'ai sécurisé

Pour insérer une image : la poser dans `assets/img/blog/`, puis :

![Texte alternatif décrivant l'image](/assets/img/blog/mon-image.png)

> Une citation, un avertissement ou un rappel important.
