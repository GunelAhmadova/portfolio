import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProject, nextProject, type CSBlock, type Project as P } from '../data/projects'
import Cover from '../components/Cover'
import Reveal from '../components/Reveal'
import Phone from '../components/Phone'

/* ------------------------------ Shared bits ----------------------------- */

function Header({ project, lead }: { project: P; lead: string }) {
  const [name, subtitle] = project.title.split(':')
  return (
    <Reveal>
      <Link to="/#work" className="link-sweep text-sm text-muted hover:text-ink">
        ← All work
      </Link>
      <p className="kicker mt-10 mb-5">
        {project.category} · {project.year}
      </p>
      <h1 className="display max-w-5xl text-5xl sm:text-6xl md:text-8xl">
        {name}
        {subtitle && (
          <span className="mt-3 block text-3xl text-muted sm:text-4xl md:text-5xl">
            {subtitle.trim()}
          </span>
        )}
      </h1>
      <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{lead}</p>
    </Reveal>
  )
}

function NextProject({ slug }: { slug: string }) {
  const next = nextProject(slug)
  return (
    <Link
      to={`/work/${next.slug}`}
      className="group mt-24 block border-t border-line-soft transition-colors hover:bg-surface"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-14 md:px-8 md:py-20">
        <div>
          <p className="kicker mb-3">Next project</p>
          <p className="display text-3xl sm:text-4xl md:text-6xl">{next.title.split(':')[0]}</p>
        </div>
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-2xl transition-all group-hover:translate-x-1 group-hover:bg-ink group-hover:text-on-ink md:h-20 md:w-20"
        >
          →
        </span>
      </div>
    </Link>
  )
}

/* --------------------------- Case-study blocks -------------------------- */

const toneBg = (tone: 'brand' | 'dark' | 'light', project: P) =>
  tone === 'brand'
    ? (project.showcase?.bg ?? `linear-gradient(135deg, ${project.hue[0]}, ${project.hue[1]})`)
    : tone === 'dark'
      ? '#0e0e11'
      : 'var(--surface-2)'

