/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { TestingTask } from '@/types/testing';

export const useTestingTasks = () => {
  const [tasks, setTasks] = useState<TestingTask[]>([
    {
      id: 'task-1',
      name: 'Compare Multiple Quotes',
      title: 'Compare Multiple Quotes',
      description: 'Test the quote comparison functionality',
      type: 'feature_test',
      status: 'pending',
      expectedOutcome: 'User can easily identify the most profitable quote',
      category: 'quote_comparison',
      estimatedDuration: 10,
      created_at: new Date().toISOString()
    },
    {
      id: 'task-2',
      name: 'Analyze Profit Margins',
      title: 'Analyze Profit Margins',
      description: 'Test profit margin analysis features',
      type: 'usability_test',
      status: 'pending',
      expectedOutcome: 'User understands margin breakdown and profitability indicators',
      category: 'margin_analysis',
      estimatedDuration: 8,
      created_at: new Date().toISOString()
    },
    {
      id: 'task-3',
      name: 'Review AI Recommendations',
      title: 'Review AI Recommendations',
      description: 'Test AI recommendation system',
      type: 'performance_test',
      status: 'pending',
      expectedOutcome: 'User finds AI recommendations helpful and actionable',
      category: 'ai_recommendations',
      estimatedDuration: 12,
      created_at: new Date().toISOString()
    },
    {
      id: 'task-4',
      name: 'Export Analysis Report',
      title: 'Export Analysis Report',
      description: 'Test report export functionality',
      type: 'feature_test',
      status: 'pending',
      expectedOutcome: 'User successfully exports comprehensive report',
      category: 'quote_comparison',
      estimatedDuration: 5,
      created_at: new Date().toISOString()
    }
  ]);

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'completed', completed_at: new Date().toISOString() }
        : task
    ));
  };

  const getPendingTasks = () => tasks.filter(task => task.status === 'pending');
  const getCompletedTasks = () => tasks.filter(task => task.status === 'completed');

  return {
    tasks,
    completeTask,
    getPendingTasks,
    getCompletedTasks
  };
};
