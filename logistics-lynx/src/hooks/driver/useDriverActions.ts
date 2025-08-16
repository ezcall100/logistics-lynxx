/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface CommunicationAction {
  type: 'call' | 'message' | 'email';
  recipient: string;
  recipientName: string;
  content?: string;
}

export interface NavigationAction {
  destination: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
}

export interface StatusUpdateAction {
  entityType: 'load' | 'route' | 'vehicle' | 'duty';
  entityId: string;
  newStatus: string;
  timestamp: string;
  notes?: string;
}

export interface DocumentAction {
  type: 'photo' | 'signature' | 'form' | 'export';
  documentType: string;
  entityId?: string;
  data?: unknown;
}

export const useDriverActions = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Communication Actions
  const makeCall = useCallback(async (action: CommunicationAction) => {
    setIsProcessing(true);
    try {
      // Open phone dialer
      if (action.recipient) {
        window.open(`tel:${action.recipient}`, '_self');
        
        toast({
          title: "Call initiated",
          description: `Calling ${action.recipientName} at ${action.recipient}`,
        });
      }
    } catch (error) {
      console.error('Error making call:', error);
      toast({
        title: 'Error',
        description: 'Failed to initiate call',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const sendMessage = useCallback(async (action: CommunicationAction) => {
    setIsProcessing(true);
    try {
      // Simulate SMS functionality
      console.log(`Sending message to ${action.recipientName}:`, action.content);
      
      // Open SMS app with pre-filled message
      if (action.recipient && action.content) {
        window.open(`sms:${action.recipient}?body=${encodeURIComponent(action.content)}`, '_self');
      }
      
      toast({
        title: "Message sent",
        description: `Message sent to ${action.recipientName}`,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const sendEmail = useCallback(async (action: CommunicationAction) => {
    setIsProcessing(true);
    try {
      // Open email client
      const mailtoLink = `mailto:${action.recipient}?subject=Driver Communication&body=${encodeURIComponent(action.content || '')}`;
      window.open(mailtoLink, '_self');
      
      toast({
        title: "Email opened",
        description: `Email client opened for ${action.recipientName}`,
      });
    } catch (error) {
      console.error('Error opening email:', error);
      toast({
        title: 'Error',
        description: 'Failed to open email client',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  // Navigation Actions
  const startNavigation = useCallback(async (action: NavigationAction) => {
    setIsProcessing(true);
    try {
      const destination = `${action.address}, ${action.city}, ${action.state}${action.zipCode ? ` ${action.zipCode}` : ''}`;
      const googleMapsUrl = `https://maps.google.com?q=${encodeURIComponent(destination)}`;
      
      window.open(googleMapsUrl, '_blank');
      
      toast({
        title: "Navigation started",
        description: `Navigating to ${action.destination}`,
      });
    } catch (error) {
      console.error('Error starting navigation:', error);
      toast({
        title: 'Error',
        description: 'Failed to start navigation',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  // Status Update Actions
  const updateStatus = useCallback(async (action: StatusUpdateAction) => {
    setIsProcessing(true);
    try {
      console.log(`Updating ${action.entityType} ${action.entityId} to ${action.newStatus}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Status updated",
        description: `${action.entityType} status changed to ${action.newStatus}`,
      });
      
      return { success: true, action };
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  // Document Actions
  const takePhoto = useCallback(async (action: DocumentAction) => {
    setIsProcessing(true);
    try {
      // Check if device supports camera
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        toast({
          title: "Camera opened",
          description: "Camera is ready for photo capture",
        });
        
        // Stop the stream after showing success
        stream.getTracks().forEach(track => track.stop());
        
        return { success: true, type: 'photo' };
      } else {
        // Fallback to file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        input.click();
        
        toast({
          title: "Photo capture",
          description: "Photo capture interface opened",
        });
        
        return { success: true, type: 'photo' };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: 'Error',
        description: 'Failed to access camera',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const captureSignature = useCallback(async (action: DocumentAction) => {
    setIsProcessing(true);
    try {
      console.log('Opening signature capture for:', action.documentType);
      
      toast({
        title: "Signature capture",
        description: "Digital signature pad opened",
      });
      
      return { success: true, type: 'signature' };
    } catch (error) {
      console.error('Error capturing signature:', error);
      toast({
        title: 'Error',
        description: 'Failed to capture signature',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const exportData = useCallback(async (action: DocumentAction) => {
    setIsProcessing(true);
    try {
      const data = action.data || {};
      const filename = `driver_${action.documentType}_${new Date().toISOString().slice(0, 10)}.csv`;
      
      // Create CSV content
      const csvContent = Object.entries(data).map(([key, value]) => `${key},${value}`).join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Data exported",
        description: `${action.documentType} data exported as ${filename}`,
      });
      
      return { success: true, filename };
    } catch (error) {
      console.error('Error exporting data:', error);
      toast({
        title: 'Error',
        description: 'Failed to export data',
        variant: 'destructive',
      });
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  // Emergency Actions
  const emergencyCall = useCallback(async () => {
    setIsProcessing(true);
    try {
      window.open('tel:911', '_self');
      
      toast({
        title: "Emergency call initiated",
        description: "Calling emergency services",
        variant: 'destructive',
      });
    } catch (error) {
      console.error('Error making emergency call:', error);
      toast({
        title: 'Error',
        description: 'Failed to make emergency call',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const roadsideAssistance = useCallback(async () => {
    setIsProcessing(true);
    try {
      // Call roadside assistance number
      window.open('tel:1-800-555-HELP', '_self');
      
      toast({
        title: "Roadside assistance called",
        description: "Connecting to roadside assistance",
      });
    } catch (error) {
      console.error('Error calling roadside assistance:', error);
      toast({
        title: 'Error',
        description: 'Failed to call roadside assistance',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  return {
    isProcessing,
    // Communication
    makeCall,
    sendMessage,
    sendEmail,
    // Navigation
    startNavigation,
    // Status Updates
    updateStatus,
    // Documentation
    takePhoto,
    captureSignature,
    exportData,
    // Emergency
    emergencyCall,
    roadsideAssistance,
  };
};