function Block({ block, project }: { block: CSBlock; project: P }) {
  switch (block.type) {
    case 'text':
      return (
        <Reveal>
          <section id={block.id} className="scroll-mt-28">
            <p className="kicker mb-4 text-accent-ink">{block.label}</p>
            <h2 className="display text-3xl sm:text-4xl md:text-5xl">{block.title}</h2>
            <div className="prose-cs mt-6 text-lg leading-relaxed text-muted">
              {block.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </Reveal>
      )

    case 'cards':
      return (
        <section id={block.id} className="scroll-mt-28">
          <Reveal>
            <p className="kicker mb-4 text-accent-ink">{block.label}</p>
            <h2 className="display text-3xl sm:text-4xl md:text-5xl">{block.title}</h2>
            {block.intro && <p className="mt-6 text-lg leading-relaxed text-muted">{block.intro}</p>}
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {block.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.06}>
                <div className="card h-full rounded-3xl p-6">
                  <p className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )

    case 'gallery': {
      const bg = toneBg(block.tone, project)
      return (
        <Reveal>
          <figure>
            {block.layout === 'phones' && (
              <div
                className="flex items-start justify-center gap-[4%] overflow-hidden rounded-[2rem] px-[6%] pt-[8%] pb-[6%]"
                style={{ background: bg }}
              >
                {block.images.map((img, i) => (
                  <div key={img.src} className={`w-[30%] ${i === 1 ? 'translate-y-[8%]' : ''}`}>
                    <Phone image={img} />
                    {img.caption && (
                      <p className="mt-4 text-center text-xs text-white/75 md:text-sm">{img.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {block.layout === 'wide' && (
              <div className="overflow-hidden rounded-[2rem] p-[4%]" style={{ background: bg }}>
                {block.images.map((img) => (
                  <img key={img.src} src={img.src} alt={img.alt} loading="lazy" className="w-full rounded-2xl" />
                ))}
              </div>
            )}

            {block.layout === 'grid' && (
              <div
                className={`grid gap-4 ${block.images.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}
              >
                {block.images.map((img) => (
                  <div key={img.src}>
                    <div
                      className={`flex items-center justify-center overflow-hidden rounded-3xl p-5 ${block.shape === 'wide' ? 'aspect-[4/3]' : 'aspect-[4/5]'}`}
                      style={{ background: bg }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className={`max-h-full max-w-full object-contain ${img.framed ? '' : 'rounded-xl'}`}
                      />
                    </div>
                    {img.caption && <p className="mt-3 text-sm text-muted">{img.caption}</p>}
                  </div>
                ))}
              </div>
            )}

            {block.caption && (
              <figcaption className="mt-4 text-sm text-muted">{block.caption}</figcaption>
            )}
          </figure>
        </Reveal>
      )
    }

    case 'todo':
      // Placeholder for content still to be written; never shipped to production
      if (!import.meta.env.DEV) return null
      return (
        <div className="rounded-3xl border-2 border-dashed border-accent p-6 text-sm">
          <p className="font-mono text-xs tracking-wide text-accent-ink uppercase">
            To add · {block.title}
          </p>
          <p className="mt-2 text-muted">{block.text}</p>
        </div>
      )
  }
}

/** Highlights the table-of-contents entry for the section on screen */
function useActiveId(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])
  return active
}

function RichCaseStudy({ project }: { project: P }) {
  const cs = project.caseStudy!
  const toc = cs.blocks.filter(
    (b): b is Extract<CSBlock, { id: string }> => 'id' in b,
  )
  const [ids] = useState(() => toc.map((b) => b.id))
  const active = useActiveId(ids)

  return (
    <main className="pt-32 md:pt-40">
      <article>
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Header project={project} lead={cs.intro} />

          <Reveal delay={0.1}>
            <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
              {cs.meta.map((m) => (
                <div key={m.label}>
                  <dt className="kicker mb-1.5">{m.label}</dt>
                  <dd className="text-sm leading-relaxed">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-12 max-w-7xl px-3 md:px-6">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[16/10] md:aspect-[16/8]">
              <Cover project={project} eager />
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-6xl gap-12 px-5 md:mt-28 md:grid-cols-[180px_1fr] md:px-8 lg:gap-20">
          <aside className="hidden md:block">
            <nav aria-label="Case study sections" className="sticky top-28">
              <p className="kicker mb-4">Contents</p>
              <ul className="space-y-1 border-l border-line">
                {toc.map((b) => (
                  <li key={b.id}>
                    <a
                      href={`#${b.id}`}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                        active === b.id
                          ? 'border-accent text-ink'
                          : 'border-transparent text-muted hover:text-ink'
                      }`}
                    >
                      {b.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 space-y-16 md:space-y-24">
            {cs.blocks.map((b, i) => (
              <Block key={i} block={b} project={project} />
            ))}

            {project.behanceUrl && (
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noreferrer"
                className="link-sweep inline-block text-accent-ink"
              >
                See the full visual case study on Behance ↗
              </a>
            )}
          </div>
        </div>
      </article>

      <NextProject slug={project.slug} />
    </main>
  )
}

/* ---------------------------- Classic layout ---------------------------- */

const sectionOrder = [
  { key: 'overview', label: 'Overview' },
  { key: 'problem', label: 'The Challenge' },
  { key: 'process', label: 'Process & Research' },
  { key: 'solution', label: 'Design Solution' },
  { key: 'outcome', label: 'Final Outcome' },
] as const

function ClassicCaseStudy({ project }: { project: P }) {
  return (
    <main className="pt-32 md:pt-40">
      <article className="mx-auto max-w-6xl px-5 md:px-8">
        <Header project={project} lead={project.summary} />

        <Reveal delay={0.1}>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
            <div>
              <dt className="kicker mb-1.5">Role</dt>
              <dd className="text-sm">{project.role}</dd>
            </div>
            <div>
              <dt className="kicker mb-1.5">Client</dt>
              <dd className="text-sm">{project.client ?? 'Concept project'}</dd>
            </div>
            <div>
              <dt className="kicker mb-1.5">Year</dt>
              <dd className="text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="kicker mb-1.5">Tools</dt>
              <dd className="text-sm">{project.tools.join(', ')}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] border border-line-soft">
            <Cover project={project} eager />
          </div>
        </Reveal>

        <div className="mx-auto mt-20 max-w-3xl space-y-16 md:mt-28">
          {sectionOrder.map(({ key, label }) => (
            <Reveal key={key}>
              <section>
                <p className="kicker mb-4 text-accent-ink">{label}</p>
                <p className="text-lg leading-relaxed text-muted md:text-xl">{project.sections[key]}</p>
              </section>
            </Reveal>
          ))}

          {project.reflection && (
            <Reveal>
              <section>
                <p className="kicker mb-4 text-accent-ink">Reflection</p>
                <p className="text-lg leading-relaxed text-muted md:text-xl">{project.reflection}</p>
              </section>
            </Reveal>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="flex flex-col gap-6">
              {project.gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title}, design detail`}
                  className="w-full rounded-2xl border border-line-soft"
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
                className="link-sweep inline-block text-accent-ink"
              >
                See the full visual case study on Behance ↗
              </a>
            </Reveal>
          )}
        </div>
      </article>

      <NextProject slug={project.slug} />
    </main>
  )
}

/* --------------------------------- Page --------------------------------- */

export default function Project() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  if (!project) return <Navigate to="/" replace />

  return project.caseStudy ? (
    <RichCaseStudy key={project.slug} project={project} />
  ) : (
    <ClassicCaseStudy key={project.slug} project={project} />
  )
}
