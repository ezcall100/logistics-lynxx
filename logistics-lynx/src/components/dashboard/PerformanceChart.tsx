
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PerformanceMetric } from '../../data/dashboard/performance';

export interface PerformanceChartProps {
  data: PerformanceMetric | undefined;
  onRangeChange?: (range: '7d' | '30d' | '90d') => void;
  onMetricChange?: (metric: string) => void;
  availableMetrics?: Array<{ id: string; name: string; unit: string }>;
  className?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; [key: string]: unknown }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">
          Value: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const formatYAxisTick = (value: number, unit: string) => {
  if (unit === '$') {
    return `$${(value / 1000).toFixed(0)}K`;
  } else if (unit === '%') {
    return `${value}%`;
  } else if (unit === '/5') {
    return value.toFixed(1);
  }
  return value.toLocaleString();
};

const formatXAxisTick = (value: string) => {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  onRangeChange,
  onMetricChange,
  availableMetrics = [],
  className
}) => {
  if (!data) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const ranges = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Performance Overview</CardTitle>
          <div className="flex items-center space-x-2">
            {availableMetrics.length > 0 && (
              <Select
                value={data.id}
                onValueChange={onMetricChange}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  {availableMetrics.map((metric) => (
                    <SelectItem key={metric.id} value={metric.id}>
                      {metric.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Select
              value="30d"
              onValueChange={(value: '7d' | '30d' | '90d') => onRangeChange?.(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {ranges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Current:</span> {data.currentValue}{data.unit}
          </div>
          <div>
            <span className="font-medium">Previous:</span> {data.previousValue}{data.unit}
          </div>
          <div className={`font-medium ${
            data.changePercent > 0 ? 'text-green-600' : 
            data.changePercent < 0 ? 'text-red-600' : 'text-gray-600'
          }`}>
            {data.changePercent > 0 ? '+' : ''}{data.changePercent.toFixed(1)}%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={formatXAxisTick}
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis
                tickFormatter={(value) => formatYAxisTick(value, data.unit)}
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
