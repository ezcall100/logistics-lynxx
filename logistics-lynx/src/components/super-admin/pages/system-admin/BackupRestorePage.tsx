import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Download, 
  Upload, 
  RefreshCw,
  Clock,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Database,
  HardDrive,
  Cloud,
  Shield,
  Calendar,
  FileText,
  Archive,
  Zap,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Save,
  X
} from 'lucide-react';

interface BackupJob {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  status: 'running' | 'completed' | 'failed' | 'scheduled' | 'paused';
  size: string;
  duration: string;
  createdAt: string;
  nextRun: string;
  retention: string;
  location: 'local' | 'cloud' | 'hybrid';
  progress?: number;
}

interface RestorePoint {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  createdAt: string;
  status: 'available' | 'corrupted' | 'restoring';
  checksum: string;
  location: 'local' | 'cloud';
  description: string;
}

interface BackupSchedule {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string;
  days: string[];
  enabled: boolean;
  lastRun: string;
  nextRun: string;
  retention: number;
}

const BackupRestorePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
  const [showCreateBackup, setShowCreateBackup] = useState(false);
  
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([
    {
      id: '1',
      name: 'Daily Full Backup',
      type: 'full',
      status: 'completed',
      size: '2.4 GB',
      duration: '15m 32s',
      createdAt: '2024-01-15 02:00:00',
      nextRun: '2024-01-16 02:00:00',
      retention: '30 days',
      location: 'cloud'
    },
    {
      id: '2',
      name: 'Hourly Incremental',
      type: 'incremental',
      status: 'running',
      size: '156 MB',
      duration: '2m 15s',
      createdAt: '2024-01-15 14:00:00',
      nextRun: '2024-01-15 15:00:00',
      retention: '7 days',
      location: 'local',
      progress: 65
    },
    {
      id: '3',
      name: 'Weekly Differential',
      type: 'differential',
      status: 'scheduled',
      size: '1.2 GB',
      duration: '8m 45s',
      createdAt: '2024-01-14 02:00:00',
      nextRun: '2024-01-21 02:00:00',
      retention: '90 days',
      location: 'hybrid'
    },
    {
      id: '4',
      name: 'Monthly Archive',
      type: 'full',
      status: 'failed',
      size: '0 B',
      duration: '0s',
      createdAt: '2024-01-01 02:00:00',
      nextRun: '2024-02-01 02:00:00',
      retention: '1 year',
      location: 'cloud'
    }
  ]);

  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>([
    {
      id: '1',
      name: 'Full Backup - 2024-01-15',
      type: 'full',
      size: '2.4 GB',
      createdAt: '2024-01-15 02:00:00',
      status: 'available',
      checksum: 'a1b2c3d4e5f6',
      location: 'cloud',
      description: 'Complete system backup including all databases and files'
    },
    {
      id: '2',
      name: 'Incremental - 2024-01-15 14:00',
      type: 'incremental',
      size: '156 MB',
      createdAt: '2024-01-15 14:00:00',
      status: 'available',
      checksum: 'b2c3d4e5f6a1',
      location: 'local',
      description: 'Incremental backup of changes since last full backup'
    },
    {
      id: '3',
      name: 'Differential - 2024-01-14',
      type: 'differential',
      size: '1.2 GB',
      createdAt: '2024-01-14 02:00:00',
      status: 'available',
      checksum: 'c3d4e5f6a1b2',
      location: 'hybrid',
      description: 'Differential backup since last full backup'
    }
  ]);

  const [schedules, setSchedules] = useState<BackupSchedule[]>([
    {
      id: '1',
      name: 'Daily Full Backup',
      frequency: 'daily',
      time: '02:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      enabled: true,
      lastRun: '2024-01-15 02:00:00',
      nextRun: '2024-01-16 02:00:00',
      retention: 30
    },
    {
      id: '2',
      name: 'Hourly Incremental',
      frequency: 'daily',
      time: '00:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      enabled: true,
      lastRun: '2024-01-15 14:00:00',
      nextRun: '2024-01-15 15:00:00',
      retention: 7
    },
    {
      id: '3',
      name: 'Weekly Differential',
      frequency: 'weekly',
      time: '02:00',
      days: ['Sunday'],
      enabled: true,
      lastRun: '2024-01-14 02:00:00',
      nextRun: '2024-01-21 02:00:00',
      retention: 90
    }
  ]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh backup data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    setIsLoading(true);
    try {
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newBackup: BackupJob = {
        id: Date.now().toString(),
        name: 'Manual Backup',
        type: 'full',
        status: 'completed',
        size: '2.1 GB',
        duration: '12m 30s',
        createdAt: new Date().toISOString(),
        nextRun: 'Manual',
        retention: '30 days',
        location: 'cloud'
      };
      
      setBackupJobs(prev => [newBackup, ...prev]);
      setShowCreateBackup(false);
    } catch (error) {
      console.error('Failed to create backup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (restorePointId: string) => {
    setIsLoading(true);
    try {
      // Simulate restore process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setRestorePoints(prev => prev.map(point => 
        point.id === restorePointId 
          ? { ...point, status: 'available' }
          : point
      ));
      
      console.log(`Restored from backup: ${restorePointId}`);
    } catch (error) {
      console.error('Failed to restore backup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleToggle = (scheduleId: string) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, enabled: !schedule.enabled }
        : schedule
    ));
  };

  const handleDeleteBackup = (backupId: string) => {
    setBackupJobs(prev => prev.filter(backup => backup.id !== backupId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'available':
        return 'bg-green-500';
      case 'running':
      case 'restoring':
        return 'bg-blue-500';
      case 'scheduled':
        return 'bg-yellow-500';
      case 'failed':
      case 'corrupted':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full':
        return <Database className="h-4 w-4" />;
      case 'incremental':
        return <Activity className="h-4 w-4" />;
      case 'differential':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Archive className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Backup & Restore</h1>
          <p className="text-muted-foreground">
            Manage system backups, schedules, and recovery points
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh">Auto Refresh</Label>
          </div>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowCreateBackup(true)} disabled={isLoading}>
            <Plus className="h-4 w-4 mr-2" />
            Create Backup
          </Button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-sm text-muted-foreground">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>

      {/* Backup Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{backupJobs.length}</div>
            <p className="text-xs text-muted-foreground">
              {backupJobs.filter(b => b.status === 'completed').length} successful
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 GB</div>
            <p className="text-xs text-muted-foreground">
              Across all backup locations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Schedules</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schedules.filter(s => s.enabled).length}</div>
            <p className="text-xs text-muted-foreground">
              Automated backup schedules
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restore Points</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{restorePoints.length}</div>
            <p className="text-xs text-muted-foreground">
              Available for restoration
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="backups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="backups">Backup Jobs</TabsTrigger>
          <TabsTrigger value="restore">Restore Points</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Jobs</CardTitle>
              <CardDescription>
                Recent backup operations and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Backup Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backupJobs.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(backup.type)}
                          <span className="font-medium">{backup.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {backup.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(backup.status)}`} />
                          <Badge variant={
                            backup.status === 'completed' ? 'default' :
                            backup.status === 'running' ? 'secondary' :
                            backup.status === 'failed' ? 'destructive' : 'outline'
                          }>
                            {backup.status}
                          </Badge>
                        </div>
                        {backup.progress && backup.status === 'running' && (
                          <Progress value={backup.progress} className="mt-2 h-1" />
                        )}
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>{backup.duration}</TableCell>
                      <TableCell>{backup.createdAt}</TableCell>
                      <TableCell>{backup.nextRun}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedBackup(backup.id)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteBackup(backup.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restore" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Restore Points</CardTitle>
              <CardDescription>
                Available backup points for system restoration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Restore Point</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restorePoints.map((point) => (
                    <TableRow key={point.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{point.name}</div>
                          <div className="text-sm text-muted-foreground">{point.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {point.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{point.size}</TableCell>
                      <TableCell>
                        <Badge variant={
                          point.status === 'available' ? 'default' :
                          point.status === 'corrupted' ? 'destructive' : 'secondary'
                        }>
                          {point.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{point.createdAt}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {point.location}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRestore(point.id)}
                            disabled={point.status !== 'available'}
                          >
                            <RotateCcw className="h-3 w-3" />
                            Restore
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Schedules</CardTitle>
              <CardDescription>
                Automated backup scheduling and configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Schedule Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Days</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {schedule.frequency}
                        </Badge>
                      </TableCell>
                      <TableCell>{schedule.time}</TableCell>
                      <TableCell>{schedule.days.join(', ')}</TableCell>
                      <TableCell>
                        <Switch
                          checked={schedule.enabled}
                          onCheckedChange={() => handleScheduleToggle(schedule.id)}
                        />
                      </TableCell>
                      <TableCell>{schedule.lastRun}</TableCell>
                      <TableCell>{schedule.nextRun}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Backup Performance</CardTitle>
                <CardDescription>Backup operation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <span className="font-bold text-green-600">95.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Duration</span>
                    <span className="font-bold">12m 30s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Storage Used</span>
                    <span className="font-bold">4.2 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Compression Ratio</span>
                    <span className="font-bold">2.4:1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Locations</CardTitle>
                <CardDescription>Backup storage distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Local Storage</span>
                    <span className="font-bold">1.8 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cloud Storage</span>
                    <span className="font-bold">2.4 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Available Space</span>
                    <span className="font-bold text-green-600">45.6 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Retention Compliance</span>
                    <span className="font-bold text-green-600">100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Backup Dialog */}
      {showCreateBackup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Create Manual Backup</CardTitle>
              <CardDescription>
                Create a new backup of the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-name">Backup Name</Label>
                <Input id="backup-name" placeholder="Enter backup name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-type">Backup Type</Label>
                <select id="backup-type" className="w-full p-2 border rounded">
                  <option value="full">Full Backup</option>
                  <option value="incremental">Incremental Backup</option>
                  <option value="differential">Differential Backup</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateBackup} disabled={isLoading}>
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Create Backup
                </Button>
                <Button variant="outline" onClick={() => setShowCreateBackup(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BackupRestorePage;
