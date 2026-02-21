
"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RealityMetrics, DOMAINS } from '@/lib/career-data';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Brain, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Cpu,
  Stethoscope,
  Plane,
  Palette,
  Briefcase,
  Microscope,
  GraduationCap,
  Scale,
  Wrench
} from 'lucide-react';

interface RealityExplorerProps {
  metrics: RealityMetrics;
  careerName: string;
  domainId: string;
  onClose: () => void;
  onExplored: () => void;
}

const DOMAIN_ICONS: Record<string, any> = {
  tech: Cpu,
  health: Stethoscope,
  aviation: Plane,
  arts: Palette,
  business: Briefcase,
  science: Microscope,
  edu: GraduationCap,
  law: Scale,
  eng: Wrench
};

export function RealityExplorer({ metrics, careerName, domainId, onClose, onExplored }: RealityExplorerProps) {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [exploredModules, setExploredModules] = useState<Set<number>>(new Set());
  const [showSummary, setShowSummary] = useState(false);

  const domain = useMemo(() => DOMAINS.find(d => d.id === domainId), [domainId]);
  const DomainIcon = DOMAIN_ICONS[domainId] || Zap;

  useEffect(() => {
    if (exploredModules.size === 3) {
      const timer = setTimeout(() => setShowSummary(true), 1200);
      onExplored();
      return () => clearTimeout(timer);
    }
  }, [exploredModules, onExplored]);

  const handleModuleClick = (id: number) => {
    setActiveModule(id);
    setExploredModules(prev => new Set(prev).add(id));
  };

  const getPercentage = (type: 'pressure' | 'balance' | 'stability', level: string) => {
    if (type === 'pressure') {
      if (level === 'high') return 92;
      if (level === 'moderate') return 54;
      return 18;
    }
    if (type === 'balance') {
      if (level === 'flexible') return 88;
      if (level === 'structured') return 65;
      return 22;
    }
    if (type === 'stability') {
      if (level === 'stable') return 94;
      if (level === 'growing') return 72;
      return 38;
    }
    return 0;
  };

  const summaryText = useMemo(() => {
    const pressureDesc = metrics.pressure === 'high' ? 'high responsibility' : metrics.pressure === 'moderate' ? 'steady focus' : 'a calm workflow';
    const balanceDesc = metrics.balance === 'flexible' ? 'excellent personal flexibility' : metrics.balance === 'structured' ? 'a predictable routine' : 'demanding peak phases';
    const stabilityDesc = metrics.stability === 'stable' ? 'strong long-term predictability' : metrics.stability === 'growing' ? 'exciting growth potential' : 'variable but rewarding outcomes';
    return `This career in ${domain?.name} combines ${pressureDesc}, ${balanceDesc}, and ${stabilityDesc}.`;
  }, [metrics, domain]);

  const themeColors = useMemo(() => {
    switch(domainId) {
      case 'tech': return { primary: 'text-blue-500', bg: 'from-blue-500/10 to-cyan-500/10', accent: 'bg-cyan-500' };
      case 'health': return { primary: 'text-emerald-500', bg: 'from-emerald-500/10 to-teal-500/10', accent: 'bg-emerald-500' };
      case 'arts': return { primary: 'text-purple-500', bg: 'from-purple-500/10 to-pink-500/10', accent: 'bg-purple-500' };
      case 'aviation': return { primary: 'text-sky-500', bg: 'from-sky-500/10 to-indigo-500/10', accent: 'bg-sky-500' };
      default: return { primary: 'text-primary', bg: 'from-primary/10 to-accent/10', accent: 'bg-primary' };
    }
  }, [domainId]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className={`absolute -top-1/4 -left-1/4 w-full h-full bg-gradient-to-br ${themeColors.bg} blur-[120px] rounded-full`} 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className={`absolute -bottom-1/4 -right-1/4 w-full h-full bg-gradient-to-tr ${themeColors.bg} blur-[120px] rounded-full`} 
        />
      </div>

      <div className="max-w-6xl w-full h-full max-h-[95vh] relative flex flex-col items-center overflow-hidden z-10">
        <div className="w-full flex justify-between items-center mb-8 px-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-white shadow-xl ${themeColors.primary}`}>
              <DomainIcon className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">Interactive Reality</span>
              <h2 className="text-2xl md:text-4xl font-headline font-bold text-foreground">
                Life as a <span className={themeColors.primary}>{careerName}</span>
              </h2>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted/50 h-12 w-12">
            <X className="w-8 h-8" />
          </Button>
        </div>

        <div className="flex-1 w-full relative flex flex-col items-center justify-center">
          <div className="w-full max-w-5xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
              <Module 
                id={0}
                title="Mental Pressure"
                icon={Brain}
                percentage={getPercentage('pressure', metrics.pressure)}
                isActive={activeModule === 0}
                isExplored={exploredModules.has(0)}
                onClick={() => handleModuleClick(0)}
                visual={<PressureSphere level={metrics.pressure} domainId={domainId} />}
                feedback={`Stress Level: ${metrics.pressure.toUpperCase()}. Requires high emotional resilience.`}
                themeColors={themeColors}
              />

              <Module 
                id={1}
                title="Work-Life Balance"
                icon={Clock}
                percentage={getPercentage('balance', metrics.balance)}
                isActive={activeModule === 1}
                isExplored={exploredModules.has(1)}
                onClick={() => handleModuleClick(1)}
                visual={<OrbitRing level={metrics.balance} domainId={domainId} />}
                feedback={`Personal Time: ${metrics.balance.toUpperCase()}. Flexibility varies by seniority.`}
                themeColors={themeColors}
              />

              <Module 
                id={2}
                title="Income Stability"
                icon={TrendingUp}
                percentage={getPercentage('stability', metrics.stability)}
                isActive={activeModule === 2}
                isExplored={exploredModules.has(2)}
                onClick={() => handleModuleClick(2)}
                visual={<StabilityPlatform level={metrics.stability} domainId={domainId} />}
                feedback={`Financial Safety: ${metrics.stability.toUpperCase()}. Growth increases with expertise.`}
                themeColors={themeColors}
              />
            </div>
          </div>

          <AnimatePresence>
            {showSummary && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-4 max-w-3xl text-center px-6 py-8 bg-white/40 backdrop-blur-2xl rounded-[48px] border border-white/50 shadow-2xl"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-bold text-sm shadow-lg ${themeColors.accent} text-white`}
                >
                  <Sparkles className="w-5 h-5" />
                  Reality-Aware Explorer Badge Unlocked
                </motion.div>
                <p className="text-xl md:text-2xl font-light text-foreground leading-relaxed italic">
                  "{summaryText}"
                </p>
                <Button 
                  onClick={onClose}
                  className={`mt-8 rounded-full px-12 h-14 text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform ${themeColors.accent}`}
                >
                  Continue Journey
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!showSummary && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 bg-white/50 px-6 py-3 rounded-full backdrop-blur-md border border-white/20">
              <Zap className={`w-5 h-5 ${themeColors.primary} animate-pulse`} />
              <p className="text-sm uppercase tracking-widest font-bold text-foreground/70">
                Tap each module to unlock its secret
              </p>
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
  percentage,
  isActive, 
  isExplored, 
  onClick, 
  visual, 
  feedback, 
  icon: Icon,
  themeColors
}: { 
  id: number; 
  title: string; 
  percentage: number;
  isActive: boolean; 
  isExplored: boolean; 
  onClick: () => void; 
  visual: React.ReactNode; 
  feedback: string;
  icon: any;
  themeColors: any;
}) {
  return (
    <div className="flex flex-col items-center gap-6 relative group">
      <motion.div
        whileHover={{ scale: 1.02, y: -8, rotateY: 5 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`w-full aspect-square rounded-[56px] shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden flex items-center justify-center border-4 ${
          isActive 
            ? 'bg-white border-white scale-105' 
            : isExplored 
              ? 'bg-white/90 border-transparent' 
              : 'bg-white/30 border-white/20 backdrop-blur-xl'
        }`}
      >
        <div className={`absolute top-8 left-8 transition-colors flex items-center gap-2 ${isActive ? themeColors.primary : 'text-muted-foreground/30'}`}>
          <Icon className="w-8 h-8" />
          {isExplored && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold font-headline"
            >
              {percentage}%
            </motion.span>
          )}
        </div>
        
        <div className="relative w-full h-full flex items-center justify-center p-12 overflow-hidden">
          {visual}
        </div>

        {isExplored && !isActive && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className={`absolute bottom-6 right-6 p-1.5 rounded-full ${themeColors.accent} text-white shadow-lg`}
          >
            <CheckCircle2 className="w-5 h-5" />
          </motion.div>
        )}
      </motion.div>
      
      <div className="text-center h-16 flex flex-col items-center">
        <h3 className={`text-base font-bold uppercase tracking-[0.15em] transition-colors ${isExplored ? 'text-foreground' : 'text-muted-foreground'}`}>
          {title}
        </h3>
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-muted-foreground mt-3 font-medium max-w-[240px] leading-snug"
            >
              {feedback}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PressureSphere({ level, domainId }: { level: string, domainId: string }) {
  const duration = level === 'high' ? 1.2 : level === 'moderate' ? 2.5 : 4.5;
  const colors = domainId === 'tech' ? ['#3B82F6', '#06B6D4'] : domainId === 'health' ? ['#10B981', '#14B8A6'] : ['#8B5CF6', '#EC4899'];

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      <motion.div
        animate={{ 
          scale: level === 'high' ? [0.8, 1.3, 0.8] : [0.95, 1.05, 0.95],
          rotateX: [0, 45, 0],
          rotateY: [0, -45, 0],
          opacity: [0.1, 0.4, 0.1]
        }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(circle, ${colors[0]}50, ${colors[1]}00)` }}
        className="w-full h-full rounded-full blur-[40px] absolute"
      />
      <motion.div
        animate={{ 
          scale: level === 'high' ? [0.85, 1.15, 0.85] : [0.9, 1.1, 0.9],
          rotateZ: 360
        }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
        className="w-3/4 h-3/4 rounded-[35%] shadow-[0_0_50px_rgba(0,0,0,0.1)] relative z-10 flex items-center justify-center"
      >
        <div className="w-1/2 h-1/2 rounded-full bg-white/20 blur-md" />
      </motion.div>
    </div>
  );
}

function OrbitRing({ level, domainId }: { level: string, domainId: string }) {
  const arcSize = level === 'flexible' ? 260 : level === 'structured' ? 180 : 90;
  const orbitDuration = level === 'flexible' ? 15 : level === 'structured' ? 10 : 5;
  const color = domainId === 'tech' ? '#3B82F6' : domainId === 'health' ? '#10B981' : '#8B5CF6';

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/10" />
          <motion.circle 
            cx="50" cy="50" r="42" 
            fill="none" 
            stroke={color}
            strokeWidth="6" 
            strokeDasharray={`${arcSize} ${360-arcSize}`}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
        </svg>
        <motion.div 
          className="absolute top-[8%] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full shadow-2xl flex items-center justify-center"
          style={{ backgroundColor: color }}
          animate={{ rotate: -360 }}
          transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-3 h-3 bg-white rounded-full opacity-60 blur-[2px]" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-4/5 h-4/5 border-2 border-dashed border-current rounded-full animate-spin-slow" />
      </div>
    </div>
  );
}

function StabilityPlatform({ level, domainId }: { level: string, domainId: string }) {
  const lift = level === 'stable' ? -45 : level === 'growing' ? -25 : -10;
  const color = domainId === 'tech' ? '#3B82F6' : domainId === 'health' ? '#10B981' : '#8B5CF6';
  
  const pathVariants = {
    stable: 'M0 70 L 25 70 L 50 70 L 75 70 L 100 70',
    growing: 'M0 90 Q 25 85, 50 50 T 100 10',
    variable: 'M0 80 Q 25 30, 50 80 T 100 40'
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: lift }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
        className="w-full h-3/5 bg-white/60 backdrop-blur-md rounded-[32px] border-2 border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden"
      >
        <svg className="absolute inset-0 w-full h-full p-4" preserveAspectRatio="none">
          <motion.path
            d={pathVariants[level as keyof typeof pathVariants]}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <div className={`absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-current opacity-5`} style={{ color }} />
      </motion.div>
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="w-4/5 h-6 bg-black/5 blur-xl rounded-full mt-12" 
      />
    </div>
  );
}
