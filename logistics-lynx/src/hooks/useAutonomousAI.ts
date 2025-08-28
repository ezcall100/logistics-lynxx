/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAutonomousAI = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Request queue for throttling
  const requestQueue: (() => Promise<unknown>)[] = [];
  let isProcessingQueue = false;
  const MAX_CONCURRENT_REQUESTS = 3;
  const REQUEST_DELAY = 1000; // 1 second between requests

  const processQueue = async () => {
    if (isProcessingQueue || requestQueue.length === 0) return;
    
    isProcessingQueue = true;
    
    while (requestQueue.length > 0) {
      const batch = requestQueue.splice(0, MAX_CONCURRENT_REQUESTS);
      
      try {
        await Promise.allSettled(batch.map(fn => fn()));
      } catch (error) {
        console.error('Batch processing error:', error);
      }
      
      // Wait before processing next batch
      if (requestQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, REQUEST_DELAY));
      }
    }
    
    isProcessingQueue = false;
  };

  const callAutonomousAI = async (action: string, data?: unknown): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      const executeRequest = async () => {
        const maxRetries = 3;
        let lastError: unknown;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            setLoading(true);
            
            const { data: result, error } = await supabase.functions.invoke('autonomous-ai', {
              body: { action, data }
            });

            if (error) throw error;

            toast({
              title: "AI Decision Made",
              description: `Autonomous action "${action}" completed successfully`,
            });

            resolve(result);
            return;
          } catch (error: unknown) {
            console.error(`Autonomous AI error (attempt ${attempt}):`, error);
            lastError = error;
            
            // Wait before retry (exponential backoff)
            if (attempt < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, attempt * 1000));
            }
          } finally {
            setLoading(false);
          }
        }

        // All retries failed
        toast({
          title: "AI Error",
          description: `Failed to execute autonomous action: ${lastError?.message}`,
          variant: "destructive",
        });
        reject(lastError);
      };

      requestQueue.push(executeRequest);
      processQueue();
    });
  };

  return { callAutonomousAI, loading };
};

export default useAutonomousAI;