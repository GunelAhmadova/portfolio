import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { featuredProjects, moreProjects } from '../data/projects'
import { FeaturedCard, CompactCard } from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

/* ------------------------------- Hero ---------------------------------- */

function Hero() {
  const reduce = useReducedMotion()
  const stagger = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.7,
            delay: 0.12 * i,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        }

  return (
    <section className="blueprint relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
      {/* accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'var(--accent)' }}
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.p {...stagger(0)} className="kicker mb-5">
          {'//'} ux·ui designer — {profile.location.toLowerCase()}
        </motion.p>
        <motion.h1
          {...stagger(1)}
          className="display text-[13vw] font-bold sm:text-7xl md:text-8xl lg:text-[7rem]"
        >
          Gunel
          <br />
          Ahmadova<span className="text-accent-ink">.</span>
        </motion.h1>
        <motion.p
          {...stagger(2)}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {profile.tagline}
        </motion.p>
        <motion.div {...stagger(3)} className="mt-9 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full bg-accent px-6 py-3 font-medium text-on-accent transition-transform hover:scale-105"
          >
            View selected work
          </a>
          <a
            href="mailto:gunel.ahmadovaaa@gmail.com"
            className="rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-ink"
          >
            Get in touch
          </a>
        </motion.div>
        <motion.dl
          {...stagger(4)}
          className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6"
        >
          {profile.stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 font-mono text-xs text-muted">
                {s.label}
              </dt>
              <dd className="display text-3xl font-semibold md:text-4xl">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}

/* ---------------------------- Work sections ----------------------------- */

function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="01" label="selected work" title="Case studies" />
        <div className="flex flex-col gap-20 md:gap-28">
          {featuredProjects.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MoreWork() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="02" label="archive" title="More projects" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moreProjects.map((p) => (
            <CompactCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- About --------------------------------- */

function About() {
  return (
    <section id="about" className="blueprint scroll-mt-20 border-y border-line-soft py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <SectionHeading index="03" label="about" title="Design × Code" />
        </div>
        <div className="md:col-span-7">
          {profile.bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="mb-6 text-lg leading-relaxed text-muted md:text-xl">
                {para}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <p className="font-mono text-sm text-accent-ink">
              const gunel = {'{'} design: true, code: true {'}'}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Experience ------------------------------ */

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="04" label="experience" title="Where I’ve worked" />
        <ol className="border-l border-line">
          {profile.experience.map((job, i) => (
            <li key={job.company + job.period}>
              <Reveal delay={i * 0.05}>
                <div className="relative pb-12 pl-8 md:pl-12">
                  <span
                    aria-hidden="true"
                    className="absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full bg-accent"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="display text-2xl font-semibold md:text-3xl">
                      {job.company}
                    </h3>
                    <p className="font-mono text-xs tracking-wide text-muted uppercase">
                      {job.period}
                    </p>
                  </div>
                  <p className="mt-1 font-medium text-accent-ink">{job.role}</p>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                    {job.summary}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-4 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          <Reveal>
            <h3 className="kicker mb-4">education</h3>
            <ul className="space-y-3">
              {profile.education.map((e) => (
                <li key={e.school + e.degree} className="flex flex-wrap gap-x-3">
                  <span className="font-medium">{e.school}</span>
                  <span className="text-muted">{e.degree}</span>
                  <span className="font-mono text-xs text-muted">
                    {e.period}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="kicker mb-4">certificates</h3>
            <ul className="space-y-3">
              {profile.certificates.map((c) => (
                <li key={c.name} className="flex flex-wrap gap-x-3">
                  <span className="font-medium">{c.name}</span>
                  <span className="font-mono text-xs text-muted">
                    {c.issuer} · {c.year}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Skills -------------------------------- */

function SkillGroup({
  title,
  items,
  delay,
}: {
  title: string
  items: string[]
  delay: number
}) {
  return (
    <Reveal delay={delay}>
      <h3 className="kicker mb-4">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((s) => (
          <li
            key={s}
            className="rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-accent-ink hover:text-accent-ink"
          >
            {s}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

function Skills() {
  return (
    <section className="border-y border-line-soft bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="05" label="toolkit" title="Skills & tools" />
        <div className="grid gap-10 md:grid-cols-3">
          <SkillGroup title="design" items={profile.skills.design} delay={0} />
          <SkillGroup title="tools" items={profile.skills.tools} delay={0.1} />
          <SkillGroup
            title="development"
            items={profile.skills.development}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- Contact ------------------------------- */

function Contact() {
  return (
    <section id="contact" className="blueprint scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <Reveal>
          <p className="kicker mb-4">{'//'} 06 — contact</p>
          <h2 className="display mx-auto max-w-3xl text-5xl font-bold sm:text-6xl md:text-7xl">
            Let’s build something people love.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Open to full-time roles and freelance projects — product design,
            UX research, or anywhere design meets code.
          </p>
          <a
            href="mailto:gunel.ahmadovaaa@gmail.com"
            className="mt-10 inline-block rounded-full bg-accent px-8 py-4 text-lg font-medium text-on-accent transition-transform hover:scale-105"
          >
            gunel.ahmadovaaa@gmail.com
          </a>
          <ul className="mt-10 flex justify-center gap-8">
            {profile.socials
              .filter((s) => s.label !== 'Email')
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-sweep font-mono text-sm tracking-wide text-muted uppercase hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
          </ul>
        </Reveal>
      </div>
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
      <SelectedWork />
      <MoreWork />
      <About />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
