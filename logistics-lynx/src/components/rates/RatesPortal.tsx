import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RateFormDialog from './RateFormDialog';
import RateFilters from './RateFilters';
import { DateRange } from 'react-day-picker';

export default function RatesPortal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const [rateDialogMode, setRateDialogMode] = useState<'add' | 'edit'>('add');
  const [rateDialogType, setRateDialogType] = useState<'buy' | 'sell'>('buy');

  const activeFiltersCount = [
    searchTerm,
    selectedMode !== 'all',
    selectedEquipment !== 'all',
    dateRange
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedMode('all');
    setSelectedEquipment('all');
    setDateRange(undefined);
  };

  const handleSaveRate = (data: any) => {
    console.log('Saving rate:', data);
    setIsRateDialogOpen(false);
  };
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rates Portal</h1>
          <p className="text-muted-foreground">
            Manage freight rates, quotes, and pricing strategies
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rate Management</CardTitle>
            <CardDescription>
              View and manage your freight rates and pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RateFilters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
              selectedEquipment={selectedEquipment}
              onEquipmentChange={setSelectedEquipment}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              onClearFilters={handleClearFilters}
              activeFiltersCount={activeFiltersCount}
            />
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Rate management features coming soon...
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common rate-related tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <RateFormDialog 
                open={isRateDialogOpen}
                onOpenChange={setIsRateDialogOpen}
                mode={rateDialogMode}
                type={rateDialogType}
                onSave={handleSaveRate}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
