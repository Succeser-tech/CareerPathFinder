import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CAREERS, Career } from "../data/careers";
import { getCareerDetails } from "../services/openrouter";
import { ArrowLeft, CheckCircle2, BookOpen, PenTool, Building2, GraduationCap, FileBadge, Globe, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const CareerDetail = () => {
  const { id } = useParams();
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      if (!id) return;

      // 1. Try Local DB first (Hybrid Approach)
      const localCareer = CAREERS.find(c => c.id === id);
      if (localCareer) {
        setCareer(localCareer);
        setLoading(false);
        return;
      }

      // 2. Fallback to AI for dynamic/generated careers
      try {
        // We pass the ID as the title hint since generated IDs are usually slugified titles
        // Or we could pass a title if we had it in state, but ID is all we have from URL
        const aiCareer = await getCareerDetails(id, id.replace(/-/g, ' '));
        setCareer(aiCareer);
      } catch (error) {
        console.error("Failed to fetch career details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-600" />
        <p>Fetching career insights...</p>
      </div>
    );
  }

  if (!career) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
      <h2 className="text-2xl font-bold mb-2">Career Not Found</h2>
      <Link to="/results" className="text-indigo-600 hover:underline">Return to Recommendations</Link>
    </div>
  );

  return (
    <div className="min-h-screen py-10 px-4 text-slate-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <Link to="/results" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
          <ArrowLeft className="w-4 h-4" /> Back to Recommendations
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl"
        >
          {/* Header Section */}
          <div className="p-8 md:p-12 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/30 dark:to-transparent">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">{career.title}</h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">{career.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                {career.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <StatBox label="Avg Salary" value={career.salary} color="emerald" />
              <StatBox label="Growth Rate" value={career.growth} color="blue" />
              <StatBox label="Stress Level" value={career.stressLevel} color="orange" />
              <StatBox label="Environment" value={career.workEnvironment.split(',')[0]} color="purple" />
            </div>
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-12 gap-12">
            {/* Roadmap Section (Left - Wider) */}
            <div className="md:col-span-7">

              {/* Market Outlook Box */}
              <div className="mb-10 p-6 rounded-2xl bg-indigo-50 dark:bg-slate-900/50 border border-indigo-100 dark:border-indigo-500/20">
                <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                  <Globe className="w-5 h-5" /> Market Outlook
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  The demand for <span className="font-semibold">{career.title}s</span> is currently <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{career.growth}</span>.
                  Companies are actively seeking professionals with these skills as digital transformation accelerates.
                  This path offers strong job security and excellent long-term potential.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
                <BookOpen className="w-6 h-6 text-indigo-500" />
                Step-by-Step Roadmap
              </h2>
              <div className="space-y-8 relative pl-2">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 to-slate-200 dark:to-slate-800" />

                {career.roadmap.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative flex gap-6"
                  >
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 flex items-center justify-center z-10 shrink-0 shadow-md">
                      <span className="text-sm font-bold text-indigo-600 dark:text-white">{idx + 1}</span>
                    </div>
                    <div className="pt-1.5 bg-white dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex-grow hover:border-indigo-500/30 transition-colors shadow-sm">
                      <p className="text-base text-slate-700 dark:text-slate-200 font-medium">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills & Tools Section (Right - Narrower) */}
            <div className="md:col-span-5 space-y-8">

              {/* Education Box */}
              <div className="bg-white dark:bg-slate-950/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-sm">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900 dark:text-slate-200">
                  <GraduationCap className="w-5 h-5 text-indigo-500" /> Education Required
                </h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Undergraduate</span>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{career.education.ug}</p>
                  </div>
                  {career.education.pg && (
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Postgraduate (Optional)</span>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">{career.education.pg}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Exams Box */}
              <div className="bg-white dark:bg-slate-950/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-sm">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900 dark:text-slate-200">
                  <FileBadge className="w-5 h-5 text-orange-500" /> Key Exams / Certs
                </h2>
                <div className="flex flex-wrap gap-2">
                  {career.exams.map(exam => (
                    <span key={exam} className="px-3 py-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-sm text-orange-700 dark:text-orange-300 border border-orange-100 dark:border-orange-500/20">
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-sm">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900 dark:text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Essential Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-950/30 p-6 rounded-2xl border border-slate-200 dark:border-slate-800/50 shadow-sm">
                <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900 dark:text-slate-200">
                  <PenTool className="w-5 h-5 text-purple-500" /> Industry Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {career.tools.map(tool => (
                    <span key={tool} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }: { label: string, value: string, color: string }) => {
  const colors: Record<string, string> = {
    emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
    orange: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20",
    purple: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20",
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1 font-semibold opacity-80">{label}</p>
      <p className={`font-bold text-lg ${colors[color].split(' ')[0]}`}>{value}</p>
    </div>
  );
};
