import { escapeHtml, sendMail, type MailInput, type MailOptions } from '../mail/brevo'

export interface ComposeOptions {
  to: string
  /** Fixed text: the subject is never built from submitted data. */
  subject: string
  /** Name of the submitted field holding the visitor's address, used as replyTo. */
  replyToField?: string
  /** Field name to human label, shown in the mail instead of the technical name. */
  labels?: Record<string, string>
  /** Names of consent boxes: a ticked one is shown as "Oui". */
  checkboxes?: string[]
}

/** Builds the notification mail. Every submitted value and label is HTML-escaped before it reaches the body. */
export function composeMail(data: Record<string, string>, o: ComposeOptions): MailInput {
  const rows = Object.entries(data)
    .filter(([, value]) => value.trim() !== '')
    .map(([key, value]) => {
      const shown = o.checkboxes?.includes(key) ? 'Oui' : value
      return `<dt>${escapeHtml(o.labels?.[key] ?? key)}</dt><dd>${escapeHtml(shown).replace(/\r\n|\r|\n/g, '<br>')}</dd>`
    })
  const replyTo = o.replyToField ? data[o.replyToField] : undefined
  return {
    to: o.to,
    subject: o.subject,
    html: `<dl>${rows.join('')}</dl>`,
    ...(replyTo ? { replyTo } : {}),
  }
}

/** Ready-made `send` for handleForm: compose, escape, then post through Brevo. */
export function makeSender(o: ComposeOptions & MailOptions): (data: Record<string, string>) => Promise<void> {
  const { apiKey, sender, fetchImpl, ...compose } = o
  return (data) => sendMail(composeMail(data, compose), { apiKey, sender, fetchImpl })
}
