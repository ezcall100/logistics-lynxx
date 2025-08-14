import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const LiveUpdateComponent = () => {
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState('10:23:05 AM');
  const [status, setStatus] = useState('active');
  const [createdAt] = useState('10:23:05 AM');

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateCount(prev => prev + 1);
      setLastUpdate(new Date().toLocaleTimeString());
      
      // Simulate different statuses
      const statuses = ['active', 'updating', 'processing'];
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          ⚡ Live Update Component
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">Update Count:</span>
            <span className="font-bold text-purple-700">{updateCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">Status:</span>
            <Badge variant={status === 'active' ? 'default' : 'secondary'} className="text-purple-700">
              {status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">Last Update:</span>
            <span className="text-xs text-purple-600">{lastUpdate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">Created At:</span>
            <span className="text-xs text-purple-600">{createdAt}</span>
          </div>
        </div>
        <div className="mt-3 p-2 bg-purple-100 rounded text-xs text-purple-700">
          🔥 This component was created by autonomous agent at 10:23:05 AM
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveUpdateComponent;