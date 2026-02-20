
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RealityMetrics } from '@/lib/career-data';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Brain, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

interface RealityExplorerProps {
  metrics: RealityMetrics;
  careerName: string;
  onClose: () => void;
  onExplored: () => void;
}

export function RealityExplorer({ metrics, careerName, onClose, onExplored }: RealityExplorerProps) {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [exploredModules, setExploredModules] = useState<Set<number>>(new Set());
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (exploredModules.size === 3) {
      setTimeout(() => setShowSummary(true), 1000);
      onExplored();
    }
  }, [exploredModules, onExplored]);

  const handleModuleClick = (id: number) => {
    setActiveModule(id);
    setExploredModules(prev => new Set(prev).add(id));
  };

  const summaryText = `This career combines ${
    metrics.pressure === 'high' ? 'high responsibility' : metrics.pressure === 'moderate' ? 'steady focus' : 'a calm workflow'
  }, ${
    metrics.balance === 'flexible' ? 'excellent personal flexibility' : metrics.balance === 'structured' ? 'a predictable routine' : 'demanding peak phases'
  }, and ${
    metrics.stability === 'stable' ? 'strong long-term predictability' : metrics.stability === 'growing' ? 'exciting growth potential' : 'variable but rewarding outcomes'
  }.`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
    >
      <div className="max-w-6xl w-full h-full max-h-[90vh] relative flex flex-col items-center overflow-hidden">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-12">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">Reality Experience</span>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
              Daily Life as a <span className="text-accent">{careerName}</span>
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Dashboard Container */}
        <div className="flex-1 w-full relative perspective-1000 flex flex-col items-center justify-center">
          
          {/* Semicircular Layout */}
          <div className="relative w-full max-w-4xl aspect-[16/9] flex items-end justify-center">
            
            {/* Visual Arc Guide */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] aspect-square border-t-2 border-dashed border-primary/20 rounded-full -z-10" />

            {/* Modules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full px-4">
              
              {/* Module 1: Mental Pressure */}
              <Module 
                id={0}
                title="Mental Pressure"
                icon={Brain}
                isActive={activeModule === 0}
                isExplored={exploredModules.has(0)}
                onClick={() => handleModuleClick(0)}
                visual={<PressureSphere level={metrics.pressure} />}
                feedback="This role involves consistent decision responsibility."
              />

              {/* Module 2: Work-Life Balance */}
              <Module 
                id={1}
                title="Work-Life Balance"
                icon={Clock}
                isActive={activeModule === 1}
                isExplored={exploredModules.has(1)}
                onClick={() => handleModuleClick(1)}
                visual={<OrbitRing level={metrics.balance} />}
                feedback="Balance varies by role, experience, and organization."
              />

              {/* Module 3: Income Stability */}
              <Module 
                id={2}
                title="Income Stability"
                icon={TrendingUp}
                isActive={activeModule === 2}
                isExplored={exploredModules.has(2)}
                onClick={() => handleModuleClick(2)}
                visual={<StabilityPlatform level={metrics.stability} />}
                feedback="Financial predictability increases with experience."
              />
            </div>
          </div>

          {/* Combined Summary Moment */}
          <AnimatePresence>
            {showSummary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-10 max-w-2xl text-center px-6"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-medium text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Reality-Aware Explorer Badge Unlocked
                </motion.div>
                <p className="text-xl font-light text-muted-foreground leading-relaxed italic">
                  {summaryText}
                </p>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="mt-8 rounded-full px-8 h-12 border-primary/20 hover:bg-primary/5 font-bold"
                >
                  Continue Exploration
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interaction Hint */}
        {!showSummary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex flex-col items-center gap-2"
          >
            <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
              Interact with the modules to discover insights
            </p>
            <div className="w-1 h-8 bg-muted rounded-full relative overflow-hidden">
              <motion.div 
                animate={{ y: [-32, 32] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-primary/40"
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function Module({ 
  id, 
  title, 
  isActive, 
  isExplored, 
  onClick, 
  visual, 
  feedback, 
  icon: Icon 
}: { 
  id: number; 
  title: string; 
  isActive: boolean; 
  isExplored: boolean; 
  onClick: () => void; 
  visual: React.ReactNode; 
  feedback: string;
  icon: any;
}) {
  return (
    <div className="flex flex-col items-center gap-8 relative group">
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`w-full aspect-square rounded-[40px] shadow-2xl transition-all duration-700 cursor-pointer relative overflow-hidden flex items-center justify-center ${
          isActive ? 'bg-white ring-4 ring-primary/20' : isExplored ? 'bg-white/80 grayscale-[0.5]' : 'bg-white/40 backdrop-blur-sm'
        }`}
      >
        <div className="absolute top-6 left-6 text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div className="relative w-full h-full flex items-center justify-center p-8">
          {visual}
        </div>
        {isExplored && !isActive && (
          <div className="absolute bottom-4 right-4 text-primary">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}
      </motion.div>
      
      <div className="text-center h-12 flex flex-col items-center">
        <h3 className={`text-sm font-bold uppercase tracking-widest transition-colors ${isExplored ? 'text-foreground' : 'text-muted-foreground'}`}>
          {title}
        </h3>
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-muted-foreground mt-2 font-medium max-w-[200px]"
            >
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PressureSphere({ level }: { level: string }) {
  const duration = level === 'high' ? 1.5 : level === 'moderate' ? 3 : 5;
  const scaleRange = level === 'high' ? [0.8, 1.2, 0.8] : [0.9, 1.1, 0.9];
  const blur = level === 'high' ? 'blur-md' : 'blur-2xl';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ 
          scale: scaleRange,
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className={`w-3/4 h-3/4 rounded-full bg-gradient-to-br from-primary via-accent to-purple-400 opacity-20 ${blur} absolute`}
      />
      <motion.div
        animate={{ scale: scaleRange }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        className="w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary to-accent shadow-xl relative z-10"
      />
    </div>
  );
}

function OrbitRing({ level }: { level: string }) {
  const arc = level === 'flexible' ? 180 : level === 'structured' ? 120 : 60;
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="relative w-3/4 h-3/4"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground/20" />
          <motion.circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeDasharray={`${arc} ${360-arc}`}
            strokeLinecap="round"
            className="text-accent"
          />
        </svg>
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-3 h-3 bg-white rounded-full opacity-40 blur-xs" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function StabilityPlatform({ level }: { level: string }) {
  const lift = level === 'stable' ? -30 : level === 'growing' ? -15 : -5;
  const path = level === 'stable' ? 'M0 80 Q 50 80, 100 80' : level === 'growing' ? 'M0 90 Q 50 70, 100 20' : 'M0 80 Q 25 40, 50 80 T 100 60';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: lift }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
        className="w-full h-1/2 bg-white/40 backdrop-blur-md rounded-2xl border border-primary/20 shadow-xl relative overflow-hidden"
      >
        <svg className="absolute bottom-0 w-full h-full opacity-40" preserveAspectRatio="none">
          <motion.path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
      </motion.div>
      <div className="w-full h-4 bg-muted/20 blur-xl rounded-full mt-8" />
    </div>
  );
}
