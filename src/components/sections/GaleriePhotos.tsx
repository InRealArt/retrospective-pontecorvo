import Image from 'next/image'
import { Reveal } from '@/components/motion/Reveal'
import { SplitText } from '@/components/motion/SplitText'

const artworks = [
  {
    title: 'Vue de la passerelle Vaugirard 3',
    details: 'Huile sur toile · 80 × 80 cm · [année]',
    src: '/images/vue-de-la-passerelle-vaugirard-3.webp',
    alt: 'Vue de la passerelle Vaugirard 3, huile sur toile, Alain Pontecorvo',
  },
  {
    title: 'Arc-en-ciel',
    details: 'Huile sur toile · 80 × 68 cm · [année]',
    src: '/images/arc-en-ciel.webp',
    alt: 'Arc-en-ciel, huile sur toile, Alain Pontecorvo',
  },
  {
    title: 'Le convoi serein',
    details: 'Huile sur toile · 80 × 80 cm · [année]',
    src: '/images/le-convoi-serein.webp',
    alt: 'Le convoi serein, huile sur toile, Alain Pontecorvo',
  },
  {
    title: 'Rue Brown-Séquard',
    details: 'Huile sur toile · 81 × 60 cm · [année]',
    src: '/images/rue-brown-sequard.webp',
    alt: 'Rue Brown-Séquard, huile sur toile, Alain Pontecorvo',
  },
]

const placeholders = [0]

export default function GaleriePhotos() {
  return (
    <>
      <section aria-label="Vues de l'exposition" className="bg-paper pb-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 md:grid-cols-12 md:px-12">
          <Reveal className="md:col-span-7 md:row-span-2">
            <div className="relative aspect-[5/3] h-full min-h-64 w-full bg-line-strong">
              <Image
                src="/images/exposition/Discussion_en_galerie_dart_moderne.webp"
                alt="Alexandre Leadouze s'adressant aux invités lors du vernissage"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <div className="relative aspect-[4/3] w-full bg-line-strong">
              <Image
                src="/images/exposition/Reception_cocktail_en_galerie_dart.webp"
                alt="Réception en galerie lors du vernissage de la rétrospective"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.16} className="md:col-span-5">
            <div className="relative aspect-[4/3] w-full bg-line-strong">
              <Image
                src="/images/exposition/Retrospective.webp"
                alt="Alain Pontecorvo assis devant ses toiles à la Galerie Leadouze"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-cover object-[50%_60%]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="luxury-card grid grid-cols-1 gap-8 p-6 md:grid-cols-12 md:gap-12 md:p-12">
            <Reveal className="md:col-span-7">
              <div className="relative aspect-[195/130] w-full bg-line-strong">
                <Image
                  src="/images/artworks/featured/pontecorvo_artwork.webp"
                  alt="Burning Man, huile sur toile, 130 × 195 cm, Alain Pontecorvo"
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                />
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
                <div className="relative aspect-[4/3] w-full bg-line-strong">
                  <Image
                    src="/images/artworks/featured/pontecorvo_artwork.webp"
                    alt="Burning Man, huile sur toile, 130 × 195 cm, Alain Pontecorvo"
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif-title text-[1.5625rem] italic">Burning Man</h3>
                  <p className="text-sm text-ink-soft">Huile sur toile · 130 × 195 cm · [année]</p>
                </div>
              </article>
            </Reveal>
            {artworks.map((a, i) => (
              <Reveal key={a.title} delay={0.08 * ((i + 1) % 3)}>
                <article className="luxury-card flex h-full flex-col gap-4 p-4">
                  <div className="relative aspect-[4/5] w-full bg-line-strong">
                    <Image src={a.src} alt={a.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-contain" />
                  </div>
                  <div>
                    <h3 className="font-serif-title text-[1.5625rem] italic">{a.title}</h3>
                    <p className="text-sm text-ink-soft">{a.details}</p>
                  </div>
                </article>
              </Reveal>
            ))}
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
