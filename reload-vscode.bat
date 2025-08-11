@echo off
echo 🔄 Reloading VS Code to apply YAML warning suppression...
echo.

echo 📋 YAML warning suppression settings applied:
echo    ✅ yaml.validate: false
echo    ✅ yaml.disableContextAccess: true
echo    ✅ yaml.disableDefaultProperties: true
echo    ✅ yaml.disableAdditionalProperties: true
echo    ✅ All YAML validation disabled
echo.

echo 🚀 To reload VS Code:
echo    1. Press Ctrl+Shift+P
echo    2. Type "Developer: Reload Window"
echo    3. Press Enter
echo.

echo 📁 Or open the workspace file:
echo    File → Open Workspace → .vscode/tms.code-workspace
echo.

echo ✅ YAML warnings for GitHub Actions should now be suppressed!
echo.

pause
