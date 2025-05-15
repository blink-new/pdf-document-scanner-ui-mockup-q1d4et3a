import Canvas from './components/Canvas';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted p-4 md:p-8">
      {/* Figma-like top toolbar */}
      <div className="w-full max-w-7xl mx-auto mb-4 flex items-center justify-between bg-background border border-border rounded-md p-1.5 shadow-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-400 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-green-400 mx-1"></div>
          <div className="h-4 mx-2 border-r border-border"></div>
          <div className="text-sm font-medium">PDF Scanner Mockup.fig</div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-muted/40 rounded px-2 py-1 text-xs">
            <span className="text-muted-foreground">UI Screens</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">U</div>
            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-xs font-medium text-accent">D</div>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto">
        {/* Figma-like project title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            PDF Document Scanner UI Mockup
          </h1>
          <div className="flex items-center space-x-3">
            <button className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-md">Share</button>
            <button className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-md">Present</button>
          </div>
        </div>
        
        <Canvas />
        
        <div className="mt-8 text-center max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">
            UI Mockup for a PDF Document Scanner app with glassmorphism design.
            <br />
            Features: file management, document scanning, cropping, filtering, and cloud sync.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;