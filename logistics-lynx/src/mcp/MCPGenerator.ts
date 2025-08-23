// 🤖 MCP (Master Control Program) - Autonomous Page Generator
// Generates complete React pages with TypeScript, routing, and tests

import fs from 'fs';
import path from 'path';
import { mcpMenuStructure, mcpGenerationRules, mcpDesignSystem, type MCPPageConfig } from './mcp.config';

export class MCPGenerator {
  private outputDir: string;
  private pagesDir: string;
  private testsDir: string;

  constructor(outputDir: string = 'src') {
    this.outputDir = outputDir;
    this.pagesDir = path.join(outputDir, 'pages', 'super-admin');
    this.testsDir = path.join(outputDir, '__tests__', 'super-admin');
  }

  // 🚀 Main generation function
  async generateAllPages(): Promise<void> {
    console.log('🤖 MCP: Starting autonomous page generation...');
    console.log(`📊 Total pages to generate: ${mcpMenuStructure.length}`);

    // Create directory structure
    this.createDirectoryStructure();

    // Generate pages by category
    const categories = [...new Set(mcpMenuStructure.map(page => page.category))];
    
    for (const category of categories) {
      const categoryPages = mcpMenuStructure.filter(page => page.category === category);
      console.log(`🏗️  Generating ${category}: ${categoryPages.length} pages`);
      
      for (const pageConfig of categoryPages) {
        await this.generatePage(pageConfig);
        if (mcpGenerationRules.tests) {
          await this.generateTest(pageConfig);
        }
      }
    }

    // Generate routing
    if (mcpGenerationRules.routing) {
      await this.generateRouting();
    }

    console.log('✅ MCP: All pages generated successfully!');
  }

  // 📁 Create directory structure
  private createDirectoryStructure(): void {
    const categories = [...new Set(mcpMenuStructure.map(page => page.category))];
    
    // Create main directories
    this.ensureDir(this.pagesDir);
    if (mcpGenerationRules.tests) {
      this.ensureDir(this.testsDir);
    }

    // Create category directories
    categories.forEach(category => {
      const categoryDir = path.join(this.pagesDir, this.sanitizeDirName(category));
      this.ensureDir(categoryDir);
      
      if (mcpGenerationRules.tests) {
        const testCategoryDir = path.join(this.testsDir, this.sanitizeDirName(category));
        this.ensureDir(testCategoryDir);
      }
    });
  }

  // 📄 Generate individual page
  private async generatePage(pageConfig: MCPPageConfig): Promise<void> {
    const template = this.getPageTemplate(pageConfig);
    const categoryDir = this.sanitizeDirName(pageConfig.category);
    const fileName = `${this.sanitizeFileName(pageConfig.title)}.tsx`;
    const filePath = path.join(this.pagesDir, categoryDir, fileName);

    fs.writeFileSync(filePath, template);
    console.log(`  ✅ Generated: ${pageConfig.title}`);
  }

  // 🧪 Generate test file
  private async generateTest(pageConfig: MCPPageConfig): Promise<void> {
    const template = this.getTestTemplate(pageConfig);
    const categoryDir = this.sanitizeDirName(pageConfig.category);
    const fileName = `${this.sanitizeFileName(pageConfig.title)}.test.tsx`;
    const filePath = path.join(this.testsDir, categoryDir, fileName);

    fs.writeFileSync(filePath, template);
  }

  // 🛣️ Generate routing configuration
  private async generateRouting(): Promise<void> {
    const routingTemplate = this.getRoutingTemplate();
    const filePath = path.join(this.pagesDir, 'SuperAdminRoutes.tsx');
    fs.writeFileSync(filePath, routingTemplate);
    console.log('  ✅ Generated: SuperAdminRoutes.tsx');
  }

  // 📝 Page template generator
  private getPageTemplate(pageConfig: MCPPageConfig): string {
    const componentName = this.sanitizeComponentName(pageConfig.title);
    const imports = this.getImports(pageConfig);
    const content = this.getPageContent(pageConfig);

    return `${imports}

interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = () => {
${content}
};

export default ${componentName};
`;
  }

  // 📦 Get imports based on page configuration
  private getImports(pageConfig: MCPPageConfig): string {
    const baseImports = [
      "import React, { useState, useEffect } from 'react';",
      "import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';",
      "import { Button } from '@/components/ui/button';",
      "import { Badge } from '@/components/ui/badge';"
    ];

    // Add icon import
    if (pageConfig.icon) {
      baseImports.push(`import { ${pageConfig.icon} } from 'lucide-react';`);
    }

    // Add layout-specific imports
    switch (pageConfig.layout) {
      case 'table':
        baseImports.push("import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';");
        break;
      case 'form':
        baseImports.push("import { Input } from '@/components/ui/input';");
        baseImports.push("import { Label } from '@/components/ui/label';");
        break;
      case 'analytics':
        baseImports.push("import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';");
        break;
    }

    if (mcpGenerationRules.analytics) {
      baseImports.push("import { useAnalytics } from '@/hooks/useAnalytics';");
    }

    return baseImports.join('\n');
  }

