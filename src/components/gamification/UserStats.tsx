
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

  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const { data: userData } = useDoc(userDocRef);

  useEffect(() => {
    const savedXp = localStorage.getItem('career_craft_xp');
    if (savedXp) setLocalXp(parseInt(savedXp));

    const handleStorageChange = () => {
      const updatedXp = localStorage.getItem('career_craft_xp');
      if (updatedXp) {
        const xpNum = parseInt(updatedXp);
        setLocalXp(xpNum);
        
        // Sync to Firestore if user is logged in
        if (user && db) {
          setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: user.displayName,
            xp: xpNum,
            lastActive: serverTimestamp()
          }, { merge: true });
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, db]);

  const xp = user ? (userData?.xp || localXp) : localXp;
  const level = Math.floor(xp / 100) + 1;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-primary/20">
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
