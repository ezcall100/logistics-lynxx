/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Unit {
  id: string;
  unitNumber: string;
  type: string;
  location: string;
  status: 'active' | 'maintenance' | 'inactive';
  capacity: number;
  assignedDriver: string;
}

interface Truck {
  id: string;
  truckNumber: string;
  model: string;
  year: number;
  capacity: number;
  status: 'active' | 'maintenance' | 'out_of_service';
  assignedDriver: string;
  location: string;
  lastMaintenance: string;
}

interface Trailer {
  id: string;
  trailerNumber: string;
  type: string;
  capacity: number;
  status: 'available' | 'attached' | 'maintenance' | 'out_of_service';
  attachedTruck: string;
  location: string;
  lastInspection: string;
}

interface FleetVehicle {
  id: string;
  vehicleId: string;
  driver: string;
  status: 'moving' | 'idle' | 'stopped' | 'offline';
  location: string;
  speed: number;
  fuelLevel: number;
  eta: string;
  lastUpdate: string;
}

interface FleetAlert {
  id: string;
  vehicleId: string;
  level: 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
}

interface ComplianceItem {
  id: string;
  vehicleId: string;
  type: string;
  description: string;
  status: 'compliant' | 'due_soon' | 'overdue' | 'pending';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
}

interface FuelTransaction {
  id: string;
  date: string;
  vehicleId: string;
  driver: string;
  location: string;
  gallons: number;
  pricePerGallon: number;
  totalAmount: number;
  type: 'fuel_purchase' | 'fuel_card' | 'cash' | 'company_account';
  odometer: number;
}

const mockUnits: Unit[] = [
  {
    id: '1',
    unitNumber: 'U-001',
    type: 'warehouse',
    location: 'Chicago Distribution Center, IL',
    status: 'active',
    capacity: 50000,
    assignedDriver: 'John Smith',
  },
  {
    id: '2',
    unitNumber: 'U-002',
    type: 'office',
    location: 'Manhattan Hub, NY',
    status: 'active',
    capacity: 15000,
    assignedDriver: 'Jane Doe',
  },
  {
    id: '3',
    unitNumber: 'U-003',
    type: 'depot',
    location: 'Los Angeles Port, CA',
    status: 'maintenance',
    capacity: 75000,
    assignedDriver: 'Mike Johnson',
  },
  {
    id: '4',
    unitNumber: 'U-004',
    type: 'terminal',
    location: 'Dallas Logistics Center, TX',
    status: 'active',
    capacity: 85000,
    assignedDriver: 'Sarah Wilson',
  },
  {
    id: '5',
    unitNumber: 'U-005',
    type: 'warehouse',
    location: 'Miami Freight Hub, FL',
    status: 'active',
    capacity: 62000,
    assignedDriver: 'Carlos Rodriguez',
  },
  {
    id: '6',
    unitNumber: 'U-006',
    type: 'depot',
    location: 'Seattle Container Port, WA',
    status: 'inactive',
    capacity: 45000,
    assignedDriver: 'Emma Thompson',
  },
];

const mockTrucks: Truck[] = [
  {
    id: '1',
    truckNumber: 'TRK-001',
    model: 'Freightliner Cascadia',
    year: 2022,
    capacity: 80000,
    status: 'active',
    assignedDriver: 'James Wilson',
    location: 'Houston Distribution Center, TX',
    lastMaintenance: '2024-02-15',
  },
  {
    id: '2',
    truckNumber: 'TRK-002',
    model: 'Peterbilt 579',
    year: 2021,
    capacity: 80000,
    status: 'active',
    assignedDriver: 'Maria Garcia',
    location: 'Atlanta Logistics Hub, GA',
    lastMaintenance: '2024-02-10',
  },
  {
    id: '3',
    truckNumber: 'TRK-003',
    model: 'Kenworth T680',
    year: 2020,
    capacity: 80000,
    status: 'maintenance',
    assignedDriver: 'Robert Brown',
    location: 'Phoenix Service Center, AZ',
    lastMaintenance: '2024-01-25',
  },
  {
    id: '4',
    truckNumber: 'TRK-004',
    model: 'Volvo VNL 860',
    year: 2023,
    capacity: 80000,
    status: 'active',
    assignedDriver: 'Lisa Anderson',
    location: 'Denver Terminal, CO',
    lastMaintenance: '2024-03-01',
  },
  {
    id: '5',
    truckNumber: 'TRK-005',
    model: 'Mack Anthem',
    year: 2021,
    capacity: 80000,
    status: 'active',
    assignedDriver: 'David Kim',
    location: 'Portland Depot, OR',
    lastMaintenance: '2024-02-28',
  },
  {
    id: '6',
    truckNumber: 'TRK-006',
    model: 'International LT',
    year: 2019,
    capacity: 80000,
    status: 'out_of_service',
    assignedDriver: 'Michael Torres',
    location: 'Las Vegas Service, NV',
    lastMaintenance: '2024-01-15',
  },
];

