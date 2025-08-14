# Stop "Context access might be invalid" Warnings (Workspace Only)

These warnings are editor-side false positives from the GitHub Actions extension. CI is fine.

## Disable the validator for this workspace

1) Open **Extensions** (Ctrl/Cmd + Shift + X)  
2) Search **"GitHub Actions"** (publisher: **GitHub**)  
3) Click **⚙️** → **Disable (Workspace)**  
4) **Reload Window** (Ctrl/Cmd + Shift + P → *Developer: Reload Window*)

## Verify

- Open **Problems** panel → enable the **Source** column  
- "**GitHub Actions**" should no longer appear as a source  
- (If using **WSL / Dev Container / SSH**): open that remote window and repeat the disable

## Optional linting (quiet & accurate)

- Use **actionlint** (extension or CLI) for workflow checks without false positives

## Quick sanity checklist (for completeness)

- [ ] Hyphenated outputs use bracket notation: `steps.create_issue.outputs['issue-url']`
- [ ] No `${{ vars.* }}` or `${{ secrets.* }}` in `env:`, `matrix:`, or `with:`; everything is exported once via your script/`$GITHUB_ENV`, then referenced as `$APP_URL`, `$SUPABASE_URL`, etc.
- [ ] Problems panel "Source" shows nothing from GitHub Actions after disabling

---

**That's it—the codebase is clean, CI will run exactly as intended, and once you toggle that one workspace setting the editor will be blissfully quiet.** 🚀
