import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "product-engineering",
  name: "Product Engineering",
  outcome: "Get a product in front of users, then keep improving it.",
  summary:
    "We take products from first version to ongoing growth — an MVP scoped to what first users need, SaaS architecture built to extend, and steady feature delivery as a dedicated or embedded team.",
  answer:
    "Product engineering is the work of designing, building and continuously improving a software product, from the first version through each later release. Asauvia does this for startups and product teams: scoping an MVP to what first users need, building SaaS architecture that can extend, and delivering features as a dedicated or embedded team.",
  metaTitle: "Product Engineering Services | Asauvia",
  metaDescription:
    "Product engineering services: MVPs scoped to first users, SaaS development and ongoing feature delivery by a dedicated team. Plan your product.",
  primaryKeyword: "product engineering services",
  problems: [
    "The MVP keeps growing in scope and still hasn't reached real users.",
    "Early shortcuts make every new feature slower and riskier to ship.",
    "The roadmap moves faster than the in-house team can deliver.",
    "There is no clear way to tell whether a release actually helped.",
  ],
  deliverables: [
    "MVPs scoped to what your first users need",
    "SaaS product development, from accounts to billing",
    "Product architecture built to extend",
    "Ongoing feature delivery as a dedicated or embedded team",
    "Release monitoring tied back to product goals",
  ],
  useCases: [
    {
      title: "Building a first version",
      description:
        "An MVP focused on the core problem for early users, built so it can grow instead of being thrown away.",
    },
    {
      title: "Launching a SaaS product",
      description:
        "Multi-tenant applications with sign-up, roles and permissions, subscriptions and the admin tools a SaaS business needs.",
    },
    {
      title: "Extending your product team",
      description:
        "Engineers who join your backlog, rituals and code review, working as part of your team rather than beside it.",
    },
    {
      title: "Stabilizing a product that grew fast",
      description:
        "Refactoring the parts that slow delivery down, adding tests and monitoring, and documenting architecture so new features ship safely.",
    },
  ],
  stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
  faqs: [
    {
      question: "How do you decide what goes into an MVP?",
      answer:
        "We start from the problem your first users have and the one outcome the MVP must prove. Features that don't serve that are listed for later, so the first version reaches users sooner and teaches you more.",
    },
    {
      question: "What affects how long it takes to build a product?",
      answer:
        "How defined the scope is, how many outside systems it must integrate with, and how much is genuinely new versus established patterns. We review the architecture and plan with you before building, so the schedule reflects the actual scope.",
    },
    {
      question: "Which engagement model fits product work?",
      answer:
        "A fixed scope can suit a well-defined first version. For ongoing product work, a dedicated team usually fits better, or time-and-materials when priorities change often. We recommend one in the proposal after a scoping call.",
    },
    {
      question: "Can you work with our existing product and team?",
      answer:
        "Yes. We can take over a codebase, work alongside your engineers in a shared backlog, or own a specific part of the product. Overlap hours and communication cadence are agreed with you at kickoff.",
    },
    {
      question: "Who owns the product code?",
      answer:
        "You do. Intellectual property in the work product is assigned to you on delivery or payment, and architecture decisions are documented so understanding the product doesn't depend on us.",
    },
  ],
  related: ["custom-software-development", "web-mobile-applications", "cloud-devops"],
};

export default serviceDetailSchema.parse(service);
