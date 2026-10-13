import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '../theme'
import Avatar from './Avatar'

const sections = [
  { label: 'Work', hash: '#work' },
  { label: 'About', hash: '#about' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Contact', hash: '#contact' },
]

/** Scrollspy: which section is currently on screen (home page only) */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!enabled) {
      setActive('')
      return
    }
    const targets = sections
      .map((s) => document.querySelector(s.hash))
      .filter((el): el is Element => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive('#' + entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [enabled])

  return active
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
    >
      {dark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" />
          </g>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" fill="currentColor" />
        </svg>
      )}
    </button>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const active = useActiveSection(pathname === '/')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const goTo = (hash: string) => {
    setOpen(false)
    if (pathname !== '/') {
      navigate('/' + hash)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:pt-4">
      <nav
        aria-label="Main"
        className={`mx-auto flex h-14 max-w-3xl items-center justify-between rounded-full border pr-2 pl-2 transition-all duration-300 ${
          scrolled || open
            ? 'border-line-soft bg-surface/80 shadow-[var(--shadow-card)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1"
          aria-label="Gunel Ahmadova, home"
        >
          <Avatar size={36} status />
          <span className="text-sm leading-tight font-semibold">
            Gunel Ahmadova
            <span className="block text-xs font-normal text-muted">UX/UI Designer</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((s) => {
            const isActive = active === s.hash
            return (
              <li key={s.hash}>
                <button
                  type="button"
                  onClick={() => goTo(s.hash)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'bg-surface-2 text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-ink hidden rounded-full px-4 py-2 text-sm font-medium sm:inline-block"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-2 md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 8h16M4 16h16'}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="card mx-auto mt-2 max-w-3xl rounded-3xl p-2 md:hidden"
          >
            <ul>
              {sections.map((s) => (
                <li key={s.hash}>
                  <button
                    type="button"
                    onClick={() => goTo(s.hash)}
                    className="w-full rounded-2xl px-4 py-3 text-left text-lg hover:bg-surface-2"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ink mt-1 block rounded-2xl px-4 py-3 text-center font-medium"
                >
                  Download resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