const mockTrailers: Trailer[] = [
  {
    id: '1',
    trailerNumber: 'TRL-001',
    type: 'dry_van',
    capacity: 3000,
    status: 'attached',
    attachedTruck: 'TRK-001',
    location: 'Houston Distribution Center, TX',
    lastInspection: '2024-02-20',
  },
  {
    id: '2',
    trailerNumber: 'TRL-002',
    type: 'refrigerated',
    capacity: 2800,
    status: 'available',
    attachedTruck: '',
    location: 'Miami Cold Storage, FL',
    lastInspection: '2024-02-18',
  },
  {
    id: '3',
    trailerNumber: 'TRL-003',
    type: 'flatbed',
    capacity: 3200,
    status: 'attached',
    attachedTruck: 'TRK-002',
    location: 'Atlanta Logistics Hub, GA',
    lastInspection: '2024-02-12',
  },
  {
    id: '4',
    trailerNumber: 'TRL-004',
    type: 'container',
    capacity: 2900,
    status: 'available',
    attachedTruck: '',
    location: 'Los Angeles Port, CA',
    lastInspection: '2024-03-05',
  },
  {
    id: '5',
    trailerNumber: 'TRL-005',
    type: 'dry_van',
    capacity: 3100,
    status: 'attached',
    attachedTruck: 'TRK-004',
    location: 'Denver Terminal, CO',
    lastInspection: '2024-02-25',
  },
  {
    id: '6',
    trailerNumber: 'TRL-006',
    type: 'tanker',
    capacity: 3500,
    status: 'maintenance',
    attachedTruck: '',
    location: 'Chicago Service Center, IL',
    lastInspection: '2024-01-30',
  },
  {
    id: '7',
    trailerNumber: 'TRL-007',
    type: 'refrigerated',
    capacity: 2850,
    status: 'attached',
    attachedTruck: 'TRK-005',
    location: 'Portland Depot, OR',
    lastInspection: '2024-03-01',
  },
];

const mockFleetVehicles: FleetVehicle[] = [
  {
    id: '1',
    vehicleId: 'TRK-001',
    driver: 'James Wilson',
    status: 'moving',
    location: 'I-10, TX',
    speed: 65,
    fuelLevel: 75,
    eta: '3:45 PM',
    lastUpdate: '2 mins ago',
  },
  {
    id: '2',
    vehicleId: 'TRK-002',
    driver: 'Maria Garcia',
    status: 'idle',
    location: 'Atlanta Distribution Center',
    speed: 0,
    fuelLevel: 45,
    eta: 'N/A',
    lastUpdate: '5 mins ago',
  },
  {
    id: '3',
    vehicleId: 'TRK-003',
    driver: 'Robert Brown',
    status: 'stopped',
    location: 'Phoenix Depot',
    speed: 0,
    fuelLevel: 30,
    eta: 'N/A',
    lastUpdate: '1 hour ago',
  },
];

const mockFleetAlerts: FleetAlert[] = [
  {
    id: '1',
    vehicleId: 'TRK-003',
    level: 'high',
    message: 'Low fuel level detected',
    timestamp: '10 mins ago',
  },
  {
    id: '2',
    vehicleId: 'TRK-002',
    level: 'medium',
    message: 'Extended idle time',
    timestamp: '25 mins ago',
  },
];

const mockComplianceItems: ComplianceItem[] = [
  {
    id: '1',
    vehicleId: 'TRK-001',
    type: 'DOT_Inspection',
    description: 'Annual DOT safety inspection required',
    status: 'due_soon',
    dueDate: '2024-03-15',
    priority: 'high',
    assignedTo: 'Safety Team',
  },
  {
    id: '2',
    vehicleId: 'TRK-002',
    type: 'Registration',
    description: 'Vehicle registration renewal',
    status: 'compliant',
    dueDate: '2024-12-31',
    priority: 'low',
    assignedTo: 'Admin Team',
  },
  {
    id: '3',
    vehicleId: 'TRK-003',
    type: 'Insurance',
    description: 'Commercial vehicle insurance policy',
    status: 'overdue',
    dueDate: '2024-02-28',
    priority: 'high',
    assignedTo: 'Finance Team',
  },
];

