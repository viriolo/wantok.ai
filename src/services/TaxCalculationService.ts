
/**
 * Tax Calculation Service for Papua New Guinea
 * Implements PNG-specific tax calculations with proper tax brackets
 */

// PNG Tax Brackets for 2023-2024 (simplified for implementation)
export const PERSONAL_TAX_BRACKETS = [
  { threshold: 0, rate: 0 },
  { threshold: 12500, rate: 0.22 },
  { threshold: 33000, rate: 0.30 },
  { threshold: 70000, rate: 0.35 },
  { threshold: 250000, rate: 0.40 }
];

// PNG Corporate Tax Rate (simplified)
export const CORPORATE_TAX_RATE = 0.30;

// PNG GST Rate
export const GST_RATE = 0.10;

export interface TaxInput {
  businessType: 'sole_proprietor' | 'partnership' | 'company' | 'sme';
  annualRevenue: number;
  expenses: number;
  industry?: string;
  hasGstRegistration: boolean;
}

export interface TaxResult {
  taxableIncome: number;
  incomeTax: number;
  gstPayable: number;
  totalTaxLiability: number;
  effectiveTaxRate: number;
  breakdowns: {
    [key: string]: number;
  };
}

/**
 * Calculate income tax based on PNG tax brackets
 */
const calculateIncomeTax = (taxableIncome: number, businessType: string): number => {
  if (businessType === 'company') {
    return taxableIncome * CORPORATE_TAX_RATE;
  }

  // For non-corporate entities, use progressive tax brackets
  let remainingIncome = taxableIncome;
  let totalTax = 0;

  for (let i = 1; i < PERSONAL_TAX_BRACKETS.length; i++) {
    const prevBracket = PERSONAL_TAX_BRACKETS[i - 1];
    const currentBracket = PERSONAL_TAX_BRACKETS[i];
    
    const bracketIncome = Math.min(
      remainingIncome,
      currentBracket.threshold - prevBracket.threshold
    );
    
    if (bracketIncome <= 0) break;
    
    totalTax += bracketIncome * currentBracket.rate;
    remainingIncome -= bracketIncome;
    
    if (remainingIncome <= 0) break;
  }
  
  // Special SME considerations
  if (businessType === 'sme' && taxableIncome < 250000) {
    totalTax *= 0.75; // 25% tax reduction for SMEs
  }
  
  return totalTax;
};

/**
 * Calculate GST based on revenue
 */
const calculateGST = (revenue: number, hasGstRegistration: boolean): number => {
  if (!hasGstRegistration) return 0;
  return revenue * GST_RATE;
};

/**
 * Calculate tax for businesses in Papua New Guinea
 */
export const calculateTax = (input: TaxInput): TaxResult => {
  const { businessType, annualRevenue, expenses, hasGstRegistration } = input;
  
  // Calculate taxable income
  const taxableIncome = Math.max(0, annualRevenue - expenses);
  
  // Calculate income tax
  const incomeTax = calculateIncomeTax(taxableIncome, businessType);
  
  // Calculate GST
  const gstPayable = calculateGST(annualRevenue, hasGstRegistration);
  
  // Calculate total tax liability
  const totalTaxLiability = incomeTax + gstPayable;
  
  // Calculate effective tax rate
  const effectiveTaxRate = annualRevenue > 0 
    ? totalTaxLiability / annualRevenue 
    : 0;
  
  return {
    taxableIncome,
    incomeTax,
    gstPayable,
    totalTaxLiability,
    effectiveTaxRate,
    breakdowns: {
      incomeTax,
      gstPayable
    }
  };
};

