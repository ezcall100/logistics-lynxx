# 🚀 Developer Onboarding Sheet - Logistics Lynx

**Complete guide for new developers joining the autonomous TMS platform**

## 🎯 Quick Start Checklist

### ✅ Pre-requisites Installation
- [ ] Node.js 18+ installed
- [ ] pnpm 8+ installed
- [ ] Git configured
- [ ] IDE/Editor setup (VS Code recommended)
- [ ] PostgreSQL 14+ installed
- [ ] Redis 6+ installed

### ✅ Repository Setup
- [ ] Clone repository: `git clone https://github.com/your-org/logistics-lynx.git`
- [ ] Navigate to project: `cd logistics-lynx`
- [ ] Install dependencies: `pnpm install`
- [ ] Copy environment file: `cp .env.example .env.local`
- [ ] Configure environment variables in `.env.local`

### ✅ Database Setup
- [ ] Create PostgreSQL database
- [ ] Run migrations: `pnpm run db:migrate`
- [ ] Seed test data: `pnpm run db:seed`
- [ ] Verify connection: `pnpm run db:test`

### ✅ Development Environment
- [ ] Start development server: `pnpm run dev`
- [ ] Verify application loads at `http://localhost:3000`
- [ ] Run tests: `pnpm run test`
- [ ] Check linting: `pnpm run lint`

## 🏗️ Project Architecture Overview

### Core Components

#### 1. Autonomous Agent System
```
src/agents/
├── AutonomousExecutionBrief.ts    # Main execution configuration
├── AutonomousExecutionAgent.ts    # Agent orchestration
├── BaseAgent.ts                   # Base agent class
└── AgentManager.ts                # Agent lifecycle management
```

#### 2. Portal System
```
src/components/portals/
├── Dashboard/                     # Main dashboard portal
├── CRM/                          # Customer relationship management
├── LoadBoard/                    # Load management portal
├── Rates/                        # Rate management portal
├── Shipper/                      # Shipper portal
├── Broker/                       # Broker portal
├── Carrier/                      # Carrier portal
├── Driver/                       # Driver portal
├── Financials/                   # Financial management
├── EDI/                          # Electronic data interchange
├── Workers/                      # Background job management
├── Directory/                    # Entity directory
├── Analytics/                    # Business intelligence
├── Admin/                        # System administration
├── SuperAdmin/                   # Platform administration
└── AutonomousOps/                # Autonomous operations
```

#### 3. UI/UX V2 System
```
src/components/ui/
├── design-tokens/                # Design system tokens
├── app-shell/                    # Application shell components
├── patterns/                     # Reusable UI patterns
├── accessibility/                # Accessibility components
└── responsive/                   # Responsive design utilities
```

## 🎨 Design System Guidelines

### Color Palette
```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-900: #1e3a8a;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Typography Scale
```css
/* Font Sizes */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
```

### Spacing System
```css
/* Spacing Units */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-4: 1rem;
--space-8: 2rem;
--space-16: 4rem;
```

## 🔧 Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/portal-name

# Make changes and test
pnpm run dev
pnpm run test

# Commit changes
git add .
git commit -m "feat: add portal-name functionality"

# Push and create PR
git push origin feature/portal-name
```

### 2. Portal Development
```bash
# Scaffold new portal
pnpm run portal:scaffold portal-name

# Implement portal components
# Add to navigation
# Add feature flags
# Add tests
```

### 3. Testing Strategy
```bash
# Unit tests
pnpm run test:unit

# Integration tests
pnpm run test:integration

# E2E tests
pnpm run test:e2e

# Performance tests
pnpm run test:performance
```

## 🚀 Autonomous Agent Integration

### Understanding Autonomous Agents

Autonomous agents are AI-powered entities that can:
- **Analyze** system components
- **Implement** improvements automatically
- **Test** changes thoroughly
- **Deploy** with safety measures
- **Monitor** system health

### Working with Autonomous Agents

#### 1. Agent Activation
```bash
# Activate autonomous execution
npx activate-autonomous-execution

# Check agent status
pnpm run agent:status

# Execute specific brief
pnpm run agent:execute
```

#### 2. Agent Communication
```typescript
// Example: Agent task execution
import { executeAgentTask } from '@/agents/AgentManager';

await executeAgentTask({
  agentId: 'portal-implementation-agent',
  task: 'Implement CRM portal with full CRUD operations',
  priority: 'high',
  context: {
    portal: 'crm',
    features: ['accounts', 'contacts', 'opportunities']
  }
});
```

#### 3. Agent Monitoring
```bash
# View agent logs
pnpm run agent:logs

# Monitor agent performance
pnpm run agent:metrics

# Check agent health
pnpm run agent:health
```

## 📋 Portal Implementation Guide

