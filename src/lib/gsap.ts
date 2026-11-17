import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// The one place plugins are registered. Components import gsap from here, never from 'gsap' directly.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
