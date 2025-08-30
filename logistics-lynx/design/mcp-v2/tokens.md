# MCP-v2 Design Tokens Documentation

## Overview

MCP-v2 Design Tokens provide a comprehensive design system foundation for the Portal Ecosystem. These tokens ensure consistency, maintainability, and scalability across all portals and cross-portal modules.

## Token Categories

### 1. Colors

#### Brand Colors
- **Primary**: Blue spectrum (#3b82f6) - Main brand color
- **Secondary**: Purple spectrum (#a855f7) - Supporting brand color  
- **Accent**: Green spectrum (#10b981) - Success and positive actions

#### Background Colors
- **Canvas**: `#0f172a` - Main application background
- **Elevated**: `#1e293b` - Card and component backgrounds
- **Soft**: `#334155` - Subtle background variations
- **Overlay**: `rgba(0, 0, 0, 0.5)` - Modal and overlay backgrounds
- **Backdrop**: `rgba(15, 23, 42, 0.8)` - Backdrop blur backgrounds

#### Text Colors
- **Primary**: `#f8fafc` - Main text color
- **Secondary**: `#cbd5e1` - Supporting text
- **Tertiary**: `#94a3b8` - Muted text
- **Disabled**: `#64748b` - Disabled state text
- **Inverse**: `#0f172a` - Text on light backgrounds

#### Border Colors
- **Default**: `#334155` - Standard borders
- **Hover**: `#475569` - Hover state borders
- **Focus**: `#3b82f6` - Focus state borders
- **Error**: `#ef4444` - Error state borders
- **Success**: `#10b981` - Success state borders
- **Warning**: `#f59e0b` - Warning state borders

#### State Colors
Each state includes background, text, and border variants:
- **Success**: Green-based for positive actions
- **Warning**: Yellow-based for caution states
- **Error**: Red-based for error states
- **Info**: Blue-based for informational states

#### Portal Colors
Each portal has dedicated primary and secondary colors:
- **Super Admin**: Purple (#8b5cf6)
- **Broker**: Blue (#3b82f6)
- **Carrier**: Red (#ef4444)
- **Shipper**: Indigo (#6366f1)
- **Owner-Operator**: Green (#10b981)
- **Driver**: Orange (#f59e0b)

### 2. Typography

#### Font Scale
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)
- **6xl**: 3.75rem (60px)

#### Font Families
- **Sans**: Inter, system-ui, sans-serif
- **Mono**: JetBrains Mono, monospace

#### Font Weights
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

#### Typography Roles
Predefined combinations for consistent usage:

**Display**
- Font Size: 3rem
- Font Weight: 700
- Line Height: 1.2

**Headings (H1-H6)**
- H1: 2.25rem, 700, 1.3
- H2: 1.875rem, 600, 1.4
- H3: 1.5rem, 600, 1.4
- H4: 1.25rem, 600, 1.5
- H5: 1.125rem, 600, 1.5
- H6: 1rem, 600, 1.5

**Body**
- Font Size: 1rem
- Font Weight: 400
- Line Height: 1.6

**Meta**
- Font Size: 0.875rem
- Font Weight: 400
- Line Height: 1.5

**Mono**
- Font Size: 0.875rem
- Font Weight: 400
- Line Height: 1.5
- Font Family: mono

### 3. Spacing

4pt scale system:
- **0**: 0
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **10**: 2.5rem (40px)
- **12**: 3rem (48px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)
- **32**: 8rem (128px)
- **40**: 10rem (160px)
- **48**: 12rem (192px)
- **56**: 14rem (224px)
- **64**: 16rem (256px)

### 4. Border Radius

- **none**: 0
- **sm**: 0.25rem (4px)
- **md**: 0.375rem (6px)
- **lg**: 0.5rem (8px)
- **xl**: 0.75rem (12px)
- **2xl**: 1rem (16px)
- **3xl**: 1.5rem (24px)
- **full**: 9999px

### 5. Shadows

- **sm**: Subtle elevation
- **md**: Standard elevation
- **lg**: Prominent elevation
- **xl**: High elevation
- **2xl**: Maximum elevation
- **focus**: Focus ring shadow
- **portal**: Portal-specific shadow

### 6. Motion

#### Duration
- **fast**: 150ms
- **normal**: 200ms
- **slow**: 300ms
- **reduced**: 50ms (for reduced motion preference)

#### Easing
- **linear**: linear
- **ease**: ease
- **easeIn**: ease-in
- **easeOut**: ease-out
- **easeInOut**: ease-in-out

#### Spring
- **bounce**: Bouncy animation
- **smooth**: Smooth transition

### 7. Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### 8. Z-Index

- **hide**: -1
- **auto**: auto
- **base**: 0
- **docked**: 10
- **dropdown**: 1000
- **sticky**: 1100
- **banner**: 1200
- **overlay**: 1300
- **modal**: 1400
- **popover**: 1500
- **skipLink**: 1600
- **toast**: 1700
- **tooltip**: 1800

## Usage Guidelines

### 1. Color Usage
- Use brand colors sparingly for primary actions and branding
- Use background colors for layering and hierarchy
- Use text colors for readability and hierarchy
- Use state colors consistently across all components
- Use portal colors for portal-specific theming

### 2. Typography Usage
- Use typography roles instead of individual properties
- Maintain consistent hierarchy with heading levels
- Use appropriate font weights for emphasis
- Consider line height for readability

### 3. Spacing Usage
- Use the 4pt scale consistently
- Prefer larger spacing for better visual breathing room
- Use consistent spacing within component families

### 4. Motion Usage
- Respect user's reduced motion preference
- Use appropriate duration for interaction feedback
- Use easing functions for natural movement
- Keep animations subtle and purposeful

### 5. Accessibility
- Ensure sufficient color contrast ratios
- Provide focus indicators using focus tokens
- Support keyboard navigation
- Respect reduced motion preferences

## Implementation

### CSS Custom Properties
Tokens are implemented as CSS custom properties for runtime theming:

```css
:root {
  --color-brand-primary-500: #3b82f6;
  --color-bg-canvas: #0f172a;
  --spacing-4: 1rem;
  --radius-lg: 0.5rem;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Tailwind CSS Integration
Tokens are mapped to Tailwind CSS utilities for development:

```css
.bg-brand-primary-500 { background-color: var(--color-brand-primary-500); }
.text-primary { color: var(--color-text-primary); }
.p-4 { padding: var(--spacing-4); }
.rounded-lg { border-radius: var(--radius-lg); }
.shadow-md { box-shadow: var(--shadow-md); }
```

### Component Usage
Components use tokens through utility classes or direct CSS custom properties:

```jsx
<div className="bg-elevated text-primary p-6 rounded-xl shadow-portal">
  <h1 className="text-h1 font-bold">Portal Title</h1>
  <p className="text-body text-secondary">Portal description</p>
</div>
```

## Versioning

Design tokens follow semantic versioning:
- **Major**: Breaking changes to token structure
- **Minor**: New tokens or non-breaking additions
- **Patch**: Bug fixes and refinements

Current version: 2.0.0

## Maintenance

- Review and update tokens quarterly
- Ensure consistency across all portals
- Validate accessibility compliance
- Test across different devices and browsers
- Document any changes in CHANGELOG.md
