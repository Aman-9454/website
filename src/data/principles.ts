import { principleSchema, type Principle } from "@/lib/validators";

const principles: Principle[] = [
  {
    title: "Security-first",
    practice: "NDA before scoping, access scoped per engagement, and dependency review on every project.",
  },
  {
    title: "Performance-first",
    practice: "Core Web Vitals budgets enforced in CI, not checked after launch.",
  },
  {
    title: "Built to scale",
    practice: "Architecture decisions documented up front, so year-two features don't require a rewrite.",
  },
  {
    title: "Transparent delivery",
    practice: "A shared backlog and a standing update cadence — status is visible, not reported on request.",
  },
];

export default principles.map((principle) => principleSchema.parse(principle));
