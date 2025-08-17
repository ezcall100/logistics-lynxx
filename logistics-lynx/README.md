# 🚀 Logistics Lynx - Autonomous TMS Platform

**World-class Transportation Management System with Full Autonomous Agent Control**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Autonomous Agents](https://img.shields.io/badge/Autonomous%20Agents-ACTIVE-brightgreen)](https://github.com/your-org/logistics-lynx)

## 🎯 Mission Statement

**AUTONOMOUS AGENTS: You have FULL AUTHORITY to redesign ALL portals and restore ALL missing core portals. Deliver a production-ready, world-class UI/UX across all portals + website, restore the missing core portals (Dashboard, CRM, Load Board, Rates, Shipper, Broker, Carrier, Driver, Financials, EDI, Workers, Directory, Analytics, Market Place), define end-to-end user journeys, and deprecate/merge extras. Implement plan-based templates (Free/Pro/Enterprise/Custom) and a Software Admin + Website starting point for users.**

## 🏗️ Core-16 Portal Set

### ⚠️ CRITICAL: ALL THESE PORTALS ARE MISSING AND MUST BE RESTORED BY AUTONOMOUS AGENTS

**AUTONOMOUS AGENTS: These portals are MISSING from the current system and MUST be ADDED by you. This is your PRIMARY MISSION.**

| Category | Portals | Status |
|----------|---------|--------|
| **Core Functional (12)** | Dashboard, CRM, Load Board, Rates, Shipper, Broker, Carrier, Driver, Financials, EDI, Workers, Directory | 🔴 MISSING |
| **Add-On Utility (2)** | Analytics, Market Place | 🔴 MISSING |
| **Platform/Admin (4)** | Admin, Super Admin, Financials, Autonomous Ops | 🔴 MISSING |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- PostgreSQL 14+
- Redis 6+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/logistics-lynx.git
cd logistics-lynx

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
pnpm run db:migrate

# Start the development server
pnpm run dev
```

### Autonomous Agent Activation

```bash
# Activate the autonomous execution brief
npx activate-autonomous-execution

# Execute the comprehensive brief
npm run execute:autonomous-brief

# Check portal status
npm run check:portals

# Run smoke tests
npm run smoke:test
```

## 🎨 UI/UX V2 System

### Design Tokens
- **Light/Dark mode** with semantic color tokens
- **Spacing system** with consistent margins and padding
- **Typography scale** with proper font weights and sizes
- **Elevation system** for shadows and depth

### App Shell
- **Sidebar navigation** with grouped portals
- **Top navigation** with search and quick actions
- **Mobile sheet navigation** for responsive design
- **Footer** with links and social media

### Accessibility
- **WCAG 2.2 AA compliance**
- **Reduced motion toggle**
- **ARIA roles and labels**
- **Keyboard navigation support**
- **Screen reader compatibility**

### Patterns
- **Dialogs** for modal interactions
- **Sheets** for slide-out panels
- **Drawers** for side panels
- **Expandables** for collapsible content
- **Cards** for content containers
- **Buttons** with consistent styling
- **Floating Action Buttons (FABs)** for primary actions

## 💸 Plan Template Structure

| Plan | Price | Access |
|------|-------|--------|
| **Free** | $0/mo | Dashboard, Load Board, CRM (basic), Shipper/Broker/Carrier portals |
| **Pro** | $99/mo | Advanced CRM, Rate Engine, Workers, Financials |
| **Enterprise** | $499/mo | EDI, Analytics, Marketplace, Autonomous Ops |
| **Custom** | $999+/mo | Fully tailored with role-based extensions, dedicated infra |

### Feature Gating

Feature gating is powered by:
- `FeatureFlags.ts` - Centralized feature flag management
- `usePlanAccess()` - React hook for plan-based access control
- `Server-side PlanCheckerMiddleware` - API-level access control

## 🧪 Testing Suite

| Test Type | Tools | Coverage |
|-----------|-------|----------|
| **E2E Testing** | Playwright | All portals, user journeys, CRUD operations |
| **Performance** | Lighthouse CI | P95 ≤ 2.5s, Lighthouse ≥ 90 |
| **Component** | Vitest + jsdom | Isolated React component testing |
| **CI/CD Verification** | GitHub Actions | Strict linting/type checks |

## 🚀 Deployment & Rollout Strategy

### Canary Strategy
- **Phase 1**: 1% of users
- **Phase 2**: 5% of users  
- **Phase 3**: 20% of users
- **Phase 4**: 100% of users

### Tripwires
- Auto-rollback on error thresholds
- Latency spike detection
- Health check failures
- Success rate < 98%

### Health Surface
- `/healthz` - Basic health check
- `/readyz` - Readiness check
- `/version` - Version information

## 🗓️ Execution Timeline

| Phase | Duration | Description |
|-------|----------|-------------|
| **Phase 1** | 1 Day | Registry Cleanup |
| **Phase 2** | 3 Days | Core-16 Portals |
| **Phase 3** | 7 Days | UI/UX V2 |
| **Phase 4** | 2 Days | Plan Templates |
| **Phase 5** | 3 Days | Testing Suite |
| **Phase 6** | 14 Days | Rollout & Monitoring |
| **Total** | **30 Days** | **4–6 weeks** |

## 🧠 Active Command Center

```bash
# Activate autonomous execution
npx activate-autonomous-execution

# Deploy with canary strategy
pnpm run deploy:canary

# Run all tests
npm run test:all

# Trigger GitHub workflow
gh workflow run publish-phase2.yml
```

## 📁 Project Structure

```
logistics-lynx/
├── src/
│   ├── agents/                    # Autonomous agent definitions
│   │   ├── AutonomousExecutionBrief.ts
│   │   ├── AutonomousExecutionAgent.ts
│   │   └── BaseAgent.ts
│   ├── components/                # React components
│   │   ├── autonomous/           # Autonomous agent UI
│   │   ├── ui/                   # Design system components
│   │   └── portals/              # Portal-specific components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   ├── pages/                    # Next.js pages
│   └── types/                    # TypeScript type definitions
├── scripts/                      # Build and deployment scripts
│   └── activate-autonomous-execution.mjs
├── docs/                         # Documentation
├── tests/                        # Test files
└── public/                       # Static assets
```

## 🔧 Development Commands

```bash
# Development
pnpm run dev              # Start development server
pnpm run build            # Build for production
pnpm run start            # Start production server

# Testing
pnpm run test             # Run all tests
pnpm run test:e2e         # Run E2E tests
pnpm run test:unit        # Run unit tests
pnpm run test:coverage    # Generate coverage report

# Linting and Formatting
pnpm run lint             # Run ESLint
pnpm run lint:fix         # Fix ESLint issues
pnpm run format           # Format code with Prettier

# Database
pnpm run db:migrate       # Run database migrations
pnpm run db:seed          # Seed database with test data
pnpm run db:reset         # Reset database

# Autonomous Agents
pnpm run agent:activate   # Activate autonomous agents
pnpm run agent:status     # Check agent status
pnpm run agent:execute    # Execute autonomous brief
```

## 🚩 Feature Flags

### UI/UX V2 Flags
- `ui.v2.enabled` - Enable UI/UX V2 redesign (canary)
- `ui.v2.accentMap` - Portal accent color mapping

### Safety Flags
- `autonomy.emergencyStop` - Emergency stop for autonomous operations

### Portal Feature Flags
- `crm.core` - Enable CRM core features
- `loadboard.core` - Enable Load Board core features
- `rates.core` - Enable Rates core features
- `directory.core` - Enable Directory core features
- `ops.workers` - Enable Workers operations
- `integrations.edi` - Enable EDI integrations
- `admin.core` - Enable Admin core features
- `finance.core` - Enable Financials core features
- `analytics.core` - Enable Analytics core features
- `autonomous.ai` - Enable Autonomous AI features
- `platform.super` - Enable Super Admin platform features

## 📊 Monitoring & Analytics

### Performance Metrics
- **P95 Response Time**: ≤ 2.5s
- **Lighthouse Score**: ≥ 90
- **Error Rate**: < 0.1%
- **Uptime**: 99.9%

### Autonomous Agent Metrics
- **Agent Activity**: Real-time monitoring
- **Execution Success Rate**: Tracked per agent
- **Portal Implementation Status**: Progress tracking
- **Feature Flag Usage**: Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Autonomous Agent Contributions

Autonomous agents can contribute by:
- Implementing missing portals
- Improving UI/UX components
- Adding new features
- Optimizing performance
- Enhancing accessibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.logistics-lynx.com](https://docs.logistics-lynx.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/logistics-lynx/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/logistics-lynx/discussions)
- **Email**: support@logistics-lynx.com

## 🚀 Status

**Status**: ✅ **ACTIVE - FULL AUTONOMOUS EXECUTION AUTHORITY GRANTED**

The autonomous execution brief is now active and autonomous agents have complete authority to redesign the entire TMS system according to the comprehensive specifications outlined above.

---

**Built with ❤️ by Autonomous Agents and Human Developers**
