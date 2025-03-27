
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { BlurCard } from '@/components/ui/blur-card';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <BlurCard
        className={`mx-auto container transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        intensity={isScrolled ? 'medium' : 'light'}
      >
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-png-red">
              <span className="text-white font-bold">W</span>
            </div>
            <Link to="/" className="text-xl font-bold text-foreground">
              Wantok<span className="text-png-red">.ai</span>
            </Link>
          </div>

          {!isMobile ? (
            <nav className="hidden md:flex items-center gap-8">
              <NavLinks />
            </nav>
          ) : null}

          <div className="flex items-center gap-4">
            {!isMobile ? (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-png-red hover:bg-png-red/90" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            )}
          </div>
        </div>
      </BlurCard>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <BlurCard className="container mx-auto mt-2 p-4" intensity="heavy">
          <nav className="flex flex-col space-y-4">
            <NavLinks />
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <Link to="/login" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="w-full">
                <Button className="w-full bg-png-red hover:bg-png-red/90" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </BlurCard>
      )}
    </header>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link
        to="/"
        className="text-foreground/80 hover:text-foreground transition-colors duration-200"
      >
        Home
      </Link>
      <Link
        to="#features"
        className="text-foreground/80 hover:text-foreground transition-colors duration-200"
      >
        Features
      </Link>
      <Link
        to="#pricing"
        className="text-foreground/80 hover:text-foreground transition-colors duration-200"
      >
        Pricing
      </Link>
      <Link
        to="#about"
        className="text-foreground/80 hover:text-foreground transition-colors duration-200"
      >
        About
      </Link>
    </>
  );
};

export default Navbar;
