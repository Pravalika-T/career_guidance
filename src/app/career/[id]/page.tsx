
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
  Rotate3d,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import Link from 'next/link';
import { useUser, useFirestore, useDoc } from '@/firebase/index';
import { doc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';

export default function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const career = CAREER_PATHS.find(p => p.id === id) || CAREER_PATHS[0];
  
  const { user } = useUser();
  const db = useFirestore();
  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const { data: userData } = useDoc(userDocRef);

  const [showRealityPrompt, setShowRealityPrompt] = useState(false);
  const [isRealityOpen, setIsRealityOpen] = useState(false);
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [isVROpen, setIsVROpen] = useState(false);
  const [hasExploredReality, setHasExploredReality] = useState(false);

  const isSaved = userData?.savedCareers?.includes(career.id);

  useEffect(() => {
    const timer = setTimeout(() => setShowRealityPrompt(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleSave = () => {
    if (!user || !db) {
      toast({ title: "Sign In Required", description: "Log in to save careers to your map." });
      return;
    }

    const action = isSaved ? arrayRemove(career.id) : arrayUnion(career.id);
    
    setDoc(doc(db, 'users', user.uid), {
      savedCareers: action
    }, { merge: true });

    toast({
      title: isSaved ? "Removed from Map" : "Saved to Map",
      description: isSaved ? `${career.name} was removed.` : `${career.name} is now in your profile.`
    });
  };

  const handleRealityExplored = () => {
    setHasExploredReality(true);
    const currentXp = parseInt(localStorage.getItem('career_craft_xp') || '0');
    localStorage.setItem('career_craft_xp', (currentXp + 75).toString());
    window.dispatchEvent(new Event('storage'));
  };

  const domain = DOMAINS.find(d => d.id === career.domainId);
  const relatedCareers = CAREER_PATHS
    .filter(p => p.domainId === career.domainId && p.id !== career.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-32 relative overflow-x-hidden">
      <UserStats />
      <DynamicBackground domainId={career.domainId} />
      
      {/* Hero Header */}
      <div className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-8">
            <Link href="/discovery" className="inline-flex items-center text-foreground/60 hover:text-primary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-white transition-all">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-bold uppercase tracking-widest text-xs">Back to Discovery</span>
            </Link>
            
            <Button 
              onClick={handleToggleSave}
              variant="outline" 
              className={`rounded-full px-6 h-12 font-bold shadow-md border-none ${isSaved ? 'bg-primary text-white' : 'bg-white text-muted-foreground'}`}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5 mr-2" /> : <Bookmark className="w-5 h-5 mr-2" />}
              {isSaved ? 'In My Map' : 'Save to Map'}
            </Button>
          </div>
          
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
                <p className="text-white/80 mb-8 text-lg font-light leading-relaxed">Experience a typical day through our interactive simulator.</p>
              </div>
              <Button 
                onClick={() => setIsSimOpen(true)}
                className="w-full h-16 bg-white text-accent hover:bg-white/90 rounded-3xl font-bold text-xl shadow-xl hover:scale-105 transition-all"
              >
                <Gamepad2 className="w-6 h-6 mr-3" />
                Play Simulation
              </Button>
            </div>
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
                Experience before you decide. Immerse yourself in a guided 360° tour of the {career.name} workplace.
              </p>
              <Button 
                onClick={() => setIsVROpen(true)}
                className="h-16 px-12 rounded-3xl bg-primary hover:bg-primary/90 text-white font-bold text-xl shadow-xl hover:scale-105 transition-transform"
              >
                Launch VR Experience
                <Sparkles className="ml-2 w-6 h-6" />
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="mt-32">
          <PathExplorer career={career} />
        </div>

        {/* Similar Paths */}
        <div className="mt-48">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-16 h-16 rounded-3xl bg-accent/10 flex items-center justify-center text-accent shadow-inner">
              <Compass className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-4xl font-headline font-bold">Similar Path Branches</h2>
              <p className="text-xl text-muted-foreground font-light">Branches that might excite you based on {career.name}.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedCareers.map((path, idx) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-3 bg-white/70 backdrop-blur-xl rounded-[48px] overflow-hidden group p-2">
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

      <AnimatePresence>
        {isSimOpen && (
          <CareerSimulator 
            career={career}
            onClose={() => setIsSimOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVROpen && (
          <VRExperience 
            career={career}
            onClose={() => setIsVROpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Reality Floating Prompt */}
      <AnimatePresence>
        {showRealityPrompt && !isRealityOpen && !isSimOpen && !isVROpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-40 bg-white/90 backdrop-blur-2xl p-4 pr-8 rounded-full shadow-2xl border border-white/50 flex items-center gap-5 group cursor-pointer hover:shadow-primary/20 transition-all"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
