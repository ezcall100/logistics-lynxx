
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const TaskCalendar = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center border border-blue-200/30">
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Calendar</h1>
          <p className="text-muted-foreground">Manage tasks and appointments</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendar Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Task Calendar functionality coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCalendar;
