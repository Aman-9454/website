import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "ai-software-development",
  name: "AI Software Development",
  outcome: "Ship AI features that hold up in production, not just in a demo.",
  summary:
    "We design and build applications that use large language models and other AI systems as working parts of the product — retrieval, agents, chatbots, and model integration included — engineered for the accuracy and cost constraints of a real business.",
  answer:
    "AI software development is the engineering of applications where models — usually large language models — do real work inside the product: answering from your own data, running agents, or automating decisions. Asauvia builds these for teams who need AI that is measured, monitored and affordable in production, not a prototype that only works in a demo.",
  metaTitle: "AI Software Development Services | Asauvia",
  metaDescription:
    "AI software development services: LLM integration, RAG, AI agents and chatbots engineered for production. Built for teams worldwide. Talk to us.",
  primaryKeyword: "AI software development services",
  problems: [
    "An AI prototype impressed in a demo but gives unreliable answers on real data.",
    "Model costs grow faster than usage, with no visibility into why.",
    "Nobody can say whether the AI is actually getting better or worse after a change.",
    "The AI feature lives outside the product and doesn't use your own data or systems.",
  ],
  deliverables: [
    "Model and architecture selection for the actual task, not the trend",
    "Retrieval-augmented generation (RAG) pipelines over your own data",
    "AI agents and context-aware chatbots wired into your systems",
    "Evaluation harnesses so quality is measured, not assumed",
    "Production hardening: rate limits, fallbacks, and cost monitoring",
  ],
  useCases: [
    {
      title: "Answering from your own documents",
      description:
        "A retrieval pipeline over manuals, policies, or a knowledge base, so answers cite your sources instead of guessing.",
    },
    {
      title: "Context-aware support and internal chatbots",
      description:
        "Assistants that can look things up in your systems and hand off to a person when a question needs one.",
    },
    {
      title: "AI agents for multi-step tasks",
      description:
        "Agents that gather information, call your APIs, and complete a defined workflow, with checkpoints where a human approves.",
    },
    {
      title: "Adding AI to an existing product",
      description:
        "Summaries, classification, extraction, or search added to an application you already run, without rebuilding it.",
    },
  ],
  stack: ["Python", "TypeScript", "OpenAI & Anthropic APIs", "Open-weight models", "Vector databases", "PostgreSQL"],
  faqs: [
    {
      question: "Should we use RAG or fine-tune a model?",
      answer:
        "Most business use cases start with retrieval-augmented generation (RAG): it keeps answers grounded in your current data and is cheaper to update. Fine-tuning makes sense for consistent style, format, or a narrow task where retrieval alone is not enough. We usually test RAG first and fine-tune only when evaluation shows it is needed.",
    },
    {
      question: "How do you know the AI is giving good answers?",
      answer:
        "We build an evaluation set from real examples of your questions and expected answers, and run it on every change. That turns 'it seems better' into a measured result, and it catches regressions before users do.",
    },
    {
      question: "Can you work with our existing product and data?",
      answer:
        "Yes. Most of this work is integrating AI into systems you already run — your database, your APIs, your documents — rather than building a separate tool beside them.",
    },
    {
      question: "Which models do you use?",
      answer:
        "Whichever fits the task, cost, and data requirements: hosted models from providers such as OpenAI and Anthropic, or open-weight models you can run in your own environment when data must stay in-house.",
    },
    {
      question: "How do you keep model costs under control?",
      answer:
        "By measuring cost per request from the start, caching where answers repeat, routing simple requests to smaller models, and setting limits and alerts so spend never surprises you.",
    },
  ],
  related: ["ai-workflow-automation", "data-integrations", "custom-software-development"],
};

export default serviceDetailSchema.parse(service);
