/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Enhanced Icons for Factoring Portal
const Icons = {
  Dashboard: '📊',
  Invoices: '🧾',
  Payments: '💰',
  Clients: '👥',
  Disputes: '⚠️',
  Reports: '📋',
  Settings: '⚙️',
  Search: '🔍',
  Bell: '🔔',
  Profile: '👤',
  Home: '🏠',
  ArrowRight: '➡️',
  ArrowDown: '⬇️',
  Check: '✅',
  Warning: '⚠️',
  Error: '❌',
  Info: 'ℹ️',
  Clock: '⏰',
  Calendar: '📅',
  Dollar: '💵',
  Percent: '📊',
  Chart: '📈',
  File: '📄',
  Upload: '📤',
  Download: '📥',
  Send: '📤',
  Receive: '📥',
  Bank: '🏦',
  Credit: '💳',
  Calculator: '🧮',
  Document: '📋',
  Chat: '💬',
  Phone: '📞',
  Email: '📧',
  Lock: '🔒',
  Unlock: '🔓',
  Shield: '🛡️',
  Star: '⭐',
  Fire: '🔥',
  Rocket: '🚀',
  Target: '🎯',
  Trophy: '🏆',
  Medal: '🥇',
  Diamond: '💎',
  Sparkles: '✨',
  Money: '💸',
  Growth: '📈',
  Success: '✅',
  Pending: '⏳',
  Rejected: '❌',
  Approved: '✅',
  Processing: '🔄',
  Completed: '🎉',
  Overdue: '🚨',
  OnTime: '⏰',
  Early: '⚡',
  Late: '🐌',
  High: '🔴',
  Medium: '🟡',
  Low: '🟢',
  Broker: '🤝',
  Carrier: '🚛',
  Shipper: '📦',
  Factoring: '💼'
};

const FactoringPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState('all');

  // Sample data for the factoring portal
  const [factoringData, setFactoringData] = useState({
    outstandingReceivables: 2847500,
    totalInvoices: 847,
    averagePaymentTime: 2.3,
    factoringFees: 125000,
    overdueAccounts: 23,
    totalClients: 156,
    monthlyVolume: 12500000,
    approvalRate: 94.5
  });

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      client: 'ABC Trucking',
      amount: 12500,
      status: 'pending',
      submittedDate: '2024-01-15',
      dueDate: '2024-01-30',
      factoringFee: 375,
      advanceAmount: 12125,
      documents: ['POD', 'BOL', 'Rate Confirmation'],
      priority: 'high'
    },
    {
      id: 'INV-002',
      client: 'XYZ Logistics',
      amount: 8900,
      status: 'approved',
      submittedDate: '2024-01-14',
      dueDate: '2024-01-29',
      factoringFee: 267,
      advanceAmount: 8633,
      documents: ['POD', 'BOL'],
      priority: 'medium'
    },
    {
      id: 'INV-003',
      client: 'Fast Freight Co',
      amount: 15600,
      status: 'paid',
      submittedDate: '2024-01-10',
      dueDate: '2024-01-25',
      factoringFee: 468,
      advanceAmount: 15132,
      documents: ['POD', 'BOL', 'Rate Confirmation'],
      priority: 'low'
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 'CLI-001',
      name: 'ABC Trucking',
      type: 'carrier',
      creditRating: 'A+',
      avgPayDays: 2.1,
      totalFactored: 1250000,
      disputes: 2,
      status: 'active'
    },
    {
      id: 'CLI-002',
      name: 'XYZ Logistics',
      type: 'broker',
      creditRating: 'A',
      avgPayDays: 2.5,
      totalFactored: 890000,
      disputes: 1,
      status: 'active'
    },
    {
      id: 'CLI-003',
      name: 'Fast Freight Co',
      type: 'carrier',
      creditRating: 'B+',
      avgPayDays: 3.2,
      totalFactored: 650000,
      disputes: 3,
      status: 'active'
    }
  ]);

  const [disputes, setDisputes] = useState([
    {
      id: 'DSP-001',
      invoiceId: 'INV-004',
      client: 'ABC Trucking',
      issue: 'Missing POD',
      status: 'open',
      priority: 'high',
      assignedTo: 'John Smith',
      createdAt: '2024-01-15',
      lastUpdate: '2024-01-16'
    },
    {
      id: 'DSP-002',
      invoiceId: 'INV-005',
      client: 'XYZ Logistics',
      issue: 'Rate Discrepancy',
      status: 'resolved',
      priority: 'medium',
      assignedTo: 'Jane Doe',
      createdAt: '2024-01-10',
      lastUpdate: '2024-01-12'
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'approved': return 'text-blue-600 bg-blue-100';
      case 'paid': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'processing': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Factoring Portal</h2>
          <p className="text-gray-600">Initializing financial systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">{Icons.Factoring}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Factoring Portal</h1>
                <p className="text-sm text-gray-600">Financial Management & Invoice Factoring</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search invoices, clients, disputes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
              />
              <span className="absolute left-4 top-3.5 text-gray-400">{Icons.Search}</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 relative">
              <span className="text-xl">{Icons.Bell}</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                5
              </span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <span className="text-xl">{Icons.Settings}</span>
            </button>
            <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">FP</span>
              </div>
              <div>
                <p className="text-sm font-medium">Factoring Admin</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="px-6 py-2">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
              { id: 'invoices', label: 'Invoices', icon: Icons.Invoices },
              { id: 'payments', label: 'Payments', icon: Icons.Payments },
              { id: 'clients', label: 'Clients', icon: Icons.Clients },
              { id: 'disputes', label: 'Disputes', icon: Icons.Disputes },
              { id: 'reports', label: 'Reports', icon: Icons.Reports },
              { id: 'settings', label: 'Settings', icon: Icons.Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <>
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Outstanding Receivables</CardTitle>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">Total</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{formatCurrency(factoringData.outstandingReceivables)}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 mr-1">↗</span>
                      +8.5% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{factoringData.totalInvoices}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 mr-1">{Icons.Clock}</span>
                      Avg {factoringData.averagePaymentTime} days to pay
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Factoring Fees</CardTitle>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">Earned</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{formatCurrency(factoringData.factoringFees)}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-green-500 mr-1">{Icons.Percent}</span>
                      {factoringData.approvalRate}% approval rate
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-orange-500 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Overdue Accounts</CardTitle>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">Attention</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{factoringData.overdueAccounts}</div>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <span className="text-red-500 mr-1">{Icons.Warning}</span>
                      Requires immediate attention
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Pipeline */}
              <Card className="mb-8 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{Icons.Chart}</span>
                    Payment Pipeline
                    <Badge variant="secondary" className="ml-2">Real-time</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <div className="text-2xl font-bold text-yellow-600">Submitted</div>
                      <div className="text-4xl font-bold text-yellow-700">247</div>
                      <div className="text-sm text-yellow-600">Pending Review</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="text-2xl font-bold text-blue-600">Verified</div>
                      <div className="text-4xl font-bold text-blue-700">156</div>
                      <div className="text-sm text-blue-600">Ready for Payment</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="text-2xl font-bold text-green-600">Paid</div>
                      <div className="text-4xl font-bold text-green-700">444</div>
                      <div className="text-sm text-green-600">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <div className="text-2xl font-bold text-red-600">Disputed</div>
                      <div className="text-4xl font-bold text-red-700">23</div>
                      <div className="text-sm text-red-600">Under Review</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-xl">{Icons.Invoices}</span>
                      Recent Invoices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {invoices.slice(0, 5).map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{invoice.id}</div>
                            <div className="text-sm text-gray-600">{invoice.client}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{formatCurrency(invoice.amount)}</div>
                            <Badge className={`text-xs ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-xl">{Icons.Disputes}</span>
                      Active Disputes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {disputes.filter(d => d.status === 'open').map((dispute) => (
                        <div key={dispute.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                          <div>
                            <div className="font-medium">{dispute.invoiceId}</div>
                            <div className="text-sm text-gray-600">{dispute.issue}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">{dispute.client}</div>
                            <Badge className={`text-xs ${getPriorityColor(dispute.priority)}`}>
                              {dispute.priority}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">{Icons.Invoices}</span>
                  Invoice Management
                  <Badge variant="secondary" className="ml-2">Total: {invoices.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium">Invoice ID</th>
                        <th className="text-left py-3 px-4 font-medium">Client</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Due Date</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{invoice.id}</td>
                          <td className="py-3 px-4">{invoice.client}</td>
                          <td className="py-3 px-4 font-bold">{formatCurrency(invoice.amount)}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{invoice.dueDate}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm" variant="outline">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <Card className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-xl">{Icons.Clients}</span>
                  Client Management
                  <Badge variant="secondary" className="ml-2">Total: {clients.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clients.map((client) => (
                    <div key={client.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">{client.name}</h3>
                        <Badge className={client.type === 'carrier' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                          {client.type}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Credit Rating:</span>
                          <span className="font-medium">{client.creditRating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg Pay Days:</span>
                          <span className="font-medium">{client.avgPayDays}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Factored:</span>
                          <span className="font-medium">{formatCurrency(client.totalFactored)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Disputes:</span>
                          <span className="font-medium">{client.disputes}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">View Details</Button>
                        <Button size="sm" variant="outline" className="flex-1">Contact</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="mt-8 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{Icons.Rocket}</span>
                Quick Actions
                <Badge variant="secondary" className="ml-2">Power Tools</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="default" className="h-20 flex-col bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg">
                  <span className="text-xl mb-1">{Icons.Upload}</span>
                  <span className="text-sm font-medium">Import Invoices</span>
                  <span className="text-xs opacity-90">Bulk Upload</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                  <span className="text-xl mb-1">{Icons.Calculator}</span>
                  <span className="text-sm font-medium">Advance Calculator</span>
                  <span className="text-xs opacity-90">Fee Calculator</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                  <span className="text-xl mb-1">{Icons.Reports}</span>
                  <span className="text-sm font-medium">Generate Reports</span>
                  <span className="text-xs opacity-90">Financial Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-auto">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">© 2024 TMS Factoring Portal</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">Version 2.1.0</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-600">Port: 8080</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Financial Systems Online
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Help}</span>
                <span>Help</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Settings}</span>
                <span>Settings</span>
              </button>
              <button className="text-sm text-gray-600 hover:text-red-600 flex items-center space-x-1 transition-colors duration-200">
                <span>{Icons.Logout}</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FactoringPortal;
