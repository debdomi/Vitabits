export const metadata = {
  title: "Kapcsolat — Vitabits",
  description: "Írj nekünk — Vitabits kapcsolat.",
};

export default function Page() {
  return (
    <>
      <h1 className="font-display text-[32px] leading-tight text-brand-green-deep md:text-[44px]">
        Kapcsolat
      </h1>
      <p className="mt-4 text-brand-ink-muted">
        Kérdésed van a várólistával kapcsolatban? Írj a{" "}
        <a
          className="font-medium text-brand-green underline-offset-2 hover:underline"
          href="mailto:hello@vitabits.hu"
        >
          hello@vitabits.hu
        </a>{" "}
        címre, és hamarosan válaszolunk.
      </p>
    </>
  );
}
