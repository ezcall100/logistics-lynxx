import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Target,
  Calculator,
  Lightbulb,
  Download
} from 'lucide-react';

interface ProfitData {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  monthlyGrowth: number;
  fuelCosts: number;
  maintenanceCosts: number;
  insuranceCosts: number;
}

const ProfitMaximization: React.FC = () => {
  const [profitData] = useState<ProfitData>({
    totalRevenue: 45000,
    totalExpenses: 28000,
    netProfit: 17000,
    profitMargin: 37.8,
    monthlyGrowth: 12.5,
    fuelCosts: 12000,
    maintenanceCosts: 8000,
    insuranceCosts: 2000
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profit Maximization</h1>
          <p className="text-gray-600">Optimize your earnings and reduce costs</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Profit Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${profitData.totalRevenue.toLocaleString()}</h3>
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-sm text-green-600 mt-1">+{profitData.monthlyGrowth}% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-red-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${profitData.totalExpenses.toLocaleString()}</h3>
          <p className="text-gray-600">Total Expenses</p>
          <p className="text-sm text-red-600 mt-1">+8.2% vs last month</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">${profitData.netProfit.toLocaleString()}</h3>
          <p className="text-gray-600">Net Profit</p>
          <p className="text-sm text-green-600 mt-1">+{profitData.profitMargin}% margin</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{profitData.profitMargin}%</h3>
          <p className="text-gray-600">Profit Margin</p>
          <p className="text-sm text-green-600 mt-1">+2.1% vs last month</p>
        </div>
      </div>

      {/* Optimization Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-medium text-red-900">Fuel Costs</span>
              </div>
              <span className="font-bold text-red-900">${profitData.fuelCosts.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-orange-600" />
                </div>
                <span className="font-medium text-orange-900">Maintenance</span>
              </div>
              <span className="font-bold text-orange-900">${profitData.maintenanceCosts.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium text-blue-900">Insurance</span>
              </div>
              <span className="font-bold text-blue-900">${profitData.insuranceCosts.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-gray-600" />
                </div>
                <span className="font-medium text-gray-900">Other Expenses</span>
              </div>
              <span className="font-bold text-gray-900">${(profitData.totalExpenses - profitData.fuelCosts - profitData.maintenanceCosts - profitData.insuranceCosts).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Fuel Optimization</h4>
                  <p className="text-sm text-green-700">Switch to fuel-efficient routes and consider fuel cards for better rates</p>
                  <p className="text-xs text-green-600 mt-1">Potential savings: $1,200/month</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Preventive Maintenance</h4>
                  <p className="text-sm text-blue-700">Schedule regular maintenance to avoid costly repairs</p>
                  <p className="text-xs text-blue-600 mt-1">Potential savings: $800/month</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">Load Optimization</h4>
                  <p className="text-sm text-purple-700">Focus on higher-paying loads and backhaul opportunities</p>
                  <p className="text-xs text-purple-600 mt-1">Potential increase: $2,500/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Calculator */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Revenue per Mile</label>
              <input 
                type="number" 
                defaultValue="2.85"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Miles per Month</label>
              <input 
                type="number" 
                defaultValue="8000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Cost per Gallon</label>
              <input 
                type="number" 
                defaultValue="3.25"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">MPG</label>
              <input 
                type="number" 
                defaultValue="6.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Expenses</label>
              <input 
                type="number" 
                defaultValue="6000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="pt-6">
              <button className="w-full btn-primary">Calculate Profit</button>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Estimated Monthly Profit:</span>
            <span className="text-2xl font-bold text-green-600">$15,200</span>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profit Trends</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Profit trends chart will be displayed here</p>
              <p className="text-sm text-gray-500">Monthly profit analysis and forecasting</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Cost analysis chart will be displayed here</p>
              <p className="text-sm text-gray-500">Expense breakdown and optimization opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitMaximization;
