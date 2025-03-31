import { useState } from 'react';
import { 
  calculateTax, 
  TaxInput, 
  TaxResult, 
  validateTaxData, 
  isDataValid,
  checkBusinessCompliance,
  generateComplianceReport,
  DocumentProcessingService,
} from '@/services';
import AuditTrailService from '@/services/AuditTrailService';
import { ProcessedDocument } from '@/services/DocumentProcessingService';

type ActionType = Parameters<typeof AuditTrailService.prototype.logAction>[1];

interface TaxServicesHookResult {
  calculateTaxes: (input: TaxInput) => TaxResult;
  validateData: (data: any) => { valid: boolean; validationResults: any[] };
  checkCompliance: (data: any, businessType: string) => any;
  generateReport: (data: any, businessType: string) => any;
  logAction: (userId: string, action: ActionType, details: any) => void;
  processDocuments: (files: File[]) => Promise<ProcessedDocument[]>;
  generateTaxFromDocuments: (documents: ProcessedDocument[]) => TaxResult | null;
  results: TaxResult | null;
  isValid: boolean;
  validationResults: any[];
  complianceResults: any;
  processedDocuments: ProcessedDocument[];
}

export const useTaxServices = (userId: string = 'guest'): TaxServicesHookResult => {
  const [results, setResults] = useState<TaxResult | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [complianceResults, setComplianceResults] = useState<any>(null);
  const [processedDocuments, setProcessedDocuments] = useState<ProcessedDocument[]>([]);
  
  const auditService = AuditTrailService.getInstance();
  const docProcessingService = DocumentProcessingService.getInstance();

  const calculateTaxes = (input: TaxInput) => {
    const taxResults = calculateTax(input);
    setResults(taxResults);
    
    auditService.logAction(
      userId, 
      'tax_calculation', 
      { input, results: taxResults }
    );
    
    return taxResults;
  };
  
  const validateData = (data: any) => {
    const results = validateTaxData(data);
    const valid = isDataValid(data);
    
    setValidationResults(results);
    setIsValid(valid);
    
    auditService.logAction(
      userId, 
      'data_validation', 
      { data, validationResults: results, isValid: valid }
    );
    
    return { valid, validationResults: results };
  };
  
  const checkCompliance = (data: any, businessType: string) => {
    const complianceCheck = checkBusinessCompliance(data, businessType);
    setComplianceResults(complianceCheck);
    
    auditService.logAction(
      userId, 
      'compliance_check', 
      { data, businessType, complianceResults: complianceCheck }
    );
    
    return complianceCheck;
  };
  
  const generateReport = (data: any, businessType: string) => {
    const report = generateComplianceReport(data, businessType);
    
    auditService.logAction(
      userId, 
      'report_generation', 
      { data, businessType, report }
    );
    
    return report;
  };
  
  const logAction = (userId: string, action: ActionType, details: any) => {
    auditService.logAction(
      userId,
      action,
      details
    );
  };
  
  const processDocuments = async (files: File[]) => {
    const processed = await docProcessingService.processMultipleDocuments(files);
    
    setProcessedDocuments(processed);
    
    auditService.logAction(
      userId,
      'document_processing',
      { fileCount: files.length, processedDocuments: processed }
    );
    
    return processed;
  };
  
  const generateTaxFromDocuments = (documents: ProcessedDocument[]) => {
    const taxResults = docProcessingService.generateTaxResultFromDocuments(documents);
    
    if (taxResults) {
      setResults(taxResults);
      
      auditService.logAction(
        userId,
        'ai_tax_calculation',
        { documentCount: documents.length, results: taxResults }
      );
    }
    
    return taxResults;
  };
  
  return {
    calculateTaxes,
    validateData,
    checkCompliance,
    generateReport,
    logAction,
    processDocuments,
    generateTaxFromDocuments,
    results,
    isValid,
    validationResults,
    complianceResults,
    processedDocuments
  };
};
