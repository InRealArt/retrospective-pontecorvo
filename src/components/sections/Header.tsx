export default function Header() {
  return (
    <header className="z-50 border-b border-line bg-paper md:sticky md:top-0">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-12">
        <div className="font-display flex items-baseline gap-2 text-xl">
          <span>Galerie Leadouze</span>
          <span className="text-ink-soft">×</span>
          <span className="text-ink-soft">InRealArt</span>
        </div>
        <nav
          aria-label="Navigation principale"
          className="flex flex-wrap items-center gap-6 text-sm"
        >
          <a href="#exposition" className="inline-flex min-h-11 items-center text-ink hover:text-accent">L&apos;exposition</a>
          <a href="#oeuvres" className="inline-flex min-h-11 items-center text-ink hover:text-accent">Œuvres</a>
          <a href="#artiste" className="inline-flex min-h-11 items-center text-ink hover:text-accent">L&apos;artiste</a>
          <a href="#visite" className="inline-flex min-h-11 items-center text-ink hover:text-accent">Visite</a>
          <a href="#faq" className="inline-flex min-h-11 items-center text-ink hover:text-accent">FAQ</a>
          <a href="#contact" className="btn-perrotin">Préparer ma visite</a>
        </nav>
      </div>
    </header>
  );
}
