
"use client";

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using a royalty-free ambient loop placeholder
  const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3";

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMusic}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`rounded-full w-12 h-12 glass-morphism transition-all ${isPlaying ? 'text-primary ring-2 ring-primary/20' : 'text-muted-foreground'}`}
      >
        {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
      </Button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 glass-morphism px-4 py-2 rounded-2xl whitespace-nowrap pointer-events-none"
          >
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {isPlaying ? "Ambient Mode: On" : "Enable Ambient Sound"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
