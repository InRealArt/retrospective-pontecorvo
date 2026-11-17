import { describe, expect, it } from 'vitest'
import { defaultMessages, messageFor, type FormState } from '../lib/forms/state'

describe('messageFor', () => {
  it('says nothing while the form is idle', () => {
    expect(messageFor({ status: 'idle' })).toBeNull()
  })

  it('returns the success message', () => {
    expect(messageFor({ status: 'success' })).toBe(defaultMessages.success)
  })

  it.each(['invalid', 'captcha', 'rate', 'mail'] as const)('returns a distinct message for the %s error', (error) => {
    const state: FormState = { status: 'error', error }
    const message = messageFor(state)
    expect(message).toBe(defaultMessages[error])
    expect(message).toBeTruthy()
  })

  it('never reveals technical detail in the default messages', () => {
    for (const text of Object.values(defaultMessages)) {
      expect(text).not.toMatch(/turnstile|brevo|smtp|api|zod|stack/i)
    }
  })

  it('lets a project override some messages and keeps the others', () => {
    expect(messageFor({ status: 'success' }, { success: 'Merci !' })).toBe('Merci !')
    expect(messageFor({ status: 'error', error: 'rate' }, { success: 'Merci !' })).toBe(defaultMessages.rate)
  })
})
