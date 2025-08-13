# 🚀 Unified Dashboard Setup Guide

## Overview
The Logistics Lynx Unified Dashboard is now production-ready with:
- ✅ Fully responsive design (mobile/tablet/desktop)
- ✅ Role-based access control (9 user roles)
- ✅ Real-time data updates
- ✅ Error boundaries and loading states
- ✅ Accessibility features
- ✅ Easy Supabase integration
- ✅ CI/CD pipeline

## 🏗️ Architecture

### Data Layer
```
src/
├── services/
│   ├── dashboardProvider.ts     # Provider switching (mock ↔ supabase)
│   ├── dashboardService.ts      # Mock data services
│   └── dashboardService.supabase.ts  # Supabase data services
├── hooks/
│   └── useDashboardData.ts      # Custom hooks for data fetching
└── types/
    └── dashboard.ts             # TypeScript interfaces
```

### Components
```
src/components/dashboard/
├── UnifiedDashboard.tsx         # Main dashboard component
├── KpiCard.tsx                  # KPI metric cards
├── PortalCard.tsx               # Portal access cards
├── PerformanceChart.tsx         # Performance trends
├── ActivityList.tsx             # Recent activities
└── SystemHealth.tsx             # System health monitoring
```

## 🚀 Quick Start

### 1. Development Server
```bash
cd logistics-lynx
npm install
npm run dev
```

The dashboard will be available at: `http://localhost:8080`

### 2. Environment Configuration
Create a `.env` file in the `logistics-lynx` directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Data Provider (mock or supabase)
VITE_USE_SUPABASE=false

# Feature Flags
VITE_ENABLE_AUTONOMOUS_FEATURES=true
VITE_ENABLE_REALTIME_UPDATES=true
```

### 3. Switch to Supabase
To use real data instead of mocks:

```typescript
// In your app initialization
import { setProvider } from './services/dashboardProvider';

// Switch to Supabase
setProvider('supabase');
```

Or set the environment variable:
```env
VITE_USE_SUPABASE=true
```

## 🎯 Features

### Role-Based Access
The dashboard supports 9 user roles:
- **Super Admin**: Full system access
- **Admin**: System administration
- **Freight Broker Admin**: Brokerage operations
- **Carrier Admin**: Carrier management
- **Shipper Admin**: Shipment management
- **Driver**: Mobile driver interface
- **Owner Operator**: Independent contractor tools
- **Factoring Admin**: Invoice factoring
- **Analyst**: Business intelligence

### Real-Time Updates
- KPI data updates every 30 seconds (mock)
- Real-time Supabase subscriptions (when enabled)
- Activity feed with live updates
- System health monitoring

### Responsive Design
- **Mobile**: Single column layout, optimized touch targets
- **Tablet**: 2-column grid, touch-friendly navigation
- **Desktop**: 3-4 column layout, full feature access

### Accessibility
- Keyboard navigation (Tab/Shift+Tab)
- Screen reader support
- High contrast mode
- Reduced motion support
- ARIA labels and roles

## 🔧 Configuration

### Data Provider Switching
```typescript
import { setProvider, getProvider } from './services/dashboardProvider';

// Check current provider
console.log(getProvider()); // 'mock' or 'supabase'

// Switch providers
setProvider('supabase');
```

### Custom Hooks
```typescript
import { useKpis, usePerformance, useActivity } from './hooks/useDashboardData';

function MyComponent() {
  const { kpis, loading, error, refetch } = useKpis('super_admin');
  const { performance } = usePerformance('30d');
  const { activities } = useActivity(10);
  
  // Use the data...
}
```

### Error Handling
The dashboard includes comprehensive error handling:
- Error boundaries for component failures
- Loading skeletons for better UX
- Toast notifications for user feedback
- Graceful fallbacks for data failures

## 🗄️ Database Schema

### Supabase Setup
1. Create a new Supabase project
2. Run the schema from `supabase/schema.sql`
3. Configure RLS policies
4. Set up real-time subscriptions

### Key Tables
- `profiles`: User profiles and roles
- `kpis`: Key performance indicators
- `performance_series`: Time-series performance data
- `activities`: System activity log
- `health_metrics`: System health monitoring
- `portals`: Available portal configurations

## 🧪 Testing

### Run Tests
```bash
npm run test          # Run all tests
npm run type-check    # TypeScript validation
npm run lint          # ESLint checks
```

### Manual Testing Checklist
- [ ] All 11 portal CTAs work
- [ ] Secondary actions open dialogs/sheets
- [ ] Role switching updates content instantly
- [ ] Responsive design works on all screen sizes
- [ ] Keyboard navigation flows properly
- [ ] Error states display correctly
- [ ] Loading states show skeletons
- [ ] Toast notifications appear

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### CI/CD Pipeline
The GitHub Actions workflow (`.github/workflows/ci.yml`) includes:
- Automated testing
- Type checking
- Linting
- Security audits
- Build verification

### Environment Variables for Production
```env
VITE_USE_SUPABASE=true
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_ENABLE_ERROR_REPORTING=true
```

## 🔍 Performance Optimization

### Code Splitting
- React.lazy for heavy components
- Dynamic imports for charts
- Memoized components to prevent re-renders

### Data Optimization
- Efficient queries with proper indexing
- Real-time subscriptions for live updates
- Caching strategies for frequently accessed data

### Bundle Optimization
- Tree shaking for unused code
- Optimized images and assets
- Gzip compression for faster loading

## 🐛 Troubleshooting

### Common Issues

**Development server stops on updates:**
- Check for TypeScript errors
- Verify all imports are correct
- Restart the dev server: `npm run dev`

**Data not loading:**
- Check network tab for API errors
- Verify Supabase configuration
- Check RLS policies if using Supabase

**Responsive issues:**
- Test on actual devices
- Check CSS grid breakpoints
- Verify viewport meta tag

### Debug Mode
Enable debug logging:
```env
VITE_ENABLE_DEBUG_LOGGING=true
```

## 📈 Monitoring

### Web Vitals
Monitor Core Web Vitals:
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

### Error Tracking
Integrate with Sentry or LogRocket:
```env
VITE_SENTRY_DSN=your_sentry_dsn
VITE_LOG_ROCKET_APP_ID=your_logrocket_app_id
```

## 🎨 Customization

### Theming
The dashboard uses Tailwind CSS with:
- Dark/light mode support
- Custom color schemes
- Consistent spacing and typography

### Adding New Portals
1. Add portal data to `src/data/dashboard/portals.ts`
2. Update the portals table in Supabase
3. Add role permissions
4. Create portal-specific components

### Custom KPIs
1. Define KPI structure in `src/types/dashboard.ts`
2. Add mock data in `src/data/dashboard/kpis.ts`
3. Create Supabase table and policies
4. Update the dashboard to display new KPIs

## 🤝 Contributing

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features

### Pull Request Process
1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit PR
6. CI/CD pipeline will run automatically

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**🎉 The Unified Dashboard is now production-ready!** 

Switch between mock and Supabase data with one line, enjoy real-time updates, and scale confidently with the built-in error handling and monitoring.
