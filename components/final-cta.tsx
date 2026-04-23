import { WaitlistForm } from "@/components/waitlist-form";

export function FinalCta() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden bg-gradient-a py-16 md:py-24"
    >
      {/* Ambient light orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-white/15 blur-3xl"
      />

      <div className="container-wide relative">
        <div className="mx-auto max-w-2xl rounded-card bg-white p-8 shadow-cta md:p-12">
          <div className="text-center">
            <h2
              id="final-cta-title"
              className="font-display text-[30px] leading-[1.1] text-brand-green-deep text-balance md:text-[44px]"
            >
              Tedd egyszerűbbé a napi rutinodat.
            </h2>
            <p className="mt-4 text-body-md text-brand-ink-muted md:text-body-lg">
              Csatlakozz a várólistához, és értesítünk, amint indulunk.
            </p>
          </div>

          <div className="mt-8">
            <WaitlistForm source="final_cta" />
          </div>
        </div>
      </div>
    </section>
  );
}
