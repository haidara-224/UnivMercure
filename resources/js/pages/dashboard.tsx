
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {  GraduationCap, HousePlus, UserSearch, UsersRound } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
import { PageProps } from '@inertiajs/core';
import { ChartDonut } from '@/components/ui/dashbord.tsx/chartCount';
import EtudiantsParDepartement from '@/components/ui/dashbord.tsx/etudiantwithdepartementCount';
interface DepartementData {
    id: number;
    name: string;
    nombre_etudiant: number;
  }
interface NombreEtudiant extends PageProps {
    etudiantsCount: number;
    maleCount: number;
    femaleCount: number;
    professeursCount: number;
    DepartementCount: number;
    niveauCount: number;
    etudiantsParDepartement: DepartementData[];
}

export default function Dashboard() {
    const { etudiantsCount, maleCount, femaleCount, professeursCount, DepartementCount, niveauCount,etudiantsParDepartement } =
    usePage<NombreEtudiant>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border cursor-pointer  hover:transition-all hover:animate-pulse">
                        <div className='flex flex-col px-5 py-5 gap-5 h-full bg-cyan-700/100 dark:bg-cyan-700/50 '>
                        <UserSearch size={45} className='text-white'/>

                            <h1 className='text-white text-2xl'>{etudiantsCount}</h1>
                            <p className='text-white'>Etudiants</p>

                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border cursor-pointer  hover:transition-all hover:animate-pulse">
                        <div className='flex flex-col px-5 py-5 gap-5 h-full bg-yellow-700/100  dark:bg-yellow-700/50'>
                        <UsersRound className='text-white' />

                            <h1 className='text-white text-2xl'>{professeursCount}</h1>
                            <p className='text-white'>Professeurs</p>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border cursor-pointer  hover:transition-all hover:animate-pulse">
                        <div className='flex flex-col px-5 py-5 gap-5 h-full bg-cyan-700/100 dark:bg-cyan-700/50'>
                            <HousePlus className='text-white'/>
                            <h1 className='text-white text-2xl'>{DepartementCount}</h1>
                            <p className='text-white'>Departements</p>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border cursor-pointer  hover:transition-all hover:animate-pulse">
                        <div className='flex flex-col px-5 py-5 gap-5 h-full bg-yellow-700/100  dark:bg-yellow-700/50'>
                        <GraduationCap className='text-white' />

                            <h1 className='text-white text-2xl'>{niveauCount}</h1>
                            <p className='text-white'>Niveau</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
  <ChartDonut maleCount={maleCount} femaleCount={femaleCount} />
  <EtudiantsParDepartement data={etudiantsParDepartement} />
</div>

                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
