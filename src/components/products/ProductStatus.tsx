import type { Product } from "@/lib/products";

// Completed and live products get the signal dot. Everything else is a neutral dot, so the colour means something.
const dotClass: Record<Product["status"], string> = {
  Completed: "bg-signal",
  Live: "bg-signal",
  Beta: "bg-current/50",
  "In development": "bg-current/50",
  "Custom build": "bg-current/50",
};

export function ProductStatus({ status }: { status: Product["status"] }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm">
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dotClass[status]}`} />
      {status}
    </span>
  );
}
