import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Shield, Users, Settings, Database, Globe, Activity, 
  BarChart3, Lock, Search, AlertTriangle, CheckCircle, Clock,
  TrendingUp, Server, Network, Zap, Eye, EyeOff, RefreshCw,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  LogOut, Sun, Moon, ChevronDown, ChevronLeft, ChevronRight,
  Home, Building2, Phone, Mail, MapPin, Calendar, DollarSign,
  Truck, Package, Car, Briefcase, Calculator, FileText,
  ShieldCheck, Key, Fingerprint, Wifi, HardDrive, Cpu,
  HardDriveIcon, WifiOff, AlertCircle, Info,
  Folder, Cog, Wrench, UserCheck, UserX, ShieldX,
  ArrowUpRight, ArrowDownRight, Minus, XCircle,
  Link, Heart, TrendingDown, PieChart,
  LineChart, BarChart4, ScatterChart, ActivitySquare,
  CalendarDays, Target, Award, Trophy,
  Share, Unlock, Settings2,
  LayoutDashboard, Code, Bug, Palette, Maximize2, Menu,
  CircuitBoard, BookOpen, HelpCircle, Rocket, Command,
  Crown, Star, Sparkles, Atom, BrainCircuit,
  CpuIcon, DatabaseIcon, NetworkIcon, ServerIcon,
  ShieldIcon, UsersIcon, SettingsIcon, GlobeIcon,
  ActivityIcon, BarChartIcon, LockIcon, SearchIcon,
  AlertTriangleIcon, CheckCircleIcon, ClockIcon,
  TrendingUpIcon, ZapIcon, EyeIcon, EyeOffIcon, RefreshCwIcon,
  PlayIcon, PauseIcon, RotateCcwIcon, SaveIcon, DownloadIcon, UploadIcon,
  Trash2Icon, EditIcon, PlusIcon, FilterIcon, MoreHorizontalIcon, BellIcon, UserIcon,
  LogOutIcon, SunIcon, MoonIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon,
  HomeIcon, Building2Icon, PhoneIcon, MailIcon, MapPinIcon, CalendarIcon, DollarSignIcon,
  TruckIcon, PackageIcon, CarIcon, BriefcaseIcon, CalculatorIcon, FileTextIcon,
  ShieldCheckIcon, KeyIcon, FingerprintIcon, WifiIcon, HardDriveIcon as HDIcon, CpuIcon as CpuIcon2,
  WifiOffIcon, AlertCircleIcon, InfoIcon,
  FolderIcon, CogIcon, WrenchIcon, UserCheckIcon, UserXIcon, ShieldXIcon,
  ArrowUpRightIcon, ArrowDownRightIcon, MinusIcon, XCircleIcon,
  LinkIcon, HeartIcon, TrendingDownIcon, PieChartIcon,
  LineChartIcon, BarChart4Icon, ScatterChartIcon, ActivitySquareIcon,
  CalendarDaysIcon, TargetIcon, AwardIcon, TrophyIcon,
  ShareIcon, UnlockIcon, Settings2Icon,
  LayoutDashboardIcon, CodeIcon, BugIcon, PaletteIcon, Maximize2Icon, MenuIcon,
  CircuitBoardIcon, BookOpenIcon, HelpCircleIcon, RocketIcon, CommandIcon
} from 'lucide-react';

// Enhanced Icon Component with animations and colors
interface EnhancedIconProps {
  icon: React.ComponentType<any>;
  size?: number;
  className?: string;
  color?: string;
  animated?: boolean;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gradient';
  pulse?: boolean;
  glow?: boolean;
}

export const EnhancedIcon: React.FC<EnhancedIconProps> = ({
  icon: Icon,
  size = 20,
  className = '',
  color,
  animated = true,
  variant = 'default',
  pulse = false,
  glow = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'success':
        return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'danger':
        return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'info':
        return 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20';
      case 'gradient':
        return 'text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text';
      default:
        return 'text-slate-600 dark:text-slate-300';
    }
  };

  const getGlowStyles = () => {
    if (!glow) return '';
    switch (variant) {
      case 'primary':
        return 'shadow-lg shadow-blue-500/25';
      case 'success':
        return 'shadow-lg shadow-green-500/25';
      case 'warning':
        return 'shadow-lg shadow-yellow-500/25';
      case 'danger':
        return 'shadow-lg shadow-red-500/25';
      case 'info':
        return 'shadow-lg shadow-cyan-500/25';
      case 'gradient':
        return 'shadow-lg shadow-purple-500/25';
      default:
        return 'shadow-lg shadow-slate-500/25';
    }
  };

  const IconComponent = (
    <div className={`
      inline-flex items-center justify-center rounded-lg p-2 transition-all duration-300
      ${getVariantStyles()}
      ${getGlowStyles()}
      ${pulse ? 'animate-pulse' : ''}
      ${animated ? 'hover:scale-110 hover:rotate-3' : ''}
      ${className}
    `}>
      <Icon size={size} />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {IconComponent}
      </motion.div>
    );
  }

  return IconComponent;
};

