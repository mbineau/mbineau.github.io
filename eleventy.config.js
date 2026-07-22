import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTaskLists from "markdown-it-task-lists";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "posts", limit: 20 },
    metadata: {
      language: "fr",
      title: "Maxime Bineau — DevSecOps",
      subtitle:
        "Sécurité des plateformes, CI/CD, Kubernetes, supply chain — appris en construisant.",
      base: "https://mbineau.github.io/",
      author: { name: "Maxime Bineau" },
    },
  });

  eleventyConfig.amendLibrary("md", (md) =>
    md
      .use(markdownItAnchor, {
        permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
      })
      .use(markdownItTaskLists, { enabled: false, label: false })
  );

  const dateFrFmt = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  eleventyConfig.addFilter("dateFr", (d) => dateFrFmt.format(d));
  eleventyConfig.addFilter("dateIso", (d) => d.toISOString().slice(0, 10));
  eleventyConfig.addFilter("newestFirst", (arr) =>
    [...arr].sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    // Les .md restent du pur Markdown : pas de pré-traitement Nunjucks,
    // pour que les blocs de code GitHub Actions (`${{ ... }}`) passent tels quels.
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
