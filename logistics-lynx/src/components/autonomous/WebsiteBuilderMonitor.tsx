import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface WebsiteFile {
  name: string;
  path: string;
  type: 'page' | 'component' | 'style' | 'data';
  lastModified: string;
  status: 'created' | 'updated' | 'building';
  agent: string;
}

interface BuildUpdate {
  id: number;
  agent: string;
  action: string;
  file: string;
  timestamp: string;
}

const WebsiteBuilderMonitor: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [websiteFiles, setWebsiteFiles] = useState<WebsiteFile[]>([]);
  const [buildUpdates, setBuildUpdates] = useState<BuildUpdate[]>([]);
  const [totalBuilds, setTotalBuilds] = useState(0);
  const [activeAgents, setActiveAgents] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8085');
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
        console.log('🔌 Connected to autonomous website builder');
        
        // Request initial build process
        ws.send(JSON.stringify({ type: 'request_build' }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'real_time_update') {
            // Add new build update
            setBuildUpdates(prev => [{
              id: Date.now(),
              agent: data.agent,
              action: data.action,
              file: data.file,
              timestamp: data.timestamp
            }, ...prev.slice(0, 19)]); // Keep last 20 updates

            // Update website files
            const fileName = data.file.split('/').pop() || 'Unknown';
            const fileType = getFileType(fileName);
            
            setWebsiteFiles(prev => {
              const existingFileIndex = prev.findIndex(f => f.name === fileName);
              const newFile: WebsiteFile = {
                name: fileName,
                path: data.file,
                type: fileType,
                lastModified: new Date().toLocaleTimeString(),
                status: 'updated',
                agent: data.agent
              };

              if (existingFileIndex >= 0) {
                const updated = [...prev];
                updated[existingFileIndex] = { ...newFile, status: 'updated' };
                return updated;
              } else {
                return [newFile, ...prev];
              }
            });
          }

          if (data.type === 'agent_status') {
            setActiveAgents(data.data.filter((agent: { status: string }) => agent.status === 'building').length);
          }

          if (data.systemStatus) {
            setTotalBuilds(data.systemStatus.totalBuilds || 0);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        console.log('🔌 Disconnected from autonomous website builder');
        
        // Try to reconnect after 5 seconds
        setTimeout(connectWebSocket, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('disconnected');
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const getFileType = (fileName: string): 'page' | 'component' | 'style' | 'data' => {
    if (fileName.includes('dashboard') || fileName.includes('page')) return 'page';
    if (fileName.includes('Component') || fileName.includes('component')) return 'component';
    if (fileName.includes('.css') || fileName.includes('style')) return 'style';
    return 'data';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'page': return '📄';
      case 'component': return '🧩';
      case 'style': return '🎨';
      case 'data': return '📊';
      default: return '📁';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created': return 'bg-green-100 text-green-800';
      case 'updated': return 'bg-blue-100 text-blue-800';
      case 'building': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const triggerNewBuild = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'request_build' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">🏗️ Website Builder Monitor</h2>
          <p className="text-muted-foreground">
            Watch autonomous agents build and modify your website in real-time
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm capitalize">{connectionStatus}</span>
          </div>
          <Button onClick={triggerNewBuild} size="sm">
            🚀 Trigger Build
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Builds</p>
                <p className="text-2xl font-bold">{totalBuilds}</p>
              </div>
              <div className="text-2xl">🏗️</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold">{activeAgents}</p>
              </div>
              <div className="text-2xl">🤖</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Files Modified</p>
                <p className="text-2xl font-bold">{websiteFiles.length}</p>
              </div>
              <div className="text-2xl">📁</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Updates</p>
                <p className="text-2xl font-bold">{buildUpdates.length}</p>
              </div>
              <div className="text-2xl">⚡</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Website Files */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📁 Website Files Being Built
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {websiteFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-2">🤖</div>
                    <p>Waiting for autonomous agents to start building...</p>
                    <p className="text-sm">Files will appear here as they are created or modified</p>
                  </div>
                ) : (
                  websiteFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{getFileIcon(file.type)}</span>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.path}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(file.status)}>
                          {file.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {file.lastModified}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Build Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔄 Live Build Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {buildUpdates.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-2">⚡</div>
                    <p>Waiting for build updates...</p>
                    <p className="text-sm">Updates will appear here as agents work</p>
                  </div>
                ) : (
                  buildUpdates.map((update) => (
                    <div key={update.id} className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-green-800">
                            {update.agent}
                          </p>
                          <p className="text-sm text-green-700">{update.action}</p>
                          <p className="text-xs text-green-600 mt-1">
                            {update.file}
                          </p>
                        </div>
                        <span className="text-xs text-green-600">
                          {new Date(update.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">📋 How to See the Built Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-blue-700">
            <p>• <strong>New pages</strong> are being created in <code>src/pages/</code></p>
            <p>• <strong>Components</strong> are being built in <code>src/components/</code></p>
            <p>• <strong>Styles</strong> are being updated in <code>src/styles/</code></p>
            <p>• <strong>Data files</strong> are being generated in <code>src/data/</code></p>
            <p className="mt-3 font-medium">💡 Refresh your website to see the new pages and components!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteBuilderMonitor;
