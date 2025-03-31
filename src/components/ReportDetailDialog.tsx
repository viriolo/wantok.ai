
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileCog } from 'lucide-react';
import type { Report } from '@/services/ReportService';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ReportDetailDialogProps {
  report: Report | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (report: Report) => void;
  onPrint: (report: Report) => void;
}

export function ReportDetailDialog({
  report,
  open,
  onOpenChange,
  onDownload,
  onPrint
}: ReportDetailDialogProps) {
  if (!report) {
    return null;
  }

  const formattedDate = new Date(report.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getStatusBadge = (status: Report['status']) => {
    switch(status) {
      case 'draft':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Draft</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
      case 'finalized':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Finalized</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{report.title}</DialogTitle>
            {getStatusBadge(report.status)}
          </div>
          <DialogDescription>
            {report.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Report Type:</span>
              <span className="ml-2 capitalize">{report.type}</span>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Date Generated:</span>
              <span className="ml-2">{formattedDate}</span>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Size:</span>
              <span className="ml-2">{report.size}</span>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">ID:</span>
              <span className="ml-2">{report.id}</span>
            </div>
          </div>

          <Separator />

          {report.taxResults ? (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Tax Calculation Summary</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">Taxable Income:</span>
                    <span className="font-semibold">{report.taxResults.taxableIncome.toLocaleString()} PGK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">Income Tax:</span>
                    <span className="font-semibold">{report.taxResults.incomeTax.toLocaleString()} PGK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">GST Payable:</span>
                    <span className="font-semibold">{report.taxResults.gstPayable.toLocaleString()} PGK</span>
                  </div>
                  
                  <div className="h-px w-full bg-border my-4" />
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">Total Tax Liability:</span>
                    <span className="font-bold text-lg">{report.taxResults.totalTaxLiability.toLocaleString()} PGK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">Effective Tax Rate:</span>
                    <span className="font-semibold">{(report.taxResults.effectiveTaxRate * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <FileCog className="mx-auto h-12 w-12 mb-2 opacity-80" />
              <p>No detailed tax data available for this report.</p>
              <p className="text-sm mt-1">This may be a custom report or historical data.</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-auto"
              onClick={() => report && onPrint(report)}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button 
              variant="default" 
              className="flex-1 sm:flex-auto"
              onClick={() => report && onDownload(report)}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReportDetailDialog;
