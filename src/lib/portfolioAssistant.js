/**
 * Portfolio knowledge context and prompts for Antariksh AI (Gemini).
 */

import { personalInfo, about, heroContent } from '../content/profile';
import { projects } from '../content/projects';
import { workExperience, leadership, education, certifications } from '../content/experience';
import { skillCategories, allTechnologies, cloudExperience } from '../content/skills';

export const SUGGESTED_QUESTIONS = [
  'Tell me about Antariksh',
  'What projects has he built?',
  'Explain STEGANO-VAULT',
  'What cloud experience does he have?',
  'What technologies does he know?',
];

const SYSTEM_PROMPT_BASE = `You are Antariksh AI.

You answer questions about Antariksh Mohapatra.

Use only information provided in the portfolio context.

Do not hallucinate.

If information is unavailable,
say that it is not currently documented.`;

/** Full corpus for Gemini system prompt */
export function buildKnowledgeContext() {
  return {
    profile: { personalInfo, about, heroContent },
    skills: { skillCategories, allTechnologies, cloudExperience },
    experience: { workExperience, leadership, education, certifications },
    projects: projects.map(({ id, title, tagline, problem, solution, tech, challenges, outcomes }) => ({
      id,
      title,
      tagline,
      problem,
      solution,
      tech,
      challenges,
      outcomes,
    })),
  };
}

/** @returns {string} */
export function buildAntarikshSystemPrompt() {
  const context = buildKnowledgeContext();
  return `${SYSTEM_PROMPT_BASE}

--- Portfolio context (JSON) ---
${JSON.stringify(context)}`;
}
