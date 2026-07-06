import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { Project } from '../data/projects'
import Cover from './Cover'

export function FeaturedCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const reduce = useReducedMotion()
  const flip = index % 2 === 1

  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 36 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link
        to={`/work/${project.slug}`}
        className={`grid items-center gap-6 md:grid-cols-12 md:gap-10 ${
          flip ? '' : ''
        }`}
      >
        <div
          className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-line-soft md:col-span-7 ${
            flip ? 'md:order-2' : ''
          }`}
        >
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <Cover project={project} />
          </div>
        </div>
        <div className={`md:col-span-5 ${flip ? 'md:order-1 md:text-right' : ''}`}>
          <p className="kicker mb-2">
            {String(index + 1).padStart(2, '0')} · {project.year}
          </p>
          <h3 className="display text-2xl font-semibold sm:text-3xl md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
          <p
            className={`mt-4 flex flex-wrap gap-2 font-mono text-xs text-muted ${
              flip ? 'md:justify-end' : ''
            }`}
          >
            {project.tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1"
              >
                {t}
              </span>
            ))}
          </p>
          <span className="link-sweep mt-5 inline-block font-mono text-sm text-accent-ink">
            Read case study →
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export function CompactCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line-soft bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <Cover project={project} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-xs text-muted">{project.year}</p>
        <h3 className="mt-1 font-display text-lg leading-snug font-semibold">
          {project.title}
        </h3>
        <span className="link-sweep mt-auto inline-block pt-4 font-mono text-xs text-accent-ink">
          View project →
        </span>
      </div>
    </Link>
  )
}
