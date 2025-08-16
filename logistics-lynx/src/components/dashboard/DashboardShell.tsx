/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Shield, Eye } from "lucide-react";

interface DashboardShellProps {
  title: string;
  children: React.ReactNode;
  portalKey?: string;
}

export default function DashboardShell({ title, children, portalKey }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 backdrop-blur border-b bg-background/80">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">{title}</h1>
            {portalKey && (
              <Badge variant="outline" className="text-xs">
                {portalKey}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span>Autonomous</span>
            <span>•</span>
            <Eye className="h-4 w-4" />
            <span>Observable</span>
            <span>•</span>
            <Shield className="h-4 w-4" />
            <span>Accessible</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4">
        <div className="grid gap-4 md:grid-cols-12">
          {children}
        </div>
      </main>
    </div>
  );
}

// Grid helper component
export function Cell({ 
  span = "1x1", 
  children 
}: {
  span?: "1x1" | "2x1" | "1x2" | "2x2";
  children: React.ReactNode;
}) {
  const cls = {
    "1x1": "md:col-span-3",
    "2x1": "md:col-span-6", 
    "1x2": "md:col-span-3 md:row-span-2",
    "2x2": "md:col-span-6 md:row-span-2"
  }[span];
  
  return (
    <div className={cls}>
      <Card className="p-4 h-full">
        {children}
      </Card>
    </div>
  );
}
