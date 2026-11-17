export type MotionLevel = 'subtle' | 'medium' | 'bold'

export interface MotionConfig {
  /** Vertical shift in px at the start of a reveal. */
  y: number
  duration: number
  stagger: number
  ease: string
}

const LEVELS: Record<MotionLevel, { y: number; durationFactor: number; stagger: number }> = {
  subtle: { y: 16, durationFactor: 1, stagger: 0.06 },
  medium: { y: 32, durationFactor: 1.2, stagger: 0.08 },
  bold: { y: 56, durationFactor: 1.5, stagger: 0.1 },
}

const round = (n: number) => Math.round(n * 1000) / 1000

/** Reveal parameters for a motion level; only transform and opacity are ever animated with them. */
export function motionConfig(level: MotionLevel, durationBase: number, ease = 'power3.out'): MotionConfig {
  const l = LEVELS[level]
  return { y: l.y, duration: round(durationBase * l.durationFactor), stagger: l.stagger, ease }
}
