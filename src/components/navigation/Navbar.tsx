
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Compass, User, LogIn, LogOut } from 'lucide-react';
import { BackgroundMusic } from '@/components/audio/BackgroundMusic';
import { useUser, useAuth } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

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
        
        <div className="w-px h-8 bg-muted-foreground/20" />
        
        {user ? (
          <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Exit</span>
          </button>
        ) : (
          <button onClick={handleLogin} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <LogIn className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Sign In</span>
          </button>
        )}
      </nav>
    </div>
  );
}
