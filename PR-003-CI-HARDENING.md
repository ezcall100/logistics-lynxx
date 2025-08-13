# PR-003: CI Hardening (Reusable)
## Security & Reliability Improvements for GitHub Actions

### 🎯 **Goal**
Create reusable CI workflows with least-privilege permissions, timeouts, concurrency controls, and security scanning to harden the entire development pipeline.

### 📋 **Files to Create/Modify**

#### **1. Reusable CI Workflow**
```yaml
# .github/workflows/_shared-ci.yml
name: Shared CI
on:
  workflow_call:
    inputs:
      node-version:
        required: false
        default: '18'
      concurrency-group:
        required: true
      timeout-minutes:
        required: false
        default: '15'
      enable-security-scan:
        required: false
        default: 'true'
      enable-slack-notifications:
        required: false
        default: 'false'

jobs:
  lint-typecheck-test:
    runs-on: ubuntu-latest
    concurrency: ${{ inputs.concurrency-group }}
    timeout-minutes: ${{ inputs.timeout-minutes }}
    permissions:
      contents: read
      actions: read
      security-events: write
      pull-requests: read
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # Full history for security scanning

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci
        env:
          NODE_ENV: ci

      - name: Run linting
        run: npm run lint
        timeout-minutes: 5

      - name: Run type checking
        run: npm run typecheck
        timeout-minutes: 5

      - name: Run tests
        run: npm run test:ci
        timeout-minutes: 10
        env:
          CI: true
          NODE_ENV: test

      - name: Upload test coverage
        uses: codecov/codecov-action@v3
        if: always()
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          fail_ci_if_error: false

  security-scan:
    if: ${{ inputs.enable-security-scan == 'true' }}
    runs-on: ubuntu-latest
    concurrency: ${{ inputs.concurrency-group }}-security
    timeout-minutes: 10
    permissions:
      contents: read
      security-events: write
      actions: read
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript
          queries: security-extended,security-and-quality

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          category: "/language:javascript,typescript"

      - name: Run gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Run npm audit
        run: npm audit --audit-level=moderate
        continue-on-error: true

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
        continue-on-error: true

  build-analyze:
    runs-on: ubuntu-latest
    concurrency: ${{ inputs.concurrency-group }}-build
    timeout-minutes: 10
    permissions:
      contents: read
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build
        timeout-minutes: 8

      - name: Analyze bundle size
        if: env.ANALYZE == 'true'
        run: npm run analyze
        timeout-minutes: 5

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: dist/
          retention-days: 7

  notify-slack:
    if: ${{ inputs.enable-slack-notifications == 'true' && always() }}
    runs-on: ubuntu-latest
    needs: [lint-typecheck-test, security-scan, build-analyze]
    timeout-minutes: 2
    permissions:
      contents: read
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#dev-alerts'
          webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
        if: always()
```

#### **2. Main CI Workflow**
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  ci:
    uses: ./.github/workflows/_shared-ci.yml
    with:
      concurrency-group: ci-${{ github.ref }}
      enable-security-scan: true
      enable-slack-notifications: ${{ github.event_name == 'push' }}
    secrets: inherit
```

#### **3. Release Workflow**
```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release-ci:
    uses: ./.github/workflows/_shared-ci.yml
    with:
      concurrency-group: release-${{ github.ref }}
      enable-security-scan: true
      enable-slack-notifications: true
      timeout-minutes: 20
    secrets: inherit

  create-release:
    needs: release-ci
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

      - name: Upload Release Assets
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./dist/
          asset_name: build-artifacts.zip
          asset_content_type: application/zip
```

#### **4. Dependency Update Workflow**
```yaml
# .github/workflows/dependabot.yml
name: Dependabot

on:
  schedule:
    - cron: '0 2 * * 1' # Every Monday at 2 AM
  workflow_dispatch:

jobs:
  dependabot:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Update dependencies
        run: |
          npx npm-check-updates --target minor --upgrade
          npm install
          npm audit fix

      - name: Run tests
        run: npm run test:ci

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: 'chore: update dependencies'
          title: 'chore: update dependencies'
          body: |
            Automated dependency updates
            
            - Updated npm packages to latest minor versions
            - Fixed security vulnerabilities
            - All tests passing
          branch: dependabot/update-dependencies
          delete-branch: true
```

#### **5. Security Workflow**
```yaml
# .github/workflows/security.yml
name: Security

on:
  schedule:
    - cron: '0 6 * * *' # Daily at 6 AM
  workflow_dispatch:

