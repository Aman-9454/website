/** Stable anchor id for a heading, e.g. "What the drift costs" -> "what-the-drift-costs". */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
