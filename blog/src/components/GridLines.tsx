const ROWS = 8;
const COLS = 12;

export function GridLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30" aria-hidden="true">
      {Array.from({ length: ROWS }, (_, i) => (
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-foreground/10"
          style={{ top: `${(100 / (ROWS + 1)) * (i + 1)}%` }}
        />
      ))}
      {Array.from({ length: COLS }, (_, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-foreground/10"
          style={{ left: `${(100 / (COLS + 1)) * (i + 1)}%` }}
        />
      ))}
    </div>
  );
}
