export const ROUTES = {
  SUPER_ADMIN: "/super-admin",
  MCP: {
    ROOT: "/super-admin/mcp",
    INTRO: "/super-admin/mcp/introduction",
    FEATURES: "/super-admin/mcp/features",
    INTEGRATIONS: "/super-admin/mcp/integrations",
    DOCS: "/super-admin/mcp/documentation",
    SUPPORT: "/super-admin/mcp/support",
  },
  CARRIER: "/carrier",
  BROKER: "/broker",
  SHIPPER: "/shipper",
  ADMIN: "/admin",
  ANALYTICS: "/analytics",
  REPORTS: "/reports",
  SETTINGS: "/settings",
  LOGIN: "/login",
} as const;
