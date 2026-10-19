import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GlyphWave } from "./canvas/GlyphWave";
import { Wordmark } from "./Wordmark";
import { companyLinks, legalLinks, site } from "@/lib/site";
import { serviceHref, services } from "@/lib/services";
import { CookieSettingsButton } from "./consent/CookieSettingsButton";

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
      {children}
    </a>
  );
}

function InternalFooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
      {children}
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-foreground/10">
      <div className="pointer-events-none absolute inset-0 h-64 overflow-hidden opacity-20" aria-hidden="true">
        <GlyphWave className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 lg:px-12 lg:py-24">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-8 lg:gap-8">
          <div className="col-span-2">
            <Link href="/" aria-label={`${site.blogName}, home`} className="mb-6 inline-flex items-center gap-3 text-[1.925rem] text-foreground">
              <Image src="/logo-mark.png" alt="" width={128} height={105} sizes="40px" className="h-8 w-auto" />
              <Wordmark />
            </Link>
            <p className="mb-8 max-w-xs leading-relaxed text-muted-foreground">{site.description}</p>
            <div className="flex flex-wrap gap-6">
              <a href={`mailto:${site.email}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {site.email}
              </a>
              <a
                href={site.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h2 className="mb-6 text-sm font-medium">Services</h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              {services.map((service) => (
                <li key={service.slug}>
                  <FooterLink href={serviceHref(service.slug)}>{service.name}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href={`${site.mainUrl}/services`}>All services</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-medium">Company</h2>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-medium">Resources</h2>
            <ul className="space-y-4">
              <li>
                <FooterLink href={`${site.mainUrl}/faq`}>FAQ</FooterLink>
              </li>
              <li>
                <a
                  href={site.contactUrl}
                  data-cta="talk-to-expert"
                  data-cta-location="footer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Talk to an expert
                </a>
              </li>
              <li>
                <InternalFooterLink href="/posts">All posts</InternalFooterLink>
              </li>
              <li>
                <InternalFooterLink href="/feed.xml">RSS feed</InternalFooterLink>
              </li>
              <li>
                <InternalFooterLink href="/llms.txt">For AI assistants</InternalFooterLink>
              </li>
              <li>
                <InternalFooterLink href="/sitemap.xml">Sitemap</InternalFooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-medium">Legal</h2>
            <ul className="space-y-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-foreground/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row lg:px-12">
          <p className="text-sm text-muted-foreground">
            © {year} {site.brandName}. All rights reserved.
          </p>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-signal" />
            Working India Standard Time, ahead of the US, UK and Europe
          </span>
        </div>
      </div>
    </footer>
  );
}
