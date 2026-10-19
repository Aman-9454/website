"use client";

import { useGlyphCanvas, type GlyphDraw } from "./useGlyphCanvas";

const GLYPHS = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";

const drawSphere: GlyphDraw = (ctx, width, height, time) => {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.525;

  // Canvas can't resolve CSS variables — a font string like
  // "12px var(--font-mono)" is silently rejected and falls back to 10px sans.
  ctx.font = "12px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const points: { x: number; y: number; z: number; char: string }[] = [];
  const rotY = time * 0.3;
  const rotX = time * 0.2;

  for (let phi = 0; phi < Math.PI * 2; phi += 0.15) {
    for (let theta = 0; theta < Math.PI; theta += 0.15) {
      const x = Math.sin(theta) * Math.cos(phi + time * 0.5);
      const y = Math.sin(theta) * Math.sin(phi + time * 0.5);
      const z = Math.cos(theta);

      const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
      const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
      const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
      const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);

      const depth = (z2 + 1) / 2;
      points.push({
        x: cx + x1 * radius,
        y: cy + y2 * radius,
        z: z2,
        char: GLYPHS[Math.floor(depth * (GLYPHS.length - 1))],
      });
    }
  }

  points.sort((a, b) => a.z - b.z);
  for (const p of points) {
    ctx.fillStyle = `rgba(12, 8, 6, ${0.2 + (p.z + 1) * 0.4})`;
    ctx.fillText(p.char, p.x, p.y);
  }
};

export function GlyphSphere({ className }: { className?: string }) {
  const ref = useGlyphCanvas(drawSphere, 0.02);
  return <canvas ref={ref} aria-hidden="true" className={className} style={{ display: "block" }} />;
}
