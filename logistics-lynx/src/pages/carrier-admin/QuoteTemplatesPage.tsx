import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, FileText, Copy, Edit, Trash2, Star, ArrowLeft, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface QuoteTemplate {
  id: string;
  name: string;
  description: string;
  transportMode: string;
  equipmentType: string;
  defaultAccessorials: string[];
  baseRateFormula: string;
  fuelSurchargeFormula: string;
  validityDays: number;
  isDefault: boolean;
  createdAt: string;
  createdBy: string;
  usageCount: number;
  category: string;
}

const QuoteTemplatesPage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<QuoteTemplate[]>([
    {
      id: '1',
      name: 'Standard Truckload - Dry Van',
      description: 'Standard dry van truckload template for general merchandise',
      transportMode: 'Truckload',
      equipmentType: 'Dry Van',
      defaultAccessorials: ['Fuel Surcharge', 'Detention'],
      baseRateFormula: '$2.85/mile',
      fuelSurchargeFormula: '6% of base rate',
      validityDays: 7,
      isDefault: true,
      createdAt: '2024-01-01',
      createdBy: 'Sarah Johnson',
      usageCount: 45,
      category: 'Standard'
    },
    {
      id: '2',
      name: 'Refrigerated Transport',
      description: 'Temperature-controlled shipping for perishable goods',
      transportMode: 'Truckload',
      equipmentType: 'Reefer',
      defaultAccessorials: ['Temperature Control', 'Fuel Surcharge', 'Detention'],
      baseRateFormula: '$3.20/mile',
      fuelSurchargeFormula: '8% of base rate',
      validityDays: 5,
      isDefault: false,
      createdAt: '2024-01-05',
      createdBy: 'Tom Wilson',
      usageCount: 32,
      category: 'Specialized'
    },
    {
      id: '3',
      name: 'LTL Standard',
      description: 'Less-than-truckload shipping template',
      transportMode: 'LTL',
      equipmentType: 'Standard',
      defaultAccessorials: ['Fuel Surcharge', 'Liftgate', 'Residential'],
      baseRateFormula: '$185/cwt',
      fuelSurchargeFormula: '12% surcharge',
      validityDays: 10,
      isDefault: false,
      createdAt: '2024-01-08',
      createdBy: 'Sarah Johnson',
      usageCount: 28,
      category: 'Standard'
    },
    {
      id: '4',
      name: 'Intermodal Rail',
      description: 'Rail-based intermodal shipping template',
      transportMode: 'Intermodal',
      equipmentType: '53\' Container',
      defaultAccessorials: ['Drayage', 'Chassis', 'Fuel Surcharge'],
      baseRateFormula: '$4,200/container',
      fuelSurchargeFormula: '5% of base rate',
      validityDays: 14,
      isDefault: false,
      createdAt: '2024-01-10',
      createdBy: 'Tom Wilson',
      usageCount: 19,
      category: 'Specialized'
    },
    {
      id: '5',
      name: 'Heavy Haul Oversized',
      description: 'Specialized heavy haul for oversized equipment',
      transportMode: 'Heavy Haul',
      equipmentType: 'Multi-Axle',
      defaultAccessorials: ['Permits', 'Escort', 'Special Handling', 'Fuel Surcharge'],
      baseRateFormula: '$8.50/mile',
      fuelSurchargeFormula: '10% of base rate',
      validityDays: 3,
      isDefault: false,
      createdAt: '2024-01-12',
      createdBy: 'Sarah Johnson',
      usageCount: 12,
      category: 'Specialized'
    },
    {
      id: '6',
      name: 'Auto Transport Standard',
      description: 'Vehicle transport template for car carriers',
      transportMode: 'Auto Transport',
      equipmentType: 'Car Carrier',
      defaultAccessorials: ['Loading', 'Inspection', 'Fuel Surcharge'],
      baseRateFormula: '$1,250/unit',
      fuelSurchargeFormula: '7% of base rate',
      validityDays: 7,
      isDefault: false,
      createdAt: '2024-01-15',
      createdBy: 'Tom Wilson',
      usageCount: 8,
      category: 'Specialized'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [transportModeFilter, setTransportModeFilter] = useState('all');
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.transportMode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || template.category.toLowerCase() === categoryFilter;
    const matchesTransportMode = transportModeFilter === 'all' || template.transportMode.toLowerCase() === transportModeFilter;

    return matchesSearch && matchesCategory && matchesTransportMode;
  });

  const handleDuplicateTemplate = (template: QuoteTemplate) => {
    const newTemplate: QuoteTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      name: `${template.name} (Copy)`,
      isDefault: false,
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    };
    setTemplates(prev => [newTemplate, ...prev]);
    toast.success('Template duplicated successfully');
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
    setDeleteTemplateId(null);
    toast.success('Template deleted successfully');
  };

  const handleSetDefault = (id: string) => {
    setTemplates(prev => prev.map(template => ({
      ...template,
      isDefault: template.id === id
    })));
    toast.success('Default template updated');
  };

  const handleUseTemplate = (template: QuoteTemplate) => {
    // In a real app, this would prefill the new quote form with template data
    toast.success(`Using template: ${template.name}`);
    navigate('/carrier-admin/quotes/new');
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'specialized': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/carrier-admin/quotes')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Quote Templates</h1>
            <p className="text-muted-foreground">
              Manage and create reusable quote templates for faster quoting
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Templates</p>
                <p className="text-2xl font-bold">{templates.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Standard</p>
                <p className="text-2xl font-bold">{templates.filter(t => t.category === 'Standard').length}</p>
              </div>
              <Copy className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Specialized</p>
                <p className="text-2xl font-bold">{templates.filter(t => t.category === 'Specialized').length}</p>
              </div>
              <Star className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold">{templates.reduce((sum, t) => sum + t.usageCount, 0)}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="specialized">Specialized</SelectItem>
              </SelectContent>
            </Select>

            <Select value={transportModeFilter} onValueChange={setTransportModeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Transport Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="truckload">Truckload</SelectItem>
                <SelectItem value="ltl">LTL</SelectItem>
                <SelectItem value="intermodal">Intermodal</SelectItem>
                <SelectItem value="auto transport">Auto Transport</SelectItem>
                <SelectItem value="heavy haul">Heavy Haul</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    {template.isDefault && (
                      <Badge variant="default" className="gap-1">
                        <Star className="h-3 w-3" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{template.transportMode}</Badge>
                <Badge variant="outline">{template.equipmentType}</Badge>
                <Badge className={getCategoryColor(template.category)}>
                  {template.category}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Rate:</span>
                  <span className="font-medium">{template.baseRateFormula}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fuel Surcharge:</span>
                  <span className="font-medium">{template.fuelSurchargeFormula}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid Days:</span>
                  <span className="font-medium">{template.validityDays} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Usage Count:</span>
                  <span className="font-medium">{template.usageCount}</span>
                </div>
              </div>

              {template.defaultAccessorials.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Default Accessorials:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.defaultAccessorials.map((accessorial, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {accessorial}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1"
                  size="sm"
                >
                  Use Template
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDuplicateTemplate(template)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {!template.isDefault && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDeleteTemplateId(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {!template.isDefault && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={() => handleSetDefault(template.id)}
                >
                  <Star className="h-3 w-3" />
                  Set as Default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== 'all' || transportModeFilter !== 'all'
                ? "Try adjusting your search criteria or filters"
                : "Get started by creating your first quote template"
              }
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Template
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTemplateId} onOpenChange={() => setDeleteTemplateId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this quote template? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTemplateId && handleDeleteTemplate(deleteTemplateId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuoteTemplatesPage;