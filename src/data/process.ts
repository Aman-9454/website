import { processStepSchema, type ProcessStep } from "@/lib/validators";

const process: ProcessStep[] = [
  { index: 1, title: "Discover", description: "Scope the real problem and constraints on a short call." },
  { index: 2, title: "Design", description: "Architecture and plan, reviewed with you before anything is built." },
  { index: 3, title: "Build", description: "Iterative delivery against a shared backlog, not a black box." },
  { index: 4, title: "Validate", description: "Testing and review gates before anything ships." },
  { index: 5, title: "Launch", description: "Deploy with monitoring and rollback in place from day one." },
  { index: 6, title: "Improve", description: "Measure against the original goal and keep iterating." },
];

export default process.map((step) => processStepSchema.parse(step));
