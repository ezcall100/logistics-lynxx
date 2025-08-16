import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Users, 
  Mail, 
  Phone, 
  Building2,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter
} from 'lucide-react';
import { useCRMContacts } from '@/hooks/crm/useCRMContacts';
import { useCRM } from '@/hooks/useCRM';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const CRMContactsPage: React.FC = () => {
  const { contacts, fetchContacts } = useCRMContacts();
  const { companies } = useCRM();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  React.useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.contact_status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getContactStats = () => {
    return {
      total: contacts.length,
      active: contacts.filter(c => c.contact_status === 'active').length,
      inactive: contacts.filter(c => c.contact_status === 'inactive').length,
      withCompany: contacts.filter(c => c.company_id).length
    };
  };

  const stats = getContactStats();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CRM Contacts</h1>
          <p className="text-muted-foreground">Manage your customer contacts and relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CRMStatsCard
          title="Total Contacts"
          value={stats.total}
          icon={Users}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Active Contacts"
          value={stats.active}
          icon={Users}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="Inactive Contacts"
          value={stats.inactive}
          icon={Users}
          iconColor="text-gray-600"
        />
        <CRMStatsCard
          title="With Company"
          value={stats.withCompany}
          icon={Building2}
          iconColor="text-purple-600"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('inactive')}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContacts.map((contact) => (
              <div key={contact.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {contact.first_name[0]}{contact.last_name[0]}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {contact.first_name} {contact.last_name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {contact.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </div>
                        )}
                        {contact.company && (
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {contact.company.name}
                          </div>
                        )}
                      </div>
                      {contact.job_title && (
                        <p className="text-sm text-muted-foreground">{contact.job_title}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(contact.contact_status)}>
                      {contact.contact_status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredContacts.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No contacts found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first contact.'}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default CRMContactsPage;