# Git Connectivity Troubleshooting Guide

## 🚨 Current Issue: Git Exit Code 128

You're experiencing Git connectivity failures with exit code 128, which typically indicates network connectivity problems.

## 🔍 Diagnostic Workflows Created

I've created two diagnostic workflows to help identify the root cause:

### 1. Network Diagnostic Workflow
**File:** `.github/workflows/network-diagnostic.yml`
- Tests DNS resolution
- Tests basic network connectivity
- Tests Git operations
- Tests StepSecurity permissions
- Collects environment information

### 2. Simple Test Workflow
**File:** `.github/workflows/simple-test.yml`
- Tests Git operations without StepSecurity hardening
- Isolates whether the issue is with hardening or general connectivity

## 🚀 Immediate Actions

### Step 1: Run Diagnostic Workflows

1. **Run Network Diagnostic:**
   - Go to your GitHub repository → Actions
   - Select "🔍 Network Diagnostic"
   - Click "Run workflow"

2. **Run Simple Test:**
   - Select "🧪 Simple Test (No Hardening)"
   - Click "Run workflow"

### Step 2: Check Results

**If Simple Test passes but other workflows fail:**
- The issue is with StepSecurity hardening configuration
- Solution: Use simplified workflows for development

**If both workflows fail:**
- The issue is with general network connectivity
- Check GitHub status and repository access

## 🔧 Common Causes & Solutions

### 1. StepSecurity Hardening Issues

**Problem:** StepSecurity is blocking legitimate Git operations
**Solution:** Modify hardening configuration

```yaml
# In your workflow files, update StepSecurity configuration:
- name: 🔒 Harden runner
  uses: step-security/harden-runner@v2
  with:
    egress-policy: block
    allowed-endpoints: |
      github.com:443
      api.github.com:443
      *.githubusercontent.com:443
      *.github.com:443
      registry.npmjs.org:443
      raw.githubusercontent.com:443
```

### 2. Repository Access Issues

**Problem:** Repository permissions or access restrictions
**Solutions:**
- Verify repository is public or you have proper access
- Check if repository is archived or disabled
- Ensure GitHub Actions are enabled for the repository

### 3. GitHub Status Issues

**Problem:** GitHub.com experiencing outages
**Solution:** Check https://www.githubstatus.com/

### 4. Network/Firewall Issues

**Problem:** Corporate firewall or network restrictions
**Solutions:**
- Try different runner types (ubuntu-latest vs self-hosted)
- Check if your organization blocks GitHub access
- Contact your network administrator

## 🛠️ Quick Fixes

### Option 1: Disable StepSecurity Temporarily

For development/testing, you can temporarily disable StepSecurity:

```yaml
# Comment out or remove this step:
# - name: 🔒 Harden runner
#   uses: step-security/harden-runner@v2
```

### Option 2: Use Simplified Workflows

Use the simplified test workflow as a template for your development workflows.

### Option 3: Update Network Permissions

If using StepSecurity, ensure all required endpoints are allowed:

```yaml
allowed-endpoints: |
  github.com:443
  api.github.com:443
  *.githubusercontent.com:443
  *.github.com:443
  registry.npmjs.org:443
  raw.githubusercontent.com:443
  registry.npmjs.org:443
```

## 📋 Troubleshooting Checklist

- [ ] Run network diagnostic workflow
- [ ] Run simple test workflow
- [ ] Check GitHub status page
- [ ] Verify repository access and permissions
- [ ] Test with different runner types
- [ ] Check organization network policies
- [ ] Review StepSecurity configuration
- [ ] Try workflows without hardening

## 🆘 Emergency Workarounds

### For Immediate Development:

1. **Use Local Development:**
   ```bash
   git clone https://github.com/your-username/logistics-lynx.git
   cd logistics-lynx
   npm install
   npm run dev
   ```

2. **Use Simplified Workflows:**
   - Copy the simple test workflow structure
   - Remove StepSecurity hardening
   - Add your specific steps

3. **Use Alternative CI/CD:**
   - Consider using GitHub Codespaces
   - Use local development with act
   - Use alternative CI/CD platforms temporarily

## 📞 Support Resources

- **GitHub Status:** https://www.githubstatus.com/
- **GitHub Support:** https://support.github.com/
- **StepSecurity Documentation:** https://www.stepsecurity.io/
- **GitHub Actions Documentation:** https://docs.github.com/en/actions

## 🎯 Next Steps

1. **Run the diagnostic workflows** to identify the root cause
2. **Check the results** and apply the appropriate fix
3. **Test with simplified workflows** if hardening is the issue
4. **Gradually re-enable hardening** once connectivity is confirmed
5. **Update your production workflows** with the working configuration

---

**Status:** 🔍 Diagnostic workflows created
**Next Action:** Run diagnostic workflows to identify root cause
**Priority:** High - Network connectivity is blocking all workflows
