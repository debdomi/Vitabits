export const metadata = {
  title: "Adatvédelmi tájékoztató — Vitabits",
  description:
    "Vitabits adatvédelmi tájékoztató — hogyan kezeljük a várólistára feliratkozók adatait.",
};

export default function Page() {
  return (
    <>
      <h1 className="font-display text-[32px] leading-tight text-brand-green-deep md:text-[44px]">
        Adatvédelmi tájékoztató
      </h1>
      <p className="mt-4 text-brand-ink-muted">
        Ez egy előzetes vázlat. A hivatalos, GDPR-megfelelő dokumentum az
        induláskor kerül közzétételre.
      </p>
      <h2 className="mt-10 font-display text-2xl text-brand-green-deep">
        Miért kérjük az email címed?
      </h2>
      <p className="mt-2 text-brand-ink-muted">
        A várólistára feliratkozók email címét kizárólag abból a célból
        tároljuk, hogy értesítsük őket a Vitabits hivatalos indulásáról és a
        korai hozzáférési lehetőségekről.
      </p>
      <h2 className="mt-8 font-display text-2xl text-brand-green-deep">
        Milyen adatokat tárolunk?
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-brand-ink-muted">
        <li>Email cím</li>
        <li>Hozzájárulás időpontja és verziója</li>
        <li>IP cím (spam-védelem céljából)</li>
        <li>Böngésző user-agent (technikai célokra)</li>
      </ul>
      <h2 className="mt-8 font-display text-2xl text-brand-green-deep">
        Leiratkozás
      </h2>
      <p className="mt-2 text-brand-ink-muted">
        Minden emailben található egy-kattintásos leiratkozási link.
      </p>
    </>
  );
}
