import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Filter } from 'lucide-react';

const Analytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('verifications');
  const [timeRange, setTimeRange] = useState('30d');

  const chartData = {
    verifications: [
      { month: 'Jan', value: 850 },
      { month: 'Feb', value: 1200 },
      { month: 'Mar', value: 980 },
      { month: 'Apr', value: 1450 },
      { month: 'May', value: 1680 },
      { month: 'Jun', value: 2100 }
    ],
    fraud: [
      { month: 'Jan', value: 12 },
      { month: 'Feb', value: 18 },
      { month: 'Mar', value: 15 },
      { month: 'Apr', value: 22 },
      { month: 'May', value: 28 },
      { month: 'Jun', value: 35 }
    ]
  };

  const fraudTypes = [
    { type: 'Forged Signatures', percentage: 35, color: 'bg-red-400' },
    { type: 'Altered Dates', percentage: 28, color: 'bg-orange-400' },
    { type: 'Fake Seals', percentage: 20, color: 'bg-yellow-400' },
    { type: 'Modified Text', percentage: 12, color: 'bg-purple-400' },
    { type: 'Other', percentage: 5, color: 'bg-gray-400' }
  ];

  const institutionStats = [
    { name: 'Stanford University', total: 2847, verified: 2785, fraud: 62, rate: 97.8 },
    { name: 'MIT', total: 1998, verified: 1976, fraud: 22, rate: 98.9 },
    { name: 'Harvard University', total: 1756, verified: 1728, fraud: 28, rate: 98.4 },
    { name: 'UC Berkeley', total: 1445, verified: 1401, fraud: 44, rate: 97.0 },
    { name: 'Caltech', total: 892, verified: 881, fraud: 11, rate: 98.8 }
  ];

  const maxValue = Math.max(...chartData[selectedMetric as keyof typeof chartData].map(d => d.value));

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Analytics & Reports
            </h1>
            <p className="text-gray-400">Deep insights into verification patterns and fraud detection</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-4 lg:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-black/50 border border-green-400/30 rounded-lg px-4 py-2 text-green-400 focus:border-green-400 focus:outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-400 text-black font-medium rounded-lg hover:from-green-300 hover:to-blue-300 transition-all">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Verifications', value: '48,392', change: '+12.3%', color: 'text-green-400' },
            { label: 'Fraud Detection Rate', value: '2.7%', change: '-0.3%', color: 'text-red-400' },
            { label: 'Average Processing Time', value: '1.2s', change: '-15%', color: 'text-blue-400' },
            { label: 'System Accuracy', value: '99.1%', change: '+0.2%', color: 'text-purple-400' }
          ].map((metric, index) => (
            <div key={index} className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm mb-2">{metric.label}</div>
              <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Trend Chart */}
          <div className="lg:col-span-2 bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-purple-400" />
                <span>Verification Trends</span>
              </h2>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMetric('verifications')}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    selectedMetric === 'verifications'
                      ? 'bg-green-400 text-black'
                      : 'text-green-400 hover:bg-green-400/10'
                  }`}
                >
                  Verifications
                </button>
                <button
                  onClick={() => setSelectedMetric('fraud')}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    selectedMetric === 'fraud'
                      ? 'bg-red-400 text-black'
                      : 'text-red-400 hover:bg-red-400/10'
                  }`}
                >
                  Fraud Cases
                </button>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between space-x-4">
              {chartData[selectedMetric as keyof typeof chartData].map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t transition-all duration-500 ${
                      selectedMetric === 'verifications' ? 'bg-gradient-to-t from-green-400 to-blue-400' : 'bg-gradient-to-t from-red-400 to-orange-400'
                    }`}
                    style={{ height: `${(data.value / maxValue) * 100}%`, minHeight: '4px' }}
                  ></div>
                  <div className="text-white font-bold mt-2">{data.value}</div>
                  <div className="text-gray-400 text-sm">{data.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Fraud Types Breakdown */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <PieChart className="h-6 w-6 text-purple-400" />
              <span>Fraud Types</span>
            </h2>
            
            <div className="space-y-4">
              {fraudTypes.map((fraud, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{fraud.type}</span>
                    <span className="text-white font-medium">{fraud.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${fraud.color} transition-all duration-500`}
                      style={{ width: `${fraud.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Institution Performance Table */}
        <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <span>Institution Performance</span>
            </h2>
            
            <button className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Institution</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Total</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Verified</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Fraud</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {institutionStats.map((institution, index) => (
                  <tr key={index} className="border-b border-gray-700/50 hover:bg-green-400/5 transition-colors">
                    <td className="py-4 px-4 text-white font-medium">{institution.name}</td>
                    <td className="py-4 px-4 text-right text-gray-300">{institution.total.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-green-400">{institution.verified.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-red-400">{institution.fraud}</td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${institution.rate >= 98 ? 'text-green-400' : institution.rate >= 95 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {institution.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;