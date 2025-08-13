
export interface Template {
  id: string;
  name: string;
  type: string;
  category: string;
  lastModified: string;
  status: 'active' | 'draft' | 'archived';
  usage: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  category: string;
  status: 'active' | 'pending' | 'expired';
}
