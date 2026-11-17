const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const DEFAULT_TIMEOUT_MS = 5_000

export interface VerifyArgs {
  token: string
  ip: string
  secret: string
  expectedAction: string
  expectedHostname: string
  fetchImpl?: typeof fetch
  timeoutMs?: number
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: 'empty-token' | 'network' | 'bad-response' | 'rejected' | 'action-mismatch' | 'hostname-mismatch' }

/** Server-side Turnstile check. Fails closed and never throws. */
export async function verifyTurnstile(a: VerifyArgs): Promise<VerifyResult> {
  if (!a.token.trim()) return { ok: false, reason: 'empty-token' }

  const body = new URLSearchParams({ secret: a.secret, response: a.token })
  if (a.ip && a.ip !== 'unknown') body.set('remoteip', a.ip)

  let res: Response
  try {
    res = await (a.fetchImpl ?? fetch)(VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(a.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    })
  } catch {
    return { ok: false, reason: 'network' }
  }

  if (!res.ok) return { ok: false, reason: 'bad-response' }

  let data: { success?: unknown; action?: unknown; hostname?: unknown }
  try {
    data = await res.json()
  } catch {
    return { ok: false, reason: 'bad-response' }
  }
  if (typeof data !== 'object' || data === null) return { ok: false, reason: 'bad-response' }

  if (data.success !== true) return { ok: false, reason: 'rejected' }
  if (data.action !== a.expectedAction) return { ok: false, reason: 'action-mismatch' }
  // Several hostnames can be allowed, separated by commas (production domain, www, preview).
  const allowed = a.expectedHostname.split(',').map((h) => h.trim()).filter(Boolean)
  if (typeof data.hostname !== 'string' || !allowed.includes(data.hostname)) return { ok: false, reason: 'hostname-mismatch' }
  return { ok: true }
}
