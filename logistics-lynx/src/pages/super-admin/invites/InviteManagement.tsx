import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { InviteUserDialog } from '@/components/invites/InviteUserDialog';
import { InviteStatusCard } from '@/components/invites/InviteStatusCard';
import { 
  getInvitations, 
  getInvitationStats, 
  expireOldInvitations,
  type Invitation,
  type InvitationStats
} from '@/api/invites';
import { 
  UserPlus, 
  Mail, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  RefreshCw,
  BarChart3,
  Users,
  Loader2
} from 'lucide-react';

export default function InviteManagement() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [stats, setStats] = useState<InvitationStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { toast } = useToast();
  const { user } = useAuth();

  // Load invitations and stats
  const loadData = async () => {
    try {
      const [invitationsData, statsData] = await Promise.all([
        getInvitations(),
        getInvitationStats()
      ]);
      
      setInvitations(invitationsData);
      setStats(statsData);
    } catch (error: any) {
      console.error('Load data error:', error);
      toast({
        title: "Load Error",
        description: error.message || "Failed to load invitation data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  // Expire old invitations
  const handleExpireOld = async () => {
    try {
      const expiredCount = await expireOldInvitations();
      
      if (expiredCount > 0) {
        toast({
          title: "Invitations Expired",
          description: `${expiredCount} expired invitations have been updated.`,
        });
        
        // Refresh data to show updated statuses
        await loadData();
      } else {
        toast({
          title: "No Expired Invitations",
          description: "All invitations are current.",
        });
      }
    } catch (error: any) {
      console.error('Expire invitations error:', error);
      toast({
        title: "Expire Error",
        description: error.message || "Failed to expire invitations.",
        variant: "destructive"
      });
    }
  };

  // Handle new invitation sent
  const handleInviteSent = (invitation: Invitation) => {
    setInvitations(prev => [invitation, ...prev]);
    
    // Update stats
    if (stats) {
      setStats({
        ...stats,
        total_invitations: stats.total_invitations + 1,
        pending_invitations: stats.pending_invitations + 1,
        invitations_last_30_days: stats.invitations_last_30_days + 1
      });
    }
  };

  // Handle invitation status change
  const handleInvitationUpdate = (updatedInvitation: Invitation) => {
    setInvitations(prev => 
      prev.map(inv => inv.id === updatedInvitation.id ? updatedInvitation : inv)
    );
    
    // Update stats based on status change
    if (stats) {
      const oldInvitation = invitations.find(inv => inv.id === updatedInvitation.id);
      if (oldInvitation) {
        const newStats = { ...stats };
        
        // Decrease old status count
        if (oldInvitation.status === 'pending') newStats.pending_invitations--;
        else if (oldInvitation.status === 'accepted') newStats.accepted_invitations--;
        else if (oldInvitation.status === 'expired') newStats.expired_invitations--;
        else if (oldInvitation.status === 'cancelled') newStats.cancelled_invitations--;
        
        // Increase new status count
        if (updatedInvitation.status === 'pending') newStats.pending_invitations++;
        else if (updatedInvitation.status === 'accepted') newStats.accepted_invitations++;
        else if (updatedInvitation.status === 'expired') newStats.expired_invitations++;
        else if (updatedInvitation.status === 'cancelled') newStats.cancelled_invitations++;
        
        setStats(newStats);
      }
    }
  };

  // Filter invitations based on search and tab
  const filteredInvitations = invitations.filter(invitation => {
    const matchesSearch = invitation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invitation.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || invitation.status === activeTab;
    
    return matchesSearch && matchesTab;
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invite Management</h1>
          <p className="text-muted-foreground">
            Manage user invitations and track onboarding progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExpireOld}
            disabled={isRefreshing}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Expire Old
          </Button>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={() => setShowInviteDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invitations</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_invitations}</div>
              <p className="text-xs text-muted-foreground">
                {stats.invitations_last_30_days} in last 30 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending_invitations}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting response
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accepted</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.accepted_invitations}</div>
              <p className="text-xs text-muted-foreground">
                Successfully joined
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired/Cancelled</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.expired_invitations + stats.cancelled_invitations}
              </div>
              <p className="text-xs text-muted-foreground">
                No longer active
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invitations List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invitations</CardTitle>
              <CardDescription>
                Manage and track all user invitations
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search invitations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {filteredInvitations.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No invitations found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm ? 'Try adjusting your search terms.' : 'Get started by inviting your first user.'}
                  </p>
                  {!searchTerm && (
                    <Button 
                      onClick={() => setShowInviteDialog(true)}
                      className="mt-4"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite User
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredInvitations.map((invitation) => (
                    <InviteStatusCard
                      key={invitation.id}
                      invitation={invitation}
                      onStatusChange={handleInvitationUpdate}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Invite User Dialog */}
      <InviteUserDialog
        open={showInviteDialog}
        onOpenChange={setShowInviteDialog}
        onInviteSent={handleInviteSent}
      />
    </div>
  );
}
