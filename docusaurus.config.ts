import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Enclave",
  tagline:
    "Seamlessly execute isolated tasks and workflows with fine-grained control over resource access and permissions.",
  favicon: "img/enclave_color.svg",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Ensures compatibility with the upcoming Docusaurus v4
  },

  // Production site URL
  url: "https://EnclaveRunner.github.io",
  // Base URL for site deployment
  baseUrl: "/docs/",

  // GitHub Pages deployment configuration
  organizationName: "EnclaveRunner", // GitHub organization or username
  projectName: "docs", // Repository name

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Internationalization and metadata settings
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        hashed: true, // Enables long-term caching of the search index
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/EclaveRunner/docs/blob/main",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/enclave_color.svg",
    navbar: {
      title: "Enclave",
      logo: {
        alt: "Enclave Logo",
        src: "img/enclave_color.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/EnclaveRunner",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `${new Date().getFullYear()} Enclave. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.gruvboxMaterialLight,
      darkTheme: prismThemes.gruvboxMaterialDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
