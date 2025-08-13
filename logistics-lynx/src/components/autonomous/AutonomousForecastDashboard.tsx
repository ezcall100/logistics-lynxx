import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, Clock, Activity, Target, Zap } from 'lucide-react';

interface ForecastData {
  day: number;
  date: string;
  focus_areas: string[];
  agent_allocation: {
    ui_builder: number;
    data_processor: number;
    security: number;
    optimization: number;
    testing: number;
    deployment: number;
  };
  completion_target: number;
  priority_tasks: string[];
  risk_factors: string[];
}

const AutonomousForecastDashboard: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [currentDay, setCurrentDay] = useState(1);

  const generateSevenDayForecast = (): ForecastData[] => {
    const today = new Date();
    const forecast: ForecastData[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      let dayData: ForecastData;
      
      switch (i + 1) {
        case 1:
          dayData = {
            day: 1,
            date: date.toLocaleDateString(),
            focus_areas: ['UI Foundation', 'Data Architecture', 'Security Framework'],
            agent_allocation: {
              ui_builder: 20, data_processor: 20, security: 15, 
              optimization: 5, testing: 5, deployment: 0
            },
            completion_target: 15,
            priority_tasks: [
              'Initialize UI component library',
              'Set up database schemas',
              'Implement basic authentication'
            ],
            risk_factors: ['Initial setup complexity', 'Agent coordination']
          };
          break;
        case 2:
          dayData = {
            day: 2,
            date: date.toLocaleDateString(),
            focus_areas: ['UI Development', 'Data Processing', 'Security Implementation'],
            agent_allocation: {
              ui_builder: 25, data_processor: 25, security: 20, 
              optimization: 10, testing: 10, deployment: 0
            },
            completion_target: 25,
            priority_tasks: [
              'Build portal interfaces',
              'Implement data validation',
              'Set up role-based access'
            ],
            risk_factors: ['Cross-portal consistency', 'Data integration']
          };
          break;
        case 3:
          dayData = {
            day: 3,
            date: date.toLocaleDateString(),
            focus_areas: ['Advanced UI', 'Data Optimization', 'Security Hardening'],
            agent_allocation: {
              ui_builder: 30, data_processor: 30, security: 25, 
              optimization: 15, testing: 15, deployment: 5
            },
            completion_target: 40,
            priority_tasks: [
              'Complete responsive designs',
              'Optimize data queries',
              'Implement encryption protocols'
            ],
            risk_factors: ['Performance bottlenecks', 'Security compliance']
          };
          break;
        case 4:
          dayData = {
            day: 4,
            date: date.toLocaleDateString(),
            focus_areas: ['System Optimization', 'Comprehensive Testing'],
            agent_allocation: {
              ui_builder: 35, data_processor: 35, security: 30, 
              optimization: 25, testing: 30, deployment: 10
            },
            completion_target: 60,
            priority_tasks: [
              'Finalize UI components',
              'Complete data processing layers',
              'Begin optimization algorithms'
            ],
            risk_factors: ['Integration complexity', 'Testing coverage']
          };
          break;
        case 5:
          dayData = {
            day: 5,
            date: date.toLocaleDateString(),
            focus_areas: ['Performance Tuning', 'Extended Testing'],
            agent_allocation: {
              ui_builder: 37, data_processor: 37, security: 35, 
              optimization: 35, testing: 40, deployment: 20
            },
            completion_target: 75,
            priority_tasks: [
              'Performance optimization',
              'Load balancing implementation',
              'Comprehensive testing suites'
            ],
            risk_factors: ['Performance targets', 'Test automation']
          };
          break;
        case 6:
          dayData = {
            day: 6,
            date: date.toLocaleDateString(),
            focus_areas: ['Final Integration', 'Pre-Deployment Testing'],
            agent_allocation: {
              ui_builder: 39, data_processor: 39, security: 37, 
              optimization: 39, testing: 50, deployment: 35
            },
            completion_target: 90,
            priority_tasks: [
              'System integration testing',
              'Security audits',
              'Deployment preparation'
            ],
            risk_factors: ['Integration issues', 'Security validation']
          };
          break;
        case 7:
          dayData = {
            day: 7,
            date: date.toLocaleDateString(),
            focus_areas: ['Final Deployment', 'Production Monitoring'],
            agent_allocation: {
              ui_builder: 39, data_processor: 39, security: 37, 
              optimization: 39, testing: 52, deployment: 44
            },
            completion_target: 100,
            priority_tasks: [
              'Production deployment',
              'System monitoring setup',
              'Performance validation'
            ],
            risk_factors: ['Deployment stability', 'Production readiness']
          };
          break;
        default:
          dayData = forecast[6]; // Use last day as default
      }
      
      forecast.push(dayData);
    }
    
    return forecast;
  };

  useEffect(() => {
    setForecastData(generateSevenDayForecast());
  }, []);

  const getTotalActiveAgents = (allocation: ForecastData['agent_allocation']) => {
    return Object.values(allocation).reduce((sum, count) => sum + count, 0);
  };

  const getCompletionColor = (target: number) => {
    if (target >= 90) return 'text-green-600 bg-green-50';
    if (target >= 70) return 'text-blue-600 bg-blue-50';
    if (target >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            7-Day Autonomous TMS Development Forecast
          </CardTitle>
          <CardDescription>
            AI-powered predictions for the next 7 days of autonomous development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {forecastData.map((day) => (
              <Card key={day.day} className={`border-2 ${day.day === currentDay ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Day {day.day}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {day.date}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span className={`text-sm font-medium px-2 py-1 rounded ${getCompletionColor(day.completion_target)}`}>
                      {day.completion_target}% Target
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Completion Target</span>
                      <span>{day.completion_target}%</span>
                    </div>
                    <Progress value={day.completion_target} className="h-2" />
                  </div>

                  {/* Focus Areas */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      Focus Areas
                    </h4>
                    <div className="space-y-1">
                      {day.focus_areas.map((area, index) => (
                        <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Agent Allocation */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Active Agents: {getTotalActiveAgents(day.agent_allocation)}
                    </h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>UI Builder:</span>
                        <span className="font-medium">{day.agent_allocation.ui_builder}/39</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Processor:</span>
                        <span className="font-medium">{day.agent_allocation.data_processor}/39</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Security:</span>
                        <span className="font-medium">{day.agent_allocation.security}/37</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Testing:</span>
                        <span className="font-medium">{day.agent_allocation.testing}/52</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deployment:</span>
                        <span className="font-medium">{day.agent_allocation.deployment}/44</span>
                      </div>
                    </div>
                  </div>

                  {/* Priority Tasks */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Key Tasks
                    </h4>
                    <ul className="space-y-1 text-xs">
                      {day.priority_tasks.slice(0, 2).map((task, index) => (
                        <li key={index} className="text-muted-foreground">
                          • {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Factors */}
                  {day.risk_factors.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1 text-orange-600">
                        <TrendingUp className="h-3 w-3" />
                        Risk Factors
                      </h4>
                      <div className="space-y-1">
                        {day.risk_factors.slice(0, 2).map((risk, index) => (
                          <Badge key={index} variant="outline" className="text-xs mr-1 mb-1 border-orange-200 text-orange-700">
                            {risk}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousForecastDashboard;