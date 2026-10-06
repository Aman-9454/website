import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/ui/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import company from "@/data/company";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const path = "/cookies";
const title = "Cookie policy";
const description =
  "asauvia.com sets no analytics or advertising cookies. See what browser storage the site may use, how consent would work, and how to control cookies.";
const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Cookie policy", path },
];

export const metadata: Metadata = {
  ...pageMetadata({ path, title, description }),
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  const email = company.email;

  return (
    <>
      <JsonLd data={pageGraph({ path, name: title, description, crumbs })} />
      <PageHero
        crumbs={crumbs}
        label="Legal"
        title="Cookie policy"
        description="This website does not use analytics or advertising cookies. Here is what that means in practice."
      />
      <section className="relative py-24 lg:py-32">
        <Container>
          <p className="mb-16 font-mono text-sm text-muted-foreground">
            Last updated: <time dateTime="2026-10-06">6 October 2026</time>
          </p>
          <Prose>
            <h2>What cookies are</h2>
            <p>
              Cookies are small text files a website stores in your browser. Similar technologies, such
              as local storage, work in much the same way. In this policy, &ldquo;cookies&rdquo; covers
              both.
            </p>

            <h2>Cookies on this website</h2>
            <p>
              {company.domain} does not currently set any non-essential cookies. In particular, it does
              not use:
            </p>
            <ul>
              <li>analytics or audience measurement cookies</li>
              <li>advertising or retargeting cookies</li>
              <li>third-party marketing pixels or social media trackers</li>
            </ul>
            <p>
              If any storage is used, it is strictly necessary for the site to work or to keep it secure.
              For example, if bot protection (Cloudflare Turnstile) is enabled on the{" "}
              <Link href="/contact">contact form</Link>, it may use data in your browser to check that a
              submission comes from a person. Strictly necessary storage does not require consent.
            </p>

            <h2>If this changes</h2>
            <p>
              If we ever add analytics or any other non-essential cookies, we will ask for your consent
              with a banner before setting them, and we will update this page first to list what they
              are and why we use them.
            </p>

            <h2>How to control cookies</h2>
            <p>
              You can view, block and delete cookies in your browser settings. Each browser explains how
              in its help pages, usually under privacy or site data. Blocking strictly necessary storage
              may stop parts of the site, such as the contact form, from working.
            </p>

            <h2>More information</h2>
            <p>
              Our <Link href="/privacy">privacy policy</Link> explains how we handle personal data sent
              through this website. For questions about cookies, email{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
