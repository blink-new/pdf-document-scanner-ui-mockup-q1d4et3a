import React from 'react';
import MobileFrame from './MobileFrame';
import OnboardingScreen from '../screens/OnboardingScreen';
import PaywallScreen from '../screens/PaywallScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import CropScreen from '../screens/CropScreen';
import FilterScreen from '../screens/FilterScreen';
import { File } from '../lib/constants';

// Mock handlers that do nothing since we're just displaying screens
const mockHandlers = {
  onComplete: () => {},
  onSkip: () => {},
  onScan: () => {},
  onSelectFile: (file: File) => {},
  onBack: () => {},
  onCapture: () => {},
  onContinue: () => {},
  onSave: () => {},
};

interface ScreenFrameProps {
  title: string;
  children: React.ReactNode;
}

function ScreenFrame({ title, children }: ScreenFrameProps) {
  return (
    <div className="flex flex-col items-center group">
      <div className="scale-[0.55] origin-top mb-[-150px] transition-all duration-300 group-hover:scale-[0.58]">
        <div className="relative">
          {/* Figma-like selection outline that shows on hover */}
          <div className="absolute inset-[-8px] border-2 border-primary/60 rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <MobileFrame showStatusBar={true} showNotch={true}>
            {children}
          </MobileFrame>
        </div>
      </div>
      <div className="mt-2 font-medium text-lg text-foreground flex items-center">
        <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
        {title}
      </div>
    </div>
  );
}

function LayerPanel() {
  return (
    <div className="w-60 bg-background border-l border-border h-full p-3 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium text-sm">Layers</div>
        <div className="flex">
          <button className="text-xs bg-muted/40 px-2 py-1 rounded">+</button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="text-xs space-y-1.5">
          {/* Group folders */}
          <div className="flex items-center py-1 px-2 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="mr-1">▶</span> 
            <span className="text-muted-foreground">📁</span>
            <span className="ml-1 font-medium">UI Screens</span>
          </div>
          
          <div className="flex items-center py-1 px-2 pl-4 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="mr-1">▼</span> 
            <span className="text-muted-foreground">📁</span>
            <span className="ml-1 font-medium">Onboarding Flow</span>
          </div>
          
          <div className="flex items-center py-1 px-2 pl-8 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="text-muted-foreground">📱</span>
            <span className="ml-1">Onboarding</span>
          </div>
          
          <div className="flex items-center py-1 px-2 pl-8 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="text-muted-foreground">📱</span>
            <span className="ml-1">Paywall</span>
          </div>
          
          <div className="flex items-center py-1 px-2 pl-4 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="mr-1">▼</span> 
            <span className="text-muted-foreground">📁</span>
            <span className="ml-1 font-medium">Main App Flow</span>
          </div>
          
          <div className="flex items-center py-1 px-2 pl-8 hover:bg-muted/40 rounded-sm cursor-pointer bg-primary/10">
            <span className="text-muted-foreground">📱</span>
            <span className="ml-1">Home</span>
          </div>
          
          <div className="flex items-center py-1 px-2 pl-8 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="text-muted-foreground">📱</span>
            <span className="ml-1">Scan</span>
          </div>
          
          <div className="flex items-center py-1 px-2 pl-8 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="text-muted-foreground">📱</span>
            <span className="ml-1">Crop</span>
          </div>
          
          <div className="flex items-center py-1 px-2 pl-8 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="text-muted-foreground">📱</span>
            <span className="ml-1">Filter</span>
          </div>
          
          <div className="flex items-center py-1 px-2 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="mr-1">▶</span> 
            <span className="text-muted-foreground">📁</span>
            <span className="ml-1 font-medium">Components</span>
          </div>
          
          <div className="flex items-center py-1 px-2 hover:bg-muted/40 rounded-sm cursor-pointer">
            <span className="mr-1">▶</span> 
            <span className="text-muted-foreground">📁</span>
            <span className="ml-1 font-medium">Style Guide</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="text-muted-foreground">Properties</div>
          <button className="px-1 text-muted-foreground">+</button>
        </div>
      </div>
    </div>
  );
}

function DesignToolbar() {
  return (
    <div className="flex items-center justify-center mb-4 space-x-2">
      <div className="bg-background border border-border rounded-md shadow-sm flex">
        <button className="px-3 py-1.5 text-sm border-r border-border flex items-center text-muted-foreground">
          <span className="mr-1">🔍</span>
          <span>Select</span>
        </button>
        <button className="px-3 py-1.5 text-sm text-primary border-r border-border flex items-center">
          <span className="mr-1">✋</span>
          <span>Pan</span>
        </button>
        <button className="px-3 py-1.5 text-sm border-r border-border flex items-center text-muted-foreground">
          <span className="mr-1">📝</span>
          <span>Comment</span>
        </button>
      </div>
      
      <div className="bg-background border border-border rounded-md shadow-sm flex ml-2">
        <button className="px-3 py-1.5 text-sm border-r border-border flex items-center text-muted-foreground">
          <span>✏️</span>
        </button>
        <button className="px-3 py-1.5 text-sm border-r border-border flex items-center text-muted-foreground">
          <span>📦</span>
        </button>
        <button className="px-3 py-1.5 text-sm flex items-center text-muted-foreground">
          <span>🔠</span>
        </button>
      </div>
      
      <div className="bg-background border border-border rounded-md shadow-sm flex ml-2">
        <button className="px-3 py-1.5 text-sm border-r border-border flex items-center text-muted-foreground">
          <span>🏁</span>
        </button>
        <button className="px-3 py-1.5 text-sm flex items-center text-muted-foreground">
          <span>🔄</span>
        </button>
      </div>
    </div>
  );
}

export function Canvas() {
  return (
    <div className="w-full rounded-xl shadow-inner min-h-[800px] relative overflow-hidden flex flex-col">
      {/* Figma-like toolbar at the top */}
      <DesignToolbar />
      
      <div className="flex flex-1">
        <div className="flex-1 p-8 bg-muted/30 border border-border">
          {/* Figma-like background grid */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          ></div>
          
          <div className="relative z-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">PDF Document Scanner App - UI Screens</h2>
                <p className="text-sm text-muted-foreground">Complete mobile app user flow displayed in a Figma-like canvas</p>
              </div>
              
              {/* Figma-like zoom controls */}
              <div className="flex items-center bg-background border border-border rounded-md shadow-sm">
                <button className="px-2 py-1 text-sm border-r border-border">
                  100%
                </button>
                <button className="w-8 flex justify-center items-center py-1 text-muted-foreground">
                  +
                </button>
                <button className="w-8 flex justify-center items-center py-1 text-muted-foreground">
                  -
                </button>
              </div>
            </div>
            
            {/* User Flow Indicator */}
            <div className="mb-10 relative">
              <div className="absolute left-[calc(16.7%-40px)] right-[calc(16.7%-40px)] top-[60px] h-0.5 bg-primary/30"></div>
              <div className="absolute left-[calc(50%-40px)] right-[calc(50%-40px)] top-[60px] h-0.5 bg-primary/30"></div>
              <div className="absolute left-[calc(83.3%-40px)] right-[calc(83.3%-40px)] top-[60px] h-0.5 bg-primary/30"></div>
              
              {/* Arrow indicators */}
              <div className="absolute left-[calc(16.7%+80px)] top-[56px] border-t-2 border-r-2 border-primary/30 w-2 h-2 rotate-45"></div>
              <div className="absolute left-[calc(50%+80px)] top-[56px] border-t-2 border-r-2 border-primary/30 w-2 h-2 rotate-45"></div>
              <div className="absolute left-[calc(83.3%+80px)] top-[56px] border-t-2 border-r-2 border-primary/30 w-2 h-2 rotate-45"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
              <ScreenFrame title="Onboarding">
                <OnboardingScreen onComplete={mockHandlers.onComplete} />
              </ScreenFrame>
              
              <ScreenFrame title="Paywall">
                <PaywallScreen 
                  onComplete={mockHandlers.onComplete} 
                  onSkip={mockHandlers.onSkip} 
                />
              </ScreenFrame>
              
              <ScreenFrame title="Home">
                <HomeScreen 
                  onScan={mockHandlers.onScan}
                  onSelectFile={mockHandlers.onSelectFile}
                />
              </ScreenFrame>
              
              <ScreenFrame title="Scan">
                <ScanScreen 
                  onBack={mockHandlers.onBack} 
                  onCapture={mockHandlers.onCapture} 
                />
              </ScreenFrame>
              
              <ScreenFrame title="Crop">
                <CropScreen 
                  onBack={mockHandlers.onBack} 
                  onContinue={mockHandlers.onContinue} 
                />
              </ScreenFrame>
              
              <ScreenFrame title="Filter">
                <FilterScreen 
                  onBack={mockHandlers.onBack} 
                  onSave={mockHandlers.onSave} 
                />
              </ScreenFrame>
            </div>
          </div>
        </div>
        
        {/* Figma-like layer panel sidebar */}
        <LayerPanel />
      </div>
    </div>
  );
}

export default Canvas;