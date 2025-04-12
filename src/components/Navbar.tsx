
import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl">PNG Tax</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              to="/dashboard"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              to="/tax-calculator"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Tax Calculator
            </Link>
            <Link
              to="/income-tax-calculator"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Income Tax Calculator
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link
              to="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "px-4"
              )}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={cn(
                buttonVariants({ size: "sm" }),
                "px-4"
              )}
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
