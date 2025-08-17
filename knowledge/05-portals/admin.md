---
title: Admin Portal — Operating Map
version: 1.0.0
owner: admin.ops@transbot.ai
visibility: agents,human-ops
scope: portal
portal: admin
ttl_days: 30
last_validated: 2025-08-15
---

## Route & Flag

- Path: `/admin`
- Feature flag: `portal.admin.enabled`
- Roles: `admin`, `owner`

## Key actions (with spans)

- User Management: `agent.fn.admin.users.manage`
- System Configuration: `agent.fn.admin.config.manage`
- Audit Logs: `agent.fn.admin.audit.view`
- Feature Flags: `agent.fn.admin.flags.manage`

## KPIs

- p95 ≤ 2.5s, success ≥ 98%
- User management operations < 5s
- Configuration changes < 10s

## Error taxonomy

- `ADMIN-401`: RBAC denial
- `ADMIN-USER-NOT-FOUND`: User not found
- `ADMIN-CONFIG-INVALID`: Invalid configuration

## Golden checks

- 200 after login; spans present; SLI event persisted
- User creation < 3s
- Config update < 5s

# Software Admin Portal - Networks > Customers

## Overview
The **Networks > Customers** section in the Software Admin Portal is the central hub for managing all software users and their access permissions. This is where autonomous agents can view, manage, and control access for all entities that use the TMS software platform.

## Primary User Types (Direct Software Access)

### 1. **Shippers** 🚛
- **Definition**: Companies or individuals who need to transport goods
- **Role**: Create shipping requests, manage loads, track shipments
- **Access Level**: Shipper-specific portal with load management capabilities
- **Key Functions**:
  - Create and manage shipping requests
  - Track shipments in real-time
  - Manage delivery schedules
  - Access rate quotes and pricing
  - Manage their own owner operators (if applicable)

### 2. **Brokers** 🏢
- **Definition**: Intermediaries who connect shippers with carriers
- **Role**: Facilitate transactions, manage relationships, coordinate logistics
- **Access Level**: Broker portal with relationship management tools
- **Key Functions**:
  - Match shippers with carriers
  - Manage load boards
  - Handle rate negotiations
  - Track commission and payments
  - Manage their own owner operators (if applicable)

### 3. **Carriers** 🚚
- **Definition**: Transportation companies that physically move goods
- **Role**: Accept loads, manage drivers, execute shipments
- **Access Level**: Carrier portal with fleet management capabilities
- **Key Functions**:
  - Accept and manage loads
  - Track driver locations
  - Manage fleet operations
  - Handle billing and payments
  - Manage their drivers and owner operators

## Subordinate User Types (Managed Through Primary Users)

### **Drivers** 👨‍💼 → **Part of Carriers**
- **Definition**: Individual truck drivers employed by carriers
- **Role**: Execute shipments, maintain logs, report status
- **Access Level**: Driver portal with mobile-friendly interface (managed by their carrier)
- **Key Functions**:
  - View assigned loads (from their carrier)
  - Update delivery status
  - Maintain electronic logs
  - Report issues and delays
  - Access carrier-specific features

### **Owner Operators** 🚗 → **Can be part of Shippers, Brokers, or Carriers**
- **Definition**: Independent truck drivers who own their vehicles
- **Role**: Direct carrier operations, manage single vehicle
- **Access Level**: Owner-operator portal with simplified interface (managed by their primary user)
- **Key Functions**:
  - Accept individual loads (through their primary user)
  - Track earnings and expenses
  - Manage vehicle maintenance
  - Handle personal scheduling
  - Access features based on their primary user type

**Owner Operator Classifications**:
- **Shipper Owner Operators**: Work directly for shippers (rare, but possible)
- **Broker Owner Operators**: Work through broker relationships
- **Carrier Owner Operators**: Work under carrier contracts (most common)

## Other Software Users (External Integrations)
- **Factoring Companies**: Handle invoice financing
- **Insurance Providers**: Manage coverage and claims
- **Fuel Card Providers**: Handle fuel purchases and billing
- **Maintenance Providers**: Manage vehicle service records
- **Compliance Officers**: Monitor regulatory requirements

## User Hierarchy and Access Control

### **Primary User Management** 🔐
- **Shippers**: Can manage their own owner operators and access shipper-specific features
- **Brokers**: Can manage their own owner operators and access broker-specific features
- **Carriers**: Can manage their drivers and owner operators, access carrier-specific features

### **Subordinate User Access** 📱
- **Drivers**: Access limited to carrier-assigned functions and loads
- **Owner Operators**: Access based on their primary user relationship (Shipper/Broker/Carrier)

### **Autonomous Agent Management** 🤖
- **Primary User Approval**: Approve/deny Shippers, Brokers, and Carriers
- **Subordinate User Monitoring**: Monitor drivers and owner operators through their primary users
- **Relationship Management**: Ensure proper hierarchical relationships are maintained
- **Access Control**: Manage portal access based on user hierarchy