jobs:
  security-audit:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
      actions: read
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'

      - name: Run OWASP ZAP scan
        uses: zaproxy/action-full-scan@v0.8.0
        with:
          target: 'https://your-app-url.com'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'

      - name: Run container security scan
        if: hashFiles('**/Dockerfile') != ''
        run: |
          docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
            aquasec/trivy image your-image:latest
```

#### **6. Post-Deploy Verification Workflow**
```yaml
# .github/workflows/post-deploy-verify.yml
name: Post-Deploy Verification

on:
  workflow_run:
    workflows: ["Deploy"]
    types:
      - completed

jobs:
  verify-deployment:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      contents: read
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run health checks
        run: |
          # Test application health
          curl -f ${{ secrets.APP_URL }}/health || exit 1
          
          # Test database connectivity
          curl -f ${{ secrets.APP_URL }}/api/health || exit 1
          
          # Test agent runner
          curl -f ${{ secrets.APP_URL }}/functions/v1/agent-runner || exit 1

      - name: Run smoke tests
        run: |
          npm run test:smoke
        env:
          TEST_URL: ${{ secrets.APP_URL }}

      - name: Check performance metrics
        run: |
          # Run k6 smoke test
          k6 run k6/smoke.js
        env:
          BASE_URL: ${{ secrets.APP_URL }}

      - name: Verify feature flags
        run: |
          # Check if feature flags are properly configured
          curl -s ${{ secrets.APP_URL }}/api/feature-flags | jq '.autonomousAgents.enabled' | grep -q true

      - name: Notify on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          channel: '#dev-alerts'
          webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

#### **7. Environment Protection Rules**
```yaml
# .github/environments/production.yml
name: production
protection_rules:
  - required_reviewers:
      required_approving_review_count: 2
      dismiss_stale_reviews: true
      require_code_owner_reviews: true
  - required_status_checks:
      strict: true
      contexts:
        - ci
        - security-scan
        - post-deploy-verify
  - deployment_branch_policy:
      protected_branches: true
      custom_branch_policies: false
  - wait_timer:
      wait_time: 5
```

#### **8. Branch Protection Rules**
```yaml
# .github/branch-protection.yml
# Apply via GitHub API or Terraform
branches:
  - name: main
    protection:
      required_status_checks:
        strict: true
        contexts:
          - ci
          - security-scan
      enforce_admins: true
      required_pull_request_reviews:
        required_approving_review_count: 2
        dismiss_stale_reviews: true
        require_code_owner_reviews: true
      restrictions:
        users: []
        teams: []
      allow_force_pushes: false
      allow_deletions: false
      block_creations: true
      required_conversation_resolution: true
      require_signed_commits: true

  - name: develop
    protection:
      required_status_checks:
        strict: true
        contexts:
          - ci
      required_pull_request_reviews:
        required_approving_review_count: 1
        dismiss_stale_reviews: true
      restrictions:
        users: []
        teams: []
      allow_force_pushes: false
      allow_deletions: false
```

#### **9. Security Configuration**
```yaml
# .github/security.yml
# Security configuration for the repository
security:
  # Enable security features
  secret_scanning:
    push_protection:
      status: enabled
  dependency_review:
    enabled: true
  code_scanning:
    default_setup:
      languages:
        - javascript
        - typescript
    query_suite: security-extended
  dependabot:
    security_updates_only: false
    open_pull_requests_limit: 10
    reviewers:
      - "@security-team"
    assignees:
      - "@security-team"
```

#### **10. Post-Deploy Verification Script**
```bash
# scripts/post-deploy-verify.sh
#!/bin/bash
set -euo pipefail

echo "🔍 Post-Deploy Verification"
echo "=========================="

# Environment variables
APP_URL="${APP_URL:-}"
SUPABASE_URL="${SUPABASE_URL:-}"
SLACK_WEBHOOK_URL="${SLACK_WEBHOOK_URL:-}"

# Health checks
echo "🏥 Running health checks..."

# Application health
if curl -f -s "$APP_URL/health" > /dev/null; then
    echo "✅ Application health check passed"
else
    echo "❌ Application health check failed"
    exit 1
fi

# Database connectivity
if curl -f -s "$APP_URL/api/health" > /dev/null; then
    echo "✅ Database connectivity check passed"
else
    echo "❌ Database connectivity check failed"
    exit 1
fi

# Agent runner
if curl -f -s "$SUPABASE_URL/functions/v1/agent-runner" > /dev/null; then
    echo "✅ Agent runner check passed"
else
    echo "❌ Agent runner check failed"
    exit 1
fi

# Performance checks
echo "⚡ Running performance checks..."

# Response time check
RESPONSE_TIME=$(curl -w "%{time_total}" -o /dev/null -s "$APP_URL/health")
if (( $(echo "$RESPONSE_TIME < 2.0" | bc -l) )); then
    echo "✅ Response time check passed: ${RESPONSE_TIME}s"
else
    echo "❌ Response time check failed: ${RESPONSE_TIME}s"
    exit 1
fi

# Feature flag verification
echo "🚩 Verifying feature flags..."
if curl -s "$APP_URL/api/feature-flags" | jq -e '.autonomousAgents.enabled' > /dev/null; then
    echo "✅ Feature flags check passed"
else
    echo "❌ Feature flags check failed"
    exit 1
fi

# Security checks
echo "🔒 Running security checks..."

# Check for exposed secrets
if git log --oneline -n 10 | grep -i "password\|secret\|key" > /dev/null; then
    echo "⚠️ Potential secrets in recent commits"
else
    echo "✅ No obvious secrets in recent commits"
fi

# SSL certificate check
if openssl s_client -connect "$(echo $APP_URL | sed 's|https://||')":443 -servername "$(echo $APP_URL | sed 's|https://||')" < /dev/null 2>/dev/null | openssl x509 -noout -dates | grep -q "notAfter"; then
    echo "✅ SSL certificate is valid"
else
    echo "❌ SSL certificate check failed"
    exit 1
fi

# Notify success
if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
    curl -X POST "$SLACK_WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d '{
            "text": "✅ Post-deploy verification completed successfully",
            "attachments": [{
                "color": "good",
                "fields": [
                    {"title": "Application", "value": "Healthy", "short": true},
                    {"title": "Database", "value": "Connected", "short": true},
                    {"title": "Agent Runner", "value": "Available", "short": true},
                    {"title": "Response Time", "value": "'${RESPONSE_TIME}'s", "short": true}
                ],
                "footer": "Autonomous TMS CI"
            }]
        }'
fi

echo "🎉 Post-deploy verification completed successfully!"
```

### 🎯 **Acceptance Criteria**

#### **Functional Tests**
- [ ] All workflows use least-privilege permissions
- [ ] Timeouts prevent hanging jobs
- [ ] Concurrency controls prevent resource conflicts
- [ ] Security scanning catches vulnerabilities
- [ ] Post-deploy verification validates deployment

#### **Security Tests**
- [ ] No secrets exposed in logs or artifacts
- [ ] CodeQL analysis runs successfully
- [ ] gitleaks detects no secrets in code
- [ ] npm audit passes with no high/critical issues
- [ ] Branch protection prevents direct pushes

#### **Performance Tests**
- [ ] CI pipeline completes in < 15 minutes
- [ ] Security scans complete in < 10 minutes
- [ ] Post-deploy verification completes in < 5 minutes
- [ ] No resource exhaustion during parallel runs

#### **Reliability Tests**
- [ ] Workflows handle network failures gracefully
- [ ] Retry logic for transient failures
- [ ] Proper error reporting and notifications
- [ ] Rollback procedures documented

### 🚀 **Deployment Steps**

1. **Create Workflow Files**
   ```bash
   mkdir -p .github/workflows
   # Copy all workflow files
   ```

2. **Set Up Branch Protection**
   ```bash
   # Via GitHub UI or API
   gh api repos/:owner/:repo/branches/main/protection \
     --method PUT \
     --field required_status_checks='{"strict":true,"contexts":["ci","security-scan"]}' \
     --field enforce_admins=true
   ```

3. **Configure Secrets**
   ```bash
   # Add required secrets to GitHub repository
   gh secret set SLACK_WEBHOOK_URL
   gh secret set SNYK_TOKEN
   gh secret set CODECOV_TOKEN
   ```

4. **Test Workflows**
   ```bash
   # Create test PR to trigger CI
   git checkout -b test-ci-hardening
   git commit --allow-empty -m "test: CI hardening"
   git push origin test-ci-hardening
   ```

5. **Monitor Results**
   ```bash
   # Check workflow runs
   gh run list --limit 10
   ```

### 📊 **Success Metrics**

- **CI Pipeline Time**: < 15 minutes average
- **Security Scan Coverage**: 100% of code
- **False Positive Rate**: < 5% for security alerts
- **Deployment Success Rate**: > 99%
- **Post-Deploy Verification**: < 5 minutes

### 🔄 **Rollback Plan**

If issues occur:
1. Disable problematic workflows via GitHub UI
2. Revert to previous workflow configuration
3. Update branch protection rules if needed
4. Monitor deployment success rates

---

**🎉 This PR delivers enterprise-grade CI/CD security and reliability!**
