import type { z } from 'zod'
import { clientIp } from '../rate-limit'
import { verifyTurnstile } from '../turnstile'
import { HONEYPOT_FIELD, TURNSTILE_FIELD } from './schema'

export type FormResult = { ok: true } | { ok: false; error: 'invalid' | 'captcha' | 'rate' | 'mail' }

export interface HandleFormArgs {
  formData: FormData
  headers: Headers
  schema: z.ZodType
  turnstile: { action: string; hostname: string; secret: string }
  limiter: (key: string) => boolean
  send: (data: Record<string, string>) => Promise<void>
  verify?: typeof verifyTurnstile
}

/** Order matters: rate limit, honeypot, validation, Turnstile, then send. */
export async function handleForm(a: HandleFormArgs): Promise<FormResult> {
  const ip = clientIp(a.headers)
  if (!a.limiter(ip)) return { ok: false, error: 'rate' }

  const raw: Record<string, string> = {}
  for (const [key, value] of a.formData.entries()) {
    // React adds hidden $ACTION_* fields to a Server Action form (progressive enhancement). They are not user input.
    if (key.startsWith('$ACTION_')) continue
    if (typeof value !== 'string') return { ok: false, error: 'invalid' }
    raw[key] = value
  }

  // Bots fill the hidden field: answer as if it worked, do nothing.
  if ((raw[HONEYPOT_FIELD] ?? '').trim() !== '') return { ok: true }

  const parsed = a.schema.safeParse(raw)
  if (!parsed.success) return { ok: false, error: 'invalid' }
  const { [TURNSTILE_FIELD]: token, ...submitted } = parsed.data as Record<string, string>
  const data = Object.fromEntries(Object.entries(submitted).filter(([key]) => key !== HONEYPOT_FIELD))

  const check = await (a.verify ?? verifyTurnstile)({
    token,
    ip,
    secret: a.turnstile.secret,
    expectedAction: a.turnstile.action,
    expectedHostname: a.turnstile.hostname,
  })
  if (!check.ok) return { ok: false, error: 'captcha' }

  try {
    await a.send(data)
  } catch {
    return { ok: false, error: 'mail' }
  }
  return { ok: true }
}
