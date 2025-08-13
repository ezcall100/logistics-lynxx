
interface Quote {
  id: string;
  quoteNumber: string;
  customer: string;
  origin: string;
  destination: string;
  loadType: string;
  weight: string;
  date: string;
  expiryDate: string;
  amount: number;
  status: 'pending' | 'approved' | 'declined' | 'expired';
  aiConfidence: number;
}

export const mockQuotes: Quote[] = [
  {
    id: '1',
    quoteNumber: 'QT-2024-001',
    customer: 'Walmart Distribution',
    origin: 'Los Angeles, CA',
    destination: 'Phoenix, AZ',
    loadType: 'Dry Van',
    weight: '40,000 lbs',
    date: '2024-01-15',
    expiryDate: '2024-01-22',
    amount: 2850,
    status: 'approved',
    aiConfidence: 94
  },
  {
    id: '2',
    quoteNumber: 'QT-2024-002',
    customer: 'Amazon Logistics',
    origin: 'Chicago, IL',
    destination: 'Dallas, TX',
    loadType: 'Refrigerated',
    weight: '35,000 lbs',
    date: '2024-01-16',
    expiryDate: '2024-01-23',
    amount: 3200,
    status: 'pending',
    aiConfidence: 87
  },
  {
    id: '3',
    quoteNumber: 'QT-2024-003',
    customer: 'Home Depot Supply',
    origin: 'Atlanta, GA',
    destination: 'Miami, FL',
    loadType: 'Flatbed',
    weight: '45,000 lbs',
    date: '2024-01-16',
    expiryDate: '2024-01-21',
    amount: 1950,
    status: 'declined',
    aiConfidence: 76
  },
  {
    id: '4',
    quoteNumber: 'QT-2024-004',
    customer: 'Target Corporation',
    origin: 'Denver, CO',
    destination: 'Salt Lake City, UT',
    loadType: 'Dry Van',
    weight: '38,000 lbs',
    date: '2024-01-17',
    expiryDate: '2024-01-20',
    amount: 1800,
    status: 'expired',
    aiConfidence: 82
  },
  {
    id: '5',
    quoteNumber: 'QT-2024-005',
    customer: 'FedEx Ground',
    origin: 'Portland, OR',
    destination: 'San Francisco, CA',
    loadType: 'Dry Van',
    weight: '25,000 lbs',
    date: '2024-01-17',
    expiryDate: '2024-01-24',
    amount: 1450,
    status: 'pending',
    aiConfidence: 91
  }
];
