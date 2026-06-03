export const projects = [

  {

    id: 'ai-website-builder',

    featured: true,

    title: 'AI Website Builder',

    tagline: 'Ship production-ready sites from a single natural-language brief.',

    icon: 'Bot',

    problem:

      'Teams and builders lose days translating ideas into layout, copy, and deployable frontends—especially without a dedicated design or dev resource.',

    solution:

      'Designed a prompt-to-product pipeline: users describe intent, the system generates structured UI and content, and outputs deploy to production with minimal manual wiring.',

    systemFlow: [

      { label: 'User', detail: 'Natural-language site brief', icon: 'user' },

      { label: 'Frontend', detail: 'Next.js App Router + React', icon: 'frontend' },

      { label: 'Backend / API', detail: 'Server routes & output validation', icon: 'api' },

      { label: 'AI Service', detail: 'Gemini / Groq structured generation', icon: 'ai' },

      { label: 'Deploy', detail: 'Vercel production hosting', icon: 'deploy' },

    ],

    architecture: [

      'Next.js app router for SSR and fast iteration',

      'Gemini / Groq APIs for structured generation and refinement',

      'Component-level output with Tailwind-ready markup',

      'Vercel deployment for zero-config shipping',

    ],

    challenges: [

      'Hallucinated or invalid markup from LLM outputs required server-side validation and schema constraints',

      'Balancing generation latency vs. user-perceived speed on multi-step prompts',

      'Designing a prompt contract that reliably maps business intent to component trees',

      'Cost and rate-limit management across Gemini and Groq providers',

    ],

    outcomes: [
      'Reduced landing page setup from hours to minutes',
      'Generated deployable React and Next.js code',
      'Integrated Gemini and Groq for structured content generation',
      'Demonstrated production-ready AI workflow automation'
    ],

    impact: [

      'Cuts initial site scaffolding from hours to minutes',

      'Demonstrates end-to-end AI product integration, not a demo script',

      'Validates prompt engineering + guardrails for reliable UI output',

    ],

    images: [

      { id: 'ai-builder-hero', alt: 'AI Website Builder — prompt input screen', src: '', caption: 'Prompt-to-site entry (screenshot coming soon)' },

      { id: 'ai-builder-output', alt: 'Generated layout preview', src: '', caption: 'Generated UI preview (screenshot coming soon)' },

    ],

    tech: ['Next.js', 'React', 'Gemini API', 'Groq', 'Tailwind'],

    demo: 'https://ai-websitebuilder.vercel.app/',

    github: 'https://github.com/antariksh19/ai-builder.git',

  },

  {

    id: 'stegano-vault',

    featured: true,

    title: 'STEGANO-VAULT',

    tagline: 'Covert, authenticated payloads inside ordinary images.',

    icon: 'Lock',

    problem:

      'Sensitive text often travels over channels where encryption alone is visible—metadata and ciphertext patterns can still expose that a secret exists.',

    solution:

      'Built a dual-layer system: AES-256-GCM for confidentiality and integrity, plus LSB steganography with a custom 32-bit header so payloads hide inside benign image files.',

    systemFlow: [

      { label: 'User', detail: 'Uploads image & secret payload', icon: 'user' },

      { label: 'Frontend', detail: 'React SPA — keys & preview', icon: 'frontend' },

      { label: 'Backend', detail: 'Python encode / decode API', icon: 'backend' },

      { label: 'Database', detail: 'Ephemeral session state (stateless API)', icon: 'database' },

      { label: 'AI', detail: 'N/A — crypto pipeline (security-first)', icon: 'ai' },

    ],

    architecture: [

      'Python backend for crypto + steganography encode/decode',

      'React SPA for upload, preview, and key management UX',

      'Custom header format for payload length and integrity checks',

      'Client-side workflow with clear encrypt → embed → extract paths',

    ],

    challenges: [

      'Threat modeling: separating confidentiality (AES-GCM) from covertness (LSB) with documented assumptions',

      'Binary-safe payload embedding without corrupting image carriers across formats',

      'Key handling UX without persisting secrets server-side',

      'Integrity verification via custom 32-bit header under size limits of LSB capacity',

    ],

    outcomes: [

      'Hides existence of payload, not just content—security-in-depth for sensitive transfers',

      'Production cipher choice (AES-256-GCM) with documented encode/decode paths',

      'Showcases low-level binary handling paired with modern React UX',

    ],

    impact: [

      'Hides existence of payload, not just content (security in depth)',

      'Production-grade cipher choice (AES-256-GCM) with documented threat model',

      'Showcases low-level binary handling alongside modern web UX',

    ],

    images: [

      { id: 'stegano-upload', alt: 'STEGANO-VAULT upload and encrypt flow', src: '', caption: 'Encrypt & embed workflow (screenshot coming soon)' },

      { id: 'stegano-extract', alt: 'Payload extraction preview', src: '', caption: 'Extract & decrypt view (screenshot coming soon)' },

    ],

    tech: ['Python', 'React', 'AES-256-GCM', 'LSB Steganography'],

    demo: 'https://stegano-web.vercel.app/',

    github: 'https://github.com/antariksh19/stegano-web.git',

  },

  {

    id: 'dozo',

    featured: true,

    title: 'Dozo',

    tagline: 'Medication adherence that fits real daily routines on Android.',

    icon: 'Smartphone',

    problem:

      'Missed doses drive poor outcomes, yet most reminder apps treat schedules as static lists—not how people actually take medication over time.',

    solution:

      'Shipped a cloud-native Android product with Firebase auth, Compose UI, and adherence flows tuned for recurring schedules, notifications, and account sync across devices.',

    systemFlow: [

      { label: 'User', detail: 'Patient on Android device', icon: 'user' },

      { label: 'Frontend', detail: 'Kotlin + Jetpack Compose UI', icon: 'mobile' },

      { label: 'Backend', detail: 'Firebase Auth + Cloud Functions patterns', icon: 'backend' },

      { label: 'Database', detail: 'Firestore schedule sync', icon: 'database' },

      { label: 'AI', detail: 'Smart reminders (rules-based; ML-ready)', icon: 'ai' },

    ],

    architecture: [

      'Kotlin + Jetpack Compose for declarative, accessible UI',

      'Firebase Authentication for secure identity',

      'Firestore / cloud sync for cross-device schedule state',

      'Notification pipeline for time-sensitive reminders',

    ],

    challenges: [

      'Reliable FCM delivery across OEM battery optimizations and Doze modes',

      'Modeling recurring medication schedules with timezone and skip-day edge cases',

      'Offline-first UX expectations while keeping Firestore as source of truth',

      'Health-adjacent reliability: clear states for missed, taken, and snoozed doses',

    ],

    outcomes: [
      'Built complete Android application using Kotlin and Jetpack Compose',
      'Implemented Firebase Authentication and cloud synchronization',
      'Designed medication adherence workflows with reminder automation',
      'Demonstrated end-to-end mobile product engineering'
    ],

    impact: [

      'End-to-end mobile product: auth, data, and UX—not a coursework stub',

      'Compose adoption for maintainable UI as features grow',

      'Demonstrates health-adjacent product thinking and reliability concerns',

    ],

    images: [

      { id: 'dozo-home', alt: 'Dozo home schedule screen', src: '', caption: 'Schedule dashboard (screenshot coming soon)' },

      { id: 'dozo-reminder', alt: 'Dose reminder notification', src: '', caption: 'Reminder flow (screenshot coming soon)' },

    ],

    tech: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Android'],

    demo: 'https://github.com/antariksh19/Dozo',

    github: 'https://github.com/antariksh19/Dozo.git',

  },

  {

    id: 'waresync',

    featured: false,

    title: 'WARESYNC Inventory',

    tagline: 'Real-time stock visibility for warehouse operations.',

    icon: 'Database',

    problem:

      'Spreadsheet-driven inventory creates stale counts, slow reconciliation, and no single source of truth for floor teams.',

    solution:

      'Delivered a full-stack dashboard: CRUD for SKUs, movement logging, and reporting views so managers see current stock without manual exports.',

    systemFlow: [

      { label: 'User', detail: 'Warehouse & floor teams', icon: 'user' },

      { label: 'Frontend', detail: 'JavaScript dashboards & tables', icon: 'frontend' },

      { label: 'Backend / API', detail: 'PHP REST + business logic', icon: 'api' },

      { label: 'Database', detail: 'MySQL normalized inventory', icon: 'database' },

    ],

    architecture: [

      'PHP API layer over normalized MySQL schema',

      'Role-oriented views for intake, adjustments, and reports',

      'JavaScript-driven tables and filters for floor-friendly UX',

      'Hosted deployment for live demo access',

    ],

    challenges: [

      'Normalizing SKU, batch, and movement tables to avoid double-counting on concurrent updates',

      'Designing floor-friendly data entry on low-bandwidth warehouse networks',

      'Reporting queries that stay performant as movement history grows',

      'Role-based views without over-engineering auth for a focused MVP',

    ],

    outcomes: [

      'Centralizes stock movements into queryable audit history',

      'Replaces manual tallies with structured CRUD and live demo deployment',

      'Proves full-stack delivery alongside modern AI and mobile stacks',

    ],

    impact: [

      'Centralizes stock movements into queryable history',

      'Replaces error-prone manual tallies with structured data entry',

      'Proves ability to ship traditional full-stack systems alongside modern stacks',

    ],

    images: [

      { id: 'waresync-dashboard', alt: 'WARESYNC inventory dashboard', src: '', caption: 'Inventory dashboard (screenshot coming soon)' },

    ],

    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],

    demo: 'http://waresync.great-site.net/',

    github: 'https://github.com/antariksh19/WARESYNC.git',

  },

];



export const featuredProjects = projects.filter((p) => p.featured);

export const otherProjects = projects.filter((p) => !p.featured);



export const getProjectById = (id) => projects.find((p) => p.id === id);



export const getProjectByTitle = (title) =>

  projects.find((p) => p.title.toLowerCase() === title.toLowerCase());


