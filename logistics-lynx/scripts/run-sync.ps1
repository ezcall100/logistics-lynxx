# Windows Task Scheduler wrapper for auto-sync
Set-Location "C:\Users\reply\OneDrive\Desktop\New TMS software\New-TMS-software\logistics-lynx"
& "C:\Users\reply\OneDrive\Desktop\New TMS software\New-TMS-software\logistics-lynx\scripts\sync-to-github.ps1" | Tee-Object -FilePath "C:\Users\reply\OneDrive\Desktop\New TMS software\New-TMS-software\logistics-lynx\logs\auto-sync.log" -Append
