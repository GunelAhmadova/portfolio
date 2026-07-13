import { useEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

/**
 * Custom cursor: a springy "View" badge that follows the mouse and pops in
 * whenever the pointer is over an element marked with data-cursor="view"
 * (project cards). Renders nothing on touch devices or for reduced motion.
 */
export default function ViewCursor() {
  const reduce = useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)
  const [active, setActive] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x = useSpring(mx, { stiffness: 450, damping: 40, mass: 0.6 })
  const y = useSpring(my, { stiffness: 450, damping: 40, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setFinePointer(mq.matches)
    const onMq = (e: MediaQueryListEvent) => setFinePointer(e.matches)
    mq.addEventListener('change', onMq)

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    const onOver = (e: Event) => {
      const t = e.target as Element | null
      setActive(!!t?.closest('[data-cursor="view"]'))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, true)
    return () => {
      mq.removeEventListener('change', onMq)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseover', onOver, true)
    }
  }, [mx, my])

  if (!finePointer || reduce) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70]"
      style={{ x, y }}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 30 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="btn-accent flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-semibold tracking-wide uppercase"
          >
            View
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
