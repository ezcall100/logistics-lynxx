import { useState, useCallback } from 'react';

export interface CodingAssistantState {
  isOpen: boolean;
  isMinimized: boolean;
}

export const useCodingAssistant = () => {
  const [state, setState] = useState<CodingAssistantState>({
    isOpen: false,
    isMinimized: false
  });

  const openAssistant = useCallback(() => {
    setState({ isOpen: true, isMinimized: false });
  }, []);

  const closeAssistant = useCallback(() => {
    setState({ isOpen: false, isMinimized: false });
  }, []);

  const minimizeAssistant = useCallback(() => {
    setState(prev => ({ isOpen: prev.isOpen, isMinimized: !prev.isMinimized }));
  }, []);

  const toggleAssistant = useCallback(() => {
    setState(prev => ({
      isOpen: !prev.isOpen,
      isMinimized: prev.isOpen ? false : prev.isMinimized
    }));
  }, []);

  return {
    ...state,
    openAssistant,
    closeAssistant,
    minimizeAssistant,
    toggleAssistant
  };
};