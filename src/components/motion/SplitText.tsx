'use client'

import { useRef, type ElementType } from 'react'
import { gsap, SplitText as GsapSplitText, useGSAP } from '../../lib/gsap'
import { motionConfig, type MotionLevel } from '../../lib/motion-config'

interface SplitTextProps {
  text: string
  as?: ElementType
  level?: MotionLevel
  durationBase?: number
  ease?: string
  className?: string
}

/** Reveals a heading word by word on scroll. The plain text stays in the DOM, so it reads the same without motion. */
export function SplitText({ text, as: Tag = 'h2', level = 'subtle', durationBase = 0.8, ease, className }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const cfg = motionConfig(level, durationBase, ease)
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        GsapSplitText.create(el, {
          type: 'words',
          autoSplit: true,
          onSplit: (self: { words: Element[] }) =>
            gsap.from(self.words, {
              opacity: 0,
              y: cfg.y,
              duration: cfg.duration,
              ease: cfg.ease,
              stagger: cfg.stagger,
              scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            }),
        })
      })
      return () => media.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
