import { Link } from "@tanstack/react-router";
import { Twitter, Send, MessageCircle } from "lucide-react";
import logo from "@/assets/raze-algo-logo.png";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/40 bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="Raze Algo"
                className="h-11 w-11 rounded-lg drop-shadow-[0_0_14px_oklch(0.65_0.24_300/0.6)]"
              />
              <span className="font-display text-lg font-bold">Raze Algo</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Premium TradingView indicators for market structure traders. Clean visuals, smart zones, sharper bias.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Send, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg glass hover:text-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Product" links={[
            { to: "/indicators", label: "Indicators" },
            { to: "/free", label: "Free Tools" },
            { to: "/pricing", label: "Pricing" },
            { to: "/indicators/msz-pro", label: "MSZ Pro" },
          ]} />

          <FooterCol title="Support" links={[
            { to: "/faq", label: "FAQ" },
            { to: "/contact", label: "Contact" },
            { to: "/dashboard", label: "Dashboard" },
          ]} />

          <FooterCol title="Legal" links={[
            { to: "/legal/terms", label: "Terms of Service" },
            { to: "/legal/privacy", label: "Privacy Policy" },
            { to: "/legal/risk", label: "Risk Disclaimer" },
            { to: "/legal/refund", label: "Refund Policy" },
          ]} />
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground">
            <span className="text-foreground/80 font-medium">Risk disclosure:</span> Trading involves risk. Our indicators are educational and analytical tools only and do not provide financial advice. Past performance does not guarantee future results.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Raze Algo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
