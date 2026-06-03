/**
 * Central profile knowledge source — used by Hero, Contact, Metrics, and AI assistant.
 * Gemini-ready: export as structured context via buildAssistantContext() in portfolioAssistant.js
 */

export const personalInfo = {
  name: 'Antariksh Mohapatra',
  role: 'Software Engineer',
  headlineRole: 'Software Engineering Intern',
  location: 'Bhubaneswar, India',
  email: 'antariksh19m@gmail.com',
  phone: '+91-9776412505',
  linkedin: 'https://www.linkedin.com/in/antariksh19m',
  github: 'https://github.com/antariksh19',
  leetcode: 'https://leetcode.com/u/antariksh19m/',
  resumePath: '/resume.pdf',
  openToWork: true,
};

export const heroContent = {
  role: 'Software Engineer',
  subtitle:
    'Building intelligent software across AI, cloud infrastructure, security, and full-stack development.',
  profileTagline: 'Software Engineer • AI Builder • Cloud Engineer',
  techPills: ['React', 'Next.js', 'AWS', 'Java', 'AI', 'Cloud'],
  typeSequence: [
    'Software Engineer',
    2000,
    'AI Application Developer',
    2000,
    'Cloud Infrastructure Builder',
    2000,
    'Full Stack Developer',
    2000,
  ],
  headline: {
    highlight: 'AI-Powered Applications',
    lines: ['Cloud Infrastructure,', 'and Scalable Developer Tools.'],
  },
};

export const metrics = {
  projectsBuilt: {
    value: 15,
    suffix: '+',
    label: 'Projects Built',
    shortLabel: 'Projects'
  },
  leetcodeProblems: { value: 250, suffix: '+', label: 'LeetCode Problems', shortLabel: 'LeetCode Problems' },
  yearsCoding: { value: 4, suffix: '+', label: 'Years Coding', shortLabel: 'Years Coding' },
  /** Technologies Used — count derived from skills.js at runtime when needed */
  technologiesUsed: { label: 'Technologies Used' },
};

/** Short bio blocks for retrieval / future RAG */
export const about = {
  summary:
    'Antariksh Mohapatra is a Software Engineer and AI-focused builder based in Bhubaneswar, India. He ships production systems across AI applications, cloud infrastructure, security engineering, and full-stack web and mobile development.',
  strengths: [
    'End-to-end product delivery from prompt to deploy',
    'AI integration (Gemini, Groq) with guardrails and structured output',
    'Cloud platforms: AWS, Google Cloud, Oracle Cloud, Firebase',
    'Security-minded engineering (OWASP SAMM, cryptography, steganography)',
    'Strong DSA foundation with 250+ LeetCode problems solved',
    'Strong foundation in Data Structures, Algorithms, and System Design',
  ],
  positioning:
    'Software Engineer building AI-powered applications, cloud infrastructure, and scalable developer tools.',
};

export const socialLinks = [
  { key: 'github', label: 'GitHub profile' },
  { key: 'linkedin', label: 'LinkedIn profile' },
  { key: 'leetcode', label: 'LeetCode profile' },
  { key: 'email', label: 'Email' },
].map(({ key, label }) => ({
  key,
  label: key === 'email' ? `Email ${personalInfo.name}` : label,
  href:
    key === 'email'
      ? `mailto:${personalInfo.email}`
      : personalInfo[key],
}));
