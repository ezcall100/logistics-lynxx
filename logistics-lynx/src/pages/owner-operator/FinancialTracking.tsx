import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart,
  Download,
  Plus,
  Calendar,
  Receipt,
  CreditCard,
  Banknote
} from 'lucide-react';

interface FinancialData {
  category: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

const FinancialTracking: React.FC = () => {
  const [financialData] = useState<FinancialData[]>([
    { category: 'Revenue', amount: 28470, percentage: 100, trend: 'up' },
    { category: 'Fuel Costs', amount: 8540, percentage: 30, trend: 'down' },
    { category: 'Maintenance', amount: 1250, percentage: 4.4, trend: 'stable' },
    { category: 'Insurance', amount: 890, percentage: 3.1, trend: 'up' },
    { category: 'Tolls & Permits', amount: 670, percentage: 2.4, trend: 'down' },
    { category: 'Other Expenses', amount: 6400, percentage: 22.5, trend: 'stable' }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-15',
      description: 'Load #1042 Payment',
      amount: 1250,
      type: 'income',
      category: 'Freight Revenue',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Fuel Purchase - Pilot',
      amount: -420,
      type: 'expense',
      category: 'Fuel',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Oil Change Service',
      amount: -180,
      type: 'expense',
      category: 'Maintenance',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Load #1041 Payment',
      amount: 980,
      type: 'income',
      category: 'Freight Revenue',
      status: 'completed'
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Tracking</h1>
          <p className="text-gray-600">Monitor your business finances and cash flow</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${28470}</h3>
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-sm text-green-600 mt-1">+18% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${18750}</h3>
          <p className="text-gray-600">Total Expenses</p>
          <p className="text-sm text-red-600 mt-1">+8% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${9720}</h3>
          <p className="text-gray-600">Net Profit</p>
          <p className="text-sm text-green-600 mt-1">+28% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">34%</h3>
          <p className="text-gray-600">Profit Margin</p>
          <p className="text-sm text-green-600 mt-1">+2% vs last month</p>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
          <div className="space-y-4">
            {financialData.slice(1).map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.trend === 'up' ? 'bg-red-500' :
                    item.trend === 'down' ? 'bg-green-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{item.category}</p>
                    <p className="text-sm text-gray-600">{item.percentage}% of revenue</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${item.amount.toLocaleString()}</p>
                  <p className={`text-sm ${
                    item.trend === 'up' ? 'text-red-600' :
                    item.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'} {item.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Expenses</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-sm text-gray-400">Revenue vs Expenses breakdown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="btn-outline flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <p className="text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}${transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === 'completed' ? 'text-green-600 bg-green-50' :
                      transaction.status === 'pending' ? 'text-yellow-600 bg-yellow-50' :
                      'text-red-600 bg-red-50'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Receipt className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Invoice Management</h3>
          <p className="text-sm text-gray-600 mb-4">Create and track invoices for your loads</p>
          <button className="btn-outline w-full">Manage Invoices</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Expense Tracking</h3>
          <p className="text-sm text-gray-600 mb-4">Track fuel, maintenance, and other expenses</p>
          <button className="btn-outline w-full">Track Expenses</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Banknote className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Cash Flow Analysis</h3>
          <p className="text-sm text-gray-600 mb-4">Analyze your cash flow patterns and trends</p>
          <button className="btn-outline w-full">View Analysis</button>
        </div>
      </div>

      {/* Financial Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Strong Revenue Growth</p>
                <p className="text-sm text-green-700">Your revenue increased by 18% this month compared to last month.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Healthy Profit Margin</p>
                <p className="text-sm text-blue-700">Your 34% profit margin is above industry average of 28%.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <TrendingDown className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Fuel Cost Management</p>
                <p className="text-sm text-yellow-700">Consider fuel-efficient routes to reduce your 30% fuel expense.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <p className="font-medium text-purple-900">Expense Optimization</p>
                <p className="text-sm text-purple-700">Your expenses are well-managed with only 8% increase this month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTracking;
