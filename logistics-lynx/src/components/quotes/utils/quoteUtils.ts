/* eslint-disable @typescript-eslint/no-explicit-any */

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

export interface QuoteStats {
  totalQuotes: number;
  pendingQuotes: number;
  approvedQuotes: number;
  totalValue: number;
  avgConfidence: number;
}

export const calculateQuoteStats = (quotes: Quote[]): QuoteStats => {
  return {
    totalQuotes: quotes.length,
    pendingQuotes: quotes.filter(q => q.status === 'pending').length,
    approvedQuotes: quotes.filter(q => q.status === 'approved').length,
    totalValue: quotes.reduce((sum, q) => sum + q.amount, 0),
    avgConfidence: quotes.length > 0 ? Math.round(quotes.reduce((sum, q) => sum + q.aiConfidence, 0) / quotes.length) : 0
  };
};

export const parseWeight = (weightStr: string): number => {
  return parseInt(weightStr.replace(/[^0-9]/g, '')) || 0;
};

export const isDateInRange = (dateStr: string, range: { from?: Date; to?: Date }): boolean => {
  if (!range.from && !range.to) return true;
  const date = new Date(dateStr);
  if (range.from && date < range.from) return false;
  if (range.to && date > range.to) return false;
  return true;
};
