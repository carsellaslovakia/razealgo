import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Request received — Raze Algo" },
      { name: "description", content: "Your subscription request has been received." },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  return (
    <Section className="py-24">
      <div className="max-w-xl mx-auto rounded-2xl glass-strong neon-border p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-glow-lg">
          <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-gradient">
          Your request has been received
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for subscribing. Please make sure your TradingView username is correct.
          Access is usually granted as soon as possible after payment verification.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
            <Link to="/dashboard">Go to dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/indicators">Browse indicators</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
