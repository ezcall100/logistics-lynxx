import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Folder, 
  Shield, 
  Clock, 
  HardDrive, 
  Users, 
  Lock,
  Save,
  RotateCcw,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DocumentSettings = () => {
  const { toast } = useToast();
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [storageSettings, setStorageSettings] = useState({
    maxFileSize: '10',
    maxFilesPerUser: '100',
    totalStorageLimit: '1000',
    allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'png', 'jpg'],
    autoBackup: true,
    compressionEnabled: true,
    encryptionEnabled: true,
    versioningEnabled: true,
    maxVersions: '5'
  });

  const [accessTiers, setAccessTiers] = useState([
    {
      id: '1',
      name: 'Public',
      description: 'Accessible to all authenticated users',
      color: 'green',
      userCount: 45,
      documentCount: 12,
      permissions: ['view', 'download']
    },
    {
      id: '2',
      name: 'Internal',
      description: 'Accessible to company employees only',
      color: 'blue',
      userCount: 32,
      documentCount: 156,
      permissions: ['view', 'download', 'comment']
    },
    {
      id: '3',
      name: 'Confidential',
      description: 'Restricted to authorized personnel',
      color: 'orange',
      userCount: 8,
      documentCount: 43,
      permissions: ['view', 'download', 'edit', 'share']
    },
    {
      id: '4',
      name: 'Highly Confidential',
      description: 'Executive and legal team access only',
      color: 'red',
      userCount: 3,
      documentCount: 18,
      permissions: ['view', 'download', 'edit', 'delete', 'manage']
    }
  ]);

  const [retentionPolicies, setRetentionPolicies] = useState([
    {
      id: '1',
      name: 'HR Documents',
      category: 'Human Resources',
      retentionPeriod: '7 years',
      autoDelete: false,
      archiveAfter: '2 years',
      isActive: true
    },
    {
      id: '2',
      name: 'Financial Records',
      category: 'Finance',
      retentionPeriod: '10 years',
      autoDelete: false,
      archiveAfter: '3 years',
      isActive: true
    },
    {
      id: '3',
      name: 'Customer Data',
      category: 'Customer Relations',
      retentionPeriod: '5 years',
      autoDelete: true,
      archiveAfter: '1 year',
      isActive: true
    },
    {
      id: '4',
      name: 'Technical Documentation',
      category: 'Engineering',
      retentionPeriod: 'Indefinite',
      autoDelete: false,
      archiveAfter: '5 years',
      isActive: true
    }
  ]);

  const handleStorageChange = (field: string, value: string | boolean | string[]) => {
    setStorageSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Document settings saved',
        description: 'All document and storage settings have been updated successfully.',
      });
      setHasChanges(false);
    } catch (error) {
      toast({
        title: 'Error saving settings',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAccessTierBadge = (color: string) => {
    const variants = {
      'green': 'default',
      'blue': 'secondary',
      'orange': 'outline',
      'red': 'destructive'
    } as const;
    
    return variants[color as keyof typeof variants] || 'outline';
  };

  const formatFileSize = (sizeInMB: string) => {
    const size = parseInt(sizeInMB);
    if (size >= 1000) {
      return `${(size / 1000).toFixed(1)} GB`;
    }
    return `${size} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Storage Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Storage Configuration
          </CardTitle>
          <CardDescription>
            Manage document storage limits, file types, and data policies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                min="1"
                max="100"
                value={storageSettings.maxFileSize}
                onChange={(e) => handleStorageChange('maxFileSize', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxFilesPerUser">Max Files per User</Label>
              <Input
                id="maxFilesPerUser"
                type="number"
                min="10"
                max="1000"
                value={storageSettings.maxFilesPerUser}
                onChange={(e) => handleStorageChange('maxFilesPerUser', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalStorageLimit">Total Storage Limit (GB)</Label>
              <Input
                id="totalStorageLimit"
                type="number"
                min="100"
                max="10000"
                value={storageSettings.totalStorageLimit}
                onChange={(e) => handleStorageChange('totalStorageLimit', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically backup documents to external storage
                </p>
              </div>
              <Switch
                checked={storageSettings.autoBackup}
                onCheckedChange={(checked) => handleStorageChange('autoBackup', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>File Compression</Label>
                <p className="text-sm text-muted-foreground">
                  Compress files to save storage space
                </p>
              </div>
              <Switch
                checked={storageSettings.compressionEnabled}
                onCheckedChange={(checked) => handleStorageChange('compressionEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Document Encryption</Label>
                <p className="text-sm text-muted-foreground">
                  Encrypt documents at rest and in transit
                </p>
              </div>
              <Switch
                checked={storageSettings.encryptionEnabled}
                onCheckedChange={(checked) => handleStorageChange('encryptionEnabled', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Version Control</Label>
                <p className="text-sm text-muted-foreground">
                  Keep multiple versions of edited documents
                </p>
              </div>
              <Switch
                checked={storageSettings.versioningEnabled}
                onCheckedChange={(checked) => handleStorageChange('versioningEnabled', checked)}
              />
            </div>
          </div>

          {storageSettings.versioningEnabled && (
            <div className="space-y-2">
              <Label htmlFor="maxVersions">Maximum Versions to Keep</Label>
              <Select value={storageSettings.maxVersions} onValueChange={(value) => handleStorageChange('maxVersions', value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 versions</SelectItem>
                  <SelectItem value="5">5 versions</SelectItem>
                  <SelectItem value="10">10 versions</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Allowed File Types</Label>
            <div className="flex flex-wrap gap-2">
              {['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'png', 'jpg', 'jpeg', 'gif'].map((type) => (
                <Badge 
                  key={type}
                  variant={storageSettings.allowedFileTypes.includes(type) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    const currentTypes = storageSettings.allowedFileTypes;
                    const newTypes = currentTypes.includes(type)
                      ? currentTypes.filter(t => t !== type)
                      : [...currentTypes, type];
                    handleStorageChange('allowedFileTypes', newTypes);
                  }}
                >
                  .{type}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Access Control Tiers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Control Tiers
          </CardTitle>
          <CardDescription>
            Configure document access levels and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {accessTiers.map((tier) => (
              <Card key={tier.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        tier.color === 'green' ? 'bg-green-500' :
                        tier.color === 'blue' ? 'bg-blue-500' :
                        tier.color === 'orange' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}></div>
                      {tier.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{tier.description}</p>
                  </div>
                  <Badge variant={getAccessTierBadge(tier.color)}>
                    {tier.userCount} users
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">{tier.documentCount}</span> documents
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tier.permissions.map((permission) => (
                      <Badge key={permission} variant="secondary" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Users className="h-3 w-3 mr-1" />
                    Manage Users
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Retention Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Document Retention Policies
          </CardTitle>
          <CardDescription>
            Configure automatic document archiving and deletion policies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Retention Period</TableHead>
                <TableHead>Archive After</TableHead>
                <TableHead>Auto Delete</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {retentionPolicies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{policy.category}</Badge>
                  </TableCell>
                  <TableCell>{policy.retentionPeriod}</TableCell>
                  <TableCell>{policy.archiveAfter}</TableCell>
                  <TableCell>
                    {policy.autoDelete ? (
                      <Badge variant="destructive">Enabled</Badge>
                    ) : (
                      <Badge variant="secondary">Disabled</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={policy.isActive ? 'default' : 'secondary'}>
                      {policy.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        {policy.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Storage Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <HardDrive className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">756 GB</p>
                <p className="text-sm text-muted-foreground">Total Used</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Folder className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">2,347</p>
                <p className="text-sm text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Lock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-muted-foreground">Encrypted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Archived</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Card>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={!hasChanges || isLoading}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Changes
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save All Settings
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DocumentSettings;