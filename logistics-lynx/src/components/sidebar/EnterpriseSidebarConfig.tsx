import React from 'react';
import { 
  Activity, 
  Briefcase, 
  Users, 
  Banknote, 
  FileText, 
  Zap, 
  Settings, 
  LifeBuoy,
  Home,
  BarChart3,
  Truck,
  Package,
  MapPin,
  Calendar,
  Shield,
  Database,
  Globe,
  CreditCard,
  Receipt,
  FileSpreadsheet,
  Workflow,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Crown,
  Brain,
  TrendingUp,
  Building2,
  Car,
  UserCheck,
  Wallet,
  Loader2,
  Network,
  Store,
  Wrench,
  HeadphonesIcon,
  Calculator,
  Route,
  ClipboardList,
  Timer,
  Target,
  PieChart,
  LineChart,
  ActivitySquare,
  Bot,
  Cpu,
  Server,
  HardDrive,
  Cloud,
  Lock,
  Key,
  Bell,
  MessageSquare,
  Mail,
  Phone,
  Video,
  Camera,
  Mic,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Printer,
  Scanner,
  Barcode,
  QrCode,
  Tag,
  Hash,
  AtSign,
  DollarSign,
  Euro,
  Pound,
  Yen,
  Bitcoin,
  Gift,
  Award,
  Trophy,
  Medal,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  Share,
  Download,
  Upload,
  Copy,
  Cut,
  Scissors,
  Save,
  Edit,
  Trash2,
  Archive,
  RotateCcw,
  RefreshCw,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind,
  Volume2,
  VolumeX,
  Mute,
  Maximize,
  Minimize,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Link,
  Unlink,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Filter,
  Search,
  Grid,
  List,
  Columns,
  Rows,
  Layout,
  Sidebar,
  Menu,
  MoreHorizontal,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Move,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  MoveHorizontal,
  MoveVertical,
  MousePointer,
  MousePointer2,
  Hand,
  HandMetal,
  Grip,
  GripVertical,
  GripHorizontal,
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Cross,
  Minus,
  Plus,
  Divide,
  Percent,
  Equal,
  NotEqual,
  LessThan,
  GreaterThan,
  LessThanOrEqual,
  GreaterThanOrEqual,
  Infinity,
  Pi,
  Sigma,
  Sum,
  Average,
  Median,
  Mode,
  Range,
  Variance,
  StandardDeviation,
  Correlation,
  Regression,
  Hypothesis,
  Confidence,
  PValue,
  ZScore,
  TScore,
  ChiSquare,
  FTest,
  Anova,
  TTest,
  Wilcoxon,
  MannWhitney,
  KruskalWallis,
  Friedman,
  Spearman,
  Pearson,
  Kendall,
  Cronbach,
  Factor,
  Cluster,
  Discriminant,
  Canonical,
  Principal,
  Independent,
  Dependent,
  Covariate,
  Moderator,
  Mediator,
  Confounder,
  Interaction,
  Main,
  Simple,
  Polynomial,
  Exponential,
  Logarithmic,
  Power,
  Reciprocal,
  SquareRoot,
  CubeRoot,
  Absolute,
  Floor,
  Ceiling,
  Round,
  Truncate,
  Modulo,
  Remainder,
  Quotient,
  Product,
  Difference,
  Summation,
  Integration,
  Differentiation,
  Limit,
  Derivative,
  Integral,
  Gradient,
  Divergence,
  Curl,
  Laplacian,
  Hessian,
  Jacobian,
  Determinant,
  Trace,
  Eigenvalue,
  Eigenvector,
  Singular,
  Orthogonal,
  Normal,
  Unit,
  Identity,
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten
} from 'lucide-react';
import { EnterpriseSidebarSection } from './EnterpriseSidebar';

// Missing icon imports
import { 
  Handshake,
  Code,
  GraduationCap
} from 'lucide-react';

