/* eslint-disable @typescript-eslint/no-explicit-any */

import { Template, Document } from './types';

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Standard Bill of Lading',
    type: 'Document',
    category: 'Shipping',
    lastModified: '2024-01-15',
    status: 'active',
    usage: 245
  },
  {
    id: '2',
    name: 'Rate Confirmation Email',
    type: 'Email',
    category: 'Communications',
    lastModified: '2024-01-14',
    status: 'active',
    usage: 189
  },
  {
    id: '3',
    name: 'Invoice Template - Standard',
    type: 'Invoice',
    category: 'Billing',
    lastModified: '2024-01-12',
    status: 'active',
    usage: 312
  },
  {
    id: '4',
    name: 'Driver Assignment Notice',
    type: 'Email',
    category: 'Operations',
    lastModified: '2024-01-10',
    status: 'draft',
    usage: 0
  },
  {
    id: '5',
    name: 'Delivery Receipt',
    type: 'Document',
    category: 'Shipping',
    lastModified: '2024-01-08',
    status: 'active',
    usage: 156
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Company Insurance Policy',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'John Smith',
    uploadedDate: '2024-01-15',
    category: 'Legal',
    status: 'active'
  },
  {
    id: '2',
    name: 'Operating Authority Certificate',
    type: 'PDF',
    size: '1.8 MB',
    uploadedBy: 'Sarah Johnson',
    uploadedDate: '2024-01-12',
    category: 'Compliance',
    status: 'active'
  },
  {
    id: '3',
    name: 'Safety Manual 2024',
    type: 'PDF',
    size: '5.2 MB',
    uploadedBy: 'Mike Davis',
    uploadedDate: '2024-01-10',
    category: 'Safety',
    status: 'active'
  },
  {
    id: '4',
    name: 'Drug Testing Policy',
    type: 'DOC',
    size: '890 KB',
    uploadedBy: 'Lisa Chen',
    uploadedDate: '2024-01-08',
    category: 'HR',
    status: 'pending'
  },
  {
    id: '5',
    name: 'Equipment Lease Agreement',
    type: 'PDF',
    size: '1.2 MB',
    uploadedBy: 'Alex Wilson',
    uploadedDate: '2023-12-20',
    category: 'Legal',
    status: 'expired'
  }
];
