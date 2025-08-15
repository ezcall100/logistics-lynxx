const fs = require('fs');
const path = require('path');

// List of index.tsx files that need fixing
const indexFiles = [
  'src/components/carrier/index.tsx',
  'src/components/crm/index.tsx',
  'src/components/directory/index.tsx',
  'src/components/driver/index.tsx',
  'src/components/edi/index.tsx',
  'src/components/factoring/index.tsx',
  'src/components/financials/index.tsx',
  'src/components/load-board/index.tsx',
  'src/components/marketplace/index.tsx',
  'src/components/onboarding/index.tsx',
  'src/components/owner-operator/index.tsx',
  'src/components/rates/index.tsx',
  'src/components/shipper/index.tsx',
  'src/components/super-admin/index.tsx',
  'src/components/tms-admin/index.tsx',
  'src/components/workers/index.tsx'
];

// Icons for each portal type
const portalIcons = {
  'carrier': 'Truck',
  'crm': 'Users',
  'directory': 'Search',
  'driver': 'User',
  'edi': 'FileText',
  'factoring': 'DollarSign',
  'financials': 'BarChart3',
  'load-board': 'Package',
  'marketplace': 'ShoppingCart',
  'onboarding': 'UserPlus',
  'owner-operator': 'UserCheck',
  'rates': 'Calculator',
  'shipper': 'Building',
  'super-admin': 'Shield',
  'tms-admin': 'Settings',
  'workers': 'Users'
};

function fixIndexFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Extract portal name from path
    const portalName = path.dirname(filePath).split('/').pop();
    const iconName = portalIcons[portalName] || 'Settings';
    
    // Fix import statement
    content = content.replace(
      /import \{ \{ (\w+) \} \} from 'lucide-react';/g,
      `import { ${iconName} } from 'lucide-react';`
    );
    
    // Fix JSX structure - replace malformed JSX with proper structure
    const jsxPattern = /\/\/ Dashboard cards for \w+\n<Card>[\s\S]*?<\/Card>\n\n\/\/ Dashboard cards for \w+\n<Card>[\s\S]*?<\/Card>\n\n\/\/ Dashboard cards for \w+\n<Card>[\s\S]*?<\/Card>/g;
    
    const replacementJSX = `        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <${iconName} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <${iconName} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <${iconName} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>`;
    
    content = content.replace(jsxPattern, replacementJSX);
    
    // Fix CardContent structure
    content = content.replace(
      /        <CardContent>\s*\n\s*<div className="space-y-4">[\s\S]*?<\/div>\s*\n\s*<\/CardContent>/g,
      `        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">New item created</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Item updated</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
          </div>
        </CardContent>`
    );
    
    // Update portal name in JSX
    content = content.replace(
      /            <h1 className="text-3xl font-bold flex items-center gap-2">\s*\n\s*<(\w+) className="h-8 w-8" \/>\s*\n\s*(\w+)\s*\n\s*<\/h1>/g,
      `            <h1 className="text-3xl font-bold flex items-center gap-2">
              <${iconName} className="h-8 w-8" />
              ${portalName.charAt(0).toUpperCase() + portalName.slice(1).replace('-', ' ')}
            </h1>`
    );
    
    // Update description
    const descriptions = {
      'carrier': 'Fleet management and load operations',
      'crm': 'Customer relationship management',
      'directory': 'Business directory and networking',
      'driver': 'Driver portal and assignments',
      'edi': 'Electronic data interchange',
      'factoring': 'Invoice factoring and financing',
      'financials': 'Financial reporting and analytics',
      'load-board': 'Load board and freight matching',
      'marketplace': 'Freight marketplace',
      'onboarding': 'User onboarding and setup',
      'owner-operator': 'Owner operator management',
      'rates': 'Rate management and quoting',
      'shipper': 'Shipper portal and load management',
      'super-admin': 'Super administrator controls',
      'tms-admin': 'TMS administration',
      'workers': 'Worker management and scheduling'
    };
    
    content = content.replace(
      /          <p className="text-muted-foreground">.*?<\/p>/g,
      `          <p className="text-muted-foreground">${descriptions[portalName] || 'Portal management'}</p>`
    );
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed: ${filePath}`);
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// Fix all index files
console.log('🔧 Fixing index.tsx files...');
indexFiles.forEach(fixIndexFile);
console.log('✅ All index files fixed!');
