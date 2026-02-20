
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Compass, User, Sparkles } from 'lucide-react';
import { BackgroundMusic } from '@/components/audio/BackgroundMusic';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/discovery', icon: Compass, label: 'Explore' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-4">
      <BackgroundMusic />
      
      <nav className="glass-morphism rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/discovery' && pathname === '/recommendations');
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="relative group">
              <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                <Icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
