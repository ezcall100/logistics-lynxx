import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import {
  Send,
  Phone,
  Video,
  Paperclip,
  MoreHorizontal,
  Clock,
  CheckCheck,
  AlertCircle,
  MapPin,
  Truck,
  User,
  Users,
  Search,
  MessageCircle,
  Star,
  Archive,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'dispatcher' | 'driver' | 'manager';
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'location' | 'image' | 'document';
  urgent?: boolean;
  metadata?: unknown;
}

interface ChatContact {
  id: string;
  name: string;
  role: 'dispatcher' | 'manager' | 'coordinator';
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  department: string;
}

const DispatchChatPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<string>('chat-001');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contacts: ChatContact[] = [
    {
      id: 'chat-001',
      name: 'Sarah Mitchell',
      role: 'dispatcher',
      status: 'online',
      lastMessage: 'Your next pickup is at 2:30 PM',
      lastMessageTime: new Date(2024, 0, 19, 14, 15),
      unreadCount: 2,
      department: 'Operations'
    },
    {
      id: 'chat-002',
      name: 'Mike Rodriguez',
      role: 'manager',
      status: 'online',
      lastMessage: 'Great work on the delivery times this week!',
      lastMessageTime: new Date(2024, 0, 19, 13, 45),
      unreadCount: 0,
      department: 'Fleet Management'
    },
    {
      id: 'chat-003',
      name: 'Jennifer Carter',
      role: 'coordinator',
      status: 'busy',
      lastMessage: 'Route optimization complete',
      lastMessageTime: new Date(2024, 0, 19, 12, 30),
      unreadCount: 1,
      department: 'Logistics'
    },
    {
      id: 'chat-004',
      name: 'David Thompson',
      role: 'dispatcher',
      status: 'offline',
      lastMessage: 'Check your fuel card balance',
      lastMessageTime: new Date(2024, 0, 19, 11, 20),
      unreadCount: 0,
      department: 'Operations'
    }
  ];

  const messages: Record<string, Message[]> = {
    'chat-001': [
      {
        id: 'msg-001',
        senderId: 'sarah-001',
        senderName: 'Sarah Mitchell',
        senderRole: 'dispatcher',
        content: 'Good morning! I have your route assignments for today.',
        timestamp: new Date(2024, 0, 19, 8, 30),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-002',
        senderId: 'driver-001',
        senderName: 'You',
        senderRole: 'driver',
        content: 'Morning Sarah! Ready to get started. What\'s the first pickup?',
        timestamp: new Date(2024, 0, 19, 8, 32),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-003',
        senderId: 'sarah-001',
        senderName: 'Sarah Mitchell',
        senderRole: 'dispatcher',
        content: 'First pickup is at ABC Manufacturing, 1234 Industrial Blvd. Pickup time: 10:00 AM. Load #TMS-2024-0119-001',
        timestamp: new Date(2024, 0, 19, 8, 35),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-004',
        senderId: 'driver-001',
        senderName: 'You',
        senderRole: 'driver',
        content: 'Got it! ETA 9:45 AM. Traffic looks good on I-95.',
        timestamp: new Date(2024, 0, 19, 8, 40),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-005',
        senderId: 'sarah-001',
        senderName: 'Sarah Mitchell',
        senderRole: 'dispatcher',
        content: 'Perfect! Your next pickup is at 2:30 PM at Metro Logistics. I\'ll send the details after you complete the first delivery.',
        timestamp: new Date(2024, 0, 19, 14, 15),
        status: 'delivered',
        type: 'text'
      },
      {
        id: 'msg-006',
        senderId: 'sarah-001',
        senderName: 'Sarah Mitchell',
        senderRole: 'dispatcher',
        content: 'Also, there\'s a weather advisory for your route this afternoon. Please drive safely!',
        timestamp: new Date(2024, 0, 19, 14, 16),
        status: 'sent',
        type: 'text',
        urgent: true
      }
    ],
    'chat-002': [
      {
        id: 'msg-101',
        senderId: 'mike-001',
        senderName: 'Mike Rodriguez',
        senderRole: 'manager',
        content: 'Hey! I wanted to congratulate you on your excellent performance metrics this quarter.',
        timestamp: new Date(2024, 0, 19, 13, 30),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-102',
        senderId: 'driver-001',
        senderName: 'You',
        senderRole: 'driver',
        content: 'Thank you Mike! I\'ve been really focused on efficiency and safety.',
        timestamp: new Date(2024, 0, 19, 13, 35),
        status: 'read',
        type: 'text'
      },
      {
        id: 'msg-103',
        senderId: 'mike-001',
        senderName: 'Mike Rodriguez',
        senderRole: 'manager',
        content: 'It shows! Your delivery times are consistently ahead of schedule and you have zero safety incidents. Great work on the delivery times this week!',
        timestamp: new Date(2024, 0, 19, 13, 45),
        status: 'delivered',
        type: 'text'
      }
    ]
  };

  const currentMessages = useMemo(() => messages[selectedChat] || [], [messages, selectedChat]);
  const currentContact = contacts.find(c => c.id === selectedChat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'driver-001',
      senderName: 'You',
      senderRole: 'driver',
      content: messageInput,
      timestamp: new Date(),
      status: 'sent',
      type: 'text'
    };

    // Mock adding message
    toast({
      title: "Message Sent",
      description: "Your message has been delivered to dispatch.",
    });

    setMessageInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickResponse = (response: string) => {
    setMessageInput(response);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500 fill-current" />;
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const quickResponses = [
    "On my way",
    "Pickup completed",
    "Delivery completed", 
    "Running 15 minutes late",
    "Need assistance",
    "Thank you!"
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 p-6 max-w-7xl mx-auto">
      {/* Chat Sidebar */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Dispatch Chat</CardTitle>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedChat(contact.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent",
                  selectedChat === contact.id && "bg-primary/10 border border-primary/20"
                )}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background",
                    contact.status === 'online' && "bg-green-500",
                    contact.status === 'busy' && "bg-yellow-500",
                    contact.status === 'offline' && "bg-gray-400"
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                    <span className="text-xs text-muted-foreground">
                      {contact.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      {contact.role}
                    </Badge>
                    {contact.unreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs h-4 w-4 p-0 flex items-center justify-center">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentContact ? (
          <>
            {/* Chat Header */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={currentContact.avatar} />
                        <AvatarFallback>{currentContact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={cn(
                        "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
                        currentContact.status === 'online' && "bg-green-500",
                        currentContact.status === 'busy' && "bg-yellow-500",
                        currentContact.status === 'offline' && "bg-gray-400"
                      )} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{currentContact.name}</h2>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {currentContact.role}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{currentContact.department}</span>
                        <span className={cn(
                          "text-xs font-medium",
                          currentContact.status === 'online' && "text-green-600",
                          currentContact.status === 'busy' && "text-yellow-600",
                          currentContact.status === 'offline' && "text-gray-500"
                        )}>
                          {currentContact.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages Area */}
            <Card className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 max-w-[80%]",
                        message.senderId === 'driver-001' ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback className="text-xs">
                          {message.senderId === 'driver-001' ? 'You' : message.senderName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={cn(
                        "flex flex-col gap-1",
                        message.senderId === 'driver-001' ? "items-end" : "items-start"
                      )}>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{message.senderId === 'driver-001' ? 'You' : message.senderName}</span>
                          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        
                        <div className={cn(
                          "rounded-lg px-3 py-2 max-w-md",
                          message.senderId === 'driver-001'
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted",
                          message.urgent && "border-2 border-orange-500"
                        )}>
                          {message.urgent && (
                            <div className="flex items-center gap-1 mb-1">
                              <AlertCircle className="h-3 w-3 text-orange-500" />
                              <span className="text-xs font-medium text-orange-500">URGENT</span>
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                        </div>
                        
                        {message.senderId === 'driver-001' && (
                          <div className="flex items-center gap-1">
                            {getStatusIcon(message.status)}
                            <span className="text-xs text-muted-foreground capitalize">{message.status}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Responses */}
              <div className="p-3 border-t">
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickResponses.map((response) => (
                    <Button
                      key={response}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickResponse(response)}
                      className="text-xs"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="min-h-[40px] max-h-32 resize-none pr-12"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="absolute right-1 bottom-1 h-8 w-8"
                      disabled={!messageInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <Card className="flex-1 flex items-center justify-center">
            <CardContent className="text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a contact from the sidebar to start messaging</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DispatchChatPage;