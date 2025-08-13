import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { mockCarriers } from '@/data/mockData';
import { Carrier } from '@/types/networks';
import { 
  Building2, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Truck, 
  MapPin, 
  Phone, 
  Mail,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Star,
  FileText,
  Package
} from 'lucide-react';

const CarriersPage = () => {
  const [carriers, setCarriers] = useState<Carrier[]>(mockCarriers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCarrier, setEditingCarrier] = useState<Carrier | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'United States',
    mc_number: '',
    dot_number: '',
    ein: '',
    equipment_types: [] as string[],
    insurance_amount: '',
    insurance_expiry: '',
    safety_rating: 'satisfactory' as 'satisfactory' | 'conditional' | 'unsatisfactory',
    capacity: '',
    operating_radius: '',
    specialties: [] as string[],
    preferred_lanes: [] as string[],
    status: 'active' as 'active' | 'inactive' | 'pending'
  });

  const filteredCarriers = carriers.filter(carrier => {
    const matchesSearch = 
      carrier.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carrier.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carrier.mc_number.includes(searchTerm) ||
      carrier.dot_number.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || carrier.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCarrier) {
      // Update existing carrier
      setCarriers(prev => prev.map(carrier => 
        carrier.id === editingCarrier.id 
          ? { ...carrier, ...formData, updated_at: new Date().toISOString() }
          : carrier
      ));
      toast({ title: "Carrier updated successfully" });
    } else {
      // Add new carrier
      const newCarrier: Carrier = {
        id: `CAR-${Date.now()}`,
        ...formData,
        rating: 0,
        total_shipments: 0,
        on_time_percentage: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setCarriers(prev => [...prev, newCarrier]);
      toast({ title: "Carrier added successfully" });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      contact_person: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      country: 'United States',
      mc_number: '',
      dot_number: '',
      ein: '',
      equipment_types: [],
      insurance_amount: '',
      insurance_expiry: '',
      safety_rating: 'satisfactory',
      capacity: '',
      operating_radius: '',
      specialties: [],
      preferred_lanes: [],
      status: 'active'
    });
    setEditingCarrier(null);
  };

  const handleEdit = (carrier: Carrier) => {
    setFormData(carrier);
    setEditingCarrier(carrier);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCarriers(prev => prev.filter(carrier => carrier.id !== id));
    toast({ title: "Carrier deleted successfully" });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getSafetyRatingColor = (rating: string) => {
    switch (rating) {
      case 'satisfactory': return 'bg-green-100 text-green-800';
      case 'conditional': return 'bg-yellow-100 text-yellow-800';
      case 'unsatisfactory': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Truck className="h-6 w-6" />
            Carrier Management
          </h2>
          <p className="text-muted-foreground">
            Manage your carrier network and transportation partners
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Carrier
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCarrier ? 'Edit Carrier' : 'Add New Carrier'}
              </DialogTitle>
              <DialogDescription>
                {editingCarrier ? 'Update carrier information' : 'Add a new carrier to your network'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company_name">Company Name *</Label>
                      <Input
                        id="company_name"
                        value={formData.company_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact_person">Contact Person</Label>
                      <Input
                        id="contact_person"
                        value={formData.contact_person}
                        onChange={(e) => setFormData(prev => ({ ...prev, contact_person: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip_code">ZIP Code</Label>
                      <Input
                        id="zip_code"
                        value={formData.zip_code}
                        onChange={(e) => setFormData(prev => ({ ...prev, zip_code: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Mexico">Mexico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="compliance" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="mc_number">MC Number</Label>
                      <Input
                        id="mc_number"
                        value={formData.mc_number}
                        onChange={(e) => setFormData(prev => ({ ...prev, mc_number: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dot_number">DOT Number</Label>
                      <Input
                        id="dot_number"
                        value={formData.dot_number}
                        onChange={(e) => setFormData(prev => ({ ...prev, dot_number: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ein">EIN</Label>
                      <Input
                        id="ein"
                        value={formData.ein}
                        onChange={(e) => setFormData(prev => ({ ...prev, ein: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="insurance_amount">Insurance Amount</Label>
                      <Input
                        id="insurance_amount"
                        value={formData.insurance_amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, insurance_amount: e.target.value }))}
                        placeholder="$1,000,000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="insurance_expiry">Insurance Expiry</Label>
                      <Input
                        id="insurance_expiry"
                        type="date"
                        value={formData.insurance_expiry}
                        onChange={(e) => setFormData(prev => ({ ...prev, insurance_expiry: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="safety_rating">Safety Rating</Label>
                    <Select value={formData.safety_rating} onValueChange={(value: unknown) => setFormData(prev => ({ ...prev, safety_rating: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="satisfactory">Satisfactory</SelectItem>
                        <SelectItem value="conditional">Conditional</SelectItem>
                        <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="operations" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Fleet Capacity</Label>
                      <Input
                        id="capacity"
                        value={formData.capacity}
                        onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                        placeholder="50 trucks"
                      />
                    </div>
                    <div>
                      <Label htmlFor="operating_radius">Operating Radius</Label>
                      <Input
                        id="operating_radius"
                        value={formData.operating_radius}
                        onChange={(e) => setFormData(prev => ({ ...prev, operating_radius: e.target.value }))}
                        placeholder="500 miles"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: unknown) => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCarrier ? 'Update' : 'Add'} Carrier
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Carriers</CardTitle>
              <CardDescription>
                {filteredCarriers.length} of {carriers.length} carriers
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search carriers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>DOT/MC Numbers</TableHead>
                <TableHead>Safety Rating</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCarriers.map((carrier) => (
                <TableRow key={carrier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{carrier.company_name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {carrier.city}, {carrier.state}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{carrier.contact_person}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {carrier.email}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {carrier.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">DOT: {carrier.dot_number}</div>
                      <div className="text-sm">MC: {carrier.mc_number}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSafetyRatingColor(carrier.safety_rating)}>
                      {carrier.safety_rating}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm">{carrier.rating}/5</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {carrier.on_time_percentage}% on-time
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {carrier.total_shipments} shipments
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(carrier.status)}
                      <Badge variant={carrier.status === 'active' ? 'default' : 'secondary'}>
                        {carrier.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(carrier)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(carrier.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarriersPage;