import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Search, 
  Filter, 
  Plus, 
  RefreshCw, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  User,
  Calendar,
  Tag,
  AlertTriangle,
  Eye,
  Edit,
  Archive,
  Download,
  TrendingUp,
  Users,
  Activity,
  Brain,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  responseTime: number;
  resolutionTime?: number;
  tags: string[];
  attachments: number;
  comments: number;
  satisfaction?: number;
  mcpAgentId?: string;
  agentStatus?: 'online' | 'offline' | 'busy';
  confidenceScore?: number;
  aiAutomation?: boolean;
}

interface TicketMetrics {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  avgResponseTime: number;
  avgResolutionTime: number;
  satisfactionScore: number;
  ticketsByPriority: {
    priority: string;
    count: number;
    percentage: number;
  }[];
  ticketsByStatus: {
    status: string;
    count: number;
    percentage: number;
  }[];
  mcpAgentMetrics: {
    agentId: string;
    name: string;
    status: 'online' | 'offline' | 'busy';
    confidenceScore: number;
    ticketsHandled: number;
    avgResponseTime: number;
    automationRate: number;
  }[];
}

const SupportTickets: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<SupportTicket[]>([]);
  const [metrics, setMetrics] = useState<TicketMetrics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockTickets: SupportTicket[] = [
    {
      id: 'TICKET-001',
      title: 'Login authentication issue',
      description: 'Users are experiencing intermittent login failures with 2FA enabled',
      status: 'in_progress',
      priority: 'high',
      category: 'Authentication',
      assignedTo: 'Sarah Johnson',
      createdBy: 'john.doe@company.com',
      createdAt: '2024-01-15 09:30:00',
      updatedAt: '2024-01-15 14:45:00',
      lastActivity: '2024-01-15 14:45:00',
      responseTime: 15,
      resolutionTime: 320,
      tags: ['authentication', '2fa', 'login'],
      attachments: 2,
      comments: 8,
      satisfaction: 4,
      mcpAgentId: 'agent-support-001',
      agentStatus: 'online',
      confidenceScore: 0.92,
      aiAutomation: true
    },
    {
      id: 'TICKET-002',
      title: 'Dashboard loading slowly',
      description: 'Dashboard takes more than 10 seconds to load on mobile devices',
      status: 'open',
      priority: 'medium',
      category: 'Performance',
      assignedTo: 'Mike Chen',
      createdBy: 'jane.smith@company.com',
      createdAt: '2024-01-15 11:15:00',
      updatedAt: '2024-01-15 11:15:00',
      lastActivity: '2024-01-15 11:15:00',
      responseTime: 45,
      tags: ['performance', 'mobile', 'dashboard'],
      attachments: 1,
      comments: 3,
      mcpAgentId: 'agent-support-002',
      agentStatus: 'online',
      confidenceScore: 0.88,
      aiAutomation: false
    },
    {
      id: 'TICKET-003',
      title: 'API rate limiting errors',
      description: 'Getting 429 errors when making multiple API calls',
      status: 'resolved',
      priority: 'critical',
      category: 'API',
      assignedTo: 'David Wilson',
      createdBy: 'mike.johnson@company.com',
      createdAt: '2024-01-14 16:20:00',
      updatedAt: '2024-01-15 10:30:00',
      lastActivity: '2024-01-15 10:30:00',
      responseTime: 5,
      resolutionTime: 180,
      tags: ['api', 'rate-limiting', '429'],
      attachments: 0,
      comments: 12,
      satisfaction: 5,
      mcpAgentId: 'agent-support-003',
      agentStatus: 'online',
      confidenceScore: 0.95,
      aiAutomation: true
    },
    {
      id: 'TICKET-004',
      title: 'Export functionality broken',
      description: 'Cannot export data to CSV format',
      status: 'open',
      priority: 'low',
      category: 'Features',
      assignedTo: 'Unassigned',
      createdBy: 'alice.brown@company.com',
      createdAt: '2024-01-15 13:45:00',
      updatedAt: '2024-01-15 13:45:00',
      lastActivity: '2024-01-15 13:45:00',
      responseTime: 120,
      tags: ['export', 'csv', 'features'],
      attachments: 1,
      comments: 1,
      mcpAgentId: 'agent-support-004',
      agentStatus: 'busy',
      confidenceScore: 0.76,
      aiAutomation: false
    },
    {
      id: 'TICKET-005',
      title: 'Payment processing failed',
      description: 'Credit card payments are failing with error code 500',
      status: 'escalated',
      priority: 'critical',
      category: 'Billing',
      assignedTo: 'Lisa Davis',
      createdBy: 'robert.garcia@company.com',
      createdAt: '2024-01-15 08:00:00',
      updatedAt: '2024-01-15 15:20:00',
      lastActivity: '2024-01-15 15:20:00',
      responseTime: 2,
      tags: ['payment', 'billing', 'critical'],
      attachments: 3,
      comments: 15,
      mcpAgentId: 'agent-support-005',
      agentStatus: 'online',
      confidenceScore: 0.98,
      aiAutomation: true
    }
  ];

  const mockMetrics: TicketMetrics = {
    totalTickets: 156,
    openTickets: 23,
    resolvedTickets: 128,
    avgResponseTime: 28,
    avgResolutionTime: 245,
    satisfactionScore: 4.2,
    ticketsByPriority: [
      { priority: 'Critical', count: 8, percentage: 5.1 },
      { priority: 'High', count: 25, percentage: 16.0 },
      { priority: 'Medium', count: 67, percentage: 42.9 },
      { priority: 'Low', count: 56, percentage: 35.9 }
    ],
    ticketsByStatus: [
      { status: 'Open', count: 23, percentage: 14.7 },
      { status: 'In Progress', count: 15, percentage: 9.6 },
      { status: 'Resolved', count: 128, percentage: 82.1 }
    ],
    mcpAgentMetrics: [
      {
        agentId: 'agent-support-001',
        name: 'Support Agent Alpha',
        status: 'online',
        confidenceScore: 0.92,
        ticketsHandled: 45,
        avgResponseTime: 12,
        automationRate: 78
      },
      {
        agentId: 'agent-support-002',
        name: 'Support Agent Beta',
        status: 'online',
        confidenceScore: 0.88,
        ticketsHandled: 38,
        avgResponseTime: 18,
        automationRate: 65
      },
      {
        agentId: 'agent-support-003',
        name: 'Support Agent Gamma',
        status: 'busy',
        confidenceScore: 0.95,
        ticketsHandled: 52,
        avgResponseTime: 8,
        automationRate: 85
      }
    ]
  };

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTickets(mockTickets);
      setFilteredTickets(mockTickets);
      setMetrics(mockMetrics);
      setMcpStatus('connected');
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter tickets based on search and filters
    let filtered = tickets;

    if (searchQuery) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (priorityFilter) {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(ticket => ticket.category === categoryFilter);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'escalated': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <XCircle className="h-4 w-4" />;
      case 'escalated': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Support Tickets
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          User support requests, ticket management, resolution tracking
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Headphones className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Support Tickets
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${mcpStatus === 'connected' ? 'bg-green-500' : mcpStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              MCP {mcpStatus === 'connected' ? 'Connected' : mcpStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          User support requests, ticket management, resolution tracking with AI automation
        </p>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tickets</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalTickets}</p>
              </div>
              <Headphones className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Open Tickets</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{metrics.openTickets}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{metrics.avgResponseTime}m</p>
              </div>
              <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
        <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Satisfaction Score</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{metrics.satisfactionScore}/5</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      )}

      {/* MCP Agent Performance */}
      {metrics && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            MCP Agent Performance
              </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.mcpAgentMetrics.map((agent) => (
              <div key={agent.agentId} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{agent.name}</h4>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(agent.status)}`}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{agent.status}</span>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                    <span className="font-medium">{(agent.confidenceScore * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tickets Handled:</span>
                    <span className="font-medium">{agent.ticketsHandled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg Response:</span>
                    <span className="font-medium">{agent.avgResponseTime}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Automation:</span>
                    <span className="font-medium">{agent.automationRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
              <option value="escalated">Escalated</option>
            </select>
            
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="1d">Last 24h</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Support Tickets ({filteredTickets.length})
            </h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Response Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  MCP Agent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          {ticket.aiAutomation && (
                            <Zap className="h-4 w-4 text-yellow-500" title="AI Automated" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {ticket.id}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {ticket.title}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Tag className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {ticket.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      <span className="ml-1">{ticket.status.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                       <AlertTriangle className="h-3 w-3 mr-1" />
                       {ticket.priority}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {ticket.assignedTo}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {ticket.responseTime}m
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ticket.mcpAgentId && (
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(ticket.agentStatus || 'offline')}`}></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {(ticket.confidenceScore || 0) * 100}%
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Archive className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
