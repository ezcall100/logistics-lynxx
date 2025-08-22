import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit
} from 'lucide-react';

const DatabaseAdminPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [databaseStats, setDatabaseStats] = useState({
    totalTables: 156,
    activeConnections: 24,
    storageUsed: 2.4,
    storageTotal: 10,
    queryPerformance: 98.5,
    backupStatus: 'success',
    lastBackup: '2024-01-15 14:30:00'
  });

  const [tables, setTables] = useState([
    { name: 'users', size: '2.1 GB', records: 15420, status: 'healthy' },
    { name: 'orders', size: '8.7 GB', records: 89234, status: 'healthy' },
    { name: 'shipments', size: '5.2 GB', records: 45678, status: 'warning' },
    { name: 'payments', size: '1.8 GB', records: 12345, status: 'healthy' },
    { name: 'analytics', size: '12.3 GB', records: 234567, status: 'healthy' }
  ]);

  const [activeQueries, setActiveQueries] = useState([
    { id: 1, query: 'SELECT * FROM users WHERE status = "active"', duration: '2.3s', user: 'admin' },
    { id: 2, query: 'UPDATE orders SET status = "shipped"', duration: '1.8s', user: 'system' },
    { id: 3, query: 'INSERT INTO analytics (data) VALUES (...)', duration: '0.5s', user: 'analytics' }
  ]);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleBackup = () => {
    // Backup logic
    console.log('Initiating database backup...');
  };

  const handleOptimize = () => {
    // Optimization logic
    console.log('Starting database optimization...');
  };

  const handleViewTable = (table: any) => {
    setSelectedTable(table);
    setIsViewDialogOpen(true);
  };

  const handleEditTable = (table: any) => {
    setSelectedTable(table);
    setIsEditDialogOpen(true);
  };

  const handleDeleteTable = (table: any) => {
    setSelectedTable(table);
    setIsDeleteDialogOpen(true);
  };

  const handleViewQuery = (query: any) => {
    setSelectedQuery(query);
    setIsViewDialogOpen(true);
  };

  const handleEditQuery = (query: any) => {
    setSelectedQuery(query);
    setIsEditDialogOpen(true);
  };

  const handleDeleteQuery = (query: any) => {
    setSelectedQuery(query);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTable) {
      console.log('Deleting table:', selectedTable);
      // Implement actual delete logic here
      setIsDeleteDialogOpen(false);
      setSelectedTable(null);
    } else if (selectedQuery) {
      console.log('Deleting query:', selectedQuery);
      // Implement actual delete logic here
      setIsDeleteDialogOpen(false);
      setSelectedQuery(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Database Administration</h1>
          <p className="text-muted-foreground">Manage and monitor database performance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleBackup} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Backup
          </Button>
          <Button onClick={handleOptimize} variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Optimize
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{databaseStats.totalTables}</div>
            <p className="text-xs text-muted-foreground">Active database tables</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{databaseStats.activeConnections}</div>
            <p className="text-xs text-muted-foreground">Current connections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{databaseStats.storageUsed} GB</div>
            <p className="text-xs text-muted-foreground">
              {((databaseStats.storageUsed / databaseStats.storageTotal) * 100).toFixed(1)}% of {databaseStats.storageTotal} GB
            </p>
            <Progress value={(databaseStats.storageUsed / databaseStats.storageTotal) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Query Performance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{databaseStats.queryPerformance}%</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tables" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tables">Database Tables</TabsTrigger>
          <TabsTrigger value="queries">Active Queries</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="logs">Query Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="tables" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Tables</CardTitle>
              <CardDescription>Monitor table sizes and health status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tables.map((table) => (
                    <TableRow key={table.name}>
                      <TableCell className="font-medium">{table.name}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell>{table.records.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={table.status === 'healthy' ? 'default' : 'destructive'}>
                          {table.status === 'healthy' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          {table.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Activity className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewTable(table)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditTable(table)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Table
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteTable(table)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Table
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Queries</CardTitle>
              <CardDescription>Monitor currently running database queries</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeQueries.map((query) => (
                    <TableRow key={query.id}>
                      <TableCell className="font-mono text-sm">{query.query}</TableCell>
                      <TableCell>{query.duration}</TableCell>
                      <TableCell>{query.user}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="destructive">
                            <Pause className="h-3 w-3" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewQuery(query)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditQuery(query)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Query
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteQuery(query)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Query
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Status</CardTitle>
              <CardDescription>Database backup history and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Last Backup</h4>
                    <p className="text-sm text-muted-foreground">{databaseStats.lastBackup}</p>
                  </div>
                  <Badge variant={databaseStats.backupStatus === 'success' ? 'default' : 'destructive'}>
                    {databaseStats.backupStatus === 'success' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {databaseStats.backupStatus}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleBackup}>
                    <Download className="h-4 w-4 mr-2" />
                    Create Backup
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Query Logs</CardTitle>
              <CardDescription>Recent database query activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Query logs will be displayed here</p>
                <p className="text-sm">Enable query logging to see detailed information</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedTable?.name || selectedQuery?.id}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DatabaseAdminPage;
