/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FeatureUsage, HeatmapItem } from './types';

interface FeatureUsageChartsProps {
  featureUsage: FeatureUsage[];
  heatmapData: HeatmapItem[];
}

export const FeatureUsageCharts: React.FC<FeatureUsageChartsProps> = ({ featureUsage, heatmapData }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const getUsageIntensity = (usage: number) => {
    if (usage >= 80) return 'bg-red-500';
    if (usage >= 60) return 'bg-orange-500';
    if (usage >= 40) return 'bg-yellow-500';
    if (usage >= 20) return 'bg-green-500';
    return 'bg-gray-300';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature Usage Distribution</CardTitle>
          <CardDescription>
            Most and least used features across the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={featureUsage}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="usage"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {featureUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Engagement Heatmap</CardTitle>
          <CardDescription>
            Usage intensity across different features and time periods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {heatmapData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.feature}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.interactions} interactions
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-16 h-4 rounded ${getUsageIntensity(item.intensity)}`} />
                  <span className="text-sm font-medium w-12">{item.intensity}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