  // 🎨 Generate page content based on layout type
  private getPageContent(pageConfig: MCPPageConfig): string {
    const componentName = this.sanitizeComponentName(pageConfig.title);
    
    switch (pageConfig.layout) {
      case 'dashboard':
        return this.getDashboardContent(pageConfig);
      case 'table':
        return this.getTableContent(pageConfig);
      case 'form':
        return this.getFormContent(pageConfig);
      case 'analytics':
        return this.getAnalyticsContent(pageConfig);
      case 'settings':
        return this.getSettingsContent(pageConfig);
      default:
        return this.getDefaultContent(pageConfig);
    }
  }

  // 📊 Dashboard layout template
  private getDashboardContent(pageConfig: MCPPageConfig): string {
    return `  ${mcpGenerationRules.analytics ? 'const { trackEvent } = useAnalytics();' : ''}
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    ${mcpGenerationRules.analytics ? `trackEvent('page_view', { page: '${pageConfig.id}' });` : ''}
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <${pageConfig.icon} className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            ${pageConfig.title}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          ${pageConfig.description}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Items', value: '1,234', change: '+12%' },
          { title: 'Active', value: '987', change: '+8%' },
          { title: 'Pending', value: '123', change: '-2%' },
          { title: 'Completed', value: '890', change: '+15%' }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600 font-semibold">
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest ${pageConfig.title.toLowerCase()} activities</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <${pageConfig.icon} className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${pageConfig.title} Dashboard
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    ${pageConfig.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              ${pageConfig.features.map(feature => `<Button variant="outline" className="w-full justify-start">
                <${pageConfig.icon} className="h-4 w-4 mr-2" />
                ${this.formatFeatureName(feature)}
              </Button>`).join('\n              ')}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );`;
  }

  // 📋 Table layout template
  private getTableContent(pageConfig: MCPPageConfig): string {
    return `  ${mcpGenerationRules.analytics ? 'const { trackEvent } = useAnalytics();' : ''}
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData([
        { id: 1, name: 'Item 1', status: 'Active', created: '2024-01-01' },
        { id: 2, name: 'Item 2', status: 'Pending', created: '2024-01-02' },
        { id: 3, name: 'Item 3', status: 'Completed', created: '2024-01-03' },
      ]);
      setIsLoading(false);
    }, 1000);
    ${mcpGenerationRules.analytics ? `trackEvent('page_view', { page: '${pageConfig.id}' });` : ''}
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <${pageConfig.icon} className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              ${pageConfig.title}
            </h1>
          </div>
          <Button>
            Add New
          </Button>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          ${pageConfig.description}
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              Filter
            </Button>
            <Button variant="outline">
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>${pageConfig.title} List</CardTitle>
          <CardDescription>Manage your ${pageConfig.title.toLowerCase()}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );`;
  }

  // 📝 Form layout template
  private getFormContent(pageConfig: MCPPageConfig): string {
    return `  ${mcpGenerationRules.analytics ? 'const { trackEvent } = useAnalytics();' : ''}
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    ${mcpGenerationRules.analytics ? `trackEvent('page_view', { page: '${pageConfig.id}' });` : ''}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <${pageConfig.icon} className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            ${pageConfig.title}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          ${pageConfig.description}
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>${pageConfig.title} Configuration</CardTitle>
          <CardDescription>Configure your ${pageConfig.title.toLowerCase()} settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input id="status" placeholder="Enter status" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter description" />
            </div>

            ${pageConfig.features.map(feature => `<div className="space-y-2">
              <Label htmlFor="${this.sanitizeId(feature)}">${this.formatFeatureName(feature)}</Label>
              <Input id="${this.sanitizeId(feature)}" placeholder="Configure ${this.formatFeatureName(feature)}" />
            </div>`).join('\n\n            ')}

            <div className="flex items-center justify-end space-x-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );`;
  }

