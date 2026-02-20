
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Sparkles, UserCheck, Play, MousePointer2 } from 'lucide-react';
import { UserStats } from '@/components/gamification/UserStats';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-6 bg-transparent">
      <UserStats />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl w-full text-center relative z-20"
      >
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center p-6 glass-morphism rounded-[40px] mb-12 shadow-2xl relative"
        >
          <Compass className="w-16 h-16 text-primary" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-ping" />
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-headline font-bold mb-8 text-foreground tracking-tighter leading-none">
          CareerCraft <span className="text-accent">3D</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-muted-foreground font-body max-w-3xl mx-auto mb-16 leading-relaxed font-light">
          Step into a <span className="text-primary font-bold">multi-dimensional</span> journey where your passions become your profession.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: UserCheck, title: "Self Discovery", text: "Map your innate passions" },
            { icon: Sparkles, title: "AI Guided", text: "Deep matches in layers" },
            { icon: Play, title: "Simulation", text: "Test drive your future" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
              className="glass-morphism p-8 rounded-[40px] group hover:scale-105 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="perspective-1000"
        >
          <Link href="/discovery">
            <Button size="lg" className="h-20 px-12 text-2xl rounded-full bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Begin Your Adventure
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Button>
          </Link>
        </motion.div>

        <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground font-bold uppercase tracking-[0.3em] text-[10px]">
          <MousePointer2 className="w-3 h-3 animate-bounce" />
          Immersive Interactive Prototype
        </div>
      </motion.div>

      {/* Floating 3D Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: 360,
            y: [0, 100, 0],
            x: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-primary/20 rounded-3xl rotate-12"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            y: [0, -150, 0],
            x: [0, -80, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 border-4 border-accent/20 rounded-full"
        />
      </div>
    </div>
  );
}
