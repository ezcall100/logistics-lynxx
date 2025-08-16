/* eslint-disable @typescript-eslint/no-explicit-any */
export type WidgetKind = "kpi" | "timeseries" | "table" | "activity" | "alerts";

export type WidgetDef = {
  id: string;
  kind: WidgetKind;
  title: string;
  description?: string;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
  query?: string;
  columns?: { key: string; label: string; width?: number }[];
  sloGuard?: { p95Ms?: number; successMin?: number };
};

export type PortalDashboard = {
  portalKey: string;
  route: string;
  featureFlag: string;
  widgets: WidgetDef[];
};

export const DASHBOARDS: PortalDashboard[] = [
  {
    portalKey: "superAdmin",
    route: "/super-admin/dashboard",
    featureFlag: "portal.superAdmin.dashboard.enabled",
    widgets: [
      { id: "kpi.uptime", kind: "kpi", title: "System Uptime (30d)", query: "obs.uptime.30d", sloGuard: { successMin: 98 } },
      { id: "kpi.agents", kind: "kpi", title: "Active Agents", query: "autonomous.agents.active" },
      { id: "kpi.users", kind: "kpi", title: "Active Users", query: "auth.users.active" },
      { id: "kpi.incidents", kind: "kpi", title: "Open Incidents", query: "ops.incidents.open" },
      { id: "ts.slo", kind: "timeseries", title: "p95 Response Time by Portal", query: "obs.p95.portal", span: "2x1" },
      { id: "tbl.incidents", kind: "table", title: "Recent Incidents", query: "ops.incidents.recent",
        columns: [{ key: "ts", label: "Time" }, { key: "severity", label: "Sev" }, { key: "portal", label: "Portal" }, { key: "status", label: "Status" }], span: "2x2" },
      { id: "alerts", kind: "alerts", title: "System Alerts", query: "ops.alerts.open" },
      { id: "activity", kind: "activity", title: "Admin Activity", query: "admin.activity.recent", span: "2x1" }
    ]
  },
  {
    portalKey: "broker",
    route: "/broker/dashboard",
    featureFlag: "portal.broker.dashboard.enabled",
    widgets: [
      { id: "kpi.quoteToBook", kind: "kpi", title: "Quote→Book Rate", query: "broker.funnel.q2b" },
      { id: "kpi.activeLoads", kind: "kpi", title: "Active Loads", query: "broker.loads.active" },
      { id: "kpi.revenue", kind: "kpi", title: "Monthly Revenue", query: "broker.revenue.monthly" },
      { id: "kpi.carriers", kind: "kpi", title: "Active Carriers", query: "broker.carriers.active" },
      { id: "ts.loads", kind: "timeseries", title: "Loads per Hour", query: "broker.loads.timeseries", span: "2x1" },
      { id: "tbl.topCarriers", kind: "table", title: "Top Carriers", query: "broker.carriers.top",
        columns: [{ key: "name", label: "Carrier" }, { key: "score", label: "Score" }, { key: "onTime", label: "On-Time%" }] },
      { id: "activity", kind: "activity", title: "Recent Activity", query: "broker.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Broker Alerts", query: "broker.alerts.open" }
    ]
  },
  {
    portalKey: "carrier",
    route: "/carrier/dashboard",
    featureFlag: "portal.carrier.dashboard.enabled",
    widgets: [
      { id: "kpi.activeLoads", kind: "kpi", title: "Active Loads", query: "carrier.loads.active" },
      { id: "kpi.onTimeRate", kind: "kpi", title: "On-Time Rate", query: "carrier.performance.ontime" },
      { id: "kpi.revenue", kind: "kpi", title: "Monthly Revenue", query: "carrier.revenue.monthly" },
      { id: "kpi.drivers", kind: "kpi", title: "Active Drivers", query: "carrier.drivers.active" },
      { id: "ts.performance", kind: "timeseries", title: "Performance Metrics", query: "carrier.performance.timeseries", span: "2x1" },
      { id: "tbl.loads", kind: "table", title: "Recent Loads", query: "carrier.loads.recent",
        columns: [{ key: "id", label: "Load ID" }, { key: "origin", label: "Origin" }, { key: "destination", label: "Destination" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "Carrier Activity", query: "carrier.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Carrier Alerts", query: "carrier.alerts.open" }
    ]
  },
  {
    portalKey: "shipper",
    route: "/shipper/dashboard",
    featureFlag: "portal.shipper.dashboard.enabled",
    widgets: [
      { id: "kpi.activeShipments", kind: "kpi", title: "Active Shipments", query: "shipper.shipments.active" },
      { id: "kpi.costSavings", kind: "kpi", title: "Cost Savings", query: "shipper.savings.monthly" },
      { id: "kpi.onTimeDelivery", kind: "kpi", title: "On-Time Delivery", query: "shipper.performance.ontime" },
      { id: "kpi.carriers", kind: "kpi", title: "Carriers Used", query: "shipper.carriers.count" },
      { id: "ts.shipments", kind: "timeseries", title: "Shipments per Week", query: "shipper.shipments.timeseries", span: "2x1" },
      { id: "tbl.shipments", kind: "table", title: "Recent Shipments", query: "shipper.shipments.recent",
        columns: [{ key: "id", label: "Shipment" }, { key: "origin", label: "Origin" }, { key: "destination", label: "Destination" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "Shipper Activity", query: "shipper.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Shipper Alerts", query: "shipper.alerts.open" }
    ]
  },
  {
    portalKey: "driver",
    route: "/driver/dashboard",
    featureFlag: "portal.driver.dashboard.enabled",
    widgets: [
      { id: "kpi.activeLoads", kind: "kpi", title: "Active Loads", query: "driver.loads.active" },
      { id: "kpi.hours", kind: "kpi", title: "Hours This Week", query: "driver.hours.weekly" },
      { id: "kpi.miles", kind: "kpi", title: "Miles This Month", query: "driver.miles.monthly" },
      { id: "kpi.earnings", kind: "kpi", title: "Monthly Earnings", query: "driver.earnings.monthly" },
      { id: "ts.performance", kind: "timeseries", title: "Performance Metrics", query: "driver.performance.timeseries", span: "2x1" },
      { id: "tbl.loads", kind: "table", title: "Recent Loads", query: "driver.loads.recent",
        columns: [{ key: "id", label: "Load ID" }, { key: "origin", label: "Origin" }, { key: "destination", label: "Destination" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "Driver Activity", query: "driver.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Driver Alerts", query: "driver.alerts.open" }
    ]
  },
  {
    portalKey: "ownerOperator",
    route: "/owner-operator/dashboard",
    featureFlag: "portal.ownerOperator.dashboard.enabled",
    widgets: [
      { id: "kpi.fleetSize", kind: "kpi", title: "Fleet Size", query: "owner.fleet.size" },
      { id: "kpi.activeDrivers", kind: "kpi", title: "Active Drivers", query: "owner.drivers.active" },
      { id: "kpi.revenue", kind: "kpi", title: "Monthly Revenue", query: "owner.revenue.monthly" },
      { id: "kpi.utilization", kind: "kpi", title: "Fleet Utilization", query: "owner.fleet.utilization" },
      { id: "ts.fleet", kind: "timeseries", title: "Fleet Performance", query: "owner.fleet.performance", span: "2x1" },
      { id: "tbl.vehicles", kind: "table", title: "Vehicle Status", query: "owner.vehicles.status",
        columns: [{ key: "id", label: "Vehicle" }, { key: "driver", label: "Driver" }, { key: "status", label: "Status" }, { key: "location", label: "Location" }] },
      { id: "activity", kind: "activity", title: "Fleet Activity", query: "owner.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Fleet Alerts", query: "owner.alerts.open" }
    ]
  },
  {
    portalKey: "dispatcher",
    route: "/dispatcher/dashboard",
    featureFlag: "portal.dispatcher.dashboard.enabled",
    widgets: [
      { id: "kpi.pendingLoads", kind: "kpi", title: "Pending Loads", query: "dispatcher.loads.pending" },
      { id: "kpi.activeDrivers", kind: "kpi", title: "Active Drivers", query: "dispatcher.drivers.active" },
      { id: "kpi.assignments", kind: "kpi", title: "Today's Assignments", query: "dispatcher.assignments.today" },
      { id: "kpi.efficiency", kind: "kpi", title: "Dispatch Efficiency", query: "dispatcher.efficiency.rate" },
      { id: "ts.assignments", kind: "timeseries", title: "Assignments per Hour", query: "dispatcher.assignments.timeseries", span: "2x1" },
      { id: "tbl.loads", kind: "table", title: "Unassigned Loads", query: "dispatcher.loads.unassigned",
        columns: [{ key: "id", label: "Load ID" }, { key: "origin", label: "Origin" }, { key: "destination", label: "Destination" }, { key: "priority", label: "Priority" }] },
      { id: "activity", kind: "activity", title: "Dispatch Activity", query: "dispatcher.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Dispatch Alerts", query: "dispatcher.alerts.open" }
    ]
  },
  {
    portalKey: "accountant",
    route: "/accountant/dashboard",
    featureFlag: "portal.accountant.dashboard.enabled",
    widgets: [
      { id: "kpi.revenue", kind: "kpi", title: "Total Revenue", query: "accountant.revenue.total" },
      { id: "kpi.expenses", kind: "kpi", title: "Total Expenses", query: "accountant.expenses.total" },
      { id: "kpi.profit", kind: "kpi", title: "Net Profit", query: "accountant.profit.net" },
      { id: "kpi.invoices", kind: "kpi", title: "Pending Invoices", query: "accountant.invoices.pending" },
      { id: "ts.financials", kind: "timeseries", title: "Financial Performance", query: "accountant.financials.timeseries", span: "2x1" },
      { id: "tbl.transactions", kind: "table", title: "Recent Transactions", query: "accountant.transactions.recent",
        columns: [{ key: "id", label: "Transaction" }, { key: "type", label: "Type" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "Accounting Activity", query: "accountant.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Financial Alerts", query: "accountant.alerts.open" }
    ]
  },
  {
    portalKey: "compliance",
    route: "/compliance/dashboard",
    featureFlag: "portal.compliance.dashboard.enabled",
    widgets: [
      { id: "kpi.violations", kind: "kpi", title: "Active Violations", query: "compliance.violations.active" },
      { id: "kpi.audits", kind: "kpi", title: "Pending Audits", query: "compliance.audits.pending" },
      { id: "kpi.compliance", kind: "kpi", title: "Compliance Rate", query: "compliance.rate.overall" },
      { id: "kpi.certifications", kind: "kpi", title: "Expiring Certs", query: "compliance.certifications.expiring" },
      { id: "ts.compliance", kind: "timeseries", title: "Compliance Trends", query: "compliance.trends.timeseries", span: "2x1" },
      { id: "tbl.violations", kind: "table", title: "Recent Violations", query: "compliance.violations.recent",
        columns: [{ key: "id", label: "Violation" }, { key: "type", label: "Type" }, { key: "severity", label: "Severity" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "Compliance Activity", query: "compliance.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Compliance Alerts", query: "compliance.alerts.open" }
    ]
  },
  {
    portalKey: "safety",
    route: "/safety/dashboard",
    featureFlag: "portal.safety.dashboard.enabled",
    widgets: [
      { id: "kpi.incidents", kind: "kpi", title: "Safety Incidents", query: "safety.incidents.total" },
      { id: "kpi.score", kind: "kpi", title: "Safety Score", query: "safety.score.overall" },
      { id: "kpi.training", kind: "kpi", title: "Training Due", query: "safety.training.due" },
      { id: "kpi.inspections", kind: "kpi", title: "Inspections Due", query: "safety.inspections.due" },
      { id: "ts.safety", kind: "timeseries", title: "Safety Metrics", query: "safety.metrics.timeseries", span: "2x1" },
      { id: "tbl.incidents", kind: "table", title: "Recent Incidents", query: "safety.incidents.recent",
        columns: [{ key: "id", label: "Incident" }, { key: "type", label: "Type" }, { key: "severity", label: "Severity" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "Safety Activity", query: "safety.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Safety Alerts", query: "safety.alerts.open" }
    ]
  },
  {
    portalKey: "maintenance",
    route: "/maintenance/dashboard",
    featureFlag: "portal.maintenance.dashboard.enabled",
    widgets: [
      { id: "kpi.scheduled", kind: "kpi", title: "Scheduled Maintenance", query: "maintenance.scheduled.count" },
      { id: "kpi.overdue", kind: "kpi", title: "Overdue Maintenance", query: "maintenance.overdue.count" },
      { id: "kpi.vehicles", kind: "kpi", title: "Vehicles in Shop", query: "maintenance.vehicles.shop" },
      { id: "kpi.costs", kind: "kpi", title: "Monthly Costs", query: "maintenance.costs.monthly" },
      { id: "ts.maintenance", kind: "timeseries", title: "Maintenance Activity", query: "maintenance.activity.timeseries", span: "2x1" },
      { id: "tbl.workOrders", kind: "table", title: "Open Work Orders", query: "maintenance.workOrders.open",
        columns: [{ key: "id", label: "Work Order" }, { key: "vehicle", label: "Vehicle" }, { key: "type", label: "Type" }, { key: "priority", label: "Priority" }] },
      { id: "activity", kind: "activity", title: "Maintenance Activity", query: "maintenance.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Maintenance Alerts", query: "maintenance.alerts.open" }
    ]
  },
  {
    portalKey: "fuel",
    route: "/fuel/dashboard",
    featureFlag: "portal.fuel.dashboard.enabled",
    widgets: [
      { id: "kpi.consumption", kind: "kpi", title: "Monthly Consumption", query: "fuel.consumption.monthly" },
      { id: "kpi.costs", kind: "kpi", title: "Fuel Costs", query: "fuel.costs.monthly" },
      { id: "kpi.efficiency", kind: "kpi", title: "MPG Average", query: "fuel.efficiency.mpg" },
      { id: "kpi.stations", kind: "kpi", title: "Preferred Stations", query: "fuel.stations.preferred" },
      { id: "ts.fuel", kind: "timeseries", title: "Fuel Consumption", query: "fuel.consumption.timeseries", span: "2x1" },
      { id: "tbl.purchases", kind: "table", title: "Recent Purchases", query: "fuel.purchases.recent",
        columns: [{ key: "id", label: "Purchase" }, { key: "station", label: "Station" }, { key: "gallons", label: "Gallons" }, { key: "cost", label: "Cost" }] },
      { id: "activity", kind: "activity", title: "Fuel Activity", query: "fuel.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Fuel Alerts", query: "fuel.alerts.open" }
    ]
  },
  {
    portalKey: "insurance",
    route: "/insurance/dashboard",
    featureFlag: "portal.insurance.dashboard.enabled",
    widgets: [
      { id: "kpi.policies", kind: "kpi", title: "Active Policies", query: "insurance.policies.active" },
      { id: "kpi.claims", kind: "kpi", title: "Open Claims", query: "insurance.claims.open" },
      { id: "kpi.premiums", kind: "kpi", title: "Monthly Premiums", query: "insurance.premiums.monthly" },
      { id: "kpi.coverage", kind: "kpi", title: "Coverage Level", query: "insurance.coverage.level" },
      { id: "ts.insurance", kind: "timeseries", title: "Insurance Metrics", query: "insurance.metrics.timeseries", span: "2x1" },
      { id: "tbl.claims", kind: "table", title: "Recent Claims", query: "insurance.claims.recent",
        columns: [{ key: "id", label: "Claim" }, { key: "type", label: "Type" }, { key: "amount", label: "Amount" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "Insurance Activity", query: "insurance.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Insurance Alerts", query: "insurance.alerts.open" }
    ]
  },
  {
    portalKey: "hr",
    route: "/hr/dashboard",
    featureFlag: "portal.hr.dashboard.enabled",
    widgets: [
      { id: "kpi.employees", kind: "kpi", title: "Total Employees", query: "hr.employees.total" },
      { id: "kpi.hiring", kind: "kpi", title: "Open Positions", query: "hr.positions.open" },
      { id: "kpi.turnover", kind: "kpi", title: "Turnover Rate", query: "hr.turnover.rate" },
      { id: "kpi.training", kind: "kpi", title: "Training Due", query: "hr.training.due" },
      { id: "ts.hr", kind: "timeseries", title: "HR Metrics", query: "hr.metrics.timeseries", span: "2x1" },
      { id: "tbl.employees", kind: "table", title: "Recent Hires", query: "hr.employees.recent",
        columns: [{ key: "id", label: "Employee" }, { key: "position", label: "Position" }, { key: "department", label: "Department" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "HR Activity", query: "hr.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "HR Alerts", query: "hr.alerts.open" }
    ]
  },
  {
    portalKey: "it",
    route: "/it/dashboard",
    featureFlag: "portal.it.dashboard.enabled",
    widgets: [
      { id: "kpi.systems", kind: "kpi", title: "System Uptime", query: "it.systems.uptime" },
      { id: "kpi.tickets", kind: "kpi", title: "Open Tickets", query: "it.tickets.open" },
      { id: "kpi.users", kind: "kpi", title: "Active Users", query: "it.users.active" },
      { id: "kpi.security", kind: "kpi", title: "Security Score", query: "it.security.score" },
      { id: "ts.it", kind: "timeseries", title: "IT Performance", query: "it.performance.timeseries", span: "2x1" },
      { id: "tbl.tickets", kind: "table", title: "Recent Tickets", query: "it.tickets.recent",
        columns: [{ key: "id", label: "Ticket" }, { key: "type", label: "Type" }, { key: "priority", label: "Priority" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "IT Activity", query: "it.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "IT Alerts", query: "it.alerts.open" }
    ]
  },
  {
    portalKey: "marketing",
    route: "/marketing/dashboard",
    featureFlag: "portal.marketing.dashboard.enabled",
    widgets: [
      { id: "kpi.leads", kind: "kpi", title: "New Leads", query: "marketing.leads.new" },
      { id: "kpi.conversions", kind: "kpi", title: "Conversion Rate", query: "marketing.conversions.rate" },
      { id: "kpi.campaigns", kind: "kpi", title: "Active Campaigns", query: "marketing.campaigns.active" },
      { id: "kpi.roi", kind: "kpi", title: "Marketing ROI", query: "marketing.roi.overall" },
      { id: "ts.marketing", kind: "timeseries", title: "Marketing Performance", query: "marketing.performance.timeseries", span: "2x1" },
      { id: "tbl.leads", kind: "table", title: "Recent Leads", query: "marketing.leads.recent",
        columns: [{ key: "id", label: "Lead" }, { key: "source", label: "Source" }, { key: "status", label: "Status" }, { key: "value", label: "Value" }] },
      { id: "activity", kind: "activity", title: "Marketing Activity", query: "marketing.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Marketing Alerts", query: "marketing.alerts.open" }
    ]
  },
  {
    portalKey: "sales",
    route: "/sales/dashboard",
    featureFlag: "portal.sales.dashboard.enabled",
    widgets: [
      { id: "kpi.revenue", kind: "kpi", title: "Monthly Revenue", query: "sales.revenue.monthly" },
      { id: "kpi.opportunities", kind: "kpi", title: "Open Opportunities", query: "sales.opportunities.open" },
      { id: "kpi.pipeline", kind: "kpi", title: "Pipeline Value", query: "sales.pipeline.value" },
      { id: "kpi.quota", kind: "kpi", title: "Quota Achievement", query: "sales.quota.achievement" },
      { id: "ts.sales", kind: "timeseries", title: "Sales Performance", query: "sales.performance.timeseries", span: "2x1" },
      { id: "tbl.opportunities", kind: "table", title: "Recent Opportunities", query: "sales.opportunities.recent",
        columns: [{ key: "id", label: "Opportunity" }, { key: "customer", label: "Customer" }, { key: "value", label: "Value" }, { key: "stage", label: "Stage" }] },
      { id: "activity", kind: "activity", title: "Sales Activity", query: "sales.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Sales Alerts", query: "sales.alerts.open" }
    ]
  },
  {
    portalKey: "customerService",
    route: "/customer-service/dashboard",
    featureFlag: "portal.customerService.dashboard.enabled",
    widgets: [
      { id: "kpi.tickets", kind: "kpi", title: "Open Tickets", query: "cs.tickets.open" },
      { id: "kpi.satisfaction", kind: "kpi", title: "Satisfaction Score", query: "cs.satisfaction.score" },
      { id: "kpi.response", kind: "kpi", title: "Avg Response Time", query: "cs.response.average" },
      { id: "kpi.resolution", kind: "kpi", title: "Resolution Rate", query: "cs.resolution.rate" },
      { id: "ts.cs", kind: "timeseries", title: "Support Metrics", query: "cs.metrics.timeseries", span: "2x1" },
      { id: "tbl.tickets", kind: "table", title: "Recent Tickets", query: "cs.tickets.recent",
        columns: [{ key: "id", label: "Ticket" }, { key: "customer", label: "Customer" }, { key: "priority", label: "Priority" }, { key: "status", label: "Status" }] },
      { id: "activity", kind: "activity", title: "Support Activity", query: "cs.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Support Alerts", query: "cs.alerts.open" }
    ]
  },
  {
    portalKey: "analytics",
    route: "/analytics/dashboard",
    featureFlag: "portal.analytics.dashboard.enabled",
    widgets: [
      { id: "kpi.users", kind: "kpi", title: "Active Users", query: "analytics.users.active" },
      { id: "kpi.sessions", kind: "kpi", title: "Daily Sessions", query: "analytics.sessions.daily" },
      { id: "kpi.conversion", kind: "kpi", title: "Conversion Rate", query: "analytics.conversion.rate" },
      { id: "kpi.revenue", kind: "kpi", title: "Revenue Growth", query: "analytics.revenue.growth" },
      { id: "ts.analytics", kind: "timeseries", title: "User Engagement", query: "analytics.engagement.timeseries", span: "2x1" },
      { id: "tbl.events", kind: "table", title: "Top Events", query: "analytics.events.top",
        columns: [{ key: "event", label: "Event" }, { key: "count", label: "Count" }, { key: "users", label: "Users" }, { key: "trend", label: "Trend" }] },
      { id: "activity", kind: "activity", title: "Analytics Activity", query: "analytics.activity.recent", span: "2x1" },
      { id: "alerts", kind: "alerts", title: "Analytics Alerts", query: "analytics.alerts.open" }
    ]
  }
];

// Helper function to get dashboard by portal key
export function getDashboardByPortalKey(portalKey: string): PortalDashboard | undefined {
  return DASHBOARDS.find(dashboard => dashboard.portalKey === portalKey);
}

// Helper function to get all portal keys
export function getAllPortalKeys(): string[] {
  return DASHBOARDS.map(dashboard => dashboard.portalKey);
}
