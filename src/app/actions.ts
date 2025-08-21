
'use server';

import { z } from 'zod';
import { careerMatcher } from '@/ai/flows/career-matcher';
import type { CareerMatcherInput } from '@/ai/flows/career-matcher';
import { generateLearningRoadmap } from '@/ai/flows/learning-roadmap-generator';
import type { LearningRoadmapInput } from '@/ai/flows/learning-roadmap-generator';
import { sendWelcomeEmail } from '@/ai/flows/welcome-email';
import type { WelcomeEmailInput } from '@/ai/flows/welcome-email';

const careerMatcherSchema: z.ZodType<CareerMatcherInput> = z.object({
  skills: z.string().min(1, 'Skills are required.'),
  interests: z.string().min(1, 'Interests are required.'),
  academics: z.string().min(1, 'Academic qualifications are required.'),
  location: z.string().min(1, 'Preferred job location is required.'),
});

const learningRoadmapSchema: z.ZodType<LearningRoadmapInput> = z.object({
  userSkills: z.string().min(1, 'Current skills are required.'),
  desiredCareer: z.string().min(1, 'Desired career is required.'),
  jobMarketTrends: z.string().optional(),
});

const welcomeEmailSchema: z.ZodType<WelcomeEmailInput> = z.object({
  email: z.string().email(),
  displayName: z.string(),
});


export async function getCareerSuggestions(data: CareerMatcherInput) {
  const validation = careerMatcherSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: 'Invalid input.',
      details: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await careerMatcher(validation.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}

export async function getLearningRoadmap(data: LearningRoadmapInput) {
  const validation = learningRoadmapSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: 'Invalid input.',
      details: validation.error.flatten().fieldErrors,
    };
  }
  
  try {
    const result = await generateLearningRoadmap(validation.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while generating the roadmap.' };
  }
}

export async function triggerWelcomeEmail(data: WelcomeEmailInput) {
  const validation = welcomeEmailSchema.safeParse(data);
  if (!validation.success) {
    console.error('Invalid welcome email input:', validation.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid input for welcome email.' };
  }
  try {
    await sendWelcomeEmail(validation.data);
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: 'Failed to send welcome email.' };
  }
}
