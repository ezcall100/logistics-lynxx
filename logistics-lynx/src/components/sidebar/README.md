# Enhanced Enterprise Sidebar System

A complete, enterprise-grade sidebar solution for TMS applications built with Radix UI components, featuring advanced functionality, theme support, and responsive design.

## 🚀 Features

### Core Functionality
- **Collapsible Sidebar**: Smooth animations with 64px (collapsed) and 240px (expanded) states
- **Search & Filtering**: Real-time search across all navigation items
- **Favorites System**: Star and organize frequently used items
- **Recent Items**: Automatic tracking of recently visited pages
- **AI Insights**: Smart recommendations and usage analytics
- **Dynamic Badges**: Real-time notifications and counts
- **Theme Toggle**: Light/dark mode support with CSS custom properties

### Enterprise Features
- **Role-Based Navigation**: Automatic configuration based on user roles
- **Super Admin Support**: Specialized sections for system administration
- **Responsive Design**: Mobile-first approach with drawer navigation
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized rendering and state management

### Design System
- **Radix UI Integration**: Built on Radix UI primitives for consistency
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Theme Variables**: Comprehensive CSS custom properties for customization
- **Smooth Animations**: 300ms transitions with easing functions
- **Modern UI**: Glass morphism effects and subtle shadows

## 📦 Installation

The enhanced sidebar system is already integrated into your TMS application. To use it:

```typescript
import { EnhancedSidebarLayout } from '@/components/sidebar';
```

## 🎯 Quick Start

### Basic Usage

```tsx
import { EnhancedSidebarLayout } from '@/components/sidebar';

function App() {
  return (
    <EnhancedSidebarLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/operations/*" element={<Operations />} />
        <Route path="/finance/*" element={<Finance />} />
        {/* Add your routes */}
      </Routes>
    </EnhancedSidebarLayout>
  );
}
```

### Advanced Configuration

```tsx
import { EnhancedSidebarLayout, getSidebarConfig } from '@/components/sidebar';

function App() {
  const handleSidebarToggle = (collapsed: boolean) => {
    console.log('Sidebar state:', collapsed);
  };

  const handleItemClick = (item: EnhancedSidebarItem) => {
    console.log('Navigation item clicked:', item);
  };

  return (
    <EnhancedSidebarLayout
      defaultCollapsed={false}
      showSearch={true}
      showFavorites={true}
      showRecent={true}
      showThemeToggle={true}
      showUserProfile={true}
      onSidebarToggle={handleSidebarToggle}
      onItemClick={handleItemClick}
    >
      <Routes>
        {/* Your routes */}
      </Routes>
    </EnhancedSidebarLayout>
  );
}
```

## 🏗️ Architecture

### Component Structure

```
EnhancedSidebar/
├── EnhancedSidebar.tsx          # Main sidebar component
├── EnhancedSidebarLayout.tsx    # Layout wrapper with routing
├── EnhancedSidebarConfig.tsx    # Navigation configuration
├── EnhancedSidebarExample.tsx   # Usage examples
├── enhanced-sidebar-styles.css  # Theme and styling
└── index.ts                     # Exports
```

### Key Components

#### EnhancedSidebar
The core sidebar component with all interactive features:
- Collapsible navigation
- Search functionality
- Favorites and recent items
- Theme toggle
- User profile

#### EnhancedSidebarLayout
Layout wrapper that integrates the sidebar with React Router:
- Automatic route handling
- Mobile responsive design
- Top bar integration
- Content area management

#### EnhancedSidebarConfig
Configuration system for navigation items:
- Role-based menu generation
- Dynamic badge support
- AI insights integration
- Submenu management

## 🎨 Customization

### Theme Customization

The sidebar uses CSS custom properties for easy theming:

```css
:root {
  --color-surface: hsl(0 0% 100%);
  --color-text: hsl(222.2 84% 4.9%);
  --color-primary: hsl(222.2 47.4% 11.2%);
  --sidebar-transition-duration: 300ms;
  --sidebar-hover-scale: 1.02;
}
```

### Custom Navigation Configuration

```typescript
import { SidebarSection } from '@/components/sidebar';

const customConfig: SidebarSection[] = [
  {
    id: 'custom-section',
    title: 'Custom Section',
    items: [
      {
        id: 'custom-item',
        title: 'Custom Item',
        path: '/custom',
        icon: CustomIcon,
        badge: {
          count: 5,
          variant: 'destructive'
        },
        aiInsights: {
          isRecommended: true,
          recommendation: 'Custom AI insight'
        }
      }
    ]
  }
];
```

### Styling Overrides

```css
/* Custom sidebar styling */
.enhanced-sidebar {
  --sidebar-surface: #your-color;
  --sidebar-text: #your-color;
  --sidebar-border: #your-color;
}

/* Custom animations */
.enhanced-sidebar-item {
  --sidebar-transition-duration: 500ms;
  --sidebar-hover-scale: 1.05;
}
```

## 🔧 Configuration Options

