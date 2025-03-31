
import { TaxResult } from './TaxCalculationService';

export interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'annual' | 'quarterly' | 'monthly' | 'custom';
  status: 'draft' | 'pending' | 'finalized';
  downloadUrl: string;
  size: string;
  taxResults?: TaxResult;
}

// Sample reports for demonstration
const SAMPLE_REPORTS: Report[] = [
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

export class ReportService {
  private static instance: ReportService;
  private reports: Report[] = SAMPLE_REPORTS;

  private constructor() {}

  public static getInstance(): ReportService {
    if (!ReportService.instance) {
      ReportService.instance = new ReportService();
    }
    return ReportService.instance;
  }

  public getReports(): Report[] {
    return [...this.reports];
  }

  public getReportById(id: string): Report | undefined {
    return this.reports.find(report => report.id === id);
  }

  public createReport(report: Omit<Report, 'id'>): Report {
    const newReport = {
      ...report,
      id: `report-${Date.now()}`,
    };
    this.reports.unshift(newReport);
    return newReport;
  }

  public generateReportFromTaxResults(taxResults: TaxResult, type: Report['type']): Report {
    const date = new Date();
    
    let title = '';
    let description = '';
    
    switch(type) {
      case 'annual':
        title = `Annual Tax Summary ${date.getFullYear()}`;
        description = `Comprehensive tax summary for the fiscal year ${date.getFullYear()}`;
        break;
      case 'quarterly':
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        title = `Q${quarter} Tax Statement ${date.getFullYear()}`;
        description = `Quarterly tax statement for Q${quarter} ${date.getFullYear()}`;
        break;
      case 'monthly':
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                            'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[date.getMonth()];
        title = `${month} Business Activity Statement`;
        description = `Monthly business activity report for ${month} ${date.getFullYear()}`;
        break;
      case 'custom':
        title = `Custom Tax Report`;
        description = `Custom tax report generated on ${date.toLocaleDateString()}`;
        break;
    }

    const fileSize = `${(Math.random() * 0.8 + 0.4).toFixed(2)} MB`;
    
    return this.createReport({
      title,
      description,
      date: date.toISOString().split('T')[0],
      type,
      status: 'finalized',
      downloadUrl: '#',
      size: fileSize,
      taxResults
    });
  }

  public requestCustomReport(details: { 
    title: string; 
    description: string; 
    type: Report['type']; 
    additionalInfo?: string;
  }): Report {
    return this.createReport({
      title: details.title,
      description: details.description,
      date: new Date().toISOString().split('T')[0],
      type: details.type,
      status: 'pending',
      downloadUrl: '#',
      size: 'Pending'
    });
  }
}

export default ReportService;
