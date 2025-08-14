# Manual GitHub Actions Extension Disable Guide

Since the automatic configuration isn't working, please follow these manual steps:

## Step 1: Disable GitHub Actions Extension Manually

1. **Open Extensions Panel**
   - Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
   - Or go to View → Extensions

2. **Find GitHub Actions Extension**
   - Search for "GitHub Actions" in the extensions search box
   - Look for the extension by "GitHub" (publisher)
   - It should show as "GitHub Actions" with GitHub as the publisher

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

## Alternative: Disable Validation Setting Only

If you want to keep the extension but disable its validation:

1. **Open Extensions Panel**
   - Press `Ctrl+Shift+X`

2. **Find GitHub Actions Extension**
   - Search for "GitHub Actions"

3. **Open Extension Settings**
   - Click the gear icon (⚙️) next to the extension
   - Select "Extension Settings"

4. **Disable Validation**
   - Search for "validate" in the settings
   - Set "GitHub Actions: Validate" to false
   - Set "GitHub Actions: Validate Enable" to false

5. **Reload Window**
   - Press `Ctrl+Shift+P` → "Developer: Reload Window"

## Troubleshooting

### If warnings persist:

1. **Check Extension Status**
   - Press `Ctrl+Shift+P` → "Developer: Show Running Extensions"
   - Look for "GitHub Actions" - it should show as "Disabled (Workspace)"

2. **Check Problems Panel**
   - Open Problems panel (`Ctrl+Shift+M`)
   - Look at the "Source" column
   - If it says "GitHub Actions", the extension is still active

3. **Force Disable**
   - If the extension won't disable, try:
     - Close VS Code/Cursor completely
     - Reopen the project
     - Try disabling again

### If you want to disable globally:

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

## Quick Checklist

- [ ] Found GitHub Actions extension in Extensions panel
- [ ] Clicked gear icon (⚙️) next to the extension
- [ ] Selected "Disable (Workspace)"
- [ ] Reloaded window (`Ctrl+Shift+P` → "Developer: Reload Window")
- [ ] Opened a workflow file to verify warnings are gone
- [ ] Checked Problems panel - no more "GitHub Actions" source warnings
