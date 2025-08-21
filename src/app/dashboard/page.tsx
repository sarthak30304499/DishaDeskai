'use client';

import { useState } from 'react';
import type { CareerMatcherOutput } from '@/lib/types';
import ProfileForm from '@/components/profile-form';
import CareerResults from '@/components/career-results';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DashboardPage() {
  const [results, setResults] = useState<CareerMatcherOutput | null>(null);
  const [userSkills, setUserSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResults = (data: CareerMatcherOutput | null, skills: string, error: string | null = null, loading: boolean = false) => {
    setResults(data);
    setUserSkills(skills);
    setError(error);
    setLoading(loading);
  };
  
  return (
    <div className="space-y-8">
      <ProfileForm onResults={handleResults} loading={loading} />

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {results ? (
        <CareerResults careerData={results} userSkills={userSkills} />
      ) : (
        !loading && (
          <Card className="border-dashed border-2">
            <CardHeader className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Welcome to Your Career Dashboard</CardTitle>
              <CardDescription>
                Fill out your profile above to get personalized career matches and insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for future content or illustrations */}
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
