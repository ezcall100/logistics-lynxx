/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Video,
  Paperclip,
  MoreHorizontal,
  Users,
  Search,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  MapPin,
  Truck,
  Calendar,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender: string;
  senderRole: "driver" | "dispatcher" | "system";
  content: string;
  timestamp: string;
  type: "text" | "location" | "image" | "document";
  status: "sent" | "delivered" | "read";
  priority?: "low" | "normal" | "high" | "urgent";
}

interface ChatThread {
  id: string;
  title: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: "active" | "archived";
  priority: "low" | "normal" | "high" | "urgent";
}

const DispatchChatPage = () => {
  const { toast } = useToast();
  const [activeThread, setActiveThread] = useState("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock chat threads
  const chatThreads: ChatThread[] = [
    {
      id: "1",
      title: "Dispatch Central",
      participants: ["Sarah Johnson (Dispatcher)", "Mike Chen (Safety)"],
      lastMessage: "Route update confirmed for I-35 corridor",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      status: "active",
      priority: "high"
    },
    {
      id: "2",
      title: "Load #TRK-2024-001",
      participants: ["Alex Rodriguez (Dispatcher)"],
      lastMessage: "Delivery confirmation received",
      lastMessageTime: "15 min ago",
      unreadCount: 0,
      status: "active",
      priority: "normal"
    },
    {
      id: "3",
      title: "Fleet Maintenance",
      participants: ["Tom Wilson (Maintenance)"],
      lastMessage: "Oil change scheduled for next Tuesday",
      lastMessageTime: "1 hr ago",
      unreadCount: 1,
      status: "active",
      priority: "normal"
    },
    {
      id: "4",
      title: "Safety Team",
      participants: ["Linda Davis (Safety Director)", "Bob Smith (Training)"],
      lastMessage: "Monthly safety review completed",
      lastMessageTime: "2 hrs ago",
      unreadCount: 0,
      status: "active",
      priority: "low"
    }
  ];

  // Mock messages for active thread
  const messages = useMemo((): Message[] => [
    {
      id: "1",
      sender: "Sarah Johnson",
      senderRole: "dispatcher",
      content: "Good morning! Your route for today has been updated. Please check the new pickup location in Dallas.",
      timestamp: "09:15 AM",
      type: "text",
      status: "read",
      priority: "high"
    },
    {
      id: "2",
      sender: "You",
      senderRole: "driver",
      content: "Received the update. ETA to pickup location is 45 minutes. Traffic is light on I-35.",
      timestamp: "09:18 AM",
      type: "text",
      status: "delivered"
    },
    {
      id: "3",
      sender: "System",
      senderRole: "system",
      content: "Location update: Driver is 15 miles from pickup location",
      timestamp: "09:45 AM",
      type: "location",
      status: "delivered"
    },
    {
      id: "4",
      sender: "Sarah Johnson",
      senderRole: "dispatcher",
      content: "Great! Customer confirmed they'll have the load ready. Please send a photo when you arrive.",
      timestamp: "09:47 AM",
      type: "text",
      status: "read"
    },
    {
      id: "5",
      sender: "You",
      senderRole: "driver",
      content: "Arrived at pickup location. Load is ready and securing now.",
      timestamp: "10:15 AM",
      type: "text",
      status: "sent"
    },
    {
      id: "6",
      sender: "Sarah Johnson",
      senderRole: "dispatcher",
      content: "Route update confirmed for I-35 corridor. Avoid construction zone near mile marker 245.",
      timestamp: "10:18 AM",
      type: "text",
      status: "delivered",
      priority: "urgent"
    }
  ], []);

  const filteredThreads = chatThreads.filter(thread =>
    thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    thread.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been sent to dispatch.",
      });
      setMessageInput("");
    }
  };

  const handleStartCall = (type: "voice" | "video") => {
    toast({
      title: `${type === "voice" ? "Voice" : "Video"} Call Started`,
      description: "Connecting to dispatch...",
    });
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sent": return <Clock className="h-3 w-3 text-gray-400" />;
      case "delivered": return <CheckCircle className="h-3 w-3 text-blue-500" />;
      case "read": return <CheckCircle className="h-3 w-3 text-green-500" />;
      default: return null;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority || priority === "normal") return null;
    
    const colors = {
      low: "bg-gray-100 text-gray-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={colors[priority as keyof typeof colors]}>
        {priority}
      </Badge>
    );
  };

  const quickResponses = [
    "10-4, received",
    "ETA 30 minutes",
    "Load secured, departing now",
    "Arrived at destination",
    "Need assistance",
    "Traffic delay expected"
  ];

  return (
    <div className="w-full max-w-none p-6 h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dispatch Chat</h1>
          <p className="text-muted-foreground">Real-time communication with dispatch team</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
            <DialogTrigger asChild>
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Start New Chat</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="chat-type">Chat Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chat type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dispatch">Dispatch</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="safety">Safety Team</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="chat-subject">Subject</Label>
                  <Input id="chat-subject" placeholder="Brief description..." />
                </div>
                <div>
                  <Label htmlFor="chat-priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setIsNewChatOpen(false)} className="flex-1">
                    Start Chat
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewChatOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Chats
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    activeThread === thread.id ? "bg-primary/10 border-r-2 border-primary" : ""
                  }`}
                  onClick={() => setActiveThread(thread.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{thread.title}</h4>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(thread.priority)}
                      {thread.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                          {thread.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {thread.participants.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{thread.lastMessage}</p>
                  <p className="text-xs text-muted-foreground mt-1">{thread.lastMessageTime}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {chatThreads.find(t => t.id === activeThread)?.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {chatThreads.find(t => t.id === activeThread)?.participants.join(", ")}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleStartCall("voice")}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleStartCall("video")}>
                  <Video className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 space-y-4 overflow-y-auto mb-4 max-h-96">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderRole === "driver" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${message.senderRole === "driver" ? "order-1" : "order-2"}`}>
                    {message.senderRole !== "driver" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {message.sender.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{message.sender}</span>
                        {getPriorityBadge(message.priority)}
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        message.senderRole === "driver"
                          ? "bg-primary text-primary-foreground"
                          : message.senderRole === "system"
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.type === "location" && (
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-xs font-medium">Location Update</span>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      {message.senderRole === "driver" && getMessageStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            <div className="mb-4">
              <Label className="text-xs text-muted-foreground mb-2 block">Quick Responses</Label>
              <div className="flex flex-wrap gap-2">
                {quickResponses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                    onClick={() => setMessageInput(response)}
                  >
                    {response}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DispatchChatPage;