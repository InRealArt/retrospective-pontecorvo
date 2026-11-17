'use server'

import { headers } from 'next/headers'
import { parseServerEnv } from '@/lib/env'
import { handleForm } from '@/lib/forms/action'
import { buildFormSchema, type FieldDef } from '@/lib/forms/schema'
import type { FormState } from '@/lib/forms/state'
import { upsertContact } from '@/lib/mail/brevo'
import { createRateLimiter } from '@/lib/rate-limit'

const fields: FieldDef[] = [
  {"name":"prenom","type":"text","required":true,"max":80,"label":"Prénom"},
  {"name":"nom","type":"text","required":true,"max":80,"label":"Nom"},
  {"name":"email","type":"email","required":true,"max":254,"label":"E-mail"},
  {"name":"telephone","type":"tel","required":false,"max":30,"label":"Téléphone"},
  {"name":"demande","type":"select","required":true,"max":37,"options":["Organiser une visite privée","Recevoir le catalogue de l'exposition","Information sur une œuvre","Autre demande"],"label":"Votre demande"},
  {"name":"message","type":"textarea","required":false,"max":2000,"label":"Message (facultatif)"},
  {"name":"consentement","type":"consent","required":true,"max":3,"label":"J'accepte que mes données soient utilisées pour répondre à ma demande."},
]

const schema = buildFormSchema(fields)
const limiter = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 })

export async function submitContact(_previous: FormState, formData: FormData): Promise<FormState> {
  let env: ReturnType<typeof parseServerEnv>
  try {
    env = parseServerEnv(process.env)
  } catch (error) {
    // A missing or malformed setting is ours to fix: log it for the operator and tell the visitor the send failed.
    console.error('form configuration error', error)
    return { status: 'error', error: 'mail' }
  }
  const listId = env.BREVO_CONTACTS_LIST_ID
  const result = await handleForm({
    formData,
    headers: await headers(),
    schema,
    turnstile: {
      action: "contact",
      hostname: env.SITE_HOSTNAME ?? "retrospective-pontecorvo.galerie-leadouze.inrealart.com",
      secret: env.TURNSTILE_SECRET_KEY,
    },
    limiter,
    // The request is the Brevo contact itself: no mail is sent, so a failed sync is a failed request.
    send: (data) => upsertContact(data, { apiKey: env.BREVO_API_KEY, listId }),
  })
  return result.ok ? { status: 'success' } : { status: 'error', error: result.error }
}
