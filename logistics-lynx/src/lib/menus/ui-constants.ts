import { MenuSection } from '@/lib/types/menu';
import {
  UserCog,
  Wrench,
  Building2,
  BadgeDollarSign,
  UserCog2,
  FileStack,
  CreditCard,
  Phone,
  MessageSquare,
  FileText,
  Share2,
  Mail,
  BookOpen,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";

export const TOP_BAR_SETTINGS = [
  { title: "User Management", icon: UserCog, path: "/settings/user-management" },
  { title: "General Settings", icon: Wrench, path: "/settings/general" },
  { title: "Company Settings", icon: Building2, path: "/settings/company" },
  { title: "Payroll Settings", icon: BadgeDollarSign, path: "/settings/payroll" },
  { title: "Account Settings", icon: UserCog2, path: "/settings/account" },
  { title: "Templates & Documents", icon: FileStack, path: "/settings/templates" },
  { title: "My Subscription", icon: CreditCard, path: "/settings/subscription" },
];

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];

export const FLOATING_ACTION_MENU = [
  { title: "Calls", icon: Phone, path: "/communication/calls" },
  { title: "Chat", icon: MessageSquare, path: "/communication/chat" },
  { title: "Notes", icon: FileText, path: "/communication/notes" },
  { title: "Social Media", icon: Share2, path: "/communication/social" },
  { title: "Email", icon: Mail, path: "/communication/email" },
];

export const SIDEBAR_ICONS = {
  learn: BookOpen,
  help: HelpCircle,
  darkMode: Moon,
  lightMode: Sun,
};
