import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { AppSidebarProf } from '@/components/app-sideBarProf';
import { type BreadcrumbItem } from '@/types';
import { Toaster } from "@/components/ui/sonner"

export default function AppSidebarLayoutProf({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <AppShell variant="sidebar">
            <AppSidebarProf />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
                <Toaster />
            </AppContent>
        </AppShell>
    );
}
