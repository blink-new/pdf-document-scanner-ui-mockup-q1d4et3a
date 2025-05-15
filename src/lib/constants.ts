export const APP_NAME = 'DocScan Pro';

export interface File {
  id: string;
  name: string;
  type: 'pdf';
  pages: number;
  size: string; // e.g., "1.2 MB"
  createdAt: string;
  synced: 'syncing' | 'synced' | 'error' | 'offline';
  thumbnailUrl: string;
}

export interface Folder {
  id: string;
  name: string;
  files: number;
  createdAt: string;
}

// Mock data for the app
export const MOCK_FILES: File[] = [
  {
    id: '1',
    name: 'Tax Documents 2023',
    type: 'pdf',
    pages: 5,
    size: '2.4 MB',
    createdAt: '2023-12-15',
    synced: 'synced',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Meeting Notes',
    type: 'pdf',
    pages: 2,
    size: '0.7 MB',
    createdAt: '2023-12-20',
    synced: 'syncing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517971129774-8a2b38fa128e?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Project Proposal',
    type: 'pdf',
    pages: 12,
    size: '5.1 MB',
    createdAt: '2024-01-05',
    synced: 'synced',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595614590430-a656b98a5f29?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Invoice',
    type: 'pdf',
    pages: 1,
    size: '0.3 MB',
    createdAt: '2024-01-10',
    synced: 'error',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop',
  },
];

export const MOCK_FOLDERS: Folder[] = [
  {
    id: '1',
    name: 'Work',
    files: 12,
    createdAt: '2023-11-10',
  },
  {
    id: '2',
    name: 'Personal',
    files: 8,
    createdAt: '2023-12-01',
  },
  {
    id: '3',
    name: 'Receipts',
    files: 23,
    createdAt: '2023-10-15',
  },
];

export const FILTER_OPTIONS = [
  { id: 'original', name: 'Original' },
  { id: 'enhanced', name: 'Enhanced' },
  { id: 'bw', name: 'Black & White' },
  { id: 'grayscale', name: 'Grayscale' },
  { id: 'color', name: 'Color' },
];

export const ONBOARDING_STEPS = [
  {
    title: 'Scan Any Document',
    description: 'Quickly scan documents, receipts, IDs, and more with your camera',
    image: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Automatic Enhancement',
    description: 'Our AI automatically enhances your scans for perfect clarity',
    image: 'https://images.unsplash.com/photo-1583140702643-5087876954f1?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Cloud Sync',
    description: 'Access your documents anywhere with secure cloud storage',
    image: 'https://images.unsplash.com/photo-1633383718081-22ac93e3db65?q=80&w=800&auto=format&fit=crop'
  },
];

export const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$4.99',
    period: 'month',
    popular: false,
  },
  {
    id: 'annual',
    name: 'Annual',
    price: '$39.99',
    period: 'year',
    popular: true,
    discount: '33% off',
  },
];

export const PREMIUM_FEATURES = [
  'Unlimited document scans',
  'OCR text recognition',
  'Advanced filters & editing',
  'Unlimited cloud storage',
  'Password protection',
  'No watermarks',
  'Priority customer support',
];