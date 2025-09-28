import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Upload, Zap, Database, Eye, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: 'Instant Upload',
      description: 'Upload certificate scans or PDFs for immediate verification'
    },
    {
      icon: Eye,
      title: 'AI Detection',
      description: 'Advanced AI detects tampering, forged seals, and signatures'
    },
    {
      icon: Database,
      title: 'Database Validation',
      description: 'Cross-check with institutional and government registries'
    },
    {
      icon: Zap,
      title: 'Real-time Results',
      description: 'Get instant verification results with confidence scores'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                SECURE
              </span>
              <br />
              <span className="text-white glitch-text">VERIFICATION</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI-powered certificate verification system that detects fraud, validates authenticity, 
              and protects academic integrity in the digital age.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/verify"
              className="group px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold rounded-lg 
                       hover:from-green-300 hover:to-blue-300 transition-all duration-300 
                       shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:shadow-[0_0_30px_rgba(0,255,65,0.7)]
                       transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Start Verification</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-green-400 text-green-400 font-bold rounded-lg
                       hover:bg-green-400 hover:text-black transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(0,255,65,0.5)]"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { label: 'Certificates Verified', value: '50,000+' },
              { label: 'Fraud Cases Detected', value: '2,847' },
              { label: 'Accuracy Rate', value: '99.8%' },
              { label: 'Institutions Connected', value: '500+' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 cyber-glow">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Features
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 border border-green-400/20 rounded-lg bg-black/50 backdrop-blur-sm
                           hover:border-green-400/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]
                           transition-all duration-300 transform hover:scale-105"
                >
                  <Icon className="h-12 w-12 text-green-400 mb-4 group-hover:text-blue-400 transition-colors" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-green-400/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Certificates?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of institutions and employers who trust CertGuard for certificate verification.
          </p>
          <Link
            to="/verify"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-400 to-blue-400 
                     text-black font-bold rounded-lg hover:from-purple-300 hover:to-blue-300 
                     transition-all duration-300 shadow-[0_0_20px_rgba(191,0,255,0.5)] 
                     hover:shadow-[0_0_30px_rgba(191,0,255,0.7)] transform hover:scale-105"
          >
            <Shield className="h-5 w-5" />
            <span>Start Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;