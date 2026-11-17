import { z } from 'zod'

// A NEXT_PUBLIC_ variable is shipped to every browser: never let a secret-looking one through.
// NEXT_PUBLIC_TURNSTILE_SITE_KEY is legitimately public, so only secret-style names are refused.
const SECRET_LOOKING = /SECRET|PRIVATE|PASSWORD|TOKEN|API_KEY/

const serverEnvSchema = z.object({
  TURNSTILE_SECRET_KEY: z.string().min(1),
  BREVO_API_KEY: z.string().min(1),
  BREVO_SENDER_EMAIL: z.email(),
  BREVO_SENDER_NAME: z.string().min(1).default('Site'),
  CONTACT_TO: z.email(),
  /** Brevo list that receives each visitor as a contact; unset means no contact is created. */
  BREVO_CONTACTS_LIST_ID: z.coerce.number().int().positive().optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  /** Hostname Turnstile must report; set to "localhost" in development. */
  SITE_HOSTNAME: z.string().min(1).optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

export function parseServerEnv(raw: Record<string, string | undefined>): ServerEnv {
  const leaked = Object.keys(raw).filter((k) => k.startsWith('NEXT_PUBLIC_') && SECRET_LOOKING.test(k))
  if (leaked.length) throw new Error(`secret-looking public variable(s): ${leaked.join(', ')}`)
  return serverEnvSchema.parse(raw)
}
