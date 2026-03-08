"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface SuccessMessageProps {
  onComplete?: () => void;
}

export default function SuccessMessage({ onComplete }: SuccessMessageProps) {
  useEffect(() => {
    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="glass-strong rounded-2xl px-6 py-4 shadow-2xl border-2 border-green-200 flex items-center gap-3">
        {/* Success icon with animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>

        {/* Success message */}
        <div>
          <h3 className="font-semibold text-slate-800">Repository analyzed successfully!</h3>
          <p className="text-sm text-slate-600">Your analysis is ready below</p>
        </div>

        {/* Confetti particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              animate={{
                opacity: [1, 1, 0],
                y: [0, -150 - Math.random() * 100],
                x: [(Math.random() - 0.5) * 200],
                rotate: [0, Math.random() * 360],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
                i % 4 === 0
                  ? "bg-[#7EC8E3]"
                  : i % 4 === 1
                  ? "bg-[#6BB6E8]"
                  : i % 4 === 2
                  ? "bg-[#8A7CFF]"
                  : "bg-[#B9A7FF]"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
