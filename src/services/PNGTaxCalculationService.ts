
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
  taxableIncome: {
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
    excessAmount: number;
    excessTax: number;
    totalBeforeReduction: number;
    dependantReduction: number;
    finalTax: number;
    bracket: string;
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
  const fortnightlyGrossIncome = input.isFortnightly 
    ? input.income 
    : input.income / 26;
  
  // Annual gross income
  const annualGrossIncome = input.isFortnightly 
    ? input.income * 26 
    : input.income;

  // Calculate deductions
  
  // 1. Salary Sacrifice (40% if enabled)
  const salarySacrificeAmount = input.hasSalarySacrifice ? annualGrossIncome * 0.4 : 0;
  
  // 2. Nasfund contribution (6% if enabled)
  const nasfundAmount = input.hasNasfund ? annualGrossIncome * 0.06 : 0;
  
  // 3. Other deductions total
  const otherDeductionsTotal = input.otherDeductions.reduce((total, deduction) => 
    total + deduction.amount, 0);
  
  // Total deductions (annual)
  const totalDeductions = salarySacrificeAmount + nasfundAmount + otherDeductionsTotal;
  
  // Calculate taxable income after deductions
  const annualTaxableIncome = annualGrossIncome - salarySacrificeAmount - otherDeductionsTotal;
  const fortnightlyTaxableIncome = annualTaxableIncome / 26;

  // Calculate tax based on tables
  let fortnightlyTax = 0;
  let taxBreakdown = {
    baseTax: 0,
    excessAmount: 0,
    excessTax: 0,
    totalBeforeReduction: 0,
    dependantReduction: 0,
    finalTax: 0,
    bracket: ""
  };

  // Table A: Income ≤ K769.23 per Fortnight
  if (fortnightlyTaxableIncome <= 769.23) {
    taxBreakdown.bracket = "K0 - K769.23";
    if (!input.isResident) {
      // Non-Resident
      fortnightlyTax = fortnightlyTaxableIncome * 0.22;
      taxBreakdown.baseTax = fortnightlyTax;
    } else if (!input.hasDeclarationLodged) {
      // Resident, No Declaration
      fortnightlyTax = fortnightlyTaxableIncome * 0.42;
      taxBreakdown.baseTax = fortnightlyTax;
    } else {
      // Resident, Declaration Lodged
      fortnightlyTax = 0;
      taxBreakdown.baseTax = 0;
    }
    taxBreakdown.totalBeforeReduction = fortnightlyTax;
  } 
  // Table B: Income > K769.23 but < K1,269.23 per Fortnight
  else if (fortnightlyTaxableIncome > 769.23 && fortnightlyTaxableIncome < 1269.23) {
    taxBreakdown.bracket = "K769.23 - K1,269.23";
    taxBreakdown.excessAmount = fortnightlyTaxableIncome - 769.23;
    
    if (!input.isResident) {
      // Non-Resident
      taxBreakdown.baseTax = 169.83;
      taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.30;
      fortnightlyTax = taxBreakdown.baseTax + taxBreakdown.excessTax;
    } else if (!input.hasDeclarationLodged) {
      // Resident, No Declaration
      taxBreakdown.baseTax = 323.82;
      taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.42;
      fortnightlyTax = taxBreakdown.baseTax + taxBreakdown.excessTax;
    } else {
      // Resident, Declaration Lodged
      taxBreakdown.baseTax = 0;
      taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.30;
      fortnightlyTax = taxBreakdown.excessTax;
    }
    
    taxBreakdown.totalBeforeReduction = fortnightlyTax;
    
    // Apply dependant reductions if applicable
    if (input.dependants > 0 && input.isResident && input.hasDeclarationLodged) {
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
    }
  }
  // Table C: Income ≥ K1,269.23 per Fortnight
  else {
    if (fortnightlyTaxableIncome < 2692.31) {
      taxBreakdown.bracket = "K1,269.23 - K2,692.31";
      taxBreakdown.excessAmount = fortnightlyTaxableIncome - 1269.23;
      taxBreakdown.baseTax = 149.99;
      taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.35;
    } else if (fortnightlyTaxableIncome < 9615.38) {
      taxBreakdown.bracket = "K2,692.31 - K9,615.38";
      taxBreakdown.excessAmount = fortnightlyTaxableIncome - 2692.31;
      taxBreakdown.baseTax = 648.05;
      taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.40;
    } else {
      taxBreakdown.bracket = "Above K9,615.38";
      taxBreakdown.excessAmount = fortnightlyTaxableIncome - 9615.38;
      taxBreakdown.baseTax = 3417.27;
      taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.42;
    }
    
    if (!input.isResident) {
      // Non-Resident
      if (fortnightlyTaxableIncome < 2692.31) {
        taxBreakdown.baseTax = 319.22;
        taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.35;
      } else if (fortnightlyTaxableIncome < 9615.38) {
        taxBreakdown.baseTax = 817.28;
        taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.40;
      } else {
        taxBreakdown.baseTax = 3586.50;
        taxBreakdown.excessTax = taxBreakdown.excessAmount * 0.42;
      }
    } else if (!input.hasDeclarationLodged) {
      // Resident, No Declaration
      taxBreakdown.baseTax = 322.98;
      taxBreakdown.excessTax = (fortnightlyTaxableIncome - 769.23) * 0.42;
    }
    
    // Calculate total before reduction
    fortnightlyTax = taxBreakdown.baseTax + taxBreakdown.excessTax;
    taxBreakdown.totalBeforeReduction = fortnightlyTax;
    
    // Apply dependant reductions if applicable
    if (input.dependants > 0 && input.isResident && input.hasDeclarationLodged) {
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
    }
  }

  // Set the final tax after reductions
  taxBreakdown.finalTax = fortnightlyTax;
  
  // Calculate annual tax
  const annualTax = fortnightlyTax * 26;
  
  // Calculate net income (after tax)
  const fortnightlyNetIncome = fortnightlyTaxableIncome - fortnightlyTax;
  const annualNetIncome = annualTaxableIncome - annualTax;
  
  // Final net pay after all deductions and tax
  const annualFinalNetPay = annualNetIncome - nasfundAmount;
  const fortnightlyFinalNetPay = annualFinalNetPay / 26;
  
  // Calculate effective tax rate (based on gross income)
  const effectiveTaxRate = annualGrossIncome > 0 ? annualTax / annualGrossIncome : 0;
  
  return {
    grossIncome: {
      fortnightly: fortnightlyGrossIncome,
      annual: annualGrossIncome
    },
    taxableIncome: {
      fortnightly: fortnightlyTaxableIncome,
      annual: annualTaxableIncome
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
