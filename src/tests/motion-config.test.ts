import { describe, expect, it } from 'vitest'
import { motionConfig } from '../lib/motion-config'

describe('motionConfig', () => {
  it('subtle: small shift, base duration, tight stagger', () => {
    expect(motionConfig('subtle', 0.8)).toEqual({ y: 16, duration: 0.8, stagger: 0.06, ease: 'power3.out' })
  })

  it('medium: larger shift, duration x1.2', () => {
    expect(motionConfig('medium', 0.8)).toEqual({ y: 32, duration: 0.96, stagger: 0.08, ease: 'power3.out' })
  })

  it('bold: widest shift, duration x1.5', () => {
    expect(motionConfig('bold', 0.5)).toEqual({ y: 56, duration: 0.75, stagger: 0.1, ease: 'power3.out' })
  })

  it('keeps a custom ease', () => {
    expect(motionConfig('subtle', 1, 'expo.out').ease).toBe('expo.out')
  })
})
