/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, Receipt, Fuel, Wrench, Shield, DollarSign } from 'lucide-react';

const ExpenseManagementPage = () => {
  const expenses = [
    { category: 'Fuel', amount: 2845, percentage: 42, icon: Fuel },
    { category: 'Maintenance', amount: 890, percentage: 13, icon: Wrench },
    { category: 'Insurance', amount: 650, percentage: 10, icon: Shield },
    { category: 'Other', amount: 1215, percentage: 18, icon: Receipt }
  ];

  const recentExpenses = [
    { date: '2024-01-15', description: 'Fuel - Pilot Flying J', amount: 285.50, category: 'Fuel' },
    { date: '2024-01-14', description: 'Oil Change Service', amount: 125.00, category: 'Maintenance' },
    { date: '2024-01-12', description: 'Truck Wash', amount: 35.00, category: 'Other' },
    { date: '2024-01-10', description: 'Insurance Premium', amount: 325.00, category: 'Insurance' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expense Management</h1>
        <p className="text-muted-foreground">Track and categorize your business expenses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {expenses.map((expense, index) => {
          const IconComponent = expense.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{expense.category}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${expense.amount}</div>
                <p className="text-xs text-muted-foreground">{expense.percentage}% of total</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Quick Expense Entry
            </CardTitle>
            <CardDescription>Add a new expense quickly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input className="w-full pl-10 pr-3 py-2 border rounded-md" placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Fuel</option>
                  <option>Maintenance</option>
                  <option>Insurance</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <input className="w-full p-2 border rounded-md" placeholder="Expense description" />
            </div>
            <Button className="w-full">Add Expense</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Recent Expenses
            </CardTitle>
            <CardDescription>Your latest expense entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentExpenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.date} • {expense.category}</p>
                  </div>
                  <p className="font-bold">${expense.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseManagementPage;