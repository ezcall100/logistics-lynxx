import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Column {
  key: string;
  label: string;
  width?: number;
}

interface TableCardProps {
  title: string;
  data: Array<Record<string, any>>;
  columns: Column[];
  isLoading?: boolean;
}

export function TableCard({ title, data, columns, isLoading = false }: TableCardProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const renderCell = (value: any, columnKey: string) => {
    if (typeof value === "boolean") {
      return (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "Yes" : "No"}
        </Badge>
      );
    }
    
    if (columnKey.includes("status")) {
      const statusColors = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        pending: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800"
      };
      const color = statusColors[value as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
      return <Badge className={color}>{value}</Badge>;
    }
    
    return value;
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground font-medium">{title}</div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.key}
                  style={{ width: column.width ? `${column.width}px` : "auto" }}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-muted-foreground py-8">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {renderCell(row[column.key], column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
