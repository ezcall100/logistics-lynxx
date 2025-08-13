
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Users, TrendingUp, Target, Zap } from 'lucide-react';

interface RolePerformanceData {
  role: string;
  efficiency: number;
  satisfaction: number;
  usage: number;
}

interface RoleSpecificData {
  rolePerformance: RolePerformanceData[];
  roleSpecificMetrics: Record<string, Record<string, number | string>>;
}

interface RoleSpecificMetricsProps {
  data: RoleSpecificData;
  timeRange: string;
  selectedRole: string;
}

const RoleSpecificMetrics: React.FC<RoleSpecificMetricsProps> = ({ data, timeRange, selectedRole }) => {
  const rolePerformance = data?.rolePerformance || [];
  const roleSpecificMetrics = data?.roleSpecificMetrics || {};

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'Super Admin': 'bg-purple-500',
      'Carrier Admin': 'bg-blue-500',
      'Broker Admin': 'bg-green-500',
      'Shipper Admin': 'bg-yellow-500',
      'Driver': 'bg-orange-500',
      'Owner Operator': 'bg-red-500'
    };
    return colors[role] || 'bg-gray-500';
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'text-green-600' };
    if (score >= 80) return { label: 'Good', color: 'text-blue-600' };
    if (score >= 70) return { label: 'Average', color: 'text-yellow-600' };
    return { label: 'Needs Improvement', color: 'text-red-600' };
  };

  const formatMetricKey = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const renderRoleSpecificCard = (role: string, metrics: Record<string, number | string>) => {
    if (!metrics) return null;

    return (
      <Card key={role}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg capitalize flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getRoleColor(role.replace('_', ' '))}`} />
            {role.replace('_', ' ')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold">
                  {typeof value === 'number' ? 
                    (key.includes('Rate') || key.includes('Margin') || key.includes('Efficiency') ? 
                      `${value}%` : 
                      value.toLocaleString()
                    ) : 
                    value
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatMetricKey(key)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Role Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Role Performance Overview
          </CardTitle>
          <CardDescription>
            Efficiency and satisfaction metrics across all user roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rolePerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="efficiency" fill="#8884d8" name="Efficiency %" />
                <Bar dataKey="satisfaction" fill="#82ca9d" name="Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Role Performance Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Role Performance Radar</CardTitle>
          <CardDescription>
            Multi-dimensional performance comparison across roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={rolePerformance}>
                <PolarGrid />
                <PolarAngleAxis dataKey="role" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar 
                  name="Efficiency" 
                  dataKey="efficiency" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Satisfaction" 
                  dataKey="satisfaction" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Individual Role Performance Cards */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Individual Role Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(roleSpecificMetrics).map(([role, metrics]) => 
            renderRoleSpecificCard(role, metrics)
          )}
        </div>
      </div>

      {/* Role Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Role Usage Statistics
          </CardTitle>
          <CardDescription>
            Platform usage patterns by role over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rolePerformance.map((role: RolePerformanceData, index: number) => {
              const performance = getPerformanceLevel(role.efficiency);
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getRoleColor(role.role)}`} />
                    <div>
                      <div className="font-medium">{role.role}</div>
                      <div className="text-sm text-muted-foreground">
                        {role.usage} active users
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">Efficiency</div>
                      <Progress value={role.efficiency} className="w-20 h-2" />
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium">Satisfaction</div>
                      <Progress value={role.satisfaction} className="w-20 h-2" />
                    </div>
                    
                    <Badge variant="outline" className={performance.color}>
                      {performance.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSpecificMetrics;
