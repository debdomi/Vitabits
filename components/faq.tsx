import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ITEMS = [
  {
    q: "Mi a Vitabits?",
    a: "A Vitabits egy modern gumivitamin márka, amely a napi rutin egyszerűsítésére és élvezetesebbé tételére épül.",
  },
  {
    q: "Mikor indul a márka?",
    a: "Hamarosan. A várólistára feliratkozók értesülnek elsőként az indulásról és az early access lehetőségekről.",
  },
  {
    q: "Mit kapok, ha feliratkozom?",
    a: "Elsőként értesülsz a termékről, az indulásról és a limitált bevezető ajánlatokról — plusz exkluzív frissítések a várólistás tagoknak.",
  },
  {
    q: "Spamelni fogtok?",
    a: "Nem. Csak a fontos frissítéseket küldjük, és egy kattintással leiratkozhatsz bármikor.",
  },
];

export function Faq() {
  return (
    <section
      id="gyik"
      aria-labelledby="faq-title"
      className="section-y bg-white"
    >
      <div className="container-wide">
        <div className="mx-auto max-w-2xl text-center">
          <p className="kicker mb-3">GYIK</p>
          <h2
            id="faq-title"
            className="font-display text-[32px] leading-[1.1] text-brand-green-deep md:text-[44px]"
          >
            Gyakori kérdések
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-card border border-brand-green/15 bg-white px-6 shadow-card md:mt-12 md:px-8">
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="w-full"
          >
            {ITEMS.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
