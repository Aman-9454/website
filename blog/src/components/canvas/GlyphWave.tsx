"use client";

import { useGlyphCanvas, type GlyphDraw } from "./useGlyphCanvas";

const GLYPHS = "·∘○◯◌●◉";

const drawWave: GlyphDraw = (ctx, width, height, time) => {
  ctx.font = "14px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const cols = Math.floor(width / 20);
  const rows = Math.floor(height / 20);
  if (!cols || !rows) return;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const wave1 = Math.sin(x * 0.2 + time * 2) * Math.cos(y * 0.15 + time);
      const wave2 = Math.sin((x + y) * 0.1 + time * 1.5);
      const wave3 = Math.cos(x * 0.1 - y * 0.1 + time * 0.8);
      const n = ((wave1 + wave2 + wave3) / 3 + 1) / 2;

      ctx.fillStyle = `rgba(12, 8, 6, ${0.15 + n * 0.5})`;
      ctx.fillText(
        GLYPHS[Math.floor(n * (GLYPHS.length - 1))],
        (x + 0.5) * (width / cols),
        (y + 0.5) * (height / rows),
      );
    }
  }
};

export function GlyphWave({ className }: { className?: string }) {
  const ref = useGlyphCanvas(drawWave, 0.03);
  return <canvas ref={ref} aria-hidden="true" className={className} style={{ display: "block" }} />;
}
