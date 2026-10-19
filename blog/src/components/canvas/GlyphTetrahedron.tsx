"use client";

import { useGlyphCanvas, type GlyphDraw } from "./useGlyphCanvas";

const GLYPHS = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";

type Vec = { x: number; y: number; z: number };

const VERTICES: Vec[] = [
  { x: 0, y: 1, z: 0 },
  { x: -0.943, y: -0.333, z: -0.5 },
  { x: 0.943, y: -0.333, z: -0.5 },
  { x: 0, y: -0.333, z: 1 },
];
const EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1]];
const FACES = [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]];

function rotate(p: Vec, t: number): Vec {
  const ay = t * 0.4;
  const ax = t * 0.3;
  const az = t * 0.2;
  const y1 = { x: p.x * Math.cos(ay) - p.z * Math.sin(ay), y: p.y, z: p.x * Math.sin(ay) + p.z * Math.cos(ay) };
  const x1 = { x: y1.x, y: y1.y * Math.cos(ax) - y1.z * Math.sin(ax), z: y1.y * Math.sin(ax) + y1.z * Math.cos(ax) };
  return { x: x1.x * Math.cos(az) - x1.y * Math.sin(az), y: x1.x * Math.sin(az) + x1.y * Math.cos(az), z: x1.z };
}

const drawTetrahedron: GlyphDraw = (ctx, width, height, time) => {
  const cx = width / 2;
  const cy = height / 2;
  const scale = Math.min(width, height) * 0.7;

  ctx.font = "18px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const points: { x: number; y: number; z: number; char: string }[] = [];
  const push = (raw: Vec) => {
    const p = rotate(raw, time);
    const depth = (p.z + 1.5) / 3;
    points.push({
      x: cx + p.x * scale,
      y: cy - p.y * scale,
      z: p.z,
      char: GLYPHS[Math.min(Math.floor(depth * (GLYPHS.length - 1)), GLYPHS.length - 1)],
    });
  };

  for (const [i, j] of EDGES) {
    const a = VERTICES[i];
    const b = VERTICES[j];
    for (let t = 0; t <= 1; t += 0.05) {
      push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: a.z + (b.z - a.z) * t });
    }
  }

  for (const [i, j, k] of FACES) {
    const a = VERTICES[i];
    const b = VERTICES[j];
    const c = VERTICES[k];
    for (let u = 0; u <= 1; u += 0.12) {
      for (let v = 0; v <= 1 - u; v += 0.12) {
        const w = 1 - u - v;
        push({ x: a.x * u + b.x * v + c.x * w, y: a.y * u + b.y * v + c.y * w, z: a.z * u + b.z * v + c.z * w });
      }
    }
  }

  points.sort((a, b) => a.z - b.z);
  for (const p of points) {
    ctx.fillStyle = `rgba(12, 8, 6, ${Math.min(0.15 + (p.z + 1.5) * 0.25, 0.9)})`;
    ctx.fillText(p.char, p.x, p.y);
  }
};

export function GlyphTetrahedron({ className }: { className?: string }) {
  const ref = useGlyphCanvas(drawTetrahedron, 0.015);
  return <canvas ref={ref} aria-hidden="true" className={className} style={{ display: "block" }} />;
}
