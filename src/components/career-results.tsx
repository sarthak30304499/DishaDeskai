'use client';

import type { CareerMatcherOutput, LearningRoadmapOutput } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getLearningRoadmap } from '@/app/actions';
import { useState } from 'react';
import { Briefcase, Lightbulb, ListChecks, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface CareerResultsProps {
  careerData: CareerMatcherOutput;
  userSkills: string;
}

function LearningRoadmapGenerator({ userSkills, desiredCareer }: { userSkills: string; desiredCareer: string }) {
  const [roadmap, setRoadmap] = useState<LearningRoadmapOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    setError(null);
    setRoadmap(null);
    
    const result = await getLearningRoadmap({ userSkills: userSkills, desiredCareer: desiredCareer });

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setRoadmap(result.data);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-background">
      <h4 className="font-semibold">Ready for the next step?</h4>
      <p className="text-sm text-muted-foreground mb-4">Generate a personalized learning roadmap for {desiredCareer}.</p>
      <Button onClick={handleGenerateRoadmap} disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? 'Generating...' : 'Generate Learning Roadmap'}
      </Button>

      {error && (
         <Alert variant="destructive" className="mt-4">
           <AlertTitle>Error</AlertTitle>
           <AlertDescription>{error}</AlertDescription>
         </Alert>
       )}

      {roadmap && (
        <div className="mt-4 prose prose-sm max-w-none dark:prose-invert">
          <h5 className="font-bold">Your Learning Roadmap:</h5>
          <p>{roadmap.roadmap}</p>
        </div>
      )}
    </div>
  );
}

function JobRecommendations({ recommendations }: { recommendations: CareerMatcherOutput['jobRecommendations'] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <CardTitle>Recommended Job Openings</CardTitle>
        </div>
        <CardDescription>Here are some job openings that match your profile.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Apply</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recommendations.map((job, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={job.applyLink} target="_blank">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


export default function CareerResults({ careerData, userSkills }: CareerResultsProps) {
  const { careerMatches, skillsGapAnalysis, careerPathRecommendations, jobRecommendations } = careerData;
  const matches = careerMatches.split(',').map(s => s.trim()).filter(Boolean);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <CardTitle>Top Career Matches</CardTitle>
          </div>
          <CardDescription>Based on your profile, here are some careers that could be a great fit for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {matches.map((match, index) => (
              <Badge key={index} variant="secondary" className="text-lg py-1 px-3">
                {match}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {jobRecommendations && jobRecommendations.length > 0 && (
        <JobRecommendations recommendations={jobRecommendations} />
      )}

      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <ListChecks className="h-6 w-6 text-primary"/>
              Skills Gap Analysis
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 text-base">
            <p>{skillsGapAnalysis}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
             <div className="flex items-center gap-2 text-lg font-semibold">
              <Lightbulb className="h-6 w-6 text-primary" />
              Career Path Recommendations
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 text-base">
            <p>{careerPathRecommendations}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Card className="bg-gradient-to-r from-primary/10 via-background to-background">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle>Create Your Learning Plan</CardTitle>
          </div>
          <CardDescription>Select one of your matched careers to generate a personalized learning roadmap.</CardDescription>
        </CardHeader>
        <CardContent>
          {matches.length > 0 && <LearningRoadmapGenerator userSkills={userSkills} desiredCareer={matches[0]}/>}
        </CardContent>
      </Card>
    </div>
  );
}
