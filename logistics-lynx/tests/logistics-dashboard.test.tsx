/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogisticsManagementDashboard from '../src/pages/LogisticsManagementDashboard';

// Mock the toast hook
jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

// Mock the UI components
jest.mock('@/components/ui/table', () => ({
  Table: ({ children, ...props }: any) => <table {...props}>{children}</table>,
  TableHeader: ({ children, ...props }: any) => <thead {...props}>{children}</thead>,
  TableBody: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
  TableHead: ({ children, ...props }: any) => <th {...props}>{children}</th>,
  TableRow: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  TableCell: ({ children, ...props }: any) => <td {...props}>{children}</td>,
  TableCaption: ({ children, ...props }: any) => <caption {...props}>{children}</caption>
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  )
}));

jest.mock('@/components/ui/input', () => ({
  Input: ({ ...props }: any) => <input {...props} />
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardDescription: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>
}));

jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children, ...props }: any) => <span {...props}>{children}</span>
}));

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: any) => (
    <div data-testid="dialog" style={{ display: open ? 'block' : 'none' }}>
      {children}
    </div>
  ),
  DialogContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  DialogDescription: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  DialogFooter: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  DialogHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  DialogTitle: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  DialogTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>
}));

jest.mock('@/components/ui/select', () => ({
  Select: ({ children, value, onValueChange }: any) => (
    <select value={value} onChange={(e) => onValueChange?.(e.target.value)}>
      {children}
    </select>
  ),
  SelectContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectItem: ({ children, value, ...props }: any) => (
    <option value={value} {...props}>{children}</option>
  ),
  SelectTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  SelectValue: ({ placeholder, ...props }: any) => <span {...props}>{placeholder}</span>
}));

jest.mock('@/components/ui/alert-dialog', () => ({
  AlertDialog: ({ children }: any) => <div>{children}</div>,
  AlertDialogAction: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
  AlertDialogCancel: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  AlertDialogContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AlertDialogDescription: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AlertDialogFooter: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AlertDialogHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  AlertDialogTitle: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  AlertDialogTrigger: ({ children, ...props }: any) => <div {...props}>{children}</div>
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Truck: () => <span data-testid="truck-icon">🚛</span>,
  Package: () => <span data-testid="package-icon">📦</span>,
  MapPin: () => <span data-testid="mappin-icon">📍</span>,
  Clock: () => <span data-testid="clock-icon">⏰</span>,
  DollarSign: () => <span data-testid="dollar-icon">💰</span>,
  TrendingUp: () => <span data-testid="trending-icon">📈</span>,
  AlertTriangle: () => <span data-testid="alert-icon">⚠️</span>,
  CheckCircle: () => <span data-testid="check-icon">✅</span>,
  Edit: () => <span data-testid="edit-icon">✏️</span>,
  Trash2: () => <span data-testid="trash-icon">🗑️</span>,
  Plus: () => <span data-testid="plus-icon">➕</span>,
  Search: () => <span data-testid="search-icon">🔍</span>,
  Filter: () => <span data-testid="filter-icon">🔧</span>,
  Download: () => <span data-testid="download-icon">⬇️</span>,
  RefreshCw: () => <span data-testid="refresh-icon">🔄</span>,
  Eye: () => <span data-testid="eye-icon">👁️</span>,
  Calendar: () => <span data-testid="calendar-icon">📅</span>,
  User: () => <span data-testid="user-icon">👤</span>,
  Phone: () => <span data-testid="phone-icon">📞</span>,
  Mail: () => <span data-testid="mail-icon">📧</span>
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('LogisticsManagementDashboard', () => {
  beforeEach(() => {
    // Mock window.location.reload
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() },
      writable: true
    });
  });

  test('renders dashboard title and description', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    expect(screen.getByText('Logistics Management Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Monitor shipments, drivers, and carriers in real-time')).toBeInTheDocument();
  });

  test('renders metrics cards', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    expect(screen.getByText('Total Shipments')).toBeInTheDocument();
    expect(screen.getByText('Active Shipments')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });

  test('renders shipments table', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    expect(screen.getByText('Shipments')).toBeInTheDocument();
    expect(screen.getByText('Manage and track all shipments')).toBeInTheDocument();
    expect(screen.getByText('TRK-2024-001')).toBeInTheDocument();
    expect(screen.getByText('TRK-2024-002')).toBeInTheDocument();
  });

  test('renders driver and carrier sections', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    expect(screen.getByText('Active Drivers')).toBeInTheDocument();
    expect(screen.getByText('Carrier Partners')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('FastFreight Express')).toBeInTheDocument();
  });

  test('renders quick actions section', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
    expect(screen.getByText('Common tasks and operations')).toBeInTheDocument();
  });

  test('search functionality works', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    const searchInput = screen.getByPlaceholderText('Search shipments...');
    fireEvent.change(searchInput, { target: { value: 'TRK-2024-001' } });
    
    expect(searchInput).toHaveValue('TRK-2024-001');
  });

  test('add shipment button opens dialog', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    const addButton = screen.getByText('Add Shipment');
    fireEvent.click(addButton);
    
    expect(screen.getByText('Add New Shipment')).toBeInTheDocument();
  });

  test('refresh button calls window.location.reload', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);
    
    expect(window.location.reload).toHaveBeenCalled();
  });

  test('displays correct shipment data', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    // Check for sample shipment data
    expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
    expect(screen.getByText('New York, NY')).toBeInTheDocument();
    expect(screen.getByText('$2,850')).toBeInTheDocument();
  });

  test('displays correct driver data', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('Freightliner Cascadia')).toBeInTheDocument();
  });

  test('displays correct carrier data', () => {
    renderWithRouter(<LogisticsManagementDashboard />);
    
    expect(screen.getByText('FastFreight Express')).toBeInTheDocument();
    expect(screen.getByText('Robert Davis')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
  });
});
