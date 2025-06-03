
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {  Star, BookA, BookCheck, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/etudiant',
        icon: LayoutGrid,

    },
    {
        title: 'Mes Notes',
        url: '/etudiant/notes',
        icon: Star,
    },
     {
        title: 'Examens',
        url: '/examens',
        icon: BookCheck,
    },


    {
        title: 'Documents',
        url: '/',
        icon: BookA,
    },
    /*
    {
        title: 'Bulettin de notes',
        url: '/',
        icon: BookCopy,
    },
    {
        title: 'Attestation de Niveaux',
        url: '/',
        icon: BookCheckIcon,
    },
    {
        title: "Attestation d'inscriptions",
        url: '/',
        icon: BookMarked,
    },
    {
        title: "certificat de fin d'etudes",
        url: '/',
        icon: BookDashed,
    },
    */

];


export function AppSidebarEtudiant() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>

        </Sidebar>
    );
}
