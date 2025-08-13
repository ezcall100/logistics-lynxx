import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Package, AlertTriangle, Clock, Star, Camera, FileText, Calendar, Activity, BarChart3 } from 'lucide-react';
import { PreTripInspectionForm, DeliveryConfirmationForm, IncidentReportForm } from './forms';

const DriverFormsHub: React.FC = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const forms = [
    {
      id: 'inspection',
      title: 'Pre-Trip Inspection',
      description: 'Complete safety inspection before departure',
      icon: CheckCircle,
      color: 'bg-green-500',
      priority: 'high',
      estimatedTime: '10-15 min',
      component: PreTripInspectionForm
    },
    {
      id: 'delivery',
      title: 'Delivery Confirmation',
      description: 'Confirm load delivery and capture documentation',
      icon: Package,
      color: 'bg-blue-500',
      priority: 'medium',
      estimatedTime: '5-10 min',
      component: DeliveryConfirmationForm
    },
    {
      id: 'incident',
      title: 'Incident Report',
      description: 'Report accidents, breakdowns, or safety concerns',
      icon: AlertTriangle,
      color: 'bg-red-500',
      priority: 'critical',
      estimatedTime: '15-20 min',
      component: IncidentReportForm
    }
  ];

  const quickStats = [
    { label: 'Forms Completed Today', value: '3', color: 'text-green-600' },
    { label: 'Pending Reviews', value: '1', color: 'text-yellow-600' },
    { label: 'This Week', value: '18', color: 'text-blue-600' },
    { label: 'Success Rate', value: '98%', color: 'text-purple-600' }
  ];

  const recentForms = [
    { type: 'Pre-Trip Inspection', time: '08:15 AM', status: 'completed', issues: 0 },
    { type: 'Delivery Confirmation', time: '02:30 PM', status: 'completed', issues: 0 },
    { type: 'Fuel Report', time: '11:45 AM', status: 'pending', issues: 0 },
    { type: 'Incident Report', time: 'Yesterday', status: 'under_review', issues: 1 }
  ];

  if (activeForm) {
    const FormComponent = forms.find(f => f.id === activeForm)?.component;
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setActiveForm(null)}
            className="h-10"
          >
            ← Back to Forms
          </Button>
          <h1 className="text-2xl font-bold">
            {forms.find(f => f.id === activeForm)?.title}
          </h1>
        </div>
        {FormComponent && <FormComponent />}
      </div>
    );
  }

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Driver Forms Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete required forms, submit reports, and manage documentation efficiently
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="glass-subtle">
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="forms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 glass-subtle">
          <TabsTrigger value="forms" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Available Forms</span>
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Recent Activity</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Available Forms */}
        <TabsContent value="forms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <Card key={form.id} className="glass-subtle hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full ${form.color} mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <form.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{form.title}</CardTitle>
                    <CardDescription className="text-sm mt-2">
                      {form.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge 
                      className={
                        form.priority === 'critical' ? 'bg-red-100 text-red-700' :
                        form.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        'bg-blue-100 text-blue-700'
                      }
                    >
                      {form.priority.charAt(0).toUpperCase() + form.priority.slice(1)} Priority
                    </Badge>
                    <span className="text-sm text-muted-foreground">{form.estimatedTime}</span>
                  </div>
                  
                  <Button 
                    className="w-full h-12" 
                    onClick={() => setActiveForm(form.id)}
                  >
                    Start Form
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Emergency Forms */}
          <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                <span>Emergency Forms</span>
              </CardTitle>
              <CardDescription>
                Quick access to critical safety and incident reporting
              </CardDescription>
            </CardHeader>
            <CardContent className="flex space-x-4">
              <Button variant="destructive" className="flex-1">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Incident
              </Button>
              <Button variant="outline" className="flex-1 border-red-300 text-red-600">
                <Package className="h-4 w-4 mr-2" />
                Cargo Emergency
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Activity */}
        <TabsContent value="recent" className="space-y-6">
          <Card className="glass-subtle">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <span>Recent Form Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentForms.map((form, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        form.status === 'completed' ? 'bg-green-100' :
                        form.status === 'pending' ? 'bg-yellow-100' :
                        'bg-orange-100'
                      }`}>
                        {form.status === 'completed' ? 
                          <CheckCircle className="h-5 w-5 text-green-600" /> :
                          form.status === 'pending' ?
                          <Clock className="h-5 w-5 text-yellow-600" /> :
                          <AlertTriangle className="h-5 w-5 text-orange-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{form.type}</p>
                        <p className="text-sm text-muted-foreground">{form.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {form.issues > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {form.issues} issue{form.issues !== 1 ? 's' : ''}
                        </Badge>
                      )}
                      <Badge className={
                        form.status === 'completed' ? 'bg-green-100 text-green-700' :
                        form.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }>
                        {form.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-subtle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                  <span>Form Completion Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pre-Trip Inspections</span>
                    <span className="font-medium">15/15 (100%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Delivery Confirmations</span>
                    <span className="font-medium">12/13 (92%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Incident Reports</span>
                    <span className="font-medium">1/1 (100%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-subtle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">98.5%</div>
                  <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-600">2.5 min</div>
                    <div className="text-xs text-muted-foreground">Avg. Completion</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-purple-600">0.2%</div>
                    <div className="text-xs text-muted-foreground">Error Rate</div>
                  </div>
                </div>
                
                <Badge className="w-full justify-center bg-green-100 text-green-700 py-2">
                  Excellent Performance
                </Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverFormsHub;