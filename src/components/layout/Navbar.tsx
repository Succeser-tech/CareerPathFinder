import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-white dark:to-slate-300">
              CareerPath.AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
            <NavLink to="/assessment" active={location.pathname === "/assessment"}>Assessment</NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <Link to="/assessment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-medium text-sm shadow-lg shadow-indigo-500/20 transition-all"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, active }: { to: string, children: React.ReactNode, active: boolean }) => (
  <Link 
    to={to} 
    className={`text-sm font-medium transition-colors ${
      active 
        ? 'text-indigo-600 dark:text-white' 
        : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white'
    }`}
  >
    {children}
  </Link>
);
