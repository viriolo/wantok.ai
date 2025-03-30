
/**
 * Tax Validation Service for Papua New Guinea
 * Implements validation rules for PNG tax requirements
 */

interface ValidationRule {
  id: string;
  name: string;
  description: string;
  validate: (data: any) => boolean;
  errorMessage: string;
  severity: 'error' | 'warning' | 'info';
}

// GST Registration threshold in PNG (simplified)
const GST_REGISTRATION_THRESHOLD = 250000;

export const taxValidationRules: ValidationRule[] = [
  {
    id: 'revenue_threshold',
    name: 'Revenue Reporting Accuracy',
    description: 'Annual revenue must be accurately reported',
    validate: (data) => 
      data.annualRevenue !== undefined && 
      !isNaN(data.annualRevenue) && 
      data.annualRevenue >= 0,
    errorMessage: 'Annual revenue must be a valid positive number',
    severity: 'error'
  },
  {
    id: 'expense_validity',
    name: 'Expense Validity',
    description: 'Expenses must be less than or equal to revenue',
    validate: (data) => 
      !isNaN(data.expenses) && 
      data.expenses >= 0 && 
      data.expenses <= data.annualRevenue,
    errorMessage: 'Expenses cannot exceed annual revenue',
    severity: 'error'
  },
  {
    id: 'gst_registration',
    name: 'GST Registration Requirement',
    description: 'Businesses with revenue over 250,000 PGK must register for GST',
    validate: (data) => 
      data.annualRevenue < GST_REGISTRATION_THRESHOLD || 
      data.hasGstRegistration,
    errorMessage: 'Your business appears to require GST registration',
    severity: 'warning'
  },
  {
    id: 'foreign_income',
    name: 'Foreign Income Declaration',
    description: 'Foreign income must be declared and documented',
    validate: (data) => 
      !data.hasForeignIncome || 
      (data.hasForeignIncome && data.foreignIncomeDocumented),
    errorMessage: 'Foreign income must be fully documented',
    severity: 'error'
  },
  {
    id: 'document_completeness',
    name: 'Document Completeness',
    description: 'All required tax documents must be provided',
    validate: (data) => 
      data.requiredDocuments && 
      data.providedDocuments && 
      data.requiredDocuments.every(doc => data.providedDocuments.includes(doc)),
    errorMessage: 'Missing required tax documents',
    severity: 'error'
  },
  {
    id: 'filing_deadline',
    name: 'Filing Deadline Compliance',
    description: 'Tax return must be filed before the deadline',
    validate: (data) => {
      const now = new Date();
      const deadline = data.filingDeadline ? new Date(data.filingDeadline) : null;
      return !deadline || now <= deadline;
    },
    errorMessage: 'Filing deadline has passed',
    severity: 'error'
  }
];

/**
 * Validates tax data against PNG-specific rules
 */
export const validateTaxData = (data: any) => {
  return taxValidationRules.map(rule => ({
    id: rule.id,
    name: rule.name,
    valid: rule.validate(data),
    errorMessage: rule.validate(data) ? '' : rule.errorMessage,
    severity: rule.severity
  }));
};

/**
 * Check if all critical rules pass
 */
export const isDataValid = (data: any): boolean => {
  const validationResults = validateTaxData(data);
  return validationResults
    .filter(result => result.severity === 'error')
    .every(result => result.valid);
};
