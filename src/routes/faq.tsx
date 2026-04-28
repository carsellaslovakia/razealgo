import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Raze Algo" },
      { name: "description", content: "Frequently asked questions about TradingView indicator access, subscriptions and support." },
      { property: "og:title", content: "FAQ — Raze Algo" },
      { property: "og:description", content: "Common questions about our TradingView indicators, plans and access." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  { q: "How do I get access to the indicator?", a: "After payment, submit your TradingView username on the checkout page. We grant invite-only access to the script." },
  { q: "Do I need TradingView?", a: "Yes. All our indicators run on TradingView. A free TradingView account is enough." },
  { q: "Is this a strategy or an indicator?", a: "It's an indicator. It analyzes price action and overlays structure, bias and signals on your chart." },
  { q: "Does the indicator repaint?", a: "No. Confirmed structure, zones and signals are non-repainting on closed candles." },
  { q: "Can I cancel my monthly subscription?", a: "Yes, you can cancel anytime from your dashboard. Access continues until the end of your billing period." },
  { q: "What happens after I subscribe?", a: "You'll get a confirmation, and we'll grant invite-only TradingView access to your username, usually within hours." },
  { q: "How long does access approval take?", a: "Typically minutes to a few hours after payment is verified, depending on the time of day." },
  { q: "Do you offer free indicators?", a: "Yes. Visit the Free Tools page to request access to our free indicators." },
  { q: "Can I use the indicator on crypto, forex, indices or stocks?", a: "Yes, anything chartable on TradingView is supported." },
  { q: "Is this financial advice?", a: "No. Our tools are for education and analysis only. They are not financial advice." },
  { q: "What is lifetime access?", a: "A one-time payment that grants you lifetime access to the chosen indicator and all its future updates." },
  { q: "Can I change my TradingView username?", a: "Yes. Update it from your dashboard or contact support." },
];

function FaqPage() {
  return (
    <Section>
      <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
      <div className="grid gap-3 max-w-3xl mx-auto">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-xl glass neon-border p-5">
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              {f.q}
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
