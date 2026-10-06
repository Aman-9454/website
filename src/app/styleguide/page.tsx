import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "background", hex: "#fbfaf8" },
  { name: "foreground", hex: "#1c1917" },
  { name: "muted", hex: "#f1efea" },
  { name: "muted-foreground", hex: "#6b6560" },
  { name: "border", hex: "#dedad4" },
  { name: "signal", hex: "#4caf6e" },
];

export default function StyleguidePage() {
  return (
    <Container className="py-32">
      <h1 className="font-display text-4xl text-foreground">Styleguide</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Internal reference only — noindex. See docs/DESIGN_PLAN.md for rationale.
      </p>

      <section className="mt-14">
        <h2 className="font-mono text-sm text-muted-foreground">Color — warm paper, near-black</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colors.map((c) => (
            <div key={c.name}>
              <div className="h-20 w-full rounded-lg border border-border" style={{ background: c.hex }} />
              <p className="mt-2 text-sm text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-sm text-muted-foreground">Type scale</h2>
        <div className="mt-4 space-y-4">
          <p className="font-display text-6xl text-foreground">Aa — display serif</p>
          <p className="font-display text-4xl text-foreground">Aa — display serif</p>
          <p className="text-2xl text-foreground">Aa — sans heading</p>
          <p className="text-lg text-foreground">Aa — sans body, large</p>
          <p className="text-base text-foreground">Aa — sans body</p>
          <p className="font-mono text-sm text-muted-foreground">01 — mono, eyebrows &amp; technical content</p>
        </div>
      </section>
    </Container>
  );
}
