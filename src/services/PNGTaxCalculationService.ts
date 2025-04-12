
/**
 * PNG Tax Calculation Service
 * Implements tax calculations based on Income Tax (Salary and Wages Tax)(Rates)(2023 Budget)(Amendment) Act 2022
 */

export interface PNGTaxInput {
  income: number;
  isFortnightly: boolean;
  isResident: boolean;
  hasDeclarationLodged: boolean;
  dependants: 0 | 1 | 2 | 3;
  hasSalarySacrifice: boolean;
  hasNasfund: boolean;
  otherDeductions: {name: string; amount: number}[];
}

export interface PNGTaxResult {
  grossIncome: {
    fortnightly: number;
    annual: number;
  };
  taxPayable: {
    fortnightly: number;
    annual: number;
  };
  netIncome: {
    fortnightly: number;
    annual: number;
  };
  effectiveTaxRate: number;
  taxBreakdown: {
    baseTax: number;
    dependantReduction: number;
    finalTax: number;
  };
  deductions: {
    salarySacrifice: number;
    nasfund: number;
    other: {name: string; amount: number}[];
    total: number;
  };
  finalNetPay: {
    fortnightly: number;
    annual: number;
  };
}

/**
 * Calculate PNG income tax based on the 2023 Budget Amendment Act
 */
