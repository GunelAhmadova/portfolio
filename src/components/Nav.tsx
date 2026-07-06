import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../theme'

const sections = [
  { label: 'Work', hash: '#work' },
  { label: 'About', hash: '#about' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Contact', hash: '#contact' },
]

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-accent hover:text-on-accent"
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

  const goTo = (hash: string) => {
    if (pathname !== '/') {
      navigate('/' + hash)
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-soft bg-bg/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
        aria-label="Main"
      >
        <Link
          to="/"
          className="font-mono text-sm font-medium tracking-wide"
          aria-label="Gunel Ahmadova — home"
        >
          gunel<span className="text-accent-ink">.ahmadova</span>
          <span aria-hidden="true"> ©</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {sections.map((s) => (
              <li key={s.hash}>
                <button
                  type="button"
                  onClick={() => goTo(s.hash)}
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          <a
            href="mailto:gunel.ahmadovaaa@gmail.com"
            className="mr-1 hidden rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-on-accent transition-transform hover:scale-105 md:block"
          >
            Hire me
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
