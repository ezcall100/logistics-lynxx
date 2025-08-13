
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
import { Eye, Zap, FileText, DollarSign } from 'lucide-react';
import { getStatusBadge } from '../utils/ediUtils';
import { edi210Data } from '../data/ediData';

interface EDI210TableProps {
  selectedItems: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (id: number, checked: boolean) => void;
  onMatch: (id: number) => void;
}

export const EDI210Table: React.FC<EDI210TableProps> = ({
  selectedItems,
  onSelectAll,
  onSelectItem,
  onMatch
}) => {
  const allSelected = selectedItems.length === edi210Data.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < edi210Data.length;

  return (
    <Card className="glass border-0 shadow-premium overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-foreground">EDI 210 - Invoice Documents</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Manage and match invoice documents with status updates
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 bg-muted/30">
                <TableHead className="w-12 pl-6">
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      checked={allSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = someSelected;
                      }}
                      onChange={(e) => onSelectAll(e.target.checked)}
                      className="h-4 w-4 rounded border-border/60 text-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                    />
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">Document #</TableHead>
                <TableHead className="font-semibold text-foreground">Partner</TableHead>
                <TableHead className="font-semibold text-foreground">Load #</TableHead>
                <TableHead className="font-semibold text-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    Amount
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-foreground">Date</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground">Matched With</TableHead>
                <TableHead className="font-semibold text-foreground pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {edi210Data.map((item, index) => (
                <TableRow 
                  key={item.id} 
                  className={`border-border/60 hover:bg-muted/30 transition-all duration-200 group ${
                    index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                  }`}
                >
                  <TableCell className="pl-6">
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => onSelectItem(item.id, e.target.checked)}
                      className="h-4 w-4 rounded border-border/60 text-primary focus:ring-primary/20 focus:ring-2 transition-all duration-200"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm font-medium text-foreground">
                    {item.documentNumber}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{item.partner}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{item.loadNumber}</TableCell>
                  <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">
                    ${item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.date}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                      {item.status !== 'matched' && (
                        <Button 
                          size="sm" 
                          onClick={() => onMatch(item.id)}
                          className="h-8 px-3 rounded-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md hover:shadow-lg transition-all duration-200 font-medium group btn-premium"
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
