# 🏢 Enterprise Sidebar System

A comprehensive, production-ready sidebar system built with Radix UI and Tailwind CSS, designed for enterprise applications with full accessibility, theme support, and responsive design.

## ✨ Features

### 🎯 Core Features
- **Collapsible & Resizable**: 64px collapsed, 240px expanded
- **Full Accessibility**: ARIA compliant with keyboard navigation
- **Theme Support**: Dark/light mode with CSS custom properties
- **Responsive Design**: Mobile-first with drawer navigation
- **Search Functionality**: Real-time filtering of navigation items
- **Favorites System**: Bookmark frequently used items
- **Recent Items**: Track recently visited pages
- **Badge Support**: Show notifications, counts, and status indicators
- **Section Collapsible**: Organize items into collapsible sections

### 🎨 Design System
- **Radix UI Components**: Unstyled, accessible primitives
- **Tailwind CSS**: Utility-first styling
- **CSS Custom Properties**: Theme tokens for consistency
- **Smooth Animations**: CSS transitions and keyframes
- **Glassmorphism**: Modern visual effects
- **Status Indicators**: Color-coded badges and indicators

### 🔧 Technical Features
- **TypeScript**: Full type safety
- **React Hooks**: Custom state management
- **Performance Optimized**: Memoized components and callbacks
- **SEO Friendly**: Proper semantic HTML
- **Cross-browser**: Modern browser support
- **Print Styles**: Optimized for printing

## 📁 File Structure

```
src/components/sidebar/
├── EnterpriseSidebar.tsx          # Main sidebar component
├── EnterpriseSidebarConfig.tsx    # Configuration and data
├── EnterpriseLayout.tsx           # Layout wrapper
└── ENTERPRISE_SIDEBAR_README.md   # This documentation
```

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import { EnterpriseSidebar } from '@/components/sidebar/EnterpriseSidebar';
import { enterpriseSidebarConfig } from '@/components/sidebar/EnterpriseSidebarConfig';

function App() {
  return (
    <EnterpriseSidebar
      sections={enterpriseSidebarConfig}
      defaultCollapsed={false}
      showSearch={true}
      showThemeToggle={true}
      showUserProfile={true}
    />
  );
}
```

### 2. With Layout Wrapper

```tsx
import { EnterpriseLayout } from '@/components/layout/EnterpriseLayout';

function App() {
  return (
    <EnterpriseLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/carrier" element={<CarrierPortal />} />
        {/* ... other routes */}
      </Routes>
    </EnterpriseLayout>
  );
}
```

### 3. Portal-Specific Configuration

```tsx
import { getPortalSidebarConfig } from '@/components/sidebar/EnterpriseSidebarConfig';

function CarrierPortal() {
  const carrierConfig = getPortalSidebarConfig('carrier');
  
  return (
    <EnterpriseLayout sidebarConfig={carrierConfig} portalType="carrier">
      <CarrierDashboard />
    </EnterpriseLayout>
  );
}
```

## ⚙️ Configuration

### Sidebar Section Structure

```tsx
interface EnterpriseSidebarSection {
  id: string;
  title: string;
  items: EnterpriseSidebarItem[];
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

interface EnterpriseSidebarItem {
  id: string;
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    count: number;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  isExternal?: boolean;
  isDisabled?: boolean;
  isNew?: boolean;
  isBeta?: boolean;
  subItems?: EnterpriseSidebarItem[];
  permissions?: string[];
}
```

### Example Configuration

```tsx
const sidebarConfig: EnterpriseSidebarSection[] = [
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
      }
    ]
  }
];
```

## 🎨 Customization

### Theme Customization

The sidebar uses CSS custom properties for theming. Override these in your CSS:

```css
:root {
  --color-primary: 221.2 83.2% 53.3%;
  --color-background: 0 0% 100%;
  --color-foreground: 222.2 84% 4.9%;
  --sidebar-width: 16rem;
  --sidebar-width-collapsed: 4rem;
}

.dark {
  --color-primary: 217.2 91.2% 59.8%;
  --color-background: 222.2 84% 4.9%;
  --color-foreground: 210 40% 98%;
}
```

### Component Styling

Customize individual components using Tailwind classes:

```tsx
<EnterpriseSidebar
  className="custom-sidebar"
  sections={config}
/>
```

### Custom Icons

Use any icon library compatible with React:

```tsx
import { Home, Settings, Users } from 'lucide-react';
// or
import { FiHome, FiSettings, FiUsers } from 'react-icons/fi';

