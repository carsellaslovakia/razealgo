import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/raze-algo-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/indicators", label: "Indicators" },
  { to: "/free", label: "Free Tools" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass-strong border-b border-border/40">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="Raze Algo"
              className="h-10 w-10 rounded-lg drop-shadow-[0_0_12px_oklch(0.65_0.24_300/0.6)] transition group-hover:drop-shadow-[0_0_18px_oklch(0.65_0.24_300/0.85)]"
            />
            <span className="font-display text-lg font-bold tracking-tight">
              Raze Algo
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="ghost" size="sm">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              <Link to="/pricing">Get Access</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="lg:hidden border-t border-border/40 px-4 py-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground">
                <Link to="/pricing" onClick={() => setOpen(false)}>Get Access</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