const mockFuelTransactions: FuelTransaction[] = [
  {
    id: '1',
    date: '2024-03-01',
    vehicleId: 'TRK-001',
    driver: 'James Wilson',
    location: 'Shell Station - I-95',
    gallons: 125.5,
    pricePerGallon: 3.89,
    totalAmount: 488.20,
    type: 'fuel_card',
    odometer: 145672,
  },
  {
    id: '2',
    date: '2024-03-01',
    vehicleId: 'TRK-002',
    driver: 'Maria Garcia',
    location: 'BP Truck Stop - Route 40',
    gallons: 142.3,
    pricePerGallon: 3.92,
    totalAmount: 557.82,
    type: 'fuel_card',
    odometer: 98234,
  },
  {
    id: '3',
    date: '2024-02-29',
    vehicleId: 'TRK-003',
    driver: 'Robert Brown',
    location: 'Exxon - Highway 101',
    gallons: 95.7,
    pricePerGallon: 3.95,
    totalAmount: 378.02,
    type: 'company_account',
    odometer: 203445,
  },
];

export const useAssetManagement = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [fleetTracker, setFleetTracker] = useState({
    vehicles: [] as FleetVehicle[],
    alerts: [] as FleetAlert[],
  });
  const [compliance, setCompliance] = useState({
    items: [] as ComplianceItem[],
  });
  const [fuelAudit, setFuelAudit] = useState({
    transactions: [] as FuelTransaction[],
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUnits(mockUnits);
      setTrucks(mockTrucks);
      setTrailers(mockTrailers);
      setFleetTracker({
        vehicles: mockFleetVehicles,
        alerts: mockFleetAlerts,
      });
      setCompliance({
        items: mockComplianceItems,
      });
      setFuelAudit({
        transactions: mockFuelTransactions,
      });
      setLoading(false);
    }, 500);
  }, []);

  // Unit Management
  const handleCreateUnit = (data: unknown) => {
    const newUnit: Unit = {
      ...data,
      id: `U${Date.now()}`,
    };
    setUnits(prev => [...prev, newUnit]);
    toast({
      title: 'Unit Created',
      description: `${newUnit.unitNumber} has been added successfully.`,
    });
  };

  const handleUpdateUnit = (id: string, data: unknown) => {
    setUnits(prev => prev.map(unit => 
      unit.id === id ? { ...unit, ...(data as any) } : unit
    ));
    toast({
      title: 'Unit Updated',
      description: 'Unit information has been updated successfully.',
    });
  };

  const handleDeleteUnit = (id: string) => {
    const unit = units.find(u => u.id === id);
    setUnits(prev => prev.filter(unit => unit.id !== id));
    toast({
      title: 'Unit Deleted',
      description: `${unit?.unitNumber} has been removed from the system.`,
      variant: 'destructive',
    });
  };

  // Truck Management
  const handleCreateTruck = (data: unknown) => {
    const newTruck: Truck = {
      ...data,
      id: `T${Date.now()}`,
      lastMaintenance: new Date().toISOString().split('T')[0],
    };
    setTrucks(prev => [...prev, newTruck]);
    toast({
      title: 'Truck Added',
      description: `${newTruck.truckNumber} has been added to the fleet.`,
    });
  };

  const handleUpdateTruck = (id: string, data: unknown) => {
    setTrucks(prev => prev.map(truck => 
      truck.id === id ? { ...truck, ...(data as any) } : truck
    ));
    toast({
      title: 'Truck Updated',
      description: 'Truck information has been updated successfully.',
    });
  };

  const handleDeleteTruck = (id: string) => {
    const truck = trucks.find(t => t.id === id);
    setTrucks(prev => prev.filter(truck => truck.id !== id));
    toast({
      title: 'Truck Removed',
      description: `${truck?.truckNumber} has been removed from the fleet.`,
      variant: 'destructive',
    });
  };

  // Trailer Management
  const handleCreateTrailer = (data: unknown) => {
    const newTrailer: Trailer = {
      ...data,
      id: `TR${Date.now()}`,
      lastInspection: new Date().toISOString().split('T')[0],
    };
    setTrailers(prev => [...prev, newTrailer]);
    toast({
      title: 'Trailer Added',
      description: `${newTrailer.trailerNumber} has been added to the fleet.`,
    });
  };

  const handleUpdateTrailer = (id: string, data: unknown) => {
    setTrailers(prev => prev.map(trailer => 
      trailer.id === id ? { ...trailer, ...(data as any) } : trailer
    ));
    toast({
      title: 'Trailer Updated',
      description: 'Trailer information has been updated successfully.',
    });
  };

  const handleDeleteTrailer = (id: string) => {
    const trailer = trailers.find(t => t.id === id);
    setTrailers(prev => prev.filter(trailer => trailer.id !== id));
    toast({
      title: 'Trailer Removed',
      description: `${trailer?.trailerNumber} has been removed from the fleet.`,
      variant: 'destructive',
    });
  };

  // Compliance Management
  const handleCreateComplianceItem = (data: unknown) => {
    const newItem: ComplianceItem = {
      ...data,
      id: `C${Date.now()}`,
    };
    setCompliance(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
    toast({
      title: 'Compliance Item Added',
      description: 'New compliance requirement has been added.',
    });
  };

  const handleUpdateComplianceItem = (id: string, data: unknown) => {
    setCompliance(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === id ? { ...item, ...(data as any) } : item
      ),
    }));
    toast({
      title: 'Compliance Updated',
      description: 'Compliance item has been updated successfully.',
    });
  };

  // Fuel Management
  const handleCreateFuelTransaction = (data: unknown) => {
    const newTransaction: FuelTransaction = {
      ...data,
      id: `F${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setFuelAudit(prev => ({
      ...prev,
      transactions: [...prev.transactions, newTransaction],
    }));
    toast({
      title: 'Fuel Transaction Added',
      description: 'New fuel transaction has been recorded.',
    });
  };

  const stats = {
    overview: {
      totalAssets: units.length + trucks.length + trailers.length,
      activeAssets: units.filter(u => u.status === 'active').length + 
                   trucks.filter(t => t.status === 'active').length + 
                   trailers.filter(tr => tr.status === 'available' || tr.status === 'attached').length,
      maintenanceRequired: units.filter(u => u.status === 'maintenance').length + 
                          trucks.filter(t => t.status === 'maintenance').length + 
                          trailers.filter(tr => tr.status === 'maintenance').length,
      complianceIssues: compliance.items.filter(i => i.status === 'overdue' || i.status === 'due_soon').length,
    },
    units: {
      total: units.length,
      active: units.filter(u => u.status === 'active').length,
      maintenance: units.filter(u => u.status === 'maintenance').length,
      inactive: units.filter(u => u.status === 'inactive').length,
    },
    trucks: {
      total: trucks.length,
      active: trucks.filter(t => t.status === 'active').length,
      maintenance: trucks.filter(t => t.status === 'maintenance').length,
      outOfService: trucks.filter(t => t.status === 'out_of_service').length,
    },
    trailers: {
      total: trailers.length,
      available: trailers.filter(t => t.status === 'available').length,
      attached: trailers.filter(t => t.status === 'attached').length,
      maintenance: trailers.filter(t => t.status === 'maintenance').length,
    },
    fleetTracker: {
      activeTracking: fleetTracker.vehicles.filter(v => v.status !== 'offline').length,
      moving: fleetTracker.vehicles.filter(v => v.status === 'moving').length,
      alerts: fleetTracker.alerts.length,
    },
    compliance: {
      pendingItems: compliance.items.filter(i => i.status === 'overdue' || i.status === 'due_soon').length,
      compliant: compliance.items.filter(i => i.status === 'compliant').length,
      overdue: compliance.items.filter(i => i.status === 'overdue').length,
    },
    fuelAudit: {
      recentTransactions: fuelAudit.transactions.length,
      totalSpent: fuelAudit.transactions.reduce((acc, t) => acc + t.totalAmount, 0),
      totalGallons: fuelAudit.transactions.reduce((acc, t) => acc + t.gallons, 0),
    },
  };

  return {
    units,
    trucks,
    trailers,
    fleetTracker,
    compliance,
    fuelAudit,
    stats,
    loading,
    handleCreateUnit,
    handleUpdateUnit,
    handleDeleteUnit,
    handleCreateTruck,
    handleUpdateTruck,
    handleDeleteTruck,
    handleCreateTrailer,
    handleUpdateTrailer,
    handleDeleteTrailer,
    handleCreateComplianceItem,
    handleUpdateComplianceItem,
    handleCreateFuelTransaction,
  };
};
