import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { AppSidebarDocument } from '@/components/app-sideBarDocument';
import { type BreadcrumbItem } from '@/types';
import { Toaster } from 'sonner';

export default function AppSidebarLayoutDocumentaliste({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    return (
        <AppShell variant="sidebar">
            <AppSidebarDocument />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
                <Toaster />
            </AppContent>
        </AppShell>
    );
}
