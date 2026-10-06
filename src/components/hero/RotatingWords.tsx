"use client";

import { useEffect, useState } from "react";

/**
 * Cycles the last words of the hero headline. The first word is what the server
 * renders (so crawlers and no-JS readers get a complete sentence); the box is
 * sized to the longest word via a CSS pseudo-element, so the line never reflows
 * and the extra words don't end up in the heading's text content.
 */
export function RotatingWords({ words, interval = 2800 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [changed, setChanged] = useState(false);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setChanged(true);
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-block whitespace-nowrap align-bottom">
      <span aria-hidden="true" data-longest={longest} className="invisible before:content-[attr(data-longest)]" />
      <span key={index} className={`absolute inset-0 ${changed ? "word-in" : ""}`}>
        {words[index]}
      </span>
    </span>
  );
}
