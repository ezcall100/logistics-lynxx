# MCP-V2 Redesign & Foundation Build Plan

## Executive Summary

This document outlines the complete ground-up redesign of the **Trans Bot AI MCP-V2 Portal Ecosystem**, implementing a revolutionary new UI/UX system with mandatory cross-portal modules (CRM, Load Board, Rates, Financials, Onboarding, Marketplace, Directory). This is **NOT** a theme recolor - it's a complete architectural rebuild for the Trans Bot AI logistics platform.

## 0. Non-Negotiables

### Design Requirements
- **Not a theme recolor**: New layouts, spacing, typography, iconography, motion, interactions
- **Zero build/runtime/TypeScript errors**
- **Accessibility**: WCAG 2.2 AA compliance (keyboard paths, focus rings, contrast, reduced motion)
- **Performance budgets** (mobile mid-tier): LCP ≤ 2.5s, TTI ≤ 3.5s, CLS ≤ 0.1
- **Responsive by design** (mobile/tablet/desktop) with documented breakpoints
- **Design tokens first** (colors/space/type/shadows/motion via tokens only)

## 1. Design System: MCP-V2 Foundations

### ✅ Completed
- **Design Tokens**: `/design/mcp-v2/tokens.json` + comprehensive documentation
- **Color System**: Brand, background, text, border, state, and portal-specific colors
- **Typography**: Complete scale (12-60px), roles, and font families
- **Spacing**: 4pt scale system
- **Motion**: Duration, easing, and spring animations
- **Shadows**: Elevation system with portal-specific variants

### 🔄 In Progress
- **CSS Custom Properties**: Implementation of tokens as CSS variables
- **Tailwind Integration**: Mapping tokens to utility classes
- **Component Library**: Core UI components with token usage

## 2. Core UI Architecture (Reusable)

### Layout Components
- ✅ **AppShell**: Sidebar + Topbar + Content + Right Rail
- ✅ **PageHeader**: Actions, breadcrumbs, context
- ✅ **Breadcrumbs**: Navigation hierarchy
- ✅ **EmptyState**: Consistent empty states

### Navigation Components
- 🔄 **Role-aware Sidebar**: Collapsible sections, Quick Switch (⌘K)
- 🔄 **Portal Navigation**: Context-aware navigation
- 🔄 **Search**: Global search with scoping

### Form Components
- 🔄 **Field**: Input, select, textarea with validation
- 🔄 **Fieldset**: Grouped form controls
- 🔄 **FormGrid**: Responsive form layouts
- 🔄 **Stepper/Wizard**: Multi-step processes
- 🔄 **Validation**: Real-time and async validation

### Data Components
- 🔄 **DataTable**: Virtualized, pin/sort/filter/group, server mode
- 🔄 **DataList**: Mobile-optimized lists
- 🔄 **Cards**: Flexible card layouts
- 🔄 **Charts**: Minimal bar/line/area with tokens

### Feedback Components
- 🔄 **Toasts**: Success, error, warning notifications
- 🔄 **Banners**: Persistent notifications
- 🔄 **Skeletons**: Loading states
- 🔄 **Progress**: Progress indicators
- 🔄 **Dialog/Sheet/Drawer**: Modal components

### Auth/Access Components
- 🔄 **ProtectedRoute**: Route protection
- 🔄 **RoleGuard**: Role-based access control
- 🔄 **FeatureFlag**: Feature toggles

### FAB Components
- 🔄 **FloatingActionButton**: Offline-safe action queue (Driver/Owner-Op)

## 3. Information Architecture & Routing

### Route Pattern
```
/portal-or-module/section/page
```

### Portal Routes
- `/super-admin/*` - Master Control Program oversight
- `/broker/*` - Logistics orchestration
- `/carrier/*` - Transportation network management
- `/shipper/*` - Cargo management
- `/owner-operator/*` - Fleet management
- `/driver/*` - Mobile-first operations

### Cross-Portal Module Routes
- `/crm/*` - Unified relationships system
- `/loadboard/*` - Centralized marketplace
- `/rates/*` - Pricing engine
- `/financials/*` - Accounting system
- `/onboarding/*` - Unified onboarding flows

### Global Features
- **Global Search**: Entity scoping, portal filtering, time ranges
- **Empty States**: Contextual empty states for every section
- **Error Recovery**: Graceful error handling and recovery

## 4. Portal Ecosystem — Redesign Scope & MVP Pages

### A) Super Admin Portal 🧠
**Purpose**: Trans Bot AI Master Control Program oversight and ecosystem orchestration

