import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Building2,
  Users,
  DollarSign,
  MapPin,
  Globe,
  Phone,
  Mail,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useCRMCompanies } from '@/hooks/crm/useCRMCompanies';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import type { CRMCompany } from '@/types/crm';

// Sample data for demonstration
const sampleCompanies: Partial<CRMCompany>[] = [
  {
    id: '1',
    name: 'ACME Logistics Solutions',
    industry: 'Transportation & Warehousing',
    company_size: '500-1000',
    website: 'https://acmelogistics.com',
    phone: '+1 (555) 123-4567',
    email: 'info@acmelogistics.com',
    address: {
      street: '123 Industrial Blvd',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'USA'
    },
    annual_revenue: 25000000,
    employee_count: 750,
    description: 'Leading provider of integrated logistics and supply chain solutions across North America',
    tags: ['3PL', 'Warehousing', 'Distribution'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'FastFreight Express',
    industry: 'Freight Transportation',
    company_size: '100-500',
    website: 'https://fastfreight.com',
    phone: '+1 (555) 987-6543',
    email: 'contact@fastfreight.com',
    address: {
      street: '456 Highway 80',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'USA'
    },
    annual_revenue: 12000000,
    employee_count: 250,
    description: 'Expedited freight services with nationwide coverage and real-time tracking',
    tags: ['Expedited', 'LTL', 'Tracking'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Global Shipping Network',
    industry: 'International Trade',
    company_size: '1000+',
    website: 'https://globalshipping.net',
    phone: '+1 (555) 456-7890',
    email: 'operations@globalshipping.net',
    address: {
      street: '789 Port Authority',
      city: 'Long Beach',
      state: 'CA',
      zip: '90802',
      country: 'USA'
    },
    annual_revenue: 85000000,
    employee_count: 1200,
    description: 'International shipping and logistics with port operations and customs expertise',
    tags: ['International', 'Customs', 'Port Services'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const CRMCompaniesPage = () => {
  const { companies, createCompany, updateCompany, deleteCompany, fetchCompanies } = useCRMCompanies();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<CRMCompany | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    company_size: '',
    website: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    annual_revenue: '',
    employee_count: '',
    description: '',
    tags: ''
  });

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  // Use sample data if no companies exist
  const displayCompanies = companies.length > 0 ? companies : sampleCompanies as CRMCompany[];

  const filteredCompanies = displayCompanies.filter(company => {
    const matchesSearch = 
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
    
    return matchesSearch && matchesIndustry;
  });

  const totalRevenue = displayCompanies.reduce((sum, company) => sum + (company.annual_revenue || 0), 0);
  const totalEmployees = displayCompanies.reduce((sum, company) => sum + (company.employee_count || 0), 0);
  const avgRevenue = displayCompanies.length > 0 ? totalRevenue / displayCompanies.length : 0;

  const handleCreateCompany = async () => {
    try {
      const companyData = {
        ...formData,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country
        },
        annual_revenue: parseFloat(formData.annual_revenue) || undefined,
        employee_count: parseInt(formData.employee_count) || undefined,
        tags: formData.tags.split(',').map(s => s.trim()).filter(s => s)
      };
      await createCompany(companyData);
      setIsCreateModalOpen(false);
      resetForm();
      toast({
        title: 'Success',
        description: 'Company created successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create company',
        variant: 'destructive'
      });
    }
  };

  const handleUpdateCompany = async () => {
    if (!editingCompany) return;
    
    try {
      const companyData = {
        ...formData,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country
        },
        annual_revenue: parseFloat(formData.annual_revenue) || undefined,
        employee_count: parseInt(formData.employee_count) || undefined,
        tags: formData.tags.split(',').map(s => s.trim()).filter(s => s)
      };
      await updateCompany(editingCompany.id, companyData);
      setEditingCompany(null);
      resetForm();
      toast({
        title: 'Success',
        description: 'Company updated successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update company',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      industry: '',
      company_size: '',
      website: '',
      phone: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
      annual_revenue: '',
      employee_count: '',
      description: '',
      tags: ''
    });
  };

  const openEditModal = (company: CRMCompany) => {
    setEditingCompany(company);
    setFormData({
      name: company.name || '',
      industry: company.industry || '',
      company_size: company.company_size || '',
      website: company.website || '',
      phone: company.phone || '',
      email: company.email || '',
      street: company.address?.street || '',
      city: company.address?.city || '',
      state: company.address?.state || '',
      zip: company.address?.zip || '',
      country: company.address?.country || 'USA',
      annual_revenue: company.annual_revenue?.toString() || '',
      employee_count: company.employee_count?.toString() || '',
      description: company.description || '',
      tags: company.tags?.join(', ') || ''
    });
  };

  const getCompanySizeColor = (size: string) => {
    switch (size) {
      case '1-10': return 'bg-blue-100 text-blue-800';
      case '11-50': return 'bg-green-100 text-green-800';
      case '51-200': return 'bg-yellow-100 text-yellow-800';
      case '201-500': return 'bg-orange-100 text-orange-800';
      case '500-1000': return 'bg-red-100 text-red-800';
      case '1000+': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
            <p className="text-muted-foreground">Manage your transportation industry partners and clients</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{displayCompanies.length}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">Combined annual revenue</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all companies</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(avgRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">Per company</p>
            </CardContent>
          </Card>
        </div>

        {/* Companies Table */}
        <Card>
          <CardHeader>
            <CardTitle>Company Directory</CardTitle>
            <CardDescription>Manage your transportation industry partnerships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full sm:w-64">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Transportation & Warehousing">Transportation & Warehousing</SelectItem>
                  <SelectItem value="Freight Transportation">Freight Transportation</SelectItem>
                  <SelectItem value="International Trade">International Trade</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{company.name}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {company.description}
                            </div>
                            {company.tags && company.tags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {company.tags.slice(0, 2).map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {company.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{company.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {company.industry}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCompanySizeColor(company.company_size || '')}>
                          {company.company_size || 'Unknown'}
                        </Badge>
                        {company.employee_count && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {company.employee_count} employees
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm">
                              {company.address?.city}, {company.address?.state}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {company.address?.country}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {company.annual_revenue ? (
                          <div>
                            <div className="font-medium">
                              ${(company.annual_revenue / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-muted-foreground">Annual</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not disclosed</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {company.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3" />
                              {company.email}
                            </div>
                          )}
                          {company.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3" />
                              {company.phone}
                            </div>
                          )}
                          {company.website && (
                            <div className="flex items-center gap-2 text-sm">
                              <Globe className="h-3 w-3" />
                              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                Website
                              </a>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(company)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Create/Edit Company Dialog */}
        <Dialog open={isCreateModalOpen || !!editingCompany} onOpenChange={(open) => {
          if (!open) {
            setIsCreateModalOpen(false);
            setEditingCompany(null);
            resetForm();
          }
        }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCompany ? 'Edit Company' : 'Add New Company'}
              </DialogTitle>
              <DialogDescription>
                {editingCompany ? 'Update company information' : 'Create a new transportation industry company'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="ACME Logistics Solutions"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => setFormData({...formData, industry: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Transportation & Warehousing">Transportation & Warehousing</SelectItem>
                    <SelectItem value="Freight Transportation">Freight Transportation</SelectItem>
                    <SelectItem value="International Trade">International Trade</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_size">Company Size</Label>
                <Select value={formData.company_size} onValueChange={(value) => setFormData({...formData, company_size: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500-1000">500-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  placeholder="https://company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="info@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual_revenue">Annual Revenue ($)</Label>
                <Input
                  id="annual_revenue"
                  type="number"
                  value={formData.annual_revenue}
                  onChange={(e) => setFormData({...formData, annual_revenue: e.target.value})}
                  placeholder="25000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee_count">Employee Count</Label>
                <Input
                  id="employee_count"
                  type="number"
                  value={formData.employee_count}
                  onChange={(e) => setFormData({...formData, employee_count: e.target.value})}
                  placeholder="750"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="street">Address</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => setFormData({...formData, street: e.target.value})}
                  placeholder="123 Industrial Blvd"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="Chicago"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  placeholder="IL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={formData.zip}
                  onChange={(e) => setFormData({...formData, zip: e.target.value})}
                  placeholder="60601"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  placeholder="USA"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the company's services and expertise..."
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="3PL, Warehousing, Distribution"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsCreateModalOpen(false);
                setEditingCompany(null);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button onClick={editingCompany ? handleUpdateCompany : handleCreateCompany}>
                {editingCompany ? 'Update' : 'Create'} Company
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CRMCompaniesPage;