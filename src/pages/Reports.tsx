
import React, { useState } from 'react';
import { FileText, Calendar, Download, Printer, Eye, Plus } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useTaxServices } from '@/hooks/useTaxServices';
import ReportService, { Report } from '@/services/ReportService';
import CustomReportRequestDialog from '@/components/CustomReportRequestDialog';
import ReportDetailDialog from '@/components/ReportDetailDialog';

const Reports = () => {
  const reportService = ReportService.getInstance();
  const [reports, setReports] = useState<Report[]>(reportService.getReports());
  const [reportFilter, setReportFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  
  const queryClient = useQueryClient();
  const { results: latestTaxResults } = useTaxServices();
  
  // Filter reports based on selected filters
  const filteredReports = reports.filter(report => {
    // Filter by report type
    const matchesType = reportFilter === 'all' || report.type === reportFilter;
    
    // Filter by date range
    let matchesDate = true;
    const reportDate = new Date(report.date);
    const now = new Date();
    
    if (dateFilter === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      matchesDate = reportDate >= thirtyDaysAgo;
    } else if (dateFilter === 'last90') {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(now.getDate() - 90);
      matchesDate = reportDate >= ninetyDaysAgo;
    } else if (dateFilter === 'lastyear') {
      const lastYear = new Date();
      lastYear.setFullYear(now.getFullYear() - 1);
      matchesDate = reportDate >= lastYear;
    }
    
    return matchesType && matchesDate;
  });

  const handleDownload = (report: Report) => {
    // In a real application, this would initiate a download
    toast({
      title: "Download Started",
      description: `${report.title} is being downloaded.`,
    });
  };

  const handlePrint = (report: Report) => {
    // In a real application, this would open a print dialog
    toast({
      title: "Preparing for Print",
      description: `${report.title} is being prepared for printing.`,
    });
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsDetailDialogOpen(true);
  };

  const handleGenerateReport = (type: Report['type']) => {
    if (!latestTaxResults) {
      toast({
        title: "No Tax Data Available",
        description: "Please perform a tax calculation first before generating a report.",
        variant: "destructive"
      });
      return;
    }

    const newReport = reportService.generateReportFromTaxResults(latestTaxResults, type);
    setReports(current => [newReport, ...current]);
    
    toast({
      title: "Report Generated",
      description: `Your ${type} report has been created successfully.`,
    });
  };

  const handleCustomReportRequest = (data: {
    title: string;
    description: string;
    type: Report['type'];
    additionalInfo?: string;
  }) => {
    const newReport = reportService.requestCustomReport(data);
    setReports(current => [newReport, ...current]);
    
    toast({
      title: "Custom Report Requested",
      description: "Your custom report request has been submitted.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Reports</h1>
          <p className="text-muted-foreground mt-2">
            View and download your tax reports and statements
          </p>
        </div>
        <FileText size={48} className="text-primary opacity-80" />
      </div>

      {/* Generate Report Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>
            Create a new tax report based on your latest calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => handleGenerateReport('annual')} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Annual Report
            </Button>
            <Button onClick={() => handleGenerateReport('quarterly')} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Quarterly Report
            </Button>
            <Button onClick={() => handleGenerateReport('monthly')} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Monthly Report
            </Button>
            <Button onClick={() => setIsRequestDialogOpen(true)} variant="default">
              <Plus className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>
            Filter your reports by type and date
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportFilter} onValueChange={setReportFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reports</SelectItem>
                  <SelectItem value="annual">Annual Reports</SelectItem>
                  <SelectItem value="quarterly">Quarterly Statements</SelectItem>
                  <SelectItem value="monthly">Monthly Statements</SelectItem>
                  <SelectItem value="custom">Custom Reports</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="last30">Last 30 Days</SelectItem>
                  <SelectItem value="last90">Last 90 Days</SelectItem>
                  <SelectItem value="lastyear">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            {filteredReports.length} reports found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      <div>
                        {report.title}
                        <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{report.type}</TableCell>
                    <TableCell>{report.status === 'pending' ? 'Pending' : report.size}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="icon"
                          variant="ghost"
                          onClick={() => handleViewReport(report)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => handleDownload(report)}
                          title="Download"
                          disabled={report.status === 'pending'}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => handlePrint(report)}
                          title="Print"
                          disabled={report.status === 'pending'}
                        >
                          <Printer className="h-4 w-4" />
                          <span className="sr-only">Print</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileText size={32} className="mb-2" />
                      <p>No reports match the selected filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableCaption>
              Reports are updated at the end of each reporting period.
            </TableCaption>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Need a custom report? Click the button to request one.
          </p>
          <Button 
            variant="outline" 
            className="ml-auto"
            onClick={() => setIsRequestDialogOpen(true)}
          >
            Request Custom Report
          </Button>
        </CardFooter>
      </Card>

      {/* Custom Report Request Dialog */}
      <CustomReportRequestDialog
        open={isRequestDialogOpen}
        onOpenChange={setIsRequestDialogOpen}
        onSubmit={handleCustomReportRequest}
      />

      {/* Report Detail Dialog */}
      <ReportDetailDialog
        report={selectedReport}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        onDownload={handleDownload}
        onPrint={handlePrint}
      />
    </div>
  );
};

export default Reports;