#### MVP Pages:
1. **System Health Dashboard**
   - Ecosystem consciousness monitoring
   - Portal performance analytics
   - Real-time system metrics
   - Error console and alerts

2. **Users & Roles Management**
   - RBAC matrix interface
   - User invitations and management
   - Audit log and access reports
   - Role assignment workflows

3. **Tenants/Companies Management**
   - Company provisioning
   - Plan management
   - Feature flag administration
   - Billing and usage tracking

4. **Branding & Theme Management**
   - Live token editor
   - Theme versioning and rollback
   - Portal-specific theming
   - Design system documentation

5. **Integrations Management**
   - Supabase configuration
   - n8n workflow management
   - GitHub integration
   - OpenAI API key management
   - Secrets vault

6. **Compliance & Security**
   - Logs export interface
   - Data retention policies
   - Access reports and analytics
   - Security monitoring dashboard

### B) Broker Portal 🛣️
**Purpose**: Trans Bot AI logistics orchestration and optimization platform

#### MVP Pages:
1. **Operations Center**
   - Leads → Quotes → Booked → In-Transit → Delivered pipeline
   - Load management dashboard
   - Real-time status tracking
   - Performance metrics

2. **Billing & Documents**
   - Rate confirmation management
   - BOL/POD capture and processing
   - Automated invoicing
   - Dispute resolution

3. **Carrier Network Management**
   - Carrier scorecards and ratings
   - Lane performance analytics
   - Document management
   - Relationship tracking

4. **Analytics Dashboard**
   - Profit margin analysis
   - On-time performance tracking
   - Dwell time optimization
   - Lane heatmaps and trends

### C) Owner-Operator Portal 🚛
**Purpose**: Fleet management and operations control

#### MVP Pages:
1. **My Loads Dashboard**
   - Load scheduling and management
   - Payout tracking and settlement preview
   - Performance analytics
   - Revenue optimization

2. **Equipment Management**
   - Truck and trailer inventory
   - Maintenance scheduling
   - Equipment performance tracking
   - Compliance monitoring

3. **Expense Management**
   - Fuel tracking and optimization
   - Toll management
   - Repair and maintenance costs
   - Receipt scanning and processing

4. **Compliance Management**
   - 1099 preparation
   - Safety task management
   - Document compliance
   - Regulatory updates

5. **Cash Flow Management**
   - Advance requests
   - Factoring management
   - Payment tracking
   - Financial reporting

6. **Communication Center**
   - Dispatcher chat interface
   - Announcements and notifications
   - Team messaging
   - Emergency communications

### D) Driver Portal 🚗
**Purpose**: Mobile-first operational interface for drivers

#### MVP Pages:
1. **Today View**
   - Stops and ETAs
   - Turn-by-turn navigation
   - Barcode/QR scanning
   - Real-time updates

2. **Check-ins Management**
   - Arrive/Depart tracking
   - Detention timer
   - POD capture
   - Status updates

3. **FAB (Floating Action Button)**
   - Call dispatch
   - Chat interface
   - Navigation shortcuts
   - HOS management
   - Fuel logging
   - Document scanning
   - AI assistance

4. **HOS/DVIR Management**
   - Hours of service logs
   - Violation tracking
   - Vehicle inspections
   - Compliance reporting

5. **Offline Mode**
   - Queue management
   - Data synchronization
   - Offline capabilities
   - Conflict resolution

### E) Shipper Portal 📦
**Purpose**: Cargo management and tracking system

#### MVP Pages:
1. **Book a Shipment**
   - Requirements wizard
   - Accessorial selection
   - Time window management
   - Rate comparison

2. **Track & Trace**
   - Live map interface
   - Milestone tracking
   - Exception management
   - Real-time updates

3. **Documents & Billing**
   - Estimate management
   - Invoice processing
   - Claims management
   - Payment tracking

4. **Vendor Management**
   - Preferred carriers
   - Performance scorecards
   - Relationship management
   - Contract tracking

5. **Analytics Dashboard**
   - On-time performance
   - Damage tracking
   - Cost per lane analysis
   - Trend reporting

### F) Carrier Portal 🏢
**Purpose**: Transportation network management and CRM

#### MVP Pages:
1. **Contracts & Lanes**
   - Lane matrix management
   - Bid/award tracking
   - Contract management
   - Performance analytics

2. **Compliance Management**
   - Expiring documents alerts
   - Compliance tracking
   - Audit trail management
   - Regulatory updates

3. **Network CRM**
   - Shipper/broker contacts
   - Task management
   - Relationship tracking
   - Communication history

4. **Financial Management**
   - Invoice management
   - Settlement tracking
   - AR/AP management
   - Financial reporting

## 5. Cross-Portal Modules (MANDATORY)

