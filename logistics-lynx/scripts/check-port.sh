#!/bin/bash

# Check if port 8080 is in use
echo "🔍 Checking if port 8080 is available..."

if lsof -i :8080 -sTCP:LISTEN -P -n > /dev/null 2>&1; then
  echo "❌ Port 8080 is already in use by:"
  lsof -i :8080 -sTCP:LISTEN -P -n
  echo ""
  echo "💡 To free up the port, you can:"
  echo "   - Kill the process using: kill -9 <PID>"
  echo "   - Or use a different port by setting PORT environment variable"
  exit 1
else
  echo "✅ Port 8080 is available"
  exit 0
fi
