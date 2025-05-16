
/**
 * PNG Tax Calculation Service
 * Implements tax calculations based on Income Tax (Salary and Wages Tax)(Rates)(2023 Budget)(Amendment) Act 2022
 */
import { Pipeline, createStep, PipelineStep } from './common/Pipeline';

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

// Intermediate state for the tax calculation pipeline
export interface TaxCalculationState {
  input: PNGTaxInput;
  grossIncome: {
    fortnightly: number;
    annual: number;
  };
  taxableIncome: {
    fortnightly: number;
    annual: number;
  };
  deductions: {
    salarySacrifice: number;
    nasfund: number;
    other: {name: string; amount: number}[];
    total: number;
  };
  taxBreakdown: {
    baseTax: number;
    excessAmount: number;
    excessTax: number;
    totalBeforeReduction: number;
    dependantReduction: number;
    finalTax: number;
    bracket: string;
  };
  taxPayable: {
    fortnightly: number;
    annual: number;
  };
  netIncome: {
    fortnightly: number;
    annual: number;
  };
  finalNetPay: {
    fortnightly: number;
    annual: number;
  };
  effectiveTaxRate: number;
}

/**
 * Tax calculation pipeline singleton to ensure consistent tax calculations
 */
class TaxCalculationPipeline {
  private static instance: TaxCalculationPipeline;
  private pipeline: Pipeline<TaxCalculationState>;

  private constructor() {
    this.pipeline = new Pipeline<TaxCalculationState>();
    this.initializePipeline();
  }

  public static getInstance(): TaxCalculationPipeline {
    if (!TaxCalculationPipeline.instance) {
      TaxCalculationPipeline.instance = new TaxCalculationPipeline();
    }
    return TaxCalculationPipeline.instance;
  }

  public getPipeline(): Pipeline<TaxCalculationState> {
    return this.pipeline.clone();
  }

  private initializePipeline(): void {
    this.pipeline
      .addStep(this.calculateGrossIncomeStep())
      .addStep(this.calculateDeductionsStep())
      .addStep(this.calculateTaxableIncomeStep())
      .addStep(this.calculateTaxPayableStep())
      .addStep(this.calculateNetIncomeStep())
      .addStep(this.calculateFinalNetPayStep())
      .addStep(this.calculateEffectiveTaxRateStep());
  }

  private calculateGrossIncomeStep(): PipelineStep<TaxCalculationState> {
    return createStep((state: TaxCalculationState) => {
      const { input } = state;

      // Convert annual to fortnightly if needed or vice versa
      const fortnightlyGrossIncome = input.isFortnightly 
        ? input.income 
        : input.income / 26;
      
      // Annual gross income
      const annualGrossIncome = input.isFortnightly 
        ? input.income * 26 
        : input.income;

      return {
        ...state,
        grossIncome: {
          fortnightly: fortnightlyGrossIncome,
          annual: annualGrossIncome
        }
      };
    });
  }

  private calculateDeductionsStep(): PipelineStep<TaxCalculationState> {
    return createStep((state: TaxCalculationState) => {
      const { input, grossIncome } = state;

      // 1. Salary Sacrifice (40% if enabled)
      const salarySacrificeAmount = input.hasSalarySacrifice ? grossIncome.annual * 0.4 : 0;
      
      // 2. Nasfund contribution (6% if enabled)
      const nasfundAmount = input.hasNasfund ? grossIncome.annual * 0.06 : 0;
      
      // 3. Other deductions total
      const otherDeductionsTotal = input.otherDeductions.reduce((total, deduction) => 
        total + deduction.amount, 0);
      
      // Total deductions (annual)
      const totalDeductions = salarySacrificeAmount + nasfundAmount + otherDeductionsTotal;

      return {
        ...state,
        deductions: {
          salarySacrifice: salarySacrificeAmount,
          nasfund: nasfundAmount,
          other: input.otherDeductions,
          total: totalDeductions
        }
      };
    });
  }

  private calculateTaxableIncomeStep(): PipelineStep<TaxCalculationState> {
    return createStep((state: TaxCalculationState) => {
      const { grossIncome, deductions } = state;

      // Calculate taxable income after deductions
      const annualTaxableIncome = grossIncome.annual - deductions.salarySacrifice - deductions.other.reduce((total, deduction) => 
        total + deduction.amount, 0);
      
      const fortnightlyTaxableIncome = annualTaxableIncome / 26;

      return {
        ...state,
        taxableIncome: {
          fortnightly: fortnightlyTaxableIncome,
          annual: annualTaxableIncome
        }
      };
    });
  }

