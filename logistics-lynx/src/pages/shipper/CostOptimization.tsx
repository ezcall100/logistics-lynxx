import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  BarChart3, 
  Calculator,
  Download,
  Filter,
  ArrowUpDown
} from 'lucide-react';

interface CostData {
  category: string;
  currentCost: number;
  optimizedCost: number;
  savings: number;
  savingsPercent: number;
}

const CostOptimization: React.FC = () => {
  const [costData] = useState<CostData[]>([
    {
      category: 'Freight Costs',
      currentCost: 45000,
      optimizedCost: 40500,
      savings: 4500,
      savingsPercent: 10
    },
    {
      category: 'Fuel Surcharges',
      currentCost: 12500,
      optimizedCost: 11250,
      savings: 1250,
      savingsPercent: 10
    },
    {
      category: 'Accessorial Charges',
      currentCost: 8500,
      optimizedCost: 6800,
      savings: 1700,
      savingsPercent: 20
    },
    {
      category: 'Insurance',
      currentCost: 3200,
      optimizedCost: 2880,
      savings: 320,
      savingsPercent: 10
    }
  ]);

  const totalCurrentCost = costData.reduce((acc, item) => acc + item.currentCost, 0);
  const totalOptimizedCost = costData.reduce((acc, item) => acc + item.optimizedCost, 0);
  const totalSavings = costData.reduce((acc, item) => acc + item.savings, 0);
  const totalSavingsPercent = (totalSavings / totalCurrentCost) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cost Optimization</h1>
          <p className="text-gray-600">Optimize your shipping costs and maximize savings</p>
        </div>
        <button className="btn-outline flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${totalCurrentCost.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-gray-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Optimized Cost</p>
              <p className="text-2xl font-bold text-green-600">${totalOptimizedCost.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-blue-600">${totalSavings.toLocaleString()}</p>
            </div>
            <Calculator className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Savings %</p>
              <p className="text-2xl font-bold text-purple-600">{totalSavingsPercent.toFixed(1)}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Optimized Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Savings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Savings %
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {costData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.currentCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    ${item.optimizedCost.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                    ${item.savings.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {item.savingsPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Optimization Opportunities</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Route Optimization</h4>
              </div>
              <p className="text-sm text-blue-700">
                Implement dynamic routing to reduce fuel costs and improve delivery times by 15%.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Volume Consolidation</h4>
              </div>
              <p className="text-sm text-green-700">
                Consolidate shipments to reduce per-unit costs and improve carrier rates.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">Carrier Negotiation</h4>
              </div>
              <p className="text-sm text-purple-700">
                Leverage volume commitments to negotiate better rates with preferred carriers.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Savings Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Immediate (0-30 days)</p>
                <p className="text-sm text-gray-600">Route optimization and rate negotiation</p>
              </div>
              <span className="text-green-600 font-medium">$2,500</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Short-term (1-3 months)</p>
                <p className="text-sm text-gray-600">Volume consolidation and process improvements</p>
              </div>
              <span className="text-green-600 font-medium">$3,200</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Long-term (3-6 months)</p>
                <p className="text-sm text-gray-600">Technology implementation and automation</p>
              </div>
              <span className="text-green-600 font-medium">$1,800</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Trend Analysis</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Cost trend analysis chart will be displayed here</p>
            <p className="text-sm text-gray-500">Historical cost data and optimization projections</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostOptimization;

