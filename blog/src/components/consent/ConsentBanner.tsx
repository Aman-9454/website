"use client";

import { useState } from "react";
import { useConsent } from "./ConsentProvider";
import { site } from "@/lib/site";

/** Cookie banner. Accept and reject have equal weight, and nothing is pre-ticked. */
export function ConsentBanner() {
  const { bannerOpen, consent, save } = useConsent();
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  if (!bannerOpen) return null;

  // Prefill the toggles with the current choice when the visitor reopens settings.
  const openCustomize = () => {
    setAnalytics(consent?.analytics ?? false);
    setAdvertising(consent?.advertising ?? false);
    setCustomizing(true);
  };

  return (
    <section
      aria-labelledby="consent-heading"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/10 bg-background/95 shadow-lg backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="max-w-2xl">
          <h2 id="consent-heading" className="mb-2 font-display text-2xl tracking-tight">
            Your privacy choices
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            This blog uses Google Analytics to count visits and see which articles are read. If we show ads, it
            also uses Google advertising cookies. Nothing is set until you choose. You can change your mind at any
            time from Cookie settings in the footer. Read our{" "}
            <a href={`${site.mainUrl}/cookies`} className="text-foreground underline underline-offset-4">
              cookie policy
            </a>
            .
          </p>

          {customizing ? (
            <fieldset className="mt-5 space-y-3">
              <legend className="sr-only">Choose which cookies to allow</legend>
              <label className="flex items-center gap-3 text-base text-foreground">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 accent-foreground"
                />
                Analytics cookies (Google Analytics)
              </label>
              <label className="flex items-center gap-3 text-base text-foreground">
                <input
                  type="checkbox"
                  checked={advertising}
                  onChange={(e) => setAdvertising(e.target.checked)}
                  className="h-4 w-4 accent-foreground"
                />
                Advertising cookies (Google)
              </label>
            </fieldset>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          {customizing ? (
            <button
              type="button"
              onClick={() => save(analytics, advertising)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Save choices
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => save(false, false)}
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-base font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={openCustomize}
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-base font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={() => save(true, true)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Accept all
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
