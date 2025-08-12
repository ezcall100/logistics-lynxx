# Design System Documentation

## Overview

The Logistics Lynx Design System provides a unified, accessible, and consistent UI/UX experience across all portals. This system is built on modern web standards with TypeScript, React, and Tailwind CSS.

## Core Principles

- **Consistency**: Unified design tokens and components across all portals
- **Accessibility**: WCAG 2.2 AA compliance with proper ARIA labels and keyboard navigation
- **Performance**: Optimized components with minimal bundle impact
- **Responsive**: Mobile-first design with fluid typography and spacing
- **Themeable**: Support for light/dark modes and portal-specific branding

## Design Tokens

### Colors

Our color system uses CSS custom properties for easy theming and consistency:

```css
/* Primary Colors */
--primary: #3b82f6;
--primary-contrast: #ffffff;
--primary-hover: #2563eb;
--primary-active: #1d4ed8;
--primary-subtle: #eff6ff;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--destructive: #ef4444;
--muted: #64748b;

/* Portal Colors */
--super-admin: #6366f1;
--carrier: #3b82f6;
--broker: #10b981;
--shipper: #8b5cf6;
--driver: #f59e0b;
--owner-operator: #ef4444;
--factoring: #06b6d4;
```

### Typography

We use a fluid typography system with two main font families:

```css
/* Font Families */
--font-heading: "Plus Jakarta Sans", system-ui, sans-serif;
--font-body: "DM Sans", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", Monaco, monospace;

/* Fluid Typography Scale */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3rem);
--text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4rem);
--text-6xl: clamp(3.75rem, 3rem + 3.75vw, 5rem);
```

### Spacing

Consistent spacing scale using CSS custom properties:

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
```

### Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.25);
--shadow-2xl: 0 24px 48px rgba(0, 0, 0, 0.3);
```

## Components

### Theme Provider

The `ThemeProvider` manages theme switching and system preference detection:

```tsx
import { ThemeProvider } from '@/components/theme/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" enableSystem={true}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Theme Toggle

Accessible theme switcher with multiple variants:

```tsx
import { ThemeToggle } from '@/components/theme/ThemeToggle';

// Simple button toggle
<ThemeToggle variant="button" />

// Select dropdown
<ThemeToggle variant="select" showSystem={true} />

// Dropdown menu
<ThemeToggle variant="dropdown" showLabels={true} />
```

### App Shell

Unified layout component for all portals:

```tsx
import { AppShell } from '@/components/layout/AppShell';

<AppShell
  portal="super-admin"
  title="Dashboard"
  subtitle="Overview of system performance"
  actions={<Button>Add User</Button>}
  breadcrumbs={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Users' }
  ]}
>
  <YourContent />
</AppShell>
```

### Cards

Flexible card components with consistent styling:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

// Basic card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>

// Stats card
<StatsCard
  title="Total Users"
  value="1,247"
  description="Active user accounts"
  icon={<Users className="h-6 w-6" />}
  trend="up"
  trendValue="+12.5%"
/>

// Action card
<ActionCard
  title="Create New"
  description="Add a new item to the system"
  icon={<Plus className="h-5 w-5" />}
  action="Create"
  onClick={handleCreate}
/>
```

### Grid Layouts

Responsive grid components for consistent layouts:

```tsx
import { DashboardGrid, StatsGrid, AutoFitGrid } from '@/components/layout/CardGrid';

// Dashboard layout (3 columns)
<DashboardGrid>
  <Card>Content 1</Card>
  <Card>Content 2</Card>
  <Card>Content 3</Card>
</DashboardGrid>

// Stats layout (4 columns)
<StatsGrid>
  <StatsCard title="Metric 1" value="100" />
  <StatsCard title="Metric 2" value="200" />
  <StatsCard title="Metric 3" value="300" />
  <StatsCard title="Metric 4" value="400" />
</StatsGrid>

// Auto-fit grid
<AutoFitGrid minWidth="280px">
  <Card>Dynamic content</Card>
  <Card>More content</Card>
</AutoFitGrid>
```

### State Components

Components for different UI states:

```tsx
import { 
  Skeleton, 
  Empty, 
  ErrorState, 
  NoResults 
} from '@/components/states';

// Loading state
<Skeleton variant="card" />

// Empty state
<Empty
  title="No data found"
  description="Create your first item to get started"
  action={{ label: 'Create', onClick: handleCreate }}
/>

// Error state
<ErrorState
  title="Something went wrong"
  message="Failed to load data"
  onRetry={handleRetry}
/>

// No results
<NoResults
  query="search term"
  onClearSearch={handleClearSearch}
  onCreate={handleCreate}
/>
```

