
import React, { useState } from 'react';
import { FileText, Calendar, Download, Printer } from 'lucide-react';
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

// Sample report data - in a real application, this would come from an API or database
const SAMPLE_REPORTS = [
  { 
    id: '1',
    title: 'Annual Tax Summary',
    description: 'Comprehensive tax summary for the fiscal year 2023',
    date: '2023-12-31',
    type: 'annual',
    status: 'finalized',
    downloadUrl: '#',
    size: '1.2 MB'
  },
  { 
    id: '2',
    title: 'Q4 GST Statement',
    description: 'GST statement for October-December 2023',
    date: '2023-12-15',
    type: 'quarterly',
    status: 'finalized',
    downloadUrl: '#',
    size: '852 KB'
  },
  { 
    id: '3',
    title: 'Monthly Business Activity Statement',
    description: 'November 2023 business activity report',
    date: '2023-11-30',
    type: 'monthly',
    status: 'finalized',
    downloadUrl: '#',
    size: '645 KB'
  },
  { 
    id: '4',
    title: 'Tax Deductions Schedule',
    description: 'Detailed breakdown of all tax deductions claimed for 2023',
    date: '2023-12-10',
    type: 'annual',
    status: 'finalized',
    downloadUrl: '#',
    size: '920 KB'
  },
  { 
    id: '5',
    title: 'Q3 GST Statement',
    description: 'GST statement for July-September 2023',
    date: '2023-09-30',
    type: 'quarterly',
    status: 'finalized',
    downloadUrl: '#',
    size: '814 KB'
  },
];

const Reports = () => {
  const [reportFilter, setReportFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  
  // Filter reports based on selected filters
  const filteredReports = SAMPLE_REPORTS.filter(report => {
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

  const handleDownload = (reportId: string, reportTitle: string) => {
    // In a real application, this would initiate a download
    toast({
      title: "Download Started",
      description: `${reportTitle} is being downloaded.`,
    });
  };

  const handlePrint = (reportId: string, reportTitle: string) => {
    // In a real application, this would open a print dialog
    toast({
      title: "Preparing for Print",
      description: `${reportTitle} is being prepared for printing.`,
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
                    <TableCell>{report.size}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownload(report.id, report.title)}
                          className="flex items-center gap-1"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:inline-block">Download</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handlePrint(report.id, report.title)}
                          className="flex items-center gap-1"
                        >
                          <Printer className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:inline-block">Print</span>
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
            Need a custom report? Contact our support team.
          </p>
          <Button variant="outline" className="ml-auto">
            Request Custom Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Reports;
