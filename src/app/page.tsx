
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Sparkles, UserCheck } from 'lucide-react';
import { UserStats } from '@/components/gamification/UserStats';

export default function WelcomePage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex flex-col items-center justify-center p-6">
      <UserStats />
      
      {/* Background Blobs for 3D feel */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-2xl mb-8 border border-primary/20"
        >
          <Compass className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-6xl md:text-7xl font-headline font-bold mb-6 text-foreground tracking-tight">
          CareerCraft <span className="text-accent">3D</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-body max-w-2xl mx-auto mb-12 leading-relaxed">
          Embark on a gamified journey to discover your perfect career path. 
          Interactive roadmaps, AI guidance, and 3D exploration await.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: UserCheck, title: "Self Discovery", text: "Map your passions" },
            { icon: Sparkles, title: "AI Guided", text: "Smart recommendations" },
            { icon: ArrowRight, title: "Career Steps", text: "Interactive roadmaps" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm"
            >
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/discovery">
            <Button size="lg" className="h-16 px-10 text-xl rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
              Start Your Adventure
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Guide Character Placeholder */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-10 right-10 hidden lg:flex items-center gap-4 bg-white p-4 rounded-3xl shadow-2xl border border-accent/20"
      >
        <div className="text-right">
          <p className="text-sm font-bold">Aria, Your Guide</p>
          <p className="text-xs text-muted-foreground">Ready to explore?</p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-white">
          <Sparkles className="w-8 h-8" />
        </div>
      </motion.div>
    </div>
  );
}
