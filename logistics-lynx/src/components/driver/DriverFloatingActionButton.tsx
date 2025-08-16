/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import DriverFAB from "./DriverFAB";
import AIAssistantPanel from "./AIAssistantPanel";

interface DriverFloatingActionButtonProps {
  onOpenCodingAssistant?: () => void;
}

export default function DriverFloatingActionButton({ 
  onOpenCodingAssistant 
}: DriverFloatingActionButtonProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleAIAssistantToggle = () => {
    if (onOpenCodingAssistant) {
      onOpenCodingAssistant();
    } else {
      setShowAIAssistant(prev => !prev);
    }
  };

  return (
    <>
      <DriverFAB onAIAssistantToggle={handleAIAssistantToggle} />
      
      {!onOpenCodingAssistant && (
        <AIAssistantPanel 
          isOpen={showAIAssistant}
          onClose={() => setShowAIAssistant(false)}
        />
      )}
    </>
  );
}