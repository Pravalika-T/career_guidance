
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { PrepGuideData } from '@/lib/career-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  BookOpen, 
  Target, 
  Lightbulb, 
  ChevronRight, 
  Sparkles,
  Library,
  Milestone
} from 'lucide-react';

interface PrepGuideProps {
  examName: string;
  guide: PrepGuideData;
  onClose: () => void;
}

export function PrepGuide({ examName, guide, onClose }: PrepGuideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
    >
      <div className="max-w-4xl w-full relative h-[90vh] flex flex-col">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="absolute -top-16 right-0 text-foreground hover:bg-muted/50 rounded-full"
        >
          <X className="w-8 h-8" />
        </Button>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8 pb-20">
          {/* Header */}
          <div className="text-center space-y-4 pt-4">
            <Badge className="bg-primary/10 text-primary border-none px-6 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">
              Preparation Roadmap
            </Badge>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">{examName} Basics</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your step-by-step strategy to conquer the entrance and unlock your future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Subject Breakdown */}
            <Card className="md:col-span-1 rounded-[40px] border-none shadow-xl bg-white/50 backdrop-blur-xl h-fit">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">Focus Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {guide.subjects.map((sub, i) => (
                  <div key={i} className="p-4 rounded-3xl bg-white shadow-sm border border-muted/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{sub.name}</span>
                      <span className="text-xs font-bold text-primary">{sub.weightage}</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: sub.weightage }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Milestones */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Milestone className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold">Preparation Milestones</h3>
              </div>
              <div className="space-y-4">
                {guide.milestones.map((ms, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 z-10 shadow-lg shadow-primary/20">
                        {i + 1}
                      </div>
                      {i < guide.milestones.length - 1 && (
                        <div className="w-0.5 flex-1 bg-primary/20 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{ms.title}</h4>
                        <Badge variant="secondary" className="w-fit bg-primary/5 text-primary border-none">
                          {ms.period}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {ms.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Resources & Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-[40px] border-none shadow-xl bg-accent/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Library className="w-5 h-5 text-accent" />
                  Recommended Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {guide.resources.map((res, i) => (
                  <Badge key={i} variant="outline" className="px-4 py-2 rounded-2xl bg-white/50 border-accent/20 text-accent font-medium">
                    {res}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[40px] border-none shadow-xl bg-primary/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Pro Tip for Resilience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic leading-relaxed">
                  "Consistent daily progress beats last-minute intensity. If a mock test goes poorly, treat it as data, not a defeat. You are building the skills for a lifetime, not just for a day."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <Button 
            onClick={onClose}
            className="rounded-full h-14 px-12 bg-primary text-white font-bold text-lg shadow-2xl hover:scale-105 transition-transform"
          >
            I'm Ready to Start
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
