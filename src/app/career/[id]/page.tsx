
"use client";

import { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAREER_PATHS, DOMAINS } from '@/lib/career-data';
import { PathExplorer } from '@/components/career/PathExplorer';
import { RealityExplorer } from '@/components/career/RealityExplorer';
import { CareerSimulator } from '@/components/career/CareerSimulator';
import { VRExperience } from '@/components/career/VRExperience';
import { UserStats } from '@/components/gamification/UserStats';
import { DynamicBackground } from '@/components/visuals/DynamicBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Wallet, 
  BrainCircuit, 
  Target, 
  Shield, 
  Video, 
  Sparkles, 
  Info, 
  Compass, 
  ArrowRight, 
  Gamepad2,
  Rotate3d
} from 'lucide-react';
import Link from 'next/link';

export default function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const career = CAREER_PATHS.find(p => p.id === id) || CAREER_PATHS[0];
  
  const [showRealityPrompt, setShowRealityPrompt] = useState(false);
  const [isRealityOpen, setIsRealityOpen] = useState(false);
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [isVROpen, setIsVROpen] = useState(false);
  const [hasExploredReality, setHasExploredReality] = useState(false);

  // Find related careers in the same domain, excluding current one
  const relatedCareers = CAREER_PATHS
    .filter(p => p.domainId === career.domainId && p.id !== career.id)
    .slice(0, 3);
  
  // If we need more related careers, pull from others
  const extraCareers = relatedCareers.length < 3 
    ? CAREER_PATHS.filter(p => p.id !== career.id && !relatedCareers.find(r => r.id === p.id)).slice(0, 3 - relatedCareers.length)
    : [];
  
  const finalRelated = [...relatedCareers, ...extraCareers];

  useEffect(() => {
    const timer = setTimeout(() => setShowRealityPrompt(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleRealityExplored = () => {
    setHasExploredReality(true);
    const currentXp = parseInt(localStorage.getItem('career_craft_xp') || '0');
    localStorage.setItem('career_craft_xp', (currentXp + 75).toString());
    window.dispatchEvent(new Event('storage'));
  };

  const domain = DOMAINS.find(d => d.id === career.domainId);

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-x-hidden">
      <UserStats />
      <DynamicBackground domainId={career.domainId} />
      
      {/* Hero Header */}
      <div className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/discovery" className="inline-flex items-center text-foreground/60 hover:text-primary mb-8 transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-bold uppercase tracking-widest text-xs">Back to Discovery</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-primary/20 hover:bg-primary/30 text-primary border-none py-1.5 px-6 text-sm rounded-full font-bold shadow-sm">
                {domain?.name.toUpperCase() || career.domainId.toUpperCase()}
              </Badge>
              <div className="flex items-center text-accent gap-2 bg-accent/10 px-4 py-1.5 rounded-full">
                <Shield className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold uppercase tracking-wider">Failure-Safe Route Active</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold text-foreground mb-8 tracking-tighter leading-none">
              {career.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              {career.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: Wallet, label: "Avg. Salary", val: career.salary, color: "bg-blue-500", shadow: "shadow-blue-200" },
              { icon: Target, label: "Starting Goal", val: career.primaryExam.name, color: "bg-accent", shadow: "shadow-accent/20" },
              { icon: BrainCircuit, label: "Key Skills", val: career.skills.join(', '), color: "bg-primary", shadow: "shadow-primary/20" }
            ].map((stat, i) => (
              <div key={i} className={`bg-white/70 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl ${stat.shadow} border border-white/50 group hover:-translate-y-2 transition-transform duration-500`}>
                <div className={`w-14 h-14 rounded-3xl ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                <p className="text-xl font-bold leading-tight">{stat.val}</p>
              </div>
            ))}
          </motion.div>

          {/* Action Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-accent p-10 rounded-[48px] shadow-2xl text-white relative overflow-hidden group"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-4">Start Your Journey</h3>
                <p className="text-white/80 mb-8 text-lg font-light leading-relaxed">Experience a typical day as a {career.name} through our high-fidelity interactive simulator.</p>
              </div>
              <Button 
                onClick={() => setIsSimOpen(true)}
                className="w-full h-16 bg-white text-accent hover:bg-white/90 rounded-3xl font-bold text-xl shadow-xl hover:scale-105 transition-all"
              >
                <Gamepad2 className="w-6 h-6 mr-3" />
                Play Simulation
              </Button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-100" />
          </motion.div>
        </div>

        {/* VR Experience Trigger */}
        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/40 backdrop-blur-xl p-12 rounded-[56px] border border-white/50 shadow-2xl relative overflow-hidden group"
          >
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="w-20 h-20 rounded-[32px] bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Rotate3d className="w-10 h-10" />
              </div>
              <h2 className="text-4xl font-headline font-bold">Step Into This Career (VR)</h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                "Experience before you decide." Immerse yourself in a guided 360° tour of the {career.name} workplace.
              </p>
              <Button 
                onClick={() => setIsVROpen(true)}
                className="h-16 px-12 rounded-3xl bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-xl hover:scale-105 transition-transform"
              >
                Launch VR Experience
                <Sparkles className="ml-2 w-6 h-6" />
              </Button>
            </div>
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/5 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000" />
          </motion.div>
        </div>

        {/* The 3-Stage Failure-Safe Roadmap */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-headline font-bold mb-6 tracking-tight">The Multi-Route Roadmap</h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed font-light">
              We've mapped every gateway to your goal. One exam is just one door—if it doesn't open, we'll guide you through three more.
            </p>
          </div>
          <PathExplorer career={career} />
        </div>

        {/* Immersive Experience Section (Old Static Version) */}
        <div className="mt-40">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Video className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-4xl font-headline font-bold">360° Virtual Workplace</h2>
                <p className="text-muted-foreground text-lg">Step into the professional environment today.</p>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-2 border-primary/30 text-primary bg-primary/5 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs">
              <Sparkles className="w-4 h-4" />
              Immersive Mode Active
            </Badge>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-10 bg-primary/5 rounded-[80px] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-[56px] shadow-2xl border border-white/50 overflow-hidden">
              {career.virtualExperienceUrl ? (
                <div className="aspect-video w-full relative rounded-[40px] overflow-hidden bg-black shadow-inner ring-1 ring-white/20">
                  <iframe
                    src={career.virtualExperienceUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={`${career.name} 360 Experience`}
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video w-full flex flex-col items-center justify-center bg-muted/30 rounded-[40px] border-4 border-dashed border-muted-foreground/20">
                  <Video className="w-24 h-24 text-muted-foreground/10 mb-6" />
                  <p className="text-3xl font-bold text-muted-foreground/50">Experience coming soon</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 px-10">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="text-lg font-medium italic">Drag or move your device to look around the space</p>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.4em] font-bold opacity-40">
                CareerCraft Virtual Realities
              </p>
            </div>
          </motion.div>
        </div>

        {/* Related Careers Section */}
        <div className="mt-48">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center text-accent shadow-inner">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-4xl font-headline font-bold">Similar Path Branches</h2>
              <p className="text-xl text-muted-foreground font-light">If you like {career.name}, these nearby branches might excite you.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {finalRelated.map((path, idx) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-none shadow-xl hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-3 bg-white/70 backdrop-blur-xl rounded-[48px] overflow-hidden group p-2">
                  <CardHeader className="pb-4 pt-8 px-8">
                    <Badge variant="secondary" className="w-fit mb-4 bg-primary/10 text-primary border-none px-4 py-1 font-bold rounded-full text-[10px]">
                      {DOMAINS.find(d => d.id === path.domainId)?.name.toUpperCase() || 'CAREER'}
                    </Badge>
                    <CardTitle className="text-3xl font-bold tracking-tight">{path.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 flex-1">
                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed font-light">
                      {path.description}
                    </p>
                  </CardContent>
                  <CardFooter className="pb-8 px-8">
                    <Link href={`/career/${path.id}`} className="w-full">
                      <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-white rounded-2xl transition-all font-bold h-14 px-6">
                        Explore Route
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Career Reality Prompt */}
      <AnimatePresence>
        {showRealityPrompt && !isRealityOpen && !isSimOpen && !isVROpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-2xl p-4 pr-8 rounded-full shadow-2xl border border-white/50 flex items-center gap-5 group cursor-pointer hover:shadow-primary/20 transition-all"
            onClick={() => setIsRealityOpen(true)}
          >
            <div className={`w-16 h-16 rounded-full ${hasExploredReality ? 'bg-primary shadow-primary/40' : 'bg-accent shadow-accent/40'} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
              {hasExploredReality ? <Sparkles className="w-8 h-8" /> : <Info className="w-8 h-8" />}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.3em] mb-1">
                {hasExploredReality ? 'Review Reality' : 'Daily Life Insight'}
              </span>
              <span className="text-lg font-bold">Explore Career Reality</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:translate-x-2 transition-transform">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reality Explorer Modal */}
      <AnimatePresence>
        {isRealityOpen && (
          <RealityExplorer 
            metrics={career.reality} 
            careerName={career.name}
            domainId={career.domainId}
            onClose={() => setIsRealityOpen(false)}
            onExplored={handleRealityExplored}
          />
        )}
      </AnimatePresence>

      {/* Career Simulator Modal */}
      <AnimatePresence>
        {isSimOpen && (
          <CareerSimulator 
            career={career}
            onClose={() => setIsSimOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* VR Experience Modal */}
      <AnimatePresence>
        {isVROpen && (
          <VRExperience 
            career={career}
            onClose={() => setIsVROpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
