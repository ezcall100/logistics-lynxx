# 🧭 Role & User Matrix (Canonical, 0-100% Coverage)

## 👥 **Human Roles**

### **super_admin (global)**
- **Scope**: Global system control
- **Permissions**: 
  - All feature flags (read/write)
  - DR cutover and rollback
  - Budget edits and overrides
  - Full audit access
  - Sees every tenant
  - Emergency stop activation
- **Access**: All portals and systems

### **tenant_admin**
- **Scope**: Tenant-specific
- **Permissions**:
  - Billing and payment management
  - User invites and role assignments
  - Portal enable/disable for own tenant
  - Entitlements management
  - SSO/MFA configuration
  - Tenant branding
- **Access**: Admin, TMS Admin, Onboarding, Marketplace portals

### **ops_manager**
- **Scope**: Tenant-specific
- **Permissions**:
  - Broker/shipper/carrier operations
  - DLQ dry-run and replay approval
  - Exception policies and handling
  - SLA management
  - Performance monitoring
- **Access**: Broker, Shipper, Carrier, Load Board, CRM, EDI, Workers, Rates, Directory portals

### **dispatcher**
- **Scope**: Tenant-specific
- **Permissions**:
  - Tender/assign/track operations
  - Exception triage
  - Document submission
  - Read DLQ state
  - No configuration access
- **Access**: Broker, Shipper, Carrier, Load Board portals (read-only for some features)

### **finance_manager**
- **Scope**: Tenant-specific
- **Permissions**:
  - AR/AP management
  - Settlements processing
  - Factoring releases
  - Financial reporting
  - Payment approvals
- **Access**: Financials, Factoring portals

### **analyst**
- **Scope**: Tenant-specific
- **Permissions**:
  - Analytics dashboards
  - Data exports (redacted PII)
  - KPI monitoring
  - Report generation
  - Performance analysis
- **Access**: Analytics, CRM, Financials, Rates, Directory portals

### **developer**
- **Scope**: Global (limited)
- **Permissions**:
  - Read production logs/traces (redacted)
  - Deploy to staging only
  - Debug and troubleshooting
  - Performance analysis
- **Access**: Read-only access to most systems

### **viewer**
- **Scope**: Tenant-specific
- **Permissions**:
  - Read-only dashboards
  - Report viewing
  - No write access
- **Access**: All portals (read-only)

---

## 🤖 **Machine Service Accounts (Rotated Every 90 Days)**

### **autopilot@ (orchestrator)**
- **Scope**: Global system orchestration
- **Permissions**:
  - Queue management
  - SLO gates monitoring
  - Canary flag flips
  - System health monitoring
  - Performance optimization
- **Access**: All system APIs and databases

### **agents@ (workers)**
- **Scope**: Task execution
- **Permissions**:
  - Execute autonomous tasks
  - Write logs and spans
  - Publish outbox events
  - Read task queues
  - Update task status
- **Access**: Task execution APIs, databases, logging systems

### **dlq@ (replay)**
- **Scope**: Dead letter queue management
- **Permissions**:
  - DLQ replays (batch/size/20%-fail rails enforced)
  - Signed internal calls
  - Audit logging
  - Rate limiting enforcement
- **Access**: DLQ systems, replay APIs, audit logs

### **ci@ (self-heal)**
- **Scope**: Continuous integration
- **Permissions**:
  - Post-deploy verification
  - Auto-rollback on SLO breach
  - Health checks
  - Performance testing
- **Access**: CI/CD systems, monitoring APIs

### **n8n@ (workflows)**
- **Scope**: Workflow automation
- **Permissions**:
  - Inbound/outbound job processing
  - Signed webhooks
  - Headers propagate traceparent
  - Workflow execution
- **Access**: n8n platform, webhook endpoints

### **system@ (break-glass)**
- **Scope**: Emergency operations
- **Permissions**:
  - DR promote/rollback
  - Feature emergencyStop only
  - Full audit trail
  - Break-glass procedures
- **Access**: Emergency systems, audit logs

---

## 🏢 **Portals → Role Gates (RLS Enforced)**

