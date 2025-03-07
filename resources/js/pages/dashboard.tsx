
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { GraduationCap, HousePlus, UserSearch, UsersRound } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
import { PageProps } from '@inertiajs/core';
import { ChartDonut } from '@/components/ui/dashbord.tsx/chartCount';
import EtudiantsParDepartement from '@/components/ui/dashbord.tsx/etudiantwithdepartementCount';
import DepartementDataTable from '@/components/ui/dashbord.tsx/DepartementDataTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    const { etudiantsCount, maleCount, femaleCount, professeursCount, DepartementCount, niveauCount, etudiantsParDepartement } =
        usePage<NombreEtudiant>().props;
    const stats = [
        { title: "Étudiants", count: etudiantsCount, icon: <UserSearch size={40} />, color: "bg-cyan-700" },
        { title: "Professeurs", count: professeursCount, icon: <UsersRound size={40} />, color: "bg-yellow-700" },
        { title: "Départements", count: DepartementCount, icon: <HousePlus size={40} />, color: "bg-cyan-700" },
        { title: "Niveaux", count: niveauCount, icon: <GraduationCap size={40} />, color: "bg-yellow-700" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className={`hover:shadow-lg hover:animate-pulse transition-all cursor-pointer ${stat.color}`}>
                            <CardHeader className={`flex items-center justify-between p-4   text-white rounded-t-xl`}>
                                <CardTitle>{stat.title}</CardTitle>
                                {stat.icon}
                            </CardHeader>
                            <CardContent className="p-4 text-center">
                                <h1 className="text-3xl font-bold">{stat.count}</h1>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                    <ChartDonut maleCount={maleCount} femaleCount={femaleCount} />
                    <EtudiantsParDepartement data={etudiantsParDepartement} />
                </div>

                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl">
                    <DepartementDataTable />
                </div>
            </div>
        </AppLayout>
    );
}
