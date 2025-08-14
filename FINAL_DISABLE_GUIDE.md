# 🚀 Final Extension Disable Guide

## **The Last Step: Disable GitHub Actions Extension**

Your workflows are clean and valid. The remaining warnings are **false positives** from the GitHub Actions VS Code extension.

### **Disable Extension (2 minutes)**

1. **Open Extensions** (Ctrl/Cmd + Shift + X)
2. **Search "GitHub Actions"** (publisher: GitHub)
3. **Click ⚙️ → Disable (Workspace)**
4. **Press Ctrl/Cmd + Shift + P → Developer: Reload Window**

### **Verify It Worked**

- Open **Problems panel** → enable the **Source** column
- You should **no longer see "GitHub Actions"** as a source
- All "Context access might be invalid" warnings should disappear

### **If Using WSL/Dev Container/SSH**

Repeat the disable steps inside that remote workspace too (extensions run separately).

### **Optional: Keep Linting Without Noise**

Install **actionlint** (extension or CLI) for reliable schema/expression checks.

## **Your Clean Pattern (Keep This)**

```yaml
# ✅ Single export step per job
- name: Export runtime envs
  run: |
    echo "APP_URL=${{ vars.APP_URL }}" >> $GITHUB_ENV
    echo "SUPABASE_URL=${{ secrets.PROD_SUPABASE_URL }}" >> $GITHUB_ENV

# ✅ Use $VARS in later steps
- name: Use variables
  run: |
    curl "$APP_URL/health"
```

## **Safety Checklist**

- [ ] **Problems panel** shows no "GitHub Actions" source
- [ ] **All workflows** use export script pattern
- [ ] **Hyphenated outputs** use bracket notation: `outputs['issue-url']`
- [ ] **No `${{ vars.* }}` or `${{ secrets.* }}`** in `env:`, `matrix:`, or `with:`

## **Re-enable Later (if needed)**

Extensions → "GitHub Actions" → ⚙️ → **Enable (Workspace)** → Reload Window

---

**That's it!** 🎯 Your YAML is valid, workflows are tidy, and once the extension is disabled, those false positives disappear forever. 🚀
