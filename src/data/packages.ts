// Static package data as an alternative to database fetching
export interface Package {
  id: string;
  name: string;
  game: 'PUBG_MOBILE' | 'MLBB';
  description?: string;
  amount: number;
  usdtPrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const staticPackages: Package[] = [
  // PUBG Mobile packages
  {
    id: 'pubg-1',
    name: '60 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 60 UC',
    amount: 60,
    usdtPrice: 1.5000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-2',
    name: '325 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 325 UC',
    amount: 325,
    usdtPrice: 6.5000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-3',
    name: '660 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 660 UC',
    amount: 660,
    usdtPrice: 12.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-4',
    name: '1800 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 1800 UC',
    amount: 1800,
    usdtPrice: 25.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-5',
    name: '3850 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 3850 UC',
    amount: 3850,
    usdtPrice: 49.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-6',
    name: '8100 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 8100 UC',
    amount: 8100,
    usdtPrice: 96.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-7',
    name: '16200 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 16200 UC',
    amount: 16200,
    usdtPrice: 186.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-8',
    name: '24300 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 24300 UC',
    amount: 24300,
    usdtPrice: 278.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-9',
    name: '32400 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 32400 UC',
    amount: 32400,
    usdtPrice: 369.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pubg-10',
    name: '40500 UC',
    game: 'PUBG_MOBILE',
    description: 'PUBG Mobile 40500 UC',
    amount: 40500,
    usdtPrice: 459.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  
  // MLBB packages
  {
    id: 'mlbb-1',
    name: '56 Diamonds',
    game: 'MLBB',
    description: 'Mobile Legends 56 Diamonds',
    amount: 56,
    usdtPrice: 3.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mlbb-2',
    name: '278 Diamonds',
    game: 'MLBB',
    description: 'Mobile Legends 278 Diamonds',
    amount: 278,
    usdtPrice: 6.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mlbb-3',
    name: '571 Diamonds',
    game: 'MLBB',
    description: 'Mobile Legends 571 Diamonds',
    amount: 571,
    usdtPrice: 11.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mlbb-4',
    name: '1783 Diamonds',
    game: 'MLBB',
    description: 'Mobile Legends 1783 Diamonds',
    amount: 1783,
    usdtPrice: 33.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mlbb-5',
    name: '3005 Diamonds',
    game: 'MLBB',
    description: 'Mobile Legends 3005 Diamonds',
    amount: 3005,
    usdtPrice: 52.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mlbb-6',
    name: '6012 Diamonds',
    game: 'MLBB',
    description: 'Mobile Legends 6012 Diamonds',
    amount: 6012,
    usdtPrice: 99.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mlbb-7',
    name: '12000 Diamonds',
    game: 'MLBB',
    description: 'Mobile Legends 12000 Diamonds',
    amount: 12000,
    usdtPrice: 200.0000,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];