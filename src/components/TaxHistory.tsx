
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Download, ArrowRight, Eye } from "lucide-react";

// Sample data for demonstration
const TAX_HISTORY = [
  {
    id: "calc-001",
    date: "2023-12-15",
    type: "Income Tax",
    income: 85000,
    tax: 20400,
    year: 2023
  },
  {
    id: "calc-002",
    date: "2023-11-20",
    type: "GST",
    income: 35000,
    tax: 3500,
    year: 2023
  },
  {
    id: "calc-003",
    date: "2023-10-05",
    type: "Income Tax",
    income: 80000,
    tax: 19200,
    year: 2023
  },
  {
    id: "calc-004",
    date: "2023-09-12",
    type: "GST",
    income: 30000,
    tax: 3000,
    year: 2023
  },
  {
    id: "calc-005",
    date: "2023-08-28",
    type: "Payroll Tax",
    income: 25000,
    tax: 2750,
    year: 2023
  },
];

const TaxHistory = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tax Calculation History</CardTitle>
            <CardDescription>
              View your previous tax calculations
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Export All
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Income (PGK)</TableHead>
              <TableHead>Tax (PGK)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TAX_HISTORY.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{item.type}</span>
                  <span className="text-xs text-muted-foreground block">
                    Tax Year {item.year}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {item.income.toLocaleString()}
                </TableCell>
                <TableCell className="font-medium">
                  {item.tax.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Recalculate</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>
            Showing your 5 most recent tax calculations.
          </TableCaption>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TaxHistory;
