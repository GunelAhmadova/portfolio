import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { featuredProjects } from '../data/projects'

export default function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4 md:px-8">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="font-semibold">{profile.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            {profile.role} based in {profile.location}.
          </p>
        </div>
        <div>
          <p className="kicker mb-4">Case studies</p>
          <ul className="space-y-2 text-sm">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <Link to={`/work/${p.slug}`} className="link-sweep text-muted hover:text-ink">
                  {p.title.split(':')[0]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-sweep text-muted hover:text-ink"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
            <li>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="link-sweep text-muted hover:text-ink">
                Resume (PDF) ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="kicker mb-4">Say hello</p>
          <a href={`mailto:${profile.email}`} className="link-sweep text-sm break-all">
            {profile.email}
          </a>
          <p className="mt-2 text-sm text-muted">{profile.location}</p>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl justify-between border-t border-line-soft px-5 py-6 text-xs text-muted md:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Designed in Figma, built with React</p>
      </div>
    </footer>
  )
}
