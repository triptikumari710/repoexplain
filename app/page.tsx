"use client";

import { useState, useEffect } from "react";
import RepositoryInput from "@/components/RepositoryInput";
import ResultCard from "@/components/ResultCard";
import Loader from "@/components/Loader";
import ChatBot from "@/components/ChatBot";
import Logo from "@/components/Logo";
import Mascot, { MascotState } from "@/components/Mascot";
import SuccessMessage from "@/components/SuccessMessage";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [repoMetadata, setRepoMetadata] = useState<{ name: string; url: string } | null>(null);
  const [mascotState, setMascotState] = useState<MascotState>("idle");
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Simulate progress during analysis
  useEffect(() => {
    if (loading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [loading]);

  // Handle repository analysis
  const handleAnalyze = async (repoUrl: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setRepoMetadata(null);
    setShowSuccess(false);
    setMascotState("scanning"); // Start scanning animation

    try {
      // Call the API endpoint to analyze the repository
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze repository");
      }

      setResult(data.analysis);
      setRepoMetadata({
        name: data.metadata.name,
        url: data.metadata.url,
      });

      // Trigger celebration animation
      setMascotState("celebrating");
      setShowSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setMascotState("idle"); // Return to idle on error
    } finally {
      setLoading(false);
    }
  };

  // Handle celebration animation completion
  const handleCelebrationComplete = () => {
    setMascotState("idle");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#7EC8E3] blob animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#B9A7FF] blob animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#8A7CFF] blob animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        {/* Header with Logo */}
        <div className="flex justify-between items-center mb-12">
          <Logo size="default" />
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-4 py-2 rounded-2xl hover-glow transition-all duration-200 flex items-center gap-2 text-slate-700 hover:text-slate-900"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="hidden sm:inline font-medium">GitHub</span>
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
            Understand Any GitHub
            <br />
            Project <span className="bg-gradient-to-r from-[#6BB6E8] via-[#8A7CFF] to-[#B9A7FF] bg-clip-text text-transparent">Instantly</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto mb-8 font-medium">
            Paste a repository URL and get AI-powered insights about the tech stack, features, and architecture in seconds.
          </p>
        </div>

        {/* Input Section */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <RepositoryInput onAnalyze={handleAnalyze} isAnalyzing={loading} progress={progress} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="animate-fade-in">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-4xl mx-auto mt-12 animate-fade-in">
            <div className="glass-strong rounded-3xl p-6 border-2 border-red-200 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-700 mb-1">
                    Analysis Failed
                  </h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result Section */}
        {result && !loading && (
          <div className="animate-fade-in">
            <ResultCard analysis={result} />
            
            {/* Chat Section */}
            {repoMetadata && (
              <div className="mt-8">
                <ChatBot repoData={repoMetadata} initialAnalysis={result} />
              </div>
            )}
          </div>
        )}

        {/* Features Section - shown when no results */}
        {!result && !loading && !error && (
          <div className="mt-24 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <FeatureCard
                icon="🔍"
                title="Deep Analysis"
                description="Comprehensive breakdown of project structure and architecture"
              />
              <FeatureCard
                icon="⚡"
                title="Lightning Fast"
                description="Get insights in seconds with AI-powered analysis"
              />
              <FeatureCard
                icon="💬"
                title="Ask Questions"
                description="Chat with AI to understand any part of the project"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 text-center text-slate-500 text-sm pb-8">
          <p>Built with Next.js, Tailwind CSS, and Google Gemini AI</p>
        </footer>
      </div>

      {/* Animated Mascot */}
      <Mascot state={mascotState} onAnimationComplete={handleCelebrationComplete} />

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && <SuccessMessage onComplete={() => setShowSuccess(false)} />}
      </AnimatePresence>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="glass-strong rounded-3xl p-6 hover-glow transition-all duration-300 shadow-lg border-2 border-white">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
