/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LucideIcon } from 'lucide-react';
import {  } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Installation",
        href: "/docs/installation",
      },
      {
        title: "Components",
        href: "/docs/components",
      },
    ],
  },
];

export const componentsNavigation: NavSection[] = [
  {
    title: "Components",
    items: [
      {
        title: "Accordion",
        href: "/components/accordion",
      },
      {
        title: "Alert",
        href: "/components/alert",
      },
      {
        title: "Alert Dialog",
        href: "/components/alert-dialog",
      },
      {
        title: "Aspect Ratio",
        href: "/components/aspect-ratio",
      },
      {
        title: "Avatar",
        href: "/components/avatar",
      },
      {
        title: "Badge",
        href: "/components/badge",
      },
      {
        title: "Button",
        href: "/components/button",
      },
      {
        title: "Calendar",
        href: "/components/calendar",
      },
      {
        title: "Card",
        href: "/components/card",
      },
      {
        title: "Carousel",
        href: "/components/carousel",
      },
      {
        title: "Checkbox",
        href: "/components/checkbox",
      },
      {
        title: "Collapsible",
        href: "/components/collapsible",
      },
      {
        title: "Combobox",
        href: "/components/combobox",
      },
      {
        title: "Command",
        href: "/components/command",
      },
      {
        title: "Context Menu",
        href: "/components/context-menu",
      },
      {
        title: "Dialog",
        href: "/components/dialog",
      },
      {
        title: "Dropdown Menu",
        href: "/components/dropdown-menu",
      },
      {
        title: "Form",
        href: "/components/form",
      },
      {
        title: "Hover Card",
        href: "/components/hover-card",
      },
      {
        title: "Input",
        href: "/components/input",
      },
      {
        title: "Label",
        href: "/components/label",
      },
      {
        title: "Menubar",
        href: "/components/menubar",
      },
      {
        title: "Navigation Menu",
        href: "/components/navigation-menu",
      },
      {
        title: "Pagination",
        href: "/components/pagination",
      },
      {
        title: "Popover",
        href: "/components/popover",
      },
      {
        title: "Progress",
        href: "/components/progress",
      },
      {
        title: "Radio Group",
        href: "/components/radio-group",
      },
      {
        title: "Scroll Area",
        href: "/components/scroll-area",
      },
      {
        title: "Select",
        href: "/components/select",
      },
      {
        title: "Separator",
        href: "/components/separator",
      },
      {
        title: "Sheet",
        href: "/components/sheet",
      },
      {
        title: "Skeleton",
        href: "/components/skeleton",
      },
      {
        title: "Slider",
        href: "/components/slider",
      },
      {
        title: "Switch",
        href: "/components/switch",
      },
      {
        title: "Table",
        href: "/components/table",
      },
      {
        title: "Tabs",
        href: "/components/tabs",
      },
      {
        title: "Textarea",
        href: "/components/textarea",
      },
      {
        title: "Toast",
        href: "/components/toast",
      },
      {
        title: "Toggle",
        href: "/components/toggle",
      },
      {
        title: "Tooltip",
        href: "/components/tooltip",
      },
    ],
  },
];

export const FLOATING_ACTION_MENU = [
  { title: "Emergency Call", icon: Phone, path: "/driver/emergency", priority: "emergency" },
  { title: "Dispatch Chat", icon: MessageSquare, path: "/driver/dispatch-chat", priority: "high" },
  { title: "Trip Log", icon: FileText, path: "/driver/trip-log", priority: "medium" },
  { title: "Navigation", icon: Share2, path: "/driver/navigation", priority: "high" },
  { title: "Customer Email", icon: Mail, path: "/driver/customer-email", priority: "medium" },
];

export const APP_NAME = 'Trans Bot AI';
export const APP_VERSION = '1.0.0';
