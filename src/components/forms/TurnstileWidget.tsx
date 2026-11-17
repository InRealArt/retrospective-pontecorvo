'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

interface TurnstileApi {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string
      action: string
      language: string
      callback?: () => void
      'expired-callback'?: () => void
      'error-callback'?: () => void
    },
  ) => string
  reset: (id: string) => void
  remove: (id: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

interface TurnstileWidgetProps {
  /** Must match the action the server expects. */
  action: string
  siteKey?: string
  /** Change this value to get a fresh challenge, for instance after a failed submission. */
  resetSignal?: unknown
  /** Called whenever a token becomes valid or stops being valid (expired, error, reset). */
  onValidChange?: (valid: boolean) => void
}

/** Cloudflare Turnstile challenge. It adds its token to the surrounding form as `cf-turnstile-response`. */
export function TurnstileWidget({ action, siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY, resetSignal, onValidChange }: TurnstileWidgetProps) {
  const container = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const onValidChangeRef = useRef(onValidChange)
  const [ready, setReady] = useState(() => typeof window !== 'undefined' && Boolean(window.turnstile))

  useEffect(() => {
    onValidChangeRef.current = onValidChange
  }, [onValidChange])

  useEffect(() => {
    const api = window.turnstile
    if (!ready || !api || !container.current || !siteKey) return
    widgetId.current = api.render(container.current, {
      sitekey: siteKey,
      action,
      language: 'fr',
      callback: () => onValidChangeRef.current?.(true),
      'expired-callback': () => onValidChangeRef.current?.(false),
      'error-callback': () => onValidChangeRef.current?.(false),
    })
    return () => {
      if (widgetId.current !== null) api.remove(widgetId.current)
      widgetId.current = null
      onValidChangeRef.current?.(false)
    }
  }, [ready, siteKey, action])

  useEffect(() => {
    if (widgetId.current !== null) {
      window.turnstile?.reset(widgetId.current)
      onValidChangeRef.current?.(false)
    }
  }, [resetSignal])

  if (!siteKey) return null
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
        onReady={() => setReady(true)}
      />
      <div ref={container} />
    </>
  )
}
