import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Camera, ChevronLeft, Zap, FlipHorizontal2, Folder, 
  Image, Settings, X 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ScanScreenProps {
  onBack: () => void;
  onCapture: () => void;
}

export function ScanScreen({ onBack, onCapture }: ScanScreenProps) {
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('auto');
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraView, setCameraView] = useState<'rear' | 'front'>('rear');
  
  const handleCapture = () => {
    setIsCapturing(true);
    
    // Simulate capture delay
    setTimeout(() => {
      setIsCapturing(false);
      onCapture();
    }, 500);
  };
  
  const getNextFlashMode = () => {
    const modes: Array<'off' | 'on' | 'auto'> = ['off', 'on', 'auto'];
    const currentIndex = modes.indexOf(flashMode);
    return modes[(currentIndex + 1) % modes.length];
  };
  
  return (
    <div className="h-full flex flex-col bg-black">
      {/* Camera View */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Mock camera view - in a real app this would be a camera component */}
        <div className="absolute inset-0 bg-black">
          <img
            src="https://images.unsplash.com/photo-1599934448058-524bb5e91986?q=80&w=1000&auto=format&fit=crop"
            alt="Camera viewfinder"
            className="w-full h-full object-cover opacity-90"
          />
          
          {/* Document overlay guide */}
          <div className="absolute inset-12 border-2 border-white/70 rounded-md">
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white transform translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white transform -translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white transform translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white transform -translate-x-1 translate-y-1"></div>
          </div>
        </div>
        
        {/* Flash/White screen effect when capturing */}
        {isCapturing && (
          <div className="absolute inset-0 bg-white animate-flash"></div>
        )}
        
        {/* Document detection outline - This would be dynamic in a real app */}
        <div className="absolute inset-20 border-2 border-primary rounded-md"></div>
        
        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white rounded-full bg-black/30 backdrop-blur-sm"
            onClick={onBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white rounded-full bg-black/30 backdrop-blur-sm"
              onClick={() => setFlashMode(getNextFlashMode())}
            >
              <Zap className={cn(
                "h-5 w-5",
                flashMode === 'off' && "opacity-50"
              )} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white rounded-full bg-black/30 backdrop-blur-sm"
              onClick={() => setCameraView(cameraView === 'rear' ? 'front' : 'rear')}
            >
              <FlipHorizontal2 className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white rounded-full bg-black/30 backdrop-blur-sm"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Tip text */}
        <div className="absolute top-1/4 left-0 right-0 flex justify-center">
          <div className="bg-black/50 text-white text-sm py-1 px-3 rounded-full backdrop-blur-sm">
            Position document in frame
          </div>
        </div>
      </div>
      
      {/* Bottom controls */}
      <div className="bg-black px-6 py-8">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center h-14 w-14 rounded-full"
          >
            <div className="h-12 w-12 rounded-md overflow-hidden border border-white/20">
              <Image className="h-6 w-6 mx-auto mt-2 text-white/70" />
            </div>
          </Button>
          
          {/* Capture button */}
          <motion.button
            className="h-16 w-16 rounded-full flex items-center justify-center"
            onClick={handleCapture}
            whileTap={{ scale: 0.9 }}
          >
            <div className="h-14 w-14 rounded-full border-4 border-white flex items-center justify-center">
              <div className="h-12 w-12 bg-white rounded-full"></div>
            </div>
          </motion.button>
          
          <Button 
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center h-14 w-14 rounded-full"
          >
            <div className="h-12 w-12 rounded-md overflow-hidden border border-white/20">
              <Folder className="h-6 w-6 mx-auto mt-2 text-white/70" />
            </div>
          </Button>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="bg-white/10 rounded-full py-1 px-4 text-white text-sm">
            Tap for single scan · Hold for batch
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanScreen;