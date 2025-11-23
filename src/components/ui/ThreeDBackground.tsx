import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export const ThreeDBackground = () => {
  const { theme } = useTheme();

  if (theme === 'light') {
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#f8fafc_0%,_#e2e8f0_100%)]" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
            transformOrigin: 'top center',
          }}
        />
        {/* Optimized: Reduced number of shapes and blur radius */}
        <FloatingShape className="top-1/4 left-1/4 w-64 h-64 bg-indigo-200/40 blur-2xl" delay={0} duration={20} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e293b_0%,_#020617_100%)]" />

      {/* Grid Floor Effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
          transformOrigin: 'top center',
        }}
      />

      {/* Optimized: Reduced number of shapes and simplified animations */}
      <FloatingShape className="top-1/4 left-1/4 w-32 h-32 bg-indigo-500/20 blur-xl" delay={0} duration={20} />
      <FloatingShape className="bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 blur-xl" delay={5} duration={25} />

      <motion.div
        className="absolute top-20 right-20 w-20 h-20 border border-indigo-500/20 rounded-xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

const FloatingShape = ({ className, delay, duration }: { className: string, delay: number, duration: number }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-screen ${className}`}
    animate={{
      y: ["0%", "-20%", "0%"],
      x: ["0%", "10%", "0%"],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
  />
);