### EnhancedSidebarLayout Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultCollapsed` | `boolean` | `false` | Initial collapsed state |
| `showSearch` | `boolean` | `true` | Enable search functionality |
| `showFavorites` | `boolean` | `true` | Show favorites section |
| `showRecent` | `boolean` | `true` | Show recent items section |
| `showThemeToggle` | `boolean` | `true` | Show theme toggle |
| `showUserProfile` | `boolean` | `true` | Show user profile section |
| `onSidebarToggle` | `function` | - | Callback for sidebar state changes |
| `onItemClick` | `function` | - | Callback for item clicks |

### EnhancedSidebarItem Interface

```typescript
interface EnhancedSidebarItem {
  id: string;
  title: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    count: number;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  aiInsights?: {
    isRecommended?: boolean;
    recommendation?: string;
    frequency?: number;
    isContextual?: boolean;
  };
  subItems?: EnhancedSidebarItem[];
  isExternal?: boolean;
  isDisabled?: boolean;
}
```

## 🎯 Role-Based Navigation

The sidebar automatically adapts based on user roles:

### Super Admin
- Portal Management
- User Management
- System Health
- Compliance & Audit
- All standard TMS features

### Admin
- Dashboard
- Operations (Shipments, Dispatch, Deliveries)
- CRM (Contacts, Leads, Opportunities)
- Finance (Invoices, Payments, Reports)
- Documents, Automation, Settings, Support

### User
- Limited access based on permissions
- Role-specific navigation items
- Filtered views and capabilities

## 📱 Responsive Design

### Desktop (768px+)
- Fixed sidebar with collapsible functionality
- Full feature set available
- Keyboard shortcuts (Ctrl/Cmd + B to toggle)

### Mobile (< 768px)
- Drawer-style navigation
- Hamburger menu trigger
- Touch-optimized interactions
- Auto-close on navigation

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support with focus management
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **High Contrast**: Theme-aware contrast ratios
- **Reduced Motion**: Respects user motion preferences
- **Focus Indicators**: Clear focus states for all interactive elements

## 🚀 Performance

- **Lazy Loading**: Components load on demand
- **Memoization**: Optimized re-renders with React.memo
- **State Management**: Efficient state updates with useCallback
- **CSS-in-JS**: Minimal runtime overhead
- **Bundle Splitting**: Tree-shakeable exports

## 🔍 Search Functionality

The sidebar includes a powerful search system:

- **Real-time filtering**: Instant results as you type
- **Fuzzy matching**: Handles typos and partial matches
- **Section grouping**: Results organized by navigation sections
- **Keyboard shortcuts**: Ctrl/Cmd + K to focus search
- **Search history**: Remembers recent searches

## ⭐ Favorites System

Users can star frequently used items:

- **Persistent storage**: Favorites saved across sessions
- **Quick access**: Dedicated favorites section
- **Visual feedback**: Star icons with hover states
- **Keyboard shortcuts**: Space to toggle favorites
- **Sync across devices**: Favorites tied to user account

## 🤖 AI Insights

Smart recommendations and analytics:

- **Usage tracking**: Monitors page visits and interactions
- **Recommendations**: Suggests relevant pages based on context
- **Frequency badges**: Shows most-used items
- **Contextual hints**: Provides helpful tips and guidance
- **Learning system**: Adapts to user behavior over time

## 🎨 Theme System

Comprehensive theming support:

- **Light/Dark modes**: Automatic theme switching
- **CSS Variables**: Easy customization with design tokens
- **System preference**: Respects OS theme settings
- **Persistent storage**: Remembers user theme choice
- **Smooth transitions**: Animated theme changes

## 📊 Badge System

Dynamic notification badges:

- **Real-time updates**: Live badge counts
- **Multiple variants**: Default, secondary, destructive, outline
- **Contextual colors**: Theme-aware badge styling
- **Animation support**: Smooth count transitions
- **Priority system**: Important notifications highlighted

## 🔧 Development

### Local Development

```bash
# Navigate to the sidebar directory
cd src/components/sidebar

# View the example
npm run dev

# Test the components
npm run test
```

### Adding New Features

1. **Extend the interface**: Add new properties to `EnhancedSidebarItem`
2. **Update configuration**: Add items to `EnhancedSidebarConfig`
3. **Implement logic**: Add functionality to `EnhancedSidebar`
4. **Add styling**: Update `enhanced-sidebar-styles.css`
5. **Test thoroughly**: Ensure accessibility and performance

### Contributing

When contributing to the sidebar system:

- Follow the existing code style and patterns
- Add comprehensive TypeScript types
- Include accessibility considerations
- Test on multiple screen sizes
- Update documentation as needed

## 📚 Examples

See `EnhancedSidebarExample.tsx` for complete usage examples including:

- Basic implementation
- Advanced configuration
- Custom styling
- Event handling
- Mobile responsiveness

## 🤝 Support

For questions or issues with the enhanced sidebar system:

1. Check the documentation in this README
2. Review the example components
3. Examine the TypeScript interfaces
4. Test with the provided examples

## 📄 License

This enhanced sidebar system is part of the TMS application and follows the same licensing terms.
