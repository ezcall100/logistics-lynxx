import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Users,
  Clock,
  History,
  Star,
  AlertTriangle,
  Settings,
  MoreVertical,
  UserPlus,
  Calendar,
  FileText,
  Download,
  Share,
  Search,
  Filter,
  Headphones,
  Radio,
  Wifi,
  WifiOff,
  Signal,
  Battery,
  MapPin,
  Truck,
  Package,
  Shield,
  Zap,
  Bot,
  Sparkles,
  PlayCircle,
  PauseCircle,
  SkipForward,
  SkipBack,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface CallRecord {
  id: string;
  contactName: string;
  contactPhone: string;
  company: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: number;
  timestamp: Date;
  callQuality: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
  loadNumber?: string;
  isEmergency?: boolean;
  hasRecording?: boolean;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  company: string;
  role: string;
  avatar?: string;
  isOnline: boolean;
  priority: 'high' | 'medium' | 'low';
  isEmergency?: boolean;
  alternativeNumbers?: string[];
  preferredContactTime?: string;
}

interface AdvancedCallingSystemProps {
  contactName: string;
  contactPhone: string;
  company?: string;
  isEmergency?: boolean;
  loadNumber?: string;
  onCallComplete?: (callData: unknown) => void;
}

export const AdvancedCallingSystem: React.FC<AdvancedCallingSystemProps> = ({
  contactName,
  contactPhone,
  company = '',
  isEmergency = false,
  loadNumber,
  onCallComplete
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('call');
  const [isInCall, setIsInCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [callQuality, setCallQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('excellent');
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [emergencyCountdown, setEmergencyCountdown] = useState(0);
  const [emergencyType, setEmergencyType] = useState<'medical' | 'fire' | 'police' | 'roadside' | ''>('');
  const [isEmergencyConfirmed, setIsEmergencyConfirmed] = useState(false);
  const [emergencyLocation, setEmergencyLocation] = useState('');
  const [emergencyDetails, setEmergencyDetails] = useState('');
  const [isHoldingEmergency, setIsHoldingEmergency] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [callNotes, setCallNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [showKeyDialog, setShowKeyDialog] = useState(false);
  const emergencyCountdownRef = useRef<NodeJS.Timeout>();
  const holdTimerRef = useRef<NodeJS.Timeout>();

  // AI Voice Assistant placeholder (ElevenLabs integration can be added later)
  const conversation = {
    status: 'disconnected' as 'connected' | 'disconnected',
    startSession: async (config: unknown) => {
      toast({
        title: "AI Assistant",
        description: "AI voice assistant feature coming soon",
      });
    },
    endSession: async () => {
      toast({
        title: "AI Assistant",
        description: "Session ended",
      });
    },
    setVolume: async (config: unknown) => {
      toast({
        title: "Volume Adjusted",
        description: "AI assistant volume updated",
      });
    }
  };

  // Mock data
  const [callHistory] = useState<CallRecord[]>([
    {
      id: '1',
      contactName: 'Dispatch Center',
      contactPhone: '+1-555-DISPATCH',
      company: 'TMS Central',
      type: 'outgoing',
      duration: 180,
      timestamp: new Date(Date.now() - 3600000),
      callQuality: 'excellent',
      notes: 'Route update confirmed',
      loadNumber: 'LD-123456'
    },
    {
      id: '2',
      contactName: contactName,
      contactPhone: contactPhone,
      company: company,
      type: 'incoming',
      duration: 120,
      timestamp: new Date(Date.now() - 7200000),
      callQuality: 'good',
      notes: 'Delivery instructions received'
    }
  ]);

  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: contactName,
      phone: contactPhone,
      company: company,
      role: 'Customer Contact',
      isOnline: true,
      priority: isEmergency ? 'high' : 'medium'
    },
    {
      id: '3',
      name: 'Dispatch Center',
      phone: '+1-555-DISPATCH',
      company: 'TMS Central',
      role: 'Dispatcher',
      isOnline: true,
      priority: 'high'
    },
    {
      id: '4',
      name: 'Roadside Assistance',
      phone: '+1-800-ROADHELP',
      company: 'Emergency Services',
      role: 'Support Team',
      isOnline: true,
      priority: 'medium'
    }
  ]);

  // Emergency contact configuration with safety protocols
  const emergencyContacts = [
    {
      id: 'medical',
      name: 'Medical Emergency',
      number: '911',
      description: 'Life-threatening medical situations',
      icon: '🚑',
      color: 'red',
      requiresDetails: true
    },
    {
      id: 'fire',
      name: 'Fire Emergency',
      number: '911',
      description: 'Fire, explosion, or hazardous materials',
      icon: '🚒',
      color: 'red',
      requiresDetails: true
    },
    {
      id: 'police',
      name: 'Police Emergency',
      number: '911',
      description: 'Crime, accident, or immediate danger',
      icon: '🚔',
      color: 'red',
      requiresDetails: true
    },
    {
      id: 'roadside',
      name: 'Roadside Assistance',
      number: '+1-800-ROADHELP',
      description: 'Vehicle breakdown or minor issues',
      icon: '🔧',
      color: 'yellow',
      requiresDetails: false
    }
  ];

  const callTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isInCall) {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [isInCall]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Enhanced emergency calling with safety protocols
  const handleEmergencyClick = (type: string) => {
    setEmergencyType(type as unknown);
    setShowEmergencyDialog(true);
    setIsEmergencyConfirmed(false);
    setEmergencyCountdown(0);
    setEmergencyLocation('');
    setEmergencyDetails('');
  };

  const startEmergencyCountdown = () => {
    if (!isEmergencyConfirmed || !emergencyType) return;
    
    setEmergencyCountdown(10); // 10 second countdown
    emergencyCountdownRef.current = setInterval(() => {
      setEmergencyCountdown(prev => {
        if (prev <= 1) {
          clearInterval(emergencyCountdownRef.current!);
          placeEmergencyCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelEmergencyCall = () => {
    if (emergencyCountdownRef.current) {
      clearInterval(emergencyCountdownRef.current);
    }
    setEmergencyCountdown(0);
    setShowEmergencyDialog(false);
    setIsEmergencyConfirmed(false);
    toast({
      title: "Emergency Call Cancelled",
      description: "Call has been safely cancelled",
    });
  };

  const placeEmergencyCall = () => {
    const emergency = emergencyContacts.find(e => e.id === emergencyType);
    if (!emergency) return;

    setShowEmergencyDialog(false);
    setIsInCall(true);
    
    // Log emergency call for records
    const emergencyLog = {
      type: emergencyType,
      location: emergencyLocation,
      details: emergencyDetails,
      timestamp: new Date(),
      loadNumber
    };
    
    console.log('Emergency call placed:', emergencyLog);
    
    // Place actual call
    window.open(`tel:${emergency.number}`, '_self');
    
    toast({
      title: `${emergency.name} Called`,
      description: `Connected to ${emergency.number}`,
      variant: "destructive"
    });
  };

  // Hold-to-call mechanism for emergencies
  const startHoldToCall = (type: string) => {
    setIsHoldingEmergency(true);
    setEmergencyType(type as unknown);
    setHoldProgress(0);
    
    const duration = 3000; // 3 seconds to hold
    const interval = 50; // Update every 50ms
    let progress = 0;
    
    holdTimerRef.current = setInterval(() => {
      progress += (interval / duration) * 100;
      setHoldProgress(progress);
      
      if (progress >= 100) {
        clearInterval(holdTimerRef.current!);
        setIsHoldingEmergency(false);
        handleEmergencyClick(type);
      }
    }, interval);
  };

  const stopHoldToCall = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
    }
    setIsHoldingEmergency(false);
    setHoldProgress(0);
    setEmergencyType('');
  };

  const handleStartCall = async (phone: string, isVideo: boolean = false) => {
    setIsInCall(true);
    setCallDuration(0);
    setIsVideoEnabled(isVideo);
    
    // Simulate connection delay
    setTimeout(() => {
      // For actual phone calls, use the tel: protocol
      if (!isVideo) {
        window.open(`tel:${phone}`, '_self');
      }
      
      toast({
        title: isVideo ? "Video Call Started" : "Call Started",
        description: `Connected to ${contactName}`,
      });
    }, 1000);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCallDuration(0);
    setIsVideoEnabled(false);
    
    const callData = {
      contactName,
      contactPhone,
      duration: callDuration,
      notes: callNotes,
      quality: callQuality,
      timestamp: new Date(),
      loadNumber
    };

    onCallComplete?.(callData);
    
    toast({
      title: "Call Ended",
      description: `Call duration: ${formatDuration(callDuration)}`,
    });
  };

  const startAIAssistant = async () => {
    if (!elevenLabsKey) {
      setShowKeyDialog(true);
      return;
    }

    try {
      setShowAIAssistant(true);
      // Start AI conversation with ElevenLabs
      // Note: You'll need to configure this with your ElevenLabs agent
      await conversation.startSession({
        agentId: 'your-agent-id', // Replace with actual agent ID
        // For signed URLs, use the signed URL from your backend
      });
    } catch (error) {
      toast({
        title: "AI Assistant Error",
        description: "Failed to start AI voice assistant",
        variant: "destructive"
      });
    }
  };

  const getCallTypeIcon = (type: CallRecord['type']) => {
    switch (type) {
      case 'incoming':
        return <Phone className="w-4 h-4 text-green-500" />;
      case 'outgoing':
        return <PhoneCall className="w-4 h-4 text-blue-500" />;
      case 'missed':
        return <PhoneOff className="w-4 h-4 text-red-500" />;
    }
  };

  const getQualityColor = (quality: CallRecord['callQuality']) => {
    switch (quality) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'fair':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
    }
  };

  return (
    <>
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
            <Phone className="w-4 h-4 mr-1" />
            {isEmergency ? 'Emergency' : 'Call'}
            {isEmergency && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
            )}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-6xl h-[85vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-4">
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Advanced Communication Hub
                </span>
                {loadNumber && (
                  <Badge className="ml-2 bg-green-100 text-green-700 text-xs">
                    Load: {loadNumber}
                  </Badge>
                )}
              </div>
            </DialogTitle>
            <DialogDescription>
              Voice calls, video conferencing, AI assistance, and emergency services
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 flex">
            {/* Active Call Interface */}
            {isInCall ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-2xl">
                      <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-3xl">
                        {contactName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-500 text-white animate-pulse">
                        Connected
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">{contactName}</h2>
                    <p className="text-lg text-muted-foreground">{company}</p>
                    <p className="text-sm text-muted-foreground">{contactPhone}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-3xl font-mono font-bold text-green-600">
                      {formatDuration(callDuration)}
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className={cn("w-2 h-2 rounded-full", getQualityColor(callQuality))} />
                      <span className="text-sm text-muted-foreground capitalize">
                        {callQuality} quality
                      </span>
                    </div>
                  </div>

                  {/* Call Controls */}
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button
                      variant={isMuted ? "destructive" : "outline"}
                      size="lg"
                      className="w-12 h-12 rounded-full"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>

                    <Button
                      variant={isSpeakerOn ? "default" : "outline"}
                      size="lg"
                      className="w-12 h-12 rounded-full"
                      onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    >
                      {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </Button>

                    <Button
                      variant="destructive"
                      size="lg"
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      onClick={handleEndCall}
                    >
                      <PhoneOff className="w-6 h-6" />
                    </Button>

                    <Button
                      variant={isVideoEnabled ? "default" : "outline"}
                      size="lg"
                      className="w-12 h-12 rounded-full"
                      onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                    >
                      {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </Button>

                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="lg"
                      className="w-12 h-12 rounded-full"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                    </Button>
                  </div>

                  {/* Additional Features */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={startAIAssistant}
                      className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      AI Assistant
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Person
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="w-4 h-4 mr-2" />
                      Share Screen
                    </Button>
                  </div>

                  {/* Call Notes */}
                  <div className="w-full max-w-md mx-auto mt-6">
                    <Label htmlFor="call-notes" className="text-sm font-medium">
                      Call Notes
                    </Label>
                    <Textarea
                      id="call-notes"
                      placeholder="Add notes about this call..."
                      value={callNotes}
                      onChange={(e) => setCallNotes(e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                  <div className="border-b border-border px-6">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="call">Quick Call</TabsTrigger>
                      <TabsTrigger value="contacts">Contacts</TabsTrigger>
                      <TabsTrigger value="history">Call History</TabsTrigger>
                      <TabsTrigger value="ai">AI Assistant</TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="flex-1 p-6">
                    <TabsContent value="call" className="space-y-6 h-full">
                      <div className="text-center space-y-6">
                        <div className="relative">
                          <Avatar className="w-24 h-24 mx-auto">
                            <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-2xl">
                              {contactName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <div>
                          <h2 className="text-xl font-bold">{contactName}</h2>
                          <p className="text-muted-foreground">{company}</p>
                          <p className="text-sm text-muted-foreground">{contactPhone}</p>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                          <Button
                            size="lg"
                            className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                            onClick={() => handleStartCall(contactPhone)}
                          >
                            <Phone className="w-6 h-6" />
                          </Button>

                          <Button
                            variant="outline"
                            size="lg"
                            className="w-16 h-16 rounded-full"
                            onClick={() => handleStartCall(contactPhone, true)}
                          >
                            <Video className="w-6 h-6" />
                          </Button>
                        </div>

                        {/* Emergency Services - Separate Section */}
                        <div className="border-t pt-6 mt-6">
                          <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <h3 className="font-semibold text-red-600">Emergency Services</h3>
                          </div>
                          <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800 mb-4">
                            <p className="text-sm text-red-700 dark:text-red-300 mb-2 font-medium">
                              ⚠️ IMPORTANT SAFETY NOTICE
                            </p>
                            <p className="text-xs text-red-600 dark:text-red-400">
                              Emergency calls require multiple confirmations to prevent accidental dialing. 
                              Only use for genuine emergencies. False alarms may result in penalties.
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-3">
                            {emergencyContacts.map((emergency) => (
                              <Card 
                                key={emergency.id}
                                className={cn(
                                  "relative overflow-hidden transition-all duration-200",
                                  emergency.color === 'red' 
                                    ? "border-red-200 hover:border-red-300 hover:shadow-lg" 
                                    : "border-yellow-200 hover:border-yellow-300 hover:shadow-lg"
                                )}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                                        emergency.color === 'red' 
                                          ? "bg-red-100 dark:bg-red-950/30" 
                                          : "bg-yellow-100 dark:bg-yellow-950/30"
                                      )}>
                                        {emergency.icon}
                                      </div>
                                      <div>
                                        <h4 className="font-semibold">{emergency.name}</h4>
                                        <p className="text-sm text-muted-foreground">{emergency.description}</p>
                                        <p className="text-xs font-mono text-muted-foreground">{emergency.number}</p>
                                      </div>
                                    </div>
                                    
                                    {emergency.color === 'red' ? (
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        className="relative"
                                        onMouseDown={() => startHoldToCall(emergency.id)}
                                        onMouseUp={stopHoldToCall}
                                        onMouseLeave={stopHoldToCall}
                                        onTouchStart={() => startHoldToCall(emergency.id)}
                                        onTouchEnd={stopHoldToCall}
                                      >
                                        {isHoldingEmergency && emergencyType === emergency.id ? (
                                          <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full border-2 border-white relative">
                                              <div 
                                                className="absolute inset-0 rounded-full bg-white transition-all duration-75"
                                                style={{ 
                                                  clipPath: `polygon(50% 50%, 50% 0%, ${
                                                    50 + (holdProgress / 100) * 50 * Math.cos(2 * Math.PI * holdProgress / 100)
                                                  }% ${
                                                    50 - (holdProgress / 100) * 50 * Math.sin(2 * Math.PI * holdProgress / 100)
                                                  }%, 50% 50%)`
                                                }}
                                              />
                                            </div>
                                            <span className="text-xs">Hold...</span>
                                          </div>
                                        ) : (
                                          <>
                                            <Shield className="w-4 h-4 mr-1" />
                                            <span className="text-xs">Hold to Call</span>
                                          </>
                                        )}
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleStartCall(emergency.number)}
                                        className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                                      >
                                        <Phone className="w-4 h-4 mr-1" />
                                        Call
                                      </Button>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="contacts" className="h-full">
                      <ScrollArea className="h-full">
                        <div className="space-y-3">
                          {contacts.filter(c => !c.isEmergency).map((contact) => (
                            <Card key={contact.id} className="p-4 hover:shadow-lg transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <Avatar className="w-12 h-12">
                                      <AvatarFallback className={cn(
                                        "text-white text-sm",
                                        contact.isEmergency 
                                          ? "bg-gradient-to-r from-red-400 to-red-500"
                                          : "bg-gradient-to-r from-blue-400 to-green-500"
                                      )}>
                                        {contact.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    {contact.isOnline && (
                                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold">{contact.name}</h3>
                                    <p className="text-sm text-muted-foreground">{contact.role}</p>
                                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {contact.priority === 'high' && (
                                    <Badge variant="destructive" className="text-xs">Priority</Badge>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleStartCall(contact.phone)}
                                  >
                                    <Phone className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleStartCall(contact.phone, true)}
                                  >
                                    <Video className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="history" className="h-full">
                      <ScrollArea className="h-full">
                        <div className="space-y-3">
                          {callHistory.map((call) => (
                            <Card key={call.id} className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {getCallTypeIcon(call.type)}
                                  <div>
                                    <h3 className="font-semibold">{call.contactName}</h3>
                                    <p className="text-sm text-muted-foreground">{call.company}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <span>{call.timestamp.toLocaleDateString()}</span>
                                      <span>•</span>
                                      <span>{formatDuration(call.duration)}</span>
                                      <span>•</span>
                                      <span className={getQualityColor(call.callQuality)}>
                                        {call.callQuality}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {call.hasRecording && (
                                    <Button size="sm" variant="ghost">
                                      <PlayCircle className="w-3 h-3" />
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleStartCall(call.contactPhone)}
                                  >
                                    <Phone className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              {call.notes && (
                                <p className="text-sm text-muted-foreground mt-2 pl-6">
                                  "{call.notes}"
                                </p>
                              )}
                            </Card>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="ai" className="space-y-6 h-full">
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                          <Bot className="w-10 h-10 text-purple-600" />
                        </div>
                        
                        <div>
                          <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                            AI Voice Assistant
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                          </h2>
                          <p className="text-muted-foreground">
                            Powered by ElevenLabs - Real-time voice AI assistance
                          </p>
                        </div>

                        {conversation.status === 'connected' ? (
                          <div className="space-y-4">
                            <Badge className="bg-green-100 text-green-700">
                              AI Assistant Active
                            </Badge>
                            <div className="flex items-center justify-center gap-4">
                              <Button
                                variant="outline"
                                onClick={() => conversation.endSession()}
                              >
                                <PhoneOff className="w-4 h-4 mr-2" />
                                End Session
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => conversation.setVolume({ volume: 0.5 })}
                              >
                                <Volume2 className="w-4 h-4 mr-2" />
                                Adjust Volume
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Button
                              size="lg"
                              onClick={startAIAssistant}
                              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                            >
                              <Bot className="w-5 h-5 mr-2" />
                              Start AI Assistant
                            </Button>
                            <p className="text-sm text-muted-foreground">
                              Get help with navigation, documentation, and emergency assistance
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                          <Card className="p-4">
                            <h3 className="font-semibold mb-2">AI Features</h3>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Real-time voice translation</li>
                              <li>• Navigation assistance</li>
                              <li>• Emergency protocols</li>
                              <li>• Load documentation help</li>
                              <li>• Weather and traffic updates</li>
                            </ul>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Emergency Call Dialog with Multiple Safety Checks */}
      <AlertDialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              Emergency Call Verification
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are initiating an emergency call. Please verify the details and confirm this is a genuine emergency.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Emergency Type Selection */}
            <div>
              <Label className="text-sm font-medium text-red-700">Emergency Type</Label>
              <div className="mt-2">
                {emergencyContacts.filter(e => e.color === 'red').map((emergency) => (
                  <div 
                    key={emergency.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all",
                      emergencyType === emergency.id 
                        ? "border-red-500 bg-red-50 dark:bg-red-950/20" 
                        : "border-gray-200 hover:border-red-300"
                    )}
                    onClick={() => setEmergencyType(emergency.id as unknown)}
                  >
                    <div className="text-2xl">{emergency.icon}</div>
                    <div>
                      <p className="font-medium">{emergency.name}</p>
                      <p className="text-sm text-muted-foreground">{emergency.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Information */}
            <div>
              <Label htmlFor="emergency-location" className="text-sm font-medium text-red-700">
                Current Location *
              </Label>
              <Input
                id="emergency-location"
                placeholder="Enter your current location (highway, mile marker, address)"
                value={emergencyLocation}
                onChange={(e) => setEmergencyLocation(e.target.value)}
                className="mt-1"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Be as specific as possible to help emergency responders find you
              </p>
            </div>

            {/* Emergency Details */}
            <div>
              <Label htmlFor="emergency-details" className="text-sm font-medium text-red-700">
                Emergency Details *
              </Label>
              <Textarea
                id="emergency-details"
                placeholder="Describe the emergency situation..."
                value={emergencyDetails}
                onChange={(e) => setEmergencyDetails(e.target.value)}
                className="mt-1"
                rows={3}
                required
              />
            </div>

            {/* Safety Confirmation */}
            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="emergency-confirm"
                  checked={isEmergencyConfirmed}
                  onChange={(e) => setIsEmergencyConfirmed(e.target.checked)}
                  className="mt-1"
                />
                <Label htmlFor="emergency-confirm" className="text-sm leading-relaxed">
                  <span className="font-medium text-red-700">I confirm this is a genuine emergency</span><br />
                  I understand that false emergency calls may result in penalties and divert resources from real emergencies.
                  I have provided accurate location and situation details.
                </Label>
              </div>
            </div>

            {/* Countdown Display */}
            {emergencyCountdown > 0 && (
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-red-600 font-mono">
                  {emergencyCountdown}
                </div>
                <p className="text-red-700 font-medium">
                  Emergency call will be placed in {emergencyCountdown} seconds
                </p>
                <Button 
                  variant="outline" 
                  onClick={cancelEmergencyCall}
                  className="bg-white border-red-300 text-red-700 hover:bg-red-50"
                >
                  Cancel Emergency Call
                </Button>
              </div>
            )}
          </div>
          
          <AlertDialogFooter>
            {emergencyCountdown === 0 ? (
              <>
                <AlertDialogCancel onClick={() => {
                  setShowEmergencyDialog(false);
                  setIsEmergencyConfirmed(false);
                }}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={startEmergencyCountdown}
                  disabled={!isEmergencyConfirmed || !emergencyType || !emergencyLocation.trim() || !emergencyDetails.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Start Emergency Call (10s countdown)
                </AlertDialogAction>
              </>
            ) : (
              <div className="w-full text-center">
                <p className="text-sm text-muted-foreground">
                  Call will be placed automatically unless cancelled
                </p>
              </div>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ElevenLabs API Key Dialog */}
      <AlertDialog open={showKeyDialog} onOpenChange={setShowKeyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ElevenLabs API Key Required</AlertDialogTitle>
            <AlertDialogDescription>
              To use the AI Voice Assistant, please enter your ElevenLabs API key.
              You can get one from your ElevenLabs dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter your ElevenLabs API key..."
              value={elevenLabsKey}
              onChange={(e) => setElevenLabsKey(e.target.value)}
              type="password"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowKeyDialog(false);
                startAIAssistant();
              }}
              disabled={!elevenLabsKey.trim()}
            >
              Save & Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};