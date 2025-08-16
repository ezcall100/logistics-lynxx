/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useMemo } from 'react';
import { TestingTask } from '@/types/testing';

export const useTestingTasks = () => {
  const [testingTasks, setTestingTasks] = useState<TestingTask[]>([]);

  const defaultTasks = useMemo((): TestingTask[] => [
    {
      id: 'task-1',
      name: 'Compare Multiple Quotes',
      description: 'Select 3-5 quotes and use the comparison tool to analyze them',
      expectedOutcome: 'User can easily identify the most profitable quote',
      category: 'quote_comparison',
      estimatedDuration: 10
    },
    {
      id: 'task-2',
      name: 'Analyze Profit Margins',
      description: 'Use the margin analysis tab to review profit calculations',
      expectedOutcome: 'User understands margin breakdown and profitability indicators',
      category: 'margin_analysis',
      estimatedDuration: 8
    },
    {
      id: 'task-3',
      name: 'Review AI Recommendations',
      description: 'Examine AI-powered suggestions and apply one recommendation',
      expectedOutcome: 'User finds AI recommendations helpful and actionable',
      category: 'ai_recommendations',
      estimatedDuration: 12
    },
    {
      id: 'task-4',
      name: 'Export Analysis Report',
      description: 'Generate and export a PDF report with quote analysis',
      expectedOutcome: 'User successfully exports comprehensive report',
      category: 'quote_comparison',
      estimatedDuration: 5
    }
  ], []);

  useEffect(() => {
    setTestingTasks(defaultTasks);
  }, [defaultTasks]);

  return { testingTasks };
};
