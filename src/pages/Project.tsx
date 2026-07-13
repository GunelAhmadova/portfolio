import { Link, Navigate, useParams } from 'react-router-dom'
import { getProject, nextProject } from '../data/projects'
import Cover from '../components/Cover'
import Reveal from '../components/Reveal'

const sectionOrder = [
  { key: 'overview', label: 'Overview' },
  { key: 'problem', label: 'The Challenge' },
  { key: 'process', label: 'Process & Research' },
  { key: 'solution', label: 'Design Solution' },
  { key: 'outcome', label: 'Final Outcome' },
] as const

export default function Project() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  if (!project) return <Navigate to="/" replace />

  const next = nextProject(project.slug)

  return (
    <main className="pt-28 md:pt-36">
      <article className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <Link
            to="/"
            className="link-sweep font-mono text-sm text-muted hover:text-ink"
          >
            ← Back to all work
          </Link>
          <p className="kicker mt-8 mb-3">
            {project.category} · {project.year}
          </p>
          <h1 className="display max-w-4xl text-4xl font-bold sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            <div>
              <dt className="kicker mb-1">role</dt>
              <dd className="text-sm">{project.role}</dd>
            </div>
            <div>
              <dt className="kicker mb-1">client</dt>
              <dd className="text-sm">{project.client ?? 'Concept project'}</dd>
            </div>
            <div>
              <dt className="kicker mb-1">year</dt>
              <dd className="text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="kicker mb-1">tools</dt>
              <dd className="text-sm">{project.tools.join(', ')}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-line-soft">
            <Cover project={project} />
          </div>
        </Reveal>

        <div className="mx-auto mt-16 max-w-3xl md:mt-24">
          {sectionOrder.map(({ key, label }) => (
            <Reveal key={key} delay={0.05}>
              <section className="mb-16">
                <h2 className="display mb-5 text-2xl font-bold sm:text-3xl">
                  {label}
                </h2>
                <p className="text-lg leading-relaxed text-muted md:text-xl">
                  {project.sections[key]}
                </p>
              </section>
            </Reveal>
          ))}

          {project.reflection && (
            <Reveal delay={0.05}>
              <section className="mb-16">
                <h2 className="display mb-5 text-2xl font-bold sm:text-3xl">
                  Reflection
                </h2>
                <p className="text-lg leading-relaxed text-muted md:text-xl">
                  {project.reflection}
                </p>
              </section>
            </Reveal>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-14 flex flex-col gap-6">
              {project.gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title}, design detail`}
                  className="w-full rounded-xl border border-line-soft"
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {project.behanceUrl && (
            <Reveal>
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noreferrer"
                className="link-sweep font-mono text-sm text-accent-ink"
              >
                See the full visual case study on Behance ↗
              </a>
            </Reveal>
          )}
        </div>
      </article>

      <Link
        to={`/work/${next.slug}`}
        className="group mt-20 block border-t border-line-soft bg-surface transition-colors hover:bg-accent"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-12 md:px-8 md:py-16">
          <div>
            <p className="kicker mb-2 group-hover:text-on-accent">
              next project
            </p>
            <p className="display text-2xl font-semibold group-hover:text-on-accent sm:text-3xl md:text-4xl">
              {next.title}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="display text-4xl transition-transform group-hover:translate-x-2 group-hover:text-on-accent md:text-5xl"
          >
            →
          </span>
        </div>
      </Link>
    </main>
  )
}
