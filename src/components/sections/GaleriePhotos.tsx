import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'

const placeholders = [0, 1, 2, 3, 4]

export default function GaleriePhotos() {
  return (
    <>
      <section aria-label="Vues de l'exposition" className="bg-paper pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:grid-cols-12 md:px-12">
          <Reveal className="md:col-span-7 md:row-span-2">
            <div
              role="img"
              aria-label="Emplacement image : espace d'exposition de la Galerie Leadouze"
              className="flex h-full min-h-64 items-center justify-center bg-line-strong p-4 text-center text-sm text-ink-soft md:aspect-auto"
            >
              [Image : salle d&apos;exposition]
            </div>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <div
              role="img"
              aria-label="Emplacement image : mezzanine de la Galerie Leadouze"
              className="flex aspect-[4/3] items-center justify-center bg-line-strong p-4 text-center text-sm text-ink-soft"
            >
              [Image : mezzanine]
            </div>
          </Reveal>
          <Reveal delay={0.16} className="md:col-span-5">
            <div
              role="img"
              aria-label="Emplacement image : vue d'accrochage"
              className="flex aspect-[4/3] items-center justify-center bg-line-strong p-4 text-center text-sm text-ink-soft"
            >
              [Image : vue d&apos;accrochage]
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="luxury-card grid grid-cols-1 gap-8 p-6 md:grid-cols-12 md:gap-12 md:p-12">
            <Reveal className="md:col-span-7">
              <div
                role="img"
                aria-label="Emplacement image : Burning Man, détail"
                className="flex aspect-[195/130] items-center justify-center bg-line-strong text-sm text-ink-soft"
              >
                [Image : Burning Man]
              </div>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col gap-4 md:col-span-5">
              <p className="eyebrow">Œuvre phare</p>
              <h2 className="font-serif-title text-[2.4375rem] italic md:text-[3.8125rem]">Burning Man</h2>
              <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-base">
                <dt className="text-ink-soft">Artiste</dt>
                <dd>Alain Pontecorvo</dd>
                <dt className="text-ink-soft">Technique</dt>
                <dd>Huile sur toile</dd>
                <dt className="text-ink-soft">Dimensions</dt>
                <dd>130 × 195 cm</dd>
                <dt className="text-ink-soft">Année</dt>
                <dd>[Année]</dd>
                <dt className="text-ink-soft">Statut</dt>
                <dd>Disponible à l&apos;acquisition</dd>
              </dl>
              <p className="max-w-prose text-ink-soft">
                [Courte notice sur l&apos;œuvre : sujet, place dans le parcours de l&apos;artiste, ce qui la rend centrale dans la rétrospective.]
              </p>
              <div>
                <a href="#contact" className="btn-perrotin">
                  Demander le dossier de l&apos;œuvre
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="oeuvres" className="bg-paper pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-4">Parcours</p>
              <SplitText as="h2" text="Œuvres présentées" className="font-serif-title text-[1.9375rem] md:text-[2.4375rem]" />
            </div>
            <a href="#contact" className="link-accent font-semibold">
              Recevoir la liste complète et les prix →
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <article className="luxury-card flex h-full flex-col gap-4 p-4">
                <div
                  role="img"
                  aria-label="Emplacement image d'œuvre"
                  className="flex aspect-[4/3] items-center justify-center bg-line-strong text-sm text-ink-soft"
                >
                  [Image]
                </div>
                <div>
                  <h3 className="font-serif-title text-[1.5625rem] italic">Burning Man</h3>
                  <p className="text-sm text-ink-soft">Huile sur toile · 130 × 195 cm · [année]</p>
                </div>
              </article>
            </Reveal>
            {placeholders.map((i) => (
              <Reveal key={i} delay={0.08 * ((i + 1) % 3)}>
                <article className="luxury-card flex h-full flex-col gap-4 p-4">
                  <div
                    role="img"
                    aria-label="Emplacement image d'œuvre"
                    className="flex aspect-[4/5] items-center justify-center bg-line-strong text-sm text-ink-soft"
                  >
                    [Image]
                  </div>
                  <div>
                    <h3 className="font-serif-title text-[1.5625rem] italic">[Titre de l’œuvre]</h3>
                    <p className="text-sm text-ink-soft">[Technique] · [dimensions] · [année]</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
