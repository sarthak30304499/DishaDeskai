import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Bot, Compass, TestTube } from 'lucide-react';
import { Logo } from '@/components/icons';

export default function LandingPage() {
  const features = [
    {
      icon: <Compass className="h-8 w-8 text-primary" />,
      title: 'AI Career Matcher',
      description: 'Discover career paths perfectly aligned with your skills, interests, and academic background.',
    },
    {
      icon: <TestTube className="h-8 w-8 text-primary" />,
      title: 'Skills Gap Analysis',
      description: 'Identify the exact skills you need to land your dream job with our intelligent analysis.',
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'Personalized Roadmap',
      description: 'Get a step-by-step learning plan to bridge your skills gap and accelerate your career growth.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">DishaDesk</h1>
        </div>
        <Button asChild variant="ghost">
          <Link href="/login">Sign In</Link>
        </Button>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Unlock Your Career Potential
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            DishaDesk is your AI-powered co-pilot for navigating the complexities of career development. Find your path, learn the skills, and achieve your goals.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/login">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        <section className="bg-card py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground">A smarter way to build your future</h3>
              <p className="mt-2 text-muted-foreground">Everything you need to succeed in one platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DishaDesk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
