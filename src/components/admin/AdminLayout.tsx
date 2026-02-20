
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Settings, 
  Bell, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Search,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Careers', href: '/admin/careers', icon: Briefcase },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => signOut(auth);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? 80 : 280 }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-50 flex flex-col transition-all shadow-sm"
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">C</div>
              <span className="font-bold text-xl tracking-tight">Admin<span className="text-primary">Panel</span></span>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all group
                  ${isActive 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}
                `}>
                  <Icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'} />
                  {!isCollapsed && <span className="font-semibold text-sm">{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className={`w-full justify-start gap-4 rounded-xl text-slate-500 hover:text-destructive hover:bg-destructive/5 ${isCollapsed ? 'px-2' : ''}`}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="font-semibold text-sm">Sign Out</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all"
        style={{ marginLeft: isCollapsed ? 80 : 280 }}
      >
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10 h-10 bg-slate-50 border-none rounded-full focus-visible:ring-1 focus-visible:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white" />
            </Button>
            
            <div className="w-px h-8 bg-slate-200 mx-2" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none">{user?.displayName || 'Admin'}</p>
                <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-tighter">System Administrator</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={user?.photoURL || ''} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user?.displayName?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <div className="p-8 pb-20">
          {children}
        </div>
      </main>
    </div>
  );
}
