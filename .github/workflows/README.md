# GitHub Actions Workflows

This directory contains GitHub Actions workflow files for the Autonomous TMS system.

## False Positive Warnings

**IMPORTANT**: The "Context access might be invalid" warnings you may see in your IDE are **FALSE POSITIVES**.

### What's Happening

The YAML language server incorrectly flags GitHub Actions syntax as invalid:
- `${{ secrets.SECRET_NAME }}` - This is **correct** GitHub Actions syntax
- `${{ env.VARIABLE_NAME }}` - This is **correct** GitHub Actions syntax
- `${{ github.sha }}` - This is **correct** GitHub Actions syntax

### Why This Happens

The YAML language server doesn't understand GitHub Actions context expressions and treats them as invalid YAML syntax. This is a known limitation of the YAML language server.

### What You Should Do

1. **Ignore these warnings** - They are false positives
2. **The workflows will execute correctly** - GitHub Actions understands this syntax
3. **These warnings don't affect functionality** - Your CI/CD pipeline will work as expected

### Valid GitHub Actions Syntax

All of these are valid and will work correctly:

```yaml
env:
  SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
  N8N_API_KEY: ${{ secrets.N8N_API_KEY || '' }}
  NODE_VERSION: ${{ env.NODE_VERSION }}
  COMMIT_SHA: ${{ github.sha }}
```

### References

- [GitHub Actions Context and expression syntax](https://docs.github.com/en/actions/learn-github-actions/contexts)
- [GitHub Actions Workflow syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
