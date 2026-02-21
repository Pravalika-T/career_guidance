
'use client';

import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  History,
  Download,
  Loader2,
  MapIcon,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useMemo, useState } from 'react';

export default function UserManagementPage() {
  const db = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const usersQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'users'), orderBy('xp', 'desc'));
  }, [db]);

  const { data: users, loading } = useCollection(usersQuery);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter(u => 
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.uid?.includes(searchTerm)
    );
  }, [users, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Explorer Registry</h1>
          <p className="text-slate-500 font-medium">Monitoring growth and engagement for {users?.length || 0} students.</p>
        </div>
        <Button className="h-14 px-10 rounded-3xl bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-bold shadow-sm transition-all">
          <Download className="w-5 h-5 mr-3" />
          Export Data
        </Button>
      </div>

      <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input 
            placeholder="Search by name, email or system UID..." 
            className="pl-12 h-14 bg-slate-50 border-none rounded-2xl focus-visible:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 rounded-2xl px-8 font-bold border-slate-200 text-slate-600 bg-white">
          <Filter className="w-5 h-5 mr-3" />
          Filters
        </Button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Explorer Profile</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">System Role</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Gamification Progress</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Mapped Routes</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Status</th>
                <th className="px-10 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary opacity-20" />
                    <p className="text-slate-400 mt-6 font-bold text-xs uppercase tracking-widest">Streaming Registry...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-32 text-center">
                    <p className="text-slate-400 font-bold text-sm">No explorers found matching your search.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, i) => (
                  <tr key={user.uid} className="hover:bg-slate-50/30 transition-all group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-5">
                        <Avatar className="h-14 w-14 border-4 border-white shadow-md group-hover:scale-110 transition-transform">
                          <AvatarImage src={user.photoURL || ''} />
                          <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-lg">
                            {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-slate-900 text-lg">{user.displayName || 'Anonymous Explorer'}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                            <Mail size={12} className="text-slate-300" /> {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <Badge className={`
                        rounded-full px-5 py-1.5 border-none font-bold uppercase text-[10px] shadow-sm
                        ${user.role === 'admin' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}
                      `}>
                        <Shield size={10} className="mr-2 inline" />
                        {user.role || 'user'}
                      </Badge>
                    </td>
                    <td className="px-10 py-6">
                      <div className="min-w-[140px]">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <p className="font-bold text-slate-900">Level {Math.floor((user.xp || 0) / 100) + 1}</p>
                          <span className="text-[10px] font-bold text-primary">{user.xp || 0} XP</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ width: `${Math.min(100, (user.xp || 0) % 100)}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                          <MapIcon size={18} />
                        </div>
                        <span className="font-bold text-slate-700">{user.savedCareers?.length || 0} Saved</span>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3 font-bold text-sm text-emerald-500">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        Active
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="rounded-2xl text-slate-400 hover:bg-white hover:text-primary hover:shadow-md transition-all">
                          <History size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-2xl text-slate-400 hover:bg-white hover:text-slate-900 transition-all">
                          <MoreHorizontal size={20} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
