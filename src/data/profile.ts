export const profile = {
  name: 'Gunel Ahmadova',
  role: 'UX/UI Designer',
  location: 'Baku, Azerbaijan',
  email: 'gunel.ahmadovaaa@gmail.com',
  /** Drop a square photo into public/ (e.g. public/me.jpg) and set the path */
  photo: undefined as string | undefined,
  availability: 'Open to full-time roles',
  current: { role: 'UX/UI Designer', company: 'Webidea' },
  tagline:
    'I turn research into clear flows and dev-ready interfaces for fintech, SaaS and mobile products.',
  bio: [
    'I’m a UX/UI designer with 3 years of experience designing web and mobile products, from fintech and digital insurance to SaaS platforms with a CRM on one side and a consumer app on the other.',
    'Before design I studied software development, so I think in systems and states, not just screens. I research with real users, design in reusable components and hand off files developers actually enjoy building from.',
  ],
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gunel-ahmadova-27ab98257/' },
    { label: 'Behance', url: 'https://www.behance.net/gunelahmadova2' },
    { label: 'Upwork', url: 'https://www.upwork.com/freelancers/~0178427c98df975992' },
  ],
  stats: [
    { value: '3+', label: 'years designing products' },
    { value: '12+', label: 'shipped projects' },
    { value: '2', label: 'disciplines: design × code' },
  ],
  process: [
    { step: 'Research', text: 'Interviews, surveys, analytics' },
    { step: 'Define', text: 'Journeys, flows, information architecture' },
    { step: 'Design', text: 'Wireframes, UI, design systems' },
    { step: 'Test', text: 'Usability tests, A/B tests' },
    { step: 'Ship', text: 'Handoff and design QA with engineers' },
  ],
  /** Shown as a scrolling strip under the hero */
  clients: ['Webidea', 'Fitxlink', 'Andersen', 'Stadi10', 'Saf Takaful', 'Nevera Tech', 'Weblash', '2Feat', 'Entherno', 'Agrovod'],
  experience: [
    {
      company: 'Webidea',
      role: 'UX/UI Designer',
      period: 'Mar 2026 – Present',
      summary:
        'Redesigning Fitxlink, a B2B and B2C gym management SaaS: a CRM for gym owners and a mobile app for members. Research, A/B tests, user flows, the design system and developer handoff.',
    },
    {
      company: 'Andersen',
      role: 'UX/UI Designer',
      period: 'Oct 2025 – Mar 2026',
      summary:
        'Designed UX/UI for a fintech product in a cross-functional Agile team, working with international stakeholders.',
    },
    {
      company: 'Stadi10',
      role: 'Product Designer',
      period: 'Oct 2024 – Feb 2026',
      summary:
        'UX research and product design for Stadi10 Business, a CRM for businesses, and Stadi10, the customer-facing app.',
    },
    {
      company: 'Contract Projects (Upwork)',
      role: 'UX/UI Designer & UX Researcher',
      period: 'May 2024 – Feb 2026',
      summary:
        'Saf Takaful, a Sharia-compliant digital insurance platform; 2Feat for the U.S. market; Entherno’s website; Agrovod’s mobile app.',
    },
    {
      company: 'Nevera Tech',
      role: 'UX/UI Designer & Researcher',
      period: 'Dec 2023 – Nov 2024',
      summary:
        'Improved the user experience of the Aloha Live app through research and user-centered design.',
    },
    {
      company: 'Weblash',
      role: 'UX/UI Designer',
      period: 'Sep 2023 – Sep 2025',
      summary:
        'Data-informed design for web and mobile projects, working directly with clients.',
    },
  ],
  education: [
    { school: 'Code Academy', degree: 'UX/UI Design (Honours)', period: '2023' },
    { school: 'Code Academy', degree: 'Software Development', period: '2022' },
    { school: 'Ganja State University', degree: 'BSc & MSc with honours', period: '2012 – 2018' },
  ],
  certificates: [
    { name: 'Journey Mapping', issuer: 'IxDF', year: '2025' },
    { name: 'Agile Methods for UX Design', issuer: 'IxDF', year: '2025' },
    { name: 'Design for the 21st Century with Don Norman', issuer: 'IxDF', year: '2025' },
  ],
  skills: {
    design: [
      'User Research',
      'Usability Testing',
      'A/B Testing',
      'Journey Mapping',
      'Information Architecture',
      'Prototyping',
      'Design Systems',
      'Mobile & Web UI',
    ],
    tools: [
      'Figma',
      'FigJam',
      'Jira',
      'Miro',
      'Maze',
      'Microsoft Clarity',
      'Google Analytics',
      'Mixpanel',
      'Notion',
    ],
    development: ['JavaScript', 'HTML', 'CSS', 'SASS', '.NET', 'MSSQL', 'Git'],
  },
  languages: ['Azerbaijani (Native)', 'English (Intermediate)', 'Russian (Elementary)'],
}
