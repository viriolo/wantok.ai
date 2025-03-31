
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileText, AlertTriangle, Calendar, TrendingUp, Users, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = ({ className = "", ...props }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tax Calculator</CardTitle>
          <Calculator className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Tax Tools</div>
          <p className="text-xs text-muted-foreground mt-1">
            Calculate your tax obligations
          </p>
          <Link 
            to="/tax-calculator"
            className="text-primary hover:underline text-sm block mt-2"
          >
            Open Calculator
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tax Reports</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Reports</div>
          <p className="text-xs text-muted-foreground mt-1">
            View and download tax statements
          </p>
          <Link 
            to="/reports"
            className="text-primary hover:underline text-sm block mt-2"
          >
            View Reports
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Tax Calendar</div>
          <p className="text-xs text-muted-foreground mt-1">
            Your next filing deadline: <span className="font-medium">June 30, 2024</span>
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>GST Filing</span>
              <span className="font-medium">15 days left</span>
            </div>
            <Progress value={50} className="h-1" />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tax Compliance Status</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xl font-bold flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                Good Standing
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                All filings are up to date
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span>Annual Tax Filings</span>
                <span className="text-green-500">Complete</span>
              </div>
              <Progress value={100} className="h-1" />
              
              <div className="flex items-center justify-between text-xs">
                <span>GST Compliance</span>
                <span className="text-green-500">Complete</span>
              </div>
              <Progress value={100} className="h-1" />
              
              <div className="flex items-center justify-between text-xs">
                <span>Employee Tax Withholding</span>
                <span className="text-yellow-500">Pending</span>
              </div>
              <Progress value={75} className="h-1" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Report downloaded</span>
              </div>
              <span className="text-muted-foreground">2 days ago</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>Tax calculation performed</span>
              </div>
              <span className="text-muted-foreground">5 days ago</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Document uploaded</span>
              </div>
              <span className="text-muted-foreground">1 week ago</span>
            </div>
            <Link 
              to="/profile"
              className="text-primary hover:underline text-xs block mt-3"
            >
              View all activity
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Documents</CardTitle>
          <Upload className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-bold">5</div>
            <span className="text-xs text-muted-foreground">Total Documents</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Invoices</span>
              <span>3</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Receipts</span>
              <span>2</span>
            </div>
          </div>
          <Link 
            to="/dashboard"
            onClick={() => {
              // This would normally update activeTab state in the parent Dashboard component
              // Adding a stub function for now
              console.log("Navigate to documents tab");
              return false;
            }}
            className="text-primary hover:underline text-xs block mt-3"
          >
            Upload documents
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
