
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, FileText, MessageSquare, Mail } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Help = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & FAQ</h1>
          <p className="text-muted-foreground mt-2">
            Find answers to common questions about PNG tax regulations and our platform
          </p>
        </div>
        <HelpCircle size={48} className="text-primary opacity-80" />
      </div>
      
      <div className="w-full max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search for help topics..." 
            className="pl-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="faq" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
          <TabsTrigger value="guides">Tax Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <BlurCard>
            <div className="p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What tax rates apply to businesses in PNG?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">The standard corporate tax rate in Papua New Guinea is 30% for resident companies and 48% for non-resident companies.</p>
                    <p>Small businesses with turnover less than K250,000 per annum may qualify for the Small Business Tax rate of 2% on gross income.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    When are GST returns due in Papua New Guinea?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>GST returns in Papua New Guinea must be filed by the 21st day of the month following the end of the taxable period. The standard taxable period is monthly, but businesses with annual turnover less than K250,000 may apply for quarterly filing.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How do I register my business for tax in PNG?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>To register your business for tax in Papua New Guinea, you need to:</p>
                    <ol className="list-decimal pl-5 space-y-1 mt-2">
                      <li>Complete the TIN registration form (Form IR1)</li>
                      <li>Submit the form to the Internal Revenue Commission (IRC)</li>
                      <li>If required, register for GST using Form GST 1</li>
                      <li>Register for Salary & Wages Tax if you have employees</li>
                    </ol>
                    <p className="mt-2">Our platform can help guide you through this process and generate the necessary forms.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    What documents do I need to keep for tax purposes?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Businesses in PNG must keep the following records for at least 7 years:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>All sales and purchase invoices</li>
                      <li>Cash register receipts</li>
                      <li>Bank statements and deposit slips</li>
                      <li>Asset purchase and disposal records</li>
                      <li>Payroll records</li>
                      <li>Expense receipts</li>
                      <li>Inventory records</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    How does our tax calculator work?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Our tax calculator uses the latest PNG tax regulations to compute your tax obligations accurately. It takes into account:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Business income and expenses</li>
                      <li>Applicable tax rates based on business type</li>
                      <li>Available deductions and credits</li>
                      <li>GST calculations</li>
                      <li>Payroll tax requirements</li>
                    </ul>
                    <p className="mt-2">The calculator is regularly updated to reflect changes in PNG tax laws.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Is my data secure on your platform?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Yes, we take data security very seriously. Our platform implements:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>End-to-end encryption for all data transfers</li>
                      <li>Secure cloud storage with regular backups</li>
                      <li>Strict access controls and authentication</li>
                      <li>Compliance with Papua New Guinea data protection laws</li>
                      <li>Regular security audits and updates</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </BlurCard>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid gap-4 md:grid-cols-2">
            <BlurCard className="h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">PNG Income Tax Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete guide to income tax for PNG businesses
                    </p>
                  </div>
                  <FileText className="h-5 w-5 text-png-red" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm">
                    This comprehensive guide covers all aspects of income tax for businesses operating in Papua New Guinea, including filing requirements, deadlines, and calculation methods.
                  </p>
                </div>
                <Button className="mt-4 w-full bg-png-red hover:bg-png-red/90">
                  Download Guide
                </Button>
              </div>
            </BlurCard>
            
            <BlurCard className="h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">GST Compliance Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Understanding GST in Papua New Guinea
                    </p>
                  </div>
                  <FileText className="h-5 w-5 text-png-red" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm">
                    Learn about Goods and Services Tax in PNG, including registration requirements, filing periods, input tax credits, and common compliance issues.
                  </p>
                </div>
                <Button className="mt-4 w-full bg-png-red hover:bg-png-red/90">
                  Download Guide
                </Button>
              </div>
            </BlurCard>
            
            <BlurCard className="h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Payroll Tax Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Managing employee taxes correctly
                    </p>
                  </div>
                  <FileText className="h-5 w-5 text-png-red" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm">
                    A complete resource for handling salary and wages tax, superannuation, and other employee-related tax obligations in Papua New Guinea.
                  </p>
                </div>
                <Button className="mt-4 w-full bg-png-red hover:bg-png-red/90">
                  Download Guide
                </Button>
              </div>
            </BlurCard>
            
            <BlurCard className="h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Tax Deductions Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Maximizing your legitimate deductions
                    </p>
                  </div>
                  <FileText className="h-5 w-5 text-png-red" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm">
                    Explore allowable business deductions in PNG, including capital allowances, business expenses, and special industry provisions to minimize your tax liability legally.
                  </p>
                </div>
                <Button className="mt-4 w-full bg-png-red hover:bg-png-red/90">
                  Download Guide
                </Button>
              </div>
            </BlurCard>
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          <BlurCard>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Our Support Team</h2>
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary/50 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-png-red" />
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Available Monday to Friday, 9am - 5pm PNG time
                    </p>
                    <Button variant="link" className="p-0 h-auto text-png-red mt-1">
                      Start Chat Session
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-secondary/50 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-png-red" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll respond within 24 hours
                    </p>
                    <Button variant="link" className="p-0 h-auto text-png-red mt-1">
                      support@wantok.ai
                    </Button>
                  </div>
                </div>
              </div>
              
              <h3 className="font-medium mb-4">Send us a message</h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Please describe your question or issue"
                  />
                </div>
                <Button className="w-full bg-png-red hover:bg-png-red/90">
                  Send Message
                </Button>
              </div>
            </div>
          </BlurCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;