### Portal Structure Template
```typescript
// src/components/portals/[PortalName]/index.tsx
import React from 'react';
import { PortalLayout } from '@/components/ui/portal-layout';
import { PortalHeader } from '@/components/ui/portal-header';
import { PortalContent } from '@/components/ui/portal-content';

export default function PortalNamePage() {
  return (
    <PortalLayout>
      <PortalHeader 
        title="Portal Name"
        description="Portal description"
        actions={[
          { label: 'New Item', action: 'create' },
          { label: 'Import', action: 'import' }
        ]}
      />
      <PortalContent>
        {/* Portal-specific content */}
      </PortalContent>
    </PortalLayout>
  );
}
```

### Required Portal Files
```
src/components/portals/[PortalName]/
├── index.tsx                    # Main portal page
├── components/                  # Portal-specific components
│   ├── PortalNameList.tsx
│   ├── PortalNameForm.tsx
│   └── PortalNameDetail.tsx
├── hooks/                       # Portal-specific hooks
│   └── usePortalName.ts
├── types/                       # Portal-specific types
│   └── portal-name.types.ts
└── tests/                       # Portal-specific tests
    ├── PortalName.test.tsx
    └── usePortalName.test.ts
```

## 🧪 Testing Guidelines

### Component Testing
```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import { PortalNamePage } from './index';

describe('PortalNamePage', () => {
  it('renders portal header', () => {
    render(<PortalNamePage />);
    expect(screen.getByText('Portal Name')).toBeInTheDocument();
  });

  it('shows create action button', () => {
    render(<PortalNamePage />);
    expect(screen.getByText('New Item')).toBeInTheDocument();
  });
});
```

### Hook Testing
```typescript
// Example hook test
import { renderHook, act } from '@testing-library/react';
import { usePortalName } from './hooks/usePortalName';

describe('usePortalName', () => {
  it('initializes with empty data', () => {
    const { result } = renderHook(() => usePortalName());
    expect(result.current.data).toEqual([]);
  });

  it('loads data on mount', async () => {
    const { result } = renderHook(() => usePortalName());
    await act(async () => {
      await result.current.loadData();
    });
    expect(result.current.data).toHaveLength(5);
  });
});
```

## 🚩 Feature Flag Management

### Adding New Feature Flags
```typescript
// src/lib/feature-flags.ts
export const FEATURE_FLAGS = {
  // Existing flags...
  'portal-name.enabled': {
    description: 'Enable Portal Name functionality',
    defaultValue: false,
    purpose: 'Feature gate for Portal Name portal'
  }
} as const;
```

### Using Feature Flags
```typescript
// In components
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

function PortalNameComponent() {
  const isEnabled = useFeatureFlag('portal-name.enabled');
  
  if (!isEnabled) {
    return <FeatureLockedMessage feature="Portal Name" />;
  }
  
  return <PortalNameContent />;
}
```

## 📊 Performance Guidelines

### Performance Targets
- **P95 Response Time**: ≤ 2.5s
- **Lighthouse Score**: ≥ 90
- **Bundle Size**: < 500KB (gzipped)
- **First Contentful Paint**: < 1.5s

### Performance Monitoring
```bash
# Run performance audit
pnpm run audit:performance

# Generate bundle analysis
pnpm run analyze:bundle

# Run Lighthouse CI
pnpm run lighthouse:ci
```

## 🔒 Security Guidelines

### Security Checklist
- [ ] Input validation on all forms
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Authentication required for protected routes
- [ ] Authorization checks for all actions
- [ ] Secure environment variable handling

### Security Testing
```bash
# Run security audit
pnpm run audit:security

# Check for vulnerabilities
pnpm audit

# Run security tests
pnpm run test:security
```

## 📚 Learning Resources

### Documentation
- [Project README](./README.md)
- [Autonomous Execution Brief](./AUTONOMOUS_EXECUTION_BRIEF_SUMMARY.md)
- [Missing Portals Confirmation](./MISSING_PORTALS_CONFIRMATION.md)
- [API Documentation](./docs/api.md)

### External Resources
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🆘 Getting Help

### Internal Support
- **Slack**: #logistics-lynx-dev
- **Email**: dev-support@logistics-lynx.com
- **GitHub Issues**: [Create Issue](https://github.com/your-org/logistics-lynx/issues)

### Escalation Path
1. **Team Lead**: For technical decisions and architecture
2. **Autonomous Agent**: For system-level improvements
3. **Project Manager**: For timeline and resource questions

## 🎯 Success Metrics

### Development Metrics
- **Code Quality**: Maintain > 90% test coverage
- **Performance**: Meet all performance targets
- **Accessibility**: WCAG 2.2 AA compliance
- **Security**: Zero critical vulnerabilities

### Portal Implementation Metrics
- **Completion Rate**: All 17 portals implemented
- **Feature Parity**: Full CRUD operations
- **User Experience**: Intuitive navigation and workflows
- **Integration**: Seamless data flow between portals

---

**Welcome to the Logistics Lynx team! 🚀**

*This onboarding guide is maintained by autonomous agents and updated automatically.*
