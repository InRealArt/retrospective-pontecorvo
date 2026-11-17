'use client'

import { useEffect, useRef } from 'react'

interface SuccessDialogProps {
  open: boolean
  title: string
  children: React.ReactNode
  closeLabel?: string
  /** Called when the visitor closes the modal (button, Escape or backdrop). */
  onClose?: () => void
}

/** Confirmation modal built on the native <dialog>: focus trap, Escape and backdrop come from the browser. */
export function SuccessDialog({ open, title, children, closeLabel = 'Fermer', onClose }: SuccessDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="success-dialog"
      aria-labelledby="success-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop targets the dialog element itself.
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="success-dialog__panel">
        <svg className="success-dialog__check" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="22" />
          <path d="M14 25.5l7 7 13-15" />
        </svg>
        <span className="rule-gold" aria-hidden="true" />
        <h3 id="success-dialog-title" className="font-serif-title success-dialog__title">
          {title}
        </h3>
        <div className="success-dialog__body">{children}</div>
        <form method="dialog">
          <button type="submit" className="btn-perrotin" autoFocus>
            {closeLabel}
          </button>
        </form>
      </div>
    </dialog>
  )
}
