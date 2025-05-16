
import React, { useState } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Upload, Book, Scale, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";

const LegalServices = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Legal Advisory Services</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get expert legal advice and guidance for your business or personal matters in Papua New Guinea.
              </p>
            </div>

            <BlurCard className="p-6 mb-8" variant="bordered">
              <Tabs defaultValue="chat">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" /> Chat with a Legal Advisor
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" /> Submit Documents
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <HelpCircle className="h-4 w-4" /> How it works
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Describe your legal question or issue in detail. Our legal team will review your inquiry 
                      and provide guidance based on Papua New Guinea law. For complex matters, we may 
                      schedule a consultation with one of our specialists.
                    </p>
                  </div>
                  
                  <form onSubmit={handleChatSubmit} className="space-y-4">
                    <Textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your legal question or issue..."
                      className="min-h-[150px]"
                      required
                    />
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !message.trim()} 
                      className="w-full"
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="bg-secondary/20 p-4 rounded-lg mb-4">
                    <h3 className="font-medium flex items-center gap-2 mb-2">
                      <HelpCircle className="h-4 w-4" /> How it works
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Upload legal documents that you need reviewed or explained. Our legal experts will analyze 
                      the documents and provide feedback or clarification based on Papua New Guinea law.
                    </p>
                  </div>
                  
                  <form onSubmit={handleDocumentSubmit} className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
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
                    
                    <Textarea 
                      placeholder="Provide additional details about your document or what you need help with..."
                      className="min-h-[100px]"
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !uploadedFile} 
                      className="w-full"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Document"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </BlurCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BlurCard className="p-6" variant="bordered">
                <div className="flex items-start mb-4">
                  <div className="p-2 rounded-full bg-secondary/50 mr-4">
                    <Scale className="h-6 w-6 text-blue-500" />
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
                    <Book className="h-6 w-6 text-blue-500" />
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalServices;
