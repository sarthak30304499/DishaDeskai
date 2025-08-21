
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name[0];
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background/95 p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User avatar'} data-ai-hint="person" />
              <AvatarFallback className="text-4xl">
                {getInitials(user.displayName)}
              </AvatarFallback>
            </Avatar>
          <CardTitle className="mt-4 text-3xl">{user.displayName || 'User Profile'}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="mt-4 space-y-6">
            <div className="text-center">
                <p className="text-muted-foreground">
                    To view or update your career details, including skills, interests, and academics, please go to your dashboard.
                </p>
            </div>
            <Button asChild className="w-full" size="lg">
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Dashboard
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
