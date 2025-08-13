import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type QuoteInput = {
  origin: { city: string; state: string };
  dest: { city: string; state: string };
  equipment: string;
  date: string;
  weight?: number;
  class?: string;
};

type QuoteResponse = {
  proposed_rate: number;
  confidence: number;
  breakdown?: Record<string, number>;
  estimated_days?: number;
  fuel_surcharge?: number;
  accessorials?: number;
};

export function useRateQuote() {
  return useMutation<QuoteResponse, Error, QuoteInput>({
    mutationFn: async (input) => {
      // For now, we'll use a mock response since the edge function isn't set up yet
      // In production, this would call your edge function
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response based on input
      const baseRate = 1500 + Math.random() * 1000;
      const fuelSurcharge = baseRate * 0.15;
      const accessorials = baseRate * 0.05;
      const totalRate = baseRate + fuelSurcharge + accessorials;
      
      return {
        proposed_rate: Math.round(totalRate),
        confidence: 0.85 + Math.random() * 0.1,
        breakdown: {
          base_rate: Math.round(baseRate),
          fuel_surcharge: Math.round(fuelSurcharge),
          accessorials: Math.round(accessorials)
        },
        estimated_days: 3 + Math.floor(Math.random() * 3),
        fuel_surcharge: Math.round(fuelSurcharge),
        accessorials: Math.round(accessorials)
      };
    },
  });
}
