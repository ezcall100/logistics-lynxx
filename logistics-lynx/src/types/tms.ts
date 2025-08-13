
export interface Company {
  id: string;
  name: string;
  type: 'shipper' | 'carrier' | 'broker';
  address?: string;
  phone?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  company_id?: string;
  vehicle_number: string;
  type: 'truck' | 'trailer' | 'van';
  capacity_weight?: number;
  capacity_volume?: number;
  status: 'available' | 'in_transit' | 'maintenance' | 'out_of_service';
  current_location?: string;
  last_maintenance?: string;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: string;
  company_id?: string;
  name: string;
  license_number: string;
  phone?: string;
  email?: string;
  status: 'available' | 'driving' | 'rest' | 'off_duty';
  current_location?: string;
  hours_driven_today?: number;
  created_at: string;
  updated_at: string;
}

export interface Shipment {
  id: string;
  shipper_id?: string;
  carrier_id?: string;
  driver_id?: string;
  vehicle_id?: string;
  shipment_number: string;
  origin: string;
  destination: string;
  pickup_date?: string;
  delivery_date?: string;
  estimated_delivery?: string;
  status: 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  weight?: number;
  volume?: number;
  value?: number;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  special_instructions?: string;
  rate?: number;
  distance_miles?: number;
  fuel_cost?: number;
  ai_recommendations?: unknown;
  customer_reference?: string;
  equipment_type?: string;
  temperature_range?: unknown;
  hazmat_info?: unknown;
  pickup_window?: unknown;
  delivery_window?: unknown;
  created_by?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface AIDecision {
  id: string;
  decision_type: string;
  context: Record<string, unknown>;
  decision: Record<string, unknown>;
  confidence_score?: number;
  implemented: boolean;
  created_at: string;
}

export interface Route {
  id: string;
  shipment_id?: string;
  driver_id?: string;
  vehicle_id?: string;
  route_data?: Record<string, unknown>;
  estimated_duration_hours?: number;
  estimated_fuel_cost?: number;
  traffic_conditions?: string;
  weather_conditions?: string;
  ai_optimized: boolean;
  created_at: string;
  updated_at: string;
}
