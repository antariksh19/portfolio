/**
 * Technical skills knowledge source — Skills section, Metrics, AI assistant.
 */

export const skillCategories = [
  {
    id: 'frontend-mobile',
    title: 'Frontend & Mobile',
    icon: 'layout',
    color: 'text-cyan-400',
    skills: ['Next.js', 'React.js', 'Jetpack Compose', 'HTML/CSS', 'Tailwind CSS'],
  },
  {
    id: 'backend-tools',
    title: 'Backend & Tools',
    icon: 'server',
    color: 'text-purple-400',
    skills: ['Node.js', 'Django', 'Flask', 'Python', 'PHP', 'Gemini API', 'Groq', 'GitHub Copilot'],
  },
  {
    id: 'database-cloud',
    title: 'Database & Cloud',
    icon: 'database',
    color: 'text-green-400',
    skills: ['MongoDB', 'Firebase', 'Firestore', 'MySQL', 'AWS', 'Google Cloud', 'Oracle Cloud'],
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: 'cpu',
    color: 'text-yellow-400',
    skills: ['Java', 'Python', 'Kotlin', 'JavaScript', 'C'],
  },
];

/** Flat deduplicated list for metrics and assistant */
export const allTechnologies = [
  ...new Set(skillCategories.flatMap((c) => c.skills)),
];

export const getTechnologyCount = () => allTechnologies.length;

export const cloudExperience = {
  summary:
    'Hands-on experience with AWS, Google Cloud, Oracle Cloud, and Firebase for auth, hosting, and data sync.',
  platforms: [
    {
      name: 'AWS',
      usage: 'Cloud fundamentals, deployment patterns, and scalable service design.',
    },
    {
      name: 'Google Cloud',
      usage: 'Cloud workloads and platform services alongside academic and project work.',
    },
    {
      name: 'Oracle Cloud',
      usage: 'Enterprise cloud exposure and infrastructure concepts.',
    },
    {
      name: 'Firebase',
      usage: 'Authentication, Firestore, and FCM in production Android (Dozo).',
    },
    {
      name: 'Vercel',
      usage: 'Zero-config deployment for Next.js and React AI products.',
    },
  ],
};
