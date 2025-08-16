---
title: Pricing Domain — Business Logic
version: 1.0.0
owner: pricing@transbot.ai
visibility: agents,human-ops
scope: domain
ttl_days: 60
last_validated: 2025-08-15
---

## Rate Calculation

**Base Rate**: Distance × Rate per mile + Accessorials

**Dynamic Factors**:
- Fuel surcharge (weekly adjustment)
- Capacity constraints (real-time)
- Seasonal multipliers
- Carrier availability

**Accessorials**:
- Liftgate: $75-150
- Residential: $25-50
- Inside delivery: $50-100
- Appointment: $25-75

## Rate Sources

1. **Contract Rates**: Pre-negotiated with carriers
2. **Spot Market**: Real-time capacity pricing
3. **Historical**: ML-based predictions
4. **External APIs**: DAT, Truckstop, etc.

## Success Criteria

- Rate accuracy ≥ 95%
- Quote response < 2s
- Coverage ≥ 85% of lanes