// Enterprise Sidebar Configuration
export const enterpriseSidebarConfig: EnterpriseSidebarSection[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    items: [
      {
        id: 'overview',
        title: 'Overview',
        path: '/dashboard',
        icon: Activity,
        badge: { count: 3, variant: 'secondary' }
      },
      {
        id: 'analytics',
        title: 'Analytics',
        path: '/analytics',
        icon: BarChart3,
        isNew: true
      },
      {
        id: 'performance',
        title: 'Performance',
        path: '/performance',
        icon: TrendingUp
      },
      {
        id: 'health',
        title: 'System Health',
        path: '/health',
        icon: ActivitySquare,
        badge: { count: 2, variant: 'destructive' }
      }
    ]
  },
  {
    id: 'operations',
    title: 'Operations',
    icon: Briefcase,
    isCollapsible: true,
    defaultExpanded: true,
    items: [
      {
        id: 'carrier',
        title: 'Carrier Portal',
        path: '/carrier',
        icon: Truck,
        badge: { count: 127, variant: 'secondary' }
      },
      {
        id: 'broker',
        title: 'Broker Portal',
        path: '/broker',
        icon: Building2,
        badge: { count: 234, variant: 'secondary' }
      },
      {
        id: 'shipper',
        title: 'Shipper Portal',
        path: '/shipper',
        icon: Package,
        badge: { count: 156, variant: 'secondary' }
      },
      {
        id: 'driver',
        title: 'Driver Portal',
        path: '/driver',
        icon: Car,
        badge: { count: 89, variant: 'secondary' }
      },
      {
        id: 'owner-operator',
        title: 'Owner Operator',
        path: '/owner-operator',
        icon: UserCheck,
        badge: { count: 45, variant: 'secondary' }
      },
      {
        id: 'load-board',
        title: 'Load Board',
        path: '/load-board',
        icon: ClipboardList,
        badge: { count: 67, variant: 'secondary' }
      },
      {
        id: 'dispatch',
        title: 'Dispatch',
        path: '/dispatch',
        icon: Route,
        badge: { count: 23, variant: 'secondary' }
      },
      {
        id: 'tracking',
        title: 'Tracking',
        path: '/tracking',
        icon: MapPin,
        badge: { count: 189, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'crm',
    title: 'Customer Management',
    icon: Users,
    isCollapsible: true,
    items: [
      {
        id: 'contacts',
        title: 'Contacts',
        path: '/crm/contacts',
        icon: Users,
        badge: { count: 234, variant: 'secondary' }
      },
      {
        id: 'leads',
        title: 'Leads',
        path: '/crm/leads',
        icon: UserCheck,
        badge: { count: 45, variant: 'secondary' }
      },
      {
        id: 'opportunities',
        title: 'Opportunities',
        path: '/crm/opportunities',
        icon: Target,
        badge: { count: 12, variant: 'secondary' }
      },
      {
        id: 'accounts',
        title: 'Accounts',
        path: '/crm/accounts',
        icon: Building2,
        badge: { count: 89, variant: 'secondary' }
      },
      {
        id: 'deals',
        title: 'Deals',
        path: '/crm/deals',
        icon: Handshake,
        badge: { count: 23, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    icon: Banknote,
    isCollapsible: true,
    items: [
      {
        id: 'invoices',
        title: 'Invoices',
        path: '/finance/invoices',
        icon: Receipt,
        badge: { count: 156, variant: 'secondary' }
      },
      {
        id: 'payments',
        title: 'Payments',
        path: '/finance/payments',
        icon: CreditCard,
        badge: { count: 89, variant: 'secondary' }
      },
      {
        id: 'expenses',
        title: 'Expenses',
        path: '/finance/expenses',
        icon: DollarSign,
        badge: { count: 234, variant: 'secondary' }
      },
      {
        id: 'reports',
        title: 'Reports',
        path: '/finance/reports',
        icon: FileSpreadsheet,
        badge: { count: 12, variant: 'secondary' }
      },
      {
        id: 'factoring',
        title: 'Factoring',
        path: '/factoring',
        icon: Wallet,
        badge: { count: 67, variant: 'secondary' }
      },
      {
        id: 'rates',
        title: 'Rate Management',
        path: '/rates',
        icon: Calculator,
        badge: { count: 345, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: FileText,
    isCollapsible: true,
    items: [
      {
        id: 'uploads',
        title: 'Uploads',
        path: '/documents/uploads',
        icon: Upload,
        badge: { count: 45, variant: 'secondary' }
      },
      {
        id: 'scans',
        title: 'Scans',
        path: '/documents/scans',
        icon: Scanner,
        badge: { count: 123, variant: 'secondary' }
      },
      {
        id: 'templates',
        title: 'Templates',
        path: '/documents/templates',
        icon: FileText,
        badge: { count: 23, variant: 'secondary' }
      },
      {
        id: 'signed',
        title: 'Signed Documents',
        path: '/documents/signed',
        icon: CheckCircle,
        badge: { count: 89, variant: 'secondary' }
      },
      {
        id: 'archived',
        title: 'Archived',
        path: '/documents/archived',
        icon: Archive,
        badge: { count: 234, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: Zap,
    isCollapsible: true,
    items: [
      {
        id: 'workflows',
        title: 'Workflows',
        path: '/automation/workflows',
        icon: Workflow,
        badge: { count: 24, variant: 'secondary' }
      },
      {
        id: 'triggers',
        title: 'Triggers',
        path: '/automation/triggers',
        icon: Zap,
        badge: { count: 12, variant: 'secondary' }
      },
      {
        id: 'rules',
        title: 'Rules',
        path: '/automation/rules',
        icon: Shield,
        badge: { count: 8, variant: 'secondary' }
      },
      {
        id: 'integrations',
        title: 'Integrations',
        path: '/automation/integrations',
        icon: Link,
        badge: { count: 15, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'autonomous',
    title: 'Autonomous System',
    icon: Brain,
    isCollapsible: true,
    items: [
      {
        id: 'agents',
        title: 'AI Agents',
        path: '/autonomous/agents',
        icon: Bot,
        badge: { count: 250, variant: 'secondary' }
      },
      {
        id: 'monitoring',
        title: 'Monitoring',
        path: '/autonomous/monitoring',
        icon: Activity,
        badge: { count: 5, variant: 'destructive' }
      },
      {
        id: 'logs',
        title: 'System Logs',
        path: '/autonomous/logs',
        icon: FileText,
        badge: { count: 1234, variant: 'secondary' }
      },
      {
        id: 'performance',
        title: 'Performance',
        path: '/autonomous/performance',
        icon: TrendingUp,
        badge: { count: 98, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    icon: Store,
    isCollapsible: true,
    items: [
      {
        id: 'apps',
        title: 'Apps',
        path: '/marketplace/apps',
        icon: Grid,
        badge: { count: 45, variant: 'secondary' }
      },
      {
        id: 'services',
        title: 'Services',
        path: '/marketplace/services',
        icon: Wrench,
        badge: { count: 23, variant: 'secondary' }
      },
      {
        id: 'partners',
        title: 'Partners',
        path: '/marketplace/partners',
        icon: Handshake,
        badge: { count: 12, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'edi',
    title: 'EDI & Integration',
    icon: Database,
    isCollapsible: true,
    items: [
      {
        id: 'edi-processing',
        title: 'EDI Processing',
        path: '/edi/processing',
        icon: Database,
        badge: { count: 1234, variant: 'secondary' }
      },
      {
        id: 'edi-monitoring',
        title: 'Monitoring',
        path: '/edi/monitoring',
        icon: Activity,
        badge: { count: 2, variant: 'destructive' }
      },
      {
        id: 'api-management',
        title: 'API Management',
        path: '/edi/api',
        icon: Code,
        badge: { count: 15, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'workers',
    title: 'Workforce',
    icon: Users,
    isCollapsible: true,
    items: [
      {
        id: 'staff',
        title: 'Staff Management',
        path: '/workers/staff',
        icon: Users,
        badge: { count: 89, variant: 'secondary' }
      },
      {
        id: 'scheduling',
        title: 'Scheduling',
        path: '/workers/scheduling',
        icon: Calendar,
        badge: { count: 156, variant: 'secondary' }
      },
      {
        id: 'performance',
        title: 'Performance',
        path: '/workers/performance',
        icon: TrendingUp,
        badge: { count: 94, variant: 'secondary' }
      },
      {
        id: 'training',
        title: 'Training',
        path: '/workers/training',
        icon: GraduationCap,
        badge: { count: 23, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'support',
    title: 'Support',
    icon: LifeBuoy,
    isCollapsible: true,
    items: [
      {
        id: 'help-center',
        title: 'Help Center',
        path: '/support/help',
        icon: HelpCircle,
        badge: { count: 45, variant: 'secondary' }
      },
      {
        id: 'chat',
        title: 'Live Chat',
        path: '/support/chat',
        icon: MessageSquare,
        badge: { count: 12, variant: 'secondary' }
      },
      {
        id: 'feedback',
        title: 'Feedback',
        path: '/support/feedback',
        icon: MessageSquare,
        badge: { count: 8, variant: 'secondary' }
      },
      {
        id: 'audit-logs',
        title: 'Audit Logs',
        path: '/support/audit',
        icon: FileText,
        badge: { count: 234, variant: 'secondary' }
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    isCollapsible: true,
    items: [
      {
        id: 'preferences',
        title: 'Preferences',
        path: '/settings/preferences',
        icon: Settings,
        badge: { count: 5, variant: 'secondary' }
      },
      {
        id: 'api-keys',
        title: 'API Keys',
        path: '/settings/api-keys',
        icon: Key,
        badge: { count: 12, variant: 'secondary' }
      },
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        path: '/settings/roles',
        icon: Shield,
        badge: { count: 8, variant: 'secondary' }
      },
      {
        id: 'security',
        title: 'Security',
        path: '/settings/security',
        icon: Lock,
        badge: { count: 3, variant: 'secondary' }
      },
      {
        id: 'integrations',
        title: 'Integrations',
        path: '/settings/integrations',
        icon: Link,
        badge: { count: 15, variant: 'secondary' }
      }
    ]
  }
];

// Super Admin specific configuration
export const superAdminSidebarConfig: EnterpriseSidebarSection[] = [
  {
    id: 'super-admin',
    title: 'Super Admin',
    icon: Crown,
    items: [
      {
        id: 'global-dashboard',
        title: 'Global Dashboard',
        path: '/super-admin',
        icon: Activity,
        badge: { count: 20, variant: 'secondary' }
      },
      {
        id: 'portal-management',
        title: 'Portal Management',
        path: '/super-admin/portals',
        icon: Globe,
        badge: { count: 20, variant: 'secondary' }
      },
      {
        id: 'user-administration',
        title: 'User Administration',
        path: '/super-admin/users',
        icon: Users,
        badge: { count: 1234, variant: 'secondary' }
      },
      {
        id: 'system-health',
        title: 'System Health',
        path: '/super-admin/health',
        icon: ActivitySquare,
        badge: { count: 5, variant: 'destructive' }
      }
    ]
  },
  ...enterpriseSidebarConfig
];

// Portal-specific configurations
export const getPortalSidebarConfig = (portalType: string): EnterpriseSidebarSection[] => {
  const baseConfig = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      items: [
        {
          id: 'overview',
          title: 'Overview',
          path: `/${portalType}`,
          icon: Activity
        },
        {
          id: 'analytics',
          title: 'Analytics',
          path: `/${portalType}/analytics`,
          icon: BarChart3
        }
      ]
    }
  ];

  switch (portalType) {
    case 'carrier':
      return [
        ...baseConfig,
        {
          id: 'fleet',
          title: 'Fleet Management',
          icon: Truck,
          isCollapsible: true,
          items: [
            { id: 'vehicles', title: 'Vehicles', path: '/carrier/vehicles', icon: Truck },
            { id: 'drivers', title: 'Drivers', path: '/carrier/drivers', icon: Users },
            { id: 'maintenance', title: 'Maintenance', path: '/carrier/maintenance', icon: Wrench }
          ]
        },
        {
          id: 'operations',
          title: 'Operations',
          icon: Briefcase,
          isCollapsible: true,
          items: [
            { id: 'loads', title: 'Loads', path: '/carrier/loads', icon: Package },
            { id: 'dispatch', title: 'Dispatch', path: '/carrier/dispatch', icon: Route },
            { id: 'tracking', title: 'Tracking', path: '/carrier/tracking', icon: MapPin }
          ]
        }
      ];
    
    case 'broker':
      return [
        ...baseConfig,
        {
          id: 'loads',
          title: 'Load Management',
          icon: Package,
          isCollapsible: true,
          items: [
            { id: 'load-board', title: 'Load Board', path: '/broker/loads', icon: ClipboardList },
            { id: 'matching', title: 'Load Matching', path: '/broker/matching', icon: Target },
            { id: 'pricing', title: 'Pricing', path: '/broker/pricing', icon: Calculator }
          ]
        },
        {
          id: 'carriers',
          title: 'Carrier Network',
          icon: Truck,
          isCollapsible: true,
          items: [
            { id: 'carriers', title: 'Carriers', path: '/broker/carriers', icon: Truck },
            { id: 'contracts', title: 'Contracts', path: '/broker/contracts', icon: FileText },
            { id: 'performance', title: 'Performance', path: '/broker/performance', icon: TrendingUp }
          ]
        }
      ];

    case 'shipper':
      return [
        ...baseConfig,
        {
          id: 'shipments',
          title: 'Shipments',
          icon: Package,
          isCollapsible: true,
          items: [
            { id: 'shipments', title: 'Shipments', path: '/shipper/shipments', icon: Package },
            { id: 'tracking', title: 'Tracking', path: '/shipper/tracking', icon: MapPin },
            { id: 'reports', title: 'Reports', path: '/shipper/reports', icon: FileSpreadsheet }
          ]
        },
        {
          id: 'carriers',
          title: 'Carrier Management',
          icon: Truck,
          isCollapsible: true,
          items: [
            { id: 'carriers', title: 'Carriers', path: '/shipper/carriers', icon: Truck },
            { id: 'rating', title: 'Rating', path: '/shipper/rating', icon: Star },
            { id: 'contracts', title: 'Contracts', path: '/shipper/contracts', icon: FileText }
          ]
        }
      ];

    default:
      return baseConfig;
  }
};

export default enterpriseSidebarConfig;
