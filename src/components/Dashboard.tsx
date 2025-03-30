import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const Dashboard = ({ className = "", ...props }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      
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
    </div>
  );
};

export default Dashboard;