## Autonomous Agent Management Capabilities

### **Access Control** 🔐
- **Primary User Registration**: Approve or deny new Shippers, Brokers, and Carriers
- **Role Assignment**: Assign appropriate portal access levels for primary users
- **Permission Management**: Control feature access based on user type and hierarchy
- **Account Status**: Activate, suspend, or deactivate primary user accounts

### **Relationship Management** 🤝
- **Hierarchy Mapping**: Visualize relationships between primary users and their subordinates
- **Communication Tools**: Facilitate interactions between different user types
- **Dispute Resolution**: Handle conflicts between shippers, brokers, and carriers
- **Performance Tracking**: Monitor user activity and compliance within hierarchy

### **Compliance Monitoring** ✅
- **Regulatory Compliance**: Ensure primary users meet industry standards
- **Document Verification**: Validate licenses, insurance, and certifications
- **Safety Records**: Track safety ratings and incident history
- **Financial Stability**: Monitor payment history and creditworthiness

### **Analytics and Reporting** 📊
- **User Activity**: Track login frequency and feature usage by hierarchy
- **Network Performance**: Analyze relationship effectiveness between user types
- **Revenue Impact**: Measure user contribution to platform revenue
- **Growth Metrics**: Monitor user acquisition and retention by type

## Autonomous Agent Actions

### **Proactive Management** 🚀
1. **Automated Onboarding**: Streamline new primary user registration process
2. **Smart Matching**: Use AI to connect compatible shippers and carriers
3. **Hierarchy Optimization**: Ensure proper subordinate user relationships
4. **Performance Optimization**: Suggest improvements based on user behavior

### **Issue Resolution** 🔧
1. **Automated Support**: Provide instant responses to common questions
2. **Escalation Management**: Route complex issues to appropriate human agents
3. **Conflict Resolution**: Mediate disputes between primary users
4. **System Optimization**: Identify and fix platform issues affecting user hierarchy

### **Growth and Expansion** 📈
1. **Primary User Acquisition**: Identify and onboard new Shippers, Brokers, and Carriers
2. **Feature Adoption**: Encourage primary users to utilize advanced platform features
3. **Network Expansion**: Facilitate connections between different primary user types
4. **Revenue Optimization**: Maximize platform value for all stakeholders

## Key Metrics for Autonomous Agents

### **User Health Indicators** 💚
- **Active Primary Users**: Daily/weekly/monthly active Shippers, Brokers, and Carriers
- **Subordinate User Engagement**: Driver and owner operator activity through primary users
- **Satisfaction Scores**: User feedback and rating systems by hierarchy
- **Retention Rate**: User loyalty and platform stickiness by type

### **Network Effectiveness** 🌐
- **Connection Success Rate**: Successful matches between Shippers and Carriers
- **Transaction Volume**: Number and value of completed shipments
- **Dispute Resolution Time**: Average time to resolve conflicts
- **Network Growth**: Expansion of primary user base and relationships

### **Platform Performance** ⚡
- **System Uptime**: Platform availability and reliability
- **Response Times**: Speed of platform operations
- **Error Rates**: Frequency of technical issues
- **User Support Efficiency**: Resolution time for support requests

## Autonomous Agent Authority

### **Full Administrative Control** 👑
- **Primary User Management**: Complete control over Shippers, Brokers, and Carriers
- **Hierarchy Management**: Authority to manage subordinate user relationships
- **System Configuration**: Ability to modify platform settings and features
- **Data Access**: Full visibility into all user interactions and transactions
- **Policy Enforcement**: Authority to implement and enforce platform policies

### **Decision Making Authority** 🎯
- **Access Approval**: Autonomous approval of new primary user registrations
- **Hierarchy Assignment**: Authority to assign proper user relationships
- **Feature Rollout**: Independent deployment of new platform features
- **Policy Updates**: Ability to modify platform policies and procedures
- **Emergency Actions**: Authority to take immediate action in critical situations

### **Continuous Improvement** 🔄
- **Learning and Adaptation**: Continuous improvement based on user feedback
- **Feature Development**: Autonomous creation of new platform capabilities
- **Process Optimization**: Streamlining of administrative procedures
- **Innovation Implementation**: Introduction of cutting-edge features and technologies

## Summary

The **Networks > Customers** section represents the heart of the TMS software ecosystem, where autonomous agents manage the primary user types (Shippers, Brokers, Carriers) and their subordinate users (Drivers and Owner Operators). This hierarchical management approach ensures optimal platform performance, user satisfaction, and business growth while maintaining the highest standards of security, compliance, and operational efficiency.

**Key Understanding**: 
- **Primary Users** (Shippers, Brokers, Carriers) get direct software access
- **Drivers** are managed through their **Carriers**
- **Owner Operators** can be managed through **Shippers**, **Brokers**, or **Carriers** depending on their business model

Autonomous agents have full authority to manage this critical function, ensuring the platform serves all users effectively while driving continuous improvement and innovation in the transportation management industry.
