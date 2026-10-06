import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "web-mobile-applications",
  name: "Web & Mobile App Development",
  outcome: "A product that works the same everywhere your customers are.",
  summary:
    "Web and cross-platform mobile applications built on a shared design and engineering foundation, so the product is consistent across every device.",
  answer:
    "Web and mobile app development is the design and engineering of the applications your customers use in a browser and on their phones. Asauvia builds responsive web apps with React and Next.js and cross-platform mobile apps that share logic and components with the web product, for startups and enterprises that want one consistent, fast product instead of separate codebases drifting apart.",
  metaTitle: "Web & Mobile App Development Services | Asauvia",
  metaDescription:
    "Web and mobile app development services: React and Next.js web apps and cross-platform mobile apps on one shared foundation. Talk to our team.",
  primaryKeyword: "web and mobile app development services",
  problems: [
    "The web app and the mobile app behave differently, and every feature has to be built twice.",
    "Pages load slowly on real phones and real networks, and users leave before they convert.",
    "The UI has grown into one-off screens that nobody can change without breaking something else.",
    "A prototype or MVP worked at first, but the codebase now slows down every release.",
  ],
  deliverables: [
    "Responsive web applications (React / Next.js)",
    "Cross-platform mobile apps sharing logic with the web product",
    "Component systems that keep the two in sync as the product grows",
    "Performance budgets for Core Web Vitals enforced in CI",
    "Tested interfaces, with code review on every change",
  ],
  useCases: [
    {
      title: "Customer-facing web applications",
      description:
        "Portals, dashboards and self-service tools built with Next.js, rendered for speed and search visibility.",
    },
    {
      title: "A mobile app alongside an existing web product",
      description:
        "A React Native app that reuses your business logic and API, so features ship to both platforms from one plan.",
    },
    {
      title: "Rebuilding a slow or fragile front end",
      description:
        "Moving an aging interface to a modern component system in stages, without stopping feature work.",
    },
    {
      title: "Shared design systems",
      description:
        "A component library used by both web and mobile, so a change to a button or form is made once.",
    },
    {
      title: "Internal tools for operations teams",
      description:
        "Admin panels and back-office apps that work on a desktop at the office and a phone in the field.",
    },
  ],
  stack: ["TypeScript", "React", "Next.js", "React Native", "Tailwind CSS", "Node.js", "PostgreSQL"],
  faqs: [
    {
      question: "Should we build native apps or cross-platform?",
      answer:
        "For most business products, a cross-platform app with React Native covers iOS and Android from one codebase and can share logic with the web product. Native development makes sense when the app depends heavily on device-specific features or demanding graphics. We recommend one after looking at what the app actually needs to do.",
    },
    {
      question: "Can you take over or improve an existing app?",
      answer:
        "Yes. We start by reviewing the codebase, dependencies and architecture, then agree on what to keep, what to refactor and in what order, so the product keeps shipping while it improves.",
    },
    {
      question: "How do you keep the web and mobile apps consistent?",
      answer:
        "By sharing what can be shared: business logic, API clients, types and design tokens live in common packages, and both apps use components built from the same design system.",
    },
    {
      question: "How do you handle performance?",
      answer:
        "We set Core Web Vitals budgets at the start and enforce them in CI, so a change that makes pages slower is caught before it ships rather than after users notice.",
    },
    {
      question: "Do you design the interface as well as build it?",
      answer:
        "We can work from your existing designs or design the interface with you. Either way, designs are turned into a reusable component system rather than one-off screens.",
    },
  ],
  related: ["product-engineering", "custom-software-development", "seo-optimization"],
};

export default serviceDetailSchema.parse(service);