// Pre-configured enhanced icons for common use cases
export const EnhancedIcons = {
  // System Icons
  Dashboard: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={LayoutDashboard} variant="primary" {...props} />
  ),
  Settings: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Settings} variant="info" {...props} />
  ),
  Users: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Users} variant="success" {...props} />
  ),
  Shield: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Shield} variant="warning" {...props} />
  ),
  Database: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Database} variant="info" {...props} />
  ),
  Activity: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Activity} variant="success" {...props} />
  ),
  Analytics: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={BarChart3} variant="primary" {...props} />
  ),
  Security: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={ShieldCheck} variant="danger" {...props} />
  ),
  Network: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Network} variant="info" {...props} />
  ),
  Server: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Server} variant="warning" {...props} />
  ),
  Brain: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Brain} variant="gradient" glow {...props} />
  ),
  Zap: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Zap} variant="warning" glow {...props} />
  ),
  CircuitBoard: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={CircuitBoard} variant="gradient" glow {...props} />
  ),
  Rocket: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Rocket} variant="primary" glow {...props} />
  ),
  Command: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Command} variant="gradient" glow {...props} />
  ),
  
  // Action Icons
  Edit: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Edit} variant="info" {...props} />
  ),
  Delete: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Trash2} variant="danger" {...props} />
  ),
  Add: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Plus} variant="success" {...props} />
  ),
  Save: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Save} variant="success" {...props} />
  ),
  Download: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Download} variant="primary" {...props} />
  ),
  Upload: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Upload} variant="primary" {...props} />
  ),
  Refresh: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={RefreshCw} variant="info" {...props} />
  ),
  Play: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Play} variant="success" {...props} />
  ),
  Pause: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Pause} variant="warning" {...props} />
  ),
  
  // Status Icons
  Success: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={CheckCircle} variant="success" {...props} />
  ),
  Error: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={XCircle} variant="danger" {...props} />
  ),
  Warning: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={AlertTriangle} variant="warning" {...props} />
  ),
  Info: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Info} variant="info" {...props} />
  ),
  Clock: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Clock} variant="warning" {...props} />
  ),
  
  // Navigation Icons
  Home: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Home} variant="primary" {...props} />
  ),
  Globe: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Globe} variant="info" {...props} />
  ),
  Building: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Building2} variant="warning" {...props} />
  ),
  Folder: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Folder} variant="info" {...props} />
  ),
  
  // UI Icons
  Menu: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Menu} variant="default" {...props} />
  ),
  Search: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Search} variant="info" {...props} />
  ),
  Filter: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Filter} variant="info" {...props} />
  ),
  More: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={MoreHorizontal} variant="default" {...props} />
  ),
  Bell: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Bell} variant="warning" {...props} />
  ),
  User: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={User} variant="primary" {...props} />
  ),
  LogOut: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={LogOut} variant="danger" {...props} />
  ),
  
  // Theme Icons
  Sun: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Sun} variant="warning" {...props} />
  ),
  Moon: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Moon} variant="info" {...props} />
  ),
  
  // Direction Icons
  ChevronDown: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={ChevronDown} variant="default" {...props} />
  ),
  ChevronLeft: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={ChevronLeft} variant="default" {...props} />
  ),
  ChevronRight: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={ChevronRight} variant="default" {...props} />
  ),
  
  // Business Icons
  DollarSign: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={DollarSign} variant="success" {...props} />
  ),
  Calendar: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Calendar} variant="info" {...props} />
  ),
  FileText: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={FileText} variant="default" {...props} />
  ),
  Briefcase: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Briefcase} variant="primary" {...props} />
  ),
  
  // Transport Icons
  Truck: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Truck} variant="warning" {...props} />
  ),
  Package: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Package} variant="info" {...props} />
  ),
  Car: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Car} variant="primary" {...props} />
  ),
  
  // Development Icons
  Code: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Code} variant="primary" {...props} />
  ),
  Bug: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Bug} variant="danger" {...props} />
  ),
  Palette: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Palette} variant="gradient" {...props} />
  ),
  BookOpen: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={BookOpen} variant="info" {...props} />
  ),
  HelpCircle: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={HelpCircle} variant="info" {...props} />
  ),
  
  // Chart Icons
  TrendingUp: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={TrendingUp} variant="success" {...props} />
  ),
  TrendingDown: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={TrendingDown} variant="danger" {...props} />
  ),
  PieChart: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={PieChart} variant="primary" {...props} />
  ),
  LineChart: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={LineChart} variant="info" {...props} />
  ),
  
  // Special Icons
  Crown: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Crown} variant="gradient" glow {...props} />
  ),
  Star: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Star} variant="warning" glow {...props} />
  ),
  Sparkles: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Sparkles} variant="gradient" glow {...props} />
  ),
  Lightning: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Zap} variant="warning" glow {...props} />
  ),
  Atom: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={Atom} variant="gradient" glow {...props} />
  ),
  BrainCircuit: (props: Omit<EnhancedIconProps, 'icon'>) => (
    <EnhancedIcon icon={BrainCircuit} variant="gradient" glow {...props} />
  ),
};

export default EnhancedIcons;
