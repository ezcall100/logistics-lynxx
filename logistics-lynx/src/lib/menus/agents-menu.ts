/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuSection } from '@/lib/types/menu';
import { 
  Settings, Shield, Bell, Users, CheckCircle, LayoutDashboard, UserPlus, Star, BarChart3, Globe, Target, Search, Mail, FileText, TrendingUp, PieChart, Activity, DollarSign, Calculator, Building2, Route, Handshake, Package, BrainCircuit, Truck, MapPin, Zap, Award, Phone, Calendar, BookOpen, UserCheck, MessageSquare
} from 'lucide-react';

export const AGENTS_MENU: MenuSection = {
  items: [
    {
      title: "Agent Dashboard",
      icon: LayoutDashboard,
      path: "/agents/dashboard",
    },
    {
      title: "Lead Management",
      icon: UserPlus,
      subMenu: [
        { title: "Lead Dashboard", icon: LayoutDashboard, path: "/agents/leads/dashboard" },
        { title: "New Leads", icon: UserPlus, path: "/agents/leads/new" },
        { title: "Hot Prospects", icon: Star, path: "/agents/leads/hot" },
        { title: "Lead Qualification", icon: CheckCircle, path: "/agents/leads/qualification" },
        { title: "Lead Scoring", icon: BarChart3, path: "/agents/leads/scoring" },
        { title: "Lead Sources", icon: Globe, path: "/agents/leads/sources" },
      ],
    },
    {
      title: "Customer Acquisition",
      icon: Target,
      subMenu: [
        { title: "Prospecting Tools", icon: Search, path: "/agents/acquisition/prospecting" },
        { title: "Cold Outreach", icon: Mail, path: "/agents/acquisition/outreach" },
        { title: "Proposal Management", icon: FileText, path: "/agents/acquisition/proposals" },
        { title: "Conversion Tracking", icon: TrendingUp, path: "/agents/acquisition/conversion" },
        { title: "Win/Loss Analysis", icon: PieChart, path: "/agents/acquisition/analysis" },
      ],
    },
    {
      title: "Sales Pipeline",
      icon: TrendingUp,
      subMenu: [
        { title: "Pipeline Overview", icon: TrendingUp, path: "/agents/sales/pipeline" },
        { title: "Opportunities", icon: Target, path: "/agents/sales/opportunities" },
        { title: "Deal Tracking", icon: Activity, path: "/agents/sales/deals" },
        { title: "Sales Forecasting", icon: BarChart3, path: "/agents/sales/forecasting" },
        { title: "Quote Management", icon: DollarSign, path: "/agents/sales/quotes" },
        { title: "Revenue Tracking", icon: Calculator, path: "/agents/sales/revenue" },
      ],
    },
    {
      title: "Customer Relations",
      icon: Users,
      subMenu: [
        { title: "Customer Database", icon: Users, path: "/agents/customers/database" },
        { title: "Account Management", icon: Building2, path: "/agents/customers/accounts" },
        { title: "Customer Support", icon: Shield, path: "/agents/customers/support" },
        { title: "Relationship Mapping", icon: Route, path: "/agents/customers/mapping" },
        { title: "Customer Retention", icon: Handshake, path: "/agents/customers/retention" },
      ],
    },
    {
      title: "Load Brokerage",
      icon: Package,
      subMenu: [
        { title: "Load Board", icon: Package, path: "/agents/loads/board" },
        { title: "Load Matching", icon: BrainCircuit, path: "/agents/loads/matching" },
        { title: "Carrier Network", icon: Truck, path: "/agents/loads/carriers" },
        { title: "Rate Negotiation", icon: DollarSign, path: "/agents/loads/rates" },
        { title: "Load Tracking", icon: MapPin, path: "/agents/loads/tracking" },
        { title: "Dispatch Coordination", icon: Zap, path: "/agents/loads/dispatch" },
      ],
    },
    {
      title: "Performance Metrics",
      icon: BarChart3,
      subMenu: [
        { title: "Sales Metrics", icon: TrendingUp, path: "/agents/metrics/sales" },
        { title: "Customer Metrics", icon: Users, path: "/agents/metrics/customers" },
        { title: "Commission Tracking", icon: DollarSign, path: "/agents/metrics/commission" },
        { title: "KPI Dashboard", icon: Target, path: "/agents/metrics/kpi" },
        { title: "Performance Reviews", icon: Award, path: "/agents/metrics/reviews" },
      ],
    },
    {
      title: "Communication Hub",
      icon: MessageSquare,
      subMenu: [
        { title: "Client Communications", icon: MessageSquare, path: "/agents/comm/clients" },
        { title: "Email Center", icon: Mail, path: "/agents/comm/email" },
        { title: "Call Management", icon: Phone, path: "/agents/comm/calls" },
        { title: "Follow-up Scheduler", icon: Calendar, path: "/agents/comm/followup" },
        { title: "Communication Templates", icon: FileText, path: "/agents/comm/templates" },
      ],
    },
    {
      title: "Territory Management",
      icon: MapPin,
      subMenu: [
        { title: "Territory Overview", icon: MapPin, path: "/agents/territory/overview" },
        { title: "Market Analysis", icon: BarChart3, path: "/agents/territory/market" },
        { title: "Competitor Analysis", icon: Shield, path: "/agents/territory/competitors" },
        { title: "Territory Planning", icon: Target, path: "/agents/territory/planning" },
        { title: "Route Optimization", icon: Route, path: "/agents/territory/routes" },
      ],
    },
    {
      title: "Training & Tools",
      icon: BookOpen,
      subMenu: [
        { title: "Sales Training", icon: BookOpen, path: "/agents/training/sales" },
        { title: "Product Knowledge", icon: Package, path: "/agents/training/products" },
        { title: "Industry Updates", icon: Globe, path: "/agents/training/industry" },
        { title: "Sales Tools", icon: Award, path: "/agents/training/tools" },
        { title: "Best Practices", icon: Star, path: "/agents/training/practices" },
      ],
    },
    {
      title: "Agent Settings",
      icon: Settings,
      subMenu: [
        { title: "Profile Management", icon: UserCheck, path: "/agents/settings/profile" },
        { title: "Territory Settings", icon: MapPin, path: "/agents/settings/territory" },
        { title: "Commission Settings", icon: DollarSign, path: "/agents/settings/commission" },
        { title: "Notification Preferences", icon: Bell, path: "/agents/settings/notifications" },
        { title: "Integration Settings", icon: Zap, path: "/agents/settings/integrations" },
      ],
    },
  ],
};