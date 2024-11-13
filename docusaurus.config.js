// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
// Read the OpenAPI spec from a local file

const config = {
  title: "Mconf",
  tagline: "API Documentation",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://api.h.elos.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          path: "pages",
          routeBasePath: "pages",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
    [
      "redocusaurus",
      {
        // Plugin Options for loading OpenAPI files
        specs: [
          // Pass it a path to a local OpenAPI YAML file
          {
            // Redocusaurus will automatically bundle your spec into a single file during the build
            spec: "/opt/docusaurus/static/proxy/openapi.yaml",
            route: "/api/conference/",
          },
          {
            spec: "/opt/docusaurus/static/data/openapi.yaml",
            route: "/api/data/",
          },
          {
            spec: "/opt/docusaurus/static/administrative/openapi.yaml",
            route: "/api/administrative/",
          },
        ],
        theme: {
          // Change with your site colors
          primaryColor: "#1890ff",
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Mconf",
        logo: {
          alt: "Mconf Logo",
          src: "img/logo.svg",
        },
        items: [
          { to: "/blog", label: "What's new", position: "left" },
          { to: "/pages/guide", label: "Guide", position: "left" },
          { to: "/api/conference", label: "Conference API", position: "right" },
          { to: "/api/data", label: "Data API", position: "right" },
          {
            to: "/api/administrative",
            label: "Administrative API",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Links",
            items: [
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/mconf",
              },
              {
                label: "X",
                href: "https://x.com/mconfoficial",
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/mconfoficial/",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/mconf",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mconf, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