  // 📈 Analytics layout template
  private getAnalyticsContent(pageConfig: MCPPageConfig): string {
    return `  ${mcpGenerationRules.analytics ? 'const { trackEvent } = useAnalytics();' : ''}
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setChartData([
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 700 },
      ]);
      setIsLoading(false);
    }, 1000);
    ${mcpGenerationRules.analytics ? `trackEvent('page_view', { page: '${pageConfig.id}' });` : ''}
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <${pageConfig.icon} className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            ${pageConfig.title}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          ${pageConfig.description}
        </p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Views', value: '12,345', change: '+12%' },
          { title: 'Conversion Rate', value: '3.2%', change: '+0.8%' },
          { title: 'Revenue', value: '$45,678', change: '+15%' },
          { title: 'Growth', value: '23%', change: '+5%' }
        ].map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </p>
                <p className="text-xs text-green-600 font-semibold">
                  {metric.change} from last period
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>${pageConfig.title} Trends</CardTitle>
            <CardDescription>Monthly performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>Key performance insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              ${pageConfig.features.map(feature => `<div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <${pageConfig.icon} className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${this.formatFeatureName(feature)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Performance insight for ${this.formatFeatureName(feature)}
                  </p>
                </div>
              </div>`).join('\n              ')}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );`;
  }

  // ⚙️ Settings layout template
  private getSettingsContent(pageConfig: MCPPageConfig): string {
    return `  ${mcpGenerationRules.analytics ? 'const { trackEvent } = useAnalytics();' : ''}
  const [settings, setSettings] = useState({});

  useEffect(() => {
    ${mcpGenerationRules.analytics ? `trackEvent('page_view', { page: '${pageConfig.id}' });` : ''}
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <${pageConfig.icon} className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            ${pageConfig.title}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          ${pageConfig.description}
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        ${pageConfig.features.map(feature => `<Card>
          <CardHeader>
            <CardTitle>${this.formatFeatureName(feature)}</CardTitle>
            <CardDescription>Configure ${this.formatFeatureName(feature)} settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Enable ${this.formatFeatureName(feature)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enable or disable ${this.formatFeatureName(feature)} functionality
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>`).join('\n\n        ')}
      </div>
    </div>
  );`;
  }

  // 📄 Default content template
  private getDefaultContent(pageConfig: MCPPageConfig): string {
    return `  ${mcpGenerationRules.analytics ? 'const { trackEvent } = useAnalytics();' : ''}

  useEffect(() => {
    ${mcpGenerationRules.analytics ? `trackEvent('page_view', { page: '${pageConfig.id}' });` : ''}
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <${pageConfig.icon} className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            ${pageConfig.title}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          ${pageConfig.description}
        </p>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center space-y-4">
            <${pageConfig.icon} className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              ${pageConfig.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              ${pageConfig.description}
            </p>
            <Button>
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );`;
  }

  // 🧪 Test template generator
  private getTestTemplate(pageConfig: MCPPageConfig): string {
    const componentName = this.sanitizeComponentName(pageConfig.title);
    const categoryDir = this.sanitizeDirName(pageConfig.category);
    
    return `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ${componentName} from '../../pages/super-admin/${categoryDir}/${this.sanitizeFileName(pageConfig.title)}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName} />);
    expect(screen.getByText('${pageConfig.title}')).toBeInTheDocument();
  });

  it('displays the correct description', () => {
    render(<${componentName} />);
    expect(screen.getByText('${pageConfig.description}')).toBeInTheDocument();
  });

  ${pageConfig.features.map(feature => `it('includes ${this.formatFeatureName(feature)} functionality', () => {
    render(<${componentName} />);
    // Add specific tests for ${this.formatFeatureName(feature)}
  });`).join('\n\n  ')}
});
`;
  }

  // 🛣️ Routing template generator
  private getRoutingTemplate(): string {
    const categories = [...new Set(mcpMenuStructure.map(page => page.category))];
    
    const imports = categories.map(category => {
      const categoryPages = mcpMenuStructure.filter(page => page.category === category);
      return categoryPages.map(page => {
        const componentName = this.sanitizeComponentName(page.title);
        const categoryDir = this.sanitizeDirName(category);
        const fileName = this.sanitizeFileName(page.title);
        return `import ${componentName} from './${categoryDir}/${fileName}';`;
      }).join('\n');
    }).join('\n');

    const routes = mcpMenuStructure.map(page => {
      const componentName = this.sanitizeComponentName(page.title);
      return `        <Route path="${page.path}" element={<${componentName} />} />`;
    }).join('\n');

    return `import React from 'react';
import { Routes, Route } from 'react-router-dom';

${imports}

const SuperAdminRoutes: React.FC = () => {
  return (
    <Routes>
${routes}
    </Routes>
  );
};

export default SuperAdminRoutes;
`;
  }

  // 🔧 Utility functions
  private ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  private sanitizeDirName(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private sanitizeFileName(name: string): string {
    return name.replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  private sanitizeComponentName(name: string): string {
    return name.replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  private sanitizeId(name: string): string {
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
  }

  private formatFeatureName(feature: string): string {
    return feature.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

export default MCPGenerator;
