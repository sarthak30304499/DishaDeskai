'use client';

import { Search, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: 'Signed out successfully.' });
      router.push('/login');
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name[0];
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
        </Button>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
                <Avatar>
                  <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User avatar'} data-ai-hint="person" />
                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.displayName || 'My Account'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://www.linkedin.com/in/sarthakpalgotra" target="_blank">
                  Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4"/>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
