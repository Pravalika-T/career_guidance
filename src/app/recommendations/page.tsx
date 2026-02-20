"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { smartCareerRecommendation, type SmartCareerRecommendationOutput } from '@/ai/flows/smart-career-recommendation-flow';
import { UserStats } from '@/components/gamification/UserStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Trophy, ArrowRight, Info, Plus, ChevronDown, Compass, Star } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CAREER_PATHS } from '@/lib/career-data';

export default function RecommendationsPage() {
  const searchParams = useSearchParams();
  const interests = searchParams.get('interests') ? searchParams.getAll('interests') : [];
  const [data, setData] = useState<SmartCareerRecommendationOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleLayers, setVisibleLayers] = useState<string[]>(['primary']);
  const [exploredCount, setExploredCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchRecommendations() {
      if (interests.length === 0) {
        router.push('/discovery');
        return;
      }
      try {
        setLoading(true);
        const result = await smartCareerRecommendation({ userInterests: interests });
        setData(result);
        
        const currentXp = parseInt(localStorage.getItem('career_craft_xp') || '0');
        localStorage.setItem('career_craft_xp', (currentXp + 50).toString());
        window.dispatchEvent(new Event('storage'));
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [interests.length, router]);

  const revealLayer = (layer: string) => {
    if (!visibleLayers.includes(layer)) {
      setVisibleLayers([...visibleLayers, layer]);
      // Bonus XP for exploring more
      const currentXp = parseInt(localStorage.getItem('career_craft_xp') || '0');
      localStorage.setItem('career_craft_xp', (currentXp + 25).toString());
      window.dispatchEvent(new Event('storage'));
    }
  };

  const layers = useMemo(() => {
    if (!data) return { primary: [], alternative: [], cross: [], gems: [] };
    return {
      primary: data.recommendations.filter(r => r.category === 'primary'),
      alternative: data.recommendations.filter(r => r.category === 'alternative'),
      cross: data.recommendations.filter(r => r.category === 'cross-domain'),
      gems: data.recommendations.filter(r => r.category === 'hidden-gem'),
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="mb-8">
          <Sparkles className="w-16 h-16 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-headline font-bold mb-4">Mapping your future...</h2>
        <p className="text-muted-foreground text-center max-w-md">Our AI is analyzing the full opportunity space to find your best matches.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 pt-24 max-w-7xl mx-auto pb-40">
      <UserStats />
      
      <div className="mb-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-2 rounded-full mb-6 font-bold">
          <Trophy className="w-5 h-5" />
          Discovery Phase Complete
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 tracking-tight">Your Custom Career Map</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We've identified <span className="text-primary font-bold">{data?.recommendations.length} paths</span> across 4 discovery layers based on your passion for <span className="text-accent font-bold">{interests.join(', ')}</span>.
        </p>
      </div>

      <div className="space-y-24">
        {/* Layer 1: Best Fit */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Layer 1: Best Fit</h2>
              <p className="text-muted-foreground">These careers match your profile with over 90% alignment.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {layers.primary.map((career, i) => (
              <CareerCard key={career.name} career={career} index={i} priority />
            ))}
          </div>
        </section>

        {/* Layer 2: Strong Alternatives */}
        <section className="relative">
          {!visibleLayers.includes('alternative') ? (
            <div className="flex flex-col items-center py-12 bg-white/40 backdrop-blur-md rounded-[48px] border-2 border-dashed border-primary/20">
              <Compass className="w-12 h-12 text-primary/40 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Curious about more?</h3>
              <p className="text-muted-foreground mb-8">Unlock 5 strong alternative paths in related domains.</p>
              <Button onClick={() => revealLayer('alternative')} className="rounded-full h-14 px-10 text-lg bg-primary shadow-xl">
                Show More Matches <ChevronDown className="ml-2 w-5 h-5" />
              </Button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white">
                  <Plus className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Layer 2: Strong Alternatives</h2>
                  <p className="text-muted-foreground">Similar domains, different daily vibes.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {layers.alternative.map((career, i) => (
                  <CareerCard key={career.name} career={career} index={i} />
                ))}
              </div>
              {!visibleLayers.includes('cross') && (
                <div className="mt-12 text-center">
                  <Button variant="outline" onClick={() => revealLayer('cross')} className="rounded-full border-accent text-accent hover:bg-accent/5">
                    Explore Related Careers
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </section>

        {/* Layer 3: Cross-Domain */}
        <AnimatePresence>
          {visibleLayers.includes('cross') && (
            <motion.section initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Layer 3: Cross-Domain Opportunities</h2>
                  <p className="text-muted-foreground">Paths where your different interests meet.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {layers.cross.map((career, i) => (
                  <CareerCard key={career.name} career={career} index={i} />
                ))}
              </div>
              {!visibleLayers.includes('gems') && (
                <div className="mt-12 text-center">
                  <Button variant="ghost" onClick={() => revealLayer('gems')} className="text-purple-600 font-bold">
                    Discover More Possibilities ✨
                  </Button>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Layer 4: Hidden Gems */}
        <AnimatePresence>
          {visibleLayers.includes('gems') && (
            <motion.section initial={{ opacity: 0, rotateX: 20 }} animate={{ opacity: 1, rotateX: 0 }}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Layer 4: Hidden Gems & New-Age Roles</h2>
                  <p className="text-muted-foreground">Unique careers with high future potential.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {layers.gems.map((career, i) => (
                  <CareerCard key={career.name} career={career} index={i} highlight />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Bar */}
      <motion.div 
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-2xl px-8 py-4 rounded-full shadow-2xl border border-primary/20 flex items-center gap-8"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Your Map Progress</span>
          <span className="text-sm font-bold text-primary">Explorer Level: {visibleLayers.length}/4 Layers Unlocked</span>
        </div>
        <Button onClick={() => router.push('/discovery')} variant="ghost" className="rounded-full text-muted-foreground">
          Reset Map
        </Button>
      </motion.div>
    </div>
  );
}

function CareerCard({ career, index, priority, highlight }: { career: any, index: number, priority?: boolean, highlight?: boolean }) {
  const router = useRouter();
  const localPath = CAREER_PATHS.find(p => p.name.toLowerCase().includes(career.name.toLowerCase()));
  const careerId = localPath?.id || 'swe';

  return (
    <motion.div
      initial={{ opacity: 0, translateZ: -100, y: 20 }}
      animate={{ opacity: 1, translateZ: 0, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: priority ? 1.02 : 1.05 }}
      className="h-full perspective-1000"
    >
      <Card className={`h-full border-none shadow-xl transition-all duration-500 rounded-[32px] overflow-hidden flex flex-col ${
        priority ? 'bg-white shadow-primary/10 ring-2 ring-primary/5' : highlight ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-white/60 backdrop-blur-md'
      }`}>
        <CardHeader className="relative pb-0 pt-8">
          <div className={`absolute top-6 right-6 p-3 rounded-2xl flex flex-col items-center ${
            priority ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
          }`}>
            <span className="text-[10px] uppercase font-bold">Match</span>
            <span className="text-lg font-bold">{career.alignmentScore}%</span>
          </div>
          <CardTitle className={`font-bold pr-16 ${priority ? 'text-3xl' : 'text-xl'}`}>{career.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 mt-6">
          <p className="text-muted-foreground line-clamp-4 leading-relaxed text-sm">
            {career.description}
          </p>
        </CardContent>
        <CardFooter className="pb-8">
          <Button 
            onClick={() => router.push(`/career/${careerId}`)} 
            className={`w-full rounded-2xl h-12 font-bold group transition-all ${
              priority ? 'bg-primary hover:bg-primary/90 text-lg' : 'bg-white text-foreground border border-muted-foreground/10 hover:bg-muted'
            }`}
          >
            Explore Roadmap
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
