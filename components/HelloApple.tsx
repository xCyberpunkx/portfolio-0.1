"use client";
import { AppleHelloEffect } from "@/components/ui/apple-hello";
import { motion } from "framer-motion";

const AppleHelloEffectDemo = () => {
  return (
    <div className="flex w-full h-screen flex-col justify-center items-center gap-8 bg-bhite relative">
      {/* Hello Text */}
      <div className="relative z-10">
        <AppleHelloEffect 
          speed={1.1}
          className="text-black"
        />
      </div>
      
      {/* Team Logos around the text */}
      <div className="absolute flex items-center justify-center w-full h-full pointer-events-none">
    
      {/* Pirelli Logo */}
      <motion.div
        className="mt-32 ml-48 absolute"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <img
          src="/pirelli.png"
          alt="Pirelli"
          width={80}
          height={80}
        />
      </motion.div>
      
      {/* Divider */}
      <motion.div 
        className="w-16 h-px bg-white/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 3.7,
          ease: "easeOut"
        }}
      />
      </div>
    </div>
  );
};

export default AppleHelloEffectDemo;