| Portal | Allowed Roles | Access Level |
|--------|---------------|--------------|
| **Super Admin** | super_admin | Full |
| **Admin** | tenant_admin | Full |
| **TMS Admin** | tenant_admin, ops_manager | Full |
| **Onboarding** | tenant_admin | Full |
| **Broker** | ops_manager, dispatcher, viewer | Role-based |
| **Shipper** | ops_manager, dispatcher, viewer | Role-based |
| **Carrier** | ops_manager, dispatcher, viewer | Role-based |
| **Driver** | driver, viewer | Role-based |
| **Owner Operator** | owner_operator | Full |
| **Factoring** | finance_manager | Full |
| **Load Board** | ops_manager, dispatcher, viewer | Role-based |
| **CRM** | ops_manager, analyst | Role-based |
| **Financials** | finance_manager, analyst | Role-based |
| **EDI** | ops_manager | Full |
| **Marketplace** | tenant_admin | Full |
| **Analytics** | analyst, viewer | Role-based |
| **Autonomous** | super_admin, ops_manager (readonly) | Role-based |
| **Workers** | ops_manager | Full |
| **Rates** | ops_manager, analyst | Role-based |
| **Directory** | ops_manager, analyst, viewer | Role-based |

---

## 🔒 **Permission Matrix**

### **Feature Flag Access**
| Role | Read | Write | Emergency Stop |
|------|------|-------|----------------|
| super_admin | ✅ All | ✅ All | ✅ |
| tenant_admin | ✅ Tenant | ✅ Tenant | ❌ |
| ops_manager | ✅ Tenant | ✅ Limited | ❌ |
| dispatcher | ✅ Tenant | ❌ | ❌ |
| finance_manager | ✅ Tenant | ✅ Financial | ❌ |
| analyst | ✅ Tenant | ❌ | ❌ |
| developer | ✅ Global (redacted) | ❌ | ❌ |
| viewer | ✅ Tenant | ❌ | ❌ |

### **Data Access**
| Role | Own Tenant | Other Tenants | Audit Logs |
|------|------------|---------------|------------|
| super_admin | ✅ Full | ✅ Full | ✅ Full |
| tenant_admin | ✅ Full | ❌ | ✅ Own |
| ops_manager | ✅ Full | ❌ | ✅ Own |
| dispatcher | ✅ Limited | ❌ | ✅ Own |
| finance_manager | ✅ Financial | ❌ | ✅ Own |
| analyst | ✅ Read | ❌ | ✅ Own |
| developer | ✅ Read (redacted) | ❌ | ✅ Limited |
| viewer | ✅ Read | ❌ | ❌ |

### **System Operations**
| Role | DLQ Replay | Agent Control | SLO Management | Emergency Stop |
|------|------------|---------------|----------------|----------------|
| super_admin | ✅ | ✅ | ✅ | ✅ |
| tenant_admin | ❌ | ❌ | ❌ | ❌ |
| ops_manager | ✅ Approve | ❌ | ✅ Monitor | ❌ |
| dispatcher | ✅ Read | ❌ | ❌ | ❌ |
| finance_manager | ❌ | ❌ | ❌ | ❌ |
| analyst | ❌ | ❌ | ✅ Read | ❌ |
| developer | ❌ | ❌ | ✅ Read | ❌ |
| viewer | ❌ | ❌ | ❌ | ❌ |

---

## 🔐 **Security Enforcement**

### **Row-Level Security (RLS)**
- All tenant data protected by RLS policies
- Users can only access their own tenant's data
- super_admin can access all tenant data
- Service accounts have appropriate scoped access

### **JWT Claims**
- Role claims embedded in JWT tokens
- Tenant ID enforced at application level
- Token expiration and rotation
- HMAC v2 signature validation

### **Audit Trail**
- Every action logged with user/role context
- Timestamp and IP address tracking
- Change history for all modifications
- Compliance-ready audit logs

### **Access Control**
- Role-based access control (RBAC)
- Principle of least privilege
- Regular access reviews
- Automated permission audits

---

## 📋 **Implementation Notes**

### **Role Assignment**
- Roles assigned during user onboarding
- Multi-role support for complex permissions
- Role inheritance and delegation
- Temporary role elevation for emergencies

### **Service Account Management**
- 90-day key rotation schedule
- Monthly rotation rehearsals
- Automated key generation and distribution
- Secure key storage and access

### **Portal Access Control**
- RLS policies enforce tenant isolation
- Role gates control portal access
- Feature flags enable/disable functionality
- Audit logging for all access attempts

### **Emergency Procedures**
- Break-glass access for emergencies
- Emergency role elevation
- Audit trail for all emergency actions
- Post-emergency review and cleanup

---

**🔄 This role matrix ensures secure, auditable access control while enabling autonomous operation with appropriate human oversight.**
