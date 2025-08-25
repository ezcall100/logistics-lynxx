import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FABActions = () => {
  const [actions] = useState([
    {
      id: 1,
      name: 'Create Order',
      description: 'Quickly create a new order',
      icon: '📝',
      category: 'Orders',
      status: 'active',
      usage: 45
    },
    {
      id: 2,
      name: 'Add Shipment',
      description: 'Add a new shipment to tracking',
      icon: '🚚',
      category: 'Shipping',
      status: 'active',
      usage: 32
    },
    {
      id: 3,
      name: 'New Contact',
      description: 'Create a new contact entry',
      icon: '👤',
      category: 'Contacts',
      status: 'active',
      usage: 28
    },
    {
      id: 4,
      name: 'Quick Report',
      description: 'Generate a quick analytics report',
      icon: '📊',
      category: 'Analytics',
      status: 'inactive',
      usage: 22
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Actions</h1>
          <p className="text-gray-600 mt-2">
            Manage and configure your floating action button actions
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add New Action
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Action List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                ⚡
              </div>
              Configured Actions
            </CardTitle>
            <CardDescription>
              Your current FAB action configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{action.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{action.name}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {action.category}
                        </Badge>
                        <Badge className={action.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                        }>
                          {action.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{action.usage} uses</span>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📂
              </div>
              Action Categories
            </CardTitle>
            <CardDescription>
              Organize your actions by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    📝
                  </div>
                  <h4 className="font-medium text-gray-900">Orders</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Order management actions</p>
                <Badge variant="outline">2 actions</Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    🚚
                  </div>
                  <h4 className="font-medium text-gray-900">Shipping</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Shipping and logistics actions</p>
                <Badge variant="outline">1 action</Badge>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    👤
                  </div>
                  <h4 className="font-medium text-gray-900">Contacts</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Contact management actions</p>
                <Badge variant="outline">1 action</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FABActions;
