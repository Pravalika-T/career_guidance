
"use client";

import { motion } from 'framer-motion';
import { 
  Cpu, 
  Stethoscope, 
  Plane, 
  Palette, 
  Briefcase, 
  Microscope, 
  GraduationCap, 
  Scale, 
  Wrench,
  Binary,
  Heart,
  Music,
  Cloud,
  Compass,
  Atom,
  Gavel,
  BookOpen
} from 'lucide-react';

interface DynamicBackgroundProps {
  domainId: string;
}

const DOMAIN_ELEMENTS: Record<string, { icon: any, color: string }[]> = {
  tech: [
    { icon: Cpu, color: 'text-blue-500' },
    { icon: Binary, color: 'text-cyan-500' },
    { icon: Cpu, color: 'text-blue-400' }
  ],
  health: [
    { icon: Stethoscope, color: 'text-emerald-500' },
    { icon: Heart, color: 'text-red-400' },
    { icon: Stethoscope, color: 'text-teal-500' }
  ],
  aviation: [
    { icon: Plane, color: 'text-sky-500' },
    { icon: Cloud, color: 'text-white' },
    { icon: Compass, color: 'text-indigo-400' }
  ],
  arts: [
    { icon: Palette, color: 'text-purple-500' },
    { icon: Music, color: 'text-pink-500' },
    { icon: Palette, color: 'text-orange-400' }
  ],
  science: [
    { icon: Microscope, color: 'text-indigo-500' },
    { icon: Atom, color: 'text-blue-500' },
    { icon: Microscope, color: 'text-cyan-400' }
  ],
  law: [
    { icon: Scale, color: 'text-amber-600' },
    { icon: Gavel, color: 'text-amber-800' },
    { icon: Scale, color: 'text-yellow-600' }
  ],
  edu: [
    { icon: GraduationCap, color: 'text-emerald-600' },
    { icon: BookOpen, color: 'text-emerald-800' },
    { icon: GraduationCap, color: 'text-green-500' }
  ],
  eng: [
    { icon: Wrench, color: 'text-slate-500' },
    { icon: Cpu, color: 'text-slate-400' },
    { icon: Wrench, color: 'text-blue-600' }
  ],
  business: [
    { icon: Briefcase, color: 'text-indigo-600' },
    { icon: Briefcase, color: 'text-blue-700' },
    { icon: Briefcase, color: 'text-indigo-400' }
  ]
};

export function DynamicBackground({ domainId }: DynamicBackgroundProps) {
  const elements = DOMAIN_ELEMENTS[domainId] || DOMAIN_ELEMENTS.tech;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Domain-specific Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] opacity-20 blur-[120px] rounded-full bg-gradient-to-br from-primary to-accent`}
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 30, 0],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] opacity-20 blur-[120px] rounded-full bg-gradient-to-tr from-accent to-blue-500`}
      />

      {/* Floating 3D Elements */}
      {elements.map((el, i) => {
        const Icon = el.icon;
        return (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              x: [null, (Math.random() * 80 + 10) + '%'],
              y: [null, (Math.random() * 80 + 10) + '%'],
              rotateX: [0, 360],
              rotateY: [0, 360],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{ 
              duration: 15 + i * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2
            }}
            className={`absolute p-6 ${el.color} drop-shadow-2xl filter blur-[1px]`}
          >
            <Icon className="w-24 h-24 stroke-[1px]" />
          </motion.div>
        );
      })}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(255,255,255,0.2)_100%)]" />
    </div>
  );
}
