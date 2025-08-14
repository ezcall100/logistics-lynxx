# 🔒 Workflow Guardrails

This document describes the guardrails we've implemented to maintain clean GitHub Actions workflow patterns and prevent regressions.

## 🎯 Why These Guardrails?

Our workflows use a specific pattern to avoid "Context access might be invalid" warnings:

1. **No `${{ vars.* }}` or `${{ secrets.* }}` in YAML mappings** (`env:`, `matrix:`, `with:`)
2. **Export context expressions to `$GITHUB_ENV` in `run:` blocks**
3. **Use bracket notation for hyphenated outputs** (`outputs['issue-url']`)

## 🛡️ Guardrail Components

### 1. **CI Validation** (`.github/workflows/workflow-lint.yml`)

**What it does:**
- Runs `actionlint` on all workflow files in PRs
- Catches real syntax errors without false positives
- Respects our export pattern

**When it runs:**
- On pull requests that modify `.github/workflows/*.yml`
- On pushes to `main` and `develop` branches

**Benefits:**
- ✅ Catches real syntax errors
- ✅ No false positives about context access
- ✅ Validates expressions properly
- ✅ CI-friendly validation

### 2. **Pre-commit Hooks** (`.pre-commit-config.yaml`)

**What it does:**
- Runs `actionlint` locally before commits
- Catches issues before they reach CI
- Includes general YAML/JSON validation

**Setup:**
```bash
# Install pre-commit
pipx install pre-commit  # or pip install --user pre-commit

# Install hooks
pre-commit install
```

**Benefits:**
- ✅ Catch issues locally
- ✅ Faster feedback loop
- ✅ Prevents bad commits

### 3. **Verification Script** (`scripts/verify-workflow-patterns.sh`)

**What it does:**
- Scans all workflow files for pattern violations
- Checks for context expressions in YAML mappings
- Verifies hyphenated output usage
- Reports export script usage

**Usage:**
```bash
# Run verification
./scripts/verify-workflow-patterns.sh

# Or with ripgrep directly
rg -n --glob ".github/workflows/*.yml" '^(?:\s*)(env|with|matrix):' -A 10 | rg '\${{\s*(vars|secrets)\.'
```

## 📋 Clean Pattern Reference

### ✅ **Correct Pattern:**

```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    env:
      # Placeholder values (will be overridden)
      APP_URL: 'http://localhost:8080'
      SUPABASE_URL: 'https://placeholder.supabase.co'
    
    steps:
      - name: Export Environment Variables
        run: |
          {
            echo "APP_URL=${{ vars.APP_URL || 'http://localhost:8080' }}"
            echo "SUPABASE_URL=${{ secrets.PROD_SUPABASE_URL }}"
          } >> "$GITHUB_ENV"
      
      - name: Use Variables
        run: |
          curl "$APP_URL/health"
      
      - name: Example Output
        id: example
        run: |
          echo "result=success" >> "$GITHUB_OUTPUT"
      
      - name: Use Output
        run: |
          echo "Result: ${{ steps.example.outputs['result'] }}"
```

### ❌ **Avoid These Patterns:**

```yaml
# ❌ Don't put context expressions in YAML mappings
env:
  APP_URL: ${{ vars.APP_URL }}  # This causes warnings
  SUPABASE_URL: ${{ secrets.SUPABASE_URL }}  # This causes warnings

# ❌ Don't use dot notation for hyphenated outputs
outputs:
  issue-url: ${{ steps.create-issue.outputs.issue-url }}  # Use bracket notation instead
```

### 🔧 **Optional: Zero-Noise Variant**

If you want to avoid the `|| ''` pattern entirely (though it's perfectly valid):

```yaml
# Optional: avoid `|| ''` (still valid either way)
- name: Export API_KEY safely
  run: |
    v="${{ secrets.API_KEY }}"   # expression allowed in run:
    if [ -n "$v" ]; then
      echo "API_KEY=$v" >> "$GITHUB_ENV"
    else
      echo "API_KEY=" >> "$GITHUB_ENV"
    fi
```

## 🔍 Manual Verification Commands

### Check for Context Expressions in Mappings:
```bash
rg -n --glob ".github/workflows/*.yml" '^(?:\s*)(env|with|matrix):' -A 10 | rg '\${{\s*(vars|secrets)\.'
```

### Check for Hyphenated Outputs:
```bash
rg -n --glob ".github/workflows/*.yml" 'outputs\.[^ ]*-[^ ]*' | grep -v "outputs\['"
```

### Check Context Expression Placement:
```bash
rg -n --glob ".github/workflows/*.yml" '\${{\s*(vars|secrets)\.'
```

## 🚀 Editor Setup

### Disable GitHub Actions Extension

To eliminate false positive warnings in your editor:

1. **Extensions** (Ctrl/Cmd + Shift + X)
2. **Search "GitHub Actions"** (publisher: GitHub)
3. **Click ⚙️ → Disable (Workspace)**
4. **Reload Window** (Ctrl/Cmd + Shift + P → "Developer: Reload Window")

### Alternative: Use actionlint Extension

If you want workflow validation without false positives:

1. Install **actionlint** extension (rhysd.vscode-actionlint)
2. Configure it to run on workflow files
3. Disable GitHub Actions extension

## 🎯 Benefits

- ✅ **Clean Problems panel** - No false positive warnings
- ✅ **Autonomous agent friendly** - Distraction-free environment
- ✅ **CI validation** - Catches real issues
- ✅ **Consistent patterns** - Maintainable workflows
- ✅ **Best practices** - Follows GitHub Actions recommendations

## 🔄 Maintenance

### Adding New Workflows

1. Follow the clean pattern above
2. Use the export script for context expressions
3. Use bracket notation for hyphenated outputs
4. Test with the verification script

### Updating Existing Workflows

1. Run the verification script to check for issues
2. Refactor any context expressions in YAML mappings
3. Update hyphenated outputs to use bracket notation
4. Test with actionlint

---

**🚀 Result:** Clean workflows, happy autonomous agents, and a distraction-free development environment!
