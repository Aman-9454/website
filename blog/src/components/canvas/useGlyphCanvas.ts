"use client";

import { useEffect, useRef } from "react";

export type GlyphDraw = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => void;

/**
 * Shared loop for the reference's canvas-glyph scenes (sphere, wave,
 * tetrahedron). Sizes the backing store from a ResizeObserver (layout can
 * settle after mount), animates only while visible and sized, and draws a
 * single static frame under prefers-reduced-motion.
 */
export function useGlyphCanvas(draw: GlyphDraw, timeStep: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let time = 0;
    let frame = 0;
    let running = false;
    // Starts true: the observer may only ever pause the loop, never be required to start it.
    let onScreen = true;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawRef.current(ctx, width, height, time);
    };

    const loop = () => {
      render();
      time += timeStep;
      frame = requestAnimationFrame(loop);
    };

    // Run only when there is something to see: sized (display:none canvases measure 0, e.g. the
    // hero sphere on phones), near the viewport, tab visible, and motion allowed.
    const sync = () => {
      const shouldRun = !reduceMotion && !document.hidden && onScreen && width > 0 && height > 0;
      if (shouldRun === running) return;
      running = shouldRun;
      cancelAnimationFrame(frame);
      if (running) loop();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (width > 0 && height > 0) render();
      sync();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "200px" },
    );
    viewObserver.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    resize();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [timeStep]);

  return canvasRef;
}
