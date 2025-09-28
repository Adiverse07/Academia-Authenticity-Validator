import React, { useState } from 'react';
import { Settings, Upload, Database, Key, Zap, CheckCircle, AlertTriangle, Copy, RefreshCw } from 'lucide-react';

const Integration = () => {
  const [activeTab, setActiveTab] = useState('api');
  const [apiKey, setApiKey] = useState('cg_live_sk_12345...');

  const integrationMethods = [
    {
      id: 'api',
      title: 'REST API',
      description: 'Integrate certificate verification into your existing systems',
      icon: Database
    },
    {
      id: 'bulk',
      title: 'Bulk Upload',
      description: 'Upload multiple certificates for batch verification',
      icon: Upload
    },
    {
      id: 'webhook',
      title: 'Webhooks',
      description: 'Receive real-time notifications for verification results',
      icon: Zap
    },
    {
      id: 'sdk',
      title: 'SDK Integration',
      description: 'Use our SDKs for popular programming languages',
      icon: Settings
    }
  ];

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/v1/verify',
      description: 'Submit a certificate for verification',
      example: `{
  "certificate_file": "base64_encoded_file",
  "callback_url": "https://your-app.com/callback"
}`
    },
    {
      method: 'GET',
      endpoint: '/api/v1/verify/{id}',
      description: 'Get verification status and results',
      example: `{
  "id": "verification_id",
  "status": "completed",
  "confidence": 95.7,
  "result": {...}
}`
    },
    {
      method: 'POST',
      endpoint: '/api/v1/bulk-verify',
      description: 'Submit multiple certificates for batch verification',
      example: `{
  "certificates": [
    {"file": "base64_1", "id": "cert_1"},
    {"file": "base64_2", "id": "cert_2"}
  ]
}`
    }
  ];

  const connectedSystems = [
    { name: 'HR Management System', status: 'active', lastSync: '2 minutes ago' },
    { name: 'Student Information System', status: 'active', lastSync: '1 hour ago' },
    { name: 'Background Check Service', status: 'pending', lastSync: 'Never' },
    { name: 'Academic Registry', status: 'active', lastSync: '15 minutes ago' }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const regenerateApiKey = () => {
    setApiKey(`cg_live_sk_${Math.random().toString(36).substring(2, 15)}...`);
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
              System Integration
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Seamlessly integrate CertGuard into your existing systems with our comprehensive APIs and tools
          </p>
        </div>

        {/* Integration Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrationMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setActiveTab(method.id)}
                className={`p-6 rounded-xl border transition-all duration-300 text-left ${
                  activeTab === method.id
                    ? 'border-green-400 bg-green-400/10 shadow-[0_0_20px_rgba(0,255,65,0.2)]'
                    : 'border-green-400/30 bg-black/30 hover:border-green-400/50 hover:bg-green-400/5'
                }`}
              >
                <Icon className={`h-8 w-8 mb-4 ${activeTab === method.id ? 'text-green-400' : 'text-gray-400'}`} />
                <h3 className="text-white font-bold text-lg mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </button>
            );
          })}
        </div>

        {/* Content Based on Active Tab */}
        <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-8">
          {activeTab === 'api' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-2">
                <Database className="h-8 w-8 text-green-400" />
                <span>REST API Integration</span>
              </h2>
              
              {/* API Key Section */}
              <div className="mb-8 p-6 bg-black/50 border border-gray-700 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                  <Key className="h-5 w-5 text-green-400" />
                  <span>API Authentication</span>
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 bg-gray-800 rounded px-4 py-2 font-mono text-green-400">
                    {apiKey}
                  </div>
                  <button
                    onClick={() => copyToClipboard(apiKey)}
                    className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                  <button
                    onClick={regenerateApiKey}
                    className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-2">Include this API key in the Authorization header for all requests.</p>
              </div>

              {/* API Endpoints */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Available Endpoints</h3>
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="border border-gray-700 rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-3 py-1 rounded text-sm font-bold ${
                        endpoint.method === 'POST' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-green-400 font-mono">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-gray-300 mb-4">{endpoint.description}</p>
                    <div className="bg-gray-900 rounded p-4">
                      <pre className="text-green-400 text-sm overflow-x-auto">{endpoint.example}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bulk' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-2">
                <Upload className="h-8 w-8 text-green-400" />
                <span>Bulk Upload</span>
              </h2>
              
              <div className="space-y-8">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-green-400/50 rounded-xl p-12 text-center">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Upload Certificate Archive</h3>
                  <p className="text-gray-400 mb-4">Upload a ZIP file containing multiple certificates for batch verification</p>
                  <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold rounded-lg hover:from-green-300 hover:to-blue-300 transition-all">
                    Select Files
                  </button>
                </div>

                {/* Upload Instructions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Supported Formats</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• ZIP archives containing PDFs or images</li>
                      <li>• Individual PDF files</li>
                      <li>• Image formats: JPG, PNG, TIFF</li>
                      <li>• Maximum file size: 100MB per archive</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white">Processing Timeline</h3>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Small batches (&lt;50): 5-10 minutes</li>
                      <li>• Medium batches (50-200): 15-30 minutes</li>
                      <li>• Large batches (200+): 1-2 hours</li>
                      <li>• Email notification upon completion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webhook' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-2">
                <Zap className="h-8 w-8 text-green-400" />
                <span>Webhook Configuration</span>
              </h2>
              
              <div className="space-y-6">
                {/* Webhook Setup */}
                <div className="p-6 bg-black/50 border border-gray-700 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Webhook Endpoint</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <input
                      type="url"
                      placeholder="https://your-app.com/webhook"
                      className="flex-1 bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white focus:border-green-400 focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-green-400 text-black font-bold rounded hover:bg-green-300 transition-colors">
                      Save
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm">We'll send POST requests to this URL when verification results are ready.</p>
                </div>

                {/* Webhook Events */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Available Events</h3>
                  {[
                    { event: 'verification.completed', description: 'Certificate verification finished' },
                    { event: 'verification.failed', description: 'Verification failed due to error' },
                    { event: 'fraud.detected', description: 'Suspicious activity detected' },
                    { event: 'bulk.completed', description: 'Bulk verification batch finished' }
                  ].map((webhook, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-black/30 border border-gray-700 rounded-lg">
                      <div>
                        <div className="text-white font-mono">{webhook.event}</div>
                        <div className="text-gray-400 text-sm">{webhook.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-400"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sdk' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-2">
                <Settings className="h-8 w-8 text-green-400" />
                <span>SDK Integration</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* SDK Options */}
                {[
                  { language: 'JavaScript/Node.js', command: 'npm install @certguard/node-sdk', status: 'Available' },
                  { language: 'Python', command: 'pip install certguard-python', status: 'Available' },
                  { language: 'Java', command: 'maven dependency available', status: 'Available' },
                  { language: 'PHP', command: 'composer install certguard/php-sdk', status: 'Coming Soon' }
                ].map((sdk, index) => (
                  <div key={index} className="p-6 bg-black/30 border border-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{sdk.language}</h3>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        sdk.status === 'Available' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                      }`}>
                        {sdk.status}
                      </span>
                    </div>
                    <div className="bg-gray-900 rounded p-3 mb-4">
                      <code className="text-green-400 text-sm">{sdk.command}</code>
                    </div>
                    {sdk.status === 'Available' && (
                      <button className="w-full px-4 py-2 border border-green-400 text-green-400 rounded hover:bg-green-400 hover:text-black transition-all">
                        View Documentation
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Connected Systems */}
        <div className="mt-12 bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Connected Systems</h2>
          <div className="space-y-4">
            {connectedSystems.map((system, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-black/30 border border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  {system.status === 'active' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  )}
                  <div>
                    <div className="text-white font-medium">{system.name}</div>
                    <div className="text-gray-400 text-sm">Last sync: {system.lastSync}</div>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm border border-green-400/50 text-green-400 rounded hover:bg-green-400/10 transition-all">
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;