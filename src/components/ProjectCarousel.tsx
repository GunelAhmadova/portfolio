import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { projects, type Project } from '../data/projects'
import Cover from './Cover'

const SPEED = 55 // auto-scroll speed, px per second

function CarouselCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      draggable={false}
      className="group block w-[260px] shrink-0 select-none sm:w-[320px] md:w-[360px]"
      aria-label={project.title}
    >
      <div className="aspect-[16/11] overflow-hidden rounded-xl border border-line-soft">
        <div className="pointer-events-none h-full w-full transition-transform duration-500 ease-out group-hover:scale-105">
          <Cover project={project} />
        </div>
      </div>
      <p className="mt-3 font-mono text-xs text-muted">{project.category}</p>
      <h3 className="mt-1 font-display leading-snug font-semibold group-hover:text-accent-ink">
        {project.title}
      </h3>
    </Link>
  )
}

/**
 * Infinite auto-scrolling, draggable project carousel.
 * - moves continuously; pauses on hover, focus, or while dragging
 * - drag left/right to browse manually (position wraps seamlessly)
 * - reduced motion: plain scrollable row, no auto-movement
 */
export default function ProjectCarousel() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const dragging = useRef(false)
  const justDragged = useRef(false)

  const wrap = (v: number) => {
    const track = trackRef.current
    if (!track) return v
    const half = track.scrollWidth / 2
    if (half <= 0) return v
    if (v <= -half) return v + half
    if (v > 0) return v - half
    return v
  }

  useAnimationFrame((_, delta) => {
    if (reduce || paused || dragging.current) return
    x.set(wrap(x.get() - (SPEED * delta) / 1000))
  })

  if (reduce) {
    return (
      <div className="flex gap-6 overflow-x-auto px-5 pb-4 md:px-8">
        {projects.map((p) => (
          <CarouselCard key={p.slug} project={p} />
        ))}
      </div>
    )
  }

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max cursor-grab gap-6 active:cursor-grabbing"
        style={{ x, touchAction: 'pan-y' }}
        drag="x"
        dragConstraints={{ left: -Infinity, right: Infinity }}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => {
          dragging.current = true
          justDragged.current = true
        }}
        onDrag={() => x.set(wrap(x.get()))}
        onDragEnd={() => {
          dragging.current = false
          // let the drag-release click pass before re-enabling card links
          setTimeout(() => {
            justDragged.current = false
          }, 100)
        }}
        onClickCapture={(e) => {
          // a mouse drag ends with a click on the card; swallow it so
          // dragging never accidentally opens a project
          if (justDragged.current) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      >
        {[...projects, ...projects].map((p, i) => (
          <CarouselCard key={p.slug + i} project={p} />
        ))}
      </motion.div>
    </div>
  )
}
