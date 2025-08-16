/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department?: string;
  status: 'active' | 'inactive' | 'on_leave';
  hireDate: string;
  salary?: number;
  location?: string;
  avatar?: string;
  licenseNumber?: string;
  vehicleAssigned?: string;
  territory?: string;
  performance?: number;
}

const mockWorkers: Record<string, Worker[]> = {
  executive: [
    {
      id: 'EXE001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Chief Executive Officer',
      department: 'Executive',
      status: 'active',
      hireDate: '2020-01-15',
      salary: 350000,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9d76026?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EXE002',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      role: 'Chief Technology Officer',
      department: 'Technology',
      status: 'active',
      hireDate: '2020-03-20',
      salary: 320000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EXE003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      role: 'Chief Financial Officer',
      department: 'Finance',
      status: 'active',
      hireDate: '2019-08-10',
      salary: 300000,
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EXE004',
      name: 'Richard Thompson',
      email: 'richard.thompson@company.com',
      phone: '+1 (555) 456-7890',
      role: 'Chief Operations Officer',
      department: 'Operations',
      status: 'active',
      hireDate: '2021-02-10',
      salary: 310000,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EXE005',
      name: 'Maria Santos',
      email: 'maria.santos@company.com',
      phone: '+1 (555) 567-8901',
      role: 'VP of Human Resources',
      department: 'Human Resources',
      status: 'on_leave',
      hireDate: '2020-06-15',
      salary: 250000,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    }
  ],
  employee: [
    {
      id: 'EMP001',
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      phone: '+1 (555) 456-7890',
      role: 'Operations Manager',
      department: 'Operations',
      location: 'New York, NY',
      status: 'active',
      hireDate: '2021-05-15',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EMP002',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@company.com',
      phone: '+1 (555) 567-8901',
      role: 'HR Specialist',
      department: 'Human Resources',
      location: 'Los Angeles, CA',
      status: 'active',
      hireDate: '2022-01-10',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EMP003',
      name: 'James Brown',
      email: 'james.brown@company.com',
      phone: '+1 (555) 678-9012',
      role: 'IT Support Specialist',
      department: 'Technology',
      location: 'Chicago, IL',
      status: 'on_leave',
      hireDate: '2021-09-20',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EMP004',
      name: 'Jessica Davis',
      email: 'jessica.davis@company.com',
      phone: '+1 (555) 789-0123',
      role: 'Finance Analyst',
      department: 'Finance',
      location: 'Houston, TX',
      status: 'active',
      hireDate: '2022-03-08',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EMP005',
      name: 'Robert Miller',
      email: 'robert.miller@company.com',
      phone: '+1 (555) 890-1234',
      role: 'Marketing Coordinator',
      department: 'Marketing',
      location: 'Miami, FL',
      status: 'active',
      hireDate: '2023-01-15',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EMP006',
      name: 'Amanda Garcia',
      email: 'amanda.garcia@company.com',
      phone: '+1 (555) 901-2345',
      role: 'Customer Service Rep',
      department: 'Customer Service',
      location: 'Phoenix, AZ',
      status: 'active',
      hireDate: '2022-07-20',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EMP007',
      name: 'Kevin Lee',
      email: 'kevin.lee@company.com',
      phone: '+1 (555) 012-3456',
      role: 'Warehouse Supervisor',
      department: 'Warehouse',
      location: 'Atlanta, GA',
      status: 'inactive',
      hireDate: '2021-11-30',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'EMP008',
      name: 'Sandra Moore',
      email: 'sandra.moore@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Administrative Assistant',
      department: 'Administration',
      location: 'Seattle, WA',
      status: 'active',
      hireDate: '2023-02-14',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
    }
  ],
  drivers: [
    {
      id: 'DRV001',
      name: 'Robert Martinez',
      email: 'robert.martinez@company.com',
      phone: '+1 (555) 789-0123',
      role: 'Long Haul Driver',
      status: 'active',
      hireDate: '2021-03-15',
      licenseNumber: 'CDL-12345678',
      vehicleAssigned: 'TRUCK-001',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'DRV002',
      name: 'Angela Davis',
      email: 'angela.davis@company.com',
      phone: '+1 (555) 890-1234',
      role: 'Local Delivery Driver',
      status: 'active',
      hireDate: '2022-06-20',
      licenseNumber: 'CDL-87654321',
      vehicleAssigned: 'TRUCK-002',
      avatar: 'https://images.unsplash.com/photo-1551836022-8b2858c9c69b?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'DRV003',
      name: 'Carlos Garcia',
      email: 'carlos.garcia@company.com',
      phone: '+1 (555) 901-2345',
      role: 'Regional Driver',
      status: 'inactive',
      hireDate: '2020-11-10',
      licenseNumber: 'CDL-11223344',
      vehicleAssigned: 'Unassigned',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'DRV004',
      name: 'Patricia Williams',
      email: 'patricia.williams@company.com',
      phone: '+1 (555) 012-3456',
      role: 'OTR Driver',
      status: 'active',
      hireDate: '2022-08-05',
      licenseNumber: 'CDL-55667788',
      vehicleAssigned: 'TRUCK-003',
      avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'DRV005',
      name: 'Thomas Anderson',
      email: 'thomas.anderson@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Hazmat Driver',
      status: 'active',
      hireDate: '2021-12-01',
      licenseNumber: 'CDL-99887766',
      vehicleAssigned: 'TRUCK-004',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'DRV006',
      name: 'Jennifer Taylor',
      email: 'jennifer.taylor@company.com',
      phone: '+1 (555) 234-5678',
      role: 'Team Driver',
      status: 'on_leave',
      hireDate: '2023-04-10',
      licenseNumber: 'CDL-44556677',
      vehicleAssigned: 'TRUCK-005',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616c9d76026?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'DRV007',
      name: 'Daniel Clark',
      email: 'daniel.clark@company.com',
      phone: '+1 (555) 345-6789',
      role: 'Dedicated Route Driver',
      status: 'active',
      hireDate: '2020-09-18',
      licenseNumber: 'CDL-22334455',
      vehicleAssigned: 'TRUCK-006',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ],
  agents: [
    {
      id: 'AGT001',
      name: 'Jennifer Kim',
      email: 'jennifer.kim@company.com',
      phone: '+1 (555) 012-3456',
      role: 'Senior Sales Agent',
      status: 'active',
      hireDate: '2021-07-15',
      territory: 'Northeast',
      performance: 92,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'AGT002',
      name: 'Mark Thompson',
      email: 'mark.thompson@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Customer Service Agent',
      status: 'active',
      hireDate: '2022-02-10',
      territory: 'West Coast',
      performance: 88,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'AGT003',
      name: 'Patricia Jones',
      email: 'patricia.jones@company.com',
      phone: '+1 (555) 234-5678',
      role: 'Account Manager',
      status: 'on_leave',
      hireDate: '2020-12-05',
      territory: 'Southeast',
      performance: 95,
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'AGT004',
      name: 'Christopher White',
      email: 'christopher.white@company.com',
      phone: '+1 (555) 345-6789',
      role: 'Inside Sales Rep',
      status: 'active',
      hireDate: '2023-01-20',
      territory: 'Midwest',
      performance: 85,
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'AGT005',
      name: 'Michelle Rodriguez',
      email: 'michelle.rodriguez@company.com',
      phone: '+1 (555) 456-7890',
      role: 'Business Development Agent',
      status: 'active',
      hireDate: '2022-09-12',
      territory: 'Southwest',
      performance: 91,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 'AGT006',
      name: 'Brian Johnson',
      email: 'brian.johnson@company.com',
      phone: '+1 (555) 567-8901',
      role: 'Territory Manager',
      status: 'inactive',
      hireDate: '2021-05-25',
      territory: 'Pacific Northwest',
      performance: 78,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    }
  ]
};

export const useWorkerManagement = (workerType: string) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    department: '',
    location: '',
    dateRange: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWorkers(mockWorkers[workerType] || []);
      setLoading(false);
    }, 500);
  }, [workerType]);

  const handleCreateWorker = (data: Omit<Worker, 'id'>) => {
    const newWorker: Worker = {
      ...data,
      id: `${workerType.substring(0, 3).toUpperCase()}${String(Date.now()).slice(-3)}`,
    };
    setWorkers(prev => [...prev, newWorker]);
    toast({
      title: 'Worker Created',
      description: `${newWorker.name} has been added successfully.`,
    });
  };

  const handleUpdateWorker = (id: string, data: Partial<Worker>) => {
    setWorkers(prev => prev.map(worker => 
      worker.id === id ? { ...worker, ...data } : worker
    ));
    toast({
      title: 'Worker Updated',
      description: 'Worker information has been updated successfully.',
    });
  };

  const handleDeleteWorker = (id: string) => {
    const worker = workers.find(w => w.id === id);
    setWorkers(prev => prev.filter(worker => worker.id !== id));
    toast({
      title: 'Worker Deleted',
      description: `${worker?.name} has been removed from the system.`,
      variant: 'destructive',
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleExport = (type: string) => {
    toast({
      title: 'Export Started',
      description: `Exporting ${type} workers data to CSV...`,
    });
    // Simulate export functionality
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: 'Workers data has been exported successfully.',
      });
    }, 2000);
  };

  const stats = {
    executive: mockWorkers.executive.length,
    employee: mockWorkers.employee.length,
    drivers: mockWorkers.drivers.length,
    agents: mockWorkers.agents.length,
    active: Object.values(mockWorkers).flat().filter(w => w.status === 'active').length,
    inactive: Object.values(mockWorkers).flat().filter(w => w.status === 'inactive').length,
    onLeave: Object.values(mockWorkers).flat().filter(w => w.status === 'on_leave').length,
    total: Object.values(mockWorkers).flat().length,
  };

  return {
    workers,
    stats,
    filters,
    loading,
    handleCreateWorker,
    handleUpdateWorker,
    handleDeleteWorker,
    handleFilterChange,
    handleExport,
  };
};
