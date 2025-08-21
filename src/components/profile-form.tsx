'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, GraduationCap, Lightbulb, Loader2, MapPin } from 'lucide-react';
import { getCareerSuggestions } from '@/app/actions';
import type { CareerMatcherOutput } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  skills: z.string().min(10, 'Please describe your skills in more detail.').max(500),
  interests: z.string().min(10, 'Please describe your interests in more detail.').max(500),
  academics: z.string().min(5, 'Please enter your academic qualifications.').max(500),
  location: z.string().min(2, 'Please enter your preferred location.').max(100),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onResults: (data: CareerMatcherOutput | null, error?: string | null, loading?: boolean) => void;
  loading: boolean;
}

export default function ProfileForm({ onResults, loading }: ProfileFormProps) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      skills: '',
      interests: '',
      academics: '',
      location: '',
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    onResults(null, null, true);
    const result = await getCareerSuggestions(data);

    if (result.error) {
      onResults(null, result.error, false);
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else if (result.data) {
      onResults(result.data, null, false);
      toast({
        title: 'Success!',
        description: 'Your career matches have been generated.',
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Career Profile</CardTitle>
        <CardDescription>Tell us about yourself to discover personalized career opportunities.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Briefcase className="w-4 h-4"/> Skills</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Python, Project Management, Graphic Design" {...field} />
                    </FormControl>
                    <FormDescription>List your professional skills, separated by commas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Lightbulb className="w-4 h-4"/> Interests</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Artificial Intelligence, Renewable Energy, Mobile App Development" {...field} />
                    </FormControl>
                    <FormDescription>List your personal or professional interests.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="academics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><GraduationCap className="w-4 h-4"/> Academics</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., B.Tech in Computer Science" {...field} />
                  </FormControl>
                  <FormDescription>Your highest academic qualification or field of study.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Preferred Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Bangalore, India or Remote" {...field} />
                  </FormControl>
                  <FormDescription>Where would you like to work?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} size="lg">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Analyzing...' : 'Find My Career Path'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
