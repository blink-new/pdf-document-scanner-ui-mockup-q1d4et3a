import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { APP_NAME, PREMIUM_FEATURES, SUBSCRIPTION_PLANS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaywallScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function PaywallScreen({ onComplete, onSkip }: PaywallScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState(SUBSCRIPTION_PLANS[1].id);
  
  return (
    <div className="h-full flex flex-col">
      {/* Header with close button */}
      <div className="flex justify-end p-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full"
          onClick={onSkip}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 px-6 pb-6 overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {APP_NAME} Premium
          </h1>
          <p className="text-foreground/70">
            Unlock all features and scan without limits
          </p>
        </div>
        
        {/* Subscription Plans */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <motion.div 
              key={plan.id}
              className={cn(
                "glass-panel rounded-xl p-4 text-center cursor-pointer relative overflow-hidden",
                selectedPlan === plan.id ? "border-primary ring-2 ring-primary/20" : "border-border/50"
              )}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground py-1 px-2 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              
              <h3 className="font-semibold mt-2">{plan.name}</h3>
              
              <div className="my-2">
                <span className="text-xl font-bold">{plan.price}</span>
                <span className="text-xs text-foreground/70">/{plan.period}</span>
              </div>
              
              {plan.discount && (
                <div className="text-xs bg-success/20 text-success font-medium py-1 px-2 rounded-full inline-block">
                  {plan.discount}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Features */}
        <div className="glass-panel rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Premium Features</h3>
          
          <div className="space-y-3">
            {PREMIUM_FEATURES.map((feature, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Small Prints */}
        <p className="text-xs text-center text-foreground/50 mb-6">
          Subscription automatically renews unless canceled at least 24 hours before the end of the current period. 
          You can manage your subscription in your account settings.
        </p>
        
        {/* Buttons */}
        <Button 
          onClick={onComplete}
          className="w-full py-6 mb-3 rounded-xl font-semibold text-base shadow-lg"
          size="lg"
        >
          Continue with {selectedPlan === 'monthly' ? 'Monthly' : 'Annual'} Plan
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onSkip}
          className="w-full rounded-xl text-foreground/70"
        >
          Continue with Limited Version
        </Button>
      </div>
    </div>
  );
}

export default PaywallScreen;