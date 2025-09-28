import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Home, FileCheck, BarChart3, Settings, Info, Zap } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/verify', label: 'Verify', icon: FileCheck },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/analytics', label: 'Analytics', icon: Zap },
    { path: '/integration', label: 'Integration', icon: Settings },
    { path: '/about', label: 'About', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="relative z-50 border-b border-green-400/20 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="h-8 w-8 text-green-400 group-hover:text-blue-400 transition-colors duration-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              CertGuard
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive(path)
                    ? 'text-green-400 bg-green-400/10 border border-green-400/30 shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                    : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5 border border-transparent hover:border-green-400/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-green-400 focus:outline-none focus:text-green-400 transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-green-400/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive(path)
                    ? 'text-green-400 bg-green-400/10 border border-green-400/30 shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                    : 'text-gray-300 hover:text-green-400 hover:bg-green-400/5 border border-transparent hover:border-green-400/20'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;