import { describe, expect, it } from 'vitest'
import { escapeHtml, sendMail } from '../lib/mail/brevo'

const opts = (fetchImpl: typeof fetch) => ({
  apiKey: 'xkeysib-test',
  sender: { email: 'site@example.com', name: 'Site' },
  fetchImpl,
})

const okFetch = () => {
  const calls: { url: string; init: RequestInit }[] = []
  const fetchImpl = (async (url: string, init: RequestInit) => {
    calls.push({ url, init })
    return new Response('{}', { status: 201 })
  }) as unknown as typeof fetch
  return { calls, fetchImpl }
}

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml(`<script>"&'`)).toBe('&lt;script&gt;&quot;&amp;&#39;')
  })
})

describe('sendMail', () => {
  it('posts to the Brevo v3 endpoint with the api-key header and expected body', async () => {
    const { calls, fetchImpl } = okFetch()
    await sendMail(
      { to: 'contact@example.com', subject: 'Hello', html: '<p>Hi</p>', replyTo: 'visitor@example.com' },
      opts(fetchImpl),
    )
    expect(calls[0].url).toBe('https://api.brevo.com/v3/smtp/email')
    expect((calls[0].init.headers as Record<string, string>)['api-key']).toBe('xkeysib-test')
    expect(JSON.parse(calls[0].init.body as string)).toEqual({
      sender: { email: 'site@example.com', name: 'Site' },
      to: [{ email: 'contact@example.com' }],
      subject: 'Hello',
      htmlContent: '<p>Hi</p>',
      replyTo: { email: 'visitor@example.com' },
    })
  })

  it('rejects CRLF in the subject (header injection)', async () => {
    const { fetchImpl, calls } = okFetch()
    await expect(
      sendMail({ to: 'contact@example.com', subject: 'Hi\r\nBcc: evil@x.y', html: 'x' }, opts(fetchImpl)),
    ).rejects.toThrow()
    expect(calls).toHaveLength(0)
  })

  it('rejects CRLF or a malformed address in replyTo', async () => {
    const { fetchImpl, calls } = okFetch()
    await expect(
      sendMail({ to: 'contact@example.com', subject: 'Hi', html: 'x', replyTo: 'a@b.co\r\nBcc: evil@x.y' }, opts(fetchImpl)),
    ).rejects.toThrow()
    await expect(
      sendMail({ to: 'contact@example.com', subject: 'Hi', html: 'x', replyTo: 'not-an-email' }, opts(fetchImpl)),
    ).rejects.toThrow()
    expect(calls).toHaveLength(0)
  })

  it('throws on a non-2xx response without leaking the api key', async () => {
    const fetchImpl = (async () => new Response('nope', { status: 401 })) as unknown as typeof fetch
    const err = await sendMail({ to: 'c@example.com', subject: 'Hi', html: 'x' }, opts(fetchImpl)).catch((e) => e)
    expect(err).toBeInstanceOf(Error)
    expect(String(err.message)).toContain('401')
    expect(String(err.message)).not.toContain('xkeysib-test')
  })
})
