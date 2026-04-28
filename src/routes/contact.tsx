import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Section, SectionHeader } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Raze Algo" },
      { name: "description", content: "Get help with subscriptions, TradingView access, billing or technical issues." },
      { property: "og:title", content: "Contact — Raze Algo" },
      { property: "og:description", content: "Talk to support about your indicators and subscriptions." },
    ],
  }),
  component: ContactPage,
});

const topics = [
  "Subscription support",
  "TradingView access",
  "Billing",
  "Technical issue",
  "Partnership request",
];

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  topic: z.string().min(1),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" });
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
    toast.success("Message sent. We'll get back to you shortly.");
    setForm({ name: "", email: "", topic: topics[0], message: "" });
  };

  return (
    <Section>
      <SectionHeader eyebrow="Support" title="Contact us" description="We typically respond within 24 hours." />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} className="rounded-2xl glass-strong neon-border p-8 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" className="mt-1.5" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" className="mt-1.5" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="topic">Topic</Label>
            <select
              id="topic"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-input/50 px-3 text-sm"
            >
              {topics.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" className="mt-1.5" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>

          <Button type="submit" size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
            <Send className="mr-2 h-4 w-4" /> Send message
          </Button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-2xl glass p-6">
            <Mail className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">Email</h3>
            <p className="text-sm text-muted-foreground">support@yourtradinglab.com</p>
          </div>
          <div className="rounded-2xl glass p-6">
            <Send className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">Telegram</h3>
            <p className="text-sm text-muted-foreground">@yourtradinglab</p>
          </div>
          <div className="rounded-2xl glass p-6">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">Discord</h3>
            <p className="text-sm text-muted-foreground">discord.gg/yourtradinglab</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
