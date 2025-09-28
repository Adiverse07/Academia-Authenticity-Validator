import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Verify from './pages/Verify';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Integration from './pages/Integration';
import About from './pages/About';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
        {/* Cyberpunk background grid */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-purple-900/20"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/integration" element={<Integration />} />
            <Route path="/about" element={<About />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;