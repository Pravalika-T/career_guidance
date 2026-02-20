
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
  MapIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
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

const chartData = [
  { name: 'Mon', users: 400, recommendations: 240 },
  { name: 'Tue', users: 300, recommendations: 139 },
  { name: 'Wed', users: 200, recommendations: 980 },
  { name: 'Thu', users: 278, recommendations: 390 },
  { name: 'Fri', users: 189, recommendations: 480 },
  { name: 'Sat', users: 239, recommendations: 380 },
  { name: 'Sun', users: 349, recommendations: 430 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-500">Real-time health and engagement metrics for CareerCraft 3D.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', val: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12%', up: true },
          { label: 'Active Careers', val: '48', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+2', up: true },
          { label: 'Avg. Match XP', val: '450', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100', trend: '+5%', up: true },
          { label: 'Saved Maps', val: '942', icon: MapIcon, color: 'text-purple-600', bg: 'bg-purple-100', trend: '-2%', up: false },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                  <stat.icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.val}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">User Engagement Trends</CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-full">Users</Badge>
                <Badge variant="default" className="rounded-full">Recs</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#4CAF50" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="users" stroke="#4CAF50" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                  <Area type="monotone" dataKey="recommendations" stroke="#7C3AED" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
          <CardHeader className="p-8">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="space-y-6">
              {[
                { user: 'Rahul S.', action: 'Saved path', target: 'UX Designer', time: '2m ago', icon: MapIcon, bg: 'bg-purple-100', color: 'text-purple-600' },
                { user: 'Priya K.', action: 'Unlocked badge', target: 'Reality Aware', time: '15m ago', icon: Sparkles, bg: 'bg-amber-100', color: 'text-amber-600' },
                { user: 'Arun V.', action: 'Completed sim', target: 'Doctor', time: '45m ago', icon: Zap, bg: 'bg-emerald-100', color: 'text-emerald-600' },
                { user: 'System', action: 'Sync complete', target: 'Global XP', time: '1h ago', icon: TrendingUp, bg: 'bg-blue-100', color: 'text-blue-600' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full ${activity.bg} ${activity.color} flex items-center justify-center shrink-0`}>
                    <activity.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {activity.user} <span className="font-normal text-slate-500">{activity.action}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{activity.target} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-8 rounded-xl font-bold text-slate-500">View Full Audit Log</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
