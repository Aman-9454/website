import type { Metadata } from "next";
import Link from "next/link";
import { GridLines } from "@/components/hero/GridLines";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import company from "@/data/company";
import { serviceCatalog } from "@/data/service-catalog";
import { websiteMailto } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-foreground/10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <GridLines />
        <Container className="relative z-10">
          <span className="animate-fade-up mb-8 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="h-px w-8 bg-foreground/30" />
            Error 404
          </span>
          <h1 className="animate-fade-up max-w-5xl font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-tight [animation-delay:100ms]">
            Page not found.
            <br />
            <span className="text-muted-foreground">
              The link may be out of date.
            </span>
          </h1>
          <p className="animate-fade-up mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground [animation-delay:200ms] lg:text-2xl">
            The page you asked for does not exist or has moved. These links
            should get you where you were going.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col items-start gap-4 [animation-delay:300ms] sm:flex-row">
            <Button href="/" withArrow>
              Back to the home page
            </Button>
            <Button href="/contact" variant="secondary">
              Contact the team
            </Button>
          </div>
        </Container>
      </section>
      <section className="relative py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <h2 className="font-display text-3xl tracking-tight lg:text-4xl">
                Main pages
              </h2>
              <ul className="mt-8 border-t border-foreground/10">
                {[
                  { href: "/", label: "Home" },
                  { href: "/services", label: "All services" },
                  { href: "/how-we-work", label: "How we work" },
                  { href: "/contact", label: "Contact us" },
                ].map((item, index) => (
                  <li key={item.href} className="border-b border-foreground/10">
                    <Reveal delay={index * 80}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-4 text-lg transition-colors hover:text-muted-foreground"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className="font-mono text-sm text-muted-foreground"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <Reveal delay={320}>
                <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
                  Still stuck? Email{" "}
                  <a
                    href={websiteMailto(company.email)}
                    className="text-foreground underline underline-offset-4 hover:no-underline"
                  >
                    {company.email}
                  </a>{" "}
                  and tell us what you were looking for.
                </p>
              </Reveal>
            </div>
            <div>
              <h2 className="font-display text-3xl tracking-tight lg:text-4xl">
                Services
              </h2>
              <ul className="mt-8 border-t border-foreground/10">
                {serviceCatalog.map((service, index) => (
                  <li
                    key={service.slug}
                    className="border-b border-foreground/10"
                  >
                    <Reveal delay={Math.min(index * 80, 400)}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="block py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {service.name}
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
