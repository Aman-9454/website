/**
 * Stand-in for the AdSense ad unit, used only on the local preview page.
 * The real ad will fill the same reserved space once the site is approved and the ad unit exists.
 */
export function AdPreview() {
  return (
    <aside aria-label="Advertisement" className="my-14 border-y border-foreground/10 py-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">Advertisement</p>
      <div className="flex min-h-[280px] items-center justify-center border border-dashed border-foreground/20 bg-foreground/[0.03] px-6 text-center font-mono text-sm text-muted-foreground">
        Ad space. A responsive ad appears here after AdSense approves the site.
      </div>
    </aside>
  );
}
