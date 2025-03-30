
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaxServices } from '@/hooks/useTaxServices';
import { TaxInput, TaxResult } from '@/services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Calculator, Info, FileText } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  businessType: z.enum(['sole_proprietor', 'partnership', 'company', 'sme'], {
    required_error: "Please select a business type.",
  }),
  annualRevenue: z.coerce.number().min(0, "Revenue must be a positive number"),
  expenses: z.coerce.number().min(0, "Expenses must be a positive number"),
  hasGstRegistration: z.boolean().default(false),
  industry: z.string().optional(),
});

const TaxCalculator = () => {
  const navigate = useNavigate();
  const userId = 'user123'; // In a real app, get from auth context
  const { calculateTaxes, validateData, results } = useTaxServices(userId);
  const [validationError, setValidationError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: 'sole_proprietor',
      annualRevenue: 0,
      expenses: 0,
      hasGstRegistration: false,
      industry: 'general',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Validate data
    const validation = validateData(data);
    if (!validation.valid) {
      const errors = validation.validationResults.filter(result => !result.valid);
      if (errors.length > 0) {
        setValidationError(errors[0].errorMessage);
        toast({
          title: "Validation Error",
          description: errors[0].errorMessage,
          variant: "destructive",
        });
        return;
      }
    }

    // Calculate taxes
    const taxInput: TaxInput = {
      businessType: data.businessType,
      annualRevenue: data.annualRevenue,
      expenses: data.expenses,
      hasGstRegistration: data.hasGstRegistration,
      industry: data.industry,
    };

    calculateTaxes(taxInput);
    toast({
      title: "Tax Calculation Complete",
      description: "Your tax calculation has been processed.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tax Calculator</h1>
          <p className="text-muted-foreground mt-2">
            Calculate your tax liability based on Papua New Guinea tax laws
          </p>
        </div>
        <Calculator size={48} className="text-primary opacity-80" />
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        {/* Input Form */}
        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>
              Enter your business details to calculate your tax liability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a business type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sole_proprietor">Sole Proprietor</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="sme">SME</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Different business types have different tax requirements
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="mining">Mining</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Some industries have special tax considerations
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="annualRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Annual Revenue (PGK)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="0" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expenses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expenses (PGK)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="hasGstRegistration"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          GST Registration
                        </FormLabel>
                        <FormDescription>
                          Is your business registered for Goods & Services Tax?
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

                {validationError && (
                  <div className="text-destructive text-sm">{validationError}</div>
                )}

                <Button type="submit" className="w-full">
                  Calculate Tax Liability
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Tax Results</span>
              <FileText size={20} />
            </CardTitle>
            <CardDescription>
              Your calculated tax liability
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">Taxable Income:</span>
                    <span className="font-semibold">{results.taxableIncome.toLocaleString()} PGK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">Income Tax:</span>
                    <span className="font-semibold">{results.incomeTax.toLocaleString()} PGK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">GST Payable:</span>
                    <span className="font-semibold">{results.gstPayable.toLocaleString()} PGK</span>
                  </div>
                  
                  <div className="h-px w-full bg-border my-4" />
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">Total Tax Liability:</span>
                    <span className="font-bold text-lg">{results.totalTaxLiability.toLocaleString()} PGK</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">Effective Tax Rate:</span>
                    <span className="font-semibold">{(results.effectiveTaxRate * 100).toFixed(2)}%</span>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-4 rounded-md">
                  <div className="flex items-start gap-2">
                    <Info size={18} className="text-primary mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Tax Breakdown</p>
                      <p className="text-muted-foreground">
                        Income Tax: {((results.incomeTax / results.totalTaxLiability) * 100).toFixed(1)}%<br />
                        GST: {((results.gstPayable / results.totalTaxLiability) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <p className="text-muted-foreground">Enter your business details and click calculate to see your tax results</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-4">
            {results && (
              <Button variant="outline" className="w-full">
                Download Tax Report
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      {/* Tax Info Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Papua New Guinea Tax Information</CardTitle>
          <CardDescription>
            Key tax information for businesses operating in Papua New Guinea
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-semibold">Income Tax</h3>
              <p className="text-sm text-muted-foreground">Personal tax rates range from 22% to 40% depending on income. Companies are taxed at a flat rate of 30%.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">GST</h3>
              <p className="text-sm text-muted-foreground">Goods and Services Tax is levied at 10% on most goods and services. Registration is required for businesses with turnover over 250,000 PGK.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">SME Benefits</h3>
              <p className="text-sm text-muted-foreground">Small and Medium Enterprises with turnover under 250,000 PGK receive a 25% reduction in their income tax liability.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxCalculator;
