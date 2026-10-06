import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "ai-workflow-automation",
  name: "AI Workflow Automation",
  outcome: "Take repetitive work off your team without losing control of it.",
  summary:
    "We automate the workflows your team repeats every day — connecting the tools you already use, adding AI agents where a step needs judgment, and keeping a person in the loop wherever a decision matters.",
  answer:
    "AI workflow automation connects the tools a team already uses and moves work between them without manual copying, using AI models for steps that need judgment, such as reading a request or classifying a document. Asauvia builds these for operations, support and back-office teams who want repetitive work handled reliably, with human approval at the points that matter.",
  metaTitle: "AI Workflow Automation Services | Asauvia",
  metaDescription:
    "AI workflow automation: connect your tools, add AI agents for judgment calls and keep people in the loop. Built in India for teams worldwide. Talk to us.",
  primaryKeyword: "AI workflow automation services",
  problems: [
    "People spend hours copying data between tools that don't talk to each other.",
    "Rule-based automations break on anything that isn't perfectly formatted.",
    "Requests and approvals get lost in inboxes and chat threads.",
    "Nobody can tell what an automation did, or why, when something goes wrong.",
  ],
  deliverables: [
    "Workflow mapping to find the steps worth automating first",
    "Integrations that connect the tools your team already uses",
    "AI agents for steps that rules alone can't handle",
    "Human-in-the-loop approvals at the decisions that matter",
    "Logging and alerts so every automated step can be traced",
  ],
  useCases: [
    {
      title: "Processing incoming requests",
      description:
        "Emails, forms, or tickets read and classified by a model, then routed to the right person or system with the key details extracted.",
    },
    {
      title: "Slack bots for internal workflows",
      description:
        "Bots that post ops notifications, collect requests, and let people approve or trigger actions without leaving Slack.",
    },
    {
      title: "Document intake and data entry",
      description:
        "Invoices, applications, or reports turned into structured records in your systems, with uncertain cases flagged for review.",
    },
    {
      title: "Approval and hand-off chains",
      description:
        "Multi-step processes where each stage is tracked, reminders go out automatically, and a person signs off before anything final happens.",
    },
    {
      title: "Keeping systems in sync",
      description:
        "Changes in one tool, such as a CRM, helpdesk or spreadsheet, reflected in the others without anyone re-typing them.",
    },
  ],
  stack: ["Python", "TypeScript", "OpenAI & Anthropic APIs", "Slack API", "REST & webhook integrations", "PostgreSQL"],
  faqs: [
    {
      question: "What kind of workflows are worth automating?",
      answer:
        "Work that repeats often, follows a recognizable pattern, and moves information between systems. We start by mapping the workflow with your team and pick the steps where automation saves the most time with the least risk.",
    },
    {
      question: "When do you use AI instead of simple rules?",
      answer:
        "Rules are cheaper and more predictable, so we use them wherever the input is consistent. AI models come in for steps that need judgment, such as reading free-text requests, classifying documents, or extracting details from varied formats.",
    },
    {
      question: "How do you stop an automation from making a costly mistake?",
      answer:
        "By putting human approval at the decisions that matter, flagging low-confidence cases for review instead of guessing, and logging every step so any action can be traced and corrected.",
    },
    {
      question: "Can you work with the tools we already use?",
      answer:
        "Yes. Most automations connect existing tools through their APIs or webhooks, so your team keeps working where it already works rather than moving to a new platform.",
    },
    {
      question: "What drives the cost of an automation project?",
      answer:
        "Mainly how many systems are involved, how well their APIs support what is needed, and how many steps need AI judgment rather than fixed rules. We scope this with you before any work starts.",
    },
    {
      question: "Who maintains the automations after launch?",
      answer:
        "Intellectual property in the code and configuration is assigned to you on delivery or payment. We document how each workflow runs and can either hand it over to your team or keep maintaining it under an ongoing arrangement.",
    },
  ],
  related: ["ai-software-development", "data-integrations", "hr-operations-systems"],
};

export default serviceDetailSchema.parse(service);
