import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Prose } from "@/components/ui/Prose";
import { JsonLd } from "@/components/seo/JsonLd";
import company from "@/data/company";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const path = "/privacy";
const title = "Privacy policy";
const description =
  "How Asauvia handles personal data sent through asauvia.com: what we collect, why, who receives it, how long we keep it, and how to exercise your rights.";
const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Privacy policy", path },
];

export const metadata: Metadata = {
  ...pageMetadata({ path, title, description }),
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const email = company.email;

  return (
    <>
      <JsonLd data={pageGraph({ path, name: title, description, crumbs })} />
      <PageHero
        crumbs={crumbs}
        label="Legal"
        title="Privacy policy"
        description="What personal data this website collects, why, and what you can ask us to do with it."
      />
      <section className="relative py-24 lg:py-32">
        <Container>
          <p className="mb-16 font-mono text-sm text-muted-foreground">
            Last updated: <time dateTime="2026-10-06">6 October 2026</time>
          </p>
          <Prose>
            <h2>Who we are and what this policy covers</h2>
            <p>
              {company.brandName} is a software development and product engineering company based in{" "}
              {company.hqRegion}, {company.hqCountry}. This policy explains how we handle personal data
              collected through this website, {company.domain}.
            </p>
            <p>
              It covers the website only. When we work with a client, the handling of any personal data
              in that engagement is set out in the separate written agreement we sign with that client.
            </p>

            <h2>What we collect</h2>
            <h3>Information you send us</h3>
            <p>
              The only personal data this website asks for is what you enter in the{" "}
              <Link href="/contact">contact form</Link>:
            </p>
            <ul>
              <li>your name and work email address</li>
              <li>your country, and your company if you choose to give it</li>
              <li>the service you are interested in</li>
              <li>an indicative timeline and budget, if you choose to give them</li>
              <li>your message, and anything you include in it</li>
            </ul>
            <p>
              When you submit the form, it also sends the page you submitted it from, the website that
              referred you (if your browser shares it), and any campaign tags in the link you followed
              (such as utm_source). This tells us how you found us. Your IP address is used briefly to
              limit repeated submissions and block spam.
            </p>
            <p>
              If you email us directly at <a href={`mailto:${email}`}>{email}</a>, we receive your email
              address and whatever you write.
            </p>
            <h3>Technical data</h3>
            <p>
              Like most websites, the provider that hosts this site keeps standard technical logs when
              pages are requested. These include your IP address, browser and device details, and the
              pages requested.
            </p>
            <h3>What we do not collect</h3>
            <p>
              This website does not currently use analytics tools, advertising or tracking cookies, or
              third-party marketing pixels. Our <Link href="/cookies">cookie policy</Link> has the
              details.
            </p>

            <h2>Why we use it</h2>
            <ul>
              <li>
                <strong>To respond to your enquiry.</strong> We use what you send to reply, arrange a
                scoping call if you want one, and prepare a proposal. The page and referral details
                help us understand how people find us.
              </li>
              <li>
                <strong>To operate and secure the website.</strong> Technical data helps keep the site
                running and protects it against abuse, such as automated spam.
              </li>
            </ul>
            <p>We do not sell personal data, and we do not use it for advertising.</p>

            <h2>Legal bases</h2>
            <p>
              Where data protection law requires a legal basis, such as the GDPR or the UK GDPR, we rely
              on:
            </p>
            <ul>
              <li>
                <strong>steps taken at your request before entering a contract</strong>, when you ask us
                about working together
              </li>
              <li>
                <strong>our legitimate interests</strong> in answering business enquiries and in running
                and securing this website, balanced against your rights
              </li>
            </ul>

            <h2>Who receives it</h2>
            <ul>
              <li>the {company.brandName} team members who handle enquiries</li>
              <li>our website hosting provider</li>
              <li>
                the email delivery provider that sends contact form submissions to our inbox
              </li>
              <li>
                a bot protection service (Cloudflare Turnstile), if it is enabled on the contact form,
                which checks that a submission comes from a person
              </li>
            </ul>
            <p>
              These providers act on our behalf. We may also disclose information where the law requires
              it.
            </p>

            <h2>International transfers</h2>
            <p>
              {company.brandName} is based in India, and our service providers may process data in other
              countries. If you contact us from outside India, your information will be transferred to
              and handled in countries whose data protection laws may differ from yours. Where the law
              requires it, we take steps to make sure those transfers are appropriately protected.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry information only as long as we need it to respond to you and to keep
              related business records. If your enquiry leads to an engagement, the agreement for that
              engagement governs what happens next. Technical logs are kept by our hosting provider in
              line with its own retention settings.
            </p>

            <h2>Your rights</h2>
            <p>
              Depending on where you live, and as available under applicable law such as the GDPR or the
              UK GDPR, you may have the right to:
            </p>
            <ul>
              <li>ask for a copy of the personal data we hold about you</li>
              <li>ask us to correct data that is inaccurate</li>
              <li>ask us to delete your data</li>
              <li>object to, or ask us to restrict, how we use it</li>
              <li>complain to your local data protection authority</li>
            </ul>
            <p>
              To make a request, email <a href={`mailto:${email}`}>{email}</a>. We may need to confirm
              your identity before acting on it.
            </p>

            <h2>Security</h2>
            <p>
              We use reasonable technical and organisational measures to protect personal data, and we
              limit access to the people who need it. No method of sending or storing data over the
              internet is completely secure, so we cannot promise absolute security. Our{" "}
              <Link href="/security">security practices page</Link> describes how we work on client
              projects.
            </p>

            <h2>Children</h2>
            <p>
              This website is meant for businesses and is not directed at children. We do not knowingly
              collect personal data from children.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy, for example if we add new tools to the website. The date at the
              top of this page shows when it last changed.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about this policy or your personal data, email{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
