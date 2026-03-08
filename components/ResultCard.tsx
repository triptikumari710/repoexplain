"use client";

import ReactMarkdown from "react-markdown";

interface ResultCardProps {
  analysis: string;
}

export default function ResultCard({ analysis }: ResultCardProps) {
  // Parse the analysis text into sections
  const sections = parseAnalysis(analysis);

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6BB6E8] to-[#8A7CFF] flex items-center justify-center shadow-lg">
            ✨
          </span>
          Analysis Complete
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 glass hover-glow rounded-xl text-slate-700 hover:text-slate-900 transition-all duration-200 flex items-center gap-2 group font-semibold border-2 border-white shadow-lg"
        >
          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Analyze Another
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <SectionCard
            key={index}
            title={section.title}
            content={section.content}
            icon={getIconForSection(section.title)}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
}

function SectionCard({ title, content, icon, delay }: { title: string; content: string; icon: string; delay: number }) {
  return (
    <div 
      className="glass-strong rounded-3xl p-6 hover-glow transition-all duration-300 hover:scale-[1.02] animate-fade-in border-2 border-white shadow-xl"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6BB6E8] to-[#8A7CFF] flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mt-2">
          {title}
        </h3>
      </div>
      
      <div className="text-slate-800 leading-relaxed prose prose-slate prose-sm max-w-none pl-16">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0 text-slate-800 font-medium">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-slate-800">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-slate-800">{children}</ol>,
            li: ({ children }) => <li className="text-slate-800 font-medium">{children}</li>,
            strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
            code: ({ children }) => <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-900 text-xs font-mono font-semibold">{children}</code>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function parseAnalysis(analysis: string) {
  const sections = [];
  const lines = analysis.split('\n');
  let currentSection: { title: string; content: string } | null = null;

  for (const line of lines) {
    // Check if line is a markdown header (starts with ##)
    const headerMatch = line.match(/^##\s+(.+)$/);
    
    if (headerMatch) {
      // Save previous section if exists
      if (currentSection) {
        sections.push(currentSection);
      }
      // Start new section
      currentSection = {
        title: headerMatch[1].trim(),
        content: ''
      };
    } else if (currentSection && line.trim()) {
      // Add content to current section
      currentSection.content += (currentSection.content ? '\n' : '') + line;
    }
  }

  // Add the last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

function getIconForSection(title: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('overview')) return '📋';
  if (titleLower.includes('tech') || titleLower.includes('stack')) return '⚡';
  if (titleLower.includes('feature')) return '🎯';
  if (titleLower.includes('structure') || titleLower.includes('architecture')) return '🏗️';
  if (titleLower.includes('use') || titleLower.includes('audience')) return '👥';
  
  return '📌';
}
