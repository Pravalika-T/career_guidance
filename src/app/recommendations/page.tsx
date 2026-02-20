
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { smartCareerRecommendation, type SmartCareerRecommendationOutput } from '@/ai/flows/smart-career-recommendation-flow';
import { UserStats } from '@/components/gamification/UserStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Trophy, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function RecommendationsPage() {
  const searchParams = useSearchParams();
  const interests = searchParams.getAll('interests');
  const [data, setData] = useState<SmartCareerRecommendationOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchRecommendations() {
      if (interests.length === 0) {
        router.push('/discovery');
        return;
      }
      try {
        setError(null);
        const result = await smartCareerRecommendation({ userInterests: interests });
        setData(result);
        
        // Bonus XP for completing discovery
        const currentXp = parseInt(localStorage.getItem('career_craft_xp') || '0');
        localStorage.setItem('career_craft_xp', (currentXp + 50).toString());
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred while generating recommendations.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendations();
  }, [interests, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <Sparkles className="w-16 h-16 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-headline font-bold mb-4 text-center">Crafting your destiny...</h2>
        <p className="text-muted-foreground text-center">Our AI guide is analyzing {interests.length} interests to find your perfect match.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8 pt-24 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>AI Service Error</AlertTitle>
          <AlertDescription>
            {error.includes('403') ? (
              <span>
                The AI model could not be reached. Please ensure the <strong>Generative Language API</strong> is enabled in your Google Cloud console.
                <br />
                <a 
                  href="https://console.developers.google.com/apis/api/generativelanguage.googleapis.com/overview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline font-bold mt-2 inline-block"
                >
                  Enable API Here
                </a>
              </span>
            ) : error}
          </AlertDescription>
        </Alert>
        <Button onClick={() => window.location.reload()} className="rounded-full px-8">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 pt-24 max-w-6xl mx-auto">
      <UserStats />
      
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4 font-bold text-sm">
          <Trophy className="w-4 h-4" />
          Mapping Complete!
        </div>
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">Your Career Path Recommendations</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Based on your passion for <span className="text-primary font-bold">{interests.join(', ')}</span>, these paths offer the best alignment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.recommendations.map((career, i) => (
          <motion.div
            key={career.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col">
              <CardHeader className="relative pb-0">
                <div className="absolute top-4 right-4 bg-primary/10 text-primary p-3 rounded-2xl flex flex-col items-center">
                  <span className="text-xs uppercase font-bold">Match</span>
                  <span className="text-xl font-bold">{career.alignmentScore}%</span>
                </div>
                <CardTitle className="text-2xl pt-6 pr-16">{career.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 mt-4">
                <p className="text-muted-foreground line-clamp-4 leading-relaxed">
                  {career.description}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  onClick={() => router.push(`/career/swe`)} 
                  className="w-full rounded-2xl h-12 bg-primary hover:bg-primary/90 text-lg group"
                >
                  Explore Roadmap
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center pb-12">
        <Button variant="outline" onClick={() => router.push('/discovery')} className="rounded-full px-8 h-12">
          Redo Discovery
        </Button>
      </div>
    </div>
  );
}
