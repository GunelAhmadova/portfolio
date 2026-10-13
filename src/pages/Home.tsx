import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { featuredProjects, moreProjects, type Project } from '../data/projects'
import Cover from '../components/Cover'
import Reveal from '../components/Reveal'
import Avatar from '../components/Avatar'
import CopyEmail from '../components/CopyEmail'

const ease = [0.22, 1, 0.36, 1] as const

/* ------------------------------- Hero ---------------------------------- */

/** Headline that rises in word by word from behind a mask */
function RevealWords({ words, delay = 0 }: { words: React.ReactNode[]; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const fade = (d: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: d, ease },
        }

  const info = [
    { label: 'Currently', value: `${profile.current.role} at ${profile.current.company}` },
    { label: 'Based in', value: profile.location },
    { label: 'Focus', value: 'Fintech · SaaS · Mobile' },
    { label: 'Background', value: 'Design × software development' },
  ]

  return (
    <section className="relative overflow-hidden pt-36 pb-14 md:pt-48 md:pb-20">
      <div
        className="glow -top-32 right-[-10%] h-[34rem] w-[34rem] opacity-60"
        style={{ background: 'var(--glow-a)' }}
        aria-hidden="true"
      />
      <div
        className="glow top-24 right-[22%] h-[22rem] w-[22rem] opacity-50 [animation-delay:-6s]"
        style={{ background: 'var(--glow-b)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <motion.p
          {...fade(0)}
          className="card inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm"
        >
          <span className="status-dot" aria-hidden="true" />
          {profile.availability}
        </motion.p>

        <h1 className="display mt-8 text-[13vw] sm:text-7xl md:text-8xl lg:text-[7.25rem]">
          <RevealWords words={['UX/UI', 'designer']} delay={0.1} />
          <br />
          <RevealWords
            words={['with', 'a', 'developer’s', <span key="logic" className="serif text-accent-ink">logic.</span>]}
            delay={0.25}
          />
        </h1>

        <motion.p {...fade(0.6)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          {profile.tagline}{' '}
          <span className="text-ink">Currently redesigning Fitxlink at Webidea.</span>
        </motion.p>

        <motion.div {...fade(0.7)} className="mt-9 flex flex-wrap gap-3">
          <a href="#work" className="btn-ink rounded-full px-6 py-3.5 font-medium">
            See case studies ↓
          </a>
          <CopyEmail className="btn-ghost rounded-full px-6 py-3.5 font-medium" />
        </motion.div>

        {profile.heroPhoto && (
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 24, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 4 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
            className="absolute top-[25rem] right-8 hidden w-[220px] lg:block xl:top-[24rem] xl:w-[250px]"
          >
            <img
              src={profile.heroPhoto}
              alt={`${profile.name}, portrait`}
              className="aspect-[4/5] w-full rounded-[1.75rem] object-cover shadow-2xl ring-1 ring-black/5"
            />
            <figcaption className="card absolute -bottom-4 -left-8 -rotate-6 rounded-full px-4 py-2 text-sm font-medium">
              Hi, that’s me
            </figcaption>
          </motion.figure>
        )}

        <motion.dl
          {...fade(0.85)}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 md:mt-24 md:grid-cols-4"
        >
          {info.map((item) => (
            <div key={item.label}>
              <dt className="kicker">{item.label}</dt>
              <dd className="mt-1.5 text-sm font-medium md:text-base">{item.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

/* ----------------------------- Clients strip ---------------------------- */

function Clients() {
  const items = [...profile.clients, ...profile.clients]
  return (
    <section aria-label="Companies and clients I have worked with" className="border-y border-line-soft py-6">
      <div className="fade-x overflow-hidden">
        <div className="marquee marquee-slow">
          {items.map((c, i) => (
            <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= profile.clients.length}>
              <span className="display px-7 text-2xl text-muted md:text-3xl">{c}</span>
              <span className="text-accent-ink" aria-hidden="true">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------- Featured work ----------------------------- */

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const [name, subtitle] = project.title.split(':')
  const tags = project.tags ?? project.category.split('·').map((t) => t.trim())
  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor="view"
      className="group card grid overflow-hidden rounded-[2rem] md:min-h-[540px] md:grid-cols-[0.85fr_1.15fr]"
    >
      <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
        <div>
          <p className="kicker flex gap-3">
            <span className="text-accent-ink">{String(index + 1).padStart(2, '0')}</span>
            <span>{project.category}</span>
          </p>
          <h3 className="display mt-6 text-4xl md:text-5xl">{name}</h3>
          {subtitle && <p className="mt-2 text-lg text-muted">{subtitle.trim()}</p>}
          <p className="mt-6 max-w-md leading-relaxed text-muted">{project.summary}</p>
        </div>
        <div>
          <ul className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">
                {t}
              </li>
            ))}
          </ul>
          <span className="mt-8 inline-flex items-center gap-2 font-medium">
            Read case study
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
      <div className="relative min-h-[300px] overflow-hidden sm:min-h-[380px] md:m-3 md:min-h-0 md:rounded-[1.6rem]">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <Cover project={project} eager={index === 0} />
        </div>
      </div>
    </Link>
  )
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="kicker mb-4">Selected work</p>
            <h2 className="display text-5xl md:text-7xl">
              Case <span className="serif">studies</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Deep dives into recent products: the problem, the research and the
            decisions behind the interface.
          </p>
        </Reveal>

        <div className="relative">
          {featuredProjects.map((p, i) => (
            <div
              key={p.slug}
              className="sticky mb-8 md:mb-24"
              style={{ top: 88 + i * 16 }}
            >
              <FeaturedCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MoreWork() {
  const [visible, setVisible] = useState(6)
  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <h2 className="display text-4xl md:text-5xl">More projects</h2>
          <p className="kicker">{moreProjects.length} projects</p>
        </Reveal>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.slice(0, visible).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link to={`/work/${p.slug}`} className="group block" data-cursor="view">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line-soft">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Cover project={p} />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title.split(':')[0]}</h3>
                <p className="mt-1 text-sm text-muted">
                  {p.category} · {p.year}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        {visible < moreProjects.length && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setVisible(moreProjects.length)}
              className="btn-ghost rounded-full px-7 py-3 font-medium"
            >
              Show all {moreProjects.length} projects
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/* -------------------------------- About --------------------------------- */

function Tile({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return <div className={`card rounded-[1.75rem] p-6 md:p-8 ${className}`}>{children}</div>
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="rounded-full bg-surface-2 px-3 py-1.5 text-sm">
          {s}
        </li>
      ))}
    </ul>
  )
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-10 md:mb-14">
          <p className="kicker mb-4">About</p>
          <h2 className="display text-5xl md:text-7xl">
            Design <span className="serif">×</span> code
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="card relative h-full min-h-[340px] overflow-hidden rounded-[1.75rem]">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-2">
                  <Avatar size={160} />
                </div>
              )}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-surface/85 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="font-semibold">{profile.name}</p>
                  <p className="text-sm text-muted">{profile.location}</p>
                </div>
                <span className="status-dot" aria-label="Available" />
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.05}>
            <Tile className="h-full">
              <div className="space-y-4 text-lg leading-relaxed text-muted md:text-xl">
                {profile.bio.map((p, i) => (
                  <p key={i} className={i === 0 ? 'text-ink' : ''}>
                    {p}
                  </p>
                ))}
              </div>
            </Tile>
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.1}>
            <div className="grid h-full grid-cols-3 gap-4">
              {profile.stats.map((s) => (
                <Tile key={s.label} className="flex flex-col justify-between !p-5 md:!p-6">
                  <p className="display text-4xl md:text-6xl">{s.value}</p>
                  <p className="mt-3 text-xs text-muted md:text-sm">{s.label}</p>
                </Tile>
              ))}
            </div>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.05}>
            <Tile className="h-full">
              <p className="kicker mb-5">How I work</p>
              <ol className="space-y-3">
                {profile.process.map((p, i) => (
                  <li key={p.step} className="flex items-baseline gap-4 border-b border-line-soft pb-3 last:border-0 last:pb-0">
                    <span className="font-mono text-xs text-accent-ink">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-semibold">{p.step}</span>
                    <span className="ml-auto text-right text-sm text-muted">{p.text}</span>
                  </li>
                ))}
              </ol>
            </Tile>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.1}>
            <Tile className="h-full space-y-6">
              <div>
                <p className="kicker mb-3">Design</p>
                <Chips items={profile.skills.design} />
              </div>
              <div>
                <p className="kicker mb-3">Tools</p>
                <Chips items={profile.skills.tools} />
              </div>
              <div>
                <p className="kicker mb-3">Code</p>
                <Chips items={profile.skills.development} />
              </div>
            </Tile>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.05}>
            <Tile className="h-full">
              <p className="kicker mb-5">Education</p>
              <ul className="space-y-3">
                {profile.education.map((e) => (
                  <li key={e.degree} className="flex justify-between gap-4">
                    <span>
                      <span className="font-semibold">{e.degree}</span>
                      <span className="block text-sm text-muted">{e.school}</span>
                    </span>
                    <span className="shrink-0 text-sm text-muted">{e.period}</span>
                  </li>
                ))}
              </ul>
            </Tile>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.1}>
            <Tile className="h-full">
              <p className="kicker mb-5">Certificates & languages</p>
              <ul className="space-y-3">
                {profile.certificates.map((c) => (
                  <li key={c.name} className="flex justify-between gap-4">
                    <span className="font-semibold">{c.name}</span>
                    <span className="shrink-0 text-sm text-muted">
                      {c.issuer} · {c.year}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted">{profile.languages.join(' · ')}</p>
            </Tile>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Experience ------------------------------ */

function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-10 md:mb-14">
          <p className="kicker mb-4">Experience</p>
          <h2 className="display text-5xl md:text-7xl">
            Where I’ve <span className="serif">worked</span>
          </h2>
        </Reveal>
        <ol className="border-b border-line-soft">
          {profile.experience.map((job, i) => (
            <li key={job.company + job.period}>
              <Reveal delay={i * 0.04}>
                <div className="grid gap-3 border-t border-line-soft py-7 md:grid-cols-12 md:gap-6">
                  <p className="text-sm text-muted md:col-span-3">
                    {job.period}
                    {i === 0 && (
                      <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
                        Now
                      </span>
                    )}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {job.role} <span className="text-muted">at</span> {job.company}
                    </h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* -------------------------------- Contact ------------------------------- */

function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 text-center md:py-36">
      <div
        className="glow bottom-[-30%] left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 opacity-50"
        style={{ background: 'var(--glow-a)' }}
        aria-hidden="true"
      />
      <Reveal className="relative mx-auto max-w-4xl px-5 md:px-8">
        <p className="kicker mb-6">Contact</p>
        <h2 className="display text-5xl sm:text-6xl md:text-8xl">
          Let’s build something <span className="serif text-accent-ink">people love.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-lg text-lg text-muted">
          Open to full-time roles and freelance projects in product design and
          UX research.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${profile.email}`} className="btn-ink rounded-full px-7 py-4 font-medium">
            Email me
          </a>
          <CopyEmail className="btn-ghost rounded-full px-7 py-4 font-medium" />
          <a
            href={profile.socials[0].url}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost rounded-full px-7 py-4 font-medium"
          >
            LinkedIn ↗
          </a>
        </div>
      </Reveal>
    </section>
  )
}

/* --------------------------------- Page --------------------------------- */

export default function Home() {
  const { hash } = useLocation()

  // Scroll to the section hash after arriving from another route
  useEffect(() => {
    if (!hash) return
    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [hash])

  return (
    <main>
      <Hero />
      <Clients />
      <Work />
      <MoreWork />
      <About />
      <Experience />
      <Contact />
    </main>
  )
}
