import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { projects, type Project } from '../data/projects'
import ProjectCarousel from '../components/ProjectCarousel'
import Cover from '../components/Cover'
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
    <section className="relative overflow-hidden pt-40 pb-10 md:pt-52 md:pb-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-15%] h-[28rem] w-[28rem] rounded-full opacity-15 blur-3xl"
        style={{ background: 'var(--accent-hot)' }}
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.p {...stagger(0)} className="kicker mb-6">
          {profile.location} · open to work
        </motion.p>
        <motion.h1
          {...stagger(1)}
          className="display text-5xl sm:text-7xl md:text-8xl"
        >
          Hi, I am
          <br />
          Gunel Ahmadova<span className="text-accent-ink">.</span>
        </motion.h1>
        <motion.p
          {...stagger(2)}
          className="display mt-4 text-2xl text-muted sm:text-4xl md:text-5xl"
        >
          UX/UI Designer
        </motion.p>
        <motion.p
          {...stagger(3)}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          {profile.tagline}
        </motion.p>
        <motion.div {...stagger(4)} className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="btn-accent rounded-full px-7 py-3.5 font-semibold"
          >
            View projects
          </a>
          <a
            href="mailto:gunel.ahmadovaaa@gmail.com"
            className="rounded-full border border-line px-7 py-3.5 font-medium transition-colors hover:border-ink"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------ Carousel -------------------------------- */

function RecentWork() {
  return (
    <section className="overflow-hidden border-y border-line-soft py-7">
      <ProjectCarousel />
    </section>
  )
}

/* ------------------------------- Services ------------------------------- */

function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="01"
          label="services"
          title="What I can do for you"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-line-soft bg-surface p-7 transition-colors hover:border-accent-ink">
                <p className="font-mono text-xs text-accent-ink">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="display mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- Projects ------------------------------- */

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/work/${project.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line-soft">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <Cover project={project} />
        </div>
      </div>
      <h3 className="display mt-5 text-xl font-bold sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>
      <span className="link-sweep mt-3 inline-block text-sm font-medium text-accent-ink">
        View case study →
      </span>
    </Link>
  )
}

function SelectedProjects() {
  const [visible, setVisible] = useState(6)
  return (
    <section id="projects" className="scroll-mt-20 py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-6 md:mb-8">
          <p className="kicker mb-3">02 · projects</p>
          <h2 className="display text-5xl sm:text-6xl md:text-7xl">
            Selected Projects
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">
            A curated selection of my recent work across fintech, SaaS, mobile
            apps and digital platforms.
          </p>
        </Reveal>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {projects.slice(0, visible).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {visible < projects.length && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setVisible(projects.length)}
              className="rounded-full border border-line px-8 py-3.5 font-medium transition-colors hover:border-accent-ink hover:text-accent-ink"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/* -------------------------------- About --------------------------------- */

function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-y border-line-soft bg-surface py-10 md:py-14"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <SectionHeading index="03" label="about" title="Design × Code" />
        </div>
        <div className="md:col-span-7">
          {profile.bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="mb-6 text-lg leading-relaxed text-muted">{para}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="kicker mb-4">design</h3>
                <ul className="flex flex-wrap gap-2">
                  {profile.skills.design.slice(0, 6).map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="kicker mb-4">tools & code</h3>
                <ul className="flex flex-wrap gap-2">
                  {[...profile.skills.tools.slice(0, 4), ...profile.skills.development.slice(0, 4)].map(
                    (s) => (
                      <li
                        key={s}
                        className="rounded-full border border-line px-3 py-1 text-sm"
                      >
                        {s}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------ Experience ------------------------------ */

function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="04" label="experience" title="Work experience" />
        <ol>
          {profile.experience.map((job, i) => (
            <li key={job.company + job.period}>
              <Reveal delay={i * 0.05}>
                <div className="grid gap-2 border-t border-line-soft py-8 md:grid-cols-12 md:gap-6">
                  <p className="text-sm text-muted md:col-span-3">
                    {job.period}
                  </p>
                  <div className="md:col-span-9">
                    <h3 className="display text-xl font-bold sm:text-2xl">
                      {job.role} ·{' '}
                      <span className="text-accent-ink">{job.company}</span>
                    </h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                      {job.summary}
                    </p>
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
  const phrases = Array.from({ length: 8 })
  return (
    <section
      id="contact"
      className="scroll-mt-20 overflow-hidden border-t border-line-soft py-10 md:py-14"
    >
      <a
        href="mailto:gunel.ahmadovaaa@gmail.com"
        className="block"
        aria-label="Get in touch by email"
      >
        <div className="marquee" aria-hidden="true">
          {phrases.map((_, i) => (
            <span
              key={i}
              className={`display text-6xl whitespace-nowrap sm:text-7xl md:text-8xl ${
                i % 2 ? 'text-accent-ink' : ''
              }`}
            >
              Get in touch.
            </span>
          ))}
        </div>
      </a>
      <div className="mx-auto mt-14 max-w-6xl px-5 text-center md:px-8">
        <p className="mx-auto max-w-xl text-lg text-muted">
          Open to full-time roles and freelance projects: product design, UX
          research, or anywhere design meets code.
        </p>
        <a
          href="mailto:gunel.ahmadovaaa@gmail.com"
          className="btn-accent mt-8 inline-block rounded-full px-8 py-4 text-lg font-semibold"
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
                  className="link-sweep text-sm tracking-wide text-muted uppercase hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
        </ul>
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
      <RecentWork />
      <Services />
      <SelectedProjects />
      <About />
      <Experience />
      <Contact />
    </main>
  )
}
