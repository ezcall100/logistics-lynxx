# Autonomous Agent Execution Brief

## Task: integrations.google_maps.v1

### MISSION OBJECTIVE
Implement production-grade Google Maps integration with hardened security, observability, and kill-switch capabilities.

### EXECUTION PARAMETERS

#### DO:
1. **Wire Environment Variables**: Single secret → map to `GOOGLE_MAPS_API_KEY` & `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
2. **Add Preflight Verification**: Implement `verify:google-maps` in CI before build
3. **Implement Client Components**: `MapsProvider` + demo page with graceful fallbacks
4. **Add Server Routes**: `/api/directions`, `/api/geocode` with proper error handling
5. **Security Hardening**: Lock keys in GCP (referrers/IP/API restrictions, quotas)
6. **Observability**: Add feature flag `maps.enabled`, OTEL spans, monitoring
7. **Canary Deployment**: 10% → 25% → 50% → 100% with rollback capability

#### DONE WHEN:
- ✅ Preflight passes in CI; demo renders; `/api/directions` returns 200
- ✅ Keys are restricted; dashboards show spans; kill-switch works
- ✅ Canary completes with p95 < 2.5s and no elevated error rate

### SECURITY REQUIREMENTS
- **Browser Key**: Restricted by HTTP referrers (`yourdomain.com`, `*.yourdomain.com`, `localhost:3000`)
- **Server Key**: Restricted by IP(s) and API scopes (Directions, Distance Matrix, Geocoding)
- **Feature Flag**: `maps.enabled` with graceful fallback to disable if costs/errors spike
- **Key Rotation**: Keep old+new valid during rollout; then delete old

### OBSERVABILITY REQUIREMENTS
- Emit OTEL spans around Maps loads & API calls (attach portal, org, route)
- Monitor usage anomalies and set billing alerts
- Implement kill-switch for cost/error spikes

### DEPLOYMENT STRATEGY
1. **Canary Rollout**: Ship to 10% of traffic with `maps.enabled='canary'`
2. **Monitoring**: Watch errors & p95 for 30–60 minutes
3. **Ramp Up**: 25% → 50% → 100% if green; otherwise flip kill-switch
4. **Rollback**: Immediate disable via feature flag if issues detected

### COMMON FAILURE MODES & FIXES
- `RefererNotAllowedMapError` → Update HTTP referrer restrictions
- `ApiNotActivatedMapError` → Enable exact API in Cloud Console
- `InvalidKeyMapError` → Key typo or missing env at build time
- `You must enable Billing` → Attach billing account to project

### AGENT AUTHORITY LEVEL
**FULL AUTHORITY** - Autonomous agents have complete control over:
- Environment variable configuration
- Security hardening implementation
- Feature flag management
- Canary deployment execution
- Rollback decisions based on monitoring data

### EXECUTION TIMELINE
- **Phase 1**: Environment setup and preflight verification (1-2 hours)
- **Phase 2**: Client implementation and server routes (2-3 hours)
- **Phase 3**: Security hardening and observability (1-2 hours)
- **Phase 4**: Canary deployment and monitoring (4-6 hours)

### SUCCESS METRICS
- Zero security vulnerabilities in Google Maps integration
- P95 response time < 2.5s for all Maps API calls
- Error rate < 0.1% for Maps-related operations
- Successful canary deployment with automatic rollback capability
- Cost monitoring and alerting in place

---

**AUTONOMOUS AGENT EXECUTION AUTHORIZED**
*This brief grants full operational authority to autonomous agents for Google Maps integration implementation and deployment.*
