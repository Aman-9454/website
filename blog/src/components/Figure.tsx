import type { Figure as FigureData } from "@/lib/posts";

/**
 * Figures are drawn in plain HTML and CSS, in one ink colour, so they print, read on phones and
 * need no client-side code. Every value is written out as text, so nothing depends on colour alone.
 */
export function Figure({ figure }: { figure: FigureData }) {
  return (
    <figure className="my-14 border-t border-foreground/10 pt-8">
      <p className="mb-6 font-mono text-xs uppercase tracking-wider text-muted-foreground">{figure.title}</p>

      {figure.kind === "bars" ? <BarFigure items={figure.items} max={figure.max} /> : null}
      {figure.kind === "steps" ? <StepFigure steps={figure.steps} /> : null}
      {figure.kind === "timeline" ? <TimelineFigure hours={figure.hours} points={figure.points} /> : null}

      <figcaption className="mt-8 text-base leading-relaxed text-foreground">{figure.caption}</figcaption>
      <p className="mt-2 font-mono text-xs text-muted-foreground">{figure.note}</p>
    </figure>
  );
}

function BarFigure({ items, max: scaleMax }: { items: { label: string; value: number; display: string }[]; max?: number }) {
  const max = scaleMax ?? Math.max(...items.map((item) => item.value));
  return (
    <ul className="space-y-5">
      {items.map((item) => (
        <li key={item.label} className="grid gap-2 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-center sm:gap-6">
          <span className="text-base text-foreground">{item.label}</span>
          <div className="flex items-center gap-4">
            <div className="h-3 flex-1 bg-foreground/[0.06]" aria-hidden="true">
              <div className="h-full bg-foreground" style={{ width: `${Math.min(100, (item.value / max) * 100)}%` }} />
            </div>
            <span className="w-24 shrink-0 text-right font-mono text-sm text-foreground">{item.display}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function StepFigure({ steps }: { steps: string[] }) {
  return (
    <ol className="grid gap-px border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step} className="flex gap-5 bg-background p-6">
          <span className="font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-base leading-snug text-foreground">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function TimelineFigure({ hours, points }: { hours: number; points: { label: string; at: number }[] }) {
  const tickCount = Math.min(Math.ceil(hours), 12);
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => (i * hours) / tickCount);
  const place = (at: number) => `${Math.min(100, Math.max(0, (at / hours) * 100))}%`;
  const format = (value: number) => `${Number(value.toFixed(2))} h`;

  return (
    <div>
      <div className="relative h-8" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-px bg-foreground/30" />
        {ticks.map((tick) => (
          <span key={tick} className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-foreground/30" style={{ left: place(tick) }} />
        ))}
        {points.map((point) => (
          <span
            key={point.label}
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-foreground"
            style={{ left: place(point.at) }}
          />
        ))}
      </div>

      <ul className="mt-2 grid gap-4 sm:grid-cols-2">
        {points.map((point) => (
          <li key={point.label} className="flex items-baseline justify-between gap-4 border-b border-foreground/10 pb-3">
            <span className="text-base text-foreground">{point.label}</span>
            <span className="font-mono text-sm text-muted-foreground">{format(point.at)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex justify-between font-mono text-xs text-muted-foreground" aria-hidden="true">
        <span>0 h</span>
        <span>{format(hours)}</span>
      </div>
    </div>
  );
}
