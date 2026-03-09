"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type MascotState = "idle" | "scanning" | "celebrating";

interface MascotProps {
  state: MascotState;
  onAnimationComplete?: () => void;
}

export default function Mascot({ state, onAnimationComplete }: MascotProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<string>("/mascot/idle.mp4");
  const [showMascot, setShowMascot] = useState(true);

  // Map states to video files
  const videoMap: Record<MascotState, string> = {
    idle: "/mascot/idle.mp4",
    scanning: "/mascot/scanning.mp4",
    celebrating: "/mascot/celebrating.mp4",
  };

  // Determine position based on state
  const isCenter = state === "scanning" || state === "celebrating";

  // Handle state changes and video transitions
  useEffect(() => {
    const newVideo = videoMap[state];
    
    // Show mascot when scanning starts
    if (state === "scanning") {
      setShowMascot(true);
    }
    
    if (newVideo !== currentVideo) {
      // Fade out current video
      setIsVisible(false);
      
      // Wait for fade out, then change video
      setTimeout(() => {
        setCurrentVideo(newVideo);
        setIsVisible(true);
        
        // Reset and play new video
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(err => console.log("Video play error:", err));
        }
      }, 300);
    }
  }, [state, currentVideo, videoMap]);

  // Handle celebrating animation completion - hide mascot
  useEffect(() => {
    if (state === "celebrating" && videoRef.current) {
      const handleEnded = () => {
        // Hide mascot after celebration
        setTimeout(() => {
          setShowMascot(false);
        }, 500);
        
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      };

      const video = videoRef.current;
      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, [state, onAnimationComplete]);

  // Show mascot again when returning to idle
  useEffect(() => {
    if (state === "idle" && !showMascot) {
      setTimeout(() => {
        setShowMascot(true);
      }, 300);
    }
  }, [state, showMascot]);

  return (
    <AnimatePresence>
      {showMascot && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isCenter ? "0" : "0",
            y: isCenter ? "0" : "0"
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`fixed z-50 pointer-events-none ${
            isCenter 
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
              : "bottom-4 right-4 sm:bottom-6 sm:right-6"
          }`}
        >
          {/* Glassmorphism Card with soft theme */}
          <motion.div
            animate={{
              y: state === "idle" ? [0, -10, 0] : 0,
              scale: isCenter ? 1.2 : 1,
            }}
            transition={{
              y: {
                duration: 3,
                repeat: state === "idle" ? Infinity : 0,
                ease: "easeInOut",
              },
              scale: {
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            className="relative"
          >
        {/* Soft glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7EC8E3]/30 to-[#B9A7FF]/30 rounded-3xl blur-xl"></div>
        
        {/* Glass card */}
        <div className="relative glass-strong rounded-2xl sm:rounded-3xl p-3 sm:p-4 border-2 border-white/50 shadow-2xl overflow-hidden">
          {/* Background animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7EC8E3]/10 to-[#8A7CFF]/10 animate-pulse-glow"></div>
          
          {/* Video container */}
          <div className={`relative flex items-center justify-center ${
            isCenter 
              ? "w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80" 
              : "w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56"
          }`}>
            <AnimatePresence mode="wait">
              <motion.video
                key={currentVideo}
                ref={videoRef}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                autoPlay
                loop={state !== "celebrating"}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-contain"
              >
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </motion.video>
            </AnimatePresence>
          </div>

          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 pointer-events-auto"
          >
            <div className="glass px-3 py-1.5 rounded-full border border-white/50 flex items-center gap-2 shadow-lg">
              {/* Status dot */}
              <motion.div
                animate={{
                  scale: state === "scanning" ? [1, 1.2, 1] : 1,
                  opacity: state === "scanning" ? [1, 0.5, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: state === "scanning" ? Infinity : 0,
                }}
                className={`w-2 h-2 rounded-full ${
                  state === "idle"
                    ? "bg-slate-400"
                    : state === "scanning"
                    ? "bg-[#7EC8E3]"
                    : "bg-green-500"
                }`}
              ></motion.div>
              
              {/* Status text */}
              <span className="text-xs font-semibold text-slate-700">
                {state === "idle" && "Ready"}
                {state === "scanning" && "Analyzing..."}
                {state === "celebrating" && "Complete!"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scanning particles effect */}
        {state === "scanning" && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#7EC8E3] rounded-full"
              ></motion.div>
            ))}
          </div>
        )}

        {/* Celebration confetti effect */}
        {state === "celebrating" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  y: [0, -200],
                  x: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, Math.random() * 360],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                className={`absolute bottom-0 left-1/2 w-3 h-3 rounded-full ${
                  i % 4 === 0
                    ? "bg-[#7EC8E3]"
                    : i % 4 === 1
                    ? "bg-[#6BB6E8]"
                    : i % 4 === 2
                    ? "bg-[#8A7CFF]"
                    : "bg-[#B9A7FF]"
                }`}
              ></motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
