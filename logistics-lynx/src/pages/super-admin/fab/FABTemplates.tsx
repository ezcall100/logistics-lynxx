import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Download, Plus, Eye } from 'lucide-react';

const FABTemplates: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Templates</h1>
          <p className="text-gray-600 mt-2">Pre-built FAB templates and configurations</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'E-commerce', description: 'Shopping cart and checkout actions', category: 'Business', icon: '🛒' },
          { name: 'Dashboard', description: 'Analytics and reporting actions', category: 'Analytics', icon: '📊' },
          { name: 'Support', description: 'Help and support actions', category: 'Support', icon: '🆘' },
          { name: 'Social', description: 'Social media and sharing actions', category: 'Social', icon: '📱' },
          { name: 'Productivity', description: 'Task and project management', category: 'Productivity', icon: '✅' },
          { name: 'Custom', description: 'Fully customizable template', category: 'Custom', icon: '⚙️' }
        ].map((template, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{template.icon}</span>
                <CardTitle className="text-lg">{template.name}</CardTitle>
              </div>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge variant="outline">{template.category}</Badge>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Copy className="h-4 w-4 mr-1" />
                    Use
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Categories</CardTitle>
          <CardDescription>Browse templates by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Business', 'Analytics', 'Support', 'Social', 'Productivity', 'Custom', 'Finance', 'Marketing'].map((category) => (
              <div key={category} className="p-4 border rounded-lg text-center hover:bg-gray-50 cursor-pointer">
                <div className="text-lg font-medium text-gray-900">{category}</div>
                <div className="text-sm text-gray-500">12 templates</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FABTemplates;
