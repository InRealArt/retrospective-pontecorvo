import { SecureForm } from "@/components/forms/SecureForm";
import { submitContact } from "@/app/actions/contact";

const fieldClass =
  "min-h-12 border border-line-strong bg-surface px-3.5 text-ink focus:border-accent";
const labelClass = "flex flex-col gap-1.5 text-sm text-ink-soft";

export default function Contact() {
  return (
    <section id="contact" className="bg-paper-alt">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-12 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="flex min-w-0 flex-col gap-5 lg:col-span-5">
          <p className="eyebrow">Contact</p>
          <h2 className="font-serif-title text-3xl md:text-4xl lg:text-5xl">
            Visite privée, catalogue ou renseignement
          </h2>
          <p className="m-0 text-lg text-ink-soft">
            Laissez-nous vos coordonnées : la galerie revient vers vous pour organiser votre visite ou vous adresser le catalogue de la rétrospective.
          </p>
        </div>
        <SecureForm
          action={submitContact}
          turnstileAction="contact"
          className="relative grid min-w-0 gap-5 border border-line bg-surface p-6 sm:grid-cols-2 md:p-8 lg:col-span-7"
          statusClassName="text-sm text-ink-soft sm:col-span-2"
        >
          <label className={labelClass}>
            Prénom
            <input type="text" name="prenom" required maxLength={80} className={fieldClass} />
          </label>
          <label className={labelClass}>
            Nom
            <input type="text" name="nom" required maxLength={80} className={fieldClass} />
          </label>
          <label className={labelClass}>
            E-mail
            <input type="email" name="email" required className={fieldClass} />
          </label>
          <label className={labelClass}>
            Téléphone
            <input type="tel" name="telephone" className={fieldClass} />
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Votre demande
            <select name="demande" required className={fieldClass}>
              <option>Organiser une visite privée</option>
              <option>Recevoir le catalogue de l&apos;exposition</option>
              <option>Information sur une œuvre</option>
              <option>Autre demande</option>
            </select>
          </label>
          <label className={`${labelClass} sm:col-span-2`}>
            Message (facultatif)
            <textarea
              name="message"
              rows={4}
              maxLength={2000}
              className="border border-line-strong bg-surface px-3.5 py-3 text-ink focus:border-accent"
            />
          </label>
          <label className="flex items-start gap-3 text-sm text-ink-soft sm:col-span-2">
            <input type="checkbox" name="consentement" required className="mt-1 size-4 accent-accent" />
            J&apos;accepte que mes données soient utilisées pour répondre à ma demande.
          </label>
          <p className="m-0 text-sm text-ink-soft sm:col-span-2">
            Vos données sont utilisées uniquement pour répondre à votre demande.{" "}
            <a className="link-accent" href="/mentions-legales">
              Mentions légales
            </a>
          </p>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-perrotin">
              Envoyer ma demande
            </button>
          </div>
        </SecureForm>
      </div>
    </section>
  );
}
