import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Calendar,
  Download,
  Plus,
  Filter
} from 'lucide-react';

interface FinancialData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  monthlyGrowth: number;
  fuelExpenses: number;
  maintenanceExpenses: number;
  insuranceExpenses: number;
  otherExpenses: number;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const FinancialTracking: React.FC = () => {
  const [financialData] = useState<FinancialData>({
    totalRevenue: 45000,
    totalExpenses: 28000,
    netProfit: 17000,
    profitMargin: 37.8,
    monthlyGrowth: 12.5,
    fuelExpenses: 12000,
    maintenanceExpenses: 8000,
    insuranceExpenses: 2000,
    otherExpenses: 6000
  });

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-01-20',
      description: 'Load #1042 - LA to Phoenix',
      amount: 2500,
      type: 'income',
      category: 'Freight',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-19',
      description: 'Fuel purchase - Pilot Travel Center',
      amount: -450,
      type: 'expense',
      category: 'Fuel',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-01-18',
      description: 'Tire replacement',
      amount: -800,
      type: 'expense',
      category: 'Maintenance',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-01-17',
      description: 'Load #1041 - Phoenix to LA',
      amount: 2200,
      type: 'income',
      category: 'Freight',
      status: 'completed'
    },
    {
      id: '5',
      date: '2024-01-16',
      description: 'Insurance premium',
      amount: -500,
      type: 'expense',
      category: 'Insurance',
      status: 'completed'
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Tracking</h1>
          <p className="text-gray-600">Monitor your income, expenses, and profitability</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
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
          <h3 className="text-2xl font-bold text-gray-900">${financialData.totalRevenue.toLocaleString()}</h3>
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-sm text-green-600 mt-1">+{financialData.monthlyGrowth}% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${financialData.totalExpenses.toLocaleString()}</h3>
          <p className="text-gray-600">Total Expenses</p>
          <p className="text-sm text-red-600 mt-1">+8.2% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${financialData.netProfit.toLocaleString()}</h3>
          <p className="text-gray-600">Net Profit</p>
          <p className="text-sm text-green-600 mt-1">+{financialData.profitMargin}% margin</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{financialData.profitMargin}%</h3>
          <p className="text-gray-600">Profit Margin</p>
          <p className="text-sm text-green-600 mt-1">+2.1% vs last month</p>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-red-900">Fuel Expenses</h4>
            </div>
            <div className="text-2xl font-bold text-red-900">${financialData.fuelExpenses.toLocaleString()}</div>
            <p className="text-sm text-red-700">42.9% of total expenses</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              <h4 className="font-medium text-orange-900">Maintenance</h4>
            </div>
            <div className="text-2xl font-bold text-orange-900">${financialData.maintenanceExpenses.toLocaleString()}</div>
            <p className="text-sm text-orange-700">28.6% of total expenses</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-blue-900">Insurance</h4>
            </div>
            <div className="text-2xl font-bold text-blue-900">${financialData.insuranceExpenses.toLocaleString()}</div>
            <p className="text-sm text-blue-700">7.1% of total expenses</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Plus className="w-5 h-5 text-gray-600" />
              <h4 className="font-medium text-gray-900">Other Expenses</h4>
            </div>
            <div className="text-2xl font-bold text-gray-900">${financialData.otherExpenses.toLocaleString()}</div>
            <p className="text-sm text-gray-700">21.4% of total expenses</p>
          </div>
        </div>
      </div>

      {/* Revenue vs Expenses Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Expenses</h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Revenue vs expenses chart will be displayed here</p>
            <p className="text-sm text-gray-500">Monthly comparison and trends</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button className="btn-outline flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.category === 'Freight' ? 'text-blue-600 bg-blue-50' :
                      transaction.category === 'Fuel' ? 'text-red-600 bg-red-50' :
                      transaction.category === 'Maintenance' ? 'text-orange-600 bg-orange-50' :
                      'text-gray-600 bg-gray-50'
                    }`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
            <BarChart3 className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Generate Report</h3>
          <p className="text-sm text-gray-600 mb-4">Create detailed financial reports</p>
          <button className="btn-outline w-full">Generate Report</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Tax Preparation</h3>
          <p className="text-sm text-gray-600 mb-4">Export data for tax filing</p>
          <button className="btn-outline w-full">Export for Taxes</button>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-medium text-gray-900 mb-1">Budget Planning</h3>
          <p className="text-sm text-gray-600 mb-4">Plan your monthly budget</p>
          <button className="btn-outline w-full">Plan Budget</button>
        </div>
      </div>

      {/* Financial Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Positive Trends</h4>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Revenue increased by 12.5% this month</li>
                <li>• Profit margin improved by 2.1%</li>
                <li>• Fuel efficiency improved by 8%</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Optimization Opportunities</h4>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Consider fuel cards for better rates</li>
                <li>• Schedule preventive maintenance</li>
                <li>• Negotiate better insurance rates</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <TrendingDown className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">Areas of Concern</h4>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Maintenance costs increased by 15%</li>
                <li>• Fuel prices up 8% this month</li>
                <li>• Insurance costs rising</li>
              </ul>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">Cash Flow</h4>
              </div>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Positive cash flow maintained</li>
                <li>• Emergency fund: $8,500</li>
                <li>• Next major expense: $2,000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTracking;
