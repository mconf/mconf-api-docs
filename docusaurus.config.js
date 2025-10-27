// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
// Read the OpenAPI spec from a local file

// Check if internal APIs should be shown
const showInternalAPIs = process.env.SHOW_INTERNAL_APIS === "true";

// Base API specs (always included)
const baseSpecs = [
  {
    id: "conference-api",
    spec: "static/proxy/openapi.yaml",
    route: "/api/conference/",
    url: "/proxy/openapi.yaml",
  },
];

// Conditionally add internal APIs
if (showInternalAPIs) {
  baseSpecs.push(
    {
      id: "data-api",
      spec: "static/data/openapi.yaml",
      route: "/api/data/",
      url: "/data/openapi.yaml",
    },
    {
      id: "administrative-api",
      spec: "static/administrative/openapi.yaml",
      route: "/api/administrative/",
      url: "/administrative/openapi.yaml",
    }
  );
}

// Base navbar items (always included)
const baseNavbarItems = [
  // { to: "/blog", label: "What's new", position: "left" },
  { to: "/pages/guide", label: "Guide", position: "left" },
  { to: "/api/conference", label: "Conference API", position: "right" },
];

// Conditionally add internal API navbar items
if (showInternalAPIs) {
  baseNavbarItems.push(
    { to: "/api/data", label: "Data API", position: "right" },
    {
      to: "/api/administrative",
      label: "Administrative API",
      position: "right",
    }
  );
}

const config = {
  title: "Elos API Documentation",
  // tagline: "API Documentation",
  favicon: "img/favicon.svg",

  // Set the production url of your site here
  // In dev mode, use port 3000; in prod, use default port 80
  url: process.env.SITE_URL,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs/",

  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // To use in client side
  customFields: {
    showInternalAPIs: showInternalAPIs,
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
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ["rss", "atom"],
        //     xslt: true,
        //   },
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: "warn",
        //   onInlineAuthors: "warn",
        //   onUntruncatedBlogPosts: "warn",
        // },
        blog: false, // Disable blog
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
    [
      "redocusaurus",
      {
        // Plugin Options for loading OpenAPI files
        specs: baseSpecs, // Use dynamic specs array
        theme: {
          // Change with your site colors
          primaryColor: "#2cccd3",
          options: {
            hideDownloadButton: false,
            disableSearch: false,
            hideSingleRequestSampleTab: true,
            menuToggle: true,
            nativeScrollbars: false,
            hideLoading: false,
            theme: {
              sidebar: {
                width: "0px",
              },
            },
          },
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/logo.svg",
      navbar: {
        // title: "Elos",
        logo: {
          alt: "Elos Logo",
          src: "img/logo.svg",
        },
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Links",
            items: [
              {
                label: "Elos",
                href: "https://elos.vc/",
              },
              {
                label: "About Mconf",
                href: "https://elos.vc/site/sobre-a-mconf/",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Elos `,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
