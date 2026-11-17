import Link from "next/link";

export default function Footer() {
  return (
    <footer className="on-dark bg-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-8 text-sm text-paper-soft md:px-12">
        <span>© 2026 InRealArt × Galerie Leadouze</span>
        <Link href="/mentions-legales" className="text-paper-soft transition-colors hover:text-accent-on-dark">
          Mentions légales
        </Link>
      </div>
    </footer>
  );
}
