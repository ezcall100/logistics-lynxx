import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  isLoading?: boolean;
}

export function KpiCard({ title, value, delta, deltaType = "neutral", isLoading = false }: KpiCardProps) {
  const getDeltaIcon = () => {
    if (deltaType === "positive") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (deltaType === "negative") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getDeltaColor = () => {
    if (deltaType === "positive") return "text-green-600";
    if (deltaType === "negative") return "text-red-600";
    return "text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        {delta && <div className="h-3 bg-gray-200 rounded animate-pulse"></div>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground font-medium">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
      {delta && (
        <div className={`flex items-center gap-1 text-xs ${getDeltaColor()}`}>
          {getDeltaIcon()}
          <span>{delta}</span>
        </div>
      )}
    </div>
  );
}
