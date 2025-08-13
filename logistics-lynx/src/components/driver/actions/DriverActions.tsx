import { Phone, MessageCircle, Navigation, Clock, Fuel, Scan, Bot } from 'lucide-react';

export interface DriverAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  handler: () => void;
  color: string;
}

export const useDriverActions = () => {
  const callDispatch = () => {
    console.log('📞 Calling Dispatch');
    // Production: window.location.href = 'tel:+1234567890';
    alert('Calling Dispatch: +1 (555) 123-4567');
  };

  const openDriverChat = () => {
    console.log('💬 Opening Driver Chat');
    // Production: Navigate to chat or open chat modal
    alert('Opening Driver Chat');
  };

  const openNavigation = () => {
    console.log('🗺️ Opening Navigation');
    // Production: Open Google Maps or Apple Maps
    const destination = "123 Main St, City, State";
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  };

  const openHOSLog = () => {
    console.log('⏱️ Opening HOS Log');
    // Production: Navigate to HOS logging page
    alert('Opening Hours of Service Log');
  };

  const openFuelLog = () => {
    console.log('⛽ Opening Fuel Log');
    // Production: Navigate to fuel logging page
    alert('Opening Fuel Log');
  };

  const openDocumentScan = () => {
    console.log('📄 Opening Document Scanner');
    // Production: Open camera or document scanner
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('📄 Document captured:', file.name);
        alert(`Document captured: ${file.name}`);
      }
    };
    input.click();
  };

  const openAIAssistant = () => {
    console.log('🤖 Opening AI Assistant');
    return 'ai-assistant';
  };

  const driverActions: DriverAction[] = [
    {
      id: 'call-dispatch',
      label: 'Call Dispatch',
      icon: Phone,
      handler: callDispatch,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'driver-chat',
      label: 'Driver Chat',
      icon: MessageCircle,
      handler: openDriverChat,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'navigation',
      label: 'Navigation',
      icon: Navigation,
      handler: openNavigation,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'hos-log',
      label: 'HOS Log',
      icon: Clock,
      handler: openHOSLog,
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      id: 'fuel-log',
      label: 'Fuel Log',
      icon: Fuel,
      handler: openFuelLog,
      color: 'bg-amber-600 hover:bg-amber-700'
    },
    {
      id: 'document-scan',
      label: 'Document Scan',
      icon: Scan,
      handler: openDocumentScan,
      color: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: Bot,
      handler: openAIAssistant,
      color: 'bg-violet-600 hover:bg-violet-700'
    }
  ];

  return { driverActions };
};