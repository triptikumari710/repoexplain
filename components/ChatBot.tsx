"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  repoData: {
    name: string;
    url: string;
  };
  initialAnalysis: string;
}

export default function ChatBot({ repoData, initialAnalysis }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I've analyzed the ${repoData.name} repository. Feel free to ask me any questions about this project! For example:\n\n• How does this project work?\n• What technologies are used?\n• How can I contribute?\n• What are the main features?\n• Can you explain [specific part]?`,
      timestamp: new Date(),
    },
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

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          repoUrl: repoData.url,
          context: initialAnalysis,
          conversationHistory: messages.slice(-6), // Last 3 exchanges
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass-strong rounded-2xl overflow-hidden border-2 border-white shadow-2xl flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6BB6E8]/30 to-[#8A7CFF]/30 border-b-2 border-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6BB6E8] to-[#8A7CFF] flex items-center justify-center shadow-lg overflow-hidden">
            <img 
              src="/mascot/chat_bot.png" 
              alt="Chat Assistant" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to emoji if image not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '💬';
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Ask Questions</h3>
            <p className="text-xs text-slate-700 font-medium">Chat with AI about this project</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg ${
                message.role === "user"
                  ? "bg-gradient-to-r from-[#6BB6E8] to-[#8A7CFF] text-white"
                  : "glass-strong border-2 border-white"
              }`}
            >
              <div className={`text-sm prose prose-sm max-w-none ${
                message.role === "user" ? "prose-invert" : "prose-slate"
              }`}>
                {message.role === "user" ? (
                  <div className="whitespace-pre-wrap font-medium">{message.content}</div>
                ) : (
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="text-lg font-bold text-slate-900 mb-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-base font-bold text-slate-900 mb-2">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-sm font-bold text-slate-900 mb-1">{children}</h3>,
                      p: ({ children }) => <p className="text-slate-800 mb-2 last:mb-0 font-medium">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside text-slate-800 mb-2 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside text-slate-800 mb-2 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="text-slate-800 font-medium">{children}</li>,
                      strong: ({ children }) => <strong className="font-bold text-slate-900">{children}</strong>,
                      em: ({ children }) => <em className="italic text-slate-800">{children}</em>,
                      code: ({ children }) => <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-900 text-xs font-mono font-semibold">{children}</code>,
                      pre: ({ children }) => <pre className="bg-slate-200 p-2 rounded text-xs overflow-x-auto mb-2">{children}</pre>,
                      a: ({ href, children }) => <a href={href} className="text-[#6BB6E8] hover:text-[#8A7CFF] underline font-semibold" target="_blank" rel="noopener noreferrer">{children}</a>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
              <div
                className={`text-xs mt-1 font-medium ${
                  message.role === "user" ? "text-white/80" : "text-slate-600"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="glass-strong border-2 border-white rounded-2xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#6BB6E8] rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-[#8A7CFF] rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-[#B9A7FF] rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t-2 border-white p-4 bg-white/80">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask anything about this project..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6BB6E8] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 btn-gradient text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#8A7CFF] shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-2 font-medium">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
}
