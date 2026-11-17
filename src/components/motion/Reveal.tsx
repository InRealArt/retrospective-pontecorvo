'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { motionConfig, type MotionLevel } from '../../lib/motion-config'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  delay?: number
  level?: MotionLevel
  durationBase?: number
  ease?: string
  className?: string
}

/** Fades and lifts its content into view once, on scroll. Content stays visible without motion or without JS. */
export function Reveal({ children, as: Tag = 'div', delay = 0, level = 'subtle', durationBase = 0.8, ease, className }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const cfg = motionConfig(level, durationBase, ease)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { opacity: 0, y: cfg.y },
          {
            opacity: 1,
            y: 0,
            duration: cfg.duration,
            ease: cfg.ease,
            delay,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        )
      })
      return () => media.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
