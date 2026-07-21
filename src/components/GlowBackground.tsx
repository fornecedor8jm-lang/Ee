import { motion } from 'motion/react';

export default function GlowBackground() {
  return (
    <div className="fixed inset-0 -z-50 bg-[#020104] overflow-hidden">
      {/* Mystical purple glow blobs */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -80, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-900/20 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -60, 60, 0],
          y: [0, 80, -80, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-indigo-950/25 blur-[130px]"
      />
      <motion.div
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4b0082]/10 blur-[150px]"
      />

      {/* Starry particles */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[25%] left-[80%] w-1 h-1 bg-[#d4af37] rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[45%] left-[15%] w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-[70%] left-[65%] w-1 h-1 bg-[#d4af37]/70 rounded-full animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[85%] left-[30%] w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[50%] left-[85%] w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
      </div>

      {/* Deep gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020104]/50 to-[#020104]" />
    </div>
  );
}
