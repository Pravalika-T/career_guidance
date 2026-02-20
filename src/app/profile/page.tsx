
"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserStats } from '@/components/gamification/UserStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, Star, Target, Shield, Compass, Sparkles, History } from 'lucide-react';

export default function ProfilePage() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const savedXp = localStorage.getItem('career_craft_xp');
    if (savedXp) {
      const xpVal = parseInt(savedXp);
      setXp(xpVal);
      setLevel(Math.floor(xpVal / 100) + 1);
    }
  }, []);

  const achievements = [
    { icon: Compass, title: "Path Explorer", desc: "Completed your first simulation", xp: 100 },
    { icon: Sparkles, title: "Reality Aware", desc: "Explored career metrics", xp: 75 },
    { icon: Target, title: "Decision Maker", desc: "Selected 5 interests", xp: 50 },
    { icon: Shield, title: "Resilient Thinker", desc: "Viewed alternative routes", xp: 25 },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-40 px-6">
      <UserStats />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl"
          >
            <Star className="w-12 h-12 text-primary fill-current" />
          </motion.div>
          <h1 className="text-5xl font-headline font-bold mb-2">Explorer Profile</h1>
          <p className="text-muted-foreground text-lg uppercase tracking-widest font-bold">Level {level} Architect</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Progress Overview */}
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
                  <p className="text-xl font-bold">{(level * 100) - xp} XP needed</p>
                </div>
              </div>
              <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xp % 100}%` }}
                  className="h-full bg-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card className="rounded-[40px] border-none shadow-xl glass-morphism overflow-hidden">
            <CardHeader className="bg-accent/5 pb-6">
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5 text-accent" />
                Milestones Reached
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-3xl bg-white/50 text-center">
                <p className="text-2xl font-bold">{Math.floor(xp / 50)}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Paths Viewed</p>
              </div>
              <div className="p-4 rounded-3xl bg-white/50 text-center">
                <p className="text-2xl font-bold">{badges.length || 2}</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Badges Earned</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Grid */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-3xl font-bold">Achievement Gallery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{item.desc}</p>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
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
