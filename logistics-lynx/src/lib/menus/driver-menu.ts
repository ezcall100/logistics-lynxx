/* eslint-disable @typescript-eslint/no-explicit-any */

import { MenuSection } from '@/lib/types/menu';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  MapPin,
  PackageSearch,
  Truck,
  ShieldAlert,
  BarChart3,
  FileText,
  TrendingUp,
  DollarSign,
  Settings,
  Phone,
  Clock,
  User,
  Bell
} from "lucide-react";

export const DRIVER_MENU: MenuSection = {
  items: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/driver/dashboard",
    },
    {
      title: "My Routes",
      icon: MapPin,
      subMenu: [
        { title: "Active Route", icon: MapPin, path: "/driver/routes/active" },
        { title: "Route History", icon: Package, path: "/driver/routes/history" },
        { title: "Route Planner", icon: PackageSearch, path: "/driver/routes/planner" },
      ],
    },
    {
      title: "Loads & Delivery",
      icon: Package,
      subMenu: [
        { title: "Current Loads", icon: Package, path: "/driver/loads/current" },
        { title: "Delivery Status", icon: Truck, path: "/driver/loads/delivery" },
        { title: "Load History", icon: FileText, path: "/driver/loads/history" },
      ],
    },
    {
      title: "Truck & Maintenance",
      icon: Truck,
      subMenu: [
        { title: "Vehicle Status", icon: Truck, path: "/driver/vehicle/status" },
        { title: "Maintenance Log", icon: Settings, path: "/driver/vehicle/maintenance" },
        { title: "Fuel & Costs", icon: DollarSign, path: "/driver/vehicle/fuel" },
      ],
    },
    {
      title: "Communication",
      icon: MessageSquare,
      subMenu: [
        { title: "Dispatch Chat", icon: MessageSquare, path: "/driver/communication/dispatch" },
        { title: "Customer Contact", icon: Phone, path: "/driver/communication/customer" },
        { title: "Emergency", icon: ShieldAlert, path: "/driver/communication/emergency" },
      ],
    },
    {
      title: "Documents & Logs",
      icon: FileText,
      subMenu: [
        { title: "HOS Logs", icon: Clock, path: "/driver/documents/hos" },
        { title: "Trip Reports", icon: FileText, path: "/driver/documents/reports" },
        { title: "Receipts", icon: DollarSign, path: "/driver/documents/receipts" },
      ],
    },
    {
      title: "Tools & Services",
      icon: Settings,
      subMenu: [
        { title: "Truck Stops", icon: MapPin, path: "/driver/services/truck-stops" },
        { title: "Repair Shops", icon: Settings, path: "/driver/services/repair" },
        { title: "Fuel Prices", icon: TrendingUp, path: "/driver/services/fuel-prices" },
        { title: "Weather", icon: Package, path: "/driver/services/weather" },
      ],
    },
    {
      title: "Performance",
      icon: BarChart3,
      subMenu: [
        { title: "Earnings", icon: DollarSign, path: "/driver/performance/earnings" },
        { title: "Efficiency", icon: TrendingUp, path: "/driver/performance/efficiency" },
        { title: "Safety Score", icon: ShieldAlert, path: "/driver/performance/safety" },
      ],
    },
    {
      title: "Profile & Settings",
      icon: User,
      subMenu: [
        { title: "My Profile", icon: User, path: "/driver/profile" },
        { title: "App Settings", icon: Settings, path: "/driver/settings" },
        { title: "Privacy", icon: Settings, path: "/driver/settings/privacy" },
        { title: "Notifications", icon: Bell, path: "/driver/settings/notifications" },
      ],
    },
    {
      title: "Driver Settlement",
      icon: DollarSign,
      subMenu: [
        { title: "Earnings Overview", icon: BarChart3, path: "/driver/settlement/earnings" },
        { title: "Timesheets", icon: Clock, path: "/driver/settlement/timesheets" },
        { title: "Payroll Reports", icon: FileText, path: "/driver/settlement/payroll" },
        { title: "Benefits", icon: Settings, path: "/driver/settlement/benefits" },
      ],
    },
  ],
};
