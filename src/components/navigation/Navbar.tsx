
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, User, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { BackgroundMusic } from '@/components/audio/BackgroundMusic';
import { useUser, useAuth, useDoc, useFirestore } from '@/firebase';
import { signOut } from 'firebase/auth';
import { doc } from 'firebase/firestore';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const auth = useAuth();
  const db = useFirestore();

  const userDocRef = user ? doc(db, 'users', user.uid) : null;
  const { data: userData } = useDoc(userDocRef);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  const isAdmin = userData?.role === 'admin';
  const isAdminView = pathname.startsWith('/admin');

  if (isAdminView) return null;

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/discovery', icon: Compass, label: 'Explore' },
    { href: '/profile', icon: User, label: 'Map' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 z-[200] flex items-center justify-center pointer-events-none pb-safe">
      <div className="flex items-center gap-3 pointer-events-auto">
        <BackgroundMusic />
        
        <nav className="glass-morphism rounded-full px-8 py-4 flex items-center gap-10 shadow-2xl shadow-primary/20 border-white/50 border">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/discovery' && (pathname === '/recommendations' || pathname.startsWith('/career/')));
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="relative group">
                <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                  <Icon className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'scale-110' : ''}`} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {isAdmin && (
            <>
              <div className="w-px h-8 bg-slate-200" />
              <Link href="/admin/dashboard" className="relative group">
                <div className="flex flex-col items-center gap-1.5 text-indigo-600 hover:text-indigo-800 transition-colors">
                  <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Console</span>
                </div>
              </Link>
            </>
          )}
          
          <div className="w-px h-8 bg-slate-200" />
          
          {user ? (
            <button onClick={handleLogout} className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors group">
              <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Exit</span>
            </button>
          ) : (
            <Link href="/login" className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group">
              <LogIn className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Join</span>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
