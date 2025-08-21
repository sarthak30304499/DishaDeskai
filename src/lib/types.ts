import type {z} from 'genkit';
import type {CareerMatcherOutput as CMO} from '@/ai/flows/career-matcher';
import type {LearningRoadmapOutput} from '@/ai/flows/learning-roadmap-generator';

type CareerMatcherOutput = Omit<CMO, 'jobRecommendations'> & {
  jobRecommendations: Array<{
    title: string;
    company: string;
    location: string;
    applyLink: string;
  }>;
};

export type {CareerMatcherOutput, LearningRoadmapOutput};
