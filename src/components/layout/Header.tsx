"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import type { NavItem } from "@/lib/validators";
import { websiteMailto } from "@/lib/utils";

export function Header({
  brandName,
  navItems,
  email,
}: {
  brandName: string;
  navItems: NavItem[];
  email: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "px-4 pt-4" : "px-0 pt-0"
      }`}
    >
      <nav
        className={`relative z-50 mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "h-14 max-w-[1200px] rounded-2xl border border-foreground/10 bg-background/80 px-6 shadow-lg backdrop-blur-xl lg:px-8"
            : "h-20 max-w-[1400px] px-6 lg:px-12"
        }`}
      >
        <Link
          href="/"
          aria-label={`${brandName}, home`}
          className={`flex items-center gap-2.5 text-foreground transition-all duration-500 ${
            scrolled ? "text-[1.5rem]" : "text-[1.8rem]"
          }`}
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
        </Link>

        <div className="hidden items-center gap-12 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm text-foreground/70 transition-colors duration-300 hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button href="/contact" className={scrolled ? "h-8 px-4 text-xs" : "h-9 px-6 text-sm"}>
            Talk to an expert
          </Button>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-background lg:hidden"
        >
          <div className="flex min-h-full flex-col px-6 pb-8 pt-24">
            <nav aria-label="Primary mobile" className="border-t border-foreground/10">
              {[{ label: "Home", href: "/" }, ...navItems].map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-foreground/10 py-4 text-2xl text-foreground animate-[fade-up_0.35s_ease-out_both]"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {item.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <Button href="/contact" className="w-full" withArrow onClick={() => setOpen(false)}>
                Talk to an expert
              </Button>
              <a href={websiteMailto(email)} className="mt-5 block text-center text-sm text-muted-foreground">
                {email}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
