
import { calculatePNGIncomeTax, PNGTaxInput } from '../PNGTaxCalculationService';

describe('PNG Tax Calculation Service', () => {
  describe('calculatePNGIncomeTax', () => {
    it('should calculate taxes correctly for resident with declaration and no income', () => {
      const input: PNGTaxInput = {
        income: 0,
        isFortnightly: true,
        isResident: true,
        hasDeclarationLodged: true,
        dependants: 0,
        hasSalarySacrifice: false,
        hasNasfund: false,
        otherDeductions: []
      };

      const result = calculatePNGIncomeTax(input);
      
      expect(result.grossIncome.fortnightly).toBe(0);
      expect(result.grossIncome.annual).toBe(0);
      expect(result.taxPayable.fortnightly).toBe(0);
      expect(result.taxPayable.annual).toBe(0);
      expect(result.effectiveTaxRate).toBe(0);
    });

    it('should calculate taxes correctly for low income resident with declaration', () => {
      const input: PNGTaxInput = {
        income: 700,
        isFortnightly: true,
        isResident: true,
        hasDeclarationLodged: true,
        dependants: 0,
        hasSalarySacrifice: false,
        hasNasfund: false,
        otherDeductions: []
      };

      const result = calculatePNGIncomeTax(input);
      
      // Low income resident with declaration should pay zero tax
      expect(result.taxPayable.fortnightly).toBe(0);
      expect(result.netIncome.fortnightly).toBe(700);
    });

    it('should calculate taxes correctly for medium income resident with declaration', () => {
      const input: PNGTaxInput = {
        income: 1000,
        isFortnightly: true,
        isResident: true,
        hasDeclarationLodged: true,
        dependants: 0,
        hasSalarySacrifice: false,
        hasNasfund: false,
        otherDeductions: []
      };

      const result = calculatePNGIncomeTax(input);
      
      // 30% of amount over 769.23
      const expectedTax = (1000 - 769.23) * 0.3;
      expect(result.taxPayable.fortnightly).toBeCloseTo(expectedTax, 2);
    });

    it('should apply salary sacrifice correctly', () => {
      const input: PNGTaxInput = {
        income: 2000,
        isFortnightly: true,
        isResident: true,
        hasDeclarationLodged: true,
        dependants: 0,
        hasSalarySacrifice: true,
        hasNasfund: false,
        otherDeductions: []
      };

      const result = calculatePNGIncomeTax(input);
      
      // Annual income: 2000 * 26 = 52000
      // Salary sacrifice: 52000 * 0.4 = 20800
      // Taxable income: 52000 - 20800 = 31200
      // Fortnightly taxable: 31200 / 26 = 1200
      expect(result.grossIncome.annual).toBe(52000);
      expect(result.deductions.salarySacrifice).toBe(20800);
      expect(result.taxableIncome.annual).toBeCloseTo(31200, 2);
      expect(result.taxableIncome.fortnightly).toBeCloseTo(1200, 2);
    });

    it('should apply dependant reductions correctly', () => {
      const baseInput: PNGTaxInput = {
        income: 1000,
        isFortnightly: true,
        isResident: true,
        hasDeclarationLodged: true,
        dependants: 0,
        hasSalarySacrifice: false,
        hasNasfund: false,
        otherDeductions: []
      };

      // Calculate base tax without dependants
      const baseResult = calculatePNGIncomeTax(baseInput);
      const baseTax = baseResult.taxPayable.fortnightly;

      // Calculate with 1 dependant (10% reduction up to K17.31)
      const result1 = calculatePNGIncomeTax({...baseInput, dependants: 1});
      const expected1 = baseTax - Math.min(baseTax * 0.1, 17.31);
      expect(result1.taxPayable.fortnightly).toBeCloseTo(expected1, 2);
      
      // Calculate with 2 dependants (15% reduction up to K28.85)
      const result2 = calculatePNGIncomeTax({...baseInput, dependants: 2});
      const expected2 = baseTax - Math.min(baseTax * 0.15, 28.85);
      expect(result2.taxPayable.fortnightly).toBeCloseTo(expected2, 2);
      
      // Calculate with 3 dependants (35% reduction up to K40.38)
      const result3 = calculatePNGIncomeTax({...baseInput, dependants: 3});
      const expected3 = baseTax - Math.min(baseTax * 0.35, 40.38);
      expect(result3.taxPayable.fortnightly).toBeCloseTo(expected3, 2);
    });

    it('should calculate taxes correctly for non-residents', () => {
      const input: PNGTaxInput = {
        income: 700,
        isFortnightly: true,
        isResident: false,
        hasDeclarationLodged: true,
        dependants: 0,
        hasSalarySacrifice: false,
        hasNasfund: false,
        otherDeductions: []
      };

      const result = calculatePNGIncomeTax(input);
      
      // Non-residents pay 22% on income up to K769.23
      const expectedTax = 700 * 0.22;
      expect(result.taxPayable.fortnightly).toBeCloseTo(expectedTax, 2);
    });

    it('should handle other deductions correctly', () => {
      const input: PNGTaxInput = {
        income: 2000,
        isFortnightly: true,
        isResident: true,
        hasDeclarationLodged: true,
        dependants: 0,
        hasSalarySacrifice: false,
        hasNasfund: false,
        otherDeductions: [
          { name: 'Insurance', amount: 1000 },
          { name: 'Loan', amount: 500 }
        ]
      };

      const result = calculatePNGIncomeTax(input);
      
      // Total other deductions: 1000 + 500 = 1500
      expect(result.deductions.other.length).toBe(2);
      expect(result.deductions.other[0].amount).toBe(1000);
      expect(result.deductions.other[1].amount).toBe(500);
      
      // Annual income: 2000 * 26 = 52000
      // Deductions: 1500
      // Taxable income: 52000 - 1500 = 50500
      expect(result.taxableIncome.annual).toBeCloseTo(50500, 2);
    });

    it('should calculate Nasfund contributions correctly', () => {
      const input: PNGTaxInput = {
        income: 2000,
        isFortnightly: true,
        isResident: true,
        hasDeclarationLodged: true,
        dependants: 0,
        hasSalarySacrifice: false,
        hasNasfund: true,
        otherDeductions: []
      };

      const result = calculatePNGIncomeTax(input);
      
      // Annual income: 2000 * 26 = 52000
      // Nasfund: 52000 * 0.06 = 3120
      expect(result.deductions.nasfund).toBeCloseTo(3120, 2);
      
      // Nasfund should not affect taxable income
      expect(result.taxableIncome.annual).toBeCloseTo(52000, 2);
      
      // But it should affect final net pay
      const netAfterTax = result.netIncome.annual;
      expect(result.finalNetPay.annual).toBeCloseTo(netAfterTax - 3120, 2);
    });
  });
});
