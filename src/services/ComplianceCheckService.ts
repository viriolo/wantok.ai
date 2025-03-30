
/**
 * Compliance Check Service for Papua New Guinea
 * Implements compliance checking based on PNG regulations
 */

export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  category: 'tax' | 'business' | 'reporting' | 'industry';
  applicableBusinessTypes: string[];
  checkCompliance: (data: any) => boolean;
  regulationReference: string;
  penaltyDescription?: string;
}

// PNG-specific compliance requirements
export const pngComplianceRequirements: ComplianceRequirement[] = [
  {
    id: 'annual_return',
    name: 'Annual Return Filing',
    description: 'All registered businesses must file annual returns',
    category: 'reporting',
    applicableBusinessTypes: ['sole_proprietor', 'partnership', 'company', 'sme'],
    checkCompliance: (data) => !!data.annualReturnFiled,
    regulationReference: 'PNG Companies Act 1997, Section 215',
    penaltyDescription: 'Penalty of up to 10,000 PGK for non-compliance'
  },
  {
    id: 'tax_registration',
    name: 'Tax Registration',
    description: 'Business must be registered with IRC for tax purposes',
    category: 'tax',
    applicableBusinessTypes: ['sole_proprietor', 'partnership', 'company', 'sme'],
    checkCompliance: (data) => !!data.taxRegistrationNumber,
    regulationReference: 'PNG Income Tax Act',
    penaltyDescription: 'Penalties and interest on unpaid taxes'
  },
  {
    id: 'gst_compliance',
    name: 'GST Compliance',
    description: 'Businesses with revenue over 250,000 PGK must register for GST',
    category: 'tax',
    applicableBusinessTypes: ['sole_proprietor', 'partnership', 'company', 'sme'],
    checkCompliance: (data) => 
      data.annualRevenue < 250000 || data.hasGstRegistration,
    regulationReference: 'PNG Goods and Services Tax Act 2003',
    penaltyDescription: 'Penalties of up to 100% of unpaid GST'
  },
  {
    id: 'employee_taxes',
    name: 'Employee Tax Compliance',
    description: 'Withholding and remitting correct employee taxes',
    category: 'tax',
    applicableBusinessTypes: ['sole_proprietor', 'partnership', 'company', 'sme'],
    checkCompliance: (data) => 
      !data.hasEmployees || !!data.employeeTaxesRemitted,
    regulationReference: 'PNG Income Tax Act, Employment Regulations',
    penaltyDescription: 'Penalties and criminal charges for non-compliance'
  },
  {
    id: 'foreign_operations',
    name: 'Foreign Operations Reporting',
    description: 'Reporting of foreign business activities and income',
    category: 'reporting',
    applicableBusinessTypes: ['company', 'sme'],
    checkCompliance: (data) => 
      !data.hasForeignOperations || !!data.foreignOperationsReported,
    regulationReference: 'PNG Foreign Exchange Control Act',
    penaltyDescription: 'Penalties and restrictions on foreign exchange'
  },
  {
    id: 'mining_levy',
    name: 'Mining Operations Special Levy',
    description: 'Special tax requirements for mining operations',
    category: 'industry',
    applicableBusinessTypes: ['company'],
    checkCompliance: (data) => 
      data.industry !== 'mining' || !!data.miningLevyPaid,
    regulationReference: 'PNG Mining Act and Special Mining Levies',
    penaltyDescription: 'Potential loss of mining license and financial penalties'
  }
];

/**
 * Check business compliance against PNG regulations
 */
export const checkBusinessCompliance = (
  businessData: any,
  businessType: string
): { 
  compliant: boolean; 
  results: Array<{ requirement: ComplianceRequirement; compliant: boolean }> 
} => {
  // Filter requirements applicable to this business type
  const applicableRequirements = pngComplianceRequirements.filter(
    req => req.applicableBusinessTypes.includes(businessType)
  );
  
  // Check each requirement
  const complianceResults = applicableRequirements.map(requirement => ({
    requirement,
    compliant: requirement.checkCompliance(businessData)
  }));
  
  // Overall compliance requires all applicable requirements to be met
  const isCompliant = complianceResults.every(result => result.compliant);
  
  return {
    compliant: isCompliant,
    results: complianceResults
  };
};

/**
 * Generate compliance report with recommendations
 */
export const generateComplianceReport = (
  businessData: any,
  businessType: string
): {
  compliant: boolean;
  results: Array<{ 
    requirement: ComplianceRequirement; 
    compliant: boolean;
    recommendation?: string;
  }>
} => {
  const complianceCheck = checkBusinessCompliance(businessData, businessType);
  
  // Add recommendations for non-compliant items
  const resultsWithRecommendations = complianceCheck.results.map(result => {
    if (result.compliant) {
      return result;
    }
    
    // Add specific recommendations based on the requirement
    let recommendation = `Ensure compliance with ${result.requirement.name}. `;
    
    switch(result.requirement.id) {
      case 'annual_return':
        recommendation += 'File your annual return immediately to avoid penalties.';
        break;
      case 'tax_registration':
        recommendation += 'Register your business with IRC as soon as possible.';
        break;
      case 'gst_compliance':
        recommendation += 'Apply for GST registration as your revenue exceeds the threshold.';
        break;
      case 'employee_taxes':
        recommendation += 'Set up proper employee tax withholding and remittance procedures.';
        break;
      case 'foreign_operations':
        recommendation += 'Report all foreign business activities to comply with regulations.';
        break;
      case 'mining_levy':
        recommendation += 'Ensure all special mining levies are calculated and paid correctly.';
        break;
      default:
        recommendation += 'Review the relevant regulations and take corrective action.';
    }
    
    return {
      ...result,
      recommendation
    };
  });
  
  return {
    compliant: complianceCheck.compliant,
    results: resultsWithRecommendations
  };
};
