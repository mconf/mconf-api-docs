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

// Check design variant to use
const designVariant = process.env.THEME || "default";

// Get CSS file
const getCSSPath = (variant) => {
  switch (variant) {
    case "confweb":
      return "./src/css/custom-confweb.css";
    case "elos":
      return "./src/css/custom.css";
    case "default":
    default:
      return "./src/css/custom.css";
  }
};

// Get logo file
const getLogoPath = (variant) => {
  switch (variant) {
    case "confweb":
      return "img/logo-conf-web.svg";
    case "elos":
      return "img/logo.svg";
    case "default":
    default:
      return "img/logo.svg";
  }
};

// Get dark mode logo file
const getDarkLogoPath = (variant) => {
  switch (variant) {
    case "confweb":
      return "img/logo-conf-web-horizontal-dark.svg";
    case "elos":
      return "img/logo.svg";
    case "default":
    default:
      return "img/logo.svg";
  }
};

// Get home page logo file
const getHeroLogoPath = (variant) => {
  switch (variant) {
    case "confweb":
      return "img/logo-conf-web-vertical.svg";
    case "elos":
      return "img/favicon.svg";
    case "default":
    default:
      return "img/favicon.svg";
  }
};

// Get home page dark mode logo file
const getHeroDarkLogoPath = (variant) => {
  switch (variant) {
    case "confweb":
      return "img/logo-conf-web-vertical-dark.svg";
    case "elos":
      return "img/favicon.svg";
    case "default":
    default:
      return "img/favicon.svg";
  }
};

const customCSSPath = getCSSPath(designVariant);
const logoPath = getLogoPath(designVariant);
const darkLogoPath = getDarkLogoPath(designVariant);
const heroLogoPath = getHeroLogoPath(designVariant);
const heroDarkLogoPath = getHeroDarkLogoPath(designVariant);

// Get correct spec file based on theme
const getSpecPath = (basePath) => {
  return designVariant === "confweb"
    ? basePath.replace(".yaml", "-confweb.yaml")
    : basePath;
};

// Base API specs (always included)
const baseSpecs = [
  {
    id: "conference-api",
    spec: getSpecPath("static/proxy/openapi.yaml"),
    route: "/api/conference/",
    url: getSpecPath("/proxy/openapi.yaml"),
  },
];

// Conditionally add internal APIs
if (showInternalAPIs) {
  baseSpecs.push(
    {
      id: "data-api",
      spec: getSpecPath("static/data/openapi.yaml"),
      route: "/api/data/",
      url: getSpecPath("/data/openapi.yaml"),
    },
    {
      id: "administrative-api",
      spec: getSpecPath("static/administrative/openapi.yaml"),
      route: "/api/administrative/",
      url: getSpecPath("/administrative/openapi.yaml"),
    },
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
    },
  );
}

const config = {
  title:
    designVariant === "confweb"
      ? "ConferênciaWeb API Documentation"
      : "Elos API Documentation",
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
    designVariant: designVariant,
    heroLogoPath: heroLogoPath,
    heroDarkLogoPath: heroDarkLogoPath,
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
          customCss: customCSSPath,
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
      image: logoPath,
      navbar: {
        // title: "Elos",
        logo: {
          alt:
            designVariant === "confweb" ? "ConferênciaWeb Logo" : "Elos Logo",
          src: logoPath,
          srcDark: darkLogoPath,
        },
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
