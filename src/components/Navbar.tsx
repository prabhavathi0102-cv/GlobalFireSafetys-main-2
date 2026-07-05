import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import logo from "@/assets/logo.png";

const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="GSE Logo" className="h-10 w-10 object-contain" />
          <div className={`leading-tight ${scrolled ? "text-foreground" : "text-white"}`}>
            <div className="font-display font-bold text-sm md:text-base">GLOBAL SAFETY</div>
            <div className="text-[10px] md:text-xs tracking-widest text-fire font-semibold">ENTERPRISES (P) LTD</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors hover:text-fire ${
                scrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 gradient-fire text-white px-5 py-2.5 rounded-md text-sm font-semibold shadow-fire hover:opacity-90 transition"
          >
            <Flame className="h-4 w-4" /> Get a Quote
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-4 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 text-foreground font-medium border-b border-border last:border-0"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 gradient-fire text-white text-center py-3 rounded-md font-semibold"
            >
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
