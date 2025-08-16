/* eslint-disable @typescript-eslint/no-explicit-any */

export const calculateNextRun = (agentType: string, isError = false) => {
  const baseIntervals: { [key: string]: number } = {
    // Original agent types
    'refactoring': 30, // 30 minutes
    'optimization': 15, // 15 minutes
    'ui_improvement': 60, // 1 hour
    'monitoring': 5, // 5 minutes
    'learning': 45, // 45 minutes
    
    // New specialized agent types
    'research': 120, // 2 hours - research takes longer
    'frontend': 45, // 45 minutes - UI updates
    'backend': 30, // 30 minutes - API optimizations
    'database': 90, // 1.5 hours - database operations are sensitive
    'testing': 20, // 20 minutes - frequent testing
    'deployment': 180 // 3 hours - deployment less frequent but critical
  };

  const interval = baseIntervals[agentType] || 30;
  const delay = isError ? interval * 2 : interval; // Double delay on error
  return new Date(Date.now() + delay * 60 * 1000).toISOString();
};
