/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Download, Users, TrendingUp, Building2, Truck, Car } from 'lucide-react';
import { WorkerTable } from '@/components/workers/WorkerTable';
import { WorkerForm } from '@/components/workers/WorkerForm';
import { WorkerStats } from '@/components/workers/WorkerStats';
import { WorkerFilters } from '@/components/workers/WorkerFilters';
import { useWorkerManagement } from '@/hooks/useWorkerManagement';
import DriverManagement from '@/components/carrier/DriverManagement';
import OwnerOperatorManagement from '@/components/carrier/OwnerOperatorManagement';
const WorkersPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('executive');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);

  // Set active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/workers/executive')) {
      setActiveTab('executive');
    } else if (path.includes('/workers/employee')) {
      setActiveTab('employee');
    } else if (path.includes('/workers/agents')) {
      setActiveTab('agents');
    } else if (path.includes('/workers/drivers')) {
      setActiveTab('drivers');
    } else if (path.includes('/workers/owner-operators')) {
      setActiveTab('owner-operators');
    } else {
      setActiveTab('executive');
    }
  }, [location.pathname]);
  const {
    workers,
    stats,
    filters,
    loading,
    handleCreateWorker,
    handleUpdateWorker,
    handleDeleteWorker,
    handleFilterChange,
    handleExport
  } = useWorkerManagement(activeTab);
  const handleEdit = (worker: unknown) => {
    setEditingWorker(worker);
    setShowForm(true);
  };
  const handleFormSubmit = (data: unknown) => {
    if (editingWorker) {
      handleUpdateWorker(editingWorker.id, data);
    } else {
      handleCreateWorker(data);
    }
    setShowForm(false);
    setEditingWorker(null);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingWorker(null);
  };
  const filteredWorkers = workers.filter(worker => worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || worker.email.toLowerCase().includes(searchQuery.toLowerCase()) || worker.department?.toLowerCase().includes(searchQuery.toLowerCase()));
  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'executive':
        return <Building2 className="h-4 w-4" />;
      case 'employee':
        return <Users className="h-4 w-4" />;
      case 'drivers':
        return <Truck className="h-4 w-4" />;
      case 'agents':
        return <TrendingUp className="h-4 w-4" />;
      case 'owner-operators':
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="container mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Workforce Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive management system for executives, employees, drivers, and agents
          </p>
        </div>

        {/* Action Bar */}
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search workers by name, email, or department..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 w-80" />
                </div>
                <Button variant={showFilters ? "default" : "outline"} onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleExport(activeTab)} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
                <Button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Plus className="h-4 w-4" />
                  Add Worker
                </Button>
              </div>
            </div>
            {showFilters && <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <WorkerFilters filters={filters} onFilterChange={handleFilterChange} workerType={activeTab} />
              </div>}
          </CardContent>
        </Card>

        {/* Enhanced Stats */}
        <WorkerStats stats={stats} />

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          

          <TabsContent value="executive" className="space-y-6">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Executive Leadership</CardTitle>
                    <CardDescription className="text-base">
                      C-suite executives and senior management personnel
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <WorkerTable workers={filteredWorkers} workerType="executive" onEdit={handleEdit} onDelete={handleDeleteWorker} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employee" className="space-y-6">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Employee Workforce</CardTitle>
                    <CardDescription className="text-base">
                      General workforce across all departments and locations
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <WorkerTable workers={filteredWorkers} workerType="employee" onEdit={handleEdit} onDelete={handleDeleteWorker} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <DriverManagement />
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <Card className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Sales & Service Agents</CardTitle>
                    <CardDescription className="text-base">
                      Sales representatives and customer service specialists
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <WorkerTable workers={filteredWorkers} workerType="agents" onEdit={handleEdit} onDelete={handleDeleteWorker} loading={loading} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="owner-operators" className="space-y-6">
            <OwnerOperatorManagement />
          </TabsContent>
        </Tabs>

        {/* Enhanced Worker Form Modal */}
        {showForm && <WorkerForm worker={editingWorker} workerType={activeTab} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />}
      </div>
    </div>;
};
export default WorkersPage;