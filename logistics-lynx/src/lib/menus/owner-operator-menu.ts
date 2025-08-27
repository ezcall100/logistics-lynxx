/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuSection } from '@/lib/types/menu';
import {  } from 'lucide-react';

export const OWNER_OPERATOR_MENU: MenuSection = {
  items: [
    {
      title: "Business Dashboard",
      icon: LayoutDashboard,
      path: "/owner-operator/dashboard",
    },
    {
      title: "Business Operations",
      icon: Briefcase,
      subMenu: [
        { title: "Load Board", icon: Package, path: "/owner-operator/operations/load-board" },
        { title: "Active Contracts", icon: FileText, path: "/owner-operator/operations/contracts" },
        { title: "Trip Planning", icon: Route, path: "/owner-operator/operations/trip-planning" },
        { title: "Dispatch Management", icon: Activity, path: "/owner-operator/operations/dispatch" },
        { title: "Customer Relations", icon: Users, path: "/owner-operator/operations/customers" },
        { title: "Rate Negotiation", icon: DollarSign, path: "/owner-operator/operations/rates" },
      ],
    },
    {
      title: "Financial Management",
      icon: DollarSign,
      subMenu: [
        { title: "Profit & Loss", icon: BarChart3, path: "/owner-operator/finance/pnl" },
        { title: "Revenue Tracking", icon: TrendingUp, path: "/owner-operator/finance/revenue" },
        { title: "Expense Management", icon: Calculator, path: "/owner-operator/finance/expenses" },
        { title: "Cash Flow", icon: CircleDollarSign, path: "/owner-operator/finance/cashflow" },
        { title: "Invoicing", icon: Receipt, path: "/owner-operator/finance/invoicing" },
        { title: "Banking & Payments", icon: Landmark, path: "/owner-operator/finance/banking" },
        { title: "Financial Forecasting", icon: LineChart, path: "/owner-operator/finance/forecasting" },
      ],
    },
    {
      title: "Tax & Accounting",
      icon: Calculator,
      subMenu: [
        { title: "Tax Dashboard", icon: Calculator, path: "/owner-operator/tax/dashboard" },
        { title: "Quarterly Taxes", icon: Calendar, path: "/owner-operator/tax/quarterly" },
        { title: "Deductions", icon: Receipt, path: "/owner-operator/tax/deductions" },
        { title: "Mileage Tracking", icon: Route, path: "/owner-operator/tax/mileage" },
        { title: "Tax Documents", icon: FileText, path: "/owner-operator/tax/documents" },
        { title: "Accountant Portal", icon: Users, path: "/owner-operator/tax/accountant" },
        { title: "Tax Planning", icon: Target, path: "/owner-operator/tax/planning" },
      ],
    },
    {
      title: "Fleet Management",
      icon: Truck,
      subMenu: [
        { title: "Vehicle Overview", icon: Truck, path: "/owner-operator/fleet/overview" },
        { title: "Maintenance Scheduling", icon: Wrench, path: "/owner-operator/fleet/maintenance" },
        { title: "Fuel Management", icon: Fuel, path: "/owner-operator/fleet/fuel" },
        { title: "Vehicle Inspections", icon: CheckCircle, path: "/owner-operator/fleet/inspections" },
        { title: "Insurance Management", icon: Shield, path: "/owner-operator/fleet/insurance" },
        { title: "Asset Tracking", icon: MapPin, path: "/owner-operator/fleet/tracking" },
      ],
    },
    {
      title: "Compliance & Safety",
      icon: Shield,
      subMenu: [
        { title: "DOT Compliance", icon: Shield, path: "/owner-operator/compliance/dot" },
        { title: "Hours of Service", icon: Clock, path: "/owner-operator/compliance/hos" },
        { title: "Drug & Alcohol Testing", icon: Heart, path: "/owner-operator/compliance/testing" },
        { title: "Safety Scores", icon: Star, path: "/owner-operator/compliance/scores" },
        { title: "Violations Management", icon: AlertTriangle, path: "/owner-operator/compliance/violations" },
        { title: "Regulatory Updates", icon: Bell, path: "/owner-operator/compliance/updates" },
      ],
    },
    {
      title: "Load Management",
      icon: Package,
      subMenu: [
        { title: "Available Loads", icon: Package, path: "/owner-operator/loads/available" },
        { title: "Booked Loads", icon: CheckCircle, path: "/owner-operator/loads/booked" },
        { title: "Load History", icon: ClipboardList, path: "/owner-operator/loads/history" },
        { title: "Load Tracking", icon: MapPin, path: "/owner-operator/loads/tracking" },
        { title: "Delivery Confirmation", icon: CheckCircle, path: "/owner-operator/loads/delivery" },
        { title: "Load Documentation", icon: FileText, path: "/owner-operator/loads/documents" },
      ],
    },
    {
      title: "Business Analytics",
      icon: BarChart3,
      subMenu: [
        { title: "Performance Metrics", icon: BarChart3, path: "/owner-operator/analytics/performance" },
        { title: "Profitability Analysis", icon: PieChart, path: "/owner-operator/analytics/profitability" },
        { title: "Route Efficiency", icon: Route, path: "/owner-operator/analytics/route-efficiency" },
        { title: "Customer Analysis", icon: Users, path: "/owner-operator/analytics/customers" },
        { title: "Market Trends", icon: TrendingUp, path: "/owner-operator/analytics/market" },
        { title: "Business Intelligence", icon: Activity, path: "/owner-operator/analytics/intelligence" },
      ],
    },
    {
      title: "Insurance & Risk",
      icon: Shield,
      subMenu: [
        { title: "Insurance Policies", icon: Shield, path: "/owner-operator/insurance/policies" },
        { title: "Claims Management", icon: FileText, path: "/owner-operator/insurance/claims" },
        { title: "Risk Assessment", icon: AlertTriangle, path: "/owner-operator/insurance/risk" },
        { title: "Coverage Analysis", icon: BarChart3, path: "/owner-operator/insurance/coverage" },
        { title: "Insurance Shopping", icon: Building2, path: "/owner-operator/insurance/shopping" },
      ],
    },
    {
      title: "Business Services",
      icon: Building,
      subMenu: [
        { title: "Legal Services", icon: Gavel, path: "/owner-operator/services/legal" },
        { title: "Business Formation", icon: Building, path: "/owner-operator/services/formation" },
        { title: "Permits & Licensing", icon: FileText, path: "/owner-operator/services/permits" },
        { title: "Factoring Services", icon: HandCoins, path: "/owner-operator/services/factoring" },
        { title: "Fuel Card Programs", icon: CreditCard, path: "/owner-operator/services/fuel-cards" },
        { title: "Business Loans", icon: PiggyBank, path: "/owner-operator/services/loans" },
      ],
    },
    {
      title: "Communication Hub",
      icon: MessageSquare,
      subMenu: [
        { title: "Customer Communications", icon: MessageSquare, path: "/owner-operator/comm/customers" },
        { title: "Broker Relations", icon: Users, path: "/owner-operator/comm/brokers" },
        { title: "Vendor Communications", icon: Building2, path: "/owner-operator/comm/vendors" },
        { title: "Email Center", icon: Mail, path: "/owner-operator/comm/email" },
        { title: "Support Center", icon: Phone, path: "/owner-operator/comm/support" },
      ],
    },
    {
      title: "Training & Growth",
      icon: BookOpen,
      subMenu: [
        { title: "Business Training", icon: BookOpen, path: "/owner-operator/training/business" },
        { title: "Industry Updates", icon: Bell, path: "/owner-operator/training/industry" },
        { title: "Certification Programs", icon: Award, path: "/owner-operator/training/certifications" },
        { title: "Safety Training", icon: Shield, path: "/owner-operator/training/safety" },
        { title: "Technology Training", icon: Activity, path: "/owner-operator/training/technology" },
        { title: "Business Development", icon: TrendingUp, path: "/owner-operator/training/development" },
      ],
    },
    {
      title: "Business Settings",
      icon: Settings,
      subMenu: [
        { title: "Business Profile", icon: Building, path: "/owner-operator/settings/profile" },
        { title: "Operating Authority", icon: Scale, path: "/owner-operator/settings/authority" },
        { title: "Banking Information", icon: Landmark, path: "/owner-operator/settings/banking" },
        { title: "Tax Settings", icon: Calculator, path: "/owner-operator/settings/tax" },
        { title: "Notification Preferences", icon: Bell, path: "/owner-operator/settings/notifications" },
        { title: "Integration Settings", icon: Activity, path: "/owner-operator/settings/integrations" },
      ],
    },
  ],
};