export const calculatePNGIncomeTax = (input: PNGTaxInput): PNGTaxResult => {
  // Convert annual to fortnightly if needed
  const fortnightlyIncome = input.isFortnightly 
    ? input.income 
    : input.income / 26;
  
  // Annual income
  const annualIncome = input.isFortnightly 
    ? input.income * 26 
    : input.income;

  // Calculate tax based on tables
  let fortnightlyTax = 0;
  let taxBreakdown = {
    baseTax: 0,
    dependantReduction: 0,
    finalTax: 0,
  };

  // Table A: Income ≤ K769.23 per Fortnight
  if (fortnightlyIncome <= 769.23) {
    if (!input.isResident) {
      // Non-Resident
      fortnightlyTax = fortnightlyIncome * 0.22;
    } else if (!input.hasDeclarationLodged) {
      // Resident, No Declaration
      fortnightlyTax = fortnightlyIncome * 0.42;
    } else {
      // Resident, Declaration Lodged
      fortnightlyTax = 0;
    }
  } 
  // Table B: Income > K769.23 but < K1,269.23 per Fortnight
  else if (fortnightlyIncome > 769.23 && fortnightlyIncome < 1269.23) {
    if (!input.isResident) {
      // Non-Resident
      fortnightlyTax = 169.83 + (fortnightlyIncome - 769) * 0.30;
    } else if (!input.hasDeclarationLodged) {
      // Resident, No Declaration
      fortnightlyTax = 323.82 + (fortnightlyIncome - 769) * 0.42;
    } else {
      // Resident, Declaration Lodged
      fortnightlyTax = (fortnightlyIncome - 769.23) * 0.30;
      
      // Apply dependant reductions if applicable
      if (input.dependants > 0 && input.isResident && input.hasDeclarationLodged) {
        taxBreakdown.baseTax = fortnightlyTax;
        
        if (input.dependants === 1) {
          // 10% reduction up to K17.31
          taxBreakdown.dependantReduction = Math.min(fortnightlyTax * 0.10, 17.31);
        } else if (input.dependants === 2) {
          // 15% reduction up to K28.85
          taxBreakdown.dependantReduction = Math.min(fortnightlyTax * 0.15, 28.85);
        } else if (input.dependants >= 3) {
          // 35% reduction up to K40.38
          taxBreakdown.dependantReduction = Math.min(fortnightlyTax * 0.35, 40.38);
        }
        
        fortnightlyTax = Math.max(0, fortnightlyTax - taxBreakdown.dependantReduction);
        taxBreakdown.finalTax = fortnightlyTax;
      }
    }
  }
  // Table C: Income ≥ K1,269.23 per Fortnight
  else {
    if (!input.isResident) {
      // Non-Resident
      if (fortnightlyIncome < 2692.31) {
        fortnightlyTax = 319.22 + (fortnightlyIncome - 1269.23) * 0.35;
      } else if (fortnightlyIncome < 9615.38) {
        fortnightlyTax = 817.28 + (fortnightlyIncome - 2692.31) * 0.40;
      } else {
        fortnightlyTax = 3586.50 + (fortnightlyIncome - 9615.38) * 0.42;
      }
    } else if (!input.hasDeclarationLodged) {
      // Resident, No Declaration
      fortnightlyTax = 322.98 + (fortnightlyIncome - 769.23) * 0.42;
    } else {
      // Resident, Declaration Lodged
      if (fortnightlyIncome < 2692.31) {
        fortnightlyTax = 149.99 + (fortnightlyIncome - 1269.23) * 0.35;
      } else if (fortnightlyIncome < 9615.38) {
        fortnightlyTax = 648.05 + (fortnightlyIncome - 2692.31) * 0.40;
      } else {
        fortnightlyTax = 3417.27 + (fortnightlyIncome - 9615.38) * 0.42;
      }
      
      // Apply dependant reductions if applicable
      if (input.dependants > 0 && input.isResident && input.hasDeclarationLodged) {
        taxBreakdown.baseTax = fortnightlyTax;
        
        if (input.dependants === 1) {
          // 10% reduction up to K17.31
          taxBreakdown.dependantReduction = Math.min(fortnightlyTax * 0.10, 17.31);
        } else if (input.dependants === 2) {
          // 15% reduction up to K28.85
          taxBreakdown.dependantReduction = Math.min(fortnightlyTax * 0.15, 28.85);
        } else if (input.dependants >= 3) {
          // 35% reduction up to K40.38
          taxBreakdown.dependantReduction = Math.min(fortnightlyTax * 0.35, 40.38);
        }
        
        fortnightlyTax = Math.max(0, fortnightlyTax - taxBreakdown.dependantReduction);
        taxBreakdown.finalTax = fortnightlyTax;
      }
    }
  }

  // If no dependant reductions were applied, set the final tax
  if (taxBreakdown.finalTax === 0) {
    taxBreakdown.baseTax = fortnightlyTax;
    taxBreakdown.finalTax = fortnightlyTax;
  }
  
  // Calculate annual tax
  const annualTax = fortnightlyTax * 26;
  
  // Calculate net income (after tax)
  const fortnightlyNetIncome = fortnightlyIncome - fortnightlyTax;
  const annualNetIncome = annualIncome - annualTax;
  
  // Calculate deductions
  
  // 1. Salary Sacrifice (40% if enabled) - Changed from 60% to 40%
  const salarySacrificeAmount = input.hasSalarySacrifice ? annualIncome * 0.4 : 0;
  
  // 2. Nasfund contribution (6% if enabled)
  const nasfundAmount = input.hasNasfund ? annualIncome * 0.06 : 0;
  
  // 3. Other deductions total
  const otherDeductionsTotal = input.otherDeductions.reduce((total, deduction) => 
    total + deduction.amount, 0);
  
  // Total deductions (annual)
  const totalDeductions = salarySacrificeAmount + nasfundAmount + otherDeductionsTotal;
  
  // Final net pay after all deductions
  const annualFinalNetPay = annualNetIncome - totalDeductions;
  const fortnightlyFinalNetPay = annualFinalNetPay / 26;
  
  // Calculate effective tax rate
  const effectiveTaxRate = annualIncome > 0 ? annualTax / annualIncome : 0;
  
  return {
    grossIncome: {
      fortnightly: fortnightlyIncome,
      annual: annualIncome
    },
    taxPayable: {
      fortnightly: fortnightlyTax,
      annual: annualTax
    },
    netIncome: {
      fortnightly: fortnightlyNetIncome,
      annual: annualNetIncome
    },
    effectiveTaxRate,
    taxBreakdown,
    deductions: {
      salarySacrifice: salarySacrificeAmount,
      nasfund: nasfundAmount,
      other: input.otherDeductions,
      total: totalDeductions
    },
    finalNetPay: {
      fortnightly: fortnightlyFinalNetPay,
      annual: annualFinalNetPay
    }
  };
};

/**
 * Format currency for PNG (Kina)
 */
export const formatPNGCurrency = (amount: number): string => {
  return `K${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
