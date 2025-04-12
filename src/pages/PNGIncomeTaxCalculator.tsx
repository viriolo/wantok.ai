
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
  Flag, Plus, Trash2
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  income: z.coerce.number()
    .positive('Income must be a positive number')
    .min(0, 'Income cannot be negative'),
  isFortnightly: z.boolean().default(true),
  isResident: z.boolean().default(true),
  hasDeclarationLodged: z.boolean().default(true),
  dependants: z.enum(['0', '1', '2', '3']).default('0'),
  hasSalarySacrifice: z.boolean().default(false),
  hasNasfund: z.boolean().default(false),
  otherDeductions: z.array(
    z.object({
      name: z.string().min(1, "Deduction name is required"),
      amount: z.coerce.number().min(0, "Amount must be a positive number")
    })
  ).default([]),
  hasOtherDeductions: z.boolean().default(false)
});

type FormValues = z.infer<typeof formSchema>;

const PNGIncomeTaxCalculator = () => {
  const [calculationResult, setCalculationResult] = useState<PNGTaxResult | null>(null);
  // Changed to default true to show details by default
  const [showDetails, setShowDetails] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 0,
      isFortnightly: true,
      isResident: true,
      hasDeclarationLodged: true,
      dependants: '0',
      hasSalarySacrifice: false,
      hasNasfund: false,
      otherDeductions: [],
      hasOtherDeductions: false
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "otherDeductions",
  });

  const hasOtherDeductions = form.watch('hasOtherDeductions');
  
  React.useEffect(() => {
    if (hasOtherDeductions && fields.length === 0) {
      append({ name: '', amount: 0 });
    } else if (!hasOtherDeductions && fields.length > 0) {
      for (let i = fields.length - 1; i >= 0; i--) {
        remove(i);
      }
    }
  }, [hasOtherDeductions, fields.length, append, remove]);

  const handleCalculate = (data: FormValues) => {
    try {
      // Fix here: Ensure we're passing properly typed data to calculatePNGIncomeTax
      const taxInput: PNGTaxInput = {
        income: data.income,
        isFortnightly: data.isFortnightly,
        isResident: data.isResident,
        hasDeclarationLodged: data.hasDeclarationLodged,
        dependants: parseInt(data.dependants) as 0 | 1 | 2 | 3,
        hasSalarySacrifice: data.hasSalarySacrifice,
        hasNasfund: data.hasNasfund,
        otherDeductions: data.hasOtherDeductions 
          ? data.otherDeductions.map(d => ({ 
              name: d.name || "Unnamed Deduction", // Provide default name
              amount: d.amount || 0 // Provide default amount
            })) 
          : []
      };

      const result = calculatePNGIncomeTax(taxInput);
      setCalculationResult(result);
      setShowDetails(true); // Always show details when calculation is performed

      toast({
        title: "Tax Calculation Complete",
        description: "Your tax calculation has been processed.",
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
  };

  const printResults = () => {
    window.print();
  };

  const addDeduction = () => {
    append({ name: '', amount: 0 });
  };

  // Function to determine tax bracket description
  const getTaxBracketDescription = (fortnightlyIncome: number): string => {
    if (fortnightlyIncome <= 769.23) {
      return "K0 - K769.23";
    } else if (fortnightlyIncome > 769.23 && fortnightlyIncome < 1269.23) {
      return "K769.23 - K1,269.23";
    } else if (fortnightlyIncome < 2692.31) {
      return "K1,269.23 - K2,692.31";
    } else if (fortnightlyIncome < 9615.38) {
      return "K2,692.31 - K9,615.38";
    } else {
      return "Above K9,615.38";
    }
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
            Calculate your salary and wages tax based on the Income Tax Act 2023. 
            Simply enter your income and details below to get an estimate.
          </p>
        </div>
        <Calculator size={48} className="text-primary opacity-80 hidden md:block" />
      </div>

      {/* Important notes section - moved to top and always visible */}
      <Card className="mb-8 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-2">
            <AlertTriangle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800 dark:text-amber-300">
              <p className="font-medium mb-1">Important Notice</p>
              <p>
                This calculator is for estimation purposes only and is based on the Income Tax (Salary and Wages Tax)(Rates)(2023 Budget)(Amendment) Act 2022. 
                For official tax advice, please consult a tax professional or contact the Internal Revenue Commission.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-12">
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
                          Are you a resident for tax purposes?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {field.value ? "Yes" : "No"}
                          </span>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

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
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {field.value ? "Yes" : "No"}
                          </span>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

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
                                <p>Dependants reduce your tax liability. 1 dependant: 10% reduction (max K17.31), 2 dependants: 15% reduction (max K28.85), 3+ dependants: 35% reduction (max K40.38). Only applicable if you are a resident and have lodged a tax declaration.</p>
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

                <FormField
                  control={form.control}
                  name="hasSalarySacrifice"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Salary Sacrifice (40%)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground inline-block" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-80">
                                <p>If enabled, 40% of your salary will be deducted as salary sacrifice.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormDescription>
                          Apply salary sacrifice to your calculation?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {field.value ? "Yes" : "No"}
                          </span>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasNasfund"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Nasfund Contribution (6%)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground inline-block" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-80">
                                <p>If enabled, 6% of your salary will be contributed to Nasfund.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormDescription>
                          Apply Nasfund contribution to your calculation?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {field.value ? "Yes" : "No"}
                          </span>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hasOtherDeductions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Other Deductions
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground inline-block" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-80">
                                <p>Add custom deductions such as loans, health insurance, or other regular payments.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormDescription>
                          Do you have additional deductions to include?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {field.value ? "Yes" : "No"}
                          </span>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-blue-600"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch('hasOtherDeductions') && (
                  <div className="space-y-4 border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium">Deduction Details</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addDeduction}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-3 w-3" /> Add
                      </Button>
                    </div>
                    
                    {fields.map((field, index) => (
                      <div key={field.id} className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-7">
                          <FormField
                            control={form.control}
                            name={`otherDeductions.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">Deduction Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="e.g., Loan payment"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-4">
                          <FormField
                            control={form.control}
                            name={`otherDeductions.${index}.amount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm">Amount</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">K</span>
                                    <Input 
                                      type="number"
                                      placeholder="0.00" 
                                      className="pl-8"
                                      {...field}
                                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="col-span-1">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            onClick={() => remove(index)}
                            className="p-0 h-9 w-9 flex items-center justify-center text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
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

        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tax Results</span>
              <Badge className="ml-2 bg-[#009c3f] text-white">2023</Badge>
            </CardTitle>
            <CardDescription>
              Your calculated tax liability and net pay
            </CardDescription>
          </CardHeader>
          <CardContent>
            {calculationResult ? (
              <div className="space-y-6">
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
                      <p className="text-sm font-medium text-muted-foreground mb-1">Net Income (After Tax)</p>
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

                  {/* Tax Bracket information - Added as requested */}
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Tax Bracket</h3>
                    <p className="text-sm">
                      {getTaxBracketDescription(calculationResult.grossIncome.fortnightly)}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <h3 className="font-medium mb-3">Deductions</h3>
                    <div className="space-y-2">
                      {calculationResult.deductions.salarySacrifice > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Salary Sacrifice (40%):</span>
                          <span className="font-medium">- {formatPNGCurrency(calculationResult.deductions.salarySacrifice)}</span>
                        </div>
                      )}
                      
                      {calculationResult.deductions.nasfund > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>Nasfund Contribution (6%):</span>
                          <span className="font-medium">- {formatPNGCurrency(calculationResult.deductions.nasfund)}</span>
                        </div>
                      )}
                      
                      {calculationResult.deductions.other.length > 0 && (
                        <>
                          <p className="text-sm font-medium mt-2 mb-1">Other Deductions:</p>
                          {calculationResult.deductions.other.map((deduction, idx) => (
                            <div key={idx} className="flex justify-between text-sm pl-4">
                              <span>{deduction.name || "Deduction"}:</span>
                              <span className="font-medium">- {formatPNGCurrency(deduction.amount)}</span>
                            </div>
                          ))}
                        </>
                      )}
                      
                      <div className="pt-2 mt-1 border-t flex justify-between font-medium">
                        <span>Total Deductions:</span>
                        <span>- {formatPNGCurrency(calculationResult.deductions.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#009c3f]/10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Final Net Pay</h3>
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">{form.watch('isFortnightly') ? 'Fortnightly:' : 'Annual:'}</span>
                        <span className="font-bold text-xl text-[#009c3f]">
                          {formatPNGCurrency(calculationResult.finalNetPay[form.watch('isFortnightly') ? 'fortnightly' : 'annual'])}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {form.watch('isFortnightly') 
                          ? `Annual equivalent: ${formatPNGCurrency(calculationResult.finalNetPay.annual)}`
                          : `Fortnightly: ${formatPNGCurrency(calculationResult.finalNetPay.fortnightly)}`
                        }
                      </div>
                    </div>
                  </div>
                </div>

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

                        {calculationResult.taxBreakdown.dependantReduction > 0 && (
                          <div className="pt-2 mt-2 border-t">
                            <p className="text-[#009c3f] font-medium">
                              Dependant Reduction: {formatPNGCurrency(calculationResult.taxBreakdown.dependantReduction)} per fortnight 
                              ({formatPNGCurrency(calculationResult.taxBreakdown.dependantReduction * 26)} annually)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
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

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tax Information</CardTitle>
          <CardDescription>
            Key tax information for individuals
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
                Salary Sacrifice
              </h3>
              <p className="text-sm text-muted-foreground">
                Salary sacrifice allows you to allocate 40% of your income toward benefits like housing, 
                vehicle allowances, or retirement contributions before tax is calculated.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center">
                <InfoIcon className="h-4 w-4 mr-2 text-primary" />
                Nasfund Contributions
              </h3>
              <p className="text-sm text-muted-foreground">
                The standard Nasfund contribution is 6% of your salary. This is a compulsory superannuation 
                contribution that is deducted from your net income after tax.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer with contact information - Added as requested */}
      <div className="mt-8 border-t pt-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p className="text-sm text-muted-foreground mb-2">For additional assistance with tax calculations:</p>
            <p className="text-sm mb-1"><strong>Email:</strong> support@pngtax.com</p>
            <p className="text-sm"><strong>Phone:</strong> (+675) 123-4567</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Official Resources</h3>
            <p className="text-sm text-muted-foreground mb-2">For official tax information and services:</p>
            <p className="text-sm mb-1">
              <a href="https://irc.gov.pg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                PNG Internal Revenue Commission
              </a>
            </p>
            <p className="text-sm">
              <a href="https://www.nasfund.com.pg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Nasfund
              </a>
            </p>
          </div>
        </div>
        <div className="mt-6 text-sm text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} PNG Tax System. All calculations are based on the Income Tax (Salary and Wages Tax)(Rates)(2023 Budget)(Amendment) Act 2022.</p>
          <p className="mt-1">This calculator is for estimation purposes only. Consult a tax professional for official advice.</p>
        </div>
      </div>
    </div>
  );
};

export default PNGIncomeTaxCalculator;
