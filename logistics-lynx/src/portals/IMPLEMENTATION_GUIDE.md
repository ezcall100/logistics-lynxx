# Rates & Directory Portals Implementation Guide

## Overview
This guide provides a comprehensive implementation plan for the **Rates Portal** and **Directory Portal** as first-class portals in the TMS system, based on the upgraded company-level plan (v2).

## 🎯 Implementation Status

### ✅ Completed
- **Portal Structure**: Main portal components with navigation and layout
- **Core Components**: RateConsole, ExploreDirectory with full functionality
- **Database Schema**: Complete SQL schema with RLS policies and indexes
- **Placeholder Components**: All sub-components created with proper structure

### 🚧 In Progress
- **API Integration**: Backend services and data fetching
- **State Management**: Context providers and data flow
- **Authentication**: Role-based access control integration

### 📋 Next Steps
- **Component Development**: Complete all placeholder components
- **Testing**: Unit and integration testing
- **Deployment**: Production deployment and monitoring

## 🏗️ Architecture Overview

### Portal Structure
```
src/portals/
├── rates/
│   ├── RatesPortal.tsx          # Main portal component
│   ├── components/
│   │   ├── RateConsole.tsx      # ✅ Complete
│   │   ├── QuotesManager.tsx    # 🚧 Placeholder
│   │   ├── ContractsManager.tsx # 🚧 Placeholder
│   │   ├── FuelAccessorials.tsx # 🚧 Placeholder
│   │   └── LaneIntelligence.tsx # 🚧 Placeholder
│   └── README.md
├── directory/
│   ├── DirectoryPortal.tsx      # Main portal component
│   ├── components/
│   │   ├── ExploreDirectory.tsx # ✅ Complete
│   │   ├── CompanyProfile.tsx   # 🚧 Placeholder
│   │   ├── FacilityProfile.tsx  # 🚧 Placeholder
│   │   ├── ListsManager.tsx     # 🚧 Placeholder
│   │   └── Scorecards.tsx       # 🚧 Placeholder
│   └── README.md
└── database-schema.sql          # ✅ Complete
```

## 📊 Database Schema

### Rates Portal Tables
- `rates_contracts` - Contract rate definitions
- `rates_contract_lanes` - Lane-specific contract rates
- `rates_spot_history` - Historical spot rate data
- `fuel_index` - Fuel price indices
- `fuel_formulas` - Fuel surcharge calculation formulas
- `accessorials` - Accessorial rate definitions
- `quotes` - Quote records
- `quote_versions` - Quote version history

### Directory Portal Tables
- `directory_companies` - Company profiles and metadata
- `directory_facilities` - Facility information and capabilities
- `directory_equipment` - Equipment inventory and specifications
- `directory_contacts` - Contact information and relationships
- `directory_scorecards` - Performance metrics and ratings
- `directory_lists` - Custom lists and groupings
- `directory_list_members` - List membership management
- `directory_docs` - Document storage and verification

## 🔐 Security & Access Control

### Row Level Security (RLS)
- All tables have RLS enabled
- Company-scoped access using `is_company_member(company_id)`
- Public/private record visibility controls
- Role-based permissions for different user types

### Authentication Integration
- JWT-based authentication
- Company context in user sessions
- Role-based component rendering
- Secure API endpoints

## 🚀 Getting Started

### 1. Database Setup
```sql
-- Run the complete schema
\i src/portals/database-schema.sql
```

### 2. Portal Integration
```typescript
// Add to App.tsx routing
import { RatesPortal } from './portals/rates/RatesPortal';
import { DirectoryPortal } from './portals/directory/DirectoryPortal';

// Add routes
<Route path="/rates/*" element={<RatesPortal companyId={companyId} userRole={userRole} />} />
<Route path="/directory/*" element={<DirectoryPortal companyId={companyId} userRole={userRole} />} />
```

