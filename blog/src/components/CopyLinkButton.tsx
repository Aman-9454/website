"use client";

import { useState } from "react";

/** Copies the post's address to the clipboard. If the browser blocks clipboard access, the link stays visible in the address bar. */
export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-10 items-center rounded-full border border-foreground/20 px-5 text-sm text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}
