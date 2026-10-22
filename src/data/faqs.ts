import { faqSchema, type Faq } from "@/lib/validators";

const faqs: Faq[] = [
  {
    question: "What is Asauvia?",
    answer:
      "Asauvia is a service-based software development and product engineering company headquartered in Uttar Pradesh, India. It builds AI applications, workflow automation, custom software, product engineering, web and mobile apps, cloud and DevOps, data integrations, HR and operations systems, and technical SEO for startups and enterprises worldwide. It also builds its own products, listed on the products page, and works India Standard Time with clients across time zones.",
  },
  {
    question: "What drives the cost of a project?",
    answer:
      "Mainly scope and uncertainty: how well-defined the requirements are, how much integration with existing systems is needed, and how much of the work is genuinely new versus established patterns. We scope this with you before any work starts, so the cost driver is the project, not a rate card.",
  },
  {
    question: "What engagement models do you offer?",
    answer:
      "Fixed-scope for well-defined projects, a dedicated team for ongoing product work, and time-and-materials or retainer arrangements for work that evolves as it goes. We'll recommend one based on how defined your requirements already are.",
  },
  {
    question: "How does working across time zones actually work?",
    answer:
      "Our team works India Standard Time. That runs ahead of business hours in the US, UK and Europe — so work done during our day is often ready before yours starts — and overlaps with much of Asia-Pacific. We agree a communication cadence and overlap window with you at kickoff.",
  },
  {
    question: "Who owns the code and IP?",
    answer:
      "You do. Our standard agreements assign IP in the work product to the client on delivery or payment, and we sign NDAs before any confidential scoping conversation.",
  },
  {
    question: "How do you handle security and confidentiality?",
    answer:
      "Access to your systems and data is scoped to the people actually working on your project, under NDA, for the duration of the engagement. See our security page for the specific practices we follow.",
  },
  {
    question: "How do we get started?",
    answer:
      "Tell us what you're building, improving, or automating using the contact form. We'll follow up to scope the problem on a short call, then come back with a proposal and a recommended engagement model.",
  },
];

export default faqs.map((faq) => faqSchema.parse(faq));
