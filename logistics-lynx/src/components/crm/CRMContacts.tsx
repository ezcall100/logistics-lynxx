/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Phone, Mail, Building } from 'lucide-react';
import CRMFormDialog from './CRMFormDialog';

interface CRMContact {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  job_title?: string;
  department?: string;
  company_id?: string;
  contact_status?: string;
  contact_source?: string;
  linkedin_url?: string;
  photo_url?: string;
  notes?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  created_by?: string;
}

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  mobile?: string;
  job_title?: string;
  department?: string;
  company_id?: string;
  contact_status: string;
  contact_source?: string;
  linkedin_url?: string;
  photo_url?: string;
  notes?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  created_by?: string;
}

const CRMContacts = () => {
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<CRMContact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration
      const mockContacts: CRMContact[] = [
        {
          id: '1',
          first_name: 'John',
          last_name: 'Smith',
          email: 'john.smith@company.com',
          phone: '+1-555-0123',
          job_title: 'Logistics Manager',
          company_id: '1',
          contact_status: 'active',
          contact_source: 'website',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          first_name: 'Sarah',
          last_name: 'Johnson',
          email: 'sarah.johnson@freight.com',
          phone: '+1-555-0124',
          job_title: 'Operations Director',
          company_id: '2',
          contact_status: 'active',
          contact_source: 'referral',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      setContacts(mockContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContact = (data: Record<string, string | number | boolean>) => {
    const newContact: CRMContact = {
      id: Date.now().toString(),
      first_name: data.first_name as string,
      last_name: data.last_name as string,
      email: data.email as string,
      phone: data.phone as string,
      job_title: data.job_title as string,
      contact_status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setContacts([...contacts, newContact]);
  };

  const handleEditContact = (data: Record<string, string | number | boolean>) => {
    if (!editingContact) return;
    
    const updatedContact: CRMContact = {
      ...editingContact,
      first_name: data.first_name as string,
      last_name: data.last_name as string,
      email: data.email as string,
      phone: data.phone as string,
      job_title: data.job_title as string,
      updated_at: new Date().toISOString(),
    };
    
    setContacts(contacts.map(c => c.id === editingContact.id ? updatedContact : c));
    setEditingContact(null);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const filteredContacts = contacts.filter(contact =>
    `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.job_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const contactFormFields = [
    { name: 'first_name', label: 'First Name', type: 'text' as const, required: true },
    { name: 'last_name', label: 'Last Name', type: 'text' as const, required: true },
    { name: 'email', label: 'Email', type: 'email' as const },
    { name: 'phone', label: 'Phone', type: 'tel' as const },
    { name: 'job_title', label: 'Job Title', type: 'text' as const },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contacts</CardTitle>
              <CardDescription>Manage your business contacts and relationships</CardDescription>
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {loading ? (
            <div className="text-center py-8">Loading contacts...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="font-medium">
                        {contact.first_name} {contact.last_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {contact.email && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Mail className="h-3 w-3 mr-1" />
                            {contact.email}
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building className="h-3 w-3 mr-1 text-muted-foreground" />
                        {contact.job_title || 'Not specified'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={contact.contact_status === 'active' ? 'default' : 'secondary'}>
                        {contact.contact_status || 'active'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const contactWithRequiredFields: Contact = {
                              ...contact,
                              contact_status: contact.contact_status || 'active'
                            };
                            setEditingContact(contact);
                            setIsFormOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <CRMFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingContact(null);
        }}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
        fields={contactFormFields}
        onSubmit={editingContact ? handleEditContact : handleCreateContact}
        initialData={editingContact ? {
          first_name: editingContact.first_name,
          last_name: editingContact.last_name,
          email: editingContact.email || '',
          phone: editingContact.phone || '',
          job_title: editingContact.job_title || '',
        } : {}}
      />
    </div>
  );
};

export default CRMContacts;
