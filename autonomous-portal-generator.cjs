#!/usr/bin/env node

/**
 * 🤖 Autonomous Portal Generator
 * Automatically generates all missing portal components to fix blank page issues
 * Creates complete portal structure without human intervention
 */

const fs = require('fs');
const path = require('path');

// Portal configurations
const PORTALS = {
  'dashboard': {
    path: '/',
    title: 'TMS Dashboard',
    description: 'Main dashboard for TMS system',
    features: ['overview', 'quick-actions', 'recent-activity', 'system-status']
  },
  'broker': {
    path: '/broker',
    title: 'Broker Portal',
    description: 'Freight broker management interface',
    features: ['load-management', 'carrier-selection', 'rate-negotiation', 'documentation']
  },
  'carrier': {
    path: '/carrier',
    title: 'Carrier Portal',
    description: 'Carrier management and tracking interface',
    features: ['fleet-management', 'route-optimization', 'driver-assignment', 'compliance']
  },
  'driver': {
    path: '/driver',
    title: 'Driver Portal',
    description: 'Driver mobile and web interface',
    features: ['route-navigation', 'delivery-tracking', 'document-upload', 'communication']
  },
  'shipper': {
    path: '/shipper',
    title: 'Shipper Portal',
    description: 'Shipper booking and tracking interface',
    features: ['shipment-booking', 'tracking', 'documentation', 'billing']
  },
  'admin': {
    path: '/admin',
    title: 'Admin Portal',
    description: 'System administration interface',
    features: ['user-management', 'system-configuration', 'reports', 'security']
  },
  'analytics': {
    path: '/analytics',
    title: 'Analytics Portal',
    description: 'Business intelligence and analytics',
    features: ['performance-metrics', 'trend-analysis', 'reporting', 'insights']
  },
  'autonomous': {
    path: '/autonomous',
    title: 'Autonomous AI Portal',
    description: 'AI-powered autonomous operations',
    features: ['ai-agents', 'automation', 'predictive-analytics', 'optimization']
  }
};

// Component templates
const COMPONENT_TEMPLATES = {
  'portal': (portalName, portalConfig) => `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const ${portalName.charAt(0).toUpperCase() + portalName.slice(1)}Portal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ${portalConfig.title}
          </h1>
          <p className="text-lg text-gray-600">
            ${portalConfig.description}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          ${portalConfig.features.map(feature => `
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">${feature.replace('-', ' ').toUpperCase()}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage and monitor ${feature.replace('-', ' ')} operations.
              </p>
              <Button variant="outline" className="w-full">
                Access ${feature.replace('-', ' ')}
              </Button>
            </CardContent>
          </Card>`).join('')}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="default" className="h-12">
                Create New
              </Button>
              <Button variant="outline" className="h-12">
                View Reports
              </Button>
              <Button variant="outline" className="h-12">
                Settings
              </Button>
              <Button variant="outline" className="h-12">
                Help
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ${portalName.charAt(0).toUpperCase() + portalName.slice(1)}Portal;`,

  'dashboard': () => `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            TMS Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Welcome to your Transportation Management System
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Badge variant="secondary">Live</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <Badge variant="secondary">Monthly</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Carriers</CardTitle>
              <Badge variant="secondary">Online</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Badge variant="default" className="bg-green-500">Healthy</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Portal Navigation */}
        <Card>
          <CardHeader>
            <CardTitle>Portal Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="default" className="h-16 flex-col">
                <span className="text-lg">Broker</span>
                <span className="text-xs">Freight Management</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <span className="text-lg">Carrier</span>
                <span className="text-xs">Fleet Operations</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <span className="text-lg">Driver</span>
                <span className="text-xs">Mobile Interface</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col">
                <span className="text-lg">Shipper</span>
                <span className="text-xs">Booking & Tracking</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;`,

  'app': () => `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import BrokerPortal from './components/broker/BrokerPortal';
import CarrierPortal from './components/carrier/CarrierPortal';
import DriverPortal from './components/driver/DriverPortal';
import ShipperPortal from './components/shipper/ShipperPortal';
import AdminPortal from './components/admin/AdminPortal';
import AnalyticsPortal from './components/analytics/AnalyticsPortal';
import AutonomousPortal from './components/autonomous/AutonomousPortal';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/broker" element={<BrokerPortal />} />
          <Route path="/carrier" element={<CarrierPortal />} />
          <Route path="/driver" element={<DriverPortal />} />
          <Route path="/shipper" element={<ShipperPortal />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/analytics" element={<AnalyticsPortal />} />
          <Route path="/autonomous" element={<AutonomousPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;`,

  'ui-components': {
    'card': `import * as React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`,

    'button': `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }`,

    'badge': `import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`
  }
};

// Utility function to create directories
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Utility function to create files
function createFile(filePath, content) {
  ensureDirectoryExists(path.dirname(filePath));
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`📄 Created file: ${filePath}`);
    return true;
  } else {
    console.log(`⚠️ File already exists: ${filePath}`);
    return false;
  }
}

