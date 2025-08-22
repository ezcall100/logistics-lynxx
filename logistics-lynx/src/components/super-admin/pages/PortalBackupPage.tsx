import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, Download, Upload, RefreshCw, Clock, Calendar,
  CheckCircle, AlertTriangle, Play, Pause, Stop,
  HardDrive, Cloud, Archive, Trash2, Settings,
  TrendingUp, TrendingDown, Minus, Target
} from 'lucide-react';

interface BackupJob {
  id: string;
  portalId: string;
  portalName: string;
  type: 'full' | 'incremental' | 'differential';
  status: 'running' | 'completed' | 'failed' | 'scheduled' | 'paused';
  size: number;
  progress: number;
  startTime: string;
  endTime?: string;
  duration?: number;
  location: 'local' | 'cloud' | 'hybrid';
  retention: number;
  compression: boolean;
  encryption: boolean;
}

interface BackupSchedule {
  id: string;
  portalId: string;
  portalName: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  type: 'full' | 'incremental';
  enabled: boolean;
  lastRun: string;
  nextRun: string;
}

const PortalBackupPage = () => {
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([]);
  const [backupSchedules, setBackupSchedules] = useState<BackupSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadBackupData();
  }, []);

  const loadBackupData = async () => {
    setLoading(true);
    try {
      // Mock backup jobs data
      const mockJobs: BackupJob[] = [
        {
          id: 'backup-001',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          type: 'full',
          status: 'completed',
          size: 2.5,
          progress: 100,
          startTime: '2024-01-15T02:00:00Z',
          endTime: '2024-01-15T02:45:00Z',
          duration: 45,
          location: 'cloud',
          retention: 30,
          compression: true,
          encryption: true
        },
        {
          id: 'backup-002',
          portalId: 'portal-002',
          portalName: 'Broker Portal',
          type: 'incremental',
          status: 'running',
          size: 0.8,
          progress: 65,
          startTime: '2024-01-15T10:30:00Z',
          location: 'local',
          retention: 7,
          compression: true,
          encryption: false
        },
        {
          id: 'backup-003',
          portalId: 'portal-003',
          portalName: 'Shipper Portal',
          type: 'full',
          status: 'scheduled',
          size: 3.2,
          progress: 0,
          startTime: '2024-01-15T23:00:00Z',
          location: 'hybrid',
          retention: 90,
          compression: true,
          encryption: true
        }
      ];

      const mockSchedules: BackupSchedule[] = [
        {
          id: 'schedule-001',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          frequency: 'daily',
          time: '02:00',
          type: 'full',
          enabled: true,
          lastRun: '2024-01-15T02:00:00Z',
          nextRun: '2024-01-16T02:00:00Z'
        },
        {
          id: 'schedule-002',
          portalId: 'portal-002',
          portalName: 'Broker Portal',
          frequency: 'weekly',
          time: '03:00',
          type: 'full',
          enabled: true,
          lastRun: '2024-01-14T03:00:00Z',
          nextRun: '2024-01-21T03:00:00Z'
        },
        {
          id: 'schedule-003',
          portalId: 'portal-003',
          portalName: 'Shipper Portal',
          frequency: 'daily',
          time: '23:00',
          type: 'incremental',
          enabled: false,
          lastRun: '2024-01-14T23:00:00Z',
          nextRun: '2024-01-15T23:00:00Z'
        }
      ];

      setBackupJobs(mockJobs);
      setBackupSchedules(mockSchedules);
      if (mockJobs.length > 0) {
        setSelectedPortal(mockJobs[0].portalId);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load backup data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'scheduled': return 'bg-yellow-500';
      case 'paused': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'running': return Play;
      case 'failed': return AlertTriangle;
      case 'scheduled': return Clock;
      case 'paused': return Pause;
      default: return Clock;
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'cloud': return Cloud;
      case 'local': return HardDrive;
      case 'hybrid': return Database;
      default: return Database;
    }
  };

  const formatFileSize = (size: number) => {
    if (size >= 1024) {
      return `${(size / 1024).toFixed(1)} GB`;
    }
    return `${size.toFixed(1)} MB`;
  };

  const selectedPortalJobs = backupJobs.filter(job => job.portalId === selectedPortal);
  const selectedPortalSchedule = backupSchedules.find(schedule => schedule.portalId === selectedPortal);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Backup...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Backup</h1>
          <p className="text-muted-foreground">
            Backup management and disaster recovery for all portals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Restore
          </Button>
          <Button>
            <Database className="w-4 h-4 mr-2" />
            Create Backup
          </Button>
          <Button onClick={loadBackupData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Portal Selection */}
      <div className="flex gap-2">
        {Array.from(new Set(backupJobs.map(job => job.portalId))).map((portalId) => {
          const job = backupJobs.find(j => j.portalId === portalId);
          return (
            <Button
              key={portalId}
              variant={selectedPortal === portalId ? "default" : "outline"}
              onClick={() => setSelectedPortal(portalId)}
            >
              {job?.portalName}
            </Button>
          );
        })}
      </div>

      {selectedPortal && (
        <>
          {/* Backup Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPortalJobs.length}</div>
                <p className="text-xs text-muted-foreground">
                  {selectedPortalJobs.filter(job => job.status === 'completed').length} completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Size</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatFileSize(selectedPortalJobs.reduce((sum, job) => sum + job.size, 0))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all backups
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedPortalJobs.length > 0 ? 
                    new Date(selectedPortalJobs[0].startTime).toLocaleDateString() : 
                    'Never'
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedPortalJobs.length > 0 ? 
                    new Date(selectedPortalJobs[0].startTime).toLocaleTimeString() : 
                    'No backups found'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Schedule Status</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {selectedPortalSchedule?.enabled ? 'Active' : 'Inactive'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {selectedPortalSchedule?.frequency} backups
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Backup Details */}
          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs">Backup Jobs</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
            </TabsList>

            <TabsContent value="jobs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Backup Jobs</CardTitle>
                  <CardDescription>
                    Latest backup operations for {selectedPortalJobs[0]?.portalName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPortalJobs.length > 0 ? (
                      selectedPortalJobs.map((job) => {
                        const StatusIcon = getStatusIcon(job.status);
                        const LocationIcon = getLocationIcon(job.location);
                        
                        return (
                          <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className={`p-2 rounded-full ${getStatusColor(job.status)} text-white`}>
                                <StatusIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {job.type.charAt(0).toUpperCase() + job.type.slice(1)} Backup
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {formatFileSize(job.size)} • {job.location} • {job.retention} days retention
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Started: {new Date(job.startTime).toLocaleString()}
                                  {job.endTime && ` • Duration: ${job.duration} minutes`}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <LocationIcon className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm capitalize">{job.location}</span>
                              </div>
                              <Badge className={`${getStatusColor(job.status)} text-white`}>
                                {job.status}
                              </Badge>
                              {job.status === 'running' && (
                                <Progress value={job.progress} className="w-20" />
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <Database className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">No backup jobs found</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Backup Schedule</CardTitle>
                  <CardDescription>
                    Configure automated backup schedules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedPortalSchedule ? (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Schedule Status</span>
                            <Badge variant={selectedPortalSchedule.enabled ? 'default' : 'secondary'}>
                              {selectedPortalSchedule.enabled ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Frequency:</span>
                              <span className="capitalize">{selectedPortalSchedule.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time:</span>
                              <span>{selectedPortalSchedule.time}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Type:</span>
                              <span className="capitalize">{selectedPortalSchedule.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="font-medium mb-2">Next Run</div>
                          <div className="text-sm space-y-2">
                            <div className="flex justify-between">
                              <span>Date:</span>
                              <span>{new Date(selectedPortalSchedule.nextRun).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time:</span>
                              <span>{new Date(selectedPortalSchedule.nextRun).toLocaleTimeString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Last Run:</span>
                              <span>{new Date(selectedPortalSchedule.lastRun).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Settings className="w-4 h-4 mr-2" />
                          Edit Schedule
                        </Button>
                        <Button variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Run Now
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No backup schedule configured</p>
                      <Button className="mt-2">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure Schedule
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="storage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Overview</CardTitle>
                  <CardDescription>
                    Backup storage locations and usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 border rounded-lg text-center">
                      <Cloud className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="font-medium">Cloud Storage</div>
                      <div className="text-sm text-muted-foreground">15.2 GB used</div>
                      <Progress value={65} className="mt-2" />
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <HardDrive className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="font-medium">Local Storage</div>
                      <div className="text-sm text-muted-foreground">8.7 GB used</div>
                      <Progress value={45} className="mt-2" />
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Database className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="font-medium">Hybrid Storage</div>
                      <div className="text-sm text-muted-foreground">12.3 GB used</div>
                      <Progress value={78} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PortalBackupPage;
