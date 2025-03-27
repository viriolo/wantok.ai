
import { BlurCard } from "@/components/ui/blur-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, BarChart, AlertCircle, CheckCircle, Upload, MessageSquare } from "lucide-react";

const Dashboard = () => {
  // Mock data
  const taxSummary = {
    filingDue: "10 March 2024",
    estimatedTax: "25,450 PGK",
    status: "In Progress",
    progress: 65,
  };

  const notifications = [
    {
      id: 1,
      type: "alert",
      message: "Your Q1 tax filing deadline is approaching",
      time: "2 days ago",
    },
    {
      id: 2,
      type: "success",
      message: "Successfully uploaded financial documents",
      time: "1 week ago",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <div className="md:col-span-2 space-y-6">
        <BlurCard className="p-6" variant="bordered">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tax Filing Status</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              {taxSummary.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-foreground/70">Filing Due</p>
              <p className="font-medium">{taxSummary.filingDue}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Estimated Tax</p>
              <p className="font-medium">{taxSummary.estimatedTax}</p>
            </div>
            <div>
              <p className="text-sm text-foreground/70">Completion</p>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-png-red"
                    style={{ width: `${taxSummary.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium">{taxSummary.progress}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button className="flex items-center gap-2 bg-png-red hover:bg-png-red/90">
              <FileText className="h-4 w-4" />
              Continue Filing
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              View Reports
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Documents
            </Button>
          </div>
        </BlurCard>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BlurCard className="p-6" variant="bordered">
            <h3 className="text-lg font-medium mb-4">Upcoming Tasks</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-secondary/70 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3 w-3 text-foreground/70" />
                </div>
                <div>
                  <p className="text-sm font-medium">Complete GST Registration</p>
                  <p className="text-xs text-foreground/70">Due in 5 days</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-secondary/70 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3 w-3 text-foreground/70" />
                </div>
                <div>
                  <p className="text-sm font-medium">Review Financial Statements</p>
                  <p className="text-xs text-foreground/70">Due in 7 days</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-secondary/70 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-3 w-3 text-foreground/70" />
                </div>
                <div>
                  <p className="text-sm font-medium">Submit Employee Payroll Taxes</p>
                  <p className="text-xs text-foreground/70">Due in 14 days</p>
                </div>
              </li>
            </ul>
          </BlurCard>
          
          <BlurCard className="p-6" variant="bordered">
            <h3 className="text-lg font-medium mb-4">AI Insights</h3>
            <div className="space-y-3">
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-sm">Based on your recent transactions, you may qualify for a small business tax deduction worth up to <strong>3,200 PGK</strong>.</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-sm">New GST regulations affecting your industry took effect last month. Click to learn more about compliance requirements.</p>
              </div>
              <div className="p-3 bg-secondary/30 rounded-lg">
                <p className="text-sm">Your business has consistent late filing patterns. Setting up reminders could help avoid future penalties.</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full mt-3 text-sm">
              View All Insights
            </Button>
          </BlurCard>
        </div>
      </div>
      
      <div className="space-y-6">
        <BlurCard className="p-6" variant="bordered">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex flex-col items-center justify-center h-20 text-center p-1">
              <Upload className="h-5 w-5 mb-1" />
              <span className="text-xs">Upload Documents</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-20 text-center p-1">
              <MessageSquare className="h-5 w-5 mb-1" />
              <span className="text-xs">Ask AI Assistant</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-20 text-center p-1">
              <FileText className="h-5 w-5 mb-1" />
              <span className="text-xs">File a Return</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-20 text-center p-1">
              <BarChart className="h-5 w-5 mb-1" />
              <span className="text-xs">View Reports</span>
            </Button>
          </div>
        </BlurCard>
        
        <BlurCard className="p-6" variant="bordered">
          <h3 className="font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex gap-3 items-start">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'alert' 
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200' 
                    : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {notification.type === 'alert' ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-foreground/70">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-3 text-sm">
            View All Notifications
          </Button>
        </BlurCard>
        
        <BlurCard className="p-6" variant="bordered">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-foreground/70 mb-4">
            Have questions about your tax filing? Our AI assistant can help.
          </p>
          <Button className="w-full bg-png-red hover:bg-png-red/90">
            Chat with AI Assistant
          </Button>
        </BlurCard>
      </div>
    </div>
  );
};

export default Dashboard;
