
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { INTERESTS } from '@/lib/career-data';
import { ArrowRight, Compass, Sparkles, UserCheck, Play, MousePointer2, Check, RefreshCcw } from 'lucide-react';
import { UserStats } from '@/components/gamification/UserStats';
import { toast } from '@/hooks/use-toast';

export default function WelcomePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else {
      if (selected.length >= 5) {
        toast({ title: "Limit Reached", description: "Select up to 5 interests." });
        return;
      }
      setSelected([...selected, interest]);
    }
  };

  const handleSubmit = () => {
    if (selected.length < 2) {
      toast({ title: "Select More", description: "Choose at least 2 interests to begin." });
      return;
    }
    const params = new URLSearchParams();
    selected.forEach(s => params.append('interests', s));
    router.push(`/recommendations?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col bg-transparent">
      <UserStats />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center p-4 glass-morphism rounded-3xl mb-8"
          >
            <Compass className="w-12 h-12 text-primary" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-headline font-bold mb-6 tracking-tighter leading-none">
            CareerCraft <span className="text-accent">3D</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
            Step into a multi-dimensional journey where your curiosity builds your future.
          </p>

          <div className="flex justify-center gap-4 mb-20">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-16 px-10 rounded-full bg-primary text-xl font-bold shadow-2xl hover:scale-105 transition-all"
            >
              Start Discovering
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Curiosity Section */}
      <section id="discovery" className="py-32 px-6 bg-white/30 backdrop-blur-sm relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4">What ignites your curiosity?</h2>
            <p className="text-xl text-muted-foreground">Select up to 5 interests to map your personalized career route.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
            {INTERESTS.map((interest, idx) => {
              const isSelected = selected.includes(interest);
              return (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => toggleInterest(interest)}
                  className={`h-24 cursor-pointer rounded-2xl flex items-center justify-center p-4 transition-all duration-300 relative overflow-hidden group border-2 ${
                    isSelected 
                    ? 'bg-primary border-primary text-white shadow-lg' 
                    : 'bg-white/60 border-white/20 hover:border-primary/50 text-foreground'
                  }`}
                >
                  <span className="font-bold text-center z-10">{interest}</span>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setSelected([])}
              className="rounded-full h-14 px-8 font-bold border-muted-foreground/20"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={selected.length < 2}
              className="rounded-full h-14 px-12 bg-accent text-lg font-bold shadow-xl shadow-accent/20 group"
            >
              Explore My Map
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-full h-full bg-primary/5 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-accent/5 blur-[120px] rounded-full"
        />
      </div>
    </div>
  );
}
