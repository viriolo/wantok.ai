
import { useState, useRef, useEffect } from "react";
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, User, Bot, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import AIInsightsService from "@/services/AIInsightsService";
import AuditTrailService from "@/services/AuditTrailService";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your tax assistant for Papua New Guinea businesses. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const aiInsightsService = AIInsightsService.getInstance();
  const auditService = AuditTrailService.getInstance();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent | null = null, suggestion: string | null = null) => {
    if (e) e.preventDefault();
    
    const messageContent = suggestion || input;
    if (!messageContent.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Log the AI interaction
      const userId = "guest"; // In a real app, this would be the logged-in user's ID
      auditService.logAction(
        userId,
        detectMessageType(messageContent),
        { query: messageContent }
      );
      
      // Simulate AI response
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate response based on user input
      let response = "";
      
      // Check if query is related to advanced tax planning features
      if (messageContent.toLowerCase().includes("strategic") || 
          messageContent.toLowerCase().includes("planning") || 
          messageContent.toLowerCase().includes("optimization")) {
        response = getStrategicPlanningResponse(messageContent);
      } else if (messageContent.toLowerCase().includes("international") || 
                 messageContent.toLowerCase().includes("foreign") || 
                 messageContent.toLowerCase().includes("transfer pricing")) {
        response = getInternationalTransactionResponse(messageContent);
      } else if (messageContent.toLowerCase().includes("business decision") || 
                 messageContent.toLowerCase().includes("restructure") || 
                 messageContent.toLowerCase().includes("acquisition")) {
        response = getBusinessDecisionResponse(messageContent);
      } else if (messageContent.toLowerCase().includes("audit") || 
                 messageContent.toLowerCase().includes("representation")) {
        response = getAuditRepresentationResponse(messageContent);
      } else if (messageContent.toLowerCase().includes("deadline")) {
        response = "The tax filing deadline for Papua New Guinea businesses varies by tax type. For GST, it's typically due by the 21st day of the month following the end of your taxable period. For annual income tax returns, the deadline is February 28th for the previous tax year.";
      } else if (messageContent.toLowerCase().includes("deduction") || messageContent.toLowerCase().includes("expense")) {
        response = "In Papua New Guinea, businesses can generally deduct legitimate business expenses including: employee wages, rent, utilities, marketing costs, and depreciation of assets. Remember to keep proper documentation for all claimed deductions.";
      } else if (messageContent.toLowerCase().includes("penalty") || messageContent.toLowerCase().includes("late")) {
        response = "Late filing penalties in PNG can be significant. For late tax returns, the Internal Revenue Commission typically imposes a penalty of 20% of the tax payable, plus an additional 20% per annum on the amount of tax unpaid.";
      } else {
        response = "Thank you for your question. As a tax assistant for Papua New Guinea businesses, I can help with filing deadlines, deductions, GST compliance, and other tax matters specific to PNG regulations. I can assist with strategic tax planning, international transactions, business decisions, and audit representation. Could you provide more details about your business type and specific tax concern?";
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Determine what type of AI action this is for audit logging
  const detectMessageType = (message: string): "ai_strategic_planning" | "ai_international_transaction" | "ai_business_decision" | "ai_professional_referral" | "tax_calculation" => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("strategic") || lowerMessage.includes("planning") || lowerMessage.includes("optimization")) {
      return "ai_strategic_planning";
    } else if (lowerMessage.includes("international") || lowerMessage.includes("foreign") || lowerMessage.includes("transfer pricing")) {
      return "ai_international_transaction";
    } else if (lowerMessage.includes("business decision") || lowerMessage.includes("restructure") || lowerMessage.includes("acquisition")) {
      return "ai_business_decision";
    } else if (lowerMessage.includes("professional") || lowerMessage.includes("consultant") || lowerMessage.includes("expert")) {
      return "ai_professional_referral";
    } else {
      return "tax_calculation";
    }
  };

  // Generate responses for advanced tax planning features
  const getStrategicPlanningResponse = (message: string): string => {
    const needsProfessional = message.length > 50;
    
    let response = "Based on PNG tax regulations, strategic tax planning involves understanding specific deductions and credits available to your business type. ";
    
    if (needsProfessional) {
      response += "Your question involves complex strategic planning that may benefit from professional consultation. I've added an insight to your dashboard that highlights relevant PNG tax regulations and recommends next steps. Key considerations include timing of income recognition, strategic expense allocation, and industry-specific incentives available under PNG tax law.";
    } else {
      response += "For basic strategic planning, ensure you're taking advantage of all allowable deductions and consider the timing of income recognition and expenses. PNG offers specific incentives for certain industries and business activities.";
    }
    
    return response;
  };
  
  const getInternationalTransactionResponse = (message: string): string => {
    // International transactions almost always require professional help
    const response = "International transactions under PNG tax law have significant compliance requirements. Your situation involves cross-border transactions that trigger specific reporting and documentation requirements. I've flagged this in your dashboard as requiring professional consultation due to the complexity of PNG's transfer pricing rules, foreign exchange control regulations, and potential withholding tax obligations. Would you like me to explain any specific aspect of PNG's international tax requirements?";
    
    return response;
  };
  
  const getBusinessDecisionResponse = (message: string): string => {
    const needsProfessional = message.toLowerCase().includes("acquisition") || message.toLowerCase().includes("merger") || message.length > 60;
    
    let response = "Business decisions can have significant tax implications under PNG tax law. ";
    
    if (needsProfessional) {
      response += "The business decision you're considering has complex tax implications specific to PNG regulations. I've added an insight to your dashboard recommending professional consultation. Key considerations include potential asset transfer taxes, restructuring implications, and industry-specific regulations that may apply to your situation.";
    } else {
      response += "When making business decisions, consider the tax implications of different entity structures, potential industry-specific incentives, and timing of transactions. PNG tax law has specific provisions that may impact your decision.";
    }
    
    return response;
  };
  
  const getAuditRepresentationResponse = (message: string): string => {
    // Audit representation almost always requires professional help
    const response = "Regarding audit representation, PNG's tax authority (IRC) has specific procedures and documentation requirements. Given the complexity of tax audits, I've flagged this as requiring professional consultation in your dashboard. Key preparations include organizing supporting documentation, reviewing potential areas of scrutiny based on your business type, and understanding IRC audit procedures. Would you like specific information about audit preparation under PNG tax regulations?";
    
    return response;
  };

  const suggestions = [
    "What strategic tax planning options do I have for my business?",
    "How do I handle international transactions under PNG tax law?",
    "What tax implications should I consider for business restructuring?",
    "How should I prepare for a potential tax audit?",
  ];

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <BlurCard className="flex-1 flex flex-col h-full" variant="bordered">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-png-red/20 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-png-red" />
            </div>
            <h2 className="font-semibold">AI Tax Assistant</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={() => setMessages([{
              id: "1",
              content: "Hello! I'm your tax assistant for Papua New Guinea businesses. How can I help you today?",
              role: "assistant",
              timestamp: new Date(),
            }])}
          >
            New Chat
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === "user"
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-png-red"
                      : "bg-secondary dark:bg-secondary/50"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-png-red text-white"
                      : "bg-secondary/50 dark:bg-secondary/20"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="h-8 w-8 rounded-full bg-secondary dark:bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 dark:bg-secondary/20">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="h-2 w-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="h-2 w-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex justify-between text-xs"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              <span className="flex items-center">
                <Lightbulb className="h-3 w-3 mr-1" />
                Suggested questions
              </span>
              {showSuggestions ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </Button>
            
            {showSuggestions && (
              <div className="grid grid-cols-1 gap-2 mt-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="text-xs justify-start h-auto py-2"
                    onClick={() => handleSubmit(null, suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your tax question here..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-png-red hover:bg-png-red/90"
              disabled={!input.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </BlurCard>
    </div>
  );
};

export default AIAssistant;
