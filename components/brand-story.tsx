export function BrandStory() {
  return (
    <section
      id="tortenet"
      aria-labelledby="story-title"
      className="section-y bg-brand-green-tint"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker mb-3">Márkatörténet</p>
          <h2
            id="story-title"
            className="font-display text-[32px] leading-[1.1] text-brand-green-deep md:text-[44px]"
          >
            Miért jött létre a Vitabits?
          </h2>
          <div className="mt-6 space-y-4 text-body-md text-brand-ink-muted md:text-body-lg">
            <p>
              A Vitabits azért született, hogy a mindennapi vitamin ne
              kompromisszum legyen. Túl sok étrend-kiegészítő ugyanazt a régi
              élményt adja — bonyolult, felejthető, nem elég vonzó ahhoz, hogy
              hosszú távon is a rutin része maradjon.
            </p>
            <p>
              Mi másképp csináljuk. Modern gumivitamin, modern embereknek,
              modern életmódhoz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
