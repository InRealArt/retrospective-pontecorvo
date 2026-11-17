import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

const timeline = [
  { label: "1936", text: "Naissance à Paris." },
  { label: "1960", text: "Vend sa première toile, alors étudiant aux Arts décoratifs de Paris." },
  { label: "Publicité", text: "Directeur artistique chez Havas, puis dans une douzaine d’agences, dont Roux-Séguéla, pendant près de quinze ans." },
  { label: "Peinture", text: "Se consacre à la peinture et au dessin ; enseigne les arts graphiques et plastiques à l’Atelier de la Passerelle." },
  { label: "Expositions", text: "Galerie de l’Europe (Paris), Musée de l’Imprimerie (Lyon), musée Olivier Brice (Montpellier)." },
  { label: "2008", text: "Exposition au National Arts Club, New York." },
  { label: "2026", text: "Rétrospective à la Galerie Leadouze, Paris 8e." },
];

export default function LArtiste() {
  return (
    <section id="artiste" className="bg-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 md:px-12 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="flex min-w-0 flex-col gap-6 text-base text-ink lg:col-span-7">
          <p className="eyebrow">L&apos;artiste</p>
          <SplitText
            as="h2"
            text="Alain Pontecorvo"
            className="font-serif-title text-3xl md:text-4xl lg:text-5xl"
          />
          <Reveal as="p" className="max-w-prose">
            Formé aux Arts décoratifs de Paris puis aux cours du soir de l&apos;École Estienne, où il se passionne pour la typographie, Alain Pontecorvo mène d&apos;abord une carrière de directeur artistique dans la publicité, de Havas à Roux-Séguéla, où il travaille aux côtés de Jacques Séguéla. Il y crée même son propre caractère typographique, le « Pontecorvo ».
          </Reveal>
          <Reveal as="p" className="max-w-prose" delay={0.06}>
            Revenu entièrement à la peinture et au dessin, il travaille à partir de croquis et de photographies prises sur le vif, qu&apos;il recompose à l&apos;atelier, à l&apos;huile, à la gouache, au pastel ou au fusain. Il revendique l&apos;héritage de Velázquez, Rembrandt, Manet, Klimt, Schiele et Lucian Freud. Ses œuvres figurent dans des collections publiques et privées en Europe, aux États-Unis, au Moyen-Orient et en Asie.
          </Reveal>
        </div>
        <div className="flex min-w-0 flex-col lg:col-span-5">
          <Reveal className="mb-6">
            <div className="relative aspect-[4/5] w-full bg-line-strong">
              <Image
                src="/images/Alain.webp"
                alt="Portrait d'Alain Pontecorvo, assis dans la Galerie Leadouze"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_62%]"
              />
            </div>
          </Reveal>
          {timeline.map((item, i) => (
            <Reveal
              key={item.label}
              delay={0.06 * i}
              className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:gap-8"
            >
              <span className="font-display text-2xl text-ink sm:w-36 sm:shrink-0">{item.label}</span>
              <span className="text-ink-soft">{item.text}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
