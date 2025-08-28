/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PerformanceDataPoint {
  date: string;
  value: number;
  label: string;
}

export interface PerformanceMetric {
  id: string;
  name: string;
  data: PerformanceDataPoint[];
  currentValue: number;
  previousValue: number;
  change: number;
  changePercent: number;
  unit: string;
}

export interface PerformanceFilters {
  range: '7d' | '30d' | '90d';
  metric?: string;
}

// Generate sample data for different time ranges
const generateData = (days: number, baseValue: number, variance: number = 0.1): PerformanceDataPoint[] => {
  const data: PerformanceDataPoint[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomFactor = 1 + (Math.random() - 0.5) * variance;
    const value = Math.round(baseValue * randomFactor);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    });
  }
  
  return data;
};

export const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'revenue',
    name: 'Revenue',
    data: generateData(30, 45000, 0.15),
    currentValue: 45231,
    previousValue: 38450,
    change: 6781,
    changePercent: 17.6,
    unit: '$'
  },
  {
    id: 'shipments',
    name: 'Shipments',
    data: generateData(30, 1200, 0.08),
    currentValue: 1234,
    previousValue: 1027,
    change: 207,
    changePercent: 20.2,
    unit: ''
  },
  {
    id: 'efficiency',
    name: 'Efficiency',
    data: generateData(30, 85, 0.05),
    currentValue: 87.3,
    previousValue: 82.1,
    change: 5.2,
    changePercent: 6.3,
    unit: '%'
  },
  {
    id: 'satisfaction',
    name: 'Customer Satisfaction',
    data: generateData(30, 4.5, 0.03),
    currentValue: 4.7,
    previousValue: 4.3,
    change: 0.4,
    changePercent: 9.3,
    unit: '/5'
  }
];

export const getPerformanceData = (filters: PerformanceFilters): PerformanceMetric | undefined => {
  const { range, metric = 'revenue' } = filters;
  
  const metricData = performanceMetrics.find(m => m.id === metric);
  if (!metricData) return undefined;
  
  // Adjust data based on range
  let days = 30;
  if (range === '7d') days = 7;
  if (range === '90d') days = 90;
  
  return {
    ...metricData,
    data: generateData(days, metricData.currentValue / 30 * days, 0.1)
  };
};

export const getAvailableMetrics = () => {
  return performanceMetrics.map(m => ({
    id: m.id,
    name: m.name,
    unit: m.unit
  }));
};

export default getAvailableMetrics;