import { describe, expect, it } from 'vitest'
import { handleForm } from '../lib/forms/action'
import { buildFormSchema } from '../lib/forms/schema'

const schema = buildFormSchema([
  { name: 'name', type: 'text', required: true, max: 120 },
  { name: 'email', type: 'email', required: true, max: 254 },
  { name: 'message', type: 'textarea', required: true, min: 10, max: 4000 },
])

const goodFields = {
  name: 'Ada',
  email: 'ada@example.com',
  message: 'Hello, this is a message.',
  'cf-turnstile-response': 'tok',
}

const form = (fields: Record<string, string>) => {
  const fd = new FormData()
  for (const [k, v] of Object.entries(fields)) fd.set(k, v)
  return fd
}

function setup(over: { allow?: boolean; verifyOk?: boolean; sendThrows?: boolean } = {}) {
  const calls: string[] = []
  const keys: string[] = []
  const sent: Record<string, string>[] = []
  const deps = {
    schema,
    turnstile: { action: 'contact', hostname: 'example.com', secret: 's' },
    limiter: (k: string) => {
      calls.push('limiter')
      keys.push(k)
      return over.allow ?? true
    },
    verify: async () => {
      calls.push('verify')
      return over.verifyOk === false ? ({ ok: false, reason: 'rejected' } as const) : ({ ok: true } as const)
    },
    send: async (data: Record<string, string>) => {
      calls.push('send')
      if (over.sendThrows) throw new Error('smtp down')
      sent.push(data)
    },
  }
  return { calls, keys, sent, deps }
}

const run = (s: ReturnType<typeof setup>, fields: Record<string, string>, headers = new Headers()) =>
  handleForm({ ...s.deps, formData: form(fields), headers })

describe('buildFormSchema', () => {
  it('rejects an unknown field', () => {
    expect(schema.safeParse({ ...goodFields, admin: 'yes' }).success).toBe(false)
  })

  it('rejects line breaks in single-line fields (header injection)', () => {
    expect(schema.safeParse({ ...goodFields, name: 'Ada\r\nBcc: x@y.z' }).success).toBe(false)
  })

  it('rejects values above max', () => {
    expect(schema.safeParse({ ...goodFields, message: 'x'.repeat(100_000) }).success).toBe(false)
  })
})

describe('handleForm', () => {
  it('sends validated data without the turnstile token or honeypot', async () => {
    const s = setup()
    expect(await run(s, goodFields)).toEqual({ ok: true })
    expect(s.sent[0]).toEqual({ name: 'Ada', email: 'ada@example.com', message: 'Hello, this is a message.' })
  })

  it('runs limiter, then validation, then turnstile, then send', async () => {
    const s = setup()
    await run(s, goodFields)
    expect(s.calls).toEqual(['limiter', 'verify', 'send'])
  })

  it('fills the honeypot silently: ok but nothing verified or sent', async () => {
    const s = setup()
    expect(await run(s, { ...goodFields, website: 'http://spam.test' })).toEqual({ ok: true })
    expect(s.calls).toEqual(['limiter'])
  })

  it('returns invalid for an unknown field, before turnstile', async () => {
    const s = setup()
    expect(await run(s, { ...goodFields, admin: 'yes' })).toEqual({ ok: false, error: 'invalid' })
    expect(s.calls).toEqual(['limiter'])
  })

  it('returns invalid for a huge message', async () => {
    const s = setup()
    expect(await run(s, { ...goodFields, message: 'x'.repeat(100_000) })).toEqual({ ok: false, error: 'invalid' })
  })

  it('returns invalid when a file is posted instead of text', async () => {
    const s = setup()
    const fd = form(goodFields)
    fd.set('message', new File(['x'], 'a.txt'))
    expect(await handleForm({ ...s.deps, formData: fd, headers: new Headers() })).toEqual({ ok: false, error: 'invalid' })
  })

  it('returns captcha and never sends when turnstile refuses', async () => {
    const s = setup({ verifyOk: false })
    expect(await run(s, goodFields)).toEqual({ ok: false, error: 'captcha' })
    expect(s.calls).not.toContain('send')
  })

  it('returns rate when the limiter is exhausted, before anything else', async () => {
    const s = setup({ allow: false })
    expect(await run(s, goodFields)).toEqual({ ok: false, error: 'rate' })
    expect(s.calls).toEqual(['limiter'])
  })

  it('returns mail when sending throws', async () => {
    const s = setup({ sendThrows: true })
    expect(await run(s, goodFields)).toEqual({ ok: false, error: 'mail' })
  })

  it('uses the "unknown" bucket when no forwarded address exists, and the first address otherwise', async () => {
    const s = setup()
    await run(s, goodFields)
    await run(s, goodFields, new Headers({ 'x-forwarded-for': '9.9.9.9, 1.1.1.1' }))
    expect(s.keys).toEqual(['unknown', '1.1.1.1'])
  })
})
