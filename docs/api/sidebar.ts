import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/enclave-api-server",
    },
    {
      type: "category",
      label: "Users",
      link: {
        type: "doc",
        id: "api/users",
      },
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "api/get-user-information",
          label: "Get User Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/check-user-existence",
          label: "Check User Existence",
          className: "api-method head",
        },
        {
          type: "doc",
          id: "api/create-new-user",
          label: "Create New User",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/update-user-information",
          label: "Update User Information",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/delete-user",
          label: "Delete User",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/list-all-users",
          label: "List All Users",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-current-user-information",
          label: "Get Current User Information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/update-current-user-information",
          label: "Update Current User Information",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/delete-current-user",
          label: "Delete Current User",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "RBAC",
      link: {
        type: "doc",
        id: "api/rbac",
      },
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "api/list-all-roles",
          label: "List All Roles",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-assigned-users-for-role",
          label: "Get assigned users for role",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/check-role-existence",
          label: "Check Role Existence",
          className: "api-method head",
        },
        {
          type: "doc",
          id: "api/create-new-role",
          label: "Create New Role",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-role",
          label: "Delete Role",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-roles-assigned-to-user",
          label: "Get Roles Assigned to User",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/assign-roles-to-user",
          label: "Assign Roles to User",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/remove-role-from-user",
          label: "Remove Role from User",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/list-all-resource-groups",
          label: "List All Resource Groups",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-endpoints-assigned-to-resource-group",
          label: "Get Endpoints Assigned to Resource Group",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/check-resource-group-existence",
          label: "Check Resource Group Existence",
          className: "api-method head",
        },
        {
          type: "doc",
          id: "api/create-new-resource-group",
          label: "Create New Resource Group",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-resource-group",
          label: "Delete Resource Group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/get-resource-group-assigned-to-endpoint",
          label: "Get Resource Group Assigned to Endpoint",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/assign-endpoint-to-resource-group",
          label: "Assign Endpoint to Resource Group",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/remove-endpoint-from-resource-group",
          label: "Remove Endpoint from Resource Group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/list-all-rbac-policies",
          label: "List All RBAC Policies",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-new-rbac-policy",
          label: "Create New RBAC Policy",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/delete-rbac-policy",
          label: "Delete RBAC Policy",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Artifacts",
      link: {
        type: "doc",
        id: "api/artifacts",
      },
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "api/check-artifact-existence",
          label: "Check Artifact Existence",
          className: "api-method head",
        },
        {
          type: "doc",
          id: "api/retrieve-artifact-metadata",
          label: "Retrieve Artifact Metadata",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-artifact",
          label: "Delete Artifact",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/tag-artifact-version",
          label: "Tag Artifact Version",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/remove-tag-from-artifact",
          label: "Remove Tag from Artifact",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/download-artifact",
          label: "Download Artifact",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/upload-artifact",
          label: "Upload Artifact",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/query-artifact-metadata",
          label: "Query Artifact Metadata",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Manifests",
      link: {
        type: "doc",
        id: "api/manifests",
      },
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "api/create-manifest",
          label: "Create Manifest",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
