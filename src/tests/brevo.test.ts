import { describe, expect, it } from 'vitest'
import { escapeHtml, sendMail, upsertContact, contactAttributes } from '../lib/mail/brevo'

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

const submitted = {
  prenom: 'Ada',
  nom: 'Lovelace',
  email: 'ada@example.com',
  telephone: '06 01 02 03 04',
  demande: 'Organiser une visite privée',
  message: 'Bonjour',
  consentement: 'on',
}

describe('contactAttributes', () => {
  it('maps the form fields to Brevo attributes and the consent to a boolean', () => {
    expect(contactAttributes(submitted)).toEqual({
      FIRSTNAME: 'Ada',
      LASTNAME: 'Lovelace',
      TELEPHONE: '06 01 02 03 04',
      DEMANDE: 'Organiser une visite privée',
      MESSAGE: 'Bonjour',
      CONSENTEMENT: true,
    })
  })

  it('omits empty optional fields', () => {
    const attrs = contactAttributes({ ...submitted, telephone: '', message: '' })
    expect(attrs).not.toHaveProperty('TELEPHONE')
    expect(attrs).not.toHaveProperty('MESSAGE')
  })
})

describe('upsertContact', () => {
  it('posts to /contacts with the list, attributes and updateEnabled', async () => {
    const { calls, fetchImpl } = okFetch()
    await upsertContact(submitted, { apiKey: 'xkeysib-test', listId: 84, fetchImpl })
    expect(calls[0].url).toBe('https://api.brevo.com/v3/contacts')
    expect(calls[0].init.method).toBe('POST')
    expect((calls[0].init.headers as Record<string, string>)['api-key']).toBe('xkeysib-test')
    expect(JSON.parse(calls[0].init.body as string)).toEqual({
      email: 'ada@example.com',
      listIds: [84],
      updateEnabled: true,
      attributes: contactAttributes(submitted),
    })
  })

  it('rejects a malformed or multi-line email without calling Brevo', async () => {
    const { calls, fetchImpl } = okFetch()
    await expect(
      upsertContact({ ...submitted, email: 'a@b.co\r\nX: y' }, { apiKey: 'k', listId: 84, fetchImpl }),
    ).rejects.toThrow()
    expect(calls).toHaveLength(0)
  })

  it('throws on a non-2xx response without leaking the api key', async () => {
    const fetchImpl = (async () => new Response('no', { status: 403 })) as unknown as typeof fetch
    const err = await upsertContact(submitted, { apiKey: 'xkeysib-test', listId: 84, fetchImpl }).catch((e) => e)
    expect(String(err.message)).toContain('403')
    expect(String(err.message)).not.toContain('xkeysib-test')
  })
})
