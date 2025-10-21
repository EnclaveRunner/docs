import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import apiSidebar from "./docs/API/sidebar";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar with API docs integrated
  tutorialSidebar: [
    "intro",
    "first-steps",
    "api-server",
    {
      type: "category",
      label: "API Documentation",
      items: apiSidebar,
    },
    "Wiki",
  ],
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
