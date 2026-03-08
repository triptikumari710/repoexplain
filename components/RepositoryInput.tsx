"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RepositoryInputProps {
  onAnalyze: (repoUrl: string) => void;
  isAnalyzing: boolean;
  progress?: number;
}

export default function RepositoryInput({ onAnalyze, isAnalyzing, progress = 0 }: RepositoryInputProps) {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim() || isAnalyzing) {
      return;
    }

    const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    
    if (!githubUrlPattern.test(repoUrl.trim())) {
      alert("Please enter a valid GitHub repository URL");
      return;
    }

    onAnalyze(repoUrl.trim());
  };

  // Code symbols for floating animation
  const codeSymbols = ["{}", "</>", "[]", "( )", "//", "=>"];

  return (
    <div className="max-w-3xl mx-auto relative">
      {/* Floating code symbols during scanning */}
      <AnimatePresence>
        {isAnalyzing && (
          <>
            {codeSymbols.map((symbol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, -100 - Math.random() * 100],
                  rotate: [0, Math.random() * 360],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut",
                }}
                className="absolute top-1/2 left-1/2 text-2xl font-mono font-bold text-[#7EC8E3] pointer-events-none z-10"
              >
                {symbol}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        className="relative glass-strong rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden"
        animate={{
          boxShadow: isAnalyzing
            ? [
                "0 8px 32px rgba(126, 200, 227, 0.2)",
                "0 8px 32px rgba(138, 124, 255, 0.4)",
                "0 8px 32px rgba(126, 200, 227, 0.2)",
              ]
            : "0 8px 32px rgba(126, 200, 227, 0.2)",
        }}
        transition={{
          duration: 2,
          repeat: isAnalyzing ? Infinity : 0,
        }}
      >
        {/* Scanning light effect */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "200%", opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#7EC8E3]/30 to-transparent pointer-events-none z-20"
              style={{
                filter: "blur(20px)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Glowing border animation */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          animate={{
            boxShadow: isAnalyzing
              ? [
                  "inset 0 0 0 2px rgba(126, 200, 227, 0.3)",
                  "inset 0 0 0 2px rgba(138, 124, 255, 0.6)",
                  "inset 0 0 0 2px rgba(126, 200, 227, 0.3)",
                ]
              : "inset 0 0 0 2px transparent",
          }}
          transition={{
            duration: 1.5,
            repeat: isAnalyzing ? Infinity : 0,
          }}
        />

        <div className="relative z-10">
          <label htmlFor="repo-url" className="block text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-xl">🔍</span>
            GitHub Repository URL
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <input
                id="repo-url"
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/vercel/next.js"
                disabled={isAnalyzing}
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-300 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6BB6E8] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm font-medium"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isAnalyzing || !repoUrl.trim()}
              whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
              whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
              className="flex-1 sm:flex-none px-8 py-3.5 btn-gradient text-white font-semibold rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#8A7CFF] focus:ring-offset-2 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2 justify-center">
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </motion.svg>
                  Analyzing
                </span>
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Analyze Repository
                </span>
              )}
            </motion.button>
          </div>

          {/* Progress bar */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="flex items-center justify-between text-xs text-slate-700 mb-2 font-medium">
                  <span className="font-semibold">Scanning repository...</span>
                  <span className="font-mono font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#7EC8E3] to-[#8A7CFF] rounded-full relative overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Try: https://github.com/vercel/next.js or https://github.com/facebook/react
          </p>
        </div>
      </motion.form>
    </div>
  );
}
