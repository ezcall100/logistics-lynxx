import { useState } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
const FABTemplates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'E-commerce Template',
      description: 'Quick actions for online stores',
      actions: ['Add Product', 'View Orders', 'Customer Support'],
      category: 'E-commerce',
      usage: 45
    },
    {
      id: 2,
      name: 'Logistics Template',
      description: 'Transportation and shipping actions',
      actions: ['Create Shipment', 'Track Package', 'Schedule Pickup'],
      category: 'Logistics',
      usage: 32
    },
    {
      id: 3,
      name: 'CRM Template',
      description: 'Customer relationship management',
      actions: ['Add Contact', 'Create Lead', 'Schedule Meeting'],
      category: 'CRM',
      usage: 28
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Templates</h1>
          <p className="text-gray-600 mt-2">
            Pre-configured FAB action templates for different use cases
          </p>
        </div>
        <Button>
          Create Template
        </Button>
      </div>
      
      <div className="grid gap-6">
        {/* Available Templates */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📋
              </div>
              Available Templates
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Choose from pre-built templates or create your own
            </p>
          </div>
          <div>
            <div className="grid gap-4">
              {templates.map((template) => (
                <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{template.category}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {template.actions.map((action) => (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className="text-sm text-gray-600">{template.usage} uses</span>
                      <Button variant="outline" size="sm">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Template Categories */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📂
              </div>
              Template Categories
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Browse templates by category
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    🛒
                  </div>
                  <h4 className="font-medium text-gray-900">E-commerce</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Online store management</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">3 templates</span>
              </div>
              
              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    🚚
                  </div>
                  <h4 className="font-medium text-gray-900">Logistics</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Transportation & shipping</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">2 templates</span>
              </div>
              
              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    👥
                  </div>
                  <h4 className="font-medium text-gray-900">CRM</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Customer management</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">2 templates</span>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Popular Templates */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                ⭐
              </div>
              Popular Templates
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Most frequently used templates
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {templates.slice(0, 2).map((template) => (
                <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">📋</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.actions.length} actions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{template.usage} uses</span>
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default FABTemplates;
