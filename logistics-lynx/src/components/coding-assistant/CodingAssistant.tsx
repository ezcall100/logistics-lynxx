import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Code, 
  Send, 
  Copy, 
  Lightbulb, 
  Bug, 
  Database,
  Palette,
  Server,
  Loader2,
  Minimize2,
  Maximize2,
  X
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeType?: string;
}

interface CodingAssistantProps {
  userRole?: string;
  currentContext?: string;
  onMinimize?: () => void;
  onClose?: () => void;
  isMinimized?: boolean;
}

export const CodingAssistant: React.FC<CodingAssistantProps> = ({
  userRole = 'developer',
  currentContext,
  onMinimize,
  onClose,
  isMinimized = false
}) => {
  console.log('CodingAssistant component props:', { userRole, currentContext, isMinimized });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCodeType, setSelectedCodeType] = useState<string>('general');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const codeTypes = [
    { id: 'frontend', label: 'Frontend/UI', icon: Palette },
    { id: 'backend', label: 'Backend/API', icon: Server },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'debug', label: 'Debug/Fix', icon: Bug },
    { id: 'general', label: 'General', icon: Code },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    console.log('🤖 sendMessage called with input:', input, 'isLoading:', isLoading);
    if (!input.trim() || isLoading) {
      console.log('❌ Cannot send message - empty input or loading');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      codeType: selectedCodeType
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('coding-assistant', {
        body: {
          prompt: input,
          context: currentContext,
          codeType: selectedCodeType,
          userRole,
          currentFile: null, // Could be enhanced to include current file context
          errorMessage: selectedCodeType === 'debug' ? input : null
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response,
        timestamp: new Date(),
        codeType: selectedCodeType
      };

      setMessages(prev => [...prev, assistantMessage]);

      toast({
        title: "✨ Code assistance provided",
        description: "AI assistant has generated a response",
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "❌ Assistant Error",
        description: "Failed to get coding assistance. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "📋 Copied",
        description: "Code copied to clipboard",
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getCodeTypeIcon = (type: string) => {
    const codeType = codeTypes.find(ct => ct.id === type);
    return codeType ? codeType.icon : Code;
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-16 z-[9999]" style={{ position: 'fixed', zIndex: 9999 }}>
        <Button 
          onClick={() => onMinimize && onMinimize()}
          className="h-12 w-12 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all duration-200"
          size="sm"
        >
          <Code className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  console.log('CodingAssistant rendering:', { isMinimized, userRole, currentContext });

  return (
    <div 
      className="fixed bottom-4 right-20" 
      style={{ 
        position: 'fixed', 
        zIndex: 10000,
        width: '384px',
        height: '600px'
      }}
    >
      <Card 
        className="w-full h-full shadow-2xl bg-background border-border"
        style={{ position: 'relative' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-primary">
            <Code className="h-5 w-5" />
            Coding Assistant
          </CardTitle>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onMinimize}
              className="h-8 w-8 p-0"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Code Type Selector */}
        <div className="flex flex-wrap gap-1 mt-2">
          {codeTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Badge
                key={type.id}
                variant={selectedCodeType === type.id ? "default" : "outline"}
                className={`cursor-pointer text-xs px-2 py-1 ${
                  selectedCodeType === type.id 
                    ? "bg-primary text-white" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => setSelectedCodeType(type.id)}
              >
                <IconComponent className="h-3 w-3 mr-1" />
                {type.label}
              </Badge>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col h-[calc(100%-120px)] p-3">
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">
                  Ask me anything about coding, debugging, or TMS development!
                </p>
                <p className="text-xs mt-2">
                  Select a code type above to get more targeted assistance.
                </p>
              </div>
            )}
            
            {messages.map((message) => {
              const CodeTypeIcon = getCodeTypeIcon(message.codeType || 'general');
              
              return (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <CodeTypeIcon className="h-3 w-3" />
                      <span className="text-xs opacity-70">
                        {message.type === 'user' ? 'You' : 'AI Assistant'}
                      </span>
                    </div>
                    <div className="text-sm whitespace-pre-wrap font-mono">
                      {message.content}
                    </div>
                    {message.type === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-6 px-2 text-xs"
                        onClick={() => copyToClipboard(message.content)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input */}
        <div className="flex gap-2 mt-3">
          <Textarea
            value={input}
            onChange={(e) => {
              console.log('Input changed:', e.target.value);
              setInput(e.target.value);
            }}
            placeholder={`Ask for ${selectedCodeType} help...`}
            className="min-h-[60px] resize-none"
            disabled={isLoading}
            onKeyDown={(e) => {
              console.log('Key pressed:', e.key, 'shift:', e.shiftKey);
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            onClick={() => {
              console.log('Send button clicked, input:', input, 'disabled:', !input.trim() || isLoading);
              sendMessage();
            }}
            disabled={!input.trim() || isLoading}
            className="px-3"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};