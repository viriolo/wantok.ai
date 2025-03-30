
import { useState } from 'react';
import { 
  calculateTax, 
  TaxInput, 
  TaxResult, 
  validateTaxData, 
  isDataValid,
  checkBusinessCompliance,
  generateComplianceReport
} from '@/services';
import AuditTrailService from '@/services/AuditTrailService';

interface TaxServicesHookResult {
  calculateTaxes: (input: TaxInput) => TaxResult;
  validateData: (data: any) => { valid: boolean; validationResults: any[] };
  checkCompliance: (data: any, businessType: string) => any;
  generateReport: (data: any, businessType: string) => any;
  logAction: (userId: string, action: string, details: any) => void;
  results: TaxResult | null;
  isValid: boolean;
  validationResults: any[];
  complianceResults: any;
}

export const useTaxServices = (userId: string = 'guest'): TaxServicesHookResult => {
  const [results, setResults] = useState<TaxResult | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [validationResults, setValidationResults] = useState<any[]>([]);
  const [complianceResults, setComplianceResults] = useState<any>(null);
  
  const auditService = AuditTrailService.getInstance();

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
  
  const logAction = (userId: string, action: string, details: any) => {
    auditService.logAction(
      userId,
      action as any,
      details
    );
  };
  
  return {
    calculateTaxes,
    validateData,
    checkCompliance,
    generateReport,
    logAction,
    results,
    isValid,
    validationResults,
    complianceResults
  };
};
