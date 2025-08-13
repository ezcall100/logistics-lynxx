# Directory Portal

## Overview
The Directory Portal serves as a living "network graph" of companies, facilities, equipment, compliance, and contacts within the TMS ecosystem.

## Audience
- Shippers
- Brokers
- Carriers

## Key Use Cases
1. **Company Directory**: Comprehensive company profiles and network management
2. **Facility Directory**: Warehouse, distribution center, and terminal management
3. **People & Contacts**: Contact management and relationship tracking
4. **Verification & Badges**: Compliance verification and trust indicators
5. **Preferred/Blocked Lists**: Partner management and risk mitigation
6. **Scorecards**: Performance tracking and rating systems
7. **Invite & Onboard**: Streamlined partner onboarding process

## Core Pages
- **Explore**: Search and discover companies, facilities, and contacts
- **Company Profile**: Detailed company information and performance metrics
- **Facility Profile**: Facility-specific details and capabilities
- **Lists**: Preferred/blocked lists and custom groupings
- **Scorecards**: Performance metrics and rating systems

## Data Model
### Core Tables
- `directory_companies`: Company profiles and metadata
- `directory_facilities`: Facility information and capabilities
- `directory_equipment`: Equipment inventory and specifications
- `directory_contacts`: Contact information and relationships
- `directory_scorecards`: Performance metrics and ratings
- `directory_lists`: Custom lists and groupings
- `directory_list_members`: List membership management
- `directory_docs`: Document storage and verification

## APIs / Workflows
- `GET /directory/search`: Search companies, facilities, and contacts
- `POST /directory/invite`: Send invitation to join network
- `POST /directory/list/:id/add`: Add member to list
- `GET /directory/company/:id/scorecard`: Get company performance metrics
- `POST /directory/verify`: Verify company compliance and credentials

## Automations
- **Expired COI Alert**: Automatic notification for expired certificates of insurance
- **Performance Drop Notification**: Alert when company performance metrics decline
- **Compliance Monitoring**: Automated compliance status tracking
- **Network Growth**: Suggest new connections based on business patterns

## KPIs / SLAs
- **Coverage**: Network completeness and data quality
- **Data Freshness**: Timeliness of information updates
- **Discovery → Engagement**: Conversion from search to interaction

## Security
- `company_id_owner` for owning tenant
- Global/sharable records read-only unless explicitly shared
- Role-based access control (RBAC)
- Data privacy and GDPR compliance

## Integration Points
- Unified Dashboard
- Rates Portal (for carrier/shipper data)
- Load Management Portal
- Onboarding Flow
- Autonomous Agents (for automated verification and monitoring)

## Features
### Company Profiles
- Basic information (name, type, size, location)
- Service offerings and capabilities
- Compliance status and certifications
- Performance metrics and ratings
- Contact information and relationships

### Facility Management
- Location and contact details
- Equipment and capacity information
- Operating hours and availability
- Specialized capabilities
- Performance metrics

### Contact Management
- Individual contact profiles
- Relationship mapping
- Communication preferences
- Role and responsibility tracking
- Interaction history

### Verification System
- Document upload and verification
- Automated compliance checking
- Trust badges and indicators
- Risk assessment and scoring
- Continuous monitoring

### List Management
- Preferred partner lists
- Blocked/restricted lists
- Custom groupings and tags
- Bulk operations and management
- Import/export capabilities

### Scorecards
- Performance metrics tracking
- Rating systems and reviews
- Historical trend analysis
- Comparative benchmarking
- Automated scoring algorithms
