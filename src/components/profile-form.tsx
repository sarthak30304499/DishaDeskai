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
import { Briefcase, GraduationCap, Lightbulb, Loader2, MapPin, User, Mail, Phone } from 'lucide-react';
import { getCareerSuggestions } from '@/app/actions';
import type { CareerMatcherOutput } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z.string().min(2, 'Please enter your name.').max(100),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  skills: z.string().min(10, 'Please describe your skills in more detail.').max(500),
  interests: z.string().min(10, 'Please describe your interests in more detail.').max(500),
  academics: z.string().min(5, 'Please enter your academic qualifications.').max(500),
  location: z.string().min(2, 'Please enter your preferred location.').max(100),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onResults: (data: CareerMatcherOutput | null, skills: string, error?: string | null, loading?: boolean) => void;
  loading: boolean;
}

export default function ProfileForm({ onResults, loading }: ProfileFormProps) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      skills: '',
      interests: '',
      academics: '',
      location: '',
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    onResults(null, '', null, true);
    const { skills } = data;
    // We are not using name, email, phone in the career suggestions
    const { name, email, phone, ...careerData } = data;
    const result = await getCareerSuggestions(careerData);

    if (result.error) {
      onResults(null, '', result.error, false);
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else if (result.data) {
      onResults(result.data, skills, null, false);
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><User className="w-4 h-4"/> Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Mail className="w-4 h-4"/> Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Phone className="w-4 h-4"/> Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="e.g., +1 123-456-7890" {...field} />
                    </FormControl>
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
            </div>

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
