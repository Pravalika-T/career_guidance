
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { School, GraduationCap, Briefcase, ChevronRight, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const STAGES = [
  {
    id: 'school',
    title: 'Schooling Foundations',
    icon: School,
    color: 'bg-primary',
    description: 'Focus on core subjects like Mathematics, Physics, and Logic. Participate in relevant clubs.',
    milestones: ['Science Projects', 'Programming Club', 'Advanced Math']
  },
  {
    id: 'college',
    title: 'Academic Specialization',
    icon: GraduationCap,
    color: 'bg-accent',
    description: 'Earn a relevant Bachelor degree. Engage in internships and research projects.',
    milestones: ['Degree in CS/Math', 'Internships', 'Portfolio Building']
  },
  {
    id: 'job',
    title: 'Professional Entry',
    icon: Briefcase,
    color: 'bg-purple-600',
    description: 'Land your first role. Continue learning specialized tools and networking.',
    milestones: ['Junior Roles', 'Certifications', 'Industry Networking']
  }
];

export function CareerRoadmap({ careerId }: { careerId: string }) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 hidden md:block" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STAGES.map((stage, index) => {
            const Icon = stage.icon;
            const isActive = activeStage === index;
            const isCompleted = activeStage > index;

            return (
              <div key={stage.id} className="flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveStage(index)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center z-10 transition-colors duration-500 shadow-xl ${
                    isActive ? stage.color : isCompleted ? 'bg-primary' : 'bg-white'
                  } ${!isActive && !isCompleted ? 'border-2 border-dashed border-muted' : ''}`}
                >
                  <Icon className={`w-8 h-8 ${isActive || isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
                </motion.button>
                <h3 className="mt-4 font-headline font-semibold text-center">{stage.title}</h3>
                <div className="md:hidden w-1 h-8 bg-muted my-2" />
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-12"
        >
          <Card className="border-none shadow-2xl bg-white/60 backdrop-blur-xl overflow-hidden rounded-3xl">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${STAGES[activeStage].color} text-white`}>
                  <Info className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-4">{STAGES[activeStage].title}</h4>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {STAGES[activeStage].description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {STAGES[activeStage].milestones.map((milestone) => (
                      <div
                        key={milestone}
                        className="px-4 py-2 bg-secondary text-primary rounded-full text-sm font-medium border border-primary/10"
                      >
                        {milestone}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-8 gap-4">
        <button
          disabled={activeStage === 0}
          onClick={() => setActiveStage(prev => prev - 1)}
          className="p-3 rounded-full bg-white shadow-md disabled:opacity-50 hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <button
          disabled={activeStage === STAGES.length - 1}
          onClick={() => setActiveStage(prev => prev + 1)}
          className="p-3 rounded-full bg-white shadow-md disabled:opacity-50 hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
