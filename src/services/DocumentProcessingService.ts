
/**
 * Document Processing Service for Papua New Guinea
 * Handles AI processing of uploaded tax documents
 */

import { TaxResult } from './TaxCalculationService';
import { validateTaxData } from './TaxValidationService';

export interface ProcessedDocument {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  extractedData?: ExtractedTaxData;
  processingErrors?: string[];
}

export interface ExtractedTaxData {
  businessType?: 'sole_proprietor' | 'partnership' | 'company' | 'sme';
  annualRevenue?: number;
  expenses?: number;
  hasGstRegistration?: boolean;
  industry?: string;
  additionalFields?: Record<string, any>;
}

class DocumentProcessingService {
  private static instance: DocumentProcessingService;
  private processedDocuments: ProcessedDocument[] = [];

  private constructor() {}

  public static getInstance(): DocumentProcessingService {
    if (!DocumentProcessingService.instance) {
      DocumentProcessingService.instance = new DocumentProcessingService();
    }
    return DocumentProcessingService.instance;
  }

  public async processDocument(file: File): Promise<ProcessedDocument> {
    // Create a new document record
    const newDocument: ProcessedDocument = {
      id: `doc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fileName: file.name,
      fileType: file.type,
      uploadDate: new Date().toISOString(),
      processingStatus: 'pending'
    };

    this.processedDocuments.push(newDocument);

    // Simulate AI processing
    try {
      newDocument.processingStatus = 'processing';
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Extract data based on file type
      const extractedData = await this.extractDataFromDocument(file);
      
      newDocument.extractedData = extractedData;
      newDocument.processingStatus = 'completed';
    } catch (error) {
      newDocument.processingStatus = 'failed';
      newDocument.processingErrors = [(error as Error).message];
    }

    return newDocument;
  }

  public async processMultipleDocuments(files: File[]): Promise<ProcessedDocument[]> {
    const processPromises = files.map(file => this.processDocument(file));
    return Promise.all(processPromises);
  }

  private async extractDataFromDocument(file: File): Promise<ExtractedTaxData> {
    // Simulate AI extraction based on file type
    // In a real implementation, this would use actual AI models for text extraction
    
    // For demo purposes, we'll generate plausible random data
    const extractedData: ExtractedTaxData = {
      businessType: this.getRandomBusinessType(),
      annualRevenue: Math.floor(Math.random() * 1000000) + 50000,
      expenses: Math.floor(Math.random() * 500000) + 20000,
      hasGstRegistration: Math.random() > 0.5,
      industry: this.getRandomIndustry(),
      additionalFields: {
        employeeCount: Math.floor(Math.random() * 50),
        foreignTransactions: Math.random() > 0.7,
      }
    };
    
    // Validate the extracted data
    validateTaxData(extractedData);
    
    return extractedData;
  }

  public getProcessedDocuments(): ProcessedDocument[] {
    return [...this.processedDocuments];
  }

  public getDocumentById(id: string): ProcessedDocument | undefined {
    return this.processedDocuments.find(doc => doc.id === id);
  }

  public generateTaxResultFromDocuments(documents: ProcessedDocument[]): TaxResult | null {
    const completedDocuments = documents.filter(doc => 
      doc.processingStatus === 'completed' && doc.extractedData
    );
    
    if (completedDocuments.length === 0) return null;
    
    // Aggregate data from all documents
    // This is a simplified implementation
    let totalRevenue = 0;
    let totalExpenses = 0;
    let hasGstRegistration = false;
    let businessType = 'sole_proprietor' as 'sole_proprietor' | 'partnership' | 'company' | 'sme';
    
    completedDocuments.forEach(doc => {
      if (doc.extractedData) {
        totalRevenue += doc.extractedData.annualRevenue || 0;
        totalExpenses += doc.extractedData.expenses || 0;
        hasGstRegistration = hasGstRegistration || (doc.extractedData.hasGstRegistration || false);
        
        if (doc.extractedData.businessType) {
          businessType = doc.extractedData.businessType;
        }
      }
    });
    
    // Import the calculation function
    const { calculateTax } = require('./TaxCalculationService');
    
    // Generate tax result
    return calculateTax({
      businessType,
      annualRevenue: totalRevenue,
      expenses: totalExpenses,
      hasGstRegistration,
      industry: completedDocuments[0]?.extractedData?.industry || 'general'
    });
  }
  
  private getRandomBusinessType(): 'sole_proprietor' | 'partnership' | 'company' | 'sme' {
    const types = ['sole_proprietor', 'partnership', 'company', 'sme'];
    return types[Math.floor(Math.random() * types.length)] as 'sole_proprietor' | 'partnership' | 'company' | 'sme';
  }
  
  private getRandomIndustry(): string {
    const industries = ['retail', 'services', 'manufacturing', 'construction', 'agriculture', 'mining', 'general'];
    return industries[Math.floor(Math.random() * industries.length)];
  }
}

export default DocumentProcessingService;
