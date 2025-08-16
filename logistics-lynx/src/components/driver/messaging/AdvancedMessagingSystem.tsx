/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  MessageCircle,
  Send,
  Phone,
  Video,
  Image,
  Paperclip,
  Smile,
  Clock,
  CheckCheck,
  AlertCircle,
  Users,
  Search,
  Settings,
  MoreVertical,
  MapPin,
  Truck,
  Package,
  Star,
  Flag,
  Archive,
  Trash2,
  Forward,
  Reply,
  Edit3,
  Mic,
  MicOff,
  Camera,
  FileText,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  phone: string;
  email?: string;
  company: string;
  isOnline: boolean;
  lastSeen?: string;
  priority: 'high' | 'medium' | 'low';
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'location' | 'audio';
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
  isImportant?: boolean;
  replyTo?: string;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
  type: 'dispatch' | 'customer' | 'emergency' | 'general';
}

interface AdvancedMessagingSystemProps {
  contactName: string;
  contactPhone: string;
  contactRole?: string;
  company?: string;
  isEmergency?: boolean;
  loadNumber?: string;
  stopType?: 'pickup' | 'delivery';
}

export const AdvancedMessagingSystem: React.FC<AdvancedMessagingSystemProps> = ({
  contactName,
  contactPhone,
  contactRole = 'Contact',
  company = '',
  isEmergency = false,
  loadNumber,
  stopType
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messageText, setMessageText] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: contactName,
      role: contactRole,
      phone: contactPhone,
      company: company,
      isOnline: true,
      priority: isEmergency ? 'high' : 'medium'
    },
    {
      id: '2',
      name: 'Dispatch Center',
      role: 'Dispatcher',
      phone: '+1-555-DISPATCH',
      company: 'TMS Central',
      isOnline: true,
      priority: 'high'
    },
    {
      id: '3',
      name: 'Emergency Response',
      role: 'Emergency Operator',
      phone: '+1-555-EMERGENCY',
      company: 'Safety Services',
      isOnline: true,
      priority: 'high'
    }
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participants: ['current-user', '1'],
      lastMessage: {
        id: 'msg1',
        senderId: '1',
        receiverId: 'current-user',
        content: 'Ready for pickup at dock 3',
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
        status: 'read'
      },
      unreadCount: 1,
      isGroup: false,
      type: 'customer'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg1',
      senderId: '1',
      receiverId: 'current-user',
      content: 'Ready for pickup at dock 3',
      timestamp: new Date(Date.now() - 300000),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg2',
      senderId: 'current-user',
      receiverId: '1',
      content: 'On my way, ETA 15 minutes',
      timestamp: new Date(Date.now() - 180000),
      type: 'text',
      status: 'delivered'
    }
  ]);

  const quickReplies = [
    'On my way',
    'Running 10 minutes late',
    'Arrived at location',
    'Pickup completed',
    'Delivery completed',
    'Need assistance',
    'Waiting for instructions',
    'Traffic delay'
  ];

  const emojis = ['👍', '👎', '✅', '❌', '🚛', '📦', '🕒', '⚠️', '🆘', '📍'];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      receiverId: selectedConversation || '1',
      content: messageText,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    // Update conversation
    setConversations(prev => prev.map(conv => 
      conv.id === (selectedConversation || '1') 
        ? { ...conv, lastMessage: newMessage }
        : conv
    ));

    toast({
      title: "Message Sent",
      description: `Message sent to ${contactName}`,
    });

    // Simulate delivery confirmation
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id 
          ? { ...msg, status: 'delivered' }
          : msg
      ));
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setMessageText(reply);
  };

  const handleVoiceCall = () => {
    window.open(`tel:${contactPhone}`, '_self');
    toast({
      title: "Initiating Call",
      description: `Calling ${contactName} at ${contactPhone}`,
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Video Call",
      description: "Video calling feature coming soon",
    });
  };

  const handleFileAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,application/pdf,.doc,.docx';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        toast({
          title: "Files Selected",
          description: `${files.length} file(s) ready to send`,
        });
      }
    };
    input.click();
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: 'current-user',
            receiverId: selectedConversation || '1',
            content: `📍 Current Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            timestamp: new Date(),
            type: 'location',
            status: 'sent'
          };
          setMessages(prev => [...prev, locationMessage]);
          toast({
            title: "Location Shared",
            description: "Current location sent successfully",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to access location",
            variant: "destructive"
          });
        }
      );
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording Started",
        description: "Voice message recording...",
      });
    } else {
      toast({
        title: "Recording Stopped",
        description: "Voice message ready to send",
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-green-500" />;
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          variant={isEmergency ? "destructive" : "outline"}
          className={cn(
            "relative transition-all duration-200 hover:scale-105",
            isEmergency && "animate-pulse bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          )}
        >
          <MessageCircle className="w-4 h-4 mr-1" />
          {isEmergency ? 'Emergency' : 'Message'}
          {isEmergency && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Messaging Center
              </span>
              {loadNumber && (
                <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">
                  Load: {loadNumber}
                </Badge>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Communicate with contacts, dispatch, and emergency services
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 flex h-full">
          {/* Contacts Sidebar */}
          <div className="w-80 border-r border-border bg-muted/20">
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs defaultValue="contacts">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="conversations">Chats</TabsTrigger>
                </TabsList>

                <TabsContent value="contacts" className="mt-4">
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent",
                            selectedConversation === contact.id && "bg-accent"
                          )}
                          onClick={() => setSelectedConversation(contact.id)}
                        >
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm">
                                {contact.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {contact.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{contact.name}</p>
                              {contact.priority === 'high' && (
                                <Flag className="w-3 h-3 text-red-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground truncate">{contact.role}</p>
                              <Badge variant="outline" className="text-xs">
                                {contact.company}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="conversations" className="mt-4">
                  <ScrollArea className="h-96">
                    <div className="space-y-2">
                      {conversations.map((conv) => {
                        const contact = contacts.find(c => conv.participants.includes(c.id));
                        return (
                          <div
                            key={conv.id}
                            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent"
                            onClick={() => setSelectedConversation(conv.id)}
                          >
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm">
                                {contact?.name.split(' ').map(n => n[0]).join('') || 'GC'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{contact?.name || 'Group Chat'}</p>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(conv.lastMessage.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {conv.lastMessage.content}
                              </p>
                            </div>
                            {conv.unreadCount > 0 && (
                              <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/10">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white">
                        {contactName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{contactName}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        Online • {company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={handleVoiceCall}>
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleVideoCall}>
                      <Video className="w-4 h-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="space-y-1">
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Star className="w-4 h-4 mr-2" />
                            Add to Favorites
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Archive className="w-4 h-4 mr-2" />
                            Archive Chat
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Chat
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isOwnMessage = message.senderId === 'current-user';
                      return (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-3 max-w-[80%]",
                            isOwnMessage ? "ml-auto" : ""
                          )}
                        >
                          {!isOwnMessage && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs">
                                {contactName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "px-4 py-2 rounded-2xl max-w-full",
                              isOwnMessage
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm"
                                : "bg-muted rounded-bl-sm"
                            )}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div className={cn(
                              "flex items-center gap-1 mt-1",
                              isOwnMessage ? "justify-end" : "justify-start"
                            )}>
                              <span className={cn(
                                "text-xs",
                                isOwnMessage ? "text-blue-100" : "text-muted-foreground"
                              )}>
                                {formatTime(message.timestamp)}
                              </span>
                              {isOwnMessage && getMessageStatusIcon(message.status)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Quick Replies */}
                <div className="px-4 py-2 border-t border-border/50">
                  <ScrollArea className="w-full">
                    <div className="flex gap-2 pb-2">
                      {quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="whitespace-nowrap text-xs"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border space-y-3">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="min-h-[40px] max-h-32 resize-none pr-24"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <div className="absolute right-2 bottom-2 flex items-center gap-1">
                        <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Smile className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-2">
                            <div className="grid grid-cols-8 gap-1">
                              {emojis.map((emoji, index) => (
                                <Button
                                  key={index}
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => {
                                    setMessageText(prev => prev + emoji);
                                    setShowEmojiPicker(false);
                                  }}
                                >
                                  {emoji}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleFileAttachment}
                        className="h-10 w-10 p-0"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLocationShare}
                        className="h-10 w-10 p-0"
                      >
                        <MapPin className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleRecording}
                        className={cn(
                          "h-10 w-10 p-0",
                          isRecording && "bg-red-100 text-red-600"
                        )}
                      >
                        {isRecording ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="h-10 w-10 p-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {isRecording && (
                    <div className="flex items-center gap-2 text-red-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm">Recording voice message...</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <MessageCircle className="w-10 h-10 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Select a Contact</h3>
                    <p className="text-muted-foreground">Choose a contact to start messaging</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};