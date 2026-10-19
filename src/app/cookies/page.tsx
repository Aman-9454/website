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
  "asauvia.com sets no analytics or advertising cookies. The Asauvia blog asks before setting any. See what each site uses and how to control it.";
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
        description="asauvia.com does not use analytics or advertising cookies. The Asauvia blog may use them, but only with your consent. Here is what that means in practice."
      />
      <section className="relative py-24 lg:py-32">
        <Container>
          <p className="mb-16 font-mono text-sm text-muted-foreground">
            Last updated: <time dateTime="2026-10-19">19 October 2026</time>
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

            <h2>Cookies on the Asauvia blog</h2>
            <p>
              The blog at blog.asauvia.com is a separate site with its own cookie banner. It may use Google
              Analytics and Google advertising cookies. Until you choose, neither set of cookies is
              set. If you accept analytics, Google Analytics sets cookies whose names start with{" "}
              <code>_ga</code>, which count visits and show which articles are read. If you accept
              advertising, Google may set advertising cookies, which can show ads based on your interests.
            </p>
            <p>
              You can change your choice at any time from the Cookie settings link in the blog footer.
              Rejecting removes the analytics cookies that the blog has set. Google handles the data it
              collects through these cookies under its own privacy policy, as an independent data
              controller.
            </p>

            <h2>If this changes</h2>
            <p>
              Before we add any other non-essential cookies to asauvia.com, we will ask for your consent
              with a banner and update this page first to list what they are and why we use them.
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
