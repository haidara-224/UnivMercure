
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Webhook, WalletMinimal, School, User, UsersRound, BookOpenCheck, BookCheck, Proportions, Star, Heater, BookCopy, PartyPopperIcon, Antenna } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Années Scolaire',
        url: '/dashboard/annees-scolaire',
        icon: Heater,
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
        url: '/dashboard/etudiants',
        icon: User,
    },
    {
        title: 'Salles de Classe',
        url: '/dashboard/salles',
        icon: LayoutGrid,

    },
    {
        title: 'Matières',
        url: '/dashboard/matieres',
        icon: BookCopy,

    },
    {
        title: 'Emploie de Temps',
        url: '/dashboard/emploie-du-temps',
        icon: BookOpenCheck,
    },
{
        title: 'Forum',
        url: '/dashboard/forum',
        icon: Antenna,
    },
    {
        title: 'Examens',
        url: '/dashboard/examens',
        icon: BookCheck,
    },
    {
        title: 'Notes',
        url: '/dashboard/notes',
        icon: Star,
    },
    {
        title: 'Réinscription',
        url: '/dashboard/reincriptions',
        icon: Proportions,
    },
    {
        title: 'Parcours',
        url: '/dashboard/parcours',
        icon: PartyPopperIcon,
    },
    {
        title: 'Utisateurs',
        url: '/dashboard/users',
        icon: UsersRound,
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
