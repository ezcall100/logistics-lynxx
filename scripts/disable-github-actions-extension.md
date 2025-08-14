# Manual GitHub Actions Extension Disable Guide

Since the automatic configuration isn't working, please follow these manual steps:

## Step 1: Disable GitHub Actions Extension Manually

1. **Open Extensions Panel**
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
   - Or go to View → Extensions

2. **Find GitHub Actions Extension**
   - Search for "GitHub Actions" in the extensions search box
   - Look for the extension by "GitHub" (publisher)

3. **Disable for Workspace**
   - Click the gear icon (⚙️) next to the GitHub Actions extension
   - Select "Disable (Workspace)"
   - This will disable it only for this project, not globally

## Step 2: Reload Window

1. **Reload VS Code/Cursor**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type "Developer: Reload Window"
   - Press Enter

## Step 3: Verify

1. **Check if warnings are gone**
   - Open any `.github/workflows/*.yml` file
   - The "Context access might be invalid" warnings should be gone

## Alternative: Disable Globally (if needed)

If you want to disable it globally:

1. Follow steps 1-2 above
2. Instead of "Disable (Workspace)", select "Disable"
3. This will disable it for all projects

## Re-enable (if needed later)

To re-enable the extension:

1. Go to Extensions panel
2. Find GitHub Actions extension
3. Click "Enable" or "Enable (Workspace)"

## Why This Works

The GitHub Actions extension has its own language server that generates these false positive warnings. Disabling the extension completely removes this validation layer while keeping your workflows functional.

Your workflows will still run correctly in GitHub Actions - this only affects the editor experience.
