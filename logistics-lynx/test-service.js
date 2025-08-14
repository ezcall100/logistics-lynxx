// Simple test for website builder service
console.log('🤖 Testing Trans Bot AI Website Builder Service...\n');

// Import the service (we'll test it directly)
const fs = require('fs');
const path = require('path');

// Read the service file to understand its structure
const servicePath = path.join(__dirname, 'src', 'services', 'websiteBuilderService.ts');
console.log('📁 Service file path:', servicePath);

if (fs.existsSync(servicePath)) {
    console.log('✅ Service file exists');
    const serviceContent = fs.readFileSync(servicePath, 'utf8');
    console.log('📄 Service file size:', serviceContent.length, 'characters');
    
    // Check if it contains the expected class
    if (serviceContent.includes('MockWebsiteBuilderService')) {
        console.log('✅ MockWebsiteBuilderService class found');
    } else {
        console.log('❌ MockWebsiteBuilderService class not found');
    }
    
    if (serviceContent.includes('startAutonomousBuilding')) {
        console.log('✅ startAutonomousBuilding method found');
    } else {
        console.log('❌ startAutonomousBuilding method not found');
    }
} else {
    console.log('❌ Service file not found');
}

// Test the React components
const componentsPath = path.join(__dirname, 'src', 'components', 'autonomous');
console.log('\n📁 Components directory:', componentsPath);

if (fs.existsSync(componentsPath)) {
    const components = fs.readdirSync(componentsPath);
    console.log('✅ Components found:', components);
    
    // Check for specific components
    const expectedComponents = ['WebsiteBuilder.tsx', 'WebsiteBuilderConsole.tsx', 'LiveFeed.tsx', 'MetricsBar.tsx'];
    expectedComponents.forEach(component => {
        const componentPath = path.join(componentsPath, component);
        if (fs.existsSync(componentPath)) {
            console.log(`✅ ${component} exists`);
        } else {
            console.log(`❌ ${component} missing`);
        }
    });
} else {
    console.log('❌ Components directory not found');
}

// Test the main dashboard page
const dashboardPath = path.join(__dirname, 'src', 'pages', 'autonomous-dashboard.tsx');
console.log('\n📁 Dashboard file:', dashboardPath);

if (fs.existsSync(dashboardPath)) {
    console.log('✅ Dashboard file exists');
    const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
    
    if (dashboardContent.includes('WebsiteBuilder')) {
        console.log('✅ WebsiteBuilder component imported');
    } else {
        console.log('❌ WebsiteBuilder component not imported');
    }
    
    if (dashboardContent.includes('WebsiteBuilderConsole')) {
        console.log('✅ WebsiteBuilderConsole component imported');
    } else {
        console.log('❌ WebsiteBuilderConsole component not imported');
    }
} else {
    console.log('❌ Dashboard file not found');
}

console.log('\n🔍 Testing complete. Check the browser console for any errors.');
console.log('🌐 Visit http://localhost:8080 and look for the "Open TMS Dashboard" link');
