/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Book, 
  Code, 
  Copy, 
  Download, 
  ExternalLink, 
  FileText, 
  Play, 
  Search, 
  Tag,
  Terminal
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';

interface APIEndpoint {
  id: string;
  method: string;
  path: string;
  summary: string;
  description: string;
  category: string;
  parameters: APIParameter[];
  responses: APIResponse[];
  examples: CodeExample[];
  authentication: boolean;
}

interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: unknown;
}

interface APIResponse {
  status: number;
  description: string;
  schema: unknown;
  example: unknown;
}

interface CodeExample {
  language: string;
  code: string;
}

const APIDocumentation: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTryItDialog, setShowTryItDialog] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);

  const [apiEndpoints] = useState<APIEndpoint[]>([
    {
      id: '1',
      method: 'GET',
      path: '/api/v1/loads',
      summary: 'List all loads',
      description: 'Retrieve a paginated list of all loads with optional filtering parameters.',
      category: 'Loads',
      authentication: true,
      parameters: [
        {
          name: 'page',
          type: 'integer',
          required: false,
          description: 'Page number for pagination',
          example: 1
        },
        {
          name: 'limit',
          type: 'integer',
          required: false,
          description: 'Number of items per page (max 100)',
          example: 25
        },
        {
          name: 'status',
          type: 'string',
          required: false,
          description: 'Filter by load status',
          example: 'available'
        }
      ],
      responses: [
        {
          status: 200,
          description: 'Successful response',
          schema: {
            type: 'Record<string, unknown>',
            properties: {
              data: { type: 'array' },
              pagination: { type: 'Record<string, unknown>' }
            }
          },
          example: {
            data: [
              {
                id: 'L12345',
                status: 'available',
                origin: 'Chicago, IL',
                destination: 'Atlanta, GA',
                rate: 2500
              }
            ],
            pagination: {
              page: 1,
              limit: 25,
              total: 150
            }
          }
        }
      ],
      examples: [
        {
          language: 'curl',
          code: `curl -X GET "https://api.example.com/v1/loads?page=1&limit=25" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
        },
        {
          language: 'javascript',
          code: `const response = await fetch('https://api.example.com/v1/loads?page=1&limit=25', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();`
        },
        {
          language: 'python',
          code: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.example.com/v1/loads',
    headers=headers,
    params={'page': 1, 'limit': 25}
)
data = response.json()`
        }
      ]
    },
    {
      id: '2',
      method: 'POST',
      path: '/api/v1/loads',
      summary: 'Create a new load',
      description: 'Create a new load with pickup and delivery information.',
      category: 'Loads',
      authentication: true,
      parameters: [
        {
          name: 'origin',
          type: 'Record<string, unknown>',
          required: true,
          description: 'Pickup location details',
          example: {
            address: '123 Main St, Chicago, IL 60601',
            lat: 41.8781,
            lng: -87.6298
          }
        },
        {
          name: 'destination',
          type: 'Record<string, unknown>',
          required: true,
          description: 'Delivery location details',
          example: {
            address: '456 Oak Ave, Atlanta, GA 30309',
            lat: 33.7490,
            lng: -84.3880
          }
        },
        {
          name: 'rate',
          type: 'number',
          required: true,
          description: 'Freight rate in USD',
          example: 2500
        }
      ],
      responses: [
        {
          status: 201,
          description: 'Load created successfully',
          schema: {
            type: 'Record<string, unknown>',
            properties: {
              id: { type: 'string' },
              status: { type: 'string' },
              created_at: { type: 'string' }
            }
          },
          example: {
            id: 'L12346',
            status: 'posted',
            created_at: '2024-01-15T10:30:00Z'
          }
        }
      ],
      examples: [
        {
          language: 'curl',
          code: `curl -X POST "https://api.example.com/v1/loads" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": {
      "address": "123 Main St, Chicago, IL 60601",
      "lat": 41.8781,
      "lng": -87.6298
    },
    "destination": {
      "address": "456 Oak Ave, Atlanta, GA 30309",
      "lat": 33.7490,
      "lng": -84.3880
    },
    "rate": 2500
  }'`
        }
      ]
    },
    {
      id: '3',
      method: 'GET',
      path: '/api/v1/tracking/{loadId}',
      summary: 'Get load tracking information',
      description: 'Retrieve real-time tracking information for a specific load.',
      category: 'Tracking',
      authentication: true,
      parameters: [
        {
          name: 'loadId',
          type: 'string',
          required: true,
          description: 'Unique identifier for the load',
          example: 'L12345'
        }
      ],
      responses: [
        {
          status: 200,
          description: 'Tracking information retrieved successfully',
          schema: {
            type: 'Record<string, unknown>',
            properties: {
              loadId: { type: 'string' },
              status: { type: 'string' },
              location: { type: 'Record<string, unknown>' },
              eta: { type: 'string' }
            }
          },
          example: {
            loadId: 'L12345',
            status: 'in_transit',
            location: {
              lat: 39.7392,
              lng: -104.9903,
              address: 'Denver, CO'
            },
            eta: '2024-01-16T14:30:00Z'
          }
        }
      ],
      examples: [
        {
          language: 'curl',
          code: `curl -X GET "https://api.example.com/v1/tracking/L12345" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
        }
      ]
    },
    {
      id: '4',
      method: 'POST',
      path: '/api/v1/quotes',
      summary: 'Generate freight quote',
      description: 'Calculate freight rates based on origin, destination, and load details.',
      category: 'Quotes',
      authentication: true,
      parameters: [
        {
          name: 'origin_zip',
          type: 'string',
          required: true,
          description: 'Origin ZIP code',
          example: '60601'
        },
        {
          name: 'destination_zip',
          type: 'string',
          required: true,
          description: 'Destination ZIP code',
          example: '30309'
        },
        {
          name: 'weight',
          type: 'number',
          required: true,
          description: 'Load weight in pounds',
          example: 25000
        },
        {
          name: 'equipment_type',
          type: 'string',
          required: true,
          description: 'Type of equipment needed',
          example: 'dry_van'
        }
      ],
      responses: [
        {
          status: 200,
          description: 'Quote generated successfully',
          schema: {
            type: 'Record<string, unknown>',
            properties: {
              quote_id: { type: 'string' },
              rate: { type: 'number' },
              distance: { type: 'number' },
              valid_until: { type: 'string' }
            }
          },
          example: {
            quote_id: 'Q67890',
            rate: 2450,
            distance: 715,
            valid_until: '2024-01-20T23:59:59Z'
          }
        }
      ],
      examples: [
        {
          language: 'javascript',
          code: `const quoteData = {
  origin_zip: '60601',
  destination_zip: '30309',
  weight: 25000,
  equipment_type: 'dry_van'
};

const response = await fetch('https://api.example.com/v1/quotes', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(quoteData)
});`
        }
      ]
    }
  ]);

  const categories = ['all', ...Array.from(new Set(apiEndpoints.map(endpoint => endpoint.category)))];

  const filteredEndpoints = apiEndpoints.filter(endpoint => {
    const matchesSearch = endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-green-100 text-green-800',
      POST: 'bg-blue-100 text-blue-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800',
      PATCH: 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[method] || 'bg-gray-100 text-gray-800'}>{method}</Badge>;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Code example copied to clipboard",
    });
  };

  const tryEndpoint = (endpoint: APIEndpoint) => {
    setSelectedEndpoint(endpoint);
    setShowTryItDialog(true);
  };

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
          <p className="text-muted-foreground">
            Complete API reference with interactive examples and testing tools
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download OpenAPI
          </Button>
          <Button>
            <ExternalLink className="h-4 w-4 mr-2" />
            Interactive Docs
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search endpoints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="endpoints" className="w-full">
        <TabsList>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="schemas">Data Schemas</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <div className="space-y-4">
            {filteredEndpoints.map((endpoint) => (
              <Card key={endpoint.id}>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getMethodBadge(endpoint.method)}
                          <div>
                            <CardTitle className="text-lg font-mono">{endpoint.path}</CardTitle>
                            <CardDescription>{endpoint.summary}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{endpoint.category}</Badge>
                          {endpoint.authentication && (
                            <Badge className="bg-orange-100 text-orange-800">
                              <Tag className="h-3 w-3 mr-1" />
                              Auth Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                        </div>

                        {endpoint.parameters.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-3">Parameters</h4>
                            <div className="border rounded-lg overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-muted">
                                  <tr>
                                    <th className="text-left p-3 font-medium">Name</th>
                                    <th className="text-left p-3 font-medium">Type</th>
                                    <th className="text-left p-3 font-medium">Required</th>
                                    <th className="text-left p-3 font-medium">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {endpoint.parameters.map((param, index) => (
                                    <tr key={index} className="border-t">
                                      <td className="p-3 font-mono">{param.name}</td>
                                      <td className="p-3">
                                        <Badge variant="outline">{param.type}</Badge>
                                      </td>
                                      <td className="p-3">
                                        {param.required ? (
                                          <Badge variant="destructive" className="text-xs">Required</Badge>
                                        ) : (
                                          <Badge variant="secondary" className="text-xs">Optional</Badge>
                                        )}
                                      </td>
                                      <td className="p-3 text-muted-foreground">{param.description}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="font-medium mb-3">Responses</h4>
                          <div className="space-y-2">
                            {endpoint.responses.map((response, index) => (
                              <div key={index} className="border rounded-lg p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge className={response.status < 300 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                    {response.status}
                                  </Badge>
                                  <span className="text-sm font-medium">{response.description}</span>
                                </div>
                                <details className="text-xs">
                                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                                    Example Response
                                  </summary>
                                  <pre className="mt-2 p-2 bg-muted rounded overflow-x-auto">
                                    {JSON.stringify(response.example, null, 2)}
                                  </pre>
                                </details>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Code Examples</h4>
                          <Tabs defaultValue={endpoint.examples[0]?.language || 'curl'}>
                            <TabsList className="grid w-full grid-cols-3">
                              {endpoint.examples.map((example) => (
                                <TabsTrigger key={example.language} value={example.language}>
                                  {example.language.toUpperCase()}
                                </TabsTrigger>
                              ))}
                            </TabsList>
                            {endpoint.examples.map((example) => (
                              <TabsContent key={example.language} value={example.language}>
                                <div className="relative">
                                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                    {example.code}
                                  </pre>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard(example.code)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button onClick={() => tryEndpoint(endpoint)}>
                            <Play className="h-4 w-4 mr-2" />
                            Try It Out
                          </Button>
                          <Button variant="outline">
                            <Code className="h-4 w-4 mr-2" />
                            View Schema
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Authentication</CardTitle>
              <CardDescription>
                Learn how to authenticate with the TMS API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Bearer Token Authentication</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  All API requests require authentication using a Bearer token in the Authorization header.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm">
                    {`Authorization: Bearer YOUR_API_KEY`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Getting Your API Key</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  API keys can be generated from the API Keys section of your dashboard.
                </p>
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Manage API Keys
                </Button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Rate Limiting</h4>
                <p className="text-sm text-muted-foreground">
                  API requests are rate limited based on your subscription tier. Check the rate limits section for details.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schemas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Schemas</CardTitle>
              <CardDescription>
                Common data structures used across the API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Load Object</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`{
  "id": "string",
  "status": "available | assigned | in_transit | delivered",
  "origin": {
    "address": "string",
    "lat": "number",
    "lng": "number"
  },
  "destination": {
    "address": "string",
    "lat": "number", 
    "lng": "number"
  },
  "rate": "number",
  "equipment_type": "string",
  "created_at": "string (ISO 8601)",
  "updated_at": "string (ISO 8601)"
}`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Quote Object</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`{
  "quote_id": "string",
  "rate": "number",
  "distance": "number",
  "valid_until": "string (ISO 8601)",
  "factors": {
    "base_rate": "number",
    "fuel_surcharge": "number",
    "accessorials": "number"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SDK Examples</CardTitle>
              <CardDescription>
                Ready-to-use code examples for popular programming languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Node.js SDK</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`npm install @tms/api-client

const TMS = require('@tms/api-client');

const client = new TMS({
  apiKey: 'your-api-key'
});

// List loads
const loads = await client.loads.list({
  page: 1,
  limit: 25
});`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Python SDK</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`pip install tms-api-client

import tms

client = tms.Client(api_key='your-api-key')

# Create a new load
load = client.loads.create({
    'origin': {
        'address': '123 Main St, Chicago, IL'
    },
    'destination': {
        'address': '456 Oak Ave, Atlanta, GA'
    },
    'rate': 2500
})`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showTryItDialog} onOpenChange={setShowTryItDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Try API Endpoint</DialogTitle>
            <DialogDescription>
              Test the {selectedEndpoint?.method} {selectedEndpoint?.path} endpoint
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" placeholder="Your API key" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="requestBody">Request Body (JSON)</Label>
              <Textarea 
                id="requestBody" 
                placeholder='{"key": "value"}' 
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTryItDialog(false)}>
              Cancel
            </Button>
            <Button>
              <Terminal className="h-4 w-4 mr-2" />
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default APIDocumentation;