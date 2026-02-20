
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserStats } from '@/components/gamification/UserStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, Star, Target, Shield, Compass, Sparkles, History, LogIn, User, MapIcon, ArrowRight } from 'lucide-react';
import { useUser, useDoc, useFirestore, useAuth } from '@/firebase/index';
import { doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { CAREER_PATHS } from '@/lib/career-data';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  
  const userDocRef = user ? doc(db!, 'users', user.uid) : null;
  const { data: userData } = useDoc(userDocRef);

  const [localXp, setLocalXp] = useState(0);

  useEffect(() => {
    if (!user) {
      const savedXp = localStorage.getItem('career_craft_xp');
      if (savedXp) setLocalXp(parseInt(savedXp));
    }
  }, [user]);

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const xp = user ? (userData?.xp || 0) : localXp;
  const level = Math.floor(xp / 100) + 1;
  const badges = userData?.badges || ['Path Explorer', 'Reality Aware'];
  const savedCareerIds = userData?.savedCareers || [];
  const savedCareers = CAREER_PATHS.filter(p => savedCareerIds.includes(p.id));

  const achievements = [
    { icon: Compass, title: "Path Explorer", desc: "Completed your first simulation", xp: 100 },
    { icon: Sparkles, title: "Reality Aware", desc: "Explored career metrics", xp: 75 },
    { icon: Target, title: "Decision Maker", desc: "Selected 5 interests", xp: 50 },
    { icon: Shield, title: "Resilient Thinker", desc: "Viewed alternative routes", xp: 25 },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-40 px-6 flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md space-y-8">
          <div className="w-24 h-24 rounded-[32px] bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <User className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-headline font-bold">Your Progress Awaits</h1>
          <p className="text-muted-foreground text-lg">
            Sign in to sync your XP, unlock achievements, and save your career maps forever.
          </p>
          <Button onClick={handleLogin} size="lg" className="w-full h-16 rounded-3xl text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl">
            <LogIn className="w-6 h-6 mr-3" />
            Sign in with Google
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-40 px-6">
      <UserStats />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl overflow-hidden"
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
            ) : (
              <Star className="w-12 h-12 text-primary fill-current" />
            )}
          </motion.div>
          <h1 className="text-5xl font-headline font-bold mb-2">{user.displayName || 'Explorer'}</h1>
          <p className="text-muted-foreground text-lg uppercase tracking-widest font-bold">Level {level} Architect</p>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="rounded-[40px] border-none shadow-xl glass-morphism overflow-hidden">
            <CardHeader className="bg-primary/5 pb-6">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Experience Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total XP</p>
                  <p className="text-4xl font-bold">{xp}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Next Level</p>
                  <p className="text-xl font-bold">{(level * 100) - (xp % 100)} XP to {level + 1}</p>
                </div>
              </div>
              <Progress value={xp % 100} className="h-3" />
            </CardContent>
          </Card>

          <Card className="rounded-[40px] border-none shadow-xl glass-morphism overflow-hidden">
            <CardHeader className="bg-accent/5 pb-6">
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-accent" />
                Milestones Reached
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-3xl bg-white/50 text-center">
                <p className="text-2xl font-bold">{badges.length}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Badges Earned</p>
              </div>
              <div className="p-4 rounded-3xl bg-white/50 text-center">
                <p className="text-2xl font-bold">{savedCareers.length}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Saved Paths</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Career Map */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <MapIcon className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">My Career Map</h2>
          </div>
          {savedCareers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedCareers.map((career) => (
                <Link key={career.id} href={`/career/${career.id}`}>
                  <Card className="rounded-3xl border-none shadow-lg bg-white/70 backdrop-blur-md hover:translate-y-[-4px] transition-all p-6 group">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold">{career.name}</h3>
                        <p className="text-sm text-muted-foreground">{career.role}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass-morphism rounded-[40px] border-dashed border-2">
              <p className="text-muted-foreground mb-6">You haven't saved any career paths yet.</p>
              <Link href="/discovery">
                <Button className="rounded-full px-8">Start Exploring</Button>
              </Link>
            </div>
          )}
        </section>

        {/* Achievement Gallery */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-3xl font-bold">Achievement Gallery</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-morphism p-6 rounded-[32px] text-center group hover:scale-105 transition-transform"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-[10px] text-muted-foreground mb-4">{item.desc}</p>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px]">
                  +{item.xp} XP
                </Badge>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
