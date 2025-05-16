
import React, { useState } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Upload, Book, Scale, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const LegalServices = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [openFAQ, setOpenFAQ] = useState<Record<number, boolean>>({});
  const { toast } = useToast();

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Our legal team will respond to your inquiry soon.",
      });
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Document Submitted",
        description: "Our legal team will review your document and respond soon.",
      });
      setUploadedFile(null);
      setIsSubmitting(false);
    }, 1500);
  };
  
  const toggleFAQ = (index: number) => {
    setOpenFAQ(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer: "For chat inquiries, we typically respond within 24 hours on business days. For document reviews, our response time depends on the complexity and length of the documents, but usually within 2-3 business days."
    },
    {
      question: "What types of legal documents can I submit?",
      answer: "We can review contracts, agreements, legal letters, and other business documents. We currently support PDF, DOC, DOCX, and TXT file formats with a maximum size of 10MB."
    },
    {
      question: "How secure is the information I provide?",
      answer: "We take data security seriously. All communications and documents are encrypted and stored securely. Your information is only accessible to our authorized legal advisors working on your case."
    }
  ];

  return (
    <div className="container max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Legal Advisory Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get expert legal advice and guidance for your business or personal matters in Papua New Guinea.
        </p>
      </div>

      <BlurCard className="p-6 mb-12" variant="bordered">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Chat with a Legal Advisor
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Upload className="h-4 w-4" /> Submit Documents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader className="bg-secondary/20 pb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" /> How it works
                </h3>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Describe your legal question or issue in detail. Our legal team will review your inquiry 
                  and provide guidance based on Papua New Guinea law. For complex matters, we may 
                  schedule a consultation with one of our specialists.
                </p>
              </CardContent>
            </Card>
            
            <form onSubmit={handleChatSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Your Legal Question</Label>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your legal question or issue in detail..."
                  className="min-h-[150px]"
                  required
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link> and understand my data will be processed according to the <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link>.
                </Label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting || !message.trim()} 
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader className="bg-secondary/20 pb-4">
                <h3 className="font-medium flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" /> How it works
                </h3>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Upload legal documents that you need reviewed or explained. Our legal experts will analyze 
                  the documents and provide feedback or clarification based on Papua New Guinea law.
                </p>
              </CardContent>
            </Card>
            
            <form onSubmit={handleDocumentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-name">Your Name</Label>
                  <Input 
                    id="doc-name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-email">Email Address</Label>
                  <Input 
                    id="doc-email"
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="document-upload">Upload Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
                  <Input
                    type="file"
                    id="document-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <label 
                    htmlFor="document-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-2">
                      {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX or TXT (max 10MB)
                    </p>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doc-message">Additional Information</Label>
                <Textarea 
                  id="doc-message"
                  placeholder="Provide additional details about your document or what you need help with..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="doc-terms" required />
                <Label htmlFor="doc-terms" className="text-sm text-muted-foreground">
                  I agree to the <Link to="/terms" className="text-primary hover:underline">terms and conditions</Link> and understand my data will be processed according to the <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link>.
                </Label>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting || !uploadedFile} 
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit Document"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </BlurCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <BlurCard className="p-6" variant="bordered">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-full bg-secondary/50 mr-4">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Legal Practice Areas</h3>
              <p className="text-muted-foreground">
                Our team of legal experts specializes in various areas of Papua New Guinea law.
              </p>
            </div>
          </div>
          <ul className="space-y-2 pl-12">
            <li>Business & Commercial Law</li>
            <li>Employment & Labor Law</li>
            <li>Property & Real Estate</li>
            <li>Tax Compliance & Planning</li>
            <li>Contract Review & Negotiation</li>
            <li>Dispute Resolution</li>
          </ul>
        </BlurCard>
        
        <BlurCard className="p-6" variant="bordered">
          <div className="flex items-start mb-4">
            <div className="p-2 rounded-full bg-secondary/50 mr-4">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Legal Resources</h3>
              <p className="text-muted-foreground">
                Access guides and information about Papua New Guinea legal matters.
              </p>
            </div>
          </div>
          <ul className="space-y-2 pl-12">
            <li>Business Registration Guide</li>
            <li>Employment Contract Templates</li>
            <li>Tax Compliance Checklists</li>
            <li>Legal FAQ for PNG Businesses</li>
            <li>Property Transaction Guide</li>
            <li>Dispute Resolution Procedures</li>
          </ul>
        </BlurCard>
      </div>
      
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible 
              key={index} 
              open={openFAQ[index]} 
              onOpenChange={() => toggleFAQ(index)}
              className="border rounded-md overflow-hidden"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                <h4 className="font-medium">{faq.question}</h4>
                <span className="text-muted-foreground">{openFAQ[index] ? '−' : '+'}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 text-muted-foreground border-t">
                {faq.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
      
      <div className="bg-secondary/10 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">Need Immediate Assistance?</h3>
        <p className="text-center mb-6">Our team of legal professionals is ready to help you with any legal matters.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button variant="outline">Call Us: +675 123 4567</Button>
          <Button>Email Us</Button>
        </div>
      </div>
    </div>
  );
};

// Helper component for internal links
const Link = ({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) => {
  return <a href={to} className={className}>{children}</a>;
};

export default LegalServices;
