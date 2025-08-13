#!/usr/bin/env node

/**
 * 📝 Create DR Drill Issue Script
 * Generates DR drill issue content for GitHub Actions
 */

const fs = require('fs');

function createDRIssueBody(environment) {
  const date = new Date().toISOString().split('T')[0];
  
  return `# 🔄 Disaster Recovery Drill - ${environment.toUpperCase()}

## 📅 Drill Information
- **Date**: ${date}
- **Environment**: ${environment}
- **Type**: Weekly DR Drill
- **Created by**: GitHub Actions

## 🎯 Drill Objectives
- [ ] Verify backup integrity
- [ ] Test restore procedures
- [ ] Validate RTO (Recovery Time Objective) < 15 minutes
- [ ] Confirm data consistency after restore
- [ ] Test rollback procedures
- [ ] Verify monitoring and alerting post-restore

## 📋 Pre-Drill Checklist
- [ ] Notify team members of scheduled drill
- [ ] Ensure backup snapshots are available
- [ ] Verify restore scripts are up to date
- [ ] Check monitoring dashboards are accessible
- [ ] Confirm rollback procedures are documented

## 🔧 Drill Steps

### Phase 1: Backup Verification
- [ ] Verify latest backup snapshot exists
- [ ] Check backup integrity (checksums)
- [ ] Validate backup retention policy
- [ ] Confirm backup is accessible

### Phase 2: Restore Testing
- [ ] Create test environment from backup
- [ ] Verify database schema integrity
- [ ] Test application connectivity
- [ ] Validate data consistency
- [ ] Check edge functions are operational
- [ ] Verify n8n workflows are functional

### Phase 3: Performance Testing
- [ ] Measure restore time (target: < 15 minutes)
- [ ] Test application performance post-restore
- [ ] Verify all integrations are working
- [ ] Check monitoring and alerting systems

### Phase 4: Rollback Testing
- [ ] Test rollback to previous version
- [ ] Verify rollback procedures work correctly
- [ ] Confirm no data loss during rollback
- [ ] Test rollback time (target: < 5 minutes)

## 📊 Success Criteria
- [ ] RTO < 15 minutes
- [ ] RPO (Recovery Point Objective) < 1 hour
- [ ] All services operational post-restore
- [ ] No data corruption or loss
- [ ] Monitoring systems functional
- [ ] Rollback procedures verified

## 🚨 Abort Conditions
- [ ] Restore time exceeds 30 minutes
- [ ] Data corruption detected
- [ ] Critical services not operational
- [ ] Security vulnerabilities introduced
- [ ] Team member unavailable for oversight

## 📈 Post-Drill Activities
- [ ] Document lessons learned
- [ ] Update procedures if needed
- [ ] Schedule follow-up actions
- [ ] Update runbooks
- [ ] Share results with team

## 🔗 Related Resources
- [DR Procedures](PHASE_3_GO_LIVE.md#rollback-plan)
- [Backup Configuration](deploy-phase3.sh)
- [Monitoring Dashboards](https://app.transbotai.com/monitoring)
- [Emergency Contacts](PHASE_3_GO_LIVE.md#emergency-contacts)

## 📝 Notes
- This drill should be completed within 2 hours
- All team members should be available during the drill
- Document any issues or improvements needed
- Update this checklist based on findings

---
*This issue was automatically created by GitHub Actions for weekly DR drill compliance.*`;
}

// Main execution
if (require.main === module) {
  const environment = process.argv[2] || 'staging';
  const issueBody = createDRIssueBody(environment);
  
  // Write to file for GitHub Actions to read
  fs.writeFileSync('dr-issue-body.md', issueBody);
  console.log(`DR issue body created for environment: ${environment}`);
}

module.exports = { createDRIssueBody };