## Usage Guidelines

### Portal-Specific Styling

Each portal has its own color scheme defined in the brand configuration:

```tsx
// Use portal colors in components
<div className="text-carrier">Carrier-specific content</div>
<div className="text-broker">Broker-specific content</div>
<div className="text-shipper">Shipper-specific content</div>
```

### Responsive Design

Always use mobile-first responsive design:

```tsx
// Responsive classes
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  <Card>Content</Card>
</div>

// Responsive spacing
<div className="p-4 sm:p-6 lg:p-8">
  Content with responsive padding
</div>
```

### Accessibility

All components include proper accessibility features:

```tsx
// Proper ARIA labels
<button aria-label="Toggle theme">
  <Sun className="h-4 w-4" />
</button>

// Focus management
<div className="focus-ring">
  Focusable content
</div>

// Screen reader support
<span className="sr-only">Hidden from visual users</span>
```

### Performance

Optimize for performance:

```tsx
// Lazy load heavy components
const HeavyChart = React.lazy(() => import('./HeavyChart'));

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// Use skeleton loading states
{loading ? <SkeletonCard /> : <ActualCard />}
```

## Customization

### Brand Configuration

Customize the design system in `src/styles/brand.config.ts`:

```typescript
export const brand = {
  name: "Your Brand",
  primary: {
    500: "#your-primary-color",
    // ... other shades
  },
  typography: {
    fonts: {
      heading: "Your Heading Font",
      body: "Your Body Font",
    },
  },
  // ... other customizations
};
```

### Adding New Components

When creating new components:

1. Use the existing design tokens
2. Follow the component patterns
3. Include proper TypeScript types
4. Add accessibility features
5. Include loading and error states
6. Test across different screen sizes

### Theme Extensions

Extend the theme in `tailwind.config.ts`:

```typescript
extend: {
  colors: {
    'custom-color': 'var(--custom-color)',
  },
  spacing: {
    'custom': 'var(--space-custom)',
  },
}
```

## Best Practices

### Component Structure

1. **Props Interface**: Define clear TypeScript interfaces
2. **Default Props**: Provide sensible defaults
3. **Composition**: Use composition over inheritance
4. **Slots**: Use children and render props for flexibility
5. **Variants**: Support multiple variants through props

### Styling

1. **Design Tokens**: Always use CSS custom properties
2. **Responsive**: Mobile-first responsive design
3. **Accessibility**: Proper contrast ratios and focus states
4. **Performance**: Minimize CSS-in-JS and complex selectors
5. **Consistency**: Follow established patterns

### State Management

1. **Loading States**: Always show loading indicators
2. **Error Handling**: Graceful error states with retry options
3. **Empty States**: Helpful empty states with actions
4. **Optimistic Updates**: Update UI immediately when possible
5. **Validation**: Real-time form validation with clear messages

## Testing

### Component Testing

Test components for:

- Rendering with different props
- User interactions
- Accessibility features
- Responsive behavior
- Theme switching
- Loading and error states

### Visual Testing

Use visual regression testing to ensure:

- Consistent appearance across browsers
- Proper theme switching
- Responsive behavior
- Accessibility compliance

### Performance Testing

Monitor:

- Bundle size impact
- Render performance
- Memory usage
- Accessibility scores

## Migration Guide

### From Old Components

1. **Replace hard-coded colors** with design tokens
2. **Update spacing** to use the unified scale
3. **Implement loading states** for async operations
4. **Add error boundaries** for better error handling
5. **Update typography** to use the new font system

### Example Migration

```tsx
// Before
<div className="bg-blue-500 p-4 text-white">
  <h2 className="text-xl font-bold">Title</h2>
</div>

// After
<Card className="bg-primary text-primary-contrast">
  <CardTitle>Title</CardTitle>
</Card>
```

## Support

For questions or issues with the design system:

1. Check the component documentation
2. Review the design tokens
3. Look at existing implementations
4. Create an issue with detailed information
5. Consider contributing improvements

## Contributing

When contributing to the design system:

1. Follow the established patterns
2. Include proper TypeScript types
3. Add comprehensive tests
4. Update documentation
5. Ensure accessibility compliance
6. Test across different themes and screen sizes