### 5.1 CRM Module — `/crm/*`
**Purpose**: Unified relationships system across all portals

#### MVP Features:
- **Entities**: Accounts, Contacts, Leads, Deals/Opportunities, Activities/Tasks, Notes, Files
- **Pipelines**: Stage configs per role (Broker sales, Carrier recruiting, Shipper acquisition)
- **Communications**: Email/SMS logging, call notes, follow-ups, reminders
- **Views**: Kanban (pipeline), Table (filters/tags), Record view with timeline

#### Data Model:
```sql
crm_accounts, crm_contacts, crm_leads, crm_deals, crm_activities, crm_tags, crm_account_links
```

#### Integrations:
- Onboarding (auto-create account on approval)
- Financials (customer/vendor link)
- Load Board (attach deals to awarded loads)
- Directory (company profiles)

### 5.2 Load Board Module — `/loadboard/*`
**Purpose**: Centralized marketplace for posting, bidding, matching, and assigning loads

#### MVP Features:
- **Post & Search**: Filters (lane, dates, equipment, weight, distance)
- **Matching**: Smart suggestions, saved lanes, favorites
- **Bids & Awards**: Bid submit/counter/accept, audit history
- **Status Timeline**: tendered → accepted → dispatched → in-transit → delivered → POD

#### Data Model:
```sql
loads, load_posts, load_bids, load_awards, load_status_events, load_requirements
```

#### Integrations:
- Rates (price suggestions)
- CRM (contact context)
- Financials (auto-invoice on delivered/POD)
- Driver app (stops)
- Directory (targeted postings)

### 5.3 Rates & Pricing Module — `/rates/*`
**Purpose**: Central engine for spot/contract pricing and lane strategy

#### MVP Features:
- **Lane Matrix**: Origin/destination, equipment, weight class, service level
- **Pricers**: Spot quote, contract tariff, margin targets, accessorials, fuel surcharge hooks
- **Intelligence**: Historicals, win/loss tracking, quote validity windows
- **APIs**: POST /rates/quote, GET /rates/lane/:id, POST /rates/reprice

#### Data Model:
```sql
rate_lanes, rate_tariffs, rate_quotes, rate_rules, rate_adjustments, rate_versions
```

#### Integrations:
- Load Board (pre-fill ask/offer)
- Broker quotes
- Carrier bids
- Financials (rate → invoice)
- Directory (lane intelligence)

### 5.4 Financials (Accounting System) — `/financials/*`
**Purpose**: Full AR/AP, settlements, and ledgers for logistics

#### MVP Features:
- **AR**: Invoices, credit memos, payments, aging, dunning
- **AP**: Bills, vendor payments, approvals, aging
- **Settlements**: Driver/owner-op settlements, advances, deductions
- **Factoring**: Submissions, statuses, reserve/fee tracking
- **Ledger**: Chart of accounts, journals, exports

#### Data Model:
```sql
fin_invoices, fin_invoice_lines, fin_payments, fin_bills, fin_bill_lines, fin_vendors, fin_customers, fin_settlements, fin_advances, fin_ledger, fin_accounts, fin_factoring_cases
```

#### Integrations:
- Load Board & POD (auto-invoice)
- Rates (source price)
- CRM (customer/vendor)
- Onboarding (W-9/ACH)
- Marketplace (app billing)

### 5.5 Onboarding & Compliance Module — `/onboarding/*`
**Purpose**: Unified onboarding with three flows: Carrier, Shipper, Broker

#### MVP Features:
- **Steps**: Company profile → Contacts → Documents (W-9, COI, authority) → Agreements/e-sign → Banking/ACH → Compliance checks → Approval
- **Tasklist**: Progress bar, blockers, expiry alerts, resubmission
- **Verification**: Authority/insurance checks, watchlists (pluggable), document OCR

#### Routes:
- `/onboarding/carrier/*`
- `/onboarding/shipper/*`
- `/onboarding/broker/*`

#### Data Model:
```sql
onb_applications, onb_steps, onb_documents, onb_checks, onb_agreements, onb_bank_accounts, onb_audit
```

#### Integrations:
- CRM (convert lead → account)
- Financials (vendor/customer creation)
- Access control (roles on approval)
- Load Board (unlock posting/bidding)
- Directory (company profiles)

### 5.6 Marketplace Module — `/marketplace/*`
**Purpose**: Discover → install → configure apps & integrations

#### MVP Features:
- **Catalog**: Listings, categories, search, screenshots, permissions
- **Install Flow**: OAuth/keys, scopes, environment (dev/stage/prod), config UI
- **Management**: Enable/disable, versioning, changelogs, tenant-scoped settings
- **Observability**: Per-app logs, events, retries, webhooks status
- **Billing**: Plan, usage, invoices (hooks to Financials)

