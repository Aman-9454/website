import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/ui/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import company from "@/data/company";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const path = "/terms";
const title = "Website terms of use";
const description =
  "The terms for using asauvia.com: what the site's content is and is not, intellectual property, acceptable use, external links, and how to contact Asauvia.";
const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Terms of use", path },
];

export const metadata: Metadata = {
  ...pageMetadata({ path, title, description }),
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const email = company.email;
  const linkedIn = company.sameAs[0];

  return (
    <>
      <JsonLd data={pageGraph({ path, name: title, description, crumbs })} />
      <PageHero
        crumbs={crumbs}
        label="Legal"
        title="Terms of use"
        description="The terms that apply when you use this website. Client work is covered by its own agreement."
      />
      <section className="relative py-24 lg:py-32">
        <Container>
          <p className="mb-16 font-mono text-sm text-muted-foreground">
            Last updated: <time dateTime="2026-10-06">6 October 2026</time>
          </p>
          <Prose>
            <h2>About these terms</h2>
            <p>
              These terms apply to your use of {company.domain}, run by {company.brandName}, a software
              development and product engineering company based in {company.hqRegion},{" "}
              {company.hqCountry}. By using the website, you accept these terms. If you do not accept
              them, please do not use the site.
            </p>
            <p>
              These terms cover the website only. Any work we do for a client is governed by a separate
              written agreement, and that agreement takes priority over anything on this website.
            </p>

            <h2>Information on this website</h2>
            <p>
              The content on this website is general information about {company.brandName} and the
              services we provide. It is not an offer to provide services on particular terms, and it is
              not professional, legal, technical or financial advice. Scope, terms and pricing for any
              engagement are agreed in writing before work starts.
            </p>
            <p>
              We try to keep the content accurate and up to date, but we may change or remove it at any
              time without notice.
            </p>

            <h2>No warranty</h2>
            <p>
              The website is provided as it is and as available. To the extent the law allows, we make
              no promises that it will be accurate, complete, uninterrupted or free of errors or harmful
              components.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the extent the law allows, {company.brandName} is not liable for any loss or damage
              arising from your use of, or reliance on, this website or its content. Nothing in these
              terms limits liability that cannot be limited under applicable law.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The text, design, graphics and code of this website belong to {company.brandName} or its
              licensors. You may view and share pages for your own reference, for example when
              evaluating us as a supplier. You may not copy, republish or reuse the content for other
              purposes without our written permission.
            </p>
            <p>
              This section is about the website itself. Ownership of work we deliver to clients is set
              out in each client agreement.
            </p>

            <h2>Acceptable use</h2>
            <p>When using this website, you agree not to:</p>
            <ul>
              <li>use it in a way that breaks any law or regulation</li>
              <li>send spam, malicious code or misleading information through the contact form</li>
              <li>try to gain unauthorised access to the site or the systems behind it</li>
              <li>interfere with the site&rsquo;s operation, for example by overloading it</li>
              <li>scrape or harvest content or contact details in bulk</li>
            </ul>

            <h2>External links</h2>
            <p>
              This website links to sites we do not control, such as our{" "}
              <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn company page
              </a>
              . We are not responsible for their content or how they handle your data. Their own terms
              and policies apply.
            </p>

            <h2>Privacy</h2>
            <p>
              How we handle personal data sent through this website is explained in our{" "}
              <Link href="/privacy">privacy policy</Link> and{" "}
              <Link href="/cookies">cookie policy</Link>.
            </p>

            <h2>Changes to these terms</h2>
            <p>
              We may update these terms from time to time. The date at the top of this page shows when
              they last changed. Continuing to use the website after a change means you accept the
              updated terms.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these terms, email <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
