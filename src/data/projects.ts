export type Project = {
  slug: string
  title: string
  category: string
  year: string
  client?: string
  role: string
  tools: string[]
  featured: boolean
  /** Two hues used for the generated cover art until real images are added */
  hue: [string, string]
  /** Optional real cover image, e.g. `/projects/<slug>/cover.png` */
  cover?: string
  /** Optional gallery images shown on the case-study page */
  gallery?: string[]
  behanceUrl?: string
  /** Optional closing "what I learned" section on the case-study page */
  reflection?: string
  summary: string
  sections: {
    overview: string
    problem: string
    process: string
    solution: string
    outcome: string
  }
  /** Live product link shown as a button on cards and case studies */
  liveUrl?: string
  liveLabel?: string
  /** 'inset' shows the whole cover on a coloured stage instead of cropping it */
  coverFit?: 'cover' | 'inset'
  coverBg?: string
  /** Phone screens rendered on a coloured stage instead of a flat cover */
  showcase?: { bg: string; screens: CSImage[] }
  /** Long-form case study; when present the project page uses the rich layout */
  caseStudy?: CaseStudy
}

export type CSImage = {
  src: string
  alt: string
  caption?: string
  /** The image already contains a device frame */
  framed?: boolean
}

export type CSBlock =
  | { type: 'text'; id: string; label: string; title: string; body: string[] }
  | {
      type: 'cards'
      id: string
      label: string
      title: string
      intro?: string
      items: { title: string; text: string }[]
    }
  | {
      type: 'gallery'
      layout: 'phones' | 'wide' | 'grid' | 'scroll'
      tone: 'brand' | 'dark' | 'light'
      /** Tile shape for the grid layout (default: tall) */
      shape?: 'tall' | 'wide'
      images: CSImage[]
      caption?: string
    }
  /** Content still to be supplied; only rendered in development */
  | { type: 'todo'; title: string; text: string }

export type CaseStudy = {
  intro: string
  meta: { label: string; value: string }[]
  blocks: CSBlock[]
}

