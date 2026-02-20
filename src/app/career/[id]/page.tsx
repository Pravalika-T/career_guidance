
"use client";

import { use } from 'react';
import { motion } from 'framer-motion';
import { CAREER_PATHS } from '@/lib/career-data';
import { PathExplorer } from '@/components/career/PathExplorer';
import { UserStats } from '@/components/gamification/UserStats';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wallet, BrainCircuit, Target, Shield, Video, Sparkles } from 'lucide-react';
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
                <Shield className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">Failure-Safe Route Active</span>
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
              { icon: Target, label: "Starting Goal", val: career.primaryExam.name, color: "bg-accent" },
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
              <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
              <p className="text-white/80 mb-6">Unlock all routes and start earning the "Resilient Thinker" badge today.</p>
              <Button className="w-full h-12 bg-white text-accent hover:bg-white/90 rounded-2xl font-bold">
                Join Path Journey
              </Button>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          </motion.div>
        </div>

        {/* The 3-Stage Failure-Safe Roadmap */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">The Multi-Route Roadmap</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've mapped every way you can reach your goal. One exam is just one door — if it doesn't open, we'll show you three more.
            </p>
          </div>
          <PathExplorer career={career} />
        </div>

        {/* Immersive Experience Section */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Video className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-headline font-bold">360° Virtual Career Experience</h2>
            </div>
            <Badge variant="outline" className="hidden md:flex items-center gap-1 border-primary/30 text-primary bg-primary/5 px-3 py-1">
              <Sparkles className="w-3 h-3" />
              Immersive Mode
            </Badge>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-primary/5 rounded-[48px] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white p-4 rounded-[40px] shadow-2xl border border-primary/5 overflow-hidden">
              {career.virtualExperienceUrl ? (
                <div className="aspect-video w-full relative rounded-[28px] overflow-hidden bg-black shadow-inner">
                  <iframe
                    src={career.virtualExperienceUrl}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={`${career.name} 360 Experience`}
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video w-full flex flex-col items-center justify-center bg-muted/30 rounded-[28px] border-2 border-dashed border-muted-foreground/20">
                  <Video className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-xl font-bold text-muted-foreground">Virtual experience coming soon</p>
                  <p className="text-muted-foreground mt-2">Our team is capturing this workspace for you.</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <p className="text-sm font-medium">Drag or move your phone to explore the workplace</p>
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                Experience powered by CareerCraft VR
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
