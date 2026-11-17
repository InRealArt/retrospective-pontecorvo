import { Reveal } from "@/components/motion/Reveal";

export default function Visite() {
  return (
    <section id="visite" className="bg-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-12 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <Reveal className="flex min-w-0 flex-col gap-8 lg:col-span-5">
          <div>
            <p className="eyebrow mb-4">Informations pratiques</p>
            <h2 className="font-serif-title text-3xl md:text-4xl lg:text-5xl">Visiter l&apos;exposition</h2>
          </div>
          <dl className="m-0 flex flex-col gap-6">
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">Adresse</dt>
              <dd className="m-0 mt-2 text-lg text-ink">
                Galerie Leadouze
                <br />
                16 avenue Matignon, 75008 Paris
              </dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">Dates</dt>
              <dd className="m-0 mt-2 text-lg text-ink">[Du JJ mois au JJ mois 2026]</dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">Horaires</dt>
              <dd className="m-0 mt-2 text-lg text-ink">
                Du lundi au samedi, de 10 h à 18 h
                <br />
                Fermé le dimanche
              </dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">Accès</dt>
              <dd className="m-0 mt-2 text-lg text-ink">
                Métro Franklin D. Roosevelt (lignes 1 et 9) ou Miromesnil (lignes 9 et 13)
              </dd>
            </div>
            <div className="border-t border-line pt-4">
              <dt className="eyebrow">Contact</dt>
              <dd className="m-0 mt-2 text-lg text-ink">
                +33 (0)6 45 97 65 58
                <br />
                <a className="link-accent" href="mailto:galerieleadouze@gmail.com">
                  galerieleadouze@gmail.com
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
        <Reveal
          delay={0.06}
          className="flex min-h-96 min-w-0 items-center justify-center border border-line bg-paper-alt text-sm text-ink-soft lg:col-span-7"
        >
          <div role="img" aria-label="Emplacement carte : Galerie Leadouze, 16 avenue Matignon" className="flex h-full w-full items-center justify-center">
            [Carte : 16 avenue Matignon]
          </div>
        </Reveal>
      </div>
    </section>
  );
}
