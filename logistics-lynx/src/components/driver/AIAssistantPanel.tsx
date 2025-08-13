"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, Send, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistantPanel({ isOpen, onClose }: AIAssistantPanelProps) {
  const [message, setMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    console.log("📤 Sending message to AI:", message);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      console.log("✅ AI response received");
      setIsLoading(false);
      setMessage("");
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[9998]">
      <Card className={cn(
        "shadow-2xl border transition-all duration-300",
        "bg-background/95 backdrop-blur-sm",
        isMinimized ? "w-80 h-16" : "w-80 h-96"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-semibold text-foreground">🤖 AI Driver Assistant</span>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
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

        {/* Content */}
        {!isMinimized && (
          <div className="p-4 flex flex-col h-80">
            {/* Messages Area */}
            <div className="flex-1 mb-4 p-3 bg-muted/50 rounded-lg overflow-y-auto">
              <div className="text-sm text-muted-foreground">
                Hello! I'm your AI driver assistant. I can help you with:
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Route optimization</li>
                  <li>HOS regulations</li>
                  <li>Documentation help</li>
                  <li>Safety guidelines</li>
                </ul>
              </div>
            </div>

            {/* Input Area */}
            <div className="space-y-2">
              <Textarea
                placeholder="Ask me anything about your route, HOS, or trucking..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[80px] resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}