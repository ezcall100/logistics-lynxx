import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface LiveUpdate {
  id: number;
  agent: string;
  action: string;
  file: string;
  timestamp: string;
}

interface PageFile {
  name: string;
  path: string;
  type: 'page' | 'component' | 'style';
  lastModified: string;
  status: 'updated' | 'created' | 'modifying';
  agent: string;
}

const LivePageUpdater: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [pageFiles, setPageFiles] = useState<PageFile[]>([]);
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>([]);
  const [totalUpdates, setTotalUpdates] = useState(0);
  const [activeAgents, setActiveAgents] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('ws://localhost:8086');
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
        console.log('🔌 Connected to live website updater');
        
        // Request initial live updates
        ws.send(JSON.stringify({ type: 'request_live_update' }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'live_page_update') {
            // Add new live update
            setLiveUpdates(prev => [{
              id: Date.now(),
              agent: data.agent,
              action: data.action,
              file: data.file,
              timestamp: data.timestamp
            }, ...prev.slice(0, 19)]); // Keep last 20 updates

            // Update page files
            const fileName = data.file.split('/').pop() || 'Unknown';
            const fileType = getFileType(fileName);
            
            setPageFiles(prev => {
              const existingFileIndex = prev.findIndex(f => f.name === fileName);
              const newFile: PageFile = {
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

          if (data.type === 'live_update_status') {
            setActiveAgents(data.data.filter((agent: { status: string }) => agent.status === 'updating').length);
          }

          if (data.systemStatus) {
            setTotalUpdates(data.systemStatus.totalUpdates || 0);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        console.log('🔌 Disconnected from live website updater');
        
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

  const getFileType = (fileName: string): 'page' | 'component' | 'style' => {
    if (fileName.includes('Page.tsx') || fileName.includes('page')) return 'page';
    if (fileName.includes('Component') || fileName.includes('component')) return 'component';
    if (fileName.includes('.css') || fileName.includes('style')) return 'style';
    return 'page';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'page': return '📄';
      case 'component': return '🧩';
      case 'style': return '🎨';
      default: return '📁';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'created': return 'bg-green-100 text-green-800';
      case 'updated': return 'bg-blue-100 text-blue-800';
      case 'modifying': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const triggerLiveUpdate = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'request_live_update' }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">⚡ Live Page Updater</h2>
          <p className="text-muted-foreground">
            Watch autonomous agents modify website pages in real-time
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
          <Button onClick={triggerLiveUpdate} size="sm">
            🔄 Trigger Live Update
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Updates</p>
                <p className="text-2xl font-bold">{totalUpdates}</p>
              </div>
              <div className="text-2xl">⚡</div>
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
                <p className="text-sm font-medium text-muted-foreground">Pages Modified</p>
                <p className="text-2xl font-bold">{pageFiles.length}</p>
              </div>
              <div className="text-2xl">📄</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Live Updates</p>
                <p className="text-2xl font-bold">{liveUpdates.length}</p>
              </div>
              <div className="text-2xl">🔄</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Files */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📄 Pages Being Modified Live
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {pageFiles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-2">⚡</div>
                    <p>Waiting for live page updates...</p>
                    <p className="text-sm">Pages will appear here as they are modified</p>
                  </div>
                ) : (
                  pageFiles.map((file, index) => (
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

        {/* Live Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔄 Live Update Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-3">
                {liveUpdates.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <div className="text-4xl mb-2">🔄</div>
                    <p>Waiting for live updates...</p>
                    <p className="text-sm">Updates will appear here as agents work</p>
                  </div>
                ) : (
                  liveUpdates.map((update) => (
                    <div key={update.id} className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-purple-800">
                            {update.agent}
                          </p>
                          <p className="text-sm text-purple-700">{update.action}</p>
                          <p className="text-xs text-purple-600 mt-1">
                            {update.file}
                          </p>
                        </div>
                        <span className="text-xs text-purple-600">
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
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-800">📋 How to See Live Page Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-purple-700">
            <p>• <strong>Live updates</strong> are modifying your website pages in real-time</p>
            <p>• <strong>Refresh your browser</strong> to see the changes on the actual pages</p>
            <p>• <strong>Check the home page</strong> for live update indicators</p>
            <p>• <strong>Look at the dashboard</strong> for live modification indicators</p>
            <p className="mt-3 font-medium">💡 The website pages are being modified live - refresh to see changes!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePageUpdater;
