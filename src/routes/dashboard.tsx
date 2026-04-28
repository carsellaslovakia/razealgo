import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, User2, ShieldCheck, MessageSquare, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Raze Algo" },
      { name: "description", content: "Manage your indicator subscriptions, TradingView access and account." },
    ],
  }),
  component: DashboardPage,
});

const subs = [
  { name: "MSZ Pro", plan: "Yearly", renewal: "Mar 12, 2026", status: "Active" as const },
  { name: "Bias Cloud Pro", plan: "Monthly", renewal: "May 03, 2025", status: "Pending" as const },
];

function statusColor(s: "Active" | "Pending" | "Expired") {
  if (s === "Active") return "border-success/40 bg-success/10 text-success";
  if (s === "Pending") return "border-primary/40 bg-primary/10 text-primary";
  return "border-destructive/40 bg-destructive/10 text-destructive";
}

function DashboardPage() {
  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-4xl font-bold text-gradient">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Manage your indicators, subscriptions and account.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><User2 className="mr-2 h-4 w-4" /> Update TV username</Button>
          <Button asChild className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
            <Link to="/contact"><MessageSquare className="mr-2 h-4 w-4" /> Contact Support</Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        {[
          { label: "Active subscriptions", value: "1", icon: ShieldCheck },
          { label: "Pending access", value: "1", icon: RefreshCw },
          { label: "Free tools", value: "2", icon: Activity },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl glass neon-border p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* My indicators */}
      <div className="rounded-2xl glass neon-border overflow-hidden">
        <div className="p-6 border-b border-border/40">
          <h2 className="font-display text-xl font-bold">My indicators</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="p-4 font-medium">Indicator</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Renewal</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Manage</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.name} className="border-t border-border/30">
                  <td className="p-4 font-medium">{s.name}</td>
                  <td className="p-4 text-muted-foreground">{s.plan}</td>
                  <td className="p-4 text-muted-foreground"><Calendar className="inline h-4 w-4 mr-1" />{s.renewal}</td>
                  <td className="p-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusColor(s.status)}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button size="sm" variant="ghost">Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-5 text-sm text-muted-foreground">
        This is a demo dashboard. Connect a backend to enable real authentication, subscriptions and access management.
      </div>
    </Section>
  );
}
