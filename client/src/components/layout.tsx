import { Link, useLocation } from "wouter";
import { Menu, Anchor } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImage from "@assets/WhatsApp Image 2025-11-29 at 16.19.10_bf896a35_1764413632374.jpg";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/vessel", label: "Our Vessel" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <img 
              src={logoImage} 
              alt="Excelessel Offshore Pte Ltd" 
              className="h-12 w-auto object-contain rounded-sm"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-secondary cursor-pointer ${
                  location === link.href
                    ? "text-secondary font-semibold"
                    : scrolled
                    ? "text-slate-600"
                    : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button variant={scrolled ? "default" : "secondary"} className="ml-4">
                Request Charter
              </Button>
            </Link>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={scrolled ? "text-primary" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`text-lg font-medium transition-colors hover:text-secondary cursor-pointer ${
                      location === link.href ? "text-secondary" : "text-slate-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact">
                  <Button className="w-full mt-4">Request Charter</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-900 pt-16 pb-8 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src={logoImage} 
                  alt="Excelessel Offshore Pte Ltd" 
                  className="h-16 w-auto object-contain rounded-sm mix-blend-multiply" 
                />
              </div>
              <p className="text-slate-600 max-w-md mb-6 leading-relaxed">
                Singapore-based marine service provider specializing in Anchor Handling Tug (AHT) chartering, tug operations, and reliable marine support services.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4 text-primary">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-600 hover:text-secondary transition-colors cursor-pointer">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg mb-4 text-primary">Contact</h4>
              <address className="not-italic text-slate-600 space-y-2">
                <p>Singapore Office</p>
                <p>management@excelessel.com</p>
                <p>+65 6123 4567</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Excelessel Marine Services. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
