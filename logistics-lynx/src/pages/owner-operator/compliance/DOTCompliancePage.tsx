import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const DOTCompliancePage = () => {
  const complianceItems = [
    {
      item: 'DOT Annual Inspection',
      status: 'current',
      expiryDate: '2024-08-15',
      daysUntilExpiry: 145
    },
    {
      item: 'Commercial Driver License',
      status: 'current',
      expiryDate: '2024-06-20',
      daysUntilExpiry: 89
    },
    {
      item: 'Medical Certificate',
      status: 'expiring',
      expiryDate: '2024-02-28',
      daysUntilExpiry: 28
    },
    {
      item: 'Vehicle Registration',
      status: 'current',
      expiryDate: '2024-12-31',
      daysUntilExpiry: 283
    }
  ];

  const recentInspections = [
    {
      date: '2024-01-10',
      type: 'Roadside Inspection',
      result: 'No Violations',
      inspector: 'State DOT - Officer Johnson'
    },
    {
      date: '2023-08-15',
      type: 'Annual DOT Inspection',
      result: 'Passed',
      inspector: 'Certified DOT Inspector'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">DOT Compliance</h1>
        <p className="text-muted-foreground">Monitor your compliance status and required documentation</p>
      </div>

      <div className="grid gap-4">
        {complianceItems.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">{item.item}</h3>
                    <p className="text-sm text-muted-foreground">
                      Expires: {item.expiryDate} ({item.daysUntilExpiry} days)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    item.status === 'current' ? 'default' : 
                    item.status === 'expiring' ? 'destructive' : 'secondary'
                  }>
                    {item.status === 'current' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {item.status === 'expiring' && <AlertTriangle className="h-3 w-3 mr-1" />}
                    {item.status}
                  </Badge>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Inspections
            </CardTitle>
            <CardDescription>Your latest DOT inspection history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInspections.map((inspection, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{inspection.type}</p>
                      <p className="text-sm text-muted-foreground">{inspection.date}</p>
                      <p className="text-sm text-muted-foreground">{inspection.inspector}</p>
                    </div>
                    <Badge variant={inspection.result === 'Passed' || inspection.result === 'No Violations' ? 'default' : 'destructive'}>
                      {inspection.result}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Actions</CardTitle>
            <CardDescription>Keep your compliance up to date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Schedule DOT Physical
            </Button>
            <Button variant="outline" className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Update Driver License
            </Button>
            <Button variant="outline" className="w-full">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Renew Medical Certificate
            </Button>
            <Button variant="outline" className="w-full">
              View Compliance Checklist
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DOTCompliancePage;