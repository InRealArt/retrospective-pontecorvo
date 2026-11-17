import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-paper text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-12 lg:items-center">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-7">
          <p className="eyebrow">Exposition · Rétrospective</p>
          <h1 className="font-serif-title text-[clamp(3rem,7vw,4.75rem)]">
            Alain
            <br />
            <em className="italic">Pontecorvo</em>
          </h1>
          <p className="font-display text-xl italic text-ink-soft">
            Une rétrospective à la Galerie Leadouze
          </p>
          <p className="max-w-[65ch] text-base leading-relaxed">
            Un parcours à travers l&apos;œuvre peinte d&apos;Alain Pontecorvo, réuni dans les espaces de la galerie, avenue Matignon. Toiles majeures, séries emblématiques et pièces rarement montrées : une occasion de voir l&apos;ensemble d&apos;un travail, et d&apos;en acquérir une part.
          </p>
          <dl className="rule grid gap-4 pt-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <dt className="eyebrow text-ink-soft">Dates</dt>
              <dd className="text-base">[Du JJ mois au JJ mois 2026]</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="eyebrow text-ink-soft">Lieu</dt>
              <dd className="text-base">16 avenue Matignon, Paris 8e</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="eyebrow text-ink-soft">Horaires</dt>
              <dd className="text-base">Lun. au sam., 10 h à 18 h</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn-perrotin">
              Prendre rendez-vous
            </a>
            <a href="#contact" className="btn-perrotin-outline">
              Recevoir le catalogue
            </a>
          </div>
        </div>
        <figure className="m-0 flex min-w-0 flex-col gap-3 lg:col-span-5">
          <div className="relative aspect-[195/130] w-full border border-line bg-paper-alt">
            <Image
              src="/images/artworks/featured/pontecorvo_artwork.webp"
              alt="Alain Pontecorvo, Burning Man, huile sur toile"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="text-sm text-ink-soft">
            <em className="font-display text-base">Burning Man</em>, huile sur toile, 130 × 195 cm
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
