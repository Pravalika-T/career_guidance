
"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerPath, VRHotspot } from '@/lib/career-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Sparkles, 
  Info, 
  ArrowRight, 
  ChevronRight, 
  Rotate3d, 
  Eye,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

interface VRExperienceProps {
  career: CareerPath;
  onClose: () => void;
}

type SceneStep = 'entry' | 'environment' | 'responsibilities' | 'lifestyle' | 'reflection';

export function VRExperience({ career, onClose }: VRExperienceProps) {
  const [step, setStep] = useState<SceneStep>('entry');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [exploredHotspots, setExploredHotspots] = useState<Set<string>>(new Set());

  const scenes = career.vrExperience?.scenes || [];
  const currentSceneIndex = scenes.findIndex(s => s.id === step);
  const currentScene = scenes[currentSceneIndex];

  const handleNext = () => {
    if (step === 'entry') setStep('environment');
    else if (step === 'environment') setStep('responsibilities');
    else if (step === 'responsibilities') setStep('lifestyle');
    else if (step === 'lifestyle') setStep('reflection');
  };

  const handleHotspotClick = (id: string) => {
    setActiveHotspot(id);
    setExploredHotspots(prev => new Set(prev).add(id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background 360 Video / VR Canvas */}
      <div className="absolute inset-0 z-0">
        <iframe
          src={`${career.virtualExperienceUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${career.virtualExperienceUrl?.split('/').pop()}`}
          className="w-full h-full object-cover scale-150 grayscale-[0.2] blur-[2px]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Main UI Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-8 md:p-12">
        <div className="w-full flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[20px] bg-white/10 backdrop-blur-xl flex items-center justify-center text-white border border-white/20">
              <Rotate3d className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em]">VR Career Immersion</p>
              <h2 className="text-2xl font-bold text-white font-headline">{career.name}</h2>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-white hover:bg-white/10 rounded-full h-12 w-12"
          >
            <X className="w-8 h-8" />
          </Button>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {step === 'entry' && (
            <motion.div
              key="entry"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className="max-w-xl text-center space-y-8"
            >
              <Badge className="bg-primary/20 text-primary border-none px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[10px]">
                <Sparkles className="w-4 h-4 mr-2" />
                Step Into the Future
              </Badge>
              <h1 className="text-5xl md:text-6xl font-headline font-bold text-white tracking-tighter">
                Experience the Day
              </h1>
              <p className="text-xl text-white/60 font-light leading-relaxed">
                You're about to experience a typical day as a {career.name}. 
                Take your time to look around and feel the workplace rhythm.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                <Button 
                  onClick={handleNext}
                  className="h-16 px-12 rounded-3xl bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-2xl"
                >
                  Enter Experience
                  <ChevronRight className="ml-2 w-6 h-6" />
                </Button>
                <div className="flex items-center gap-3 px-6 py-4 rounded-3xl bg-white/5 border border-white/10 text-white/40">
                  <Eye className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">360° Mode Active</span>
                </div>
              </div>
            </motion.div>
          )}

          {(step === 'environment' || step === 'responsibilities' || step === 'lifestyle') && currentScene && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center gap-12"
            >
              {/* Hotspots Layer */}
              <div className="absolute inset-0 pointer-events-none">
                {currentScene.hotspots.map((hotspot) => (
                  <motion.div
                    key={hotspot.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute pointer-events-auto"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  >
                    <button
                      onClick={() => handleHotspotClick(hotspot.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                        activeHotspot === hotspot.id 
                          ? 'bg-primary border-white scale-125' 
                          : exploredHotspots.has(hotspot.id)
                            ? 'bg-white/20 border-white/40'
                            : 'bg-white/40 border-white animate-pulse'
                      }`}
                    >
                      <Info className="w-6 h-6 text-white" />
                    </button>
                    {activeHotspot === hotspot.id && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 10 }}
                        className="absolute left-full ml-4 top-1/2 -translate-y-1/2 w-64 p-6 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl"
                      >
                        <h4 className="font-bold text-foreground mb-1">{hotspot.label}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{hotspot.info}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Scene Info */}
              <div className="max-w-2xl bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold text-primary tracking-[0.4em] mb-4 block">
                  Scene {currentSceneIndex + 1}: {currentScene.id.toUpperCase()}
                </span>
                <h3 className="text-3xl font-bold text-white mb-4">{currentScene.title}</h3>
                <p className="text-white/70 font-light italic leading-relaxed">
                  "{currentScene.description}"
                </p>
                <div className="mt-8 flex justify-center gap-2">
                  {scenes.map((s, i) => (
                    <div 
                      key={s.id} 
                      className={`h-1.5 w-12 rounded-full transition-all duration-500 ${
                        i <= currentSceneIndex ? 'bg-primary' : 'bg-white/10'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleNext}
                className="rounded-full h-14 px-10 bg-white text-black hover:bg-white/90 font-bold"
              >
                Continue to {step === 'lifestyle' ? 'Reflection' : 'Next Scene'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          )}

          {step === 'reflection' && (
            <motion.div
              key="reflection"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-2xl w-full bg-white/95 backdrop-blur-2xl p-12 rounded-[56px] shadow-2xl text-center space-y-10"
            >
              <div className="w-20 h-20 rounded-[28px] bg-primary/10 flex items-center justify-center text-primary mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-4xl font-headline font-bold mb-4">Journey Reflected</h2>
                <p className="text-muted-foreground text-lg font-light leading-relaxed italic">
                  "This is one possible version of this career. Does this vision align with your curiosity?"
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  onClick={onClose}
                  className="h-16 rounded-3xl bg-primary text-white font-bold text-lg hover:scale-105 transition-transform"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Feels Right
                </Button>
                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="h-16 rounded-3xl border-muted-foreground/20 text-foreground font-bold text-lg hover:bg-muted"
                >
                  Explore Alternatives
                  <HelpCircle className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.3em] pt-4">
                Experience Insight Logged +150 XP
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Interaction Guide */}
        <div className="w-full flex justify-center pb-4">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-white/60">
            <Info className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Drag or Move Device to Explore Workplace</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
