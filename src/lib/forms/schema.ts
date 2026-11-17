import { z } from 'zod'

export interface FieldDef {
  name: string
  type: 'text' | 'email' | 'textarea' | 'tel' | 'select' | 'consent'
  required: boolean
  min?: number
  /** Mandatory upper bound: no field is ever unbounded. */
  max: number
  /** The only values a `select` accepts. */
  options?: string[]
  /** Human label, used in the notification mail. */
  label?: string
}

import { HONEYPOT_FIELD, TURNSTILE_FIELD } from './constants'

export { HONEYPOT_FIELD, TURNSTILE_FIELD }

const noLineBreak = (s: string) => !/[\r\n]/.test(s)
// Digits, spaces and the usual separators only: no letters, no line breaks.
const PHONE = /^[+()\d .-]{6,30}$/

function fieldSchema(f: FieldDef): z.ZodType {
  const optionally = (s: z.ZodType): z.ZodType => (f.required ? s : z.union([z.literal(''), s]).optional())

  if (f.type === 'consent') return optionally(z.literal('on'))
  if (f.type === 'select') {
    if (!f.options?.length) throw new Error(`select field "${f.name}" needs options`)
    return optionally(z.enum(f.options as [string, ...string[]]))
  }

  const text = z.string().trim().max(f.max)
  // Line breaks are only legitimate in free text; elsewhere they enable header injection.
  const bounded = f.type === 'textarea' ? text : text.refine(noLineBreak, 'single line expected')
  const sized = bounded.min(f.min ?? (f.required ? 1 : 0))
  if (f.type === 'email') return optionally(sized.pipe(z.email()))
  if (f.type === 'tel') return optionally(sized.pipe(z.string().regex(PHONE, 'expected a phone number')))
  return optionally(sized)
}

/** Strict schema: unknown fields are rejected; the Turnstile token and honeypot are accepted but bounded. */
export function buildFormSchema(fields: FieldDef[]) {
  const shape: Record<string, z.ZodType> = {}
  for (const f of fields) shape[f.name] = fieldSchema(f)
  shape[TURNSTILE_FIELD] = z.string().min(1).max(2048)
  shape[HONEYPOT_FIELD] = z.string().max(500).optional()
  return z.strictObject(shape)
}
