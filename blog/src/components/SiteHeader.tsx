"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { mainNav, site } from "@/lib/site";
import { SearchDialog } from "@/components/search/SearchDialog";
import type { SearchItem } from "@/lib/search";

// Same header behaviour as the main site: a full-width bar that condenses into a floating pill on scroll,
// with the same primary links and "Talk to an expert" button. "Blog" is the current section here.
const navItems = [
  ...mainNav,
  { label: "Blog", href: "/" },
] as const;

const isInternal = (href: string) => href.startsWith("/");

export function SiteHeader({ searchItems }: { searchItems: SearchItem[] }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // While the menu is open the page behind it is inert: keyboard and screen-reader focus stay in the menu.
    const pageParts = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    pageParts.forEach((el) => {
      el.inert = true;
    });
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      pageParts.forEach((el) => {
        el.inert = false;
      });
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "px-4 pt-4" : "px-0 pt-0"}`}>
      <nav
        aria-label="Site"
        className={`relative z-50 mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "h-14 max-w-[1200px] rounded-2xl border border-foreground/10 bg-background/80 px-6 shadow-lg backdrop-blur-xl lg:px-8"
            : "h-20 max-w-[1400px] px-6 lg:px-12"
        }`}
      >
        <Link
          href="/"
          aria-label={`${site.blogName}, home`}
          className={`flex items-center gap-2.5 text-foreground transition-all duration-500 ${scrolled ? "text-[1.5rem]" : "text-[1.8rem]"}`}
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={128}
            height={105}
            priority
            sizes="40px"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-6" : "h-7"}`}
          />
          <Wordmark />
          <span className="ml-1 hidden border-l border-foreground/15 pl-3 font-mono text-xs uppercase tracking-wider text-muted-foreground xl:inline">
            Blog
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navItems.map((item) => {
              const current = item.href === "/";
              const className = `group relative text-sm transition-colors duration-300 hover:text-foreground ${
                current ? "text-foreground" : "text-foreground/70"
              }`;
              const underline = (
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 group-hover:w-full ${
                    current ? "w-full" : "w-0"
                  }`}
                />
              );
              return (
                <li key={item.label}>
                  {isInternal(item.href) ? (
                    <Link href={item.href} aria-current={current ? "page" : undefined} className={className}>
                      {item.label}
                      {underline}
                    </Link>
                  ) : (
                    <a href={item.href} className={className}>
                      {item.label}
                      {underline}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={searchButtonRef}
          type="button"
          aria-label="Search posts"
          aria-haspopup="dialog"
          onClick={() => setSearchOpen(true)}
          className="hidden h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground lg:mr-4 lg:inline-flex"
        >
          <Search aria-hidden="true" className="h-[18px] w-[18px]" />
        </button>

        <div className="hidden lg:block">
          <a
            href={site.contactUrl} data-cta="talk-to-expert" data-cta-location="header"
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-full bg-foreground font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
              scrolled ? "h-8 px-4 text-xs" : "h-9 px-6 text-sm"
            }`}
          >
            Talk to an expert
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground lg:hidden"
          aria-expanded={open}
          aria-controls={open ? "mobile-menu" : undefined}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {open ? (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-background lg:hidden"
        >
          <div className="flex min-h-full flex-col px-6 pb-8 pt-24">
            <nav aria-label="Primary mobile" className="border-t border-foreground/10">
              {navItems.map((item) => {
                const className =
                  "group flex items-center justify-between border-b border-foreground/10 py-4 text-2xl text-foreground";
                const icon = (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                );
                return isInternal(item.href) ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={item.href === "/" ? "page" : undefined}
                    className={className}
                  >
                    {item.label}
                    {icon}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} onClick={() => setOpen(false)} className={className}>
                    {item.label}
                    {icon}
                  </a>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
              className="mt-10 flex w-full items-center gap-3 border-t border-foreground/10 pt-6 text-left text-xl text-foreground"
            >
              <Search aria-hidden="true" className="h-5 w-5 text-muted-foreground" />
              Search posts
            </button>

            <div className="mt-auto pt-10">
              <a
                href={site.contactUrl} data-cta="talk-to-expert" data-cta-location="mobile-menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-14 w-full items-center justify-center whitespace-nowrap rounded-full bg-foreground px-8 text-base font-medium text-background"
              >
                Talk to an expert
              </a>
              <a href={`mailto:${site.email}`} className="mt-5 block text-center text-sm text-muted-foreground">
                {site.email}
              </a>
            </div>
          </div>
        </div>
      ) : null}
      <SearchDialog items={searchItems} open={searchOpen} onClose={() => { setSearchOpen(false); searchButtonRef.current?.focus(); }} />
    </header>
  );
}
