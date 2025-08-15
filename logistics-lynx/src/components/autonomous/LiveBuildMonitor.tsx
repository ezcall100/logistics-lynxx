import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

const LiveBuildMonitor = () => {
  const [buildProgress, setBuildProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Initializing build...');

  useEffect(() => {
    const tasks = [
      'Analyzing requirements...',
      'Creating components...',
      'Building layouts...',
      'Optimizing performance...',
      'Deploying changes...',
      'Build complete!'
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < tasks.length) {
        setCurrentTask(tasks[currentIndex]);
        setBuildProgress((currentIndex + 1) * (100 / tasks.length));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-700">
          ⚡ Live Build Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-blue-600 mb-2">Current Task:</p>
            <p className="font-medium text-blue-800">{currentTask}</p>
          </div>
          
          <div>
            <p className="text-sm text-blue-600 mb-2">Build Progress:</p>
            <Progress value={buildProgress} className="mb-2" />
            <p className="text-xs text-blue-600">{Math.round(buildProgress)}% complete</p>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              🔥 Live Updates
            </Badge>
            <span className="text-xs text-blue-600">Created at 11:33:48 PM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveBuildMonitor;