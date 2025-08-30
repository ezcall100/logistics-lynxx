import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  PieChart,
  Target,
  Zap,
  Calculator,
  Download
} from 'lucide-react';

interface ProfitData {
  category: string;
  current: number;
  optimized: number;
  potential: number;
  percentage: number;
}

const ProfitMaximization: React.FC = () => {
  const [profitData] = useState<ProfitData[]>([
    {
      category: 'Load Selection',
      current: 72,
      optimized: 85,
      potential: 13,
      percentage: 18
    },
    {
      category: 'Route Optimization',
      current: 68,
      optimized: 82,
      potential: 14,
      percentage: 21
    },
    {
      category: 'Fuel Efficiency',
      current: 75,
      optimized: 88,
      potential: 13,
      percentage: 17
    },
    {
      category: 'Maintenance Costs',
      current: 80,
      optimized: 92,
      potential: 12,
      percentage: 15
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profit Maximization</h1>
          <p className="text-gray-600">Optimize your operations for maximum profitability</p>
        </div>
        <button className="btn-outline flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Analysis
        </button>
      </div>

      {/* Profit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">$9,720</h3>
          <p className="text-gray-600">Current Monthly Profit</p>
          <p className="text-sm text-green-600 mt-1">+18% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">$12,450</h3>
          <p className="text-gray-600">Optimized Potential</p>
          <p className="text-sm text-green-600 mt-1">+28% improvement</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">$2,730</h3>
          <p className="text-gray-600">Additional Profit</p>
          <p className="text-sm text-green-600 mt-1">$91/day potential</p>
        </div>
      </div>

      {/* Optimization Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Optimization Categories</h3>
        <div className="space-y-4">
          {profitData.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{item.category}</h4>
                <span className="text-sm font-semibold text-green-600">+${item.potential * 10}/day</span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Current Efficiency</span>
                    <span className="font-medium">{item.current}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: `${item.current}%` }}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Optimized Potential</span>
                    <span className="font-medium">{item.optimized}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${item.optimized}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Improvement Potential</span>
                <span className="font-semibold text-green-600">+{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-600">1</span>
              </div>
              <div>
                <p className="font-medium text-blue-900">Optimize Route Planning</p>
                <p className="text-sm text-blue-700">Use AI-powered routing to reduce empty miles by 15%</p>
                <p className="text-xs text-blue-600 mt-1">Potential: +$420/month</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-green-600">2</span>
              </div>
              <div>
                <p className="font-medium text-green-900">Load Selection Strategy</p>
                <p className="text-sm text-green-700">Focus on high-paying loads with better profit margins</p>
                <p className="text-xs text-green-600 mt-1">Potential: +$390/month</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-purple-600">3</span>
              </div>
              <div>
                <p className="font-medium text-purple-900">Fuel Management</p>
                <p className="text-sm text-purple-700">Implement fuel-efficient driving techniques</p>
                <p className="text-xs text-purple-600 mt-1">Potential: +$390/month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Revenue</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  defaultValue="28470"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Expenses</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  defaultValue="18750"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">Current Profit</span>
                <span className="font-bold text-green-600">$9,720</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-medium text-gray-900">Optimized Profit</span>
                <span className="font-bold text-blue-600">$12,450</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                <span className="font-medium text-gray-900">Additional Profit</span>
                <span className="font-bold text-purple-600">+$2,730</span>
              </div>
            </div>
            <button className="w-full btn-primary flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculate Optimization
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Profit Trends</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-sm text-gray-400">Monthly profit trends</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Expense Breakdown</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization</p>
              <p className="text-sm text-gray-400">Expense categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitMaximization;
