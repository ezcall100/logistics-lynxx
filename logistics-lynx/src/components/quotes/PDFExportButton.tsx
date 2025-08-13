
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PDFExportButtonProps {
  quotes: unknown[];
  title?: string;
  includeCharts?: boolean;
  className?: string;
}

export const PDFExportButton: React.FC<PDFExportButtonProps> = ({
  quotes,
  title = 'Quote Analysis Report',
  includeCharts = true,
  className
}) => {
  const { toast } = useToast();

  const generatePDFReport = async () => {
    try {
      // Create HTML content for PDF
      const htmlContent = generateHTMLReport(quotes, title, includeCharts);
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Popup blocked');
      }

      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
      // Wait for content to load, then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      };

      toast({
        title: "PDF Export Started",
        description: "Your report is being generated. A print dialog will open shortly.",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "Unable to generate PDF report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateHTMLReport = (quotes: unknown[], title: string, includeCharts: boolean): string => {
    const currentDate = new Date().toLocaleDateString();
    const totalQuotes = quotes.length;
    const avgAmount = quotes.reduce((sum, q) => sum + q.amount, 0) / totalQuotes;
    const statusCounts = quotes.reduce((acc, q) => {
      acc[q.status] = (acc[q.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            line-height: 1.6;
            color: #333;
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
        }
        .summary { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 30px;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        .summary-item {
            text-align: center;
        }
        .summary-value {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
        }
        .summary-label {
            color: #6b7280;
            font-size: 14px;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px;
        }
        th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left;
        }
        th { 
            background-color: #f8f9fa; 
            font-weight: bold;
        }
        .status-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
        }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-approved { background: #d1fae5; color: #065f46; }
        .status-declined { background: #fee2e2; color: #991b1b; }
        .status-expired { background: #f3f4f6; color: #374151; }
        .footer {
            margin-top: 40px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${title}</h1>
        <p>Generated on ${currentDate}</p>
    </div>
    
    <div class="summary">
        <h2>Executive Summary</h2>
        <div class="summary-grid">
            <div class="summary-item">
                <div class="summary-value">${totalQuotes}</div>
                <div class="summary-label">Total Quotes</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">$${avgAmount.toLocaleString()}</div>
                <div class="summary-label">Average Quote Value</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${statusCounts.approved || 0}</div>
                <div class="summary-label">Approved Quotes</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${statusCounts.pending || 0}</div>
                <div class="summary-label">Pending Quotes</div>
            </div>
        </div>
    </div>

    <h2>Quote Details</h2>
    <table>
        <thead>
            <tr>
                <th>Quote Number</th>
                <th>Customer</th>
                <th>Route</th>
                <th>Load Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>AI Confidence</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            ${quotes.map(quote => `
                <tr>
                    <td>${quote.quoteNumber}</td>
                    <td>${quote.customer}</td>
                    <td>${quote.origin} → ${quote.destination}</td>
                    <td>${quote.loadType}</td>
                    <td>$${quote.amount.toLocaleString()}</td>
                    <td><span class="status-badge status-${quote.status}">${quote.status.toUpperCase()}</span></td>
                    <td>${quote.aiConfidence}%</td>
                    <td>${new Date(quote.date).toLocaleDateString()}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="footer">
        <p>This report was generated by the Autonomous TMS Quote Management System</p>
        <p>For questions or support, please contact your system administrator</p>
    </div>
</body>
</html>`;
  };

  return (
    <Button 
      onClick={generatePDFReport}
      className={className}
      variant="outline"
    >
      <FileText className="h-4 w-4 mr-2" />
      Export PDF Report
    </Button>
  );
};
