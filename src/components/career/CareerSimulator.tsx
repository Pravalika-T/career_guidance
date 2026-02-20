
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CareerPath, SimulationScenario } from '@/lib/career-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Sparkles, 
  Gamepad2, 
  CheckCircle2, 
  ArrowRight, 
  Trophy,
  MessageCircle
} from 'lucide-react';

interface CareerSimulatorProps {
  career: CareerPath;
  onClose: () => void;
}

export function CareerSimulator({ career, onClose }: CareerSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const scenarios = career.simulation && career.simulation.length > 0 
    ? career.simulation 
    : [
        {
          id: 'generic-1',
          task: `You are starting your first day as a ${career.name}. A colleague asks for your help with a complex project. What do you do?`,
          options: [
            { label: "Help them", description: "Collaborate and share your knowledge.", isCorrect: true, feedback: "Teamwork makes the dream work! You've built a strong connection." },
            { label: "Focus on your own task", description: "You have your own deadlines to meet.", isCorrect: false, feedback: "While focus is good, helping others is a key professional skill." }
          ]
        }
      ] as SimulationScenario[];

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (scenarios[currentStep].options[index].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextStep = () => {
    if (currentStep < scenarios.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      const currentXp = parseInt(localStorage.getItem('career_craft_xp') || '0');
      localStorage.setItem('career_craft_xp', (currentXp + 100).toString());
      window.dispatchEvent(new Event('storage'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-background/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
    >
      <div className="max-w-2xl w-full relative">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="absolute -top-16 right-0 text-foreground hover:bg-muted/50 rounded-full"
        >
          <X className="w-8 h-8" />
        </Button>

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="sim-content"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="text-center mb-8">
                <Badge className="bg-primary/10 text-primary border-none mb-4 px-4 py-1 rounded-full">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  DAY IN THE LIFE SIMULATOR
                </Badge>
                <h2 className="text-3xl font-bold font-headline">Life as a {career.name}</h2>
                <div className="flex justify-center gap-1 mt-4">
                  {scenarios.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
                        i === currentStep ? 'bg-primary w-12' : i < currentStep ? 'bg-primary/40' : 'bg-muted'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              <Card className="rounded-[40px] border-none shadow-2xl bg-white overflow-hidden">
                <CardHeader className="bg-primary/5 pb-8 pt-10 px-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl leading-relaxed">
                      {scenarios[currentStep].task}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-10 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {scenarios[currentStep].options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = option.isCorrect;
                      
                      return (
                        <motion.button
                          key={idx}
                          whileHover={selectedOption === null ? { scale: 1.02 } : {}}
                          whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                          disabled={selectedOption !== null}
                          onClick={() => handleOptionSelect(idx)}
                          className={`text-left p-6 rounded-3xl transition-all duration-300 border-2 ${
                            selectedOption === null 
                              ? 'border-muted bg-white hover:border-primary/30 hover:bg-primary/5' 
                              : isSelected
                                ? isCorrect ? 'border-primary bg-primary/5' : 'border-destructive bg-destructive/5'
                                : option.isCorrect && selectedOption !== null
                                  ? 'border-primary/50 bg-primary/5'
                                  : 'border-muted opacity-50'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-lg">{option.label}</span>
                            {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-primary" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </motion.button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {selectedOption !== null && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`mt-6 p-6 rounded-3xl ${
                          scenarios[currentStep].options[selectedOption].isCorrect 
                            ? 'bg-primary/10 text-primary' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="font-medium">
                          {scenarios[currentStep].options[selectedOption].feedback}
                        </p>
                        <Button 
                          onClick={nextStep} 
                          className="mt-4 w-full rounded-2xl h-12 bg-primary hover:bg-primary/90 text-white font-bold"
                        >
                          {currentStep === scenarios.length - 1 ? 'Finish Simulation' : 'Next Scenario'}
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="sim-complete"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center bg-white p-12 rounded-[56px] shadow-2xl"
            >
              <div className="w-24 h-24 rounded-[32px] bg-yellow-400 text-white flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Trophy className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-headline font-bold mb-4">Simulation Complete!</h2>
              <p className="text-xl text-muted-foreground mb-12">
                You've successfully completed the {career.name} challenge. 
                You scored <span className="text-primary font-bold">{score} / {scenarios.length}</span>.
              </p>
              
              <div className="bg-primary/5 p-8 rounded-[40px] mb-12 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-1">Rewards Earned</p>
                  <p className="text-2xl font-bold text-primary">+100 Experience Points</p>
                  <p className="text-sm font-medium text-muted-foreground mt-1">Badge: Path Explorer Unlocked</p>
                </div>
                <div className="p-4 rounded-full bg-primary/20">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </div>

              <Button 
                onClick={onClose} 
                className="w-full h-16 rounded-3xl bg-primary hover:bg-primary/90 text-xl font-bold shadow-xl shadow-primary/20"
              >
                Return to Roadmap
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
