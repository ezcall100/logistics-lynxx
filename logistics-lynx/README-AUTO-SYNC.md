# 🚀 Auto-Sync to GitHub Repository

This document explains how to automatically sync your local `logistics-lynx` project to the GitHub repository `ezcall100/logistics-lynxx`.

## 📋 Quick Start

### For Windows Users
```powershell
# Setup automatic sync (interactive)
npm run sync:setup:windows

# Manual sync
npm run sync:windows

# Remove auto-sync
npm run sync:remove
```

### For Linux/macOS Users
```bash
# Setup automatic sync (interactive)
npm run sync:setup

# Manual sync
npm run sync
```

## 🔧 Manual Sync Commands

### Git Commands (Universal)
```bash
# Add all changes
git add .

# Commit with timestamp
git commit -m "Auto-sync: $(date +'%Y-%m-%d %H:%M:%S') - Portal integration updates"

   # Push to GitHub
   git push origin feature/001-public-website-scaffold
```

### Using Scripts
```bash
# Linux/macOS
./scripts/sync-to-github.sh

# Windows PowerShell
powershell -ExecutionPolicy Bypass -File scripts/sync-to-github.ps1
```

## ⚙️ Automatic Sync Setup

### Windows (Task Scheduler)
1. **Interactive Setup:**
   ```powershell
   npm run sync:setup:windows
   ```

2. **Command Line Setup:**
   ```powershell
   # Hourly sync
   powershell -ExecutionPolicy Bypass -File scripts/setup-auto-sync.ps1 -Interval hourly
   
   # Daily sync
   powershell -ExecutionPolicy Bypass -File scripts/setup-auto-sync.ps1 -Interval daily
   
   # Every 15 minutes
   powershell -ExecutionPolicy Bypass -File scripts/setup-auto-sync.ps1 -Interval every-15-min
   ```

### Linux/macOS (Cron Jobs)
1. **Interactive Setup:**
   ```bash
   npm run sync:setup
   ```

2. **Manual Cron Setup:**
   ```bash
   # Edit crontab
   crontab -e
   
   # Add one of these lines:
   # Every 15 minutes
   */15 * * * * cd /path/to/logistics-lynx && ./scripts/sync-to-github.sh >> logs/auto-sync.log 2>&1
   
   # Hourly
   0 * * * * cd /path/to/logistics-lynx && ./scripts/sync-to-github.sh >> logs/auto-sync.log 2>&1
   
   # Daily at midnight
   0 0 * * * cd /path/to/logistics-lynx && ./scripts/sync-to-github.sh >> logs/auto-sync.log 2>&1
   ```

## 📊 Sync Intervals

| Interval | Cron Expression | Description |
|----------|----------------|-------------|
| Every 15 minutes | `*/15 * * * *` | Frequent updates |
| Every 30 minutes | `*/30 * * * *` | Moderate updates |
| Hourly | `0 * * * *` | Regular updates |
| Daily | `0 0 * * *` | Daily backup |
| Weekly | `0 0 * * 0` | Weekly backup |

## 🔍 Monitoring & Management

### View Sync Logs
```bash
# View recent logs
tail -f logs/auto-sync.log

# View last 50 lines
tail -50 logs/auto-sync.log

# Search for errors
grep "ERROR" logs/auto-sync.log
```

### Windows Task Management
```powershell
# View scheduled tasks
schtasks /query /tn "LogisticsLynxAutoSync"

# Remove auto-sync task
schtasks /delete /tn "LogisticsLynxAutoSync" /f

# View logs (PowerShell)
Get-Content "logs\auto-sync.log" -Tail 50
```

### Linux/macOS Cron Management
```bash
# View current cron jobs
crontab -l

# Edit cron jobs
crontab -e

# Remove all cron jobs
crontab -r
```

## 🛠️ Troubleshooting

### Common Issues

1. **Git not configured:**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

2. **Authentication issues:**
   ```bash
   # Use Personal Access Token or SSH key
   git remote set-url origin https://github.com/ezcall100/logistics-lynx.git
   ```

3. **Permission denied:**
   ```bash
   # Make scripts executable
   chmod +x scripts/sync-to-github.sh
   chmod +x scripts/setup-auto-sync.sh
   ```

4. **PowerShell execution policy:**
   ```powershell
   # Allow script execution
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Debug Mode
```bash
# Run with verbose output
bash -x scripts/sync-to-github.sh

# PowerShell debug
powershell -ExecutionPolicy Bypass -File scripts/sync-to-github.ps1 -Verbose
```

## 📁 File Structure

```
logistics-lynx/
├── scripts/
│   ├── sync-to-github.sh          # Linux/macOS sync script
│   ├── sync-to-github.ps1         # Windows sync script
│   ├── setup-auto-sync.sh         # Linux/macOS setup script
│   ├── setup-auto-sync.ps1        # Windows setup script
│   └── run-sync.ps1               # Windows task scheduler wrapper
├── logs/
│   └── auto-sync.log              # Sync operation logs
└── package.json                   # NPM scripts for easy access
```

## 🔐 Security Considerations

1. **Git Credentials:** Store your GitHub credentials securely
2. **File Permissions:** Ensure scripts have appropriate permissions
3. **Log Files:** Monitor log files for sensitive information
4. **Network Access:** Ensure your machine has internet access for GitHub

## 📈 Best Practices

1. **Regular Monitoring:** Check logs periodically
2. **Backup Strategy:** Don't rely solely on auto-sync for backups
3. **Conflict Resolution:** Handle merge conflicts manually
4. **Testing:** Test sync scripts before enabling auto-sync
5. **Documentation:** Keep this README updated

## 🆘 Support

If you encounter issues:

1. Check the logs: `tail -f logs/auto-sync.log`
2. Verify git configuration: `git config --list`
3. Test manual sync first: `npm run sync`
4. Check network connectivity to GitHub
5. Review this troubleshooting section

## 📝 Changelog

- **v1.0.0:** Initial auto-sync implementation
- Added support for Windows Task Scheduler
- Added support for Linux/macOS cron jobs
- Added comprehensive logging and error handling
- Added npm scripts for easy access
