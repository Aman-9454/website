import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { MarketsSection } from "@/components/sections/MarketsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, webSiteSchema, webPageSchema, faqPageSchema, graph } from "@/lib/schema";
import faqs from "@/data/faqs";
import services from "@/data/services";
import principles from "@/data/principles";
import process from "@/data/process";

const title = "Asauvia | AI Software Development & Engineering Company";
const description =
  "Asauvia is an AI software development company building AI apps, automation and custom software for startups and enterprises worldwide. Talk to an expert.";

export const metadata: Metadata = pageMetadata({ path: "/", absoluteTitle: true, title, description });

export default function Home() {
  const schema = graph([
    organizationSchema(),
    webSiteSchema(),
    webPageSchema({
      path: "/",
      name: title,
      description,
    }),
    faqPageSchema(faqs),
  ]);

  return (
    <>
      <JsonLd data={schema} />
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <ServicesSection
        services={services.map(({ slug, name, outcome, summary, deliverables }) => ({ slug, name, outcome, summary, deliverables }))}
      />
      <PrinciplesSection principles={principles} />
      <ProcessSection steps={process} />
      <MarketsSection />
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