// Generate all portal components
async function generateAllPortals() {
  console.log('🚀 Starting Autonomous Portal Generation...');
  console.log('==========================================');
  console.log();

  const basePath = path.join(process.cwd(), 'logistics-lynx', 'src');
  let totalCreated = 0;

  try {
    // Create UI components first
    console.log('🎨 Creating UI components...');
    const uiPath = path.join(basePath, 'components', 'ui');
    
    for (const [componentName, content] of Object.entries(COMPONENT_TEMPLATES['ui-components'])) {
      const filePath = path.join(uiPath, `${componentName}.tsx`);
      if (createFile(filePath, content)) {
        totalCreated++;
      }
    }

    // Create utils
    console.log('🔧 Creating utility functions...');
    const utilsPath = path.join(basePath, 'lib');
    const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;
    
    if (createFile(path.join(utilsPath, 'utils.ts'), utilsContent)) {
      totalCreated++;
    }

    // Create portal components
    console.log('🏗️ Creating portal components...');
    for (const [portalName, portalConfig] of Object.entries(PORTALS)) {
      const portalPath = path.join(basePath, 'components', portalName);
      
      if (portalName === 'dashboard') {
        const content = COMPONENT_TEMPLATES['dashboard']();
        const filePath = path.join(portalPath, 'Dashboard.tsx');
        if (createFile(filePath, content)) {
          totalCreated++;
        }
      } else {
        const content = COMPONENT_TEMPLATES['portal'](portalName, portalConfig);
        const filePath = path.join(portalPath, `${portalName.charAt(0).toUpperCase() + portalName.slice(1)}Portal.tsx`);
        if (createFile(filePath, content)) {
          totalCreated++;
        }
      }
    }

    // Update App.tsx
    console.log('🔄 Updating main App component...');
    const appContent = COMPONENT_TEMPLATES['app']();
    const appPath = path.join(basePath, 'App.tsx');
    
    if (fs.existsSync(appPath)) {
      fs.writeFileSync(appPath, appContent);
      console.log(`📝 Updated file: ${appPath}`);
    } else {
      if (createFile(appPath, appContent)) {
        totalCreated++;
      }
    }

    // Create package.json if missing
    console.log('📦 Checking package.json...');
    const packagePath = path.join(process.cwd(), 'logistics-lynx', 'package.json');
    if (!fs.existsSync(packagePath)) {
      const packageContent = `{
  "name": "logistics-lynx",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "tailwind-merge": "^1.14.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.27",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
  }
}`;
      
      if (createFile(packagePath, packageContent)) {
        totalCreated++;
      }
    }

    // Create Vite config
    console.log('⚙️ Creating Vite configuration...');
    const viteConfigPath = path.join(process.cwd(), 'logistics-lynx', 'vite.config.js');
    const viteConfigContent = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})`;
    
    if (createFile(viteConfigPath, viteConfigContent)) {
      totalCreated++;
    }

    // Create TypeScript config
    console.log('📝 Creating TypeScript configuration...');
    const tsConfigPath = path.join(process.cwd(), 'logistics-lynx', 'tsconfig.json');
    const tsConfigContent = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;
    
    if (createFile(tsConfigPath, tsConfigContent)) {
      totalCreated++;
    }

    // Create Tailwind config
    console.log('🎨 Creating Tailwind configuration...');
    const tailwindConfigPath = path.join(process.cwd(), 'logistics-lynx', 'tailwind.config.js');
    const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}`;
    
    if (createFile(tailwindConfigPath, tailwindConfigContent)) {
      totalCreated++;
    }

    // Create CSS file
    console.log('🎨 Creating CSS styles...');
    const cssPath = path.join(basePath, 'index.css');
    const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
    
    if (createFile(cssPath, cssContent)) {
      totalCreated++;
    }

    // Create index.html
    console.log('🌐 Creating index.html...');
    const htmlPath = path.join(process.cwd(), 'logistics-lynx', 'index.html');
    const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TMS - Transportation Management System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
    
    if (createFile(htmlPath, htmlContent)) {
      totalCreated++;
    }

    // Create main.tsx
    console.log('🚀 Creating main entry point...');
    const mainPath = path.join(basePath, 'main.tsx');
    const mainContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;
    
    if (createFile(mainPath, mainContent)) {
      totalCreated++;
    }

    console.log();
    console.log('✅ Portal generation completed successfully!');
    console.log(`📊 Total files created: ${totalCreated}`);
    console.log();
    console.log('🎯 Generated portals:');
    for (const [portalName, portalConfig] of Object.entries(PORTALS)) {
      console.log(`   ✅ ${portalConfig.title} - ${portalConfig.path}`);
    }
    console.log();
    console.log('🚀 Next steps:');
    console.log('   1. cd logistics-lynx');
    console.log('   2. npm install');
    console.log('   3. npm run dev');
    console.log();
    console.log('🌐 All portals will be accessible at:');
    console.log('   http://localhost:3000');

  } catch (error) {
    console.error('❌ Error generating portals:', error.message);
    throw error;
  }
}

// Run the generator
generateAllPortals().catch(console.error);
