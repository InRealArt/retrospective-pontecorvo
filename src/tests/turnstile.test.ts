import { describe, expect, it } from 'vitest'
import { verifyTurnstile } from '../lib/turnstile'

const base = {
  token: 'tok',
  ip: '1.2.3.4',
  secret: 'sekret',
  expectedAction: 'contact',
  expectedHostname: 'example.com',
}

const json = (body: unknown, status = 200) =>
  (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch

const good = { success: true, action: 'contact', hostname: 'example.com' }

describe('verifyTurnstile', () => {
  it('accepts a successful response with the expected action and hostname', async () => {
    expect(await verifyTurnstile({ ...base, fetchImpl: json(good) })).toEqual({ ok: true })
  })

  it('posts secret, response and remoteip to the siteverify endpoint', async () => {
    let seen: { url: string; body: string } | undefined
    const fetchImpl = (async (url: string, init: RequestInit) => {
      seen = { url, body: String(init.body) }
      return new Response(JSON.stringify(good))
    }) as unknown as typeof fetch
    await verifyTurnstile({ ...base, fetchImpl })
    expect(seen?.url).toBe('https://challenges.cloudflare.com/turnstile/v0/siteverify')
    const params = new URLSearchParams(seen?.body)
    expect(params.get('secret')).toBe('sekret')
    expect(params.get('response')).toBe('tok')
    expect(params.get('remoteip')).toBe('1.2.3.4')
  })

  it('refuses a different action', async () => {
    const r = await verifyTurnstile({ ...base, fetchImpl: json({ ...good, action: 'login' }) })
    expect(r).toEqual({ ok: false, reason: 'action-mismatch' })
  })

  it('refuses a missing action (fail closed)', async () => {
    const r = await verifyTurnstile({ ...base, fetchImpl: json({ success: true, hostname: 'example.com' }) })
    expect(r).toEqual({ ok: false, reason: 'action-mismatch' })
  })

  it('refuses a different hostname', async () => {
    const r = await verifyTurnstile({ ...base, fetchImpl: json({ ...good, hostname: 'evil.test' }) })
    expect(r).toEqual({ ok: false, reason: 'hostname-mismatch' })
  })

  it('refuses success:false', async () => {
    const r = await verifyTurnstile({ ...base, fetchImpl: json({ success: false, 'error-codes': ['invalid-input-response'] }) })
    expect(r).toEqual({ ok: false, reason: 'rejected' })
  })

  it('returns network when fetch rejects', async () => {
    const fetchImpl = (async () => {
      throw new Error('boom')
    }) as unknown as typeof fetch
    expect(await verifyTurnstile({ ...base, fetchImpl })).toEqual({ ok: false, reason: 'network' })
  })

  it('returns network when the request exceeds the timeout', async () => {
    const fetchImpl = ((_url: string, init: RequestInit) =>
      new Promise((_resolve, reject) => {
        init.signal?.addEventListener('abort', () => reject(new Error('aborted')))
      })) as unknown as typeof fetch
    expect(await verifyTurnstile({ ...base, fetchImpl, timeoutMs: 20 })).toEqual({ ok: false, reason: 'network' })
  })

  it('returns bad-response for a non-JSON body', async () => {
    const fetchImpl = (async () => new Response('<html>oops</html>')) as unknown as typeof fetch
    expect(await verifyTurnstile({ ...base, fetchImpl })).toEqual({ ok: false, reason: 'bad-response' })
  })

  it('returns bad-response for a 5xx even with a valid-looking body', async () => {
    expect(await verifyTurnstile({ ...base, fetchImpl: json(good, 503) })).toEqual({ ok: false, reason: 'bad-response' })
  })

  it('returns empty-token without calling the network', async () => {
    let called = false
    const fetchImpl = (async () => {
      called = true
      return new Response('{}')
    }) as unknown as typeof fetch
    expect(await verifyTurnstile({ ...base, token: '  ', fetchImpl })).toEqual({ ok: false, reason: 'empty-token' })
    expect(called).toBe(false)
  })
})
