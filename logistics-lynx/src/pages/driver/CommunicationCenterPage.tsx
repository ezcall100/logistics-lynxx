import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Phone, 
  AlertTriangle, 
  Clock, 
  Send, 
  User,
  Bell,
  Search,
  Filter
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Communication {
  id: string;
  sender_id: string;
  sender_role: string;
  message_type: string;
  subject: string;
  message: string;
  priority: string;
  is_read: boolean;
  created_at: string;
}

const CommunicationCenterPage = () => {
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState({ subject: '', message: '', priority: 'normal' });
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchCommunications();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('driver_communications')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'driver_communications'
      }, () => {
        fetchCommunications();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCommunications]);

  const fetchCommunications = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from('driver_communications')
        .select('*')
        .eq('driver_id', user.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunications(data || []);
    } catch (error) {
      console.error('Error fetching communications:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.subject.trim() || !newMessage.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { error } = await supabase
        .from('driver_communications')
        .insert({
          driver_id: user.user.id,
          sender_id: user.user.id,
          sender_role: 'driver',
          message_type: 'text',
          subject: newMessage.subject,
          message: newMessage.message,
          priority: newMessage.priority
        });

      if (error) throw error;

      setNewMessage({ subject: '', message: '', priority: 'normal' });
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully",
      });
      
      fetchCommunications();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('driver_communications')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', messageId);

      if (error) throw error;

      setCommunications(prev => prev.map(comm => 
        comm.id === messageId ? { ...comm, is_read: true } : comm
      ));
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'instruction': return Bell;
      case 'emergency': return AlertTriangle;
      default: return MessageSquare;
    }
  };

  const filteredCommunications = communications.filter(comm =>
    comm.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comm.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = communications.filter(comm => !comm.is_read).length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Communication Center</h1>
          <p className="text-muted-foreground">Messages, alerts, and communications</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Bell className="w-4 h-4 mr-2" />
            {unreadCount} Unread
          </Badge>
          <Button>
            <Phone className="w-4 h-4 mr-2" />
            Emergency Contact
          </Button>
        </div>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <TabsList>
          <TabsTrigger value="inbox">Inbox ({communications.length})</TabsTrigger>
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Messages List */}
          <div className="space-y-3">
            {filteredCommunications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No messages found</p>
                </CardContent>
              </Card>
            ) : (
              filteredCommunications.map((comm) => {
                const MessageIcon = getMessageTypeIcon(comm.message_type);
                
                return (
                  <Card 
                    key={comm.id} 
                    className={`cursor-pointer transition-colors ${
                      !comm.is_read ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => !comm.is_read && markAsRead(comm.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <MessageIcon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className={`font-medium ${!comm.is_read ? 'font-bold' : ''}`}>
                                {comm.subject}
                              </h4>
                              <Badge className={`${getPriorityColor(comm.priority)} text-white text-xs`}>
                                {comm.priority.toUpperCase()}
                              </Badge>
                              {!comm.is_read && (
                                <Badge variant="default" className="text-xs">NEW</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {comm.message}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <User className="w-3 h-3 mr-1" />
                              <span className="mr-4">{comm.sender_role.replace('_', ' ').toUpperCase()}</span>
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{new Date(comm.created_at).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send New Message</CardTitle>
              <CardDescription>Send a message to dispatch or support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  placeholder="Enter message subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newMessage.priority}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Enter your message"
                  rows={6}
                  value={newMessage.message}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>
              
              <Button onClick={sendMessage} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Important notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communications
                  .filter(comm => comm.message_type === 'alert' || comm.message_type === 'emergency')
                  .map((alert) => (
                    <div key={alert.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <AlertTriangle className={`w-5 h-5 ${
                        alert.priority === 'urgent' ? 'text-red-500' : 'text-orange-500'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{alert.subject}</h4>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                      <Badge className={`${getPriorityColor(alert.priority)} text-white`}>
                        {alert.priority.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                
                {communications.filter(comm => comm.message_type === 'alert' || comm.message_type === 'emergency').length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No alerts at this time</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationCenterPage;