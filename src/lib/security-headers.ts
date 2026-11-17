// A CSP without a nonce for now: Next.js inline scripts need 'unsafe-inline'.
// A nonce-based policy needs middleware and is planned for a later step.

export interface SecurityHeadersOptions {
  /** React reads call stacks through eval() in development only; production never allows it. */
  development?: boolean
  /** Extra origins the site may frame, for example a map: `https://www.google.com`. Turnstile is always allowed. */
  frameSrc?: string[]
}

// A bare https origin. Anything else (spaces, semicolons, paths, wildcards) could rewrite the policy.
const HTTPS_ORIGIN = /^https:\/\/[a-z0-9.-]+(:\d+)?$/i

export function createSecurityHeaders({ development = false, frameSrc = [] }: SecurityHeadersOptions = {}) {
  const invalid = frameSrc.filter((origin) => !HTTPS_ORIGIN.test(origin))
  if (invalid.length) throw new Error(`frame origins must be bare https origins: ${invalid.join(', ')}`)

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://challenges.cloudflare.com",
    ['frame-src https://challenges.cloudflare.com', ...frameSrc].join(' '),
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; ')

  return [
    { key: 'Content-Security-Policy', value: csp },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  ]
}

/** Strict defaults: Turnstile only, no eval. Projects with a map or a video build theirs with createSecurityHeaders. */
export const securityHeaders = createSecurityHeaders()
