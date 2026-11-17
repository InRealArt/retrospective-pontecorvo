const items = [
  {
    q: "En quoi consiste la rétrospective consacrée à Alain Pontecorvo ?",
    a: "La rétrospective réunit 19 œuvres d’Alain Pontecorvo à la Galerie Leadouze, du 13 novembre au 12 décembre 2026. Présentée sur les deux niveaux de la galerie, salle d’exposition et mezzanine, elle donne à voir les grands formats, dont Burning Man (huile sur toile, 130 × 195 cm), comme les œuvres plus intimes. Un vernissage privé, avec rencontre autour de l’art et du collectionnisme, ouvre l’exposition le 12 novembre 2026. Les œuvres présentées sont disponibles à l’acquisition.",
  },
  {
    q: "Quels sont les horaires d’ouverture ?",
    a: "L’exposition est visible aux horaires de la galerie : du lundi au samedi, de 10 h à 18 h. La galerie est fermée le dimanche.",
  },
  {
    q: "Où se situe la Galerie Leadouze ?",
    a: "Au 16 avenue Matignon, dans le 8e arrondissement de Paris, à deux pas des Champs-Élysées. Métro Franklin D. Roosevelt (lignes 1 et 9) ou Miromesnil (lignes 9 et 13).",
  },
  {
    q: "Les œuvres exposées sont-elles à vendre ?",
    a: "Oui, les œuvres de la rétrospective sont disponibles à l’acquisition. Contactez la galerie pour recevoir la liste des œuvres et leurs conditions.",
  },
  {
    q: "Comment recevoir le catalogue de l’exposition ?",
    a: "Utilisez le formulaire de contact en choisissant « Recevoir le catalogue de l’exposition » : la galerie vous l’adressera.",
  },
  {
    q: "Une entreprise peut-elle bénéficier d’un avantage fiscal en acquérant une œuvre ?",
    a: "[Réponse à valider avec la galerie ou un conseil fiscal : régime de déduction pour l’achat d’œuvres originales d’artistes vivants par les entreprises, et ses conditions.]",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-paper">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-12 lg:py-32">
        <p className="eyebrow mb-4">FAQ</p>
        <h2 className="mb-10 font-serif-title text-3xl md:text-4xl lg:text-5xl">Questions fréquentes</h2>
        <div className="border-b border-line">
          {items.map((it, i) => (
            <details key={it.q} name="faq" open={i === 0} className="group border-t border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif-title text-xl [&::-webkit-details-marker]:hidden">
                {it.q}
                <span
                  aria-hidden="true"
                  className="relative size-4 flex-none before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:bg-accent after:absolute after:left-1/2 after:top-0 after:h-full after:w-px after:bg-accent group-open:after:hidden"
                />
              </summary>
              <p className="pb-6 text-ink-soft">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