// ---------------------------------------------------------------------------
// EDIT ME: every word on the site about your projects lives in this file.
// Replace placeholder copy with your real case-study text, drop images into
// public/projects/<slug>/ and set `cover` / `gallery` paths.
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: 'fitxlink',
    title: 'Fitxlink: Fitness Club Super-App',
    category: 'SaaS · Mobile app · CRM',
    year: '2026',
    client: 'FITXLINK LLC, via Webidea',
    role: 'UX/UI Designer',
    tools: ['Figma', 'FigJam', 'Jira'],
    featured: true,
    hue: ['#a775fd', '#5b4cd6'],
    cover: '/projects/fitxlink/cover.jpg',
    coverFit: 'inset',
    coverBg: 'linear-gradient(135deg, #a775fd 0%, #c19dfd 100%)',
    liveUrl: 'https://apps.apple.com/az/app/fitxlink/id6748416112',
    liveLabel: 'App Store',
    summary:
      'A fitness app for gyms and studios. Members train, follow coaches and buy programs; owners run their club from a web CRM. I’m redesigning both.',
    sections: {
      overview: 'A fitness app for gyms and studios, with a CRM for owners and an iOS app for members.',
      problem: 'A growing list of features had to feel like one product.',
      process: 'Interviews, surveys, usability tests and A/B tests with owners and members.',
      solution: 'A new home screen, clearer workouts and store, and one design system.',
      outcome: 'In progress, shipping in stages.',
    },
    caseStudy: {
      intro:
        'Fitxlink is a fitness app for gyms, martial arts clubs, boxing and pilates studios, built by FITXLINK LLC in Houston. Members use the iOS app to train, follow coaches, buy programs and see how busy their gym is. Owners manage the club from a web CRM. I joined Webidea in March 2026 to redesign both.',
      meta: [
        { label: 'Role', value: 'UX/UI Designer' },
        { label: 'Company', value: 'Webidea, for FITXLINK LLC' },
        { label: 'Timeline', value: 'Mar 2026 – now' },
        { label: 'Platforms', value: 'iOS app, web CRM' },
      ],
      blocks: [
        {
          type: 'text',
          id: 'challenge',
          label: 'Challenge',
          title: 'A product that grew one feature at a time',
          body: [
            'Since the launch in August 2025, almost every update added something: live gym occupancy, membership history, a store, a support centre. All useful, but the app was starting to feel like a list of features instead of one product.',
            'My job is to pull it back together, for the owner checking today’s numbers and for the member who just wants to start a workout.',
          ],
        },
        {
          type: 'cards',
          id: 'research',
          label: 'Research',
          title: 'How I’m researching it',
          items: [
            { title: 'Interviews', text: 'Talking to gym owners and members about their routines and what annoys them in the app.' },
            { title: 'Surveys', text: 'Checking whether what I hear in interviews holds up across more people.' },
            { title: 'Usability tests', text: 'Testing key flows with both groups before they go to development.' },
            { title: 'A/B tests', text: 'Comparing two versions on live flows when the answer isn’t obvious.' },
          ],
        },
        {
          type: 'text',
          id: 'home',
          label: 'Home',
          title: 'A home screen that helps you decide when to go',
          body: [
            'The new home screen starts with the gym itself: a live occupancy chart for today, then today’s workout plan with one button to start it. Offers from your gym sit at the top as stories.',
            'The store and the blog move further down. They are still one scroll away, but they no longer push the workout out of sight.',
          ],
        },
        {
          type: 'gallery',
          layout: 'scroll',
          tone: 'brand',
          images: [{ src: '/projects/fitxlink/home-full.jpg', alt: 'Fitxlink home screen, full length', caption: 'Home, full screen' }],
          caption: 'Hover to scroll through the full screen.',
        },
        {
          type: 'text',
          id: 'workouts',
          label: 'Workouts',
          title: 'Workouts you can follow with sweaty hands',
          body: [
            'The workout screen shows the week, today’s exercises with sets and reps, and a progress card that stays pinned to the bottom with the timer, End and Resume.',
            'Ending a workout asks for confirmation and shows what will be saved, so nobody loses a session by tapping the wrong button.',
          ],
        },
        {
          type: 'gallery',
          layout: 'phones',
          tone: 'brand',
          images: [
            { src: '/projects/fitxlink/workout.jpg', alt: 'Workout screen', framed: true, caption: 'Workout' },
            { src: '/projects/fitxlink/purchased.jpg', alt: 'Purchased workouts screen', caption: 'Purchased workouts' },
            { src: '/projects/fitxlink/favorites.jpg', alt: 'Favorites screen', caption: 'Favorites' },
          ],
        },
        {
          type: 'gallery',
          layout: 'wide',
          tone: 'dark',
          images: [{ src: '/projects/fitxlink/controls.jpg', alt: 'Pinned workout controls with progress ring, timer, End and Resume buttons' }],
        },
        {
          type: 'text',
          id: 'store',
          label: 'Store & coaches',
          title: 'Paid programs and coaches',
          body: [
            'Members can buy programs from trainers inside the app, so prices have to be clear. Every workout card now uses the same three states: free, paid, or discounted with the old price crossed out.',
            'For trainer cards I tried a compact row, a big photo card and a card that leads with rating, clients and availability.',
          ],
        },
        {
          type: 'gallery',
          layout: 'grid',
          tone: 'dark',
          images: [
            { src: '/projects/fitxlink/end-workout.jpg', alt: 'End workout confirmation bottom sheet', framed: true, caption: 'End workout' },
            { src: '/projects/fitxlink/discount-price.jpg', alt: 'Discounted trainer workout card', caption: 'Discount price' },
            { src: '/projects/fitxlink/trainer-carousel.jpg', alt: 'Trainer workouts carousel with free and paid cards', caption: 'Trainer workouts' },
          ],
        },
        {
          type: 'gallery',
          layout: 'grid',
          tone: 'dark',
          images: [
            { src: '/projects/fitxlink/trainer-v1.jpg', alt: 'Trainer card, compact version', caption: 'Compact' },
            { src: '/projects/fitxlink/trainer-v2.jpg', alt: 'Trainer card, photo version', caption: 'Photo' },
            { src: '/projects/fitxlink/trainer-v3.jpg', alt: 'Trainer card, social version', caption: 'Social' },
          ],
        },
        {
          type: 'text',
          id: 'system',
          label: 'Design system',
          title: 'One set of components for the app and the CRM',
          body: [
            'Dark surfaces, one purple for actions, and lime only for live things like timers and active days. Cards, pills and bottom sheets are shared Figma components, so the app and the CRM stay consistent and handoff is predictable.',
          ],
        },
        {
          type: 'gallery',
          layout: 'grid',
          tone: 'dark',
          images: [
            { src: '/projects/fitxlink/trainer-follow.jpg', alt: 'Trainer follow and following card states', caption: 'Follow states' },
            { src: '/projects/fitxlink/rest-day.jpg', alt: 'Workout plan calendar with rest-day card', caption: 'Rest day' },
          ],
        },
        {
          type: 'todo',
          title: 'CRM screens',
          text: 'Add 2–3 screens from the owner CRM (web).',
        },
        {
          type: 'text',
          id: 'status',
          label: 'Status',
          title: 'Where it is now',
          body: ['The redesign ships in stages. I’ll add results here as each part goes live.'],
        },
        {
          type: 'todo',
          title: 'Results',
          text: 'Add real numbers when you have them: task success in tests, A/B test results, fewer support tickets.',
        },
      ],
    },
  },
  {
    slug: 'stadi10',
    title: 'Stadi10: Football App & Venue CRM',
    category: 'Sports · Mobile app · CRM',
    year: '2024 – 2026',
    client: 'Stadi10',
    role: 'Product Designer',
    tools: ['Figma', 'FigJam'],
    featured: true,
    hue: ['#22c55e', '#052e16'],
    liveUrl: 'https://testflight.apple.com/join/UkAQC646',
    liveLabel: 'TestFlight',
    summary:
      'A football app for amateur players in Baku: book a pitch, find players, build a team and find opponents. Venues manage bookings in Stadi10 Business.',
    showcase: {
      bg: 'radial-gradient(120% 120% at 15% 0%, #4ade80 0%, #16a34a 45%, #052e16 100%)',
      screens: [
        { src: '/projects/stadi10/home.jpg', alt: 'Stadi10 home screen' },
        { src: '/projects/stadi10/stadium.jpg', alt: 'Stadi10 stadium page with booking details' },
        { src: '/projects/stadi10/find-player.jpg', alt: 'Stadi10 find a player screen' },
      ],
    },
    sections: {
      overview: 'A football app for amateur players, with a CRM for venues.',
      problem: 'Organising a casual game takes too many calls and messages.',
      process: 'Research with players and venue owners, journeys and information architecture.',
      solution: 'Booking, finding players and teams, and one calendar for everything.',
      outcome: 'Case study in progress.',
    },
    caseStudy: {
      intro:
        'Stadi10 is a football app for amateur players in Baku. Players book pitches, find people for a game, build teams and look for opponents. The venues manage bookings in Stadi10 Business, a separate CRM. I was the product designer on both from October 2024 to February 2026.',
      meta: [
        { label: 'Role', value: 'Product Designer' },
        { label: 'Timeline', value: 'Oct 2024 – Feb 2026' },
        { label: 'Products', value: 'Stadi10 app, Stadi10 Business' },
        { label: 'Language', value: 'Azerbaijani' },
      ],
      blocks: [
        {
          type: 'text',
          id: 'challenge',
          label: 'Challenge',
          title: 'Organising a game is harder than playing it',
          body: [
            'For a casual match you need a free pitch, enough players, sometimes a team to play against, and everyone there at the same time. Usually that means phone calls and group chats.',
            'Stadi10 had to make each of those steps quick, for people who just want to get on the pitch.',
          ],
        },
        {
          type: 'cards',
          id: 'research',
          label: 'Research',
          title: 'Talking to both sides',
          items: [
            { title: 'Players', text: 'How they organise games today, how they pick a pitch and where it goes wrong.' },
            { title: 'Venue owners', text: 'How they take bookings and what they need to see in the business app.' },
            { title: 'Journeys', text: 'Mapping each flow, from finding a pitch to the game itself, before designing screens.' },
          ],
        },
        {
          type: 'gallery',
          layout: 'phones',
          tone: 'brand',
          images: [
            { src: '/projects/stadi10/onboarding.jpg', alt: 'Stadi10 onboarding screen', caption: 'Onboarding' },
            { src: '/projects/stadi10/home.jpg', alt: 'Stadi10 home screen', caption: 'Home' },
            { src: '/projects/stadi10/stadium.jpg', alt: 'Stadi10 stadium page', caption: 'Stadium' },
          ],
        },
        {
          type: 'text',
          id: 'booking',
          label: 'Booking',
          title: 'Booking a pitch',
          body: [
            'Players filter stadiums by district, date, time and format: 6v6, 7v7 or 8v8. A stadium page shows the hours, the address and the price per hour, and lets you choose a specific pitch.',
            'Bookings, games and requests all end up in one calendar, so nobody has to remember where they agreed to play.',
          ],
        },
        {
          type: 'gallery',
          layout: 'grid',
          tone: 'light',
          images: [
            { src: '/projects/stadi10/filter.jpg', alt: 'Stadium filter by district, date, time and format', caption: 'Filter' },
            { src: '/projects/stadi10/calendar.jpg', alt: 'Calendar with upcoming reservations', caption: 'Calendar' },
          ],
        },
        {
          type: 'text',
          id: 'players',
          label: 'Players & teams',
          title: 'Finding players and opponents',
          body: [
            'If a team is short of players, the captain posts an ad. Players browse ads as large cards with position, age, preferred days, area and time, and can call the organiser straight from the card.',
            'Profiles keep the details a captain cares about: position, height, weight and stronger foot.',
          ],
        },
        {
          type: 'gallery',
          layout: 'phones',
          tone: 'brand',
          images: [
            { src: '/projects/stadi10/find-player.jpg', alt: 'Find a player screen', caption: 'Find a player' },
            { src: '/projects/stadi10/position.jpg', alt: 'Choosing a player position', caption: 'Player position' },
            { src: '/projects/stadi10/profile.jpg', alt: 'Profile and settings', caption: 'Profile' },
          ],
        },
        {
          type: 'gallery',
          layout: 'scroll',
          tone: 'light',
          images: [
            { src: '/projects/stadi10/home-full.jpg', alt: 'Stadi10 home screen, full length', caption: 'Home' },
            { src: '/projects/stadi10/stadium-full.jpg', alt: 'Stadium page, full length', caption: 'Stadium' },
            { src: '/projects/stadi10/calendar-full.jpg', alt: 'Calendar, full length', caption: 'Calendar' },
          ],
          caption: 'Hover to scroll through the full screens.',
        },
        {
          type: 'text',
          id: 'system',
          label: 'Components',
          title: 'One component library for both apps',
          body: [
            'The player app and Stadi10 Business are built from the same components, so a pattern people learn in one works the same way in the other.',
          ],
        },
        {
          type: 'todo',
          title: 'Stadi10 Business',
          text: 'Add 2–3 screens from the business CRM (the Figma link only had the player app).',
        },
        {
          type: 'todo',
          title: 'Outcome',
          text: 'Add what launched and what changed, with numbers if you have them.',
        },
      ],
    },
  },
  {
    slug: 'takaful',
    title: 'Takaful: Insurance Platform',
    category: 'Fintech · Web platform',
    year: '2026',
    client: 'Takaful (takaful.az)',
    role: 'UX/UI Designer',
    tools: ['Figma'],
    featured: true,
    hue: ['#2dd4bf', '#0ea5e9'],
    cover: '/projects/takaful/cover.png',
    liveUrl: 'https://takaful.az/',
    liveLabel: 'takaful.az',
    behanceUrl:
      'https://www.behance.net/gallery/252516547/Takaful-Insurance-Platform-UXUI-Design',
    summary:
      'A web platform for Takaful insurance, making policies easy to understand, compare and buy online.',
    sections: {
      overview:
        'Takaful is an insurance platform (takaful.az). The project covers the full web experience: discovering insurance products, understanding coverage, getting a quote and purchasing a policy online.',
      problem:
        'Insurance is full of unfamiliar terms and fine print. Users struggle to understand what is covered, compare products fairly and trust an online purchase with something as important as insurance.',
      process:
        'Analysed the insurance domain and competitor platforms, mapped the journey from first visit to purchased policy, structured the content around plain-language explanations, then designed the full UI in Figma.',
      solution:
        'Clear product pages that explain coverage in plain words, a guided quote flow with transparent pricing, and a calm, trustworthy visual language suited to a financial product.',
      outcome:
        'A complete fintech web platform design, published as a full case study on Behance in 2026.',
    },
  },
  {
    slug: 'entherno',
    title: 'Entherno: Digital Agency Website',
    category: 'Agency · Web redesign',
    year: '2024',
    client: 'Entherno (via Upwork)',
    role: 'UX/UI Designer',
    tools: ['Figma', 'Hotjar'],
    featured: true,
    hue: ['#8b5cf6', '#22d3ee'],
    cover: '/projects/entherno/cover.webp',
    liveUrl: 'https://entherno.com/',
    liveLabel: 'entherno.com',
    behanceUrl: 'https://www.behance.net/gallery/233229647/Entherno-Digital-Agency-httpsenthernocom',
    summary:
      'A full website redesign for a digital agency, sharper positioning, a portfolio that sells, and a contact flow that converts.',
    sections: {
      overview:
        'Entherno needed a site that matched the quality of work they deliver. I redesigned the site end-to-end, collaborating directly with their developers.',
      problem:
        'The old site undersold the agency: generic messaging, a flat portfolio grid and no clear path from “interested” to “in contact”.',
      process:
        'Stakeholder interviews to define positioning, competitor teardown, content-first wireframes, then high-fidelity design with a component system the dev team could implement quickly.',
      solution:
        'A bold landing narrative, case-study-driven portfolio pages, social proof placed at decision points and a simplified inquiry flow.',
      outcome:
        'Shipped with the development team; the new structure gives every service a conversion path and the brand a credible, modern face.',
    },
  },
  {
    slug: 'birbank-biznes',
    title: 'Birbank Biznes: Internet Banking Redesign',
    category: 'Fintech · Web platform',
    year: '2025',
    client: 'Birbank Biznes',
    role: 'UX/UI Designer',
    tools: ['Figma', 'FigJam', 'Maze'],
    featured: true,
    hue: ['#4f6bff', '#c8f04b'],
    cover: '/projects/birbank-biznes/cover.webp',
    behanceUrl: 'https://www.behance.net/gallery/227349157/Birbank-Biznes-Internet-Banking-Redesign',
    summary:
      'A ground-up redesign of a business internet-banking platform, simplifying complex financial workflows for busy company owners and accountants.',
    sections: {
      overview:
        'Birbank Biznes is an internet-banking platform for businesses. The redesign focused on making everyday operations, payments, payroll, statements, faster and less error-prone.',
      problem:
        'The legacy interface buried frequent tasks under deep menus, used inconsistent patterns between modules, and made bulk operations slow and stressful for accountants working under deadlines.',
      process:
        'Interviewed business users, mapped current journeys for the highest-frequency tasks, ran a card sort on the navigation, and validated wireframes with usability tests before moving to high-fidelity design.',
      solution:
        'A task-first dashboard, a unified payment flow with inline validation, redesigned navigation grouped by job-to-be-done, and a consistent component library shared across all modules.',
      outcome:
        'Cleaner task flows and consistent patterns reduced steps in the core payment journey and improved first-time task completion in usability tests.',
    },
  },
  {
    slug: 'botox-mobile-app',
    title: 'Botex: Product Search & Price Comparison App',
    category: 'E-commerce · Mobile app',
    year: '2024',
    client: 'Hackathon project (6 hours)',
    role: 'UX/UI Designer',
    tools: ['Figma', 'Notion'],
    featured: false,
    hue: ['#ff7ab6', '#7ae2ff'],
    cover: '/projects/botox-mobile-app/cover.webp',
    behanceUrl: 'https://www.behance.net/gallery/236090807/Botox-Mobile-app-Hackathon',
    summary:
      'Designed in a 6-hour hackathon: search any product, compare prices, see exactly what it costs to bring it from Amazon, commission included, and order in a few taps.',
    sections: {
      overview:
        'Botex is a mobile app concept designed end-to-end in just 6 hours during a hackathon. It lets users search for a product, compare prices across sources, and see the full landed cost of ordering it from Amazon before committing.',
      problem:
        'Shoppers who order products from abroad rarely know the real final price: the item cost, the delivery fee and the middleman commission are scattered, so the total only becomes clear after it is too late to back out.',
      process:
        'With only 6 hours, the team ran a rapid scoping session, cut the product to one core journey (search → compare → total cost → order), sketched the flow together and moved straight to high-fidelity screens in Figma.',
      solution:
        'A search-first home screen, side-by-side price comparison, and a transparent cost breakdown showing the Amazon price, delivery and commission as one final figure. If the price fits, a lightweight social sign-in gets the user to the order in seconds.',
      outcome:
        'A complete, working concept delivered under extreme time pressure. It earned 77 appreciations on Behance and shows how much product thinking can fit into a 6-hour sprint.',
    },
  },
  {
    slug: 'popxeber',
    title: 'Popxeber: News as Music',
    category: 'Media · Mobile app',
    year: '2024',
    role: 'UX/UI Designer',
    tools: ['Figma'],
    featured: false,
    hue: ['#ffb84d', '#ff5470'],
    cover: '/projects/popxeber/cover.webp',
    behanceUrl: 'https://www.behance.net/gallery/236057359/Popxeber-News-as-Music',
    summary:
      'An experimental news product that treats headlines like a playlist, listen to the day’s news the way you stream music.',
    sections: {
      overview:
        'Popxeber reimagines news consumption for people who commute, exercise or multitask: news stories become playable audio tracks organised into playlists.',
      problem:
        'Reading long articles doesn’t fit busy routines, and podcast apps aren’t built for short-form, always-fresh news items.',
      process:
        'Explored music-player mental models, prototyped playlist-style news feeds, and tested whether users understood “playing” a headline without instruction.',
      solution:
        'A familiar player UI applied to news: daily mixes, topic playlists, queue management and background listening, with clear source attribution for trust.',
      outcome:
        'A distinctive concept piece showing interaction-design range: borrowing a proven mental model and applying it to a new domain.',
    },
  },
  {
    slug: 'outfiz',
    title: 'OUTFIZ: Daily Outfit Planner App',
    category: 'Lifestyle · Mobile app',
    year: '2023',
    role: 'UX/UI Designer',
    tools: ['Figma', 'Notion'],
    featured: false,
    hue: ['#f43f5e', '#fbbf24'],
    cover: '/projects/outfiz/cover.jpg',
    behanceUrl: 'https://www.behance.net/gallery/194933751/Mobile-App-OUTFIZ',
    summary:
      'A daily outfit planner with affiliate shopping: plan what to wear every day, build looks from your wardrobe and shop missing pieces through affiliate links.',
    sections: {
      overview:
        'OUTFIZ is a mobile app (65+ screens) that helps people plan their daily outfits. Users organise their wardrobe, put together looks for the days ahead, and discover new pieces they can buy through affiliate partner stores.',
      problem:
        'Deciding what to wear every morning wastes time and energy, and most fashion apps focus on selling, not on helping people actually use the clothes they already own.',
      process:
        'User research on morning routines and outfit decisions, journey mapping from wardrobe to daily look, wireframe testing of the planner calendar, then a full UI system across 65+ screens.',
      solution:
        'A visual wardrobe, a drag-and-drop outfit planner with a weekly calendar, weather-aware suggestions, and an affiliate marketplace that recommends items completing a planned look.',
      outcome:
        'A complete, portfolio-defining case study demonstrating end-to-end product design: research, flows, a 65+ screen UI system and an affiliate monetisation model.',
    },
  },
  {
    slug: '2feat',
    title: '2Feat: Influencer × Brand Platform',
    category: 'Social commerce · Web',
    year: '2024',
    client: '2Feat.com (via Upwork)',
    role: 'UX/UI Designer',
    tools: ['Figma', 'Google Analytics'],
    featured: false,
    hue: ['#34d399', '#60a5fa'],
    cover: '/projects/2feat/cover.webp',
    behanceUrl: 'https://www.behance.net/gallery/203920867/2Featcom-website-redesign-Freelance-project-UXUI',
    summary:
      'Redesigning a U.S.-market platform that connects influencers with brands, clearer value, smoother matching, more signups.',
    sections: {
      overview:
        'A freelance engagement to redesign 2Feat for the U.S. market, adding new features while modernising the whole experience.',
      problem:
        'The platform’s value proposition was unclear to both sides of its marketplace, and key flows, profile creation, campaign matching, had high drop-off.',
      process:
        'Analytics review to locate drop-off, quick user interviews on both audiences, competitive analysis of creator marketplaces, then iterative redesign of the core flows.',
      solution:
        'Separate, focused onboarding for creators and brands, a redesigned matching experience, and clearer campaign pages with transparent expectations on both sides.',
      outcome:
        'Delivered a redesign tailored for the U.S. market with new features shaped directly by analytics and user feedback.',
    },
  },
  {
    slug: 'sales-dashboard',
    title: 'Sales Management Dashboard',
    category: 'SaaS · Dashboard',
    year: '2024',
    role: 'UX/UI Designer',
    tools: ['Figma'],
    featured: false,
    hue: ['#38bdf8', '#a78bfa'],
    cover: '/projects/sales-dashboard/cover.webp',
    behanceUrl: 'https://www.behance.net/gallery/220599107/Sales-Managment-Dashboard-UXUI-Case-Study',
    summary:
      'A data-dense sales dashboard designed for scanning, not staring, KPIs, pipeline and team performance in one calm view.',
    sections: {
      overview:
        'A UX/UI case study for a sales-management dashboard balancing data density with clarity.',
      problem:
        'Sales managers juggle pipeline, targets and team activity across tools; most dashboards drown the one number that matters in twenty that don’t.',
      process:
        'Defined the questions each role asks daily, prioritised metrics per persona, tested layout hierarchies in grayscale before adding visual design.',
      solution:
        'A hierarchy-first layout: headline KPIs, then trends, then drill-downs, with consistent chart styling and readable data-viz color choices.',
      outcome:
        'A case study in information architecture for data products, from metric prioritisation to final UI.',
    },
  },
  {
    slug: 'agrovod',
    title: 'AgroVod: Plant Care Mobile App',
    category: 'AgTech · Mobile app',
    year: '2024',
    client: 'Agrovod (via Upwork)',
    role: 'UX/UI Designer',
    tools: ['Figma'],
    featured: false,
    hue: ['#4ade80', '#facc15'],
    cover: '/projects/agrovod/cover.webp',
    behanceUrl: 'https://www.behance.net/gallery/214789193/AgroVod-Plant-Mobile-App',
    summary:
      'A friendly interface for smart plant care and irrigation, making agricultural tech approachable for everyday growers.',
    sections: {
      overview:
        'AgroVod helps growers monitor and water their plants. The engagement focused on making a technical product feel simple.',
      problem:
        'Agricultural tools tend to expose raw sensor data; non-technical users need guidance, not graphs.',
      process:
        'Simplified the mental model to “plants, not sensors”, prototyped a card-based home screen and validated it with target users.',
      solution:
        'Plant-first cards with plain-language status, actionable watering suggestions and gentle alerts instead of raw telemetry.',
      outcome:
        'Delivered a user-friendly interface that improved usability for the client’s core audience.',
    },
  },
  {
    slug: 'techjob',
    title: 'TECHJOB: Tech Job Search Platform',
    category: 'Career · Web platform',
    year: '2023',
    role: 'UX/UI Designer',
    tools: ['Figma', 'Notion'],
    featured: false,
    hue: ['#818cf8', '#f472b6'],
    summary:
      'A job-search platform for tech talent, transparent listings, honest filters and an application flow that respects candidates.',
    sections: {
      overview:
        'TECHJOB is a job platform concept focused on the candidate experience in tech hiring.',
      problem:
        'Job seekers face vague listings, redundant application forms and zero feedback, a journey full of dead ends.',
      process:
        'Mapped the candidate journey pain points, researched what information actually drives apply decisions, and tested listing-page layouts.',
      solution:
        'Salary-transparent listings, one-profile-many-applications, status tracking and honest filters (remote, stack, seniority) that work.',
      outcome:
        'A complete platform case study covering search, listing, application and tracking experiences.',
    },
  },
  {
    slug: 'paypod',
    title: 'PayPod: Digital Wallet App',
    category: 'Fintech · Mobile app',
    year: '2023',
    role: 'UX/UI Designer',
    tools: ['Figma'],
    featured: false,
    hue: ['#2dd4bf', '#c8f04b'],
    summary:
      'A digital wallet designed for speed and trust, send, split and track money with zero confusion about where it went.',
    sections: {
      overview:
        'PayPod is a digital-wallet concept covering payments, transfers and spending insight.',
      problem:
        'Wallet apps often hide fees, bury transaction context and make simple actions (split a bill, request money) multi-step chores.',
      process:
        'Benchmarked leading wallets, mapped the “send money” journey to its minimum steps, and designed for glanceable trust: every screen answers “where is my money?”',
      solution:
        'Three-tap transfers, human-readable transaction history, upfront fees and built-in bill splitting.',
      outcome:
        'A fintech case study demonstrating flows where trust and speed are the primary design materials.',
    },
  },
  {
    slug: 'chobani-landing',
    title: 'Chobani: Landing Page Redesign',
    category: 'FMCG · Landing page',
    year: '2024',
    role: 'UX/UI Designer',
    tools: ['Figma'],
    featured: false,
    hue: ['#86efac', '#fda4af'],
    cover: '/projects/chobani-landing/cover.webp',
    behanceUrl: 'https://www.behance.net/gallery/210349067/Chobani-Landing-Page-Redesign',
    summary:
      'A fresh, appetite-driven landing page concept for Chobani, bold food photography, playful motion and a clear product story.',
    sections: {
      overview:
        'A self-initiated redesign of the Chobani landing experience focused on brand warmth and product discovery.',
      problem:
        'The original page mixed corporate messaging with product content, weakening both the brand story and the path to products.',
      process:
        'Content audit, moodboarding around “fresh and honest”, then iterative visual explorations tested for hierarchy and scannability.',
      solution:
        'A hero built on appetite appeal, a guided product-line showcase and a story section that earns the scroll.',
      outcome:
        'A visual-design showcase piece demonstrating brand-led landing page craft.',
    },
  },
  {
    slug: 'ai-image-generator',
    title: 'AI Image Generator: Landing Page',
    category: 'AI · Landing page',
    year: '2024',
    role: 'UX/UI Designer',
    tools: ['Figma'],
    featured: false,
    hue: ['#c084fc', '#22d3ee'],
    cover: '/projects/ai-image-generator/cover.webp',
    summary:
      'A landing page for an AI image tool, showing, not telling, what the product can generate.',
    sections: {
      overview:
        'A landing page concept for an AI image-generation product aimed at creators.',
      problem:
        'AI tools all claim magic; users only believe output they can see, and most landings hide it below the fold.',
      process:
        'Analysed converting AI-product landings, prioritised gallery-first storytelling and drafted copy around user outcomes rather than model features.',
      solution:
        'An output-first hero, interactive style gallery, transparent pricing and a try-it CTA above the fold.',
      outcome:
        'A conversion-focused landing concept rounding out the visual-design side of the portfolio.',
    },
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const moreProjects = projects.filter((p) => !p.featured)

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
