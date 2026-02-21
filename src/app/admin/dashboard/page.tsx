
'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Sparkles,
  MapIcon,
  Loader2
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useMemo } from 'react';
import { CAREER_PATHS } from '@/lib/career-data';

const chartData = [
  { name: 'Mon', users: 400, recommendations: 240 },
  { name: 'Tue', users: 300, recommendations: 139 },
  { name: 'Wed', users: 600, recommendations: 980 },
  { name: 'Thu', users: 800, recommendations: 390 },
  { name: 'Fri', users: 1000, recommendations: 480 },
  { name: 'Sat', users: 1200, recommendations: 380 },
  { name: 'Sun', users: 1284, recommendations: 430 },
];

export default function AdminDashboardPage() {
  const db = useFirestore();
  const { data: users, loading } = useCollection(query(collection(db, 'users'), orderBy('lastActive', 'desc')));
  
  const stats = useMemo(() => {
    if (!users) return { total: 0, avgXp: 0, savedPaths: 0 };
    const total = users.length;
    const totalXp = users.reduce((acc, u) => acc + (u.xp || 0), 0);
    const savedPaths = users.reduce((acc, u) => acc + (u.savedCareers?.length || 0), 0);
    return {
      total,
      avgXp: total > 0 ? Math.floor(totalXp / total) : 0,
      savedPaths
    };
  }, [users]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">System Command</h1>
          <p className="text-slate-500 font-medium">Real-time engagement metrics for CareerCraft 3D.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl flex items-center gap-2 border border-emerald-100 shadow-sm animate-pulse">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-widest">Live System Feed</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Explorers', val: loading ? '...' : stats.total.toLocaleString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12%', up: true },
          { label: 'Library Size', val: CAREER_PATHS.length.toString(), icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+4', up: true },
          { label: 'Avg. Player XP', val: loading ? '...' : stats.avgXp.toLocaleString(), icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100', trend: '+5%', up: true },
          { label: 'Active Career Maps', val: loading ? '...' : stats.savedPaths.toLocaleString(), icon: MapIcon, color: 'text-purple-600', bg: 'bg-purple-100', trend: '+8%', up: true },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[32px] overflow-hidden group hover:shadow-xl transition-all duration-500 bg-white">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 shadow-sm`}>
                  <stat.icon size={28} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              <h3 className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">{stat.val}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-[40px] overflow-hidden bg-white">
          <CardHeader className="p-10 pb-0">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900">Engagement Trends</CardTitle>
                <p className="text-slate-400 text-sm mt-1">Growth trajectories across discovery layers.</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-full px-4 border-slate-200">Active Users</Badge>
                <Badge variant="default" className="rounded-full px-4 bg-slate-900">Map Saves</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-8">
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#4CAF50" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={4} />
                  <Area type="monotone" dataKey="recommendations" stroke="#7C3AED" fillOpacity={0} strokeWidth={2} strokeDasharray="6 6" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-none shadow-sm rounded-[40px] overflow-hidden bg-white">
          <CardHeader className="p-10 pb-4">
            <CardTitle className="text-2xl font-bold flex items-center gap-3 text-slate-900">
              <Clock className="w-6 h-6 text-primary" />
              Live Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="px-10 pb-10">
            <div className="space-y-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
                  <Loader2 className="animate-spin" />
                  <p className="font-bold text-xs uppercase tracking-widest">Streaming Feed...</p>
                </div>
              ) : users.slice(0, 5).map((activity, i) => (
                <div key={i} className="flex gap-5 group cursor-default">
                  <div className={`w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-sm`}>
                    {activity.xp > 500 ? <Trophy className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {activity.displayName || 'Explorer'} <span className="font-medium text-slate-400">logged a session</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                      <Zap size={10} className="text-amber-500 fill-amber-500" />
                      Lvl {Math.floor((activity.xp || 0) / 100) + 1} • {activity.xp || 0} XP
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-10 h-12 rounded-2xl font-bold text-slate-500 border-slate-100 hover:bg-slate-50">
              Full System Audit Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Trophy({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 22V18" />
      <path d="M14 22V18" />
      <path d="M18 4H6v7a6 6 0 0 0 12 0V4Z" />
    </svg>
  );
}
