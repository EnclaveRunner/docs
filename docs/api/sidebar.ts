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
          id: "api/list-users",
          label: "List Users",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-user",
          label: "Create User",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/get-user",
          label: "Get User",
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
          id: "api/update-user",
          label: "Update User",
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
          id: "api/get-current-user",
          label: "Get Current User",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/update-current-user",
          label: "Update Current User",
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
          id: "api/create-or-replace-role",
          label: "Create or Replace Role",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/delete-role",
          label: "Delete Role",
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
          id: "api/create-or-replace-resource-group",
          label: "Create or Replace Resource Group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/delete-resource-group",
          label: "Delete Resource Group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/list-rbac-policies",
          label: "List RBAC Policies",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-or-replace-rbac-policy",
          label: "Create or Replace RBAC Policy",
          className: "api-method put",
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
          id: "api/upload-artifact",
          label: "Upload Artifact",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-artifact-namespaces",
          label: "List Artifact Namespaces",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/list-artifacts-in-namespace",
          label: "List Artifacts in Namespace",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/list-artifact-versions",
          label: "List Artifact Versions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/retrieve-artifact-metadata-by-tag",
          label: "Retrieve Artifact Metadata by Tag",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/patch-artifact-metadata-by-tag",
          label: "Patch Artifact Metadata by Tag",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/delete-artifact-by-tag",
          label: "Delete Artifact by Tag",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/retrieve-artifact-metadata-by-hash",
          label: "Retrieve Artifact Metadata by Hash",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/patch-artifact-metadata-by-hash",
          label: "Patch Artifact Metadata by Hash",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/delete-artifact-by-hash",
          label: "Delete Artifact by Hash",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/download-artifact-by-tag",
          label: "Download Artifact by Tag",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/download-artifact-by-hash",
          label: "Download Artifact by Hash",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Tasks",
      link: {
        type: "doc",
        id: "api/tasks",
      },
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "api/list-tasks",
          label: "List Tasks",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-task",
          label: "Create Task",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-task",
          label: "Get Task",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/get-task-logs",
          label: "Get Task Logs",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
