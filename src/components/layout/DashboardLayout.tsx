import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className={cn(
        'transition-all duration-300',
        'lg:ml-64',
        sidebarCollapsed && 'lg:ml-16'
      )}>
        <Header />
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
