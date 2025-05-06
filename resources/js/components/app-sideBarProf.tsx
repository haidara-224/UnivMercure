
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookCheck, BookCopy, LayoutGrid, Star, WalletMinimal } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/prof',
        icon: LayoutGrid,
    },
    {
        title: 'Classes Et Departements',
        url: '/prof/classe-departement',
        icon: WalletMinimal,
    }
    ,

    {
        title: 'Cours',
        url: '/prof/cours',
        icon: BookCopy,
    }
    ,

    {
        title: 'Examens',
        url: '/prof/cours',
        icon: BookCheck,
    }
    ,

    {
        title: 'Gestions Des Notes',
        url: '/prof/notes',
        icon: Star,
    }


];


export function AppSidebarProf() {
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
