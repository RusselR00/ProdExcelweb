import { Link, useLocation } from "wouter";
import { Menu, Phone } from "lucide-react";
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
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-2" : "bg-transparent py-4"
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
                className={`relative text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer group hover:scale-110 ${location === link.href
                  ? scrolled
                    ? "text-primary"
                    : "text-white"
                  : scrolled
                    ? "text-slate-600 hover:text-white"
                    : "text-white/90 hover:text-white"
                  }`}
                style={
                  location !== link.href
                    ? {
                      transition: 'all 0.3s',
                    }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (location !== link.href) {
                    e.currentTarget.style.textShadow = '-1px -1px 0 #31576e, 1px -1px 0 #31576e, -1px 1px 0 #31576e, 1px 1px 0 #31576e';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                <span className="relative">
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${location === link.href
                    ? "w-full bg-slate-400"
                    : "w-0 group-hover:w-full bg-slate-400"
                    }`}></span>
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                className={`group relative px-6 py-2.5 font-bold text-sm tracking-wide transition-all duration-300 overflow-hidden rounded-full ${scrolled
                  ? "bg-gradient-to-r from-[#fd8f43] to-[#ff6b35] hover:from-[#ff6b35] hover:to-[#fd8f43] text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105"
                  : "bg-white/95 text-primary hover:bg-white shadow-lg shadow-white/30 hover:shadow-xl hover:shadow-white/50 hover:scale-105 backdrop-blur-sm"
                  }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Request Charter
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className={`absolute inset-0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ${scrolled ? "bg-white/20" : "bg-primary/10"}`}></div>
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
            <SheetContent className="bg-white">
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-lg font-medium transition-colors hover:text-secondary cursor-pointer ${location === link.href ? "text-secondary font-bold" : "text-slate-900"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact">
                  <Button className="w-full mt-4 bg-secondary text-slate-900 hover:bg-secondary/90 font-semibold">Request Charter</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Mobile Contact Buttons - Only visible on desktop now */}
      <div className="hidden md:flex fixed bottom-6 right-4 z-50 flex-col gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/6598256032"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-14 h-14 rounded-full bg-[#ebbf74] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        {/* Call Now Button */}
        <a
          href="tel:+6598256032"
          className="group flex items-center justify-center w-14 h-14 rounded-full bg-[#31576e] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Phone className="w-7 h-7 text-white" />
        </a>
      </div>

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
                <p className="font-semibold">Singapore Office</p>
                <p>1 Corporation Drive<br />Unit 03-02<br />Singapore 619775</p>
                <p>management@excelessel.com</p>
                <p>+65 9825 6032</p>
                <p>+65 8533 2699</p>
              </address>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Excelessel Marine Services. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy-policy" className="hover:text-primary cursor-pointer">Privacy Policy</Link>
              <Link href="/terms-conditions" className="hover:text-primary cursor-pointer">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
