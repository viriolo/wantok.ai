
import React, { useState } from 'react';
import { PNGTaxInput, PNGTaxResult, calculatePNGIncomeTax, formatPNGCurrency } from '@/services/PNGTaxCalculationService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  HelpCircle, Printer, Download, 
  InfoIcon, AlertTriangle, 
  ArrowDown, ArrowUp,
  Flag 
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Form schema with validation
const formSchema = z.object({
  income: z.coerce.number()
    .positive('Income must be a positive number')
    .min(0, 'Income cannot be negative'),
  isFortnightly: z.boolean().default(true),
  isResident: z.boolean().default(true),
  hasDeclarationLodged: z.boolean().default(true),
  dependants: z.enum(['0', '1', '2', '3']).default('0'),
});

type FormValues = z.infer<typeof formSchema>;

const PNGIncomeTaxCalculator = () => {
  const [calculationResult, setCalculationResult] = useState<PNGTaxResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 0,
      isFortnightly: true,
      isResident: true,
      hasDeclarationLodged: true,
      dependants: '0',
    },
  });

  const handleCalculate = (data: FormValues) => {
    try {
      const taxInput: PNGTaxInput = {
        income: data.income,
        isFortnightly: data.isFortnightly,
        isResident: data.isResident,
        hasDeclarationLodged: data.hasDeclarationLodged,
        dependants: parseInt(data.dependants) as 0 | 1 | 2 | 3,
      };

      const result = calculatePNGIncomeTax(taxInput);
      setCalculationResult(result);
      setShowDetails(true);

      toast({
        title: "Tax Calculation Complete",
        description: "Your PNG tax calculation has been processed.",
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error calculating your tax. Please check your inputs.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    form.reset();
    setCalculationResult(null);
    setShowDetails(false);
  };

  const generatePDF = () => {
    toast({
      title: "PDF Generation",
      description: "Downloading your tax calculation as PDF...",
    });
    // In a real app, this would generate and download a PDF
  };

  const printResults = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-8 px-4 print:py-2">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Income Tax Calculator 2023</h1>
            <Flag className="h-6 w-6 text-[#ce1126]" />
          </div>
          <p className="text-muted-foreground mt-2">
            Calculate your PNG salary and wages tax based on the Income Tax Act 2023. 
            Simply enter your income and details below to get an estimate.
          </p>
        </div>
        <Calculator size={48} className="text-primary opacity-80 hidden md:block" />
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Form Card */}
        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Enter Your Details</span>
            </CardTitle>
            <CardDescription>
              Please provide the information below to calculate your tax liability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCalculate)} className="space-y-6">
                {/* Income Period Selection */}
                <FormField
                  control={form.control}
                  name="isFortnightly"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Income Period</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => field.onChange(value === 'true')}
                          defaultValue={field.value ? 'true' : 'false'}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="fortnightly" />
                            <Label htmlFor="fortnightly">Fortnightly Income</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="annual" />
                            <Label htmlFor="annual">Annual Income</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>
                        Select whether you're entering fortnightly or annual income
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Income Input */}
                <FormField
                  control={form.control}
                  name="income"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Income (PGK)
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-80">
                              <p>Enter your {form.watch('isFortnightly') ? 'fortnightly' : 'annual'} gross income in Papua New Guinea Kina (PGK).</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">K</span>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Taxpayer Status */}
                <FormField
                  control={form.control}
                  name="isResident"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Resident Taxpayer
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground inline-block" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-80">
                                <p>A resident taxpayer is eligible for tax reductions based on dependants if a declaration is lodged. Non-residents are subject to higher tax rates.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormDescription>
                          Are you a PNG resident for tax purposes?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Declaration Status */}
                <FormField
                  control={form.control}
                  name="hasDeclarationLodged"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Tax Declaration Lodged
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground inline-block" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-80">
                                <p>A tax declaration lodged with your employer or the tax authority affects your tax rates. Without a declaration, higher tax rates apply.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormDescription>
                          Have you lodged a tax declaration?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Dependants - only shown if resident and declaration lodged */}
                {form.watch('isResident') && form.watch('hasDeclarationLodged') && (
                  <FormField
                    control={form.control}
                    name="dependants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Number of Dependants
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-80">
                                <p>Dependants reduce your tax liability. 1 dependant: 10% reduction (max K17.31), 2 dependants: 15% reduction (max K28.85), 3+ dependants: 35% reduction (max K40.38).</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select dependants" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">No dependants</SelectItem>
                            <SelectItem value="1">1 dependant</SelectItem>
                            <SelectItem value="2">2 dependants</SelectItem>
                            <SelectItem value="3">3 or more dependants</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Number of dependants affects your tax reductions
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="flex gap-4 pt-2">
                  <Button type="submit" className="flex-1">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculate Tax
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Calculate Again
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tax Results</span>
              <Badge className="ml-2 bg-[#009c3f] text-white">PNG 2023</Badge>
            </CardTitle>
            <CardDescription>
              Your calculated tax liability
            </CardDescription>
          </CardHeader>
          <CardContent>
            {calculationResult ? (
              <div className="space-y-6">
                {/* Summary */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Gross Income</p>
                      <p className="text-2xl font-bold">{formatPNGCurrency(calculationResult.grossIncome[form.watch('isFortnightly') ? 'fortnightly' : 'annual'])}</p>
                      <p className="text-xs text-muted-foreground">
                        {form.watch('isFortnightly') ? 'Per Fortnight' : 'Annual'}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Net Income</p>
                      <p className="text-2xl font-bold text-[#009c3f]">{formatPNGCurrency(calculationResult.netIncome[form.watch('isFortnightly') ? 'fortnightly' : 'annual'])}</p>
                      <p className="text-xs text-muted-foreground">
                        {form.watch('isFortnightly') ? 'Per Fortnight' : 'Annual'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Tax Payable</p>
                      <p className="font-bold text-lg">{formatPNGCurrency(calculationResult.taxPayable[form.watch('isFortnightly') ? 'fortnightly' : 'annual'])}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {form.watch('isFortnightly') 
                        ? `Annual equivalent: ${formatPNGCurrency(calculationResult.taxPayable.annual)}`
                        : `Fortnightly: ${formatPNGCurrency(calculationResult.taxPayable.fortnightly)}`
                      }
                    </p>
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm flex justify-between">
                        <span>Effective Tax Rate:</span>
                        <span className="font-semibold">{(calculationResult.effectiveTaxRate * 100).toFixed(2)}%</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed breakdown toggle */}
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full text-center justify-center"
                  >
                    {showDetails ? (
                      <>
                        <ArrowUp className="h-4 w-4 mr-2" />
                        Hide Calculation Details
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-4 w-4 mr-2" />
                        Show Calculation Details
                      </>
                    )}
                  </Button>

                  {showDetails && (
                    <div className="mt-4 space-y-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-lg text-sm">
                      <h3 className="font-medium">Tax Calculation Details</h3>
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Base Tax:</span>
                          <span>{formatPNGCurrency(calculationResult.taxBreakdown.baseTax)}</span>
                        </div>
                        
                        {calculationResult.taxBreakdown.dependantReduction > 0 && (
                          <div className="flex justify-between text-[#009c3f]">
                            <span>Dependant Reduction:</span>
                            <span>- {formatPNGCurrency(calculationResult.taxBreakdown.dependantReduction)}</span>
                          </div>
                        )}
                        
                        <Separator />
                        
                        <div className="flex justify-between font-medium">
                          <span>Final Tax (Fortnightly):</span>
                          <span>{formatPNGCurrency(calculationResult.taxPayable.fortnightly)}</span>
                        </div>
                        
                        <div className="flex justify-between font-medium">
                          <span>Final Tax (Annual):</span>
                          <span>{formatPNGCurrency(calculationResult.taxPayable.annual)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info box */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 p-4 rounded-md">
                  <div className="flex items-start gap-2">
                    <InfoIcon size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800 dark:text-amber-300">
                      <p className="font-medium mb-1">Important Note</p>
                      <p className="text-xs">
                        This calculator is for estimation purposes only and is based on the Income Tax (Salary and Wages Tax)(Rates)(2023 Budget)(Amendment) Act 2022. 
                        Consult a tax professional for official advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <Calculator size={48} className="text-muted-foreground mb-4 opacity-20" />
                <p className="text-muted-foreground">Enter your details and click 'Calculate Tax' to see your tax results</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-4">
            {calculationResult && (
              <div className="flex flex-col gap-2 w-full">
                <Button variant="outline" className="w-full" onClick={generatePDF}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Report
                </Button>
                <Button variant="outline" className="w-full" onClick={printResults}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Results
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
      
      {/* Tax Info Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Papua New Guinea Tax Information</CardTitle>
          <CardDescription>
            Key tax information for individuals in Papua New Guinea
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center">
                <InfoIcon className="h-4 w-4 mr-2 text-primary" />
                Resident Tax Rules
              </h3>
              <p className="text-sm text-muted-foreground">
                Residents with a tax declaration lodged pay 0% on income up to K769.23 fortnightly. 
                For higher incomes, tax rates range from 30% to 42% with dependant deductions available.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center">
                <InfoIcon className="h-4 w-4 mr-2 text-primary" />
                Non-Resident Tax Rules
              </h3>
              <p className="text-sm text-muted-foreground">
                Non-residents pay a minimum tax rate of 22%, which increases to 42% for high incomes. 
                No dependant deductions are available for non-resident taxpayers.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center">
                <InfoIcon className="h-4 w-4 mr-2 text-primary" />
                Dependant Reductions
              </h3>
              <p className="text-sm text-muted-foreground">
                For residents with lodged declarations: 1 dependant: 10% tax reduction (max K17.31), 
                2 dependants: 15% (max K28.85), 3+ dependants: 35% (max K40.38).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="mt-8 text-sm text-center text-muted-foreground">
        <p className="mb-1">For official tax advice, contact the Papua New Guinea Internal Revenue Commission</p>
        <p>Website: <a href="https://irc.gov.pg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://irc.gov.pg</a></p>
      </div>
    </div>
  );
};

export default PNGIncomeTaxCalculator;
