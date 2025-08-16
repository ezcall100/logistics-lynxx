/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';

export interface FinancialsStats {
  overview: {
    totalRevenue: number;
    outstandingInvoices: number;
    monthlyExpenses: number;
    payrollDue: number;
  };
  invoices: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
  recurringInvoices: {
    total: number;
    active: number;
    paused: number;
  };
  customerStatements: {
    total: number;
    sent: number;
    pending: number;
  };
  productsServices: {
    total: number;
    products: number;
    services: number;
  };
  bills: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };
  vendors: {
    total: number;
    active: number;
    inactive: number;
  };
  transactions: {
    total: number;
    categorized: number;
    uncategorized: number;
  };
  reconciliation: {
    pending: number;
    completed: number;
    discrepancies: number;
  };
  chartOfAccounts: {
    total: number;
    assets: number;
    liabilities: number;
    equity: number;
  };
  payroll: {
    pending: number;
    processed: number;
    total: number;
  };
  employees: {
    total: number;
    active: number;
    inactive: number;
  };
  timesheets: {
    pending: number;
    approved: number;
    rejected: number;
  };
  payrollTransactions: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
  taxes: {
    pending: number;
    filed: number;
    overdue: number;
  };
  taxForms: {
    pending: number;
    completed: number;
    submitted: number;
  };
}

export const useFinancialsManagement = () => {
  const [stats, setStats] = useState<FinancialsStats>({
    overview: {
      totalRevenue: 847500,
      outstandingInvoices: 45600,
      monthlyExpenses: 125400,
      payrollDue: 89300
    },
    invoices: {
      total: 156,
      paid: 128,
      pending: 23,
      overdue: 5
    },
    recurringInvoices: {
      total: 34,
      active: 28,
      paused: 6
    },
    customerStatements: {
      total: 89,
      sent: 76,
      pending: 13
    },
    productsServices: {
      total: 245,
      products: 178,
      services: 67
    },
    bills: {
      total: 94,
      paid: 67,
      pending: 22,
      overdue: 5
    },
    vendors: {
      total: 67,
      active: 54,
      inactive: 13
    },
    transactions: {
      total: 1247,
      categorized: 1089,
      uncategorized: 158
    },
    reconciliation: {
      pending: 12,
      completed: 45,
      discrepancies: 3
    },
    chartOfAccounts: {
      total: 156,
      assets: 45,
      liabilities: 23,
      equity: 12
    },
    payroll: {
      pending: 8,
      processed: 156,
      total: 164
    },
    employees: {
      total: 47,
      active: 42,
      inactive: 5
    },
    timesheets: {
      pending: 23,
      approved: 156,
      rejected: 7
    },
    payrollTransactions: {
      total: 456,
      thisMonth: 47,
      lastMonth: 42
    },
    taxes: {
      pending: 6,
      filed: 23,
      overdue: 2
    },
    taxForms: {
      pending: 8,
      completed: 34,
      submitted: 28
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const refreshStats = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return {
    stats,
    isLoading,
    error,
    refreshStats
  };
};
