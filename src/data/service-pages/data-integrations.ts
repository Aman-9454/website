import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "data-integrations",
  name: "Data Engineering & Integration",
  outcome: "Make your systems' data usable in one place.",
  summary:
    "Data pipelines and API integrations that bring scattered systems together into something a team — or a model — can actually query.",
  answer:
    "Data engineering and integration is the work of connecting the systems a business runs on and turning their data into something people can use. Asauvia builds API integrations, data pipelines and data models for startups and enterprises whose information is spread across tools, spreadsheets and documents, so teams and AI systems can query one reliable source.",
  metaTitle: "Data Engineering & Integration Services | Asauvia",
  metaDescription:
    "Data engineering and integration services: API integrations, data pipelines and models that turn scattered data into answers. Talk to our team.",
  primaryKeyword: "data engineering and integration services",
  problems: [
    "The same customer or order lives in several systems, and none of them agree.",
    "Reports are assembled by hand from exports and spreadsheets every week.",
    "Useful information is locked in emails, PDFs and documents nobody can query.",
    "An integration breaks quietly and the team finds out from missing data days later.",
  ],
  deliverables: [
    "API and third-party integrations between existing systems",
    "Data pipelines for analytics and reporting",
    "A data model designed for the questions the business actually asks",
    "Structuring unstructured data from documents and text into queryable records",
    "Monitoring and data-quality checks so failed syncs are caught early",
  ],
  useCases: [
    {
      title: "Connecting the tools you already use",
      description:
        "Syncing your CRM, billing, support and internal systems through their APIs, so records stay consistent.",
    },
    {
      title: "A single source for reporting",
      description:
        "Pipelines that load data from operational systems into a warehouse, replacing manual spreadsheet reports.",
    },
    {
      title: "Systemizing unstructured data",
      description:
        "Extracting fields from documents, emails and free text into structured records a team can search and analyse.",
    },
    {
      title: "Preparing data for AI",
      description:
        "Clean, well-modelled data that retrieval systems and models can use, rather than a pile of exports.",
    },
    {
      title: "Replacing fragile scripts",
      description:
        "Turning one-off sync scripts into scheduled, monitored pipelines with clear ownership and error handling.",
    },
  ],
  stack: ["Python", "SQL", "PostgreSQL", "REST & GraphQL APIs", "Webhooks", "Data warehouses"],
  faqs: [
    {
      question: "Can you integrate with the software we already use?",
      answer:
        "In most cases, yes. If a system has an API, webhooks or a reliable export, it can usually be integrated. We confirm what each system supports during scoping, before committing to an approach.",
    },
    {
      question: "Do we need a data warehouse?",
      answer:
        "Not always. If the goal is keeping two or three systems in sync, direct integrations may be enough. A warehouse becomes worth it when you need reporting across many sources or history the source systems do not keep.",
    },
    {
      question: "What do you mean by structuring unstructured data?",
      answer:
        "Taking information that lives in documents, emails or free-text fields and extracting it into consistent records, often with AI-assisted extraction plus validation rules, so it can be filtered, reported on and queried.",
    },
    {
      question: "How do you handle sensitive data?",
      answer:
        "Access to your systems and data is limited to the people on the project for the duration of the engagement, and an NDA is signed before any confidential scoping conversation.",
    },
    {
      question: "What happens when a source system changes?",
      answer:
        "Pipelines include validation and alerting, so a changed field or failed sync is flagged quickly. Integrations are documented, so fixing them does not depend on one person.",
    },
  ],
  related: ["ai-software-development", "ai-workflow-automation", "cloud-devops"],
};

export default serviceDetailSchema.parse(service);
