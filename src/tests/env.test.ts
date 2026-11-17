import { describe, expect, it } from 'vitest'
import { parseServerEnv } from '../lib/env'

const ok = {
  TURNSTILE_SECRET_KEY: 'secret',
  BREVO_API_KEY: 'xkeysib-test',
  BREVO_CONTACTS_LIST_ID: '7',
}

describe('parseServerEnv', () => {
  it('accepts a complete environment', () => {
    expect(parseServerEnv(ok).BREVO_CONTACTS_LIST_ID).toBe(7)
  })

  it.each(['TURNSTILE_SECRET_KEY', 'BREVO_API_KEY', 'BREVO_CONTACTS_LIST_ID'])(
    'throws when %s is missing',
    (key) => {
      const rest: Record<string, string | undefined> = { ...ok }
      delete rest[key]
      expect(() => parseServerEnv(rest)).toThrow()
    },
  )

  it('refuses a secret-looking NEXT_PUBLIC variable', () => {
    expect(() => parseServerEnv({ ...ok, NEXT_PUBLIC_API_KEY: 'leak' })).toThrow()
    expect(() => parseServerEnv({ ...ok, NEXT_PUBLIC_BREVO_SECRET: 'leak' })).toThrow()
  })

  it('allows the public Turnstile site key', () => {
    expect(() => parseServerEnv({ ...ok, NEXT_PUBLIC_TURNSTILE_SITE_KEY: '0x4AAA' })).not.toThrow()
  })
})
