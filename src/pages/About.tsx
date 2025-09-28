import React from 'react';
import { Shield, Zap, Database, Eye, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: Eye,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms detect even the most sophisticated fraud attempts, including forged signatures, altered seals, and modified text.',
      details: ['Deep learning OCR technology', 'Pattern recognition algorithms', 'Anomaly detection systems', 'Continuous model improvement']
    },
    {
      icon: Database,
      title: 'Multi-Source Validation',
      description: 'Cross-reference certificates against multiple institutional databases, government registries, and blockchain records for comprehensive verification.',
      details: ['Institutional database integration', 'Government registry access', 'Blockchain verification', 'Real-time data synchronization']
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Get verification results in seconds with our high-performance infrastructure designed to handle thousands of simultaneous requests.',
      details: ['Sub-second response times', 'Scalable cloud infrastructure', 'Global content delivery', '99.9% uptime guarantee']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Military-grade encryption and security protocols ensure your sensitive documents and data are protected at all times.',
      details: ['End-to-end encryption', 'SOC 2 Type II compliance', 'Regular security audits', 'GDPR compliant']
    }
  ];

  const stats = [
    { number: '50M+', label: 'Certificates Verified', description: 'Across global institutions' },
    { number: '99.1%', label: 'Accuracy Rate', description: 'Industry-leading precision' },
    { number: '500+', label: 'Institutions', description: 'Connected worldwide' },
    { number: '<1s', label: 'Average Response', description: 'Lightning-fast processing' }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Upload Certificate',
      description: 'Upload your certificate in PDF or image format through our secure interface',
      color: 'from-green-400 to-blue-400'
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our AI system analyzes the document for tampering, authenticity markers, and formatting',
      color: 'from-blue-400 to-purple-400'
    },
    {
      step: '03',
      title: 'Database Verification',
      description: 'Cross-check against institutional databases and registries for validation',
      color: 'from-purple-400 to-pink-400'
    },
    {
      step: '04',
      title: 'Instant Results',
      description: 'Receive comprehensive verification results with confidence scores and detailed analysis',
      color: 'from-pink-400 to-green-400'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="px-4 mb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Future of
            </span>
            <br />
            <span className="text-white">Certificate Verification</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            CertGuard revolutionizes academic certificate verification through cutting-edge AI technology, 
            protecting educational integrity and preventing fraud in the digital age.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/verify"
              className="group px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold rounded-lg 
                       hover:from-green-300 hover:to-blue-300 transition-all duration-300 
                       shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:shadow-[0_0_30px_rgba(0,255,65,0.7)]
                       transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Try It Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/integration"
              className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg
                       hover:bg-green-400 hover:text-black transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]"
            >
              Integration Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-black/30 backdrop-blur-sm border border-green-400/20 rounded-xl hover:border-green-400/50 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our sophisticated multi-layered verification process ensures maximum accuracy and security
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-black font-bold text-xl mb-4`}>
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-green-400">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Advanced Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with enterprise-grade technology to deliver unmatched accuracy and performance
            </p>
          </div>
          
          <div className="space-y-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="lg:w-1/2">
                    <div className="bg-black/50 backdrop-blur-sm border border-green-400/30 rounded-xl p-8">
                      <Icon className="h-12 w-12 text-green-400 mb-6" />
                      <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-300 text-lg mb-6">{feature.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {feature.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-xl p-12 border border-green-400/30">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-24 h-24 bg-black/50 rounded-full border border-green-400/50 mb-6">
                            <Icon className="h-12 w-12 text-green-400" />
                          </div>
                          <div className="text-white font-mono text-lg">
                            {feature.title === 'AI-Powered Detection' && 'Analyzing patterns...'}
                            {feature.title === 'Multi-Source Validation' && 'Cross-referencing databases...'}
                            {feature.title === 'Instant Processing' && 'Processing complete ✓'}
                            {feature.title === 'Enterprise Security' && 'Secured with encryption'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 border-t border-green-400/20 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Certificates?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the growing community of institutions and organizations that trust CertGuard 
            for their certificate verification needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/verify"
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold rounded-lg
                       hover:from-green-300 hover:to-blue-300 transition-all duration-300
                       shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:shadow-[0_0_30px_rgba(0,255,65,0.7)]
                       transform hover:scale-105"
            >
              Start Verifying Now
            </Link>
            <Link
              to="/integration"
              className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg
                       hover:bg-green-400 hover:text-black transition-all duration-300"
            >
              View Integration Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;