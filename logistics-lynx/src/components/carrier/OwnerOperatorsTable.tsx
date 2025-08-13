import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  Building, 
  ExternalLink, 
  Mail, 
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OwnerOperator {
  user_id: string;
  name: string;
  email: string;
  company_name?: string;
  mc_number?: string;
  dot_number?: string;
  last_login?: string;
  created_at: string;
  phone?: string;
  status?: string;
}

const OwnerOperatorsTable = () => {
  const [ownerOperators, setOwnerOperators] = useState<OwnerOperator[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOwnerOperators();
  }, []);

  const fetchOwnerOperators = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'owner_operator')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOwnerOperators(data || []);
    } catch (error) {
      console.error('Error fetching owner operators:', error);
      toast({
        title: "Error",
        description: "Failed to fetch owner operators",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge variant="outline">Active</Badge>;
    }
  };

  const openOwnerOperatorPortal = (userId?: string) => {
    const baseUrl = window.location.origin;
    const portalUrl = userId ? `${baseUrl}/owner-operator?user=${userId}` : `${baseUrl}/owner-operator`;
    window.open(portalUrl, '_blank');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Owner-Operators
          </CardTitle>
          <CardDescription>Loading owner-operators...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          All Owner-Operators ({ownerOperators.length})
        </CardTitle>
        <CardDescription>
          Manage and monitor all owner-operators in your network
        </CardDescription>
      </CardHeader>
      <CardContent>
        {ownerOperators.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No owner-operators found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get started by inviting owner-operators to your network.
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Owner-Operator</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>DOT/MC Numbers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ownerOperators.map((ownerOp) => (
                  <TableRow key={ownerOp.user_id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{ownerOp.name}</span>
                        <span className="text-sm text-muted-foreground">
                          Joined {new Date(ownerOp.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {ownerOp.email}
                        </div>
                        {ownerOp.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {ownerOp.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {ownerOp.company_name ? (
                        <div className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          <span className="text-sm">{ownerOp.company_name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not provided</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {ownerOp.dot_number && (
                          <span className="text-sm">DOT: {ownerOp.dot_number}</span>
                        )}
                        {ownerOp.mc_number && (
                          <span className="text-sm">MC: {ownerOp.mc_number}</span>
                        )}
                        {!ownerOp.dot_number && !ownerOp.mc_number && (
                          <span className="text-sm text-muted-foreground">Not provided</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(ownerOp.status)}</TableCell>
                    <TableCell>
                      {ownerOp.last_login ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {new Date(ownerOp.last_login).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openOwnerOperatorPortal(ownerOp.user_id)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Portal
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OwnerOperatorsTable;