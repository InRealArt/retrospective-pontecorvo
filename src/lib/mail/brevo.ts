const ENDPOINT = 'https://api.brevo.com/v3/smtp/email'
const EMAIL = /^[^@\s<>]+@[^@\s<>]+\.[^@\s<>]+$/
const TIMEOUT_MS = 10_000

export function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export interface MailInput {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export interface MailOptions {
  apiKey: string
  /** Always comes from server config, never from user input. */
  sender: { email: string; name: string }
  fetchImpl?: typeof fetch
}

const hasLineBreak = (s: string) => /[\r\n]/.test(s)

const CONTACTS_ENDPOINT = 'https://api.brevo.com/v3/contacts'

export interface ContactOptions {
  apiKey: string
  listId: number
  fetchImpl?: typeof fetch
}

/** Form fields to Brevo contact attributes. Empty optional values are left out so they never overwrite existing ones. */
export function contactAttributes(data: Record<string, string>): Record<string, string | boolean> {
  const text: [string, string | undefined][] = [
    ['FIRSTNAME', data.prenom],
    ['LASTNAME', data.nom],
    ['TELEPHONE', data.telephone],
    ['DEMANDE', data.demande],
    ['MESSAGE', data.message],
  ]
  const attrs: Record<string, string | boolean> = {}
  for (const [key, value] of text) if (value?.trim()) attrs[key] = value.trim()
  attrs.CONSENTEMENT = data.consentement === 'on'
  return attrs
}

/** Creates or updates the visitor as a Brevo contact and adds them to the list. */
export async function upsertContact(data: Record<string, string>, o: ContactOptions): Promise<void> {
  const email = data.email ?? ''
  if (!EMAIL.test(email) || hasLineBreak(email)) throw new Error('invalid contact email')

  const res = await (o.fetchImpl ?? fetch)(CONTACTS_ENDPOINT, {
    method: 'POST',
    headers: { 'api-key': o.apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      email,
      attributes: contactAttributes(data),
      listIds: [o.listId],
      updateEnabled: true,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`brevo contact request failed with status ${res.status}`)
}

export async function sendMail(m: MailInput, o: MailOptions): Promise<void> {
  if (hasLineBreak(m.subject)) throw new Error('subject must be a single line')
  if (!EMAIL.test(m.to) || hasLineBreak(m.to)) throw new Error('invalid recipient')
  if (m.replyTo !== undefined && (!EMAIL.test(m.replyTo) || hasLineBreak(m.replyTo))) {
    throw new Error('invalid replyTo address')
  }

  const res = await (o.fetchImpl ?? fetch)(ENDPOINT, {
    method: 'POST',
    headers: { 'api-key': o.apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: o.sender,
      to: [{ email: m.to }],
      subject: m.subject,
      htmlContent: m.html,
      ...(m.replyTo ? { replyTo: { email: m.replyTo } } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`brevo request failed with status ${res.status}`)
}
