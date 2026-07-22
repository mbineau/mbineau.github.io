# mbineau.github.io

Portfolio & blog DevSecOps — [https://mbineau.github.io](https://mbineau.github.io)

Site statique généré par [Eleventy v3](https://www.11ty.dev/), déployé sur GitHub Pages par GitHub Actions (actions épinglées au SHA, permissions minimales, OIDC). **Aucun front à écrire** : tout le contenu du site est du Markdown ou du JSON.

## Publier un billet de blog

1. Copier [`POST_TEMPLATE.md`](POST_TEMPLATE.md) vers `posts/AAAA-MM-JJ-mon-slug.md` (la date de publication vient du nom du fichier).
2. Remplir le front matter (`title`, `description`, `tags`) et écrire en Markdown.
3. Commit + push sur `main`. C'est tout — le billet apparaît sur `/blog/mon-slug/`, dans la liste, sur l'accueil et dans le flux Atom (`/feed.xml`).

## Ajouter un projet

1. Poser une ou plusieurs captures d'écran dans `assets/img/projects/`.
2. Ajouter une entrée dans [`_data/projects.json`](_data/projects.json) : `name`, `slug`, `status` (`privé`/`public`), `description`, `highlights`, `stack`, `images` (`src` + `alt`), `featured` (affiché sur l'accueil).

## Modifier la roadmap ou le journal des échecs

- [`Roadmap.md`](Roadmap.md) → page `/roadmap/`
- [`FAILURES.md`](FAILURES.md) → page `/echecs/`

Ce sont des fichiers Markdown normaux ; **ne pas supprimer le bloc `---` de front matter en tête de fichier**, c'est lui qui les branche sur le site.

## Structure

| Chemin | Rôle |
|---|---|
| `posts/*.md` | Les billets de blog |
| `_data/projects.json` | Les cartes de la page Projets |
| `_data/site.json` | Titre, description, liens, navigation |
| `Roadmap.md`, `FAILURES.md` | Pages de contenu (Markdown pur) |
| `index.njk`, `blog.njk`, `projets.njk` | Gabarits des pages (à ne toucher qu'en connaissance de cause) |
| `_includes/layouts/` | Layouts HTML |
| `assets/css/style.css` | Tout le style (thème sombre/clair) |
| `.github/workflows/deploy.yml` | Build + déploiement Pages |

## Dev local (optionnel — la CI suffit pour publier)

```bash
npm ci
npm start        # http://localhost:8080, rechargement à la volée
```

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` : `npm ci` → `eleventy` → upload de `_site/` → déploiement Pages. La source Pages du repo doit être réglée sur « GitHub Actions ».

---

*Site scaffoldé avec [Claude Code](https://claude.com/claude-code) ; le contenu reste écrit à la main — c'est le front qui ne l'est pas.*
