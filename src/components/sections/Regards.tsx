import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

const quotes = [
  {
    quote: "« Je suis le travail d'Alain depuis plus de quarante ans. Chaque toile confirme la même évidence : c'est un peintre rare, d'une justesse et d'une maîtrise qui force l'admiration. »",
    name: "Jacques Séguéla",
    role: "Publicitaire, a travaillé plus de quatorze ans avec l'artiste",
    alt: "Portrait de Jacques Séguéla",
    photo: "/images/intervenants/seguela.webp",
  },
  {
    quote: "« Ce qui frappe d'abord chez Alain Pontecorvo, c'est l'émotion. Ses vues de Paris, entre réalisme et construction, ont à mes yeux quelque chose d'exceptionnel : on ne regarde pas seulement une ville, on la ressent. »",
    name: "Alexandre Leadouze",
    role: "Fondateur de la galerie, aux côtés des collectionneurs depuis quarante ans",
    alt: "Portrait d'Alexandre Leadouze",
    photo: "/images/intervenants/Alexandre.webp",
  },
];

export default function Regards() {
  return (
    <section id="regards" className="on-dark bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 lg:py-32">
        <p className="eyebrow mb-8">Regards sur l&apos;œuvre</p>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-y-24">
          {quotes.map((q, i) => (
            <Reveal
              key={q.name}
              as="figure"
              delay={0.06 * i}
              className={
                i === 0
                  ? "flex flex-col gap-6 lg:col-span-9"
                  : "flex flex-col gap-6 lg:col-span-9 lg:col-start-4"
              }
            >
              <blockquote className="font-serif-title text-3xl italic md:text-4xl lg:text-5xl">
                {q.quote}
              </blockquote>
              <figcaption className="flex items-center gap-4 border-t border-line-on-dark pt-6">
                <div className="relative size-14 flex-none overflow-hidden bg-paper-soft">
                  <Image src={q.photo} alt={q.alt} fill sizes="56px" className="object-cover object-top" />
                </div>
                <div>
                  <div className="font-semibold">{q.name}</div>
                  <div className="text-sm text-paper-soft">{q.role}</div>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
