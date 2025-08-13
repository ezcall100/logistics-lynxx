# Rates Portal

## Overview
The Rates Portal is a first-class portal in the TMS system designed for instant rating, contract management, margin strategy, and quote-to-book workflows.

## Audience
- Shippers
- Brokers  
- Carriers
- Customers

## Key Use Cases
1. **Instant Quotes (Spot)**: Real-time rate calculation for immediate load booking
2. **Contract Rates**: Long-term rate management and negotiation
3. **Margin Strategy**: Profit margin optimization and analysis
4. **Quote Lifecycle**: End-to-end quote management from creation to booking
5. **Analytics**: Rate performance and market intelligence
6. **Bulk Rating**: Batch rate calculations for multiple loads

## Core Pages
- **Rate Console**: Main dashboard for rate management
- **Quotes**: Quote creation, management, and tracking
- **Contracts**: Contract rate management and negotiation
- **Fuel & Accessorials**: Fuel surcharge and accessorial rate management
- **Lane Intelligence**: Market analysis and rate optimization

## Data Model
### Core Tables
- `rates_contracts`: Contract rate definitions
- `rates_contract_lanes`: Lane-specific contract rates
- `rates_spot_history`: Historical spot rate data
- `fuel_index`: Fuel price indices
- `fuel_formulas`: Fuel surcharge calculation formulas
- `accessorials`: Accessorial rate definitions
- `quotes`: Quote records
- `quote_versions`: Quote version history

## APIs
- `POST /rate/quote`: Create new quote
- `POST /rate/bulk`: Bulk rate calculation
- `POST /contract/:id/publish`: Publish contract rates
- `POST /quote/:id/send`: Send quote to customer

## Webhooks
- `quote accepted` → create Load

## AI Enhancements
- **Predictive Pricing Model**: ML-based rate prediction
- **Guardrails**: Rate validation and compliance checks
- **Explainability**: Transparent rate calculation explanations

## KPIs / SLAs
- P95 rate response time: < 2 seconds
- Quote→Book conversion rate: > 25%
- Contract rate variance: < 5%

## Security
- All tables scoped by `company_id` using `is_company_member(company_id)`
- Role-based access control (RBAC)
- Audit logging for all rate changes

## Integration Points
- Unified Dashboard
- Load Management Portal
- Financial Portal
- Directory Portal (for carrier/shipper data)
- Autonomous Agents (for automated rate optimization)
