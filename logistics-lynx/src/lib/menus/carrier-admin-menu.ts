import {
  Home,
  Users,
  Truck,
  Package,
  MapPin,
  Calendar,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Filter,
  SortAsc,
  SortDesc,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Repeat,
  FileBarChart,
  CircleDollarSign,
  History,
  Wallet,
  HandCoins,
  ClipboardList,
  PieChart,
  Target
} from 'lucide-react';

import type { MenuItem } from '@/types/menu';

export const carrierAdminMenu: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/carrier-admin/dashboard',
    icon: Home,
    children: [
      {
        id: 'overview',
        title: 'Overview',
        path: '/carrier-admin/dashboard/overview',
        icon: BarChart3
      },
      {
        id: 'analytics',
        title: 'Analytics',
        path: '/carrier-admin/dashboard/analytics',
        icon: TrendingUp
      }
    ]
  },
  {
    id: 'fleet',
    title: 'Fleet Management',
    path: '/carrier-admin/fleet',
    icon: Truck,
    children: [
      {
        id: 'vehicles',
        title: 'Vehicles',
        path: '/carrier-admin/fleet/vehicles',
        icon: Truck
      },
      {
        id: 'drivers',
        title: 'Drivers',
        path: '/carrier-admin/fleet/drivers',
        icon: Users
      },
      {
        id: 'maintenance',
        title: 'Maintenance',
        path: '/carrier-admin/fleet/maintenance',
        icon: Settings
      }
    ]
  },
  {
    id: 'loads',
    title: 'Load Management',
    path: '/carrier-admin/loads',
    icon: Package,
    children: [
      {
        id: 'available',
        title: 'Available Loads',
        path: '/carrier-admin/loads/available',
        icon: Eye
      },
      {
        id: 'assigned',
        title: 'Assigned Loads',
        path: '/carrier-admin/loads/assigned',
        icon: CheckCircle
      },
      {
        id: 'completed',
        title: 'Completed Loads',
        path: '/carrier-admin/loads/completed',
        icon: CheckCircle
      }
    ]
  },
  {
    id: 'dispatch',
    title: 'Dispatch',
    path: '/carrier-admin/dispatch',
    icon: MapPin,
    children: [
      {
        id: 'assign',
        title: 'Assign Loads',
        path: '/carrier-admin/dispatch/assign',
        icon: Plus
      },
      {
        id: 'tracking',
        title: 'Live Tracking',
        path: '/carrier-admin/dispatch/tracking',
        icon: MapPin
      },
      {
        id: 'schedule',
        title: 'Schedule',
        path: '/carrier-admin/dispatch/schedule',
        icon: Calendar
      }
    ]
  },
  {
    id: 'financials',
    title: 'Financials',
    path: '/carrier-admin/financials',
    icon: DollarSign,
    children: [
      {
        id: 'revenue',
        title: 'Revenue',
        path: '/carrier-admin/financials/revenue',
        icon: TrendingUp
      },
      {
        id: 'expenses',
        title: 'Expenses',
        path: '/carrier-admin/financials/expenses',
        icon: TrendingDown
      },
      {
        id: 'reports',
        title: 'Reports',
        path: '/carrier-admin/financials/reports',
        icon: FileBarChart
      }
    ]
  },
  {
    id: 'compliance',
    title: 'Compliance',
    path: '/carrier-admin/compliance',
    icon: CheckCircle,
    children: [
      {
        id: 'licenses',
        title: 'Licenses',
        path: '/carrier-admin/compliance/licenses',
        icon: CheckCircle
      },
      {
        id: 'permits',
        title: 'Permits',
        path: '/carrier-admin/compliance/permits',
        icon: CheckCircle
      },
      {
        id: 'inspections',
        title: 'Inspections',
        path: '/carrier-admin/compliance/inspections',
        icon: Eye
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    path: '/carrier-admin/settings',
    icon: Settings,
    children: [
      {
        id: 'profile',
        title: 'Profile',
        path: '/carrier-admin/settings/profile',
        icon: Users
      },
      {
        id: 'notifications',
        title: 'Notifications',
        path: '/carrier-admin/settings/notifications',
        icon: Bell
      },
      {
        id: 'preferences',
        title: 'Preferences',
        path: '/carrier-admin/settings/preferences',
        icon: Settings
      }
    ]
  }
];
