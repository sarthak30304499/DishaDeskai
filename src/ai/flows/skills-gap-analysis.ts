'use server';

/**
 * @fileOverview A skills gap analysis AI agent.
 *
 * - skillsGapAnalysis - A function that handles the skills gap analysis process.
 * - SkillsGapAnalysisInput - The input type for the skillsGapAnalysis function.
 * - SkillsGapAnalysisOutput - The return type for the skillsGapAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillsGapAnalysisInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('A list of skills that the user currently possesses.'),
  desiredCareer: z
    .string()
    .describe('The career that the user is interested in pursuing.'),
});
export type SkillsGapAnalysisInput = z.infer<typeof SkillsGapAnalysisInputSchema>;

const SkillsGapAnalysisOutputSchema = z.object({
  skillsGap: z
    .array(z.string())
    .describe(
      'A list of skills that the user needs to acquire to be successful in their desired career.'
    ),
  careerPathRecommendations: z
    .string()
    .describe('Recommended career paths based on the skills gap analysis.'),
});
export type SkillsGapAnalysisOutput = z.infer<typeof SkillsGapAnalysisOutputSchema>;

export async function skillsGapAnalysis(
  input: SkillsGapAnalysisInput
): Promise<SkillsGapAnalysisOutput> {
  return skillsGapAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillsGapAnalysisPrompt',
  input: {schema: SkillsGapAnalysisInputSchema},
  output: {schema: SkillsGapAnalysisOutputSchema},
  prompt: `You are a career counselor who helps users identify skills gaps for their desired career.

  User Skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}\n{{/each}}{{else}}None{{/if}}
  Desired Career: {{{desiredCareer}}}

  Identify the skills gap that the user has for their desired career. Also suggest a potential career path based on this analysis.
  The skills gap should be a list of skills that the user needs to acquire to be successful in their desired career.
  The career path recommendations should be a string that describes potential career paths based on the skills gap analysis.
  `,
});

const skillsGapAnalysisFlow = ai.defineFlow(
  {
    name: 'skillsGapAnalysisFlow',
    inputSchema: SkillsGapAnalysisInputSchema,
    outputSchema: SkillsGapAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
