
'use client';

import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header';
import RightSidebar from '@/components/right-sidebar';
import { AuthProvider } from '@/hooks/use-auth';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
