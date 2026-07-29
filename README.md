# mbineau.github.io

Portfolio & écrits — [https://mbineau.github.io](https://mbineau.github.io)

Site statique généré par [Eleventy v3](https://www.11ty.dev/), déployé sur GitHub Pages par GitHub Actions (actions épinglées au SHA, permissions minimales, OIDC). **Aucun front à écrire** : tout le contenu est du Markdown ou du JSON.

## Publier un billet

1. Copier [`POST_TEMPLATE.md`](POST_TEMPLATE.md) vers `posts/AAAA-MM-JJ-mon-slug.md` (la date de publication vient du nom du fichier).
2. Remplir le front matter (`title`, `description`, `tags`) et écrire en Markdown.
3. Commit + push sur `main`. Le billet apparaît sur `/blog/mon-slug/`, dans la liste, sur l'accueil et dans le flux Atom.

## Ajouter ou modifier un projet

Tout est dans [`_data/projects.json`](_data/projects.json). Chaque projet suit un format d'étude de cas :

| Champ | Rôle |
|---|---|
| `pitch` | Une phrase, affichée sur l'accueil |
| `problem` | Le contexte et la difficulté réelle |
| `decisions[]` | `title` + `body` — les arbitrages d'architecture qui comptent |
| `outcome` | Ce que ça donne concrètement |
| `stack[]`, `images[]`, `writeups[]` | Technos, captures (`assets/img/projects/`), billets liés |

C'est le format qui porte la crédibilité : le problème et l'arbitrage, pas la liste de fonctionnalités.

## Structure

| Chemin | Rôle |
|---|---|
| `posts/*.md` | Les billets |
| `_data/projects.json` | Les études de cas projets |
| `_data/site.json` | Titre, description, navigation |
| `a-propos.md` | Page À propos (Markdown) |
| `index.njk`, `blog.njk`, `projets.njk` | Gabarits de pages |
| `_includes/layouts/` | Layouts HTML |
| `assets/css/style.css` | Tout le style (thème sombre/clair) |
| `.github/workflows/deploy.yml` | Build + déploiement Pages |

`Roadmap.md` et `FAILURES.md` sont conservés dans le dépôt comme notes de travail mais **ne sont pas publiés** (voir `.eleventyignore`). Pour publier l'un d'eux, le retirer de ce fichier et lui ajouter un front matter `layout: layouts/page.njk` + `permalink:`.

## Dev local

```bash
npm ci
npm start        # http://localhost:8080, rechargement à la volée
```

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` : `npm ci` → `eleventy` → upload de `_site/` → déploiement Pages. La source Pages du dépôt est réglée sur « GitHub Actions ».

---

*Gabarits et mise en page échafaudés avec [Claude Code](https://claude.com/claude-code).*
