
"use client";

import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award, Zap } from 'lucide-react';

export function UserStats() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    // Mock hydration-safe stats
    const savedXp = localStorage.getItem('career_craft_xp');
    if (savedXp) setXp(parseInt(savedXp));
    setLevel(Math.floor(xp / 100) + 1);
  }, [xp]);

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
