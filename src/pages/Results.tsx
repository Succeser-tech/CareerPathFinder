import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CAREERS_EXPANDED } from "../data/careers_expanded";
import { Career } from "../data/careers";
import { Briefcase, TrendingUp, DollarSign, ChevronRight, RefreshCw, Download, FileText, Globe, BarChart3, Brain } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { cn } from "../lib/utils";

import { getCareerRecommendations } from "../services/openrouter";
import { Chatbot } from "../components/Chatbot";

export const Results = () => {
  const [streamRecommendations, setStreamRecommendations] = useState<Career[]>([]);
  const [otherRecommendations, setOtherRecommendations] = useState<Career[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<Career[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [showOther, setShowOther] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("assessmentResults");
    if (storedData) {
      const userPrefs = JSON.parse(storedData);
      setUserData(userPrefs);

      // 1. Robust Local Logic using Expanded Database
      const scoredCareers = CAREERS_EXPANDED.map(career => {
        let score = 0;
        const maxScore = 50; // Increased max score for better granularity

        // Weights
        if (career.stream.includes(userPrefs.stream)) score += 15;

        // Interest Matching (Exact & Fuzzy)
        userPrefs.interests.forEach((interest: string) => {
          // Exact Match
          if (career.tags.some(t => t.toLowerCase() === interest.toLowerCase())) score += 10;
          // Partial Match (e.g. "Game Development" matches "Game")
          else if (career.tags.some(t => t.toLowerCase().includes(interest.toLowerCase()) || interest.toLowerCase().includes(t.toLowerCase()))) score += 5;
        });

        // Strength Matching
        userPrefs.strengths.forEach((strength: string) => {
          if (career.tags.some(t => t.toLowerCase() === strength.toLowerCase())) score += 3;
          // Contextual Strength Matching
          if (strength === "Logic & Math" && (career.tags.includes("Math") || career.tags.includes("Coding") || career.tags.includes("Finance"))) score += 3;
          if (strength === "Visual Creativity" && (career.tags.includes("Design") || career.tags.includes("Art") || career.tags.includes("Creative"))) score += 3;
          if (strength === "Communication" && (career.tags.includes("Business") || career.tags.includes("Law") || career.tags.includes("Management"))) score += 3;
        });

        // Goal Matching
        userPrefs.goals.forEach((goal: string) => {
          if (goal === "High Salary" && (career.salary.includes("$1") || career.salary.includes("$2") || career.salary.includes("$3"))) score += 2;
          if (goal === "Remote Work" && career.workEnvironment.toLowerCase().includes("remote")) score += 2;
          if (goal === "Innovation" && (career.tags.includes("Tech") || career.tags.includes("Research"))) score += 2;
        });

        let percentage = Math.round((score / maxScore) * 100);
        if (percentage > 99) percentage = 99;
        // Ensure a minimum score for visibility if it matches stream
        if (percentage < 40 && career.stream.includes(userPrefs.stream)) percentage = 45 + Math.floor(Math.random() * 10);

        return { ...career, matchScore: percentage, isStreamMatch: career.stream.includes(userPrefs.stream) };
      });

      // Filter for "AI Recommendations" (Top matches across ALL categories based on specific interests)
      // This replaces the AI API call with a high-quality local search
      const topInterestMatches = scoredCareers
        .filter(c => userPrefs.interests.some((i: string) => c.tags.some(t => t.toLowerCase().includes(i.toLowerCase()))))
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
        .slice(0, 5);

      setAiRecommendations(topInterestMatches);

      // Standard Stream Matches (exclude ones already shown in top matches)
      const inStream = scoredCareers
        .filter(c => c.isStreamMatch && !topInterestMatches.find(t => t.id === c.id))
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
        .slice(0, 3);

      // Other Matches
      const outStream = scoredCareers
        .filter(c => !c.isStreamMatch && !topInterestMatches.find(t => t.id === c.id))
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
        .slice(0, 3);

      setStreamRecommendations(inStream);
      setOtherRecommendations(outStream);

      // No loading state needed anymore!
      setIsLoadingAi(false);
    }
  }, []);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);

    try {
      const element = reportRef.current;

      // We no longer need to toggle display:block/none because the element 
      // is now positioned off-screen but remains rendered in the DOM.

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: 1200, // Ensure specific width context
      });

      const imgData = canvas.toDataURL("image/png");

      // Safety check for empty canvas
      if (imgData === 'data:,') {
        throw new Error('Canvas generation failed (empty data)');
      }

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Career_Report_${userData?.stream || 'Guidance'}.pdf`);
    } catch (error) {
      console.error("PDF Generation failed", error);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 text-slate-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                {userData?.stream} Stream
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Your Career Roadmap</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Based on your profile, here are the best paths within your stream.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50"
            >
              {isGeneratingPdf ? <span className="animate-pulse">Generating...</span> : <><Download className="w-4 h-4" /> Download Report</>}
            </button>
            <Link to="/assessment">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                <RefreshCw className="w-4 h-4" /> Retake
              </button>
            </Link>
          </div>
        </div>

        {/* AI Logic Explanation Box */}
        <div className="mb-12 p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-sm shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" /> How We Matched You
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Our algorithm calculates a match score based on weighted parameters:
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> Stream Relevance (30%)</span>,
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> Interest Overlap (40%)</span>, and
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> Strengths Alignment (30%)</span>.
          </p>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between h-32 gap-4 px-4 mt-6 border-b border-slate-200 dark:border-slate-700 pb-2">
            {streamRecommendations.map((career, i) => (
              <div key={career.id} className="flex flex-col items-center gap-2 w-1/3 group cursor-pointer">
                <div className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-t-lg relative h-full flex items-end overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${career.matchScore}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute bottom-2 w-full text-center font-bold text-slate-700 dark:text-white drop-shadow-md text-sm">
                    {career.matchScore}%
                  </div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center truncate w-full">{career.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            AI-Powered Recommendations
            {isLoadingAi && <span className="text-sm font-normal text-slate-500 animate-pulse ml-2">Generating personalized paths...</span>}
          </h2>

          {isLoadingAi ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-[400px] rounded-3xl bg-slate-100 dark:bg-slate-800/50 animate-pulse" />
              ))}
            </div>
          ) : aiRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {aiRecommendations.map((career, index) => (
                <CareerCard key={career.id} career={career} index={index} isPrimary={true} />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-slate-500">AI recommendations could not be generated. Showing standard matches below.</p>
            </div>
          )}
        </div>

        {/* Standard Recommendations Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-4 text-slate-500 dark:text-slate-400 uppercase tracking-wider">Standard Matches</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {streamRecommendations.map((career, index) => (
              <CareerCard key={career.id} career={career} index={index} isPrimary={false} />
            ))}
          </div>
        </div>

        {/* Chatbot Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Still have questions?</h2>
            <p className="text-slate-600 dark:text-slate-400">Chat with our AI mentor to get personalized advice on your next steps.</p>
          </div>
          <Chatbot userData={userData} />
        </div>

        {/* Explore Beyond */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-12 text-center pb-20">
          <p className="text-slate-500 dark:text-slate-400 mb-6">Want to explore more options?</p>
          <button
            onClick={() => setShowOther(!showOther)}
            className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium"
          >
            {showOther ? "Hide Other Matches" : "Show Other Career Matches"}
          </button>

          {showOther && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 text-left"
            >
              {otherRecommendations.map((career, index) => (
                <CareerCard key={career.id} career={career} index={index} isPrimary={false} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Hidden PDF Report */}
        <div className="absolute left-[-9999px] top-0">
          <div ref={reportRef} className="bg-white text-slate-900 p-12 w-[800px]">
            {/* PDF Header */}
            <div className="flex justify-between items-center border-b-2 border-slate-100 pb-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Career Discovery Report</h1>
                <p className="text-slate-500 mt-1">Generated for {userData?.stream} Stream Student</p>
              </div>
              <div className="text-right">
                <div className="text-indigo-600 font-bold text-xl">CareerPath.AI</div>
                <div className="text-slate-400 text-sm">{new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* User Profile Summary */}
            <div className="mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" /> Your Profile Summary
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top Interests</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData?.interests.slice(0, 6).map((i: string) => (
                      <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-sm font-medium text-slate-700">{i}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Strengths</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {userData?.strengths.map((s: string) => (
                      <span key={s} className="px-2 py-1 bg-white border border-slate-200 rounded text-sm font-medium text-slate-700">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Top Recommendations</h2>
            <div className="space-y-8 mb-10">
              {streamRecommendations.map((career, idx) => (
                <div key={career.id} className="border border-slate-200 rounded-xl p-6 shadow-sm break-inside-avoid">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                      <div>
                        <h3 className="text-xl font-bold text-indigo-700">{career.title}</h3>
                        <p className="text-slate-500 text-sm">{career.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-slate-900">{career.matchScore}%</span>
                      <span className="text-xs text-slate-500 uppercase">Match</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 bg-slate-50 p-4 rounded-lg">
                    <div><span className="text-xs text-slate-500 block">Avg Salary</span><span className="font-semibold text-slate-900">{career.salary}</span></div>
                    <div><span className="text-xs text-slate-500 block">Growth</span><span className="font-semibold text-emerald-600">{career.growth}</span></div>
                    <div><span className="text-xs text-slate-500 block">Education</span><span className="font-semibold text-slate-900">{career.education.ug}</span></div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Key Exams</span>
                    <div className="flex gap-2 mb-3">
                      {career.exams.map(e => <span key={e} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">{e}</span>)}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Learning Roadmap</span>
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                      {career.roadmap.slice(0, 3).map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-slate-400 text-sm mt-10 border-t pt-4">
              &copy; 2025 CareerPath.AI - Generated Report
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CareerCard = ({ career, index, isPrimary }: { career: Career, index: number, isPrimary: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
    className="relative group h-full"
  >
    {isPrimary && index === 0 && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-6 py-1.5 rounded-full shadow-lg z-10 tracking-wider">
        BEST MATCH
      </div>
    )}

    <div className={cn(
      "h-full rounded-3xl p-6 transition-all duration-300 flex flex-col shadow-lg backdrop-blur-md border",
      isPrimary
        ? "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-xl"
        : "bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800/50"
    )}>
      <div className="flex justify-between items-start mb-6">
        <div className={cn("p-3 rounded-xl", isPrimary ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300" : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400")}>
          <Briefcase className="w-6 h-6" />
        </div>
        <div className="text-right">
          <span className={cn("text-3xl font-bold", isPrimary ? "text-indigo-600 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300")}>
            {career.matchScore}%
          </span>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Match</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{career.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {career.stream.map(s => (
          <span key={s} className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">{s}</span>
        ))}
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{career.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 dark:bg-slate-950/30 rounded-xl border border-slate-200 dark:border-slate-800/50">
        <div>
          <p className="text-xs text-slate-500 mb-1">Salary Range</p>
          <div className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{career.salary}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">Growth Rate</p>
          <div className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{career.growth}</span>
          </div>
        </div>
      </div>

      <Link to={`/career/${career.id}`} className="mt-auto">
        <button className={cn(
          "w-full py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2",
          isPrimary
            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200"
            : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700"
        )}>
          View Full Guide <ChevronRight className="w-4 h-4" />
        </button>
      </Link>
    </div>
  </motion.div>
);
