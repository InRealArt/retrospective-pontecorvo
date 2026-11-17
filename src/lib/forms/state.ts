export type FormError = 'invalid' | 'captcha' | 'rate' | 'mail'

export type FormState = { status: 'idle' } | { status: 'success' } | { status: 'error'; error: FormError }

export const idleState: FormState = { status: 'idle' }

export type FormMessages = Record<'success' | FormError, string>

/** Plain messages for the visitor: they never expose which protection or service refused the request. */
export const defaultMessages: FormMessages = {
  success: 'Votre demande a bien été envoyée.',
  invalid: 'Veuillez vérifier les champs du formulaire.',
  captcha: 'La vérification anti-spam a échoué. Rechargez la page et réessayez.',
  rate: 'Trop de demandes. Réessayez plus tard.',
  mail: "L'envoi a échoué. Réessayez plus tard.",
}

export function messageFor(state: FormState, messages: Partial<FormMessages> = {}): string | null {
  const all = { ...defaultMessages, ...messages }
  if (state.status === 'idle') return null
  return state.status === 'success' ? all.success : all[state.error]
}
