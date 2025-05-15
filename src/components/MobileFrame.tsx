import React from 'react';
import { cn } from '@/lib/utils';

interface MobileFrameProps {
  children: React.ReactNode;
  className?: string;
  showStatusBar?: boolean;
  showNotch?: boolean;
}

export function MobileFrame({
  children,
  className,
  showStatusBar = true,
  showNotch = true
}: MobileFrameProps) {
  return (
    <div className="relative w-full max-w-[375px] mx-auto shadow-2xl rounded-[40px] overflow-hidden border-[14px] border-black/90 bg-black/90 h-[750px]">
      {/* Notch */}
      {showNotch && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[180px] h-[30px] bg-black rounded-b-[20px] z-50 flex items-center justify-center">
          <div className="w-16 h-4 bg-black flex items-center justify-center relative">
            <div className="absolute w-2 h-2 rounded-full bg-slate-800 left-2"></div>
            <div className="absolute w-3 h-3 rounded-full bg-slate-700"></div>
          </div>
        </div>
      )}
      
      {/* Status Bar */}
      {showStatusBar && (
        <div className="absolute top-2 left-4 right-4 flex justify-between text-[10px] font-medium text-white/90 z-40">
          <div>9:41</div>
          <div className="flex space-x-1">
            <span>
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3.16667C1 2.52233 1.52233 2 2.16667 2H13.8333C14.4777 2 15 2.52233 15 3.16667V6.83333C15 7.47767 14.4777 8 13.8333 8H2.16667C1.52233 8 1 7.47767 1 6.83333V3.16667Z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.5 4.5V5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1C1 0.447715 1.44772 0 2 0H12C12.5523 0 13 0.447715 13 1V9C13 9.55229 12.5523 10 12 10H2C1.44772 10 1 9.55229 1 9V1Z" fill="white"/>
                <path d="M2 5C2 2.5 3.5 1 5.5 1H6.5" stroke="black" strokeWidth="0.5" strokeLinecap="round"/>
                <path d="M2 8C2 9 2.5 9.5 3.5 9.5" stroke="black" strokeWidth="0.5" strokeLinecap="round"/>
              </svg>
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" fill="white"/>
                <path d="M15 8C15 8.55228 14.5523 9 14 9C13.4477 9 13 8.55228 13 8C13 7.44772 13.4477 7 14 7C14.5523 7 15 7.44772 15 8Z" fill="white"/>
                <path d="M8 15C8 15.5523 7.55228 16 7 16C6.44772 16 6 15.5523 6 15C6 14.4477 6.44772 14 7 14C7.55228 14 8 14.4477 8 15Z" fill="white"/>
                <path d="M3 13C3 13.5523 2.55228 14 2 14C1.44772 14 1 13.5523 1 13C1 12.4477 1.44772 12 2 12C2.55228 12 3 12.4477 3 13Z" fill="white"/>
                <path d="M3 3C3 3.55228 2.55228 4 2 4C1.44772 4 1 3.55228 1 3C1 2.44772 1.44772 2 2 2C2.55228 2 3 2.44772 3 3Z" fill="white"/>
                <path d="M8 1C8 1.55228 7.55228 2 7 2C6.44772 2 6 1.55228 6 1C6 0.447715 6.44772 0 7 0C7.55228 0 8 0.447715 8 1Z" fill="white"/>
                <path d="M13 3C13 3.55228 12.5523 4 12 4C11.4477 4 11 3.55228 11 3C11 2.44772 11.4477 2 12 2C12.5523 2 13 2.44772 13 3Z" fill="white"/>
                <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="white"/>
              </svg>
            </span>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div 
        className={cn(
          "h-full w-full bg-background overflow-y-auto relative scrollbar-hide", 
          className
        )}
      >
        {children}
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-1 bg-white/80 rounded-full z-50"></div>
    </div>
  );
}

export default MobileFrame;