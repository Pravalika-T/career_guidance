
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerPath } from '@/lib/career-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Milestone, 
  Map as MapIcon, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight,
  Info
} from 'lucide-react';

interface PathExplorerProps {
  career: CareerPath;
}

type Step = 'primary' | 'alternative' | 'backup';

export function PathExplorer({ career }: PathExplorerProps) {
  const [activeStep, setActiveStep] = useState<Step>('primary');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 perspective-1000">
      {/* Navigation Tabs - Branching Visual */}
      <div className="flex justify-center mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full" />
        <div className="flex gap-4 sm:gap-12 relative z-10">
          {[
            { id: 'primary', label: 'Primary Path', icon: Milestone, color: 'bg-primary' },
            { id: 'alternative', label: 'Other Ways', icon: MapIcon, color: 'bg-accent' },
            { id: 'backup', label: 'Safety Routes', icon: ShieldCheck, color: 'bg-blue-500' }
          ].map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <motion.button
                key={step.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveStep(step.id as Step)}
                className={`flex flex-col items-center gap-2 group`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
                  isActive ? step.color + ' text-white scale-110' : 'bg-white text-muted-foreground'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, rotateX: 10, y: 30 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: -10, y: -30 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="min-h-[400px]"
        >
          {activeStep === 'primary' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <Badge className="bg-primary/20 text-primary border-none px-4 py-1 rounded-full text-sm font-bold">
                  RECOMMENDED PATH
                </Badge>
                <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                  Your Main Gateway: <span className="text-primary">{career.primaryExam.name}</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {career.primaryExam.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary/10">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Frequency</p>
                    <p className="text-lg font-bold">{career.primaryExam.frequency}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-primary/10">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Eligibility</p>
                    <p className="text-lg font-bold">{career.primaryExam.eligibility}</p>
                  </div>
                </div>
                <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold">
                  View Preparation Guide
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white p-8 rounded-[40px] shadow-2xl relative border border-primary/10"
                >
                  <Sparkles className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Why this path?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Widely recognized standard
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Highest scholarship potential
                    </li>
                    <li className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Direct entry to top-tier labs
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          )}

          {activeStep === 'alternative' && (
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-headline font-bold mb-4">Different Way, Same Goal</h2>
                <p className="text-muted-foreground text-lg">
                  Didn't go as planned? No worries — these are equally valid routes to your career in {career.name}.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {career.alternativeExams.map((exam, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="rounded-[32px] overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all bg-white/60 backdrop-blur-md">
                      <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center mb-6">
                          <MapIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{exam.name}</h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {exam.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-sm font-bold text-accent">{exam.frequency}</span>
                          <Button variant="ghost" className="text-accent font-bold hover:bg-accent/10">
                            Explore Route
                            <ChevronRight className="ml-1 w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeStep === 'backup' && (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-bold mb-4">
                  <ShieldCheck className="w-4 h-4" />
                  RESILIENT THINKING UNLOCKED
                </div>
                <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Your Passion Still Matters</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Your interest in {career.domainId} is what truly defines your future. 
                  Even if the exams aren't the right fit, here is how you can still make a huge impact.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {career.backupCareers.map((backup, i) => (
                  <motion.div
                    key={backup.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full rounded-[32px] overflow-hidden border-none shadow-lg hover:shadow-xl transition-all bg-white border-l-8 border-l-blue-500">
                      <CardContent className="p-8 flex flex-col h-full">
                        <h3 className="text-xl font-bold mb-4">{backup.name}</h3>
                        <p className="text-muted-foreground text-sm flex-1 leading-relaxed italic">
                          " {backup.matchReason} "
                        </p>
                        <Button className="mt-8 w-full rounded-2xl h-12 bg-blue-500 hover:bg-blue-600 font-bold group">
                          View This Path
                          <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4 max-w-2xl mx-auto">
                <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1" />
                <p className="text-blue-800 font-medium">
                  <strong>Career Pro-Tip:</strong> Many professionals in {career.domainId} switch between these roles throughout their career. 
                  Starting here is just the beginning of your journey!
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
