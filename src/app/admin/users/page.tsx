
'use client';

import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  Shield, 
  UserCheck, 
  UserX,
  History,
  Download
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useCollection, useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';

export default function UserManagementPage() {
  const db = useFirestore();
  const { data: users, loading } = useCollection(collection(db, 'users'));

  // Fallback demo data if firestore is empty
  const demoUsers = [
    { uid: '1', displayName: 'Rahul Sharma', email: 'rahul@example.com', role: 'admin', level: 12, xp: 1250, status: 'active' },
    { uid: '2', displayName: 'Priya Kapoor', email: 'priya@example.com', role: 'user', level: 8, xp: 840, status: 'active' },
    { uid: '3', displayName: 'Arun Verma', email: 'arun@example.com', role: 'moderator', level: 5, xp: 510, status: 'suspended' },
    { uid: '4', displayName: 'Sonia Das', email: 'sonia@example.com', role: 'user', level: 1, xp: 50, status: 'active' },
  ];

  const displayUsers = users.length > 0 ? users : demoUsers;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">User Directory</h1>
          <p className="text-slate-500">Manage user accounts, roles, and system permissions.</p>
        </div>
        <Button className="h-12 px-8 rounded-full bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 font-bold shadow-sm">
          <Download className="w-5 h-5 mr-2" />
          Export Data
        </Button>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search by name, email or UID..." 
            className="pl-10 h-12 bg-slate-50 border-none rounded-2xl"
          />
        </div>
        <Button variant="outline" className="h-12 rounded-2xl px-6 font-bold border-slate-200 text-slate-600">
          <Filter className="w-4 h-4 mr-2" />
          Filter Roles
        </Button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Gamification</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayUsers.map((user, i) => (
                <tr key={user.uid} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                        <AvatarImage src={user.photoURL || ''} />
                        <AvatarFallback className="bg-slate-100 text-slate-500 font-bold">
                          {user.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-slate-900">{user.displayName || 'Anonymous User'}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail size={12} /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <Badge className={`
                      rounded-full px-4 py-1 border-none font-bold uppercase text-[10px]
                      ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}
                    `}>
                      <Shield size={10} className="mr-1 inline" />
                      {user.role || 'user'}
                    </Badge>
                  </td>
                  <td className="px-8 py-5">
                    <div>
                      <p className="font-bold text-slate-900">Level {user.level || 1}</p>
                      <p className="text-xs text-slate-400">{user.xp || 0} Total XP</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`flex items-center gap-2 font-bold text-sm ${user.status === 'suspended' ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {user.status === 'suspended' ? <UserX size={16} /> : <UserCheck size={16} />}
                      {user.status === 'suspended' ? 'Suspended' : 'Active'}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:bg-white hover:shadow-sm">
                        <History size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-xl text-slate-400">
                        <MoreHorizontal size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
