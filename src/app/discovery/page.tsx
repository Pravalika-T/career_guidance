
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { INTERESTS } from '@/lib/career-data';
import { Button } from '@/components/ui/button';
import { UserStats } from '@/components/gamification/UserStats';
import { Check, ArrowRight, RefreshCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function DiscoveryPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else {
      if (selected.length >= 5) {
        toast({ title: "Limit Reached", description: "Select up to 5 interests for better results." });
        return;
      }
      setSelected([...selected, interest]);
    }
  };

  const handleSubmit = () => {
    if (selected.length < 2) {
      toast({ title: "Keep Selecting!", description: "Select at least 2 interests to help us map your path." });
      return;
    }
    const params = new URLSearchParams();
    selected.forEach(s => params.append('interests', s));
    router.push(`/recommendations?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background p-8 pt-24 flex flex-col items-center">
      <UserStats />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mb-12"
      >
        <h1 className="text-4xl font-headline font-bold mb-4">What ignites your curiosity?</h1>
        <p className="text-muted-foreground text-lg">
          Select up to 5 cards that represent your interests. We'll craft a path just for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl w-full perspective-1000">
        {INTERESTS.map((interest, idx) => {
          const isSelected = selected.includes(interest);
          return (
            <motion.div
              key={interest}
              initial={{ opacity: 0, rotateX: 20, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleInterest(interest)}
              className={`relative h-32 cursor-pointer transition-all duration-300 preserve-3d group ${
                isSelected 
                ? 'bg-primary text-white shadow-2xl shadow-primary/40 ring-4 ring-primary/20 scale-105' 
                : 'bg-white hover:bg-muted text-foreground shadow-lg'
              } rounded-3xl flex items-center justify-center p-4 overflow-hidden`}
            >
              <div className="text-lg font-bold text-center z-10">{interest}</div>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1"
                >
                  <Check className="w-4 h-4 text-primary" />
                </motion.div>
              )}

              {/* Decorative light effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 flex gap-4 bg-white/80 backdrop-blur-xl p-4 rounded-full shadow-2xl border border-primary/20"
          >
            <div className="flex flex-col justify-center px-4 border-r">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Selected</span>
              <span className="text-lg font-bold">{selected.length} / 5</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => setSelected([])}
              className="rounded-full"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-full bg-accent hover:bg-accent/90 px-8 text-lg font-bold group"
            >
              Discover Careers
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
