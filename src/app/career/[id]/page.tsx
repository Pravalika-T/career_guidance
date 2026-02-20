
"use client";

import { use } from 'react';
import { motion } from 'framer-motion';
import { CAREER_PATHS } from '@/lib/career-data';
import { CareerRoadmap } from '@/components/career/Roadmap';
import { UserStats } from '@/components/gamification/UserStats';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, BrainCircuit, Target, Star } from 'lucide-react';
import Link from 'next/link';

export default function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const career = CAREER_PATHS.find(p => p.id === id) || CAREER_PATHS[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <UserStats />
      
      {/* Hero Header */}
      <div className="bg-primary pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/recommendations" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Recommendations
          </Link>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-none py-1 px-4 text-sm rounded-full">
                {career.domainId.toUpperCase()}
              </Badge>
              <div className="flex items-center text-yellow-300 gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">Trending</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-6">
              {career.name}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
              {career.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              { icon: Wallet, label: "Avg. Salary", val: career.salary, color: "bg-blue-500" },
              { icon: Target, label: "Eligibility", val: career.eligibility, color: "bg-accent" },
              { icon: BrainCircuit, label: "Key Skills", val: career.skills.join(', '), color: "bg-primary" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-xl border border-primary/5">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-lg font-bold leading-tight">{stat.val}</p>
              </div>
            ))}
          </motion.div>

          {/* Action Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-accent p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Ready to Commit?</h3>
              <p className="text-white/80 mb-6">Unlock the full step-by-step roadmap and start earning badges for this path.</p>
              <Button className="w-full h-12 bg-white text-accent hover:bg-white/90 rounded-2xl font-bold">
                Join Path Journey
              </Button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          </motion.div>
        </div>

        {/* The 3-Stage Roadmap */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-headline font-bold mb-4">Interactive Path Roadmap</h2>
            <p className="text-muted-foreground text-lg">Click on each stage to reveal the milestones you'll need to reach.</p>
          </div>
          <CareerRoadmap careerId={id} />
        </div>
      </div>
    </div>
  );
}
