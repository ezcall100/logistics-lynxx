/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type DirectorySearchParams = {
  q?: string;
  type?: string;
  tags?: string[];
  page?: number;
  perPage?: number;
  location?: string;
  services?: string[];
};

type DirectoryCompany = {
  id: string;
  name: string;
  type: 'shipper' | 'carrier' | 'broker' | 'vendor';
  description?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: {
    city: string;
    state: string;
    country: string;
  };
  services?: string[];
  tags?: string[];
  rating?: number;
  compliance_score?: number;
  created_at: string;
  updated_at: string;
};

type DirectorySearchResponse = {
  data: DirectoryCompany[];
  count: number;
  total_pages: number;
};

export function useDirectorySearch(params: DirectorySearchParams) {
  return useQuery({
    queryKey: ['directory', params],
    queryFn: async (): Promise<DirectorySearchResponse> => {
      const from = ((params.page ?? 1) - 1) * (params.perPage ?? 20);
      const to = from + (params.perPage ?? 20) - 1;

      // For now, we'll use mock data since the directory_companies table might not exist yet
      // In production, this would query your Supabase table
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data
      const mockCompanies: DirectoryCompany[] = [
        {
          id: '1',
          name: 'Acme Logistics',
          type: 'carrier',
          description: 'Full-service logistics provider with nationwide coverage',
          website: 'https://acme-logistics.com',
          phone: '(555) 123-4567',
          email: 'info@acme-logistics.com',
          address: { city: 'Chicago', state: 'IL', country: 'USA' },
          services: ['Truckload', 'LTL', 'Intermodal'],
          tags: ['reliable', 'nationwide', '24/7'],
          rating: 4.8,
          compliance_score: 98,
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-15T00:00:00Z'
        },
        {
          id: '2',
          name: 'Global Freight Solutions',
          type: 'broker',
          description: 'Leading freight brokerage with extensive carrier network',
          website: 'https://globalfreight.com',
          phone: '(555) 987-6543',
          email: 'contact@globalfreight.com',
          address: { city: 'Dallas', state: 'TX', country: 'USA' },
          services: ['Freight Brokerage', 'Load Matching', 'Rate Negotiation'],
          tags: ['experienced', 'competitive', 'fast'],
          rating: 4.6,
          compliance_score: 95,
          created_at: '2024-01-02T00:00:00Z',
          updated_at: '2024-01-14T00:00:00Z'
        },
        {
          id: '3',
          name: 'Premium Shipping Co',
          type: 'shipper',
          description: 'Manufacturing company with regular shipping needs',
          website: 'https://premiumshipping.com',
          phone: '(555) 456-7890',
          email: 'logistics@premiumshipping.com',
          address: { city: 'Los Angeles', state: 'CA', country: 'USA' },
          services: ['Manufacturing', 'Distribution', 'Export'],
          tags: ['manufacturing', 'export', 'regular'],
          rating: 4.4,
          compliance_score: 92,
          created_at: '2024-01-03T00:00:00Z',
          updated_at: '2024-01-13T00:00:00Z'
        }
      ];

      // Filter based on search params
      let filtered = mockCompanies;
      
      if (params.q) {
        filtered = filtered.filter(company => 
          company.name.toLowerCase().includes(params.q!.toLowerCase()) ||
          company.description?.toLowerCase().includes(params.q!.toLowerCase())
        );
      }
      
      if (params.type) {
        filtered = filtered.filter(company => company.type === params.type);
      }
      
      if (params.tags?.length) {
        filtered = filtered.filter(company => 
          params.tags!.some(tag => company.tags?.includes(tag))
        );
      }

      const paginated = filtered.slice(from, to + 1);
      const total_pages = Math.ceil(filtered.length / (params.perPage ?? 20));

      return {
        data: paginated,
        count: filtered.length,
        total_pages
      };
    },
    staleTime: 15_000, // 15 seconds
  });
}
