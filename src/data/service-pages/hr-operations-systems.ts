import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "hr-operations-systems",
  name: "HR & Operations Systems",
  outcome: "Replace spreadsheet-and-email processes with internal tools people actually use.",
  summary:
    "We build internal HR and operations tools — onboarding, approvals, leave and requests, operational dashboards — that systemize everyday workflows, cut manual overhead, and reduce the errors that come from copying data between spreadsheets and inboxes.",
  answer:
    "HR and operations software development is building the internal tools a company runs on: onboarding checklists, approval flows, leave and request handling, and dashboards that show where work stands. Asauvia builds these for growing teams whose processes still live in spreadsheets and email threads, connecting them to the HR and payroll systems they already use.",
  metaTitle: "HR and Operations Software Development | Asauvia",
  metaDescription:
    "HR and operations software development: onboarding, approvals, leave requests and ops dashboards that replace spreadsheets and email. Talk to our team.",
  primaryKeyword: "HR and operations software development",
  problems: [
    "Onboarding, approvals and leave requests run on spreadsheets and email, and things get missed.",
    "The same employee data is typed into several tools by hand, and the copies drift apart.",
    "Nobody can see where a request is stuck without asking around.",
    "Off-the-shelf HR software covers the basics but not the way your company actually works.",
  ],
  deliverables: [
    "Onboarding and offboarding workflows with tasks, owners and checklists",
    "Approval flows for leave, expenses, purchases and other requests",
    "Operational dashboards that show status without manual reporting",
    "Integrations with your existing HR and payroll systems through their APIs or exports",
    "Role-based access so people see only the records they should",
  ],
  useCases: [
    {
      title: "Structured employee onboarding",
      description:
        "A single workflow that assigns accounts, equipment, documents and introductions to the right owners, and shows what is still open.",
    },
    {
      title: "Leave and request handling",
      description:
        "Requests submitted in one place, routed to the right approver, and recorded without anyone re-entering them in a spreadsheet.",
    },
    {
      title: "Multi-step approvals",
      description:
        "Expense, purchase or policy-exception approvals with clear rules for who signs off, and a history of every decision.",
    },
    {
      title: "Operations dashboards",
      description:
        "A live view of headcount changes, open requests and pending tasks, pulled from the systems where the data already lives.",
    },
    {
      title: "Connecting HR data across tools",
      description:
        "Syncing employee records between your HR system, payroll and internal tools so changes are made once, not several times.",
    },
  ],
  stack: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "REST & webhook integrations"],
  faqs: [
    {
      question: "Should we build an internal tool or buy HR software?",
      answer:
        "Buy when an existing product fits the way you work. Build when your process is specific enough that you are working around the software, or when you need to connect several tools that do not talk to each other. Often the right answer is both: keep your HR platform and build the workflows around it.",
    },
    {
      question: "Can you integrate with the HR and payroll systems we already use?",
      answer:
        "Usually, yes, as long as the system offers an API or a reliable export. We review what the system exposes during scoping and tell you plainly what can be automated and what cannot.",
    },
    {
      question: "How do you handle employee data?",
      answer:
        "Access to your systems and data is limited to the people on the project for the duration of the engagement, and we sign an NDA before any confidential scoping conversation. Inside the tool, role-based access controls who can see which records.",
    },
    {
      question: "Can you start with one process and expand later?",
      answer:
        "Yes, and we usually recommend it. Starting with the process that causes the most manual work shows value early and gives your team a working tool to give feedback on before more is built.",
    },
    {
      question: "Who owns the internal tools you build?",
      answer:
        "You do. Intellectual property in the work product is assigned to you on delivery or payment, and architecture decisions are documented so your own team can maintain it.",
    },
  ],
  related: ["ai-workflow-automation", "data-integrations", "custom-software-development"],
};

export default serviceDetailSchema.parse(service);