### 3. Navigation Integration
```typescript
// Add to main navigation
{
  name: 'Rates Portal',
  href: '/rates',
  icon: Calculator,
  description: 'Rate management and quotes'
},
{
  name: 'Directory Portal', 
  href: '/directory',
  icon: Building2,
  description: 'Company and facility directory'
}
```

## 📈 Key Features

### Rates Portal Features
- **Instant Rate Calculator**: Real-time rate calculation
- **Contract Management**: Long-term rate contracts
- **Quote Lifecycle**: End-to-end quote management
- **Fuel & Accessorials**: Surcharge and accessorial management
- **Market Intelligence**: Lane analysis and optimization
- **Performance Metrics**: KPIs and SLAs tracking

### Directory Portal Features
- **Company Discovery**: Search and explore companies
- **Facility Management**: Warehouse and terminal profiles
- **Contact Management**: People and relationship tracking
- **Verification System**: Compliance and trust indicators
- **List Management**: Preferred/blocked partner lists
- **Scorecards**: Performance metrics and ratings

## 🔧 Development Guidelines

### Component Structure
```typescript
interface PortalComponentProps {
  companyId: string;
  userRole: string;
}

export const PortalComponent: React.FC<PortalComponentProps> = ({ companyId, userRole }) => {
  // Component implementation
};
```

### State Management
```typescript
// Use React Context for portal-wide state
const PortalContext = createContext<PortalContextType | undefined>(undefined);

// Use local state for component-specific data
const [data, setData] = useState<DataType[]>([]);
```

### API Integration
```typescript
// Use custom hooks for data fetching
const useRatesData = (companyId: string) => {
  // API calls and state management
};

const useDirectoryData = (companyId: string) => {
  // API calls and state management
};
```

## 🧪 Testing Strategy

### Unit Tests
- Component rendering tests
- State management tests
- Utility function tests

### Integration Tests
- API integration tests
- Database interaction tests
- User flow tests

### E2E Tests
- Complete portal workflows
- Cross-portal interactions
- Performance testing

## 📊 Performance Considerations

### Database Optimization
- Proper indexing on frequently queried columns
- Query optimization for complex joins
- Connection pooling and caching

### Frontend Optimization
- Component lazy loading
- Data pagination
- Memoization for expensive calculations
- Image optimization

### API Optimization
- Response caching
- Batch operations
- Rate limiting
- Compression

## 🔄 Deployment Process

### Development Environment
1. Local database setup
2. Environment configuration
3. Component development
4. Testing and validation

### Staging Environment
1. Database migration
2. Component deployment
3. Integration testing
4. Performance testing

### Production Environment
1. Database migration
2. Blue-green deployment
3. Monitoring setup
4. User training

## 📈 Monitoring & Analytics

### Key Metrics
- **Rates Portal**: Quote conversion rate, response time, contract coverage
- **Directory Portal**: Network growth, data freshness, engagement rate

### Monitoring Tools
- Application performance monitoring
- Database performance monitoring
- User behavior analytics
- Error tracking and alerting

## 🔮 Future Enhancements

### AI Integration
- **Predictive Pricing**: ML-based rate prediction
- **Smart Matching**: AI-powered carrier-shipper matching
- **Automated Verification**: AI document verification

### Advanced Features
- **Real-time Collaboration**: Multi-user editing
- **Advanced Analytics**: Predictive insights
- **Mobile Optimization**: Responsive design improvements
- **API Ecosystem**: Third-party integrations

## 📚 Resources

### Documentation
- [Rates Portal README](./rates/README.md)
- [Directory Portal README](./directory/README.md)
- [Database Schema](./database-schema.sql)

### Related Components
- [Unified Dashboard](../components/dashboard/UnifiedDashboard.tsx)
- [UI Components](../components/ui/)
- [Authentication System](../context/)

### External Resources
- [Supabase Documentation](https://supabase.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits for version control

---

**Next Steps**: Complete the placeholder components, integrate with the backend API, and implement comprehensive testing before production deployment.
