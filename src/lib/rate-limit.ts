import { isIP } from 'node:net'

const DEFAULT_MAX_KEYS = 10_000

/** Sliding-window limiter, in memory, with a hard cap on tracked keys. Returns a function: true = allowed. */
export function createRateLimiter(o: {
  max: number
  windowMs: number
  now?: () => number
  maxKeys?: number
}): (key: string) => boolean {
  const now = o.now ?? Date.now
  const maxKeys = o.maxKeys ?? DEFAULT_MAX_KEYS
  const hits = new Map<string, number[]>()

  const remember = (key: string, list: number[], t: number) => {
    hits.delete(key) // re-insert so Map order tracks recency
    hits.set(key, list)
    if (hits.size <= maxKeys) return
    for (const [k, times] of hits) if (times.every((x) => t - x >= o.windowMs)) hits.delete(k)
    // Still too many live keys: forget the least recently seen ones.
    for (const k of hits.keys()) {
      if (hits.size <= maxKeys) break
      hits.delete(k)
    }
  }

  return (key) => {
    const t = now()
    const recent = (hits.get(key) ?? []).filter((x) => t - x < o.windowMs)
    if (recent.length >= o.max) {
      remember(key, recent, t)
      return false
    }
    recent.push(t)
    remember(key, recent, t)
    return true
  }
}

/**
 * Address appended by the closest proxy (last x-forwarded-for entry); the first entries are
 * client-supplied and can be forged. "unknown" when absent or not a valid IPv4/IPv6 address.
 * This assumes one trusted proxy in front of the app (Vercel, Cloudflare, a reverse proxy).
 */
export function clientIp(headers: Headers): string {
  const last = headers.get('x-forwarded-for')?.split(',').at(-1)?.trim() ?? ''
  return isIP(last) ? last : 'unknown'
}