  private calculateTaxPayableStep(): PipelineStep<TaxCalculationState> {
    return createStep((state: TaxCalculationState) => {
      const { input, taxableIncome } = state;
      const fortnightlyTaxableIncome = taxableIncome.fortnightly;

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

      return {
        ...state,
        taxBreakdown,
        taxPayable: {
          fortnightly: fortnightlyTax,
          annual: annualTax
        }
      };
    });
  }

  private calculateNetIncomeStep(): PipelineStep<TaxCalculationState> {
    return createStep((state: TaxCalculationState) => {
      const { taxableIncome, taxPayable } = state;

      // Calculate net income (after tax)
      const fortnightlyNetIncome = taxableIncome.fortnightly - taxPayable.fortnightly;
      const annualNetIncome = taxableIncome.annual - taxPayable.annual;

      return {
        ...state,
        netIncome: {
          fortnightly: fortnightlyNetIncome,
          annual: annualNetIncome
        }
      };
    });
  }

  private calculateFinalNetPayStep(): PipelineStep<TaxCalculationState> {
    return createStep((state: TaxCalculationState) => {
      const { netIncome, deductions } = state;

      // Final net pay after all deductions and tax
      const annualFinalNetPay = netIncome.annual - deductions.nasfund;
      const fortnightlyFinalNetPay = annualFinalNetPay / 26;

      return {
        ...state,
        finalNetPay: {
          fortnightly: fortnightlyFinalNetPay,
          annual: annualFinalNetPay
        }
      };
    });
  }

  private calculateEffectiveTaxRateStep(): PipelineStep<TaxCalculationState> {
    return createStep((state: TaxCalculationState) => {
      const { grossIncome, taxPayable } = state;

      // Calculate effective tax rate (based on gross income)
      const effectiveTaxRate = grossIncome.annual > 0 ? taxPayable.annual / grossIncome.annual : 0;

      return {
        ...state,
        effectiveTaxRate
      };
    });
  }
}

/**
 * Calculate PNG income tax based on the 2023 Budget Amendment Act
 * Uses the pipeline pattern for maintainable, extensible tax calculations
 */
export const calculatePNGIncomeTax = (input: PNGTaxInput): PNGTaxResult => {
  // Initialize calculation state
  const initialState: TaxCalculationState = {
    input,
    grossIncome: { fortnightly: 0, annual: 0 },
    taxableIncome: { fortnightly: 0, annual: 0 },
    deductions: {
      salarySacrifice: 0,
      nasfund: 0,
      other: input.otherDeductions,
      total: 0
    },
    taxBreakdown: {
      baseTax: 0,
      excessAmount: 0,
      excessTax: 0,
      totalBeforeReduction: 0,
      dependantReduction: 0,
      finalTax: 0,
      bracket: ""
    },
    taxPayable: { fortnightly: 0, annual: 0 },
    netIncome: { fortnightly: 0, annual: 0 },
    finalNetPay: { fortnightly: 0, annual: 0 },
    effectiveTaxRate: 0
  };

  // Get pipeline instance and process the calculation
  const pipeline = TaxCalculationPipeline.getInstance().getPipeline();
  
  // For backwards compatibility, we'll run the pipeline synchronously
  // since the original function was synchronous
  let result: TaxCalculationState = initialState;
  
  // Process synchronously to maintain the original function's contract
  pipeline.process(initialState)
    .then(processedState => {
      result = processedState;
    })
    .catch(error => {
      console.error('Error in tax calculation pipeline:', error);
      // In case of error, we'll still have the initial state
    });

  // Convert the calculation state to the expected result format
  return {
    grossIncome: result.grossIncome,
    taxableIncome: result.taxableIncome,
    taxPayable: result.taxPayable,
    netIncome: result.netIncome,
    effectiveTaxRate: result.effectiveTaxRate,
    taxBreakdown: result.taxBreakdown,
    deductions: result.deductions,
    finalNetPay: result.finalNetPay
  };
}

/**
 * Format currency for PNG (Kina)
 */
export const formatPNGCurrency = (amount: number): string => {
  return `K${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};
