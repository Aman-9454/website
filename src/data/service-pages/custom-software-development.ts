import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "custom-software-development",
  name: "Custom Software Development",
  outcome: "Software shaped around how your business actually works.",
  summary:
    "We build bespoke software for the workflows off-the-shelf tools don't fit, modernize legacy systems step by step, and hand over code your own team can understand and extend.",
  answer:
    "Custom software development is building software designed around a specific organization's workflows, data and systems, instead of adapting the business to a generic product. Asauvia builds it for startups and enterprises whose needs off-the-shelf tools don't cover, including modernizing legacy systems through incremental migration rather than a risky full rewrite.",
  metaTitle: "Custom Software Development Services | Asauvia",
  metaDescription:
    "Custom software development services: bespoke applications, legacy modernization and tailored development kits. For teams worldwide. Talk to us.",
  primaryKeyword: "custom software development services",
  problems: [
    "Off-the-shelf tools force workarounds that cost your team time every day.",
    "A legacy system holds critical data but is hard to change and harder to hire for.",
    "Several tools are stitched together with spreadsheets and manual steps.",
    "Previous custom work arrived without documentation, so nobody else can maintain it.",
  ],
  deliverables: [
    "Bespoke applications built around your real workflows",
    "Legacy modernization through incremental migration",
    "Application development kits (ADKs) tailored to your stack",
    "Integrations with the systems you already run",
    "Documented, reviewed code and a clean handover",
  ],
  useCases: [
    {
      title: "Internal tools for a specific workflow",
      description:
        "Applications for processes that generic software handles poorly, built around how your team already works.",
    },
    {
      title: "Modernizing a legacy system",
      description:
        "Replacing an aging system piece by piece, running old and new side by side so the business keeps operating throughout.",
    },
    {
      title: "Customized development kits",
      description:
        "Application development kits with the components, APIs and conventions your developers need, tailored to your existing stack.",
    },
    {
      title: "Replacing spreadsheets and manual hand-offs",
      description:
        "A single application with proper data, permissions and history in place of spreadsheets passed between people.",
    },
  ],
  stack: ["TypeScript", "Node.js", "Python", "React", "PostgreSQL", "Docker"],
  faqs: [
    {
      question: "When does custom software make more sense than an off-the-shelf tool?",
      answer:
        "When the workflow is central to how you operate and existing products would force costly workarounds, or when you need to integrate tightly with systems you already run. If an off-the-shelf tool fits well, we will say so.",
    },
    {
      question: "What drives the cost of a custom software project?",
      answer:
        "Mainly scope and uncertainty: how well defined the requirements are, how much integration with existing systems is needed, and how much is genuinely new versus established patterns. We scope it with you before work starts.",
    },
    {
      question: "How do you modernize a legacy system without disrupting the business?",
      answer:
        "Incrementally. We migrate one part at a time, keep the old and new systems running side by side where needed, and move users over once each part is proven, instead of attempting a single big-bang rewrite.",
    },
    {
      question: "What affects how long a project takes?",
      answer:
        "How clear the requirements are, how many systems the software must connect to, and how quickly decisions can be made on your side. The architecture and plan are reviewed with you before building begins, so the timeline is grounded in real scope.",
    },
    {
      question: "Who owns the code?",
      answer:
        "You do. Intellectual property in the work product is assigned to you on delivery or payment, and the code is documented so your own team or another vendor can maintain it.",
    },
    {
      question: "Can you maintain the software after launch?",
      answer:
        "Yes. We can hand over fully to your team, or continue with maintenance and new features under a retainer or time-and-materials arrangement.",
    },
  ],
  related: ["product-engineering", "web-mobile-applications", "data-integrations"],
};

export default serviceDetailSchema.parse(service);
