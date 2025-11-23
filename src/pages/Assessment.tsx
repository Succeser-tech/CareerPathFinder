import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TAG_OPTIONS, INTEREST_CATEGORIES } from "../data/careers";
import { Check, ChevronRight, ChevronLeft, Code, Briefcase, Palette, FlaskConical, Scale, Cog, ChevronDown, Info, Filter } from "lucide-react";
import { cn } from "../lib/utils";

type AssessmentData = {
  stream: string;
  interests: string[];
  strengths: string[];
  weaknesses: string[];
  goals: string[];
};

const IconMap: Record<string, any> = {
  Code, Briefcase, Palette, FlaskConical, Scale, Cog
};

export const Assessment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showAllInterests, setShowAllInterests] = useState(false); // Toggle for stream filtering

  const [data, setData] = useState<AssessmentData>({
    stream: "",
    interests: [],
    strengths: [],
    weaknesses: [],
    goals: []
  });

  const steps = [
    {
      key: "stream",
      title: "Select your Stream",
      subtitle: "What is your current or preferred academic background?",
      type: "single",
      options: TAG_OPTIONS.streams
    },
    {
      key: "interests",
      title: "Explore Your Interests",
      subtitle: "Dive into categories to find specific niches that excite you.",
      type: "nested",
    },
    {
      key: "strengths",
      title: "What are your strengths?",
      subtitle: "Things you are naturally good at or have experience in.",
      type: "multi",
      options: TAG_OPTIONS.strengths
    },
    {
      key: "weaknesses",
      title: "Any challenges?",
      subtitle: "Areas you struggle with or want to avoid (optional).",
      type: "multi",
      options: TAG_OPTIONS.weaknesses
    },
    {
      key: "goals",
      title: "What are your goals?",
      subtitle: "What do you want to achieve in your career?",
      type: "multi",
      options: TAG_OPTIONS.goals
    }
  ];

  const currentStep = steps[step];

  const toggleOption = (option: string) => {
    const key = currentStep.key as keyof AssessmentData;

    if (currentStep.type === "single") {
      setData(prev => ({ ...prev, [key]: option }));
    } else {
      setData(prev => {
        const currentList = prev[key] as string[];
        if (currentList.includes(option)) {
          return { ...prev, [key]: currentList.filter(i => i !== option) };
        } else {
          return { ...prev, [key]: [...currentList, option] };
        }
      });
    }
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("assessmentResults", JSON.stringify(data));
      navigate("/results");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const isNextDisabled = () => {
    const key = currentStep.key as keyof AssessmentData;
    if (currentStep.key === 'weaknesses') return false;

    if (currentStep.type === "single") {
      return !data[key as 'stream'];
    } else {
      return (data[key] as string[]).length === 0;
    }
  };

  const profileStrength = Math.min(100,
    (data.stream ? 20 : 0) +
    (data.interests.length * 10) +
    (data.strengths.length * 10) +
    (data.goals.length * 10)
  );

  // Filter interests based on stream logic
  const filteredInterests = React.useMemo(() => showAllInterests
    ? INTEREST_CATEGORIES
    : INTEREST_CATEGORIES.filter(cat =>
      !data.stream || cat.recommendedStreams.some(s => data.stream.includes(s.split(' ')[0]))
    ), [showAllInterests, data.stream]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-20 relative overflow-hidden">

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 z-10 mt-8">

        {/* Main Assessment Card */}
        <div className="flex-grow">
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Step {step + 1} of {steps.length}
            </div>
            <div className="flex gap-1">
              {steps.map((_, idx) => (
                <div key={idx} className={cn("h-1.5 rounded-full transition-all duration-500", idx <= step ? "w-8 bg-indigo-600 dark:bg-indigo-500" : "w-2 bg-slate-200 dark:bg-slate-700")} />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-xl dark:shadow-2xl min-h-[500px] flex flex-col"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">{currentStep.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">{currentStep.subtitle}</p>
              </div>

              <div className="flex-grow">
                {currentStep.type === "nested" ? (
                  <div className="space-y-4">
                    {/* Filter Toggle */}
                    {data.stream && (
                      <div className="flex justify-end mb-4">
                        <button
                          onClick={() => setShowAllInterests(!showAllInterests)}
                          className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <Filter className="w-4 h-4" />
                          {showAllInterests ? "Show Recommended Only" : "Explore All Categories"}
                        </button>
                      </div>
                    )}

                    {filteredInterests.map((cat) => {
                      const Icon = IconMap[cat.icon];
                      const isExpanded = expandedCategory === cat.id;
                      const selectedCount = cat.subOptions.filter(opt => data.interests.includes(opt)).length;

                      return (
                        <div key={cat.id} className="border border-slate-200 dark:border-slate-700/50 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/20 transition-all">
                          <button
                            onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                            className={cn(
                              "w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50",
                              isExpanded && "bg-slate-100 dark:bg-slate-800/50"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <div className={cn("p-3 rounded-lg", isExpanded ? "bg-indigo-600 text-white" : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700")}>
                                <Icon className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{cat.label}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{cat.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {selectedCount > 0 && (
                                <span className="px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-500/30">
                                  {selectedCount} selected
                                </span>
                              )}
                              <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", isExpanded && "rotate-180")} />
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="p-5 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200 dark:border-slate-700/50 mt-2">
                                  {cat.subOptions.map(sub => {
                                    const isSelected = data.interests.includes(sub);
                                    return (
                                      <button
                                        key={sub}
                                        onClick={() => toggleOption(sub)}
                                        className={cn(
                                          "flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all border",
                                          isSelected
                                            ? "bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-indigo-700 dark:text-white"
                                            : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                        )}
                                      >
                                        {sub}
                                        {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentStep.options?.map((option) => {
                      const isSelected = currentStep.type === "single"
                        ? data[currentStep.key as 'stream'] === option
                        : (data[currentStep.key as keyof AssessmentData] as string[]).includes(option);

                      return (
                        <button
                          key={option}
                          onClick={() => toggleOption(option)}
                          className={cn(
                            "relative p-4 rounded-xl text-left transition-all duration-200 border flex justify-between items-center group",
                            isSelected
                              ? "bg-indigo-50 dark:bg-indigo-600/20 border-indigo-500 text-indigo-700 dark:text-white shadow-md"
                              : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                          )}
                        >
                          <span className="font-medium">{option}</span>
                          <div className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                            isSelected
                              ? "bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500"
                              : "border-slate-300 dark:border-slate-600 group-hover:border-slate-400"
                          )}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-8 mt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {step === steps.length - 1 ? "Analyze Profile" : "Next Step"} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Side Panel */}
        <div className="hidden md:block w-80 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md p-6 rounded-2xl shadow-sm">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" /> Live Profile Strength
              </h3>

              <div className="relative h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  animate={{ width: `${profileStrength}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-slate-500 text-right">{Math.round(profileStrength)}% Complete</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Stream</span>
                  <span className={data.stream ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400 dark:text-slate-600"}>{data.stream || "Pending"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Interests</span>
                  <span className={data.interests.length > 0 ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400 dark:text-slate-600"}>{data.interests.length} Selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
