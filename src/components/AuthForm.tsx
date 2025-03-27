
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlurCard } from "@/components/ui/blur-card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, CheckCircle } from "lucide-react";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    tinNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate authentication
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: mode === "login" ? "Welcome back!" : "Account created successfully!",
        description: mode === "login" 
          ? "You've been logged in successfully" 
          : "Your business account has been created",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlurCard className="w-full max-w-md p-8" variant="bordered">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          {mode === "login" ? "Welcome Back" : "Create Your Account"}
        </h2>
        <p className="text-foreground/70 text-sm">
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : "Complete the form below to create your business account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              className="pl-10"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-foreground/50" />
              ) : (
                <Eye className="h-4 w-4 text-foreground/50" />
              )}
            </Button>
          </div>
        </div>

        {mode === "signup" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                name="businessName"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tinNumber">TIN Number</Label>
              <Input
                id="tinNumber"
                name="tinNumber"
                placeholder="PNG Tax Identification Number"
                value={formData.tinNumber}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <Button
          type="submit"
          className="w-full bg-png-red hover:bg-png-red/90 mt-6"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === "login" ? "Signing in..." : "Creating account..."}
            </span>
          ) : (
            <span>{mode === "login" ? "Sign In" : "Create Account"}</span>
          )}
        </Button>
      </form>

      {mode === "signup" && (
        <div className="mt-6 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-4 w-4 text-png-red mt-0.5 flex-shrink-0" />
            <span className="text-foreground/80">
              Compliant with PNG data protection regulations
            </span>
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-foreground/70">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-png-red hover:underline">
              Sign up
            </a>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <a href="/login" className="font-medium text-png-red hover:underline">
              Sign in
            </a>
          </>
        )}
      </div>
    </BlurCard>
  );
};

export default AuthForm;
