import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "cloud-devops",
  name: "Cloud & DevOps",
  outcome: "Infrastructure that scales without becoming someone's full-time job.",
  summary:
    "Cloud architecture, CI/CD, and operational tooling across AWS, Azure, and GCP, built so deploys are routine rather than risky.",
  answer:
    "Cloud and DevOps services cover how software is hosted, deployed and watched once it is live: cloud architecture, migration, CI/CD pipelines, observability and API monitoring. Asauvia sets these up on AWS, Azure or GCP for startups and enterprises that want releases to be routine, problems to be noticed by alerts rather than customers, and infrastructure costs they can explain.",
  metaTitle: "Cloud & DevOps Services | Asauvia",
  metaDescription:
    "Cloud and DevOps services on AWS, Azure and GCP: migration, CI/CD with testing gates, observability and API monitoring. For teams worldwide.",
  primaryKeyword: "cloud and DevOps services",
  problems: [
    "Deploys are manual, rare and stressful, so fixes wait for a release window.",
    "Customers notice outages or slow endpoints before the team does.",
    "The cloud bill keeps growing and nobody can say which service is driving it.",
    "Infrastructure was set up by hand and only one person knows how it works.",
  ],
  deliverables: [
    "Cloud architecture and migration planning for AWS, Azure, or GCP",
    "CI/CD pipelines with automated testing gates",
    "Observability: logging, metrics, and alerting from day one",
    "API monitoring: health checks on critical endpoints, latency analysis and automated alerts",
    "Infrastructure as code, so environments can be reviewed and rebuilt",
  ],
  useCases: [
    {
      title: "Moving to the cloud or between clouds",
      description:
        "A staged migration plan for applications and data, with rollback at each step instead of one risky cutover.",
    },
    {
      title: "Automating releases",
      description:
        "Pipelines that build, test and deploy on every merge, so shipping a fix is a routine step rather than an event.",
    },
    {
      title: "Monitoring critical APIs",
      description:
        "Health checks on the endpoints your product and partners depend on, with automated alerts and latency analysis.",
    },
    {
      title: "Making production visible",
      description:
        "Structured logs, metrics and dashboards that let the team find the cause of a problem instead of guessing.",
    },
    {
      title: "Bringing cloud costs under control",
      description:
        "Reviewing what runs, where, and why, then right-sizing resources and tagging spend so it can be traced.",
    },
  ],
  stack: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "CI/CD pipelines", "Logging, metrics & alerting"],
  faqs: [
    {
      question: "Which cloud provider should we use?",
      answer:
        "Usually the one your team and existing systems already fit best. AWS, Azure and GCP all cover typical business workloads; the deciding factors tend to be existing contracts, services you depend on, and your team's experience. We recommend one with the trade-offs written down.",
    },
    {
      question: "Can you migrate without downtime for our users?",
      answer:
        "We plan migrations to keep disruption as small as possible: moving in stages, running old and new side by side where practical, and keeping a rollback path at every step. Whether a specific cutover can happen with no interruption at all depends on the system, and we say so during planning.",
    },
    {
      question: "What does your API monitoring cover?",
      answer:
        "Continuous health checks on the endpoints that matter most, response-time tracking to spot slowdowns early, and automated alerts routed to the people who can act on them.",
    },
    {
      question: "Do you manage infrastructure after it is set up?",
      answer:
        "We can, as an ongoing engagement, or we can hand it over to your team. Infrastructure is written as code and documented, so either path works without depending on one person's memory.",
    },
    {
      question: "How do you make deploys safer?",
      answer:
        "Every change goes through automated tests and code review before it can deploy, and monitoring and rollback are in place from the first launch.",
    },
  ],
  related: ["custom-software-development", "data-integrations", "product-engineering"],
};

export default serviceDetailSchema.parse(service);
