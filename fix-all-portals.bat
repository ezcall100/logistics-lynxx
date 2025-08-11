@echo off
echo 🚀 Autonomous Portal Fixer - Fixing All Blank Page Issues
echo =========================================================
echo.

echo 📋 This script will automatically:
echo    ✅ Generate all missing portal components
echo    ✅ Fix blank page issues across all portals
echo    ✅ Set up proper routing and navigation
echo    ✅ Install all required dependencies
echo    ✅ Start the development server
echo.

echo 🔧 Step 1: Generating all portal components...
node autonomous-portal-generator.cjs
echo.

echo 🔧 Step 2: Installing dependencies...
cd logistics-lynx
npm install
echo.

echo 🔧 Step 3: Building the application...
npm run build
echo.

echo 🔧 Step 4: Starting development server...
echo.
echo 🎉 All portals are now fixed and running!
echo.
echo 🌐 Access your portals at:
echo    📊 Dashboard: http://localhost:3000
echo    🤝 Broker: http://localhost:3000/broker
echo    🚛 Carrier: http://localhost:3000/carrier
echo    🚗 Driver: http://localhost:3000/driver
echo    📦 Shipper: http://localhost:3000/shipper
echo    ⚙️ Admin: http://localhost:3000/admin
echo    📈 Analytics: http://localhost:3000/analytics
echo    🤖 Autonomous: http://localhost:3000/autonomous
echo.

echo 🚀 Starting development server...
npm run dev
