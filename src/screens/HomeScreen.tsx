import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { APP_NAME, MOCK_FILES, MOCK_FOLDERS, File, Folder } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { 
  Calendar, ChevronDown, FileText, Folder as FolderIcon, 
  GridIcon, ListIcon, MoreVertical, Plus, RefreshCw, 
  Search, Settings, CheckCircle2 
} from 'lucide-react';

interface HomeScreenProps {
  onScan: () => void;
  onSelectFile: (file: File) => void;
}

export function HomeScreen({ onScan, onSelectFile }: HomeScreenProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<'file' | 'folder'>('folder');
  const [newItemName, setNewItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [files, setFiles] = useState<File[]>(MOCK_FILES);
  const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS);
  
  const handleCreateNew = () => {
    if (!newItemName.trim()) return;
    
    if (addType === 'folder') {
      const newFolder: Folder = {
        id: `folder-${Date.now()}`,
        name: newItemName,
        files: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setFolders([...folders, newFolder]);
    }
    
    setNewItemName('');
    setShowAddModal(false);
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="glass-panel p-4 pb-3 border-b">
        <div className="flex justify-between items-center mb-3">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {APP_NAME}
          </div>
          <Button variant="ghost" size="icon" className="text-foreground/70">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..." 
            className="pl-9 bg-background/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <Button 
              variant={view === 'grid' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setView('grid')}
              className="px-2"
            >
              <GridIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant={view === 'list' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setView('list')}
              className="px-2"
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Recent</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <ScrollArea className="flex-1 p-4">
        {/* Folders */}
        <div className="mb-6">
          <h2 className="font-medium text-sm text-muted-foreground mb-3">Folders</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {folders.map((folder) => (
              <div 
                key={folder.id}
                className="glass-card p-4 rounded-xl flex flex-col"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FolderIcon className="h-5 w-5 text-primary" />
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <h3 className="font-medium mt-2 line-clamp-1">{folder.name}</h3>
                <div className="text-xs text-muted-foreground mt-1">
                  {folder.files} {folder.files === 1 ? 'file' : 'files'}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Files */}
        <div>
          <h2 className="font-medium text-sm text-muted-foreground mb-3">Recent Files</h2>
          
          {view === 'grid' ? (
            <div className="grid grid-cols-2 gap-3">
              {files.map((file) => (
                <div 
                  key={file.id}
                  className="glass-card p-2 rounded-xl flex flex-col"
                  onClick={() => onSelectFile(file)}
                >
                  <div className="relative rounded-lg overflow-hidden h-28 mb-2">
                    <img 
                      src={file.thumbnailUrl} 
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Sync status */}
                    <div className="absolute top-2 right-2 z-10">
                      {file.synced === 'syncing' && (
                        <div className="bg-white/80 dark:bg-black/60 rounded-full p-1">
                          <RefreshCw className="h-3 w-3 text-muted-foreground animate-spin" />
                        </div>
                      )}
                      {file.synced === 'synced' && (
                        <div className="bg-white/80 dark:bg-black/60 rounded-full p-1">
                          <CheckCircle2 className="h-3 w-3 text-success" />
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <div className="flex items-center text-white text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        <span>{file.pages} {file.pages === 1 ? 'page' : 'pages'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-1">
                    <h3 className="font-medium text-sm line-clamp-1">{file.name}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{file.createdAt}</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {files.map((file) => (
                <div 
                  key={file.id}
                  className="glass-card p-3 rounded-xl flex items-center"
                  onClick={() => onSelectFile(file)}
                >
                  <div className="mr-3 relative">
                    <div className="h-12 w-12 rounded-lg overflow-hidden">
                      <img 
                        src={file.thumbnailUrl} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Sync status */}
                    <div className="absolute -top-1 -right-1 z-10">
                      {file.synced === 'syncing' && (
                        <div className="bg-white/80 dark:bg-black/60 rounded-full p-1">
                          <RefreshCw className="h-3 w-3 text-muted-foreground animate-spin" />
                        </div>
                      )}
                      {file.synced === 'synced' && (
                        <div className="bg-white/80 dark:bg-black/60 rounded-full p-1">
                          <CheckCircle2 className="h-3 w-3 text-success" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-1">{file.name}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{file.createdAt}</span>
                      <span>{file.size}</span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Floating Action Button */}
      <Button 
        className="absolute bottom-20 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={onScan}
      >
        <Plus className="h-6 w-6" />
      </Button>
      
      {/* Add New Dialog */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-xs mx-auto glass-panel">
          <DialogHeader>
            <DialogTitle>Create New {addType === 'folder' ? 'Folder' : 'File'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="flex rounded-lg overflow-hidden">
              <Button 
                variant={addType === 'folder' ? 'default' : 'outline'}
                className={cn("flex-1 rounded-none", addType === 'folder' ? "" : "border-r-0")}
                onClick={() => setAddType('folder')}
              >
                Folder
              </Button>
              <Button 
                variant={addType === 'file' ? 'default' : 'outline'}
                className={cn("flex-1 rounded-none", addType === 'file' ? "" : "border-l-0")}
                onClick={() => setAddType('file')}
              >
                File
              </Button>
            </div>
            
            <Input 
              placeholder={`Enter ${addType} name`}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              autoFocus
            />
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleCreateNew}
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HomeScreen;