@echo off
REM Windows Task Scheduler wrapper for auto-sync
cd /d "%~dp0.."
powershell.exe -ExecutionPolicy Bypass -File "logistics-lynx\scripts\sync-to-github.ps1" >> "logistics-lynx\logs\auto-sync.log" 2>&1
