import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Target, Zap, Brain, FileText, Layers } from "lucide-react";

export const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 pt-10 pb-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl z-10 mt-10 md:mt-20"
      >
        <div className="mb-6 flex justify-center">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-sm font-medium backdrop-blur-sm">
            AI-Powered Career Discovery
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white">
          Discover Your Future <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Ideally Aligned.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Stop guessing. Our intelligent algorithm analyzes your strengths, interests, and goals to map out the perfect career path for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/assessment">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold text-lg shadow-xl shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div className="mt-32 w-full max-w-6xl z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-slate-600 dark:text-slate-400">Three simple steps to your dream career.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard 
            number="01"
            icon={<Brain className="w-8 h-8 text-indigo-500" />}
            title="Analyze Profile"
            desc="We assess your academic stream, interests, strengths, and long-term goals."
          />
          <StepCard 
            number="02"
            icon={<Layers className="w-8 h-8 text-purple-500" />}
            title="AI Matching"
            desc="Our algorithm compares your profile against 50+ career paths to find the best fit."
          />
          <StepCard 
            number="03"
            icon={<FileText className="w-8 h-8 text-emerald-500" />}
            title="Get Roadmap"
            desc="Receive a detailed report with salary insights, required exams, and a learning path."
          />
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full z-10">
        <FeatureCard 
          icon={<Target className="w-6 h-6 text-blue-500" />}
          title="Goal Oriented"
          desc="Aligns suggestions with your long-term ambitions."
          delay={0.2}
        />
        <FeatureCard 
          icon={<Zap className="w-6 h-6 text-yellow-500" />}
          title="Strength Based"
          desc="Leverages what you are naturally good at."
          delay={0.4}
        />
        <FeatureCard 
          icon={<Compass className="w-6 h-6 text-emerald-500" />}
          title="Clear Roadmap"
          desc="Step-by-step guide to reach your dream job."
          delay={0.6}
        />
      </div>
    </div>
  );
};

const StepCard = ({ number, icon, title, desc }: { number: string, icon: React.ReactNode, title: string, desc: string }) => (
  <div className="relative p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-none">
    <div className="absolute -top-6 left-8 text-6xl font-bold text-slate-100 dark:text-slate-800 select-none">
      {number}
    </div>
    <div className="relative z-10">
      <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 w-fit rounded-xl">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-md hover:bg-white dark:hover:bg-slate-800/60 transition-colors shadow-sm"
  >
    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{desc}</p>
  </motion.div>
);
