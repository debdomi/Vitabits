"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "vitabits:sticky-cta-dismissed";

export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
        return;
      }
    } catch {
      /* private mode — ignore */
    }

    const hero = document.getElementById("hero");
    if (!hero) return;

    // Show the bar once the user has scrolled past the hero section.
    // IntersectionObserver with a negative bottom root margin is
    // cheaper than a scroll listener and avoids layout thrash.
    const io = new IntersectionObserver(
      ([entry]) => {
        const pastHero =
          !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        setVisible(pastHero);
      },
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Gyors feliratkozás"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "transition-transform duration-300 ease-brand",
        "pb-[env(safe-area-inset-bottom)]",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center gap-2 border-t border-brand-green/15 bg-white/95 px-4 py-3 shadow-sticky backdrop-blur"
        )}
      >
        <a
          href="#final-cta"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-btn bg-brand-green px-5 text-base font-semibold text-white shadow-cta transition-colors hover:bg-brand-green-hover focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-green focus-visible:ring-offset-2"
        >
          Csatlakozz a várólistához
        </a>
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            try {
              sessionStorage.setItem(DISMISS_KEY, "1");
            } catch {
              /* ignore */
            }
          }}
          aria-label="Sáv elrejtése"
          className="inline-flex h-12 w-12 items-center justify-center rounded-btn text-brand-ink-muted hover:bg-brand-green-tint focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-green"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
