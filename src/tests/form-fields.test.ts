import { describe, expect, it } from 'vitest'
import { buildFormSchema, type FieldDef } from '../lib/forms/schema'

const fields: FieldDef[] = [
  { name: 'email', type: 'email', required: true, max: 254 },
  { name: 'telephone', type: 'tel', required: false, max: 30 },
  { name: 'demande', type: 'select', required: true, max: 40, options: ['Organiser une visite privée', "Recevoir le catalogue de l'exposition", 'Autre demande'] },
  { name: 'message', type: 'textarea', required: false, max: 2000 },
  { name: 'consentement', type: 'consent', required: true, max: 3 },
]
const schema = buildFormSchema(fields)
const base = {
  email: 'ada@example.com',
  demande: 'Autre demande',
  consentement: 'on',
  'cf-turnstile-response': 'tok',
}

describe('tel field', () => {
  it.each(['+33 1 42 00 00 00', '01.42.00.00.00', '(33) 142-000000'])('accepts %s', (tel) => {
    expect(schema.safeParse({ ...base, telephone: tel }).success).toBe(true)
  })

  it.each(['abc', '06 12\nBcc: x@y.z', '12', '1'.repeat(40), '<script>'])('rejects %j', (tel) => {
    expect(schema.safeParse({ ...base, telephone: tel }).success).toBe(false)
  })

  it('may be left empty or absent when optional', () => {
    expect(schema.safeParse({ ...base, telephone: '' }).success).toBe(true)
    expect(schema.safeParse(base).success).toBe(true)
  })
})

describe('select field', () => {
  it('accepts each declared option, apostrophes included', () => {
    for (const option of fields[2].options!) expect(schema.safeParse({ ...base, demande: option }).success).toBe(true)
  })

  it.each(['Quelque chose d’autre', '', 'autre demande'])('rejects the value %j that is not an option', (value) => {
    expect(schema.safeParse({ ...base, demande: value }).success).toBe(false)
  })

  it('refuses to build a select without options', () => {
    expect(() => buildFormSchema([{ name: 'x', type: 'select', required: true, max: 5 }])).toThrow(/options/)
  })
})

describe('consent field', () => {
  it('requires the value "on" when required', () => {
    expect(schema.safeParse(base).success).toBe(true)
    expect(schema.safeParse({ ...base, consentement: 'off' }).success).toBe(false)
    expect(schema.safeParse({ ...base, consentement: '' }).success).toBe(false)
    const without: Record<string, string> = { ...base }
    delete without.consentement
    expect(schema.safeParse(without).success).toBe(false)
  })
})

describe('optional free text', () => {
  it('accepts an empty message', () => {
    expect(schema.safeParse({ ...base, message: '' }).success).toBe(true)
  })
})