#### Data Model:
```sql
mp_apps, mp_app_versions, mp_installs, mp_scopes, mp_events, mp_logs, mp_settings, mp_webhooks
```

#### Integrations:
- Financials (billing and invoicing)
- Super Admin (app management)
- All portals (app availability)

### 5.7 Directory Module — `/directory/*`
**Purpose**: Global directory for Shippers, Brokers, Carriers, and others (facilities, vendors)

#### MVP Features:
- **Entities**: Company profiles, contacts, lanes, equipment, compliance status, ratings
- **Search/Filters**: Geography (map + radius), equipment, lanes, score, compliance flags
- **Profiles**: Company overview, documents (COI, W-9, authority), performance KPIs, lanes coverage
- **Actions**: Invite to onboard, add to CRM, start quote, share lane, blocklist

#### Data Model:
```sql
dir_companies, dir_contacts, dir_docs, dir_lanes, dir_equipment, dir_scores, dir_flags
```

#### Integrations:
- Onboarding (invite)
- CRM (link/create)
- Load Board (targeted postings)
- Rates (lane intelligence)
- All portals (directory access)

## 6. Build System & Code Quality

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### Code Quality Tools
- **ESLint**: Enforced in CI with custom rules
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks
- **Lint-staged**: Staged files only

### Testing Strategy
- **Unit Tests**: Vitest/Jest for critical flows
- **Integration Tests**: Auth, create load, quote, invoice flows
- **E2E Tests**: Playwright for user journeys
- **Visual Regression**: Chromatic/Playwright on PR

### CI/CD Pipeline
- **Per-PR Previews**: Automatic deployment
- **Canary Deploys**: Gradual rollout
- **Feature Flags**: Safe feature toggles
- **Instant Rollback**: Emergency rollback capability

### Telemetry
- **Performance**: LCP/CLS/TTI monitoring
- **Error Tracking**: Action/error traces
- **User Analytics**: Behavior tracking
- **Super Admin Dashboards**: Real-time monitoring

## 7. Accessibility & Internationalization

### WCAG 2.2 AA Compliance
- **Keyboard Navigation**: Full keyboard paths
- **Focus Management**: Visible focus rings
- **Screen Reader**: Proper ARIA labels
- **Color Contrast**: Sufficient contrast ratios
- **Reduced Motion**: Respect user preferences

### Internationalization
- **i18n Scaffolding**: Translation keys
- **Locale Switch**: Language selection
- **Date/Number Formats**: Localized formatting
- **RTL Support**: Right-to-left languages

## 8. Migration & Rollout Strategy

### Phase 0 – Audit (Week 1)
- [ ] Auto-map existing routes and components
- [ ] Identify all TypeScript errors
- [ ] Document current architecture
- [ ] Create migration inventory

### Phase 1 – Foundations (Weeks 2-3)
- [ ] Implement design tokens
- [ ] Set up typography system
- [ ] Configure spacing and motion
- [ ] Establish icon system
- [ ] Create CSS custom properties

### Phase 2 – Core Components (Weeks 4-6)
- [ ] Build AppShell and layout components
- [ ] Create navigation system
- [ ] Implement form components
- [ ] Build data display components
- [ ] Create feedback components

### Phase 3 – Portal Redesigns (Weeks 7-12)
- [ ] Super Admin Portal redesign
- [ ] Broker Portal redesign
- [ ] Carrier Portal redesign
- [ ] Shipper Portal redesign
- [ ] Driver Portal redesign
- [ ] Owner-Operator Portal redesign

### Phase 4 – Cross-Portal Modules (Weeks 13-20)
- [ ] CRM Module development
- [ ] Load Board Module development
- [ ] Rates Module development
- [ ] Financials Module development
- [ ] Onboarding Module development
- [ ] Marketplace Module development
- [ ] Directory Module development

### Phase 5 – QA & Performance (Weeks 19-20)
- [ ] Accessibility audits
- [ ] Lighthouse performance testing
- [ ] Visual regression testing
- [ ] User acceptance testing
- [ ] Cross-browser testing

### Phase 6 – Launch (Week 21)
- [ ] Feature-flagged rollout
- [ ] Telemetry monitoring
- [ ] Hotfix path activation
- [ ] User training and documentation

## 9. Definition of Done (Enforced)

### Visual Changes
- **>40% layout/component changes** vs MCP-v1 (visual diff)
- **Not a color tweak** - substantial redesign required
- **Mobile-first responsive design**
- **Consistent with design tokens**

