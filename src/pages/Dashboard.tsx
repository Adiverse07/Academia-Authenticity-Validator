import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, FileText, Users, Shield, Activity } from 'lucide-react';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('30d');

  const stats = [
    {
      title: 'Total Verifications',
      value: '12,547',
      change: '+23%',
      trend: 'up',
      icon: FileText,
      color: 'text-green-400'
    },
    {
      title: 'Fraud Cases Detected',
      value: '342',
      change: '+15%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-red-400'
    },
    {
      title: 'Success Rate',
      value: '97.3%',
      change: '+2.1%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-blue-400'
    },
    {
      title: 'Active Institutions',
      value: '89',
      change: '+8',
      trend: 'up',
      icon: Users,
      color: 'text-purple-400'
    }
  ];

  const recentActivity = [
    { type: 'verification', institution: 'Stanford University', status: 'verified', time: '2 minutes ago' },
    { type: 'fraud', institution: 'MIT', status: 'flagged', time: '15 minutes ago' },
    { type: 'verification', institution: 'Harvard University', status: 'verified', time: '32 minutes ago' },
    { type: 'verification', institution: 'UC Berkeley', status: 'verified', time: '1 hour ago' },
    { type: 'fraud', institution: 'Unknown Source', status: 'blocked', time: '2 hours ago' }
  ];

  const topInstitutions = [
    { name: 'Stanford University', verifications: 1247, fraudRate: '1.2%' },
    { name: 'MIT', verifications: 989, fraudRate: '0.8%' },
    { name: 'Harvard University', verifications: 856, fraudRate: '1.5%' },
    { name: 'UC Berkeley', verifications: 723, fraudRate: '2.1%' },
    { name: 'Caltech', verifications: 445, fraudRate: '0.9%' }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Monitor verification activities and system performance</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-black/50 border border-green-400/30 rounded-lg px-4 py-2 text-green-400 focus:border-green-400 focus:outline-none"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.title}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Activity className="h-6 w-6 text-green-400" />
                <span>Recent Activity</span>
              </h2>
              <button className="text-green-400 hover:text-green-300 text-sm">View All</button>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700 hover:border-green-400/30 transition-all">
                  <div className="flex items-center space-x-4">
                    {activity.type === 'fraud' ? (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    <div>
                      <div className="text-white font-medium">{activity.institution}</div>
                      <div className={`text-sm ${
                        activity.status === 'verified' ? 'text-green-400' :
                        activity.status === 'flagged' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {activity.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Institutions */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-400" />
              <span>Top Institutions</span>
            </h2>
            
            <div className="space-y-4">
              {topInstitutions.map((institution, index) => (
                <div key={index} className="p-4 bg-black/30 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-white font-medium text-sm">{institution.name}</div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold">{institution.verifications}</div>
                      <div className="text-xs text-gray-400">verifications</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">Fraud Rate</div>
                    <div className={`text-xs font-medium ${
                      parseFloat(institution.fraudRate) < 1.5 ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {institution.fraudRate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Shield className="h-6 w-6 text-green-400" />
            <span>System Status</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'API Status', status: 'Operational', color: 'text-green-400' },
              { label: 'Database', status: 'Operational', color: 'text-green-400' },
              { label: 'AI Processing', status: 'Operational', color: 'text-green-400' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-gray-700">
                <span className="text-gray-300">{item.label}</span>
                <span className={`font-medium ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;