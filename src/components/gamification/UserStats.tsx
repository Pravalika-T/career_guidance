
'use client';

import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Zap } from 'lucide-react';
import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export function UserStats() {
  const { user } = useUser();
  const db = useFirestore();
  const [localXp, setLocalXp] = useState(0);
  const [mounted, setMounted] = useState(false);

  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const { data: userData } = useDoc(userDocRef);

  // Initial local XP load and mount check
  useEffect(() => {
    setMounted(true);
    const savedXp = localStorage.getItem('career_craft_xp');
    if (savedXp) setLocalXp(parseInt(savedXp));
  }, []);

  // Sync Local XP to Cloud XP on Login or Update
  useEffect(() => {
    const handleStorageChange = async () => {
      const updatedXp = localStorage.getItem('career_craft_xp');
      if (updatedXp) {
        const xpNum = parseInt(updatedXp);
        setLocalXp(xpNum);
        
        if (user && db) {
          // Only update if cloud XP is lower than local (to prevent overwriting higher cloud stats)
          if (!userData || (userData.xp || 0) < xpNum) {
            await setDoc(doc(db, 'users', user.uid), {
              xp: xpNum,
              lastActive: serverTimestamp()
            }, { merge: true });
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Trigger once on login/mount to sync
    handleStorageChange();
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, db, userData]);

  if (!mounted) return null;

  const xp = user ? (userData?.xp || localXp) : localXp;
  const level = Math.floor(xp / 100) + 1;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-primary/20">
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1 text-accent font-bold">
          <Zap className="w-4 h-4 fill-current" />
          <span>Lvl {level}</span>
        </div>
        <div className="w-32 h-2 mt-1">
          <Progress value={(xp % 100)} className="h-full bg-muted" />
        </div>
      </div>
      <div className="flex items-center gap-2 border-l pl-4">
        <div className="flex -space-x-2">
          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary p-1">
            <Award className="w-4 h-4" />
          </Badge>
          <Badge variant="outline" className="bg-accent/10 border-accent/20 text-accent p-1">
            <Zap className="w-4 h-4" />
          </Badge>
        </div>
        <span className="text-xs font-semibold text-muted-foreground">{xp} XP</span>
      </div>
    </div>
  );
}
