import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const BackupSettings = () => {
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: {
      enabled: true,
      frequency: 'daily',
      time: '02:00',
      retention: 30
    },
    storage: {
      type: 'cloud',
      location: 'us-east-1',
      encryption: true
    },
    manual: {
      lastBackup: '2024-01-15 14:30:00',
      nextScheduled: '2024-01-16 02:00:00'
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleManualBackup = async () => {
    setIsLoading(true);
    setBackupProgress(0);
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleRestore = async () => {
    setIsLoading(true);
    // Simulate restore process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Backup & Recovery</h1>
          <p className="text-gray-600 mt-2">
            Configure automated backups and recovery options for your TMS data
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Automatic Backup Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                🔄
              </div>
              Automatic Backup Configuration
            </CardTitle>
            <CardDescription>
              Configure automated backup schedules and retention policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup-enabled">Enable Automatic Backups</Label>
              <Switch
                id="auto-backup-enabled"
                checked={backupSettings.autoBackup.enabled}
                onCheckedChange={(checked: boolean) => 
                  setBackupSettings(prev => ({
                    ...prev,
                    autoBackup: { ...prev.autoBackup, enabled: checked }
                  }))
                }
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <select
                  id="backup-frequency"
                  value={backupSettings.autoBackup.frequency}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                    setBackupSettings(prev => ({
                      ...prev,
                      autoBackup: { ...prev.autoBackup, frequency: e.target.value }
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <Label htmlFor="backup-time">Backup Time</Label>
                <Input
                  type="time"
                  value={backupSettings.autoBackup.time}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setBackupSettings(prev => ({
                      ...prev,
                      autoBackup: { ...prev.autoBackup, time: e.target.value }
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="retention-days">Retention (days)</Label>
                <Input
                  type="number"
                  value={backupSettings.autoBackup.retention}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setBackupSettings(prev => ({
                      ...prev,
                      autoBackup: { ...prev.autoBackup, retention: parseInt(e.target.value) }
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                💾
              </div>
              Storage Configuration
            </CardTitle>
            <CardDescription>
              Configure backup storage location and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="storage-type">Storage Type</Label>
                <select
                  id="storage-type"
                  value={backupSettings.storage.type}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                    setBackupSettings(prev => ({
                      ...prev,
                      storage: { ...prev.storage, type: e.target.value }
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="cloud">Cloud Storage</option>
                  <option value="local">Local Storage</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <Label htmlFor="storage-location">Storage Location</Label>
                <Input
                  value={backupSettings.storage.location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setBackupSettings(prev => ({
                      ...prev,
                      storage: { ...prev.storage, location: e.target.value }
                    }))
                  }
                  placeholder="us-east-1"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="encryption-enabled">Enable Encryption</Label>
              <Switch
                id="encryption-enabled"
                checked={backupSettings.storage.encryption}
                onCheckedChange={(checked: boolean) => 
                  setBackupSettings(prev => ({
                    ...prev,
                    storage: { ...prev.storage, encryption: checked }
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Manual Backup Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                ⚡
              </div>
              Manual Backup Controls
            </CardTitle>
            <CardDescription>
              Create manual backups and restore from previous backups
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Last Backup</Label>
                <p className="text-sm text-gray-600">{backupSettings.manual.lastBackup}</p>
              </div>
              <div>
                <Label>Next Scheduled</Label>
                <p className="text-sm text-gray-600">{backupSettings.manual.nextScheduled}</p>
              </div>
            </div>
            
            {backupProgress > 0 && backupProgress < 100 && (
              <div className="space-y-2">
                <Label>Backup Progress</Label>
                <Progress value={backupProgress} className="w-full" />
                <p className="text-sm text-gray-600">{backupProgress}% complete</p>
              </div>
            )}
            
            <div className="flex gap-3">
              <Button
                onClick={handleManualBackup}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Creating Backup...' : 'Create Manual Backup'}
              </Button>
              <Button
                variant="outline"
                onClick={handleRestore}
                disabled={isLoading}
              >
                Restore from Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Backup History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                📋
              </div>
              Recent Backups
            </CardTitle>
            <CardDescription>
              View recent backup history and status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '2024-01-15 14:30:00', status: 'completed', size: '2.3 GB' },
                { date: '2024-01-14 02:00:00', status: 'completed', size: '2.1 GB' },
                { date: '2024-01-13 02:00:00', status: 'completed', size: '2.0 GB' },
                { date: '2024-01-12 02:00:00', status: 'failed', size: '0 GB' }
              ].map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{backup.date}</p>
                    <p className="text-sm text-gray-600">{backup.size}</p>
                  </div>
                  <Badge 
                    variant={backup.status === 'completed' ? 'default' : 'destructive'}
                  >
                    {backup.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BackupSettings;
