import { describe, expect, it } from 'vitest'
import { composeMail, makeSender } from '../lib/forms/mail'

const opts = { to: 'contact@example.com', subject: 'New message from the site', replyToField: 'email' }

describe('composeMail', () => {
  it('escapes HTML in every submitted value and in labels', () => {
    const m = composeMail({ name: '<b>Ada</b>', message: '<script>alert(1)</script>', email: 'ada@example.com' }, opts)
    expect(m.html).not.toContain('<script>')
    expect(m.html).not.toContain('<b>')
    expect(m.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;')
  })

  it('turns line breaks of free text into <br> after escaping', () => {
    const m = composeMail({ message: 'line one\nline <two>' }, opts)
    expect(m.html).toContain('line one<br>line &lt;two&gt;')
  })

  it('never derives the subject from user data', () => {
    const m = composeMail({ name: 'Ada\r\nBcc: evil@x.y', subject: 'hijack' }, opts)
    expect(m.subject).toBe('New message from the site')
  })

  it('uses the configured field as replyTo and omits it when absent', () => {
    expect(composeMail({ email: 'ada@example.com' }, opts).replyTo).toBe('ada@example.com')
    expect(composeMail({ name: 'Ada' }, opts).replyTo).toBeUndefined()
  })
})

describe('composeMail labels and empty values', () => {
  it('shows the label instead of the field name, escaped', () => {
    const m = composeMail({ prenom: 'Ada' }, { ...opts, labels: { prenom: 'Prénom <b>' } })
    expect(m.html).toContain('Prénom &lt;b&gt;')
    expect(m.html).not.toContain('<dt>prenom</dt>')
  })

  it('skips empty values and shows a ticked checkbox as Oui', () => {
    const m = composeMail({ telephone: '  ', message: '', consentement: 'on' }, { ...opts, checkboxes: ['consentement'] })
    expect(m.html).not.toContain('telephone')
    expect(m.html).not.toContain('message')
    expect(m.html).toContain('<dd>Oui</dd>')
  })

  it('keeps the order of the submitted fields', () => {
    const m = composeMail({ b: '2', a: '1' }, opts)
    expect(m.html.indexOf('<dt>b</dt>')).toBeLessThan(m.html.indexOf('<dt>a</dt>'))
  })
})

describe('makeSender', () => {
  it('sends the composed, escaped mail through Brevo fetch', async () => {
    const bodies: string[] = []
    const fetchImpl = (async (_url: string, init: RequestInit) => {
      bodies.push(String(init.body))
      return new Response('{}', { status: 201 })
    }) as unknown as typeof fetch
    const send = makeSender({
      ...opts,
      apiKey: 'xkeysib-test',
      sender: { email: 'site@example.com', name: 'Site' },
      fetchImpl,
    })
    await send({ name: 'Ada', message: '<img src=x onerror=alert(1)>', email: 'ada@example.com' })
    const sent = JSON.parse(bodies[0])
    expect(sent.htmlContent).not.toContain('<img')
    expect(sent.replyTo).toEqual({ email: 'ada@example.com' })
    expect(sent.to).toEqual([{ email: 'contact@example.com' }])
  })
})
