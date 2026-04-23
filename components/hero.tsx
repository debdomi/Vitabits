import Image from "next/image";
import { WaitlistForm } from "@/components/waitlist-form";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-b"
    >
      {/* Soft green glow in the background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-a-radial"
      />

      <div className="container-wide relative pt-10 pb-14 md:pt-20 md:pb-24 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16">
          {/* Copy + form */}
          <div className="text-center lg:text-left">
            <p className="kicker animate-fade-up">Új generációs gumivitamin</p>
            <h1
              id="hero-title"
              className="mt-4 font-display text-h1-mobile text-brand-green-deep text-balance md:text-h1 animate-fade-up"
              style={{ animationDelay: "60ms" }}
            >
              A napi vitamin, amit tényleg jó beépíteni a rutinodba.
            </h1>
            <p
              className="mx-auto mt-5 max-w-xl text-body-md text-brand-ink-muted md:text-body-lg lg:mx-0 animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              50+ összetevő — vitaminok, ásványi anyagok és növényi kivonatok —
              egyetlen ízletes gumivitaminban. Egyszerűbb, finomabb,
              követhetőbb.
            </p>

            <div
              className="mx-auto mt-8 max-w-xl lg:mx-0 animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              <WaitlistForm source="hero" />
            </div>
          </div>

          {/* Product visual */}
          <div className="relative mx-auto w-full max-w-[520px] animate-fade-up lg:max-w-none"
               style={{ animationDelay: "240ms" }}>
            <ProductPlinth />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductPlinth() {
  return (
    <div className="relative aspect-[4/5] w-full">
      {/* Plinth glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 top-[8%] scale-[0.92] rounded-[48%] bg-gradient-a opacity-40 blur-3xl"
      />
      {/* Soft green disc */}
      <div
        aria-hidden="true"
        className="absolute bottom-[14%] left-1/2 h-[18%] w-[62%] -translate-x-1/2 rounded-[50%] bg-brand-surface/70 blur-2xl"
      />
      <div className="relative h-full w-full animate-float-y motion-reduce:animate-none">
        <Image
          src="/images/hero-pouch.jpg"
          alt="Vitabits grüni gumivitamin tasak — alma-lime ízű, vitaminokkal, ásványi anyagokkal és növényi kivonatokkal"
          fill
          priority
          sizes="(min-width: 1024px) 480px, (min-width: 640px) 80vw, 100vw"
          className="object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
    </div>
  );
}
