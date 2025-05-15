import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FILTER_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, Save, Eye, EyeOff, SlidersHorizontal,
  Contrast, Snowflake, Download, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface FilterScreenProps {
  onBack: () => void;
  onSave: () => void;
}

export function FilterScreen({ onBack, onSave }: FilterScreenProps) {
  const [activeFilter, setActiveFilter] = useState(FILTER_OPTIONS[0].id);
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // For demo, in real app this would be dynamic
  
  const filterStyle = {
    filter: `brightness(${brightness[0]}%) contrast(${contrast[0]}%)`,
  };
  
  const getFilterClass = (filterId: string) => {
    switch (filterId) {
      case 'original': return '';
      case 'enhanced': return 'brightness-110 contrast-110 saturate-105';
      case 'bw': return 'grayscale contrast-125 brightness-110';
      case 'grayscale': return 'grayscale';
      case 'color': return 'saturate-150 brightness-105';
      default: return '';
    }
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
        
        <h2 className="font-semibold">Adjust & Preview</h2>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Document Preview */}
      <div className="flex-1 bg-black/5 dark:bg-black/20 p-6 flex flex-col">
        <div className="bg-white dark:bg-white/5 rounded-lg p-1 mb-3 w-full max-w-[200px] mx-auto flex items-center justify-center text-sm">
          <Button 
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 text-center">
            Page {currentPage} of {totalPages}
          </div>
          
          <Button 
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="relative max-w-full max-h-full overflow-hidden rounded-lg shadow-md">
            {/* Original document */}
            {showPreview && (
              <div className="absolute inset-0 border-r border-white/50 z-10 overflow-hidden" style={{ width: '50%' }}>
                <img
                  src="https://images.unsplash.com/photo-1599934448058-524bb5e91986?q=80&w=1000&auto=format&fit=crop"
                  alt="Original document"
                  className="w-[200%] h-full object-cover"
                  style={{ position: 'absolute', left: 0, top: 0 }}
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs py-1 px-2 rounded-md backdrop-blur-sm">
                  Original
                </div>
              </div>
            )}
            
            {/* Filtered document */}
            <img
              src="https://images.unsplash.com/photo-1599934448058-524bb5e91986?q=80&w=1000&auto=format&fit=crop"
              alt="Filtered document"
              className={cn(
                "w-full h-full object-cover transition-filter duration-300",
                getFilterClass(activeFilter)
              )}
              style={filterStyle}
            />
            
            {showPreview && (
              <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs py-1 px-2 rounded-md backdrop-blur-sm">
                Filtered
              </div>
            )}
            
            {/* Divider */}
            {showPreview && (
              <div className="absolute top-0 bottom-0 w-px bg-white/80 left-1/2 transform -translate-x-1/2 z-20">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                  <div className="w-1 h-4 bg-black/60 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Filter Controls */}
      <div className="glass-panel p-4 border-t">
        <Tabs defaultValue="filters">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="filters" className="flex-1">
              Filters
            </TabsTrigger>
            <TabsTrigger value="adjustments" className="flex-1">
              Adjustments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="filters" className="mt-0">
            <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
              {FILTER_OPTIONS.map((filter) => (
                <motion.div
                  key={filter.id}
                  className={cn(
                    "flex-shrink-0 cursor-pointer rounded-lg overflow-hidden transition-all",
                    activeFilter === filter.id ? "ring-2 ring-primary ring-offset-2" : "opacity-80"
                  )}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <div className="relative w-16 h-16">
                    <img
                      src="https://images.unsplash.com/photo-1599934448058-524bb5e91986?q=80&w=1000&auto=format&fit=crop"
                      alt={filter.name}
                      className={cn(
                        "w-full h-full object-cover",
                        getFilterClass(filter.id)
                      )}
                    />
                  </div>
                  <div className="text-xs text-center py-1 font-medium">
                    {filter.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="adjustments" className="mt-0 space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium flex items-center">
                  <Snowflake className="h-4 w-4 mr-1" />
                  Brightness
                </div>
                <div className="text-sm text-muted-foreground">
                  {brightness[0]}%
                </div>
              </div>
              <Slider
                value={brightness}
                min={50}
                max={150}
                step={1}
                onValueChange={setBrightness}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium flex items-center">
                  <Contrast className="h-4 w-4 mr-1" />
                  Contrast
                </div>
                <div className="text-sm text-muted-foreground">
                  {contrast[0]}%
                </div>
              </div>
              <Slider
                value={contrast}
                min={50}
                max={150}
                step={1}
                onValueChange={setContrast}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button 
            className="flex-1 py-6"
            onClick={onSave}
          >
            <Save className="h-5 w-5 mr-2" />
            Save PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterScreen;