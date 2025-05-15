import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, RotateCcw, ZoomIn, CropIcon, Wand2,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CropScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export function CropScreen({ onBack, onContinue }: CropScreenProps) {
  const [zoom, setZoom] = useState([1]);
  const [rotation, setRotation] = useState(0);
  const [autoDetectEnabled, setAutoDetectEnabled] = useState(true);
  
  // This would be dynamic in a real app based on document detection
  const initialCropPoints = [
    { x: 20, y: 20 }, // top-left
    { x: 80, y: 20 }, // top-right
    { x: 80, y: 80 }, // bottom-right
    { x: 20, y: 80 }, // bottom-left
  ];
  
  const [cropPoints, setCropPoints] = useState(initialCropPoints);
  
  const handleReset = () => {
    setZoom([1]);
    setRotation(0);
    setCropPoints(initialCropPoints);
  };
  
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };
  
  const handleAutoDetect = () => {
    setAutoDetectEnabled(!autoDetectEnabled);
    // In a real app, this would trigger document edge detection
  };
  
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-4 glass-panel border-b">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <h2 className="font-semibold">Adjust Crop</h2>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleReset}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Image Preview with crop handles */}
      <div className="flex-1 relative flex items-center justify-center bg-black/5 dark:bg-black/20 p-6">
        <div 
          className={cn(
            "relative max-w-full max-h-full overflow-hidden",
            autoDetectEnabled ? "border-2 border-primary" : "border-2 border-dashed border-muted"
          )}
          style={{ 
            transform: `rotate(${rotation}deg) scale(${zoom})`,
            transition: 'transform 0.3s ease-out',
            aspectRatio: '3/4',
            width: '85%'
          }}
        >
          {/* The scanned document image */}
          <img
            src="https://images.unsplash.com/photo-1599934448058-524bb5e91986?q=80&w=1000&auto=format&fit=crop"
            alt="Document to crop"
            className="w-full h-full object-cover"
          />
          
          {/* Crop corner handles - in real app these would be draggable */}
          {!autoDetectEnabled && cropPoints.map((point, index) => (
            <div
              key={index}
              className="absolute w-6 h-6 bg-primary rounded-full border-2 border-white cursor-move flex items-center justify-center"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          ))}
        </div>
        
        {/* Auto-Detect Toggle */}
        <Button
          variant={autoDetectEnabled ? "default" : "outline"}
          size="sm"
          className="absolute top-4 right-4"
          onClick={handleAutoDetect}
        >
          <Wand2 className="h-4 w-4 mr-2" />
          Auto
        </Button>
      </div>
      
      {/* Controls */}
      <div className="glass-panel p-4 space-y-4 border-t">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium flex items-center">
              <ZoomIn className="h-4 w-4 mr-1" />
              Zoom
            </div>
            <div className="text-sm text-muted-foreground">
              {Math.round(zoom[0] * 100)}%
            </div>
          </div>
          <Slider
            value={zoom}
            min={0.5}
            max={2}
            step={0.01}
            onValueChange={setZoom}
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleRotate}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Rotate
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleAutoDetect}
          >
            <CropIcon className="h-4 w-4 mr-2" />
            {autoDetectEnabled ? 'Manual Crop' : 'Auto Crop'}
          </Button>
        </div>
        
        <Button 
          className="w-full py-6"
          onClick={onContinue}
        >
          <Check className="h-5 w-5 mr-2" />
          Apply Crop
        </Button>
      </div>
    </div>
  );
}

export default CropScreen;