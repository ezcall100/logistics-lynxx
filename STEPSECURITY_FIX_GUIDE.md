# 🔧 StepSecurity Configuration Fix Guide

## 🚨 Issue Identified

From the StepSecurity logs, I can see the specific problem:

- ✅ `git-remote-http` to `github.com:443` is **ALLOWED**
- ❌ `node` to `api.github.com:443` is **BLOCKED**

This indicates that StepSecurity is blocking legitimate API calls to GitHub's API, which is causing workflow failures.

## 🔍 Root Cause

The StepSecurity configuration is missing essential endpoints that CodeQL and other GitHub Actions need to function properly.

## 🛠️ Immediate Fixes

### Fix 1: Updated CodeQL Workflow
I've updated `.github/workflows/codeql.yml` with additional required endpoints:

```yaml
allowed-endpoints: |
  github.com:443
  api.github.com:443
  *.githubusercontent.com:443
  *.github.com:443
  registry.npmjs.org:443
  raw.githubusercontent.com:443
  objects.githubusercontent.com:443
  codeload.github.com:443
```

### Fix 2: Test Without Hardening
I've created `.github/workflows/codeql-no-hardening.yml` to test if StepSecurity is the issue.

## 🚀 Immediate Actions

### Step 1: Test the Fixed Workflow
1. **Go to Actions tab**
2. **Select "CodeQL" workflow**
3. **Click "Run workflow"**
4. **Check if it completes successfully**

### Step 2: Test Without Hardening
1. **Go to Actions tab**
2. **Select "CodeQL (No Hardening)" workflow**
3. **Click "Run workflow"**
4. **Compare results**

### Step 3: Apply Fixes to Other Workflows
If the fixes work, apply similar endpoint configurations to other workflows.

## 📋 Required Endpoints for GitHub Actions

### Essential GitHub Endpoints
```
github.com:443
api.github.com:443
*.githubusercontent.com:443
*.github.com:443
```

### Additional Required Endpoints
```
registry.npmjs.org:443
raw.githubusercontent.com:443
objects.githubusercontent.com:443
codeload.github.com:443
```

### For CodeQL Specifically
```
api.github.com:443
objects.githubusercontent.com:443
codeload.github.com:443
```

## 🔧 StepSecurity Configuration Template

Use this template for all workflows:

```yaml
- name: 🛡️ Harden Runner
  uses: step-security/harden-runner@v2
  with:
    allowed-endpoints: |
      github.com:443
      api.github.com:443
      *.githubusercontent.com:443
      *.github.com:443
      registry.npmjs.org:443
      raw.githubusercontent.com:443
      objects.githubusercontent.com:443
      codeload.github.com:443
```

## 🎯 Expected Results

### If Fixed Workflow Passes:
- ✅ StepSecurity configuration was the issue
- ✅ Apply similar fixes to other workflows
- ✅ Development can continue with proper hardening

### If No-Hardening Workflow Passes:
- ✅ StepSecurity is blocking legitimate access
- ✅ Use the updated endpoint configuration
- ✅ Consider temporarily disabling hardening for development

### If Both Workflows Fail:
- ❌ There's a deeper network connectivity issue
- ❌ Check GitHub status and network configuration
- ❌ Contact GitHub support

## 📊 Troubleshooting Steps

### 1. Check StepSecurity Logs
Look for blocked endpoints in the workflow logs:
- Identify which endpoints are being blocked
- Add missing endpoints to configuration
- Test again

### 2. Gradual Hardening
1. Start with no hardening
2. Add essential endpoints
3. Test functionality
4. Add additional endpoints as needed

### 3. Monitor Network Activity
Use StepSecurity's network monitoring to:
- Identify required endpoints
- Remove unnecessary endpoints
- Optimize configuration

## 🆘 Emergency Workarounds

### Option 1: Disable StepSecurity Temporarily
```yaml
# Comment out the hardening step
# - name: 🛡️ Harden Runner
#   uses: step-security/harden-runner@v2
```

### Option 2: Use Minimal Hardening
```yaml
- name: 🛡️ Harden Runner
  uses: step-security/harden-runner@v2
  with:
    allowed-endpoints: |
      github.com:443
      api.github.com:443
```

### Option 3: Use Different Runner
```yaml
runs-on: windows-latest  # or macos-latest
```

## 📞 Support Resources

- **StepSecurity Documentation:** https://www.stepsecurity.io/
- **GitHub Actions Network:** https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#network
- **CodeQL Documentation:** https://docs.github.com/en/code-security/code-scanning

## 🎯 Success Criteria

You'll know the issue is resolved when:
- [ ] CodeQL workflow completes successfully
- [ ] No network connectivity errors
- [ ] All required endpoints are accessible
- [ ] StepSecurity provides proper protection

---

**Priority:** HIGH - Blocking CI/CD operations
**Impact:** Workflow failures due to network restrictions
**Next Action:** Test the updated CodeQL workflow
