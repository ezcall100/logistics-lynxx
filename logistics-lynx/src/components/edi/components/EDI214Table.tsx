/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Zap, Truck, Calendar } from 'lucide-react';
import { getStatusBadge } from '../utils/ediUtils';
import { edi214Data } from '../data/ediData';

interface EDI214TableProps {
  onMatch: (id: number) => void;
}

export const EDI214Table: React.FC<EDI214TableProps> = ({ onMatch }) => {
  return (
    <Card className="glass border-0 shadow-premium overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-900/20 dark:to-amber-900/20 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
            <Truck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-foreground">EDI 214 - Status Updates</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Track shipment status updates and delivery confirmations
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 bg-muted/30">
                <TableHead className="font-semibold text-foreground pl-6">Document #</TableHead>
                <TableHead className="font-semibold text-foreground">Partner</TableHead>
                <TableHead className="font-semibold text-foreground">Load #</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Delivery Date
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">Matched With</TableHead>
                <TableHead className="font-semibold text-foreground pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {edi214Data.map((item, index) => (
                <TableRow 
                  key={item.id} 
                  className={`border-border/60 hover:bg-muted/30 transition-all duration-200 group ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                  }`}
                >
                  <TableCell className="font-mono text-sm font-medium text-foreground pl-6">
                    {item.documentNumber}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{item.partner}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{item.loadNumber}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.deliveryDate ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {item.deliveryDate}
                      </div>
                    ) : (
                      <span className="text-muted-foreground/50 italic">Pending</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {item.matchedWith || (
                      <span className="text-muted-foreground/50 italic">No match</span>
                    )}
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 w-8 p-0 rounded-lg border-border/60 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 group"
                      >
                        <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
                      </Button>
                      {!item.matchedWith && (
                        <Button 
                          size="sm" 
                          onClick={() => onMatch(item.id)}
                          className="h-8 px-3 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all duration-200 font-medium group btn-premium"
                        >
                          <Zap className="h-3 w-3 mr-1 transition-transform group-hover:scale-110" />
                          Match
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
