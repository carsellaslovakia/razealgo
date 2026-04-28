import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { indicators } from "@/data/indicators";
import { Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/free")({
  head: () => ({
    meta: [
      { title: "Free Indicators — Raze Algo" },
      { name: "description", content: "Get free TradingView indicators. Start with our free tools and upgrade anytime." },
      { property: "og:title", content: "Free Tools — Raze Algo" },
      { property: "og:description", content: "Free TradingView indicators — request access with your username." },
    ],
  }),
  component: FreePage,
});

const schema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  tvUsername: z.string().trim().min(2, "TradingView username required").max(50),
});

function FreePage() {
  const free = indicators.filter((i) => i.tier === "Free");
  const [selected, setSelected] = useState(free[0]?.slug);
  const [form, setForm] = useState({ email: "", tvUsername: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path.join(".")] = i.message));
      setErrors(errs);
      return;
    }
    toast.success("Request received! Access will be granted shortly.");
    setForm({ email: "", tvUsername: "" });
  };

  return (
    <>
      <Section className="pb-10">
        <SectionHeader
          eyebrow="Free Tools"
          title="Free TradingView indicators"
          description="Start with our free TradingView tools and upgrade whenever you are ready for more advanced market structure, bias and setup features."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {free.map((i) => (
            <div
              key={i.slug}
              className={`rounded-2xl p-6 transition cursor-pointer ${
                selected === i.slug ? "glass-strong neon-border shadow-glow" : "glass hover:-translate-y-1"
              }`}
              onClick={() => setSelected(i.slug)}
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <span className="text-xs text-muted-foreground">{i.category}</span>
                  <h3 className="font-display text-xl font-bold mt-1">{i.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{i.description}</p>
                </div>
                <span className="rounded-full border border-success/40 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                  Free
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {i.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-start">
          <form onSubmit={submit} className="rounded-2xl glass-strong neon-border p-8">
            <h2 className="font-display text-2xl font-bold">Get free access</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Selected: <span className="text-foreground font-medium">
                {free.find((i) => i.slug === selected)?.name}
              </span>
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" className="mt-1.5" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="tv">TradingView username</Label>
                <Input id="tv" className="mt-1.5" value={form.tvUsername} onChange={(e) => setForm({ ...form, tvUsername: e.target.value })} maxLength={50} />
                {errors.tvUsername && <p className="mt-1 text-xs text-destructive">{errors.tvUsername}</p>}
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-6 w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              Get Free Access
            </Button>
          </form>

          <div className="rounded-2xl glass neon-border p-8">
            <h3 className="font-display text-xl font-bold">Ready for more?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Unlock advanced market structure zones, MTF bias dashboards, smart candle overlays and setup alerts with our premium suite.
            </p>
            <Button asChild className="mt-5 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              <Link to="/pricing">Upgrade to Premium <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
