import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../theme'

const sections = [
  { label: 'About', hash: '#about' },
  { label: 'Services', hash: '#services' },
  { label: 'Projects', hash: '#projects' },
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent-ink hover:text-accent-ink"
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
          <path
            d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const active = useActiveSection(pathname === '/')

  const goTo = (hash: string) => {
    if (pathname !== '/') {
      navigate('/' + hash)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
        aria-label="Main"
      >
        <Link
          to="/"
          className="font-display text-xl font-bold tracking-tight"
          aria-label="Gunel Ahmadova, home"
        >
          gunel<span className="text-accent-ink">.</span>
        </Link>

        <ul className="hidden items-center gap-2 sm:flex">
          {sections.map((s) => {
            const isActive = active === s.hash
            return (
              <li key={s.hash}>
                <button
                  type="button"
                  onClick={() => goTo(s.hash)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`link-sweep px-2 py-1.5 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-ink active:translate-y-0 active:text-accent-ink ${
                    isActive
                      ? 'font-semibold text-accent-ink [background-size:100%_2px]'
                      : 'text-muted'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-accent rounded-full px-4 py-2 text-sm font-semibold"
          >
            Download resume →
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
