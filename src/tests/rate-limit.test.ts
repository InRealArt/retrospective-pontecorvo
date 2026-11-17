import { describe, expect, it } from 'vitest'
import { clientIp, createRateLimiter } from '../lib/rate-limit'

describe('createRateLimiter', () => {
  it('allows max calls, refuses the next, and allows again after the window', () => {
    let t = 0
    const allow = createRateLimiter({ max: 2, windowMs: 1000, now: () => t })
    expect(allow('a')).toBe(true)
    expect(allow('a')).toBe(true)
    expect(allow('a')).toBe(false)
    expect(allow('b')).toBe(true)
    t = 1001
    expect(allow('a')).toBe(true)
  })

  it('keeps memory bounded: beyond maxKeys the oldest key is evicted, recent keys stay limited', () => {
    const allow = createRateLimiter({ max: 1, windowMs: 60_000, now: () => 0, maxKeys: 2 })
    expect(allow('a')).toBe(true)
    expect(allow('b')).toBe(true)
    expect(allow('c')).toBe(true) // evicts "a"
    expect(allow('c')).toBe(false) // still limited
    expect(allow('a')).toBe(true) // forgotten, which proves the map did not grow
  })
})

describe('clientIp', () => {
  it('returns "unknown" when the header is absent or empty', () => {
    expect(clientIp(new Headers())).toBe('unknown')
    expect(clientIp(new Headers({ 'x-forwarded-for': '  ' }))).toBe('unknown')
  })

  it('takes the last address of a forwarded list: the one appended by our own proxy, not the client-supplied first', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': '6.6.6.6, 1.2.3.4' }))).toBe('1.2.3.4')
  })

  it.each(['definitely not an ip', 'aa', 'dead', '1.1', '999.1.1.1', '1.2.3.4.5'])(
    'maps the non-address "%s" to "unknown" so arbitrary strings cannot mint new buckets',
    (value) => {
      expect(clientIp(new Headers({ 'x-forwarded-for': value }))).toBe('unknown')
    },
  )

  it('accepts an IPv6 address', () => {
    expect(clientIp(new Headers({ 'x-forwarded-for': '2001:db8::1' }))).toBe('2001:db8::1')
  })
})
