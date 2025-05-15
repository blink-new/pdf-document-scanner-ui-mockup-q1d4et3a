import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { APP_NAME, ONBOARDING_STEPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ArrowRight, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Logo and Skip */}
      <div className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {APP_NAME}
        </div>
        
        {currentStep < ONBOARDING_STEPS.length - 1 && (
          <Button 
            variant="ghost" 
            className="text-sm text-foreground/70"
            onClick={onComplete}
          >
            Skip
          </Button>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-64 h-64 mb-10 overflow-hidden rounded-3xl glass-panel p-1">
              <img 
                src={ONBOARDING_STEPS[currentStep].image} 
                alt={ONBOARDING_STEPS[currentStep].title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-3">
              {ONBOARDING_STEPS[currentStep].title}
            </h2>
            
            <p className="text-center text-foreground/70 mb-8 max-w-xs">
              {ONBOARDING_STEPS[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Progress Indicators */}
      <div className="flex justify-center items-center space-x-2 mb-6">
        {ONBOARDING_STEPS.map((_, idx) => (
          <div 
            key={idx}
            className={cn(
              "h-2 rounded-full transition-all duration-300 ease-out",
              currentStep === idx ? "w-12 bg-primary" : "w-2 bg-muted"
            )}
          />
        ))}
      </div>
      
      {/* Button */}
      <div className="p-6">
        <Button 
          onClick={handleNext}
          className="w-full py-6 rounded-xl font-semibold text-base shadow-lg"
          size="lg"
        >
          {currentStep === ONBOARDING_STEPS.length - 1 ? (
            <span className="flex items-center">
              Get Started <CheckCheck className="ml-2 h-5 w-5" />
            </span>
          ) : (
            <span className="flex items-center">
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default OnboardingScreen;