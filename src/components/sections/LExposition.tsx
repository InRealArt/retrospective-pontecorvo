import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

const figures = [
  { value: "19", label: "œuvres exposées" },
  { value: "65+", label: "années de peinture" },
  { value: "2", label: "niveaux d'exposition" },
];

export default function LExposition() {
  return (
    <section id="exposition" className="bg-paper-alt">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 md:px-12 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow mb-4">L&apos;exposition</p>
          <SplitText
            as="h2"
            text="Retracer un parcours de peintre"
            className="font-serif-title text-3xl md:text-4xl lg:text-5xl"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-6 text-base text-ink lg:col-span-7">
          <Reveal as="p" className="max-w-prose">
            Né à Paris en 1936, Alain Pontecorvo peint depuis plus de soixante ans. La rétrospective rassemble 19 œuvres, des premières toiles aux travaux les plus récents : coins de rue et paysages urbains, intérieurs, natures mortes et portraits, saisis sur le vif puis recomposés à l&apos;atelier.
          </Reveal>
          <Reveal as="p" className="max-w-prose" delay={0.06}>
            Une peinture d&apos;observation, d&apos;une grande précision, proche de l&apos;hyperréalisme, où la lumière et l&apos;ombre font le sujet autant que les lieux et les visages. Présentée sur les deux niveaux de la galerie, salle d&apos;exposition et mezzanine, l&apos;exposition permet d&apos;approcher les grands formats comme les œuvres plus intimes.
          </Reveal>
          <div className="grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-0">
            {figures.map((f, i) => (
              <Reveal
                key={f.label}
                delay={0.06 * (i + 2)}
                className={i > 0 ? "sm:border-l sm:border-line sm:pl-6" : "sm:pr-6"}
              >
                <div className="font-serif-title text-5xl text-accent-deco">{f.value}</div>
                <div className="text-sm text-ink-soft">{f.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
