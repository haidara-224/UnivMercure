
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Webhook, WalletMinimal, School, User, UsersRound,BookOpenCheck,BookCheck,Proportions, Star } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Facultés',
        url: '/dashboard/faculty',
        icon: School,
    },
    {
        title: 'Departements',
        url: '/dashboard/departement',
        icon: WalletMinimal,
    },
    {
        title: 'Niveau',
        url: '/dashboard/niveau',
        icon: Webhook,
    },

    {
        title: 'Professeurs',
        url: '/dashboard/professeurs',
        icon: UsersRound,
    },
    {
        title: 'Etudiants',
        url: '/dashboard',
        icon: User,
    },
    {
        title: 'Emploie de Temps',
        url: '/dashboard/etudiant',
        icon: BookOpenCheck,
    },

    {
        title: 'Examens',
        url: '/dashboard',
        icon: BookCheck,
    },
    {
        title: 'Notes',
        url: '/dashboard',
        icon: Star,
    },
    {
        title: 'Resultats',
        url: '/dashboard',
        icon: Proportions,
    },
];
/*
const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];
*/

export function AppSidebar() {
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
            {
                /*

                    <NavFooter items={footerNavItems} className="mt-auto" />

                </SidebarFooter>
                */

            }
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>

        </Sidebar>
    );
}
