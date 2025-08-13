import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Play, AlertTriangle, CheckCircle, XCircle, RefreshCw, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAutonomousFeature } from "@/hooks/useEntitlement";

interface AgentTask {
  id: string;
  fn_name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'quarantined';
  attempts: number;
  max_attempts: number;
  last_error?: string;
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

interface AgentRun {
  id: string;
  task_id: string;
  status: 'started' | 'completed' | 'failed';
  result?: any;
  error?: string;
  duration_ms: number;
  started_at: string;
  completed_at?: string;
}

interface QuarantinedTask {
  id: string;
  task_id: string;
  reason: string;
  last_error: string;
  quarantine_date: string;
  resolved_at?: string;
}

export function AgentDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const hasAutonomousFeature = useAutonomousFeature();
  const [selectedTask, setSelectedTask] = useState<AgentTask | null>(null);

  // Fetch agent tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ["agent-tasks"],
    queryFn: async () => {
      const response = await fetch("/api/agent/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json() as AgentTask[];
    },
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Fetch agent runs
  const { data: runs, isLoading: runsLoading } = useQuery({
    queryKey: ["agent-runs"],
    queryFn: async () => {
      const response = await fetch("/api/agent/runs");
      if (!response.ok) throw new Error("Failed to fetch runs");
      return response.json() as AgentRun[];
    },
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Fetch quarantined tasks
  const { data: quarantined, isLoading: quarantineLoading } = useQuery({
    queryKey: ["agent-quarantine"],
    queryFn: async () => {
      const response = await fetch("/api/agent/quarantine");
      if (!response.ok) throw new Error("Failed to fetch quarantine");
      return response.json() as QuarantinedTask[];
    },
    refetchInterval: 15000, // Refresh every 15 seconds
  });

  // Retry quarantined task mutation
  const retryMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await fetch(`/api/agent/quarantine/${taskId}/retry`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to retry task");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["agent-quarantine"] });
      toast({
        title: "Task Retried",
        description: "The task has been moved back to the queue.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Retry Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Manual task execution mutation
  const executeMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await fetch(`/api/agent/tasks/${taskId}/execute`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to execute task");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["agent-runs"] });
      toast({
        title: "Task Executed",
        description: "The task has been executed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Execution Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!hasAutonomousFeature) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Autonomous Agent Dashboard
          </CardTitle>
          <CardDescription>
            Manage and monitor autonomous agent tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">Feature Not Available</p>
              <p className="text-sm text-yellow-700">
                Autonomous agents are not available in your current plan. Upgrade to access this feature.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'running':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Running</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'quarantined':
        return <Badge variant="outline" className="border-red-200 text-red-700">Quarantined</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'running':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'quarantined':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Autonomous Agent Dashboard
          </CardTitle>
          <CardDescription>
            Manage and monitor autonomous agent tasks and execution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tasks">Active Tasks</TabsTrigger>
              <TabsTrigger value="runs">Execution History</TabsTrigger>
              <TabsTrigger value="quarantine">Quarantine</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Active Tasks</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["agent-tasks"] })}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {tasksLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Function</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks?.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-mono text-sm">{task.fn_name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            {getStatusBadge(task.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          {task.attempts}/{task.max_attempts}
                        </TableCell>
                        <TableCell>
                          {new Date(task.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Task Details</DialogTitle>
                                  <DialogDescription>
                                    Detailed information about task {task.id}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <strong>Function:</strong> {task.fn_name}
                                  </div>
                                  <div>
                                    <strong>Status:</strong> {task.status}
                                  </div>
                                  <div>
                                    <strong>Attempts:</strong> {task.attempts}/{task.max_attempts}
                                  </div>
                                  {task.last_error && (
                                    <div>
                                      <strong>Last Error:</strong>
                                      <pre className="mt-2 p-2 bg-red-50 text-red-700 rounded text-sm">
                                        {task.last_error}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            {task.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => executeMutation.mutate(task.id)}
                                disabled={executeMutation.isPending}
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="runs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Execution History</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["agent-runs"] })}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {runsLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Started</TableHead>
                      <TableHead>Completed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {runs?.slice(0, 20).map((run) => (
                      <TableRow key={run.id}>
                        <TableCell className="font-mono text-sm">{run.task_id.slice(0, 8)}...</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(run.status)}
                            {getStatusBadge(run.status)}
                          </div>
                        </TableCell>
                        <TableCell>{run.duration_ms}ms</TableCell>
                        <TableCell>
                          {new Date(run.started_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {run.completed_at ? new Date(run.completed_at).toLocaleString() : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>

            <TabsContent value="quarantine" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Quarantined Tasks</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["agent-quarantine"] })}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {quarantineLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead>Quarantined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quarantined?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">{item.task_id.slice(0, 8)}...</TableCell>
                        <TableCell>{item.reason}</TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate" title={item.last_error}>
                            {item.last_error}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(item.quarantine_date).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => retryMutation.mutate(item.task_id)}
                            disabled={retryMutation.isPending}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retry
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
