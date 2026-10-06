import { z } from "zod";
import { faqSchema } from "@/lib/validators";
import homeFaqs from "@/data/faqs";

const faqGroupSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  faqs: z.array(faqSchema).min(3).max(5),
});
export type FaqGroup = z.infer<typeof faqGroupSchema>;

function homeFaq(question: string) {
  const faq = homeFaqs.find((item) => item.question === question);
  if (!faq) throw new Error(`Homepage FAQ not found: ${question}`);
  return faq;
}

const groups: FaqGroup[] = [
  {
    id: "working-with-us",
    title: "Working with us",
    faqs: [
      homeFaq("What is Asauvia?"),
      homeFaq("How do we get started?"),
      {
        question: "What does your delivery process look like?",
        answer:
          "Six stages, in order: discover the real problem and constraints on a short call, design the architecture and plan with you before anything is built, build iteratively against a shared backlog, validate with testing and review gates, launch with monitoring and rollback in place from day one, then improve by measuring against the original goal.",
      },
      {
        question: "How will we know how the project is going?",
        answer:
          "You get a shared backlog and a standing update cadence, so status is visible at any time rather than reported on request. Architecture decisions are documented up front, so the reasoning behind the build is on record too.",
      },
    ],
  },
  {
    id: "engagements-and-cost",
    title: "Engagements and cost",
    faqs: [
      homeFaq("What drives the cost of a project?"),
      homeFaq("What engagement models do you offer?"),
      {
        question: "Do you publish a rate card?",
        answer:
          "No. Cost depends on the scope and uncertainty of the specific project, so we scope it with you first and then send a proposal with a recommended engagement model.",
      },
    ],
  },
  {
    id: "time-zones-and-communication",
    title: "Time zones and communication",
    faqs: [
      homeFaq("How does working across time zones actually work?"),
      {
        question: "Which time zone does your team work in?",
        answer:
          "India Standard Time (IST). For many international teams, our working day runs ahead of theirs, so work started during our day is often ready before yours begins.",
      },
      {
        question: "How do we agree on meeting times?",
        answer:
          "At kickoff we agree an overlap window and a communication cadence that suit your team. That becomes the standing rhythm for the engagement, alongside the shared backlog.",
      },
      {
        question: "How do we reach you?",
        answer:
          "Email info@asauvia.com or use the contact form. Once an engagement starts, day-to-day communication follows the cadence agreed at kickoff.",
      },
    ],
  },
  {
    id: "security-confidentiality-and-ip",
    title: "Security, confidentiality and IP",
    faqs: [
      homeFaq("Who owns the code and IP?"),
      homeFaq("How do you handle security and confidentiality?"),
      {
        question: "When do you sign an NDA?",
        answer:
          "Before any confidential scoping conversation. If the first call needs to cover details you'd rather keep private, tell us and we'll put the NDA in place first.",
      },
      {
        question: "How do you keep the code you deliver secure?",
        answer:
          "Code goes through review, every project gets a dependency review, and nothing ships until it passes testing and review gates. If you have your own security policies or questionnaires, raise them at the scoping call so they are part of the scope.",
      },
    ],
  },
  {
    id: "ai-projects",
    title: "AI projects",
    faqs: [
      {
        question: "What kind of AI work do you take on?",
        answer:
          "AI software development, meaning features and products built around AI models, and AI workflow automation, meaning AI applied to repetitive processes inside your business. Both start with scoping the real problem before choosing an approach.",
      },
      {
        question: "Do we need a fully defined AI use case before contacting you?",
        answer:
          "No. Part of the discovery stage is working out what the problem actually is and whether AI is the right tool for it. Less defined requirements usually suit a time-and-materials or retainer engagement over fixed-scope.",
      },
      {
        question: "Can AI features be added to our existing software?",
        answer:
          "Often, yes. How much integration with your existing systems is involved is one of the main things that shapes scope and cost, so we look at it during scoping.",
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    faqs: [
      {
        question: "What services do you offer?",
        answer:
          "AI software development, AI workflow automation, custom software development, product engineering, web and mobile app development, cloud and DevOps, data engineering and integration, HR and operations systems, and SEO optimization.",
      },
      {
        question: "Do you work on existing codebases or only new builds?",
        answer:
          "Both. During scoping we look at how much is genuinely new versus established patterns, and how much integration with your existing systems is involved, before recommending a plan.",
      },
      {
        question: "Does cloud and DevOps work include monitoring?",
        answer:
          "Yes. Our cloud and DevOps service includes API monitoring, and every launch goes out with monitoring and rollback in place from day one.",
      },
      {
        question: "Do you guarantee search rankings with SEO work?",
        answer:
          "No. Rankings depend on factors outside anyone's control, so we don't promise positions. We scope the SEO work with you and agree up front what it will cover.",
      },
    ],
  },
];

export default z.array(faqGroupSchema).parse(groups);
