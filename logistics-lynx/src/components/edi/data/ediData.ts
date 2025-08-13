
export const edi210Data = [
  {
    id: 1,
    documentNumber: 'EDI210-001',
    partner: 'ABC Logistics',
    loadNumber: 'LD001234',
    amount: 2450.00,
    date: '2024-06-17',
    status: 'matched',
    matchedWith: 'EDI214-001'
  },
  {
    id: 2,
    documentNumber: 'EDI210-002',
    partner: 'XYZ Transport',
    loadNumber: 'LD001235',
    amount: 1890.50,
    date: '2024-06-17',
    status: 'pending',
    matchedWith: null
  },
  {
    id: 3,
    documentNumber: 'EDI210-003',
    partner: 'Global Freight',
    loadNumber: 'LD001236',
    amount: 3200.00,
    date: '2024-06-16',
    status: 'unmatched',
    matchedWith: null
  },
  {
    id: 4,
    documentNumber: 'EDI210-004',
    partner: 'Swift Delivery',
    loadNumber: 'LD001237',
    amount: 1650.75,
    date: '2024-06-16',
    status: 'matched',
    matchedWith: 'EDI214-004'
  }
];

export const edi214Data = [
  {
    id: 1,
    documentNumber: 'EDI214-001',
    partner: 'ABC Logistics',
    loadNumber: 'LD001234',
    status: 'delivered',
    deliveryDate: '2024-06-16',
    matchedWith: 'EDI210-001'
  },
  {
    id: 2,
    documentNumber: 'EDI214-002',
    partner: 'XYZ Transport',
    loadNumber: 'LD001235',
    status: 'in_transit',
    deliveryDate: null,
    matchedWith: null
  },
  {
    id: 3,
    documentNumber: 'EDI214-003',
    partner: 'Global Freight',
    loadNumber: 'LD001238',
    status: 'delivered',
    deliveryDate: '2024-06-15',
    matchedWith: null
  },
  {
    id: 4,
    documentNumber: 'EDI214-004',
    partner: 'Swift Delivery',
    loadNumber: 'LD001237',
    status: 'delivered',
    deliveryDate: '2024-06-16',
    matchedWith: 'EDI210-004'
  }
];
