import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getChatCompletion } from "../services/openrouter";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface ChatbotProps {
    userData: any;
}

export const Chatbot: React.FC<ChatbotProps> = ({ userData }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm your personal Career AI. Based on your profile, I can help you explore these paths further, suggest courses, or answer any career questions. What's on your mind?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            // Prepare history for API (excluding the initial greeting if needed, but keeping it is usually fine)
            const history = messages.map(m => ({ role: m.role, content: m.content }));
            history.push({ role: "user", content: userMessage });

            const response = await getChatCompletion(history, userData);

            if (response) {
                setMessages(prev => [...prev, { role: "assistant", content: response }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Career Mentor AI</h3>
                        <p className="text-indigo-100 text-sm">Powered by Grok 2 (xAI) • Personalized Guidance</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950/30">
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user"
                            ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                            : "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400"
                            }`}>
                            {msg.role === "user" ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                        </div>

                        <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user"
                            ? "bg-indigo-600 text-white rounded-tr-none"
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-none shadow-sm"
                            }`}>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                    </motion.div>
                ))}

                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center shrink-0">
                            <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything about your career path..."
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-500"
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/30"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
