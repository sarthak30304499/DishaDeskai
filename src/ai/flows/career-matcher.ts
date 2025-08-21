// This file uses server-side code.
'use server';

/**
 * @fileOverview AI-powered career matching flow.
 *
 * - careerMatcher - A function that handles the career matching process.
 * - CareerMatcherInput - The input type for the careerMatcher function.
 * - CareerMatcherOutput - The return type for the careerMatcher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerMatcherInputSchema = z.object({
  skills: z.string().describe('List of skills.'),
  interests: z.string().describe('List of interests.'),
  academics: z.string().describe('Academic qualifications.'),
  location: z.string().describe('Preferred job location.'),
});
export type CareerMatcherInput = z.infer<typeof CareerMatcherInputSchema>;

const JobRecommendationSchema = z.object({
  title: z.string().describe('The job title.'),
  company: z.string().describe('The company name.'),
  location: z.string().describe('The job location.'),
  applyLink: z.string().url().describe('A URL to apply for the job.'),
});

const CareerMatcherOutputSchema = z.object({
  careerMatches: z
    .string()
    .describe('List of potential career matches based on the input data.'),
  skillsGapAnalysis: z
    .string()
    .describe('Analysis of skills gaps for the suggested career paths.'),
  careerPathRecommendations: z
    .string()
    .describe('Recommended career paths based on skills and interests.'),
  jobRecommendations: z
    .array(JobRecommendationSchema)
    .describe(
      'A list of 3-5 job recommendations with titles, companies, locations, and apply links. Use placeholder links like https://jobs.example.com/apply/123.'
    ),
});
export type CareerMatcherOutput = z.infer<typeof CareerMatcherOutputSchema>;

export async function careerMatcher(
  input: CareerMatcherInput
): Promise<CareerMatcherOutput> {
  return careerMatcherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerMatcherPrompt',
  input: {schema: CareerMatcherInputSchema},
  output: {schema: CareerMatcherOutputSchema},
  prompt: `Based on the following information, provide a list of potential career matches, a skills gap analysis, career path recommendations, and a list of job recommendations.

Skills: {{{skills}}}
Interests: {{{interests}}}
Academics: {{{academics}}}
Location: {{{location}}}

Ensure the career matches are relevant to the specified location and consider current job market trends.
For the job recommendations, provide a list of 3-5 job recommendations with titles, companies, locations, and apply links. Use placeholder links like https://jobs.example.com/apply/123.
`,
});

const careerMatcherFlow = ai.defineFlow(
  {
    name: 'careerMatcherFlow',
    inputSchema: CareerMatcherInputSchema,
    outputSchema: CareerMatcherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
