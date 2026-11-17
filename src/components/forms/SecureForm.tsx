'use client'

import { useActionState, useState, type ReactNode } from 'react'
import { SuccessDialog } from './SuccessDialog'
import { HONEYPOT_FIELD } from '../../lib/forms/constants'
import { idleState, messageFor, type FormMessages, type FormState } from '../../lib/forms/state'
import { TurnstileWidget } from './TurnstileWidget'

interface SecureFormProps {
  /** The generated Server Action, for example `submitContact`. */
  action: (previous: FormState, formData: FormData) => Promise<FormState>
  /** Must match `turnstile.action` of the form in the brief. */
  turnstileAction: string
  children: ReactNode
  className?: string
  /** Class of the status line; the line has `data-state` set to idle, success or error. */
  statusClassName?: string
  messages?: Partial<FormMessages>
  /** When set, a confirmation modal opens after a successful send. */
  successDialog?: { title: string; body: string }
}

/**
 * Form shell: anti-spam trap, Turnstile challenge, submission state and visitor messages.
 * Only the fields and the submit button come from the page; no security code lives in the page.
 */
export function SecureForm({ action, turnstileAction, children, className, statusClassName, messages, successDialog }: SecureFormProps) {
  const [state, formAction, pending] = useActionState(action, idleState)
  const [verified, setVerified] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const needsChallenge = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)
  const message = waiting && !verified ? 'Vérification anti-spam en cours, réessayez dans un instant.' : messageFor(state, messages)
  const [dismissed, setDismissed] = useState<FormState | null>(null)
  const dialogOpen = Boolean(successDialog) && state.status === 'success' && dismissed !== state

  return (
    <>
    <form
      action={formAction}
      className={className}
      aria-busy={pending}
      data-pending={pending || undefined}
      onSubmit={(event) => {
        if (pending) event.preventDefault()
        // Without a token the server would refuse the request: wait for the challenge instead of spending the attempt.
        if (needsChallenge && !verified) {
          event.preventDefault()
          setWaiting(true)
        }
      }}
    >
      {children}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Ne pas remplir
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <TurnstileWidget
        action={turnstileAction}
        resetSignal={state}
        onValidChange={(valid) => {
          setVerified(valid)
          if (valid) setWaiting(false)
        }}
      />
      <p role="status" aria-live="polite" className={statusClassName} data-state={state.status}>
        {message}
      </p>
    </form>
    {successDialog && (
      <SuccessDialog open={dialogOpen} title={successDialog.title} onClose={() => setDismissed(state)}>
        <p>{successDialog.body}</p>
      </SuccessDialog>
    )}
    </>
  )
}
