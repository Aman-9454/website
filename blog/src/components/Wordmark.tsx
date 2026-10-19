/**
 * Visual brand wordmark, cased as in the logo ("ASAUViA"). Purely visual: the
 * enclosing link carries the accessible name, so text readers skip the capitals.
 */
export function Wordmark() {
  return (
    <span aria-hidden="true" className="font-wordmark font-semibold leading-none tracking-[0.02em]">
      ASAUV<span className="tracking-[0.01em]">i</span>A
    </span>
  );
}
