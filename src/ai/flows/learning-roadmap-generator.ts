'use server';

/**
 * @fileOverview Generates a personalized learning roadmap based on skills gaps.
 *
 * - generateLearningRoadmap - A function that generates the learning roadmap.
 * - LearningRoadmapInput - The input type for the generateLearningRoadmap function.
 * - LearningRoadmapOutput - The return type for the generateLearningRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LearningRoadmapInputSchema = z.object({
  userSkills: z
    .string()
    .describe('The current skills of the user, comma separated.'),
  desiredCareer: z
    .string()
    .describe('The career the user wants to pursue.'),
  jobMarketTrends: z
    .string()
    .optional()
    .describe('Optional job market trends to consider.'),
});
export type LearningRoadmapInput = z.infer<typeof LearningRoadmapInputSchema>;

const LearningRoadmapOutputSchema = z.object({
  roadmap: z
    .string()
    .describe('A personalized learning roadmap for the user.'),
});
export type LearningRoadmapOutput = z.infer<typeof LearningRoadmapOutputSchema>;

export async function generateLearningRoadmap(
  input: LearningRoadmapInput
): Promise<LearningRoadmapOutput> {
  return learningRoadmapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'learningRoadmapPrompt',
  input: {schema: LearningRoadmapInputSchema},
  output: {schema: LearningRoadmapOutputSchema},
  prompt: `You are a career advisor. Generate a personalized learning roadmap for a user to transition from their current skills to their desired career.

  Current Skills: {{{userSkills}}}
  Desired Career: {{{desiredCareer}}}

  {{#if jobMarketTrends}}
  Job Market Trends: {{{jobMarketTrends}}}
  {{/if}}
  `,
});

const learningRoadmapFlow = ai.defineFlow(
  {
    name: 'learningRoadmapFlow',
    inputSchema: LearningRoadmapInputSchema,
    outputSchema: LearningRoadmapOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
