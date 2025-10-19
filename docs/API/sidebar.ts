import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "API/enclave-api-server",
    },
    {
      type: "category",
      label: "system",
      items: [
        {
          type: "doc",
          id: "API/health-check-endpoint",
          label: "Health-Check Endpoint",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
