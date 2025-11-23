import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { ThreeDBackground } from './components/ui/ThreeDBackground';
import { Home } from './pages/Home';
import { Assessment } from './pages/Assessment';
import { Results } from './pages/Results';
import { CareerDetail } from './pages/CareerDetail';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="font-sans antialiased text-slate-900 dark:text-white selection:bg-indigo-500/30 min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
          <ThreeDBackground />
          <Navbar />
          <main className="relative z-10 pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/results" element={<Results />} />
              <Route path="/career/:id" element={<CareerDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
