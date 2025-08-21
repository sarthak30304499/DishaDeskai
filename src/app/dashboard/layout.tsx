'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import RightSidebar from '@/components/right-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                {children}
              </div>
              <aside className="hidden lg:col-span-4 xl:col-span-3 lg:block">
                <RightSidebar />
              </aside>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
