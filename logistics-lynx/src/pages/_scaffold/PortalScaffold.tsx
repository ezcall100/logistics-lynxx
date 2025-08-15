import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Construction, 
  Settings, 
  Users, 
  BarChart3, 
  Activity,
  ArrowLeft,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PortalScaffoldProps {
  title: string;
  portalKey?: string;
  description?: string;
  features?: string[];
}

export default function PortalScaffold({ title = "Portal" }: { title?: string }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-muted-foreground">This portal is provisioned and protected. Build out features here.</p>
    </div>
  );
}
