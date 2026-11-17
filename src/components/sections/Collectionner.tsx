import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";

const steps = [
  {
    n: "01",
    title: "Visiter",
    text: "Découvrez les œuvres librement ou lors d'une visite privée avec un membre de la galerie.",
  },
  {
    n: "02",
    title: "S'informer",
    text: "Recevez le catalogue de l'exposition, réalisé avec InRealArt, et le dossier des œuvres qui vous intéressent.",
  },
  {
    n: "03",
    title: "Acquérir",
    text: "Certificat d'authenticité, conseils d'encadrement, livraison et installation : [à préciser selon les services de la galerie].",
  },
];

export default function Collectionner() {
  return (
    <section className="bg-paper-alt">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-12 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow mb-4">Collectionner Pontecorvo</p>
          <SplitText
            as="h2"
            text="Acquérir une œuvre de la rétrospective"
            className="font-serif-title mb-4 text-3xl md:text-4xl lg:text-5xl"
          />
          <Reveal as="p" className="text-lg text-ink-soft">
            Les œuvres exposées sont disponibles à l&apos;acquisition. L&apos;équipe de la galerie, dirigée par Thibault Proust, vous accompagne de la première visite à l&apos;accrochage chez vous.
          </Reveal>
        </div>
        <ol className="m-0 grid min-w-0 list-none grid-cols-1 gap-8 p-0 lg:col-span-7">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={0.06 * i}
              className={`flex flex-col gap-2 border-t border-line pt-5 ${i === 1 ? "lg:ml-12" : i === 2 ? "lg:ml-24" : ""}`}
            >
              <span className="font-serif-title text-3xl text-accent-deco">{s.n}</span>
              <strong className="text-lg">{s.title}</strong>
              <span className="text-ink-soft">{s.text}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