### Code Quality
- **Zero TypeScript errors**
- **Zero console errors** in smoke tests
- **Lighthouse budgets met** on mobile
- **Accessibility**: axe suite passes
- **Tab order verified**

### Documentation
- **Storybook coverage** for core + portal-critical pages
- **Component documentation** with examples
- **API documentation** for all endpoints
- **User guides** for each portal

### Testing
- **Unit tests** for critical flows
- **Integration tests** for user journeys
- **Visual regression tests** for UI components
- **Accessibility tests** for all pages

## 10. Deliverables (Artifact List)

### Design System
- [x] `/design/mcp-v2/tokens.json`
- [x] `/design/mcp-v2/tokens.md`
- [ ] `/design/mcp-v2/components.md`
- [ ] `/design/mcp-v2/ia.md`

### Component Library
- [ ] `/packages/ui` (MCP-v2 component library, versioned)
- [ ] Storybook documentation
- [ ] Component tests
- [ ] Accessibility tests

### Portal Applications
- [ ] `/apps/super-admin` with updated route maps
- [ ] `/apps/broker` with updated route maps
- [ ] `/apps/carrier` with updated route maps
- [ ] `/apps/shipper` with updated route maps
- [ ] `/apps/driver` with updated route maps
- [ ] `/apps/owner-operator` with updated route maps

### Cross-Portal Modules
- [ ] `/modules/crm`
- [ ] `/modules/loadboard`
- [ ] `/modules/rates`
- [ ] `/modules/financials`
- [ ] `/modules/onboarding`
- [ ] `/modules/marketplace`
- [ ] `/modules/directory`

### Documentation
- [ ] `/docs/ia.md` - Information Architecture
- [ ] `/docs/a11y.md` - Accessibility Guidelines
- [ ] `/docs/perf-budgets.md` - Performance Budgets
- [ ] `/docs/qa-checklist.md` - QA Checklists
- [ ] `/docs/module-specs/` - Module Specifications
- [ ] `/docs/CHANGELOG.md` - Change Log

### Monitoring
- [ ] Telemetry dashboards in Super Admin
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] User analytics

## 11. Guardrails (Block Regressions)

### Visual Quality Gates
- **Reject PRs** that only change token values without component/layout updates
- **Enforce visual-diff thresholds** (minimum 40% change)
- **Require Storybook states** for redesigned components
- **Mandate accessibility testing** for all new components

### Code Quality Gates
- **TypeScript strict mode** enforced
- **Zero any types** allowed
- **ESLint rules** enforced in CI
- **Test coverage** requirements

### Performance Gates
- **Lighthouse budgets** enforced
- **Bundle size limits** maintained
- **Runtime performance** monitored
- **Memory usage** tracked

## 12. Success Metrics

### Technical Metrics
- **Zero build errors** maintained
- **Performance budgets** met consistently
- **Accessibility compliance** 100%
- **Test coverage** >80%

### User Experience Metrics
- **Task completion rates** improved
- **Error rates** reduced
- **User satisfaction** scores increased
- **Adoption rates** accelerated

### Business Metrics
- **Development velocity** increased
- **Maintenance costs** reduced
- **Feature delivery** accelerated
- **User onboarding** streamlined

## 13. Risk Mitigation

### Technical Risks
- **Scope creep**: Strict phase gates and DoD enforcement
- **Performance degradation**: Continuous monitoring and budgets
- **Accessibility regressions**: Automated testing and audits
- **Integration complexity**: Modular architecture and clear APIs

### Timeline Risks
- **Resource constraints**: Parallel development tracks
- **Dependency delays**: Clear interfaces and contracts
- **Quality issues**: Continuous testing and review
- **User adoption**: Gradual rollout with feedback loops

## 14. Next Steps

### Immediate Actions (Next 24 Hours)
1. **Publish design intent** in Super Admin → "Design Reviews"
2. **Set up development environment** with new tooling
3. **Begin Phase 1** - Foundations implementation
4. **Establish CI/CD pipeline** with quality gates

### Week 1 Goals
1. **Complete design tokens** implementation
2. **Set up component library** structure
3. **Begin AppShell** development
4. **Establish testing framework**

### Month 1 Goals
1. **Complete core components** library
2. **Begin Super Admin** portal redesign
3. **Implement CRM module** foundation
4. **Establish cross-portal** integration patterns

This MCP-v2 redesign represents a complete transformation of the portal ecosystem, establishing a solid foundation for scalable, maintainable, and user-centric logistics management. The focus on cross-portal modules ensures seamless integration while maintaining portal-specific functionality.

**Execute now. Think first. Build systematically.**
