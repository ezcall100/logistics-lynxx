/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuSection } from '@/lib/types/menu';
import { Settings, Shield, Users, CheckCircle, AlertTriangle } from 'lucide-react';

export const EXECUTIVE_MENU: MenuSection = {
  items: [
    {
      title: "Executive Dashboard",
      icon: LayoutDashboard,
      path: "/executive/dashboard",
    },
    {
      title: "Strategic Planning",
      icon: Target,
      subMenu: [
        { title: "Company Goals", icon: Target, path: "/executive/strategy/goals" },
        { title: "KPI Management", icon: Activity, path: "/executive/strategy/kpis" },
        { title: "Performance Reviews", icon: Award, path: "/executive/strategy/reviews" },
        { title: "Market Analysis", icon: TrendingUp, path: "/executive/strategy/market" },
        { title: "Competitive Intelligence", icon: Shield, path: "/executive/strategy/competition" },
      ],
    },
    {
      title: "Financial Management",
      icon: DollarSign,
      subMenu: [
        { title: "P&L Overview", icon: BarChart3, path: "/executive/finance/pnl" },
        { title: "Cash Flow", icon: DollarSign, path: "/executive/finance/cashflow" },
        { title: "Budget Planning", icon: Calculator, path: "/executive/finance/budget" },
        { title: "Investment Analysis", icon: TrendingUp, path: "/executive/finance/investments" },
        { title: "Financial Forecasting", icon: LineChart, path: "/executive/finance/forecasting" },
        { title: "Risk Assessment", icon: AlertTriangle, path: "/executive/finance/risk" },
      ],
    },
    {
      title: "Operations Overview",
      icon: Activity,
      subMenu: [
        { title: "Fleet Performance", icon: TrendingUp, path: "/executive/operations/fleet" },
        { title: "Operational Metrics", icon: BarChart3, path: "/executive/operations/metrics" },
        { title: "Safety & Compliance", icon: Shield, path: "/executive/operations/safety" },
        { title: "Quality Control", icon: CheckCircle, path: "/executive/operations/quality" },
        { title: "Process Optimization", icon: Zap, path: "/executive/operations/optimization" },
      ],
    },
    {
      title: "Human Resources",
      icon: Users,
      subMenu: [
        { title: "Workforce Analytics", icon: BarChart3, path: "/executive/hr/analytics" },
        { title: "Leadership Team", icon: Crown, path: "/executive/hr/leadership" },
        { title: "Talent Management", icon: UserCheck, path: "/executive/hr/talent" },
        { title: "Succession Planning", icon: Users, path: "/executive/hr/succession" },
        { title: "Performance Management", icon: Award, path: "/executive/hr/performance" },
      ],
    },
    {
      title: "Business Intelligence",
      icon: Brain,
      subMenu: [
        { title: "Executive Reports", icon: FileText, path: "/executive/bi/reports" },
        { title: "Real-time Analytics", icon: Activity, path: "/executive/bi/realtime" },
        { title: "Market Intelligence", icon: Globe, path: "/executive/bi/market" },
        { title: "Predictive Analytics", icon: TrendingUp, path: "/executive/bi/predictive" },
        { title: "Data Insights", icon: PieChart, path: "/executive/bi/insights" },
      ],
    },
    {
      title: "Corporate Governance",
      icon: Building,
      subMenu: [
        { title: "Board Management", icon: Users, path: "/executive/governance/board" },
        { title: "Compliance Oversight", icon: Scale, path: "/executive/governance/compliance" },
        { title: "Legal Affairs", icon: Gavel, path: "/executive/governance/legal" },
        { title: "Regulatory Updates", icon: AlertTriangle, path: "/executive/governance/regulatory" },
        { title: "Corporate Policies", icon: FileText, path: "/executive/governance/policies" },
      ],
    },
    {
      title: "Strategic Partnerships",
      icon: Building2,
      subMenu: [
        { title: "Partnership Portfolio", icon: Building2, path: "/executive/partnerships/portfolio" },
        { title: "Joint Ventures", icon: Users, path: "/executive/partnerships/ventures" },
        { title: "Alliance Management", icon: Shield, path: "/executive/partnerships/alliances" },
        { title: "Merger & Acquisition", icon: Building, path: "/executive/partnerships/ma" },
      ],
    },
    {
      title: "Executive Calendar",
      icon: Calendar,
      path: "/executive/calendar",
    },
    {
      title: "Executive Settings",
      icon: Settings,
      subMenu: [
        { title: "Company Profile", icon: Building, path: "/executive/settings/company" },
        { title: "Executive Preferences", icon: UserCheck, path: "/executive/settings/preferences" },
        { title: "Security Settings", icon: Shield, path: "/executive/settings/security" },
        { title: "Notification Settings", icon: AlertTriangle, path: "/executive/settings/notifications" },
      ],
    },
  ],
};