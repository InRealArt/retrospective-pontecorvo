import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function MentionsLegales() {
  return (
    <>
      <main className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-24 md:px-12">
          <h1 className="font-display text-4xl text-ink md:text-5xl">Mentions légales</h1>
          <p className="mt-4 text-ink-soft">Dernière mise à jour : 17 novembre 2026</p>
          <h2 className="font-display mt-12 text-3xl text-ink">Éditeur du site</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-soft">
            <li>Société : InRealArt — Société en cours de formation</li>
            <li>Immatriculation : Société en cours d&apos;immatriculation au Registre du commerce et des sociétés</li>
            <li>Siège social : 6 rue du Château d&apos;Eau, 37260 Artannes-sur-Indre, France</li>
            <li>Représentant : Timothée Roy, représentant de la société en formation</li>
            <li>Directeur de la publication : Timothée Roy</li>
            <li>Contact : teaminrealart@gmail.com</li>
          </ul>
          <p className="mt-4 text-ink-soft">La société étant en cours de formation, sa forme juridique, son numéro d&apos;immatriculation et son capital social seront précisés dès son immatriculation.</p>
          <h2 className="font-display mt-12 text-3xl text-ink">Lieu de l&apos;exposition</h2>
          <p className="mt-4 text-ink-soft">La rétrospective Alain Pontecorvo se tient à la Galerie Leadouze, 16 avenue Matignon, 75008 Paris, en partenariat avec InRealArt.</p>
          <h2 className="font-display mt-12 text-3xl text-ink">Hébergement</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-soft">
            <li>Hébergeur : Vercel Inc.</li>
            <li>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
            <li>Site web : https://vercel.com</li>
            <li>Nom de domaine et DNS : OVH SAS — 2 rue Kellermann, 59100 Roubaix, France — https://www.ovhcloud.com</li>
          </ul>
          <h2 className="font-display mt-12 text-3xl text-ink">Propriété intellectuelle</h2>
          <p className="mt-4 text-ink-soft">L&apos;ensemble des contenus présents sur ce site (textes, photographies, reproductions d&apos;œuvres, logos, éléments graphiques) est protégé par le droit d&apos;auteur et le droit de la propriété intellectuelle. Les œuvres reproduites restent la propriété de leurs auteurs ou ayants droit.</p>
          <p className="mt-4 text-ink-soft">Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.</p>
          <h2 className="font-display mt-12 text-3xl text-ink">Responsabilité</h2>
          <p className="mt-4 text-ink-soft">InRealArt s&apos;efforce de fournir des informations exactes et à jour, mais ne peut garantir l&apos;absence d&apos;erreurs ou d&apos;omissions. Les horaires et les informations pratiques de l&apos;exposition peuvent être modifiés sans préavis. L&apos;accès au site peut être interrompu pour des raisons de maintenance ou techniques, sans que cela ouvre droit à indemnité.</p>
          <p className="mt-4 text-ink-soft">Le site peut contenir des liens vers des sites tiers dont InRealArt ne contrôle pas le contenu et n&apos;assume aucune responsabilité.</p>
          <h2 className="font-display mt-12 text-3xl text-ink">Données personnelles</h2>
          <p className="mt-4 text-ink-soft">Responsable du traitement : InRealArt, 6 rue du Château d&apos;Eau, 37260 Artannes-sur-Indre, France.</p>
          <p className="mt-4 text-ink-soft">Données collectées : via le formulaire de contact, vos prénom et nom, votre adresse e-mail, votre numéro de téléphone si vous le renseignez, l&apos;objet de votre demande et, si vous le renseignez, votre message.</p>
          <p className="mt-4 text-ink-soft">Finalités et base légale : répondre à votre demande (visite privée, catalogue de l&apos;exposition, information sur une œuvre ou autre demande), sur la base de votre consentement, recueilli par la case à cocher du formulaire, et de l&apos;exécution de mesures précontractuelles prises à votre demande.</p>
          <p className="mt-4 text-ink-soft">Destinataires : les équipes d&apos;InRealArt et de la Galerie Leadouze, ainsi que les prestataires techniques suivants, qui agissent en qualité de sous-traitants :</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-soft">
            <li>Brevo (Sendinblue SAS) — envoi des e-mails (Paris, France).</li>
            <li>Cloudflare, Inc. — protection anti-robot du formulaire (Turnstile) (États-Unis).</li>
            <li>Vercel Inc. — hébergement et diffusion du site (États-Unis).</li>
          </ul>
          <p className="mt-4 text-ink-soft">Certains de ces prestataires sont situés hors de l&apos;Union européenne. Les transferts de données reposent sur les garanties prévues par le RGPD (décision d&apos;adéquation ou clauses contractuelles types).</p>
          <p className="mt-4 text-ink-soft">Durée de conservation : vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis au maximum trois ans à compter de notre dernier contact, sauf demande de suppression de votre part.</p>
          <p className="mt-4 text-ink-soft">Vos droits : conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition, de limitation et de portabilité de vos données, ainsi que du droit de retirer votre consentement à tout moment. Pour les exercer, écrivez à teaminrealart@gmail.com. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>
          <h2 className="font-display mt-12 text-3xl text-ink">Cookies et services tiers</h2>
          <p className="mt-4 text-ink-soft">Ce site n&apos;utilise pas de cookies publicitaires ni d&apos;outil de mesure d&apos;audience. Le formulaire est protégé contre les envois automatisés par Cloudflare Turnstile ; ce service peut déposer des cookies ou traceurs techniques nécessaires à son fonctionnement.</p>
          <h2 className="font-display mt-12 text-3xl text-ink">Droit applicable</h2>
          <p className="mt-4 text-ink-soft">Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français sont seuls compétents.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
