import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { GlyphWave } from "@/components/canvas/GlyphWave";
import { navigation } from "@/data/navigation";
import company from "@/data/company";
import { websiteMailto } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-foreground/10">
      <div className="pointer-events-none absolute inset-0 h-64 overflow-hidden opacity-20" aria-hidden="true">
        <GlyphWave className="h-full w-full" />
      </div>

      <Container className="relative z-10">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-8 lg:gap-8">
            <div className="col-span-2">
              <Link href="/" aria-label={`${company.brandName}, home`} className="mb-6 inline-flex items-center gap-3 text-[1.925rem] text-foreground">
                <Image src="/logo-mark.png" alt="" width={128} height={105} sizes="40px" className="h-8 w-auto" />
                <Wordmark />
              </Link>
              <p className="mb-8 max-w-xs leading-relaxed text-muted-foreground">{company.description}</p>
              <div className="flex flex-wrap gap-6">
                <a
                  href={websiteMailto(company.email)}
                  className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {company.email}
                </a>
                {company.sameAs.map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            {navigation.footerGroups.map((group) => (
              <div key={group.title} className={group.wide ? "col-span-2 lg:col-span-3" : undefined}>
                <h3 className="mb-6 text-sm font-medium">{group.title}</h3>
                <ul className={group.wide ? "grid grid-cols-2 gap-x-8 gap-y-4" : "space-y-4"}>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-foreground/10 py-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {company.brandName}. All rights reserved.
          </p>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-signal" />
            Working India Standard Time, ahead of the US, UK and Europe
          </span>
        </div>
      </Container>
    </footer>
  );
}