const config = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home, // or FiHome
    items: [...]
  }
];
```

## 🔧 Props Reference

### EnterpriseSidebar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `defaultCollapsed` | `boolean` | `false` | Initial collapsed state |
| `showSearch` | `boolean` | `true` | Show search functionality |
| `showFavorites` | `boolean` | `true` | Show favorites section |
| `showRecent` | `boolean` | `true` | Show recent items |
| `showThemeToggle` | `boolean` | `true` | Show theme toggle |
| `showUserProfile` | `boolean` | `true` | Show user profile |
| `sections` | `EnterpriseSidebarSection[]` | `[]` | Navigation sections |
| `onItemClick` | `(item: EnterpriseSidebarItem) => void` | `undefined` | Item click handler |
| `onToggleCollapse` | `(collapsed: boolean) => void` | `undefined` | Collapse state change handler |

### EnterpriseLayout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `showSidebar` | `boolean` | `true` | Show sidebar |
| `sidebarConfig` | `EnterpriseSidebarSection[]` | `undefined` | Custom sidebar config |
| `portalType` | `string` | `undefined` | Portal type for config |

## 🎯 Portal Types

The system includes pre-configured sidebar configurations for different portal types:

- **Super Admin**: Global administration and oversight
- **Carrier**: Fleet management and operations
- **Broker**: Load matching and rate optimization
- **Shipper**: Logistics and shipment tracking
- **Driver**: Personal driving command center
- **Owner Operator**: Independent business management
- **Analytics**: Business intelligence and reporting
- **Admin**: System administration
- **Factoring**: Financial services
- **Load Board**: Real-time load matching
- **CRM**: Customer relationship management
- **Financials**: Financial management
- **EDI**: Electronic data interchange
- **Marketplace**: TMS marketplace
- **Workers**: Workforce management
- **Rates**: Rate management

## 🔄 State Management

The sidebar uses a custom hook for state management:

```tsx
const useEnterpriseSidebarToggle = (defaultCollapsed = false) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // ... state management logic

  return {
    collapsed,
    searchQuery,
    setSearchQuery,
    favorites,
    recentItems,
    expandedSections,
    toggleCollapse,
    addToFavorites,
    addToRecent,
    toggleSection
  };
};
```

## 🎨 CSS Classes

### Layout Classes
- `.enterprise-layout`: Main layout container
- `.enterprise-sidebar`: Sidebar container
- `.enterprise-sidebar.collapsed`: Collapsed state
- `.enterprise-content`: Main content area

### Component Classes
- `.enterprise-card`: Card component styling
- `.enterprise-button`: Button component styling
- `.enterprise-input`: Input component styling
- `.enterprise-badge`: Badge component styling
- `.enterprise-table`: Table component styling

### Utility Classes
- `.animate-fade-in`: Fade in animation
- `.animate-slide-up`: Slide up animation
- `.scrollbar-hide`: Hide scrollbars
- `.glass-card`: Glassmorphism effect
- `.loading-skeleton`: Loading state

## ♿ Accessibility

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate through items
- **Escape**: Close dropdowns and modals

### ARIA Attributes
- `aria-expanded`: Section collapse state
- `aria-current`: Current page indicator
- `aria-label`: Descriptive labels
- `aria-describedby`: Additional descriptions

### Screen Reader Support
- Semantic HTML structure
- Proper heading hierarchy
- Descriptive link text
- Status announcements

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Drawer navigation
- **Tablet**: 768px - 1024px - Collapsible sidebar
- **Desktop**: > 1024px - Full sidebar

### Mobile Features
- Slide-out drawer navigation
- Touch-friendly interactions
- Optimized spacing and sizing
- Gesture support

## 🎨 Theme Support

### Light Theme
- Clean, modern appearance
- High contrast for readability
- Subtle shadows and borders
- Professional color palette

### Dark Theme
- Reduced eye strain
- Consistent color scheme
- Proper contrast ratios
- Smooth transitions

### Custom Themes
- CSS custom properties
- Easy color customization
- Consistent design tokens
- Flexible theming system

## 🔧 Development

### Prerequisites
- React 18+
- TypeScript 4.5+
- Tailwind CSS 3.0+
- Radix UI components

### Installation
```bash
npm install @radix-ui/react-collapsible @radix-ui/react-dropdown-menu @radix-ui/react-tooltip lucide-react
```

### Building
```bash
npm run build
```

### Testing
```bash
npm run test
```

## 📚 Examples

### Basic Sidebar
```tsx
import { EnterpriseSidebar } from './EnterpriseSidebar';

function App() {
  return (
    <EnterpriseSidebar
      sections={[
        {
          id: 'main',
          title: 'Main',
          items: [
            { id: 'home', title: 'Home', path: '/', icon: Home },
            { id: 'settings', title: 'Settings', path: '/settings', icon: Settings }
          ]
        }
      ]}
    />
  );
}
```

### With Custom Styling
```tsx
<EnterpriseSidebar
  className="bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
  sections={config}
  showSearch={false}
  showThemeToggle={false}
/>
```

### With Event Handlers
```tsx
<EnterpriseSidebar
  sections={config}
  onItemClick={(item) => {
    console.log('Clicked:', item.title);
    analytics.track('sidebar_navigation', { item: item.id });
  }}
  onToggleCollapse={(collapsed) => {
    localStorage.setItem('sidebar_collapsed', collapsed.toString());
  }}
/>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the examples
- Contact the development team

---

**Built with ❤️ using Radix UI and Tailwind CSS**
