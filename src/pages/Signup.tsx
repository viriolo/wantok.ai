
import { Link } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { BlurCard } from "@/components/ui/blur-card";
import { useScrollAnimation } from "@/lib/animations";

const Signup = () => {
  const formAnimation = useScrollAnimation({
    initialClass: "opacity-0 scale-95",
    animateClass: "opacity-100 scale-100 transition-all duration-500 ease-out",
  });

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none" />
      
      {/* Red and yellow blurred circles for Papua New Guinea flag colors */}
      <div className="absolute top-40 right-[10%] w-[500px] h-[500px] bg-png-red/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-40 left-[10%] w-[400px] h-[400px] bg-png-yellow/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="pt-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-png-red">
              <span className="text-white font-bold">W</span>
            </div>
            <span className="text-xl font-bold">
              Wantok<span className="text-png-red">.ai</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 z-10">
        <div 
          ref={formAnimation.ref}
          className={`w-full max-w-md ${formAnimation.className}`}
        >
          <AuthForm mode="signup" />
          
          <BlurCard className="mt-6 p-4 text-center text-sm" variant="bordered">
            <p className="text-foreground/70">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-png-red hover:underline">
                Sign in
              </Link>
            </p>
          </BlurCard>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-foreground/60">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Wantok.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
