
import { Etudiants, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Etudiant',
        href: '/etudiant',
    },
];


import { Card, CardHeader, CardContent } from '@/components/ui/card';
import AppSidebarLayoutEtudiant from '@/layouts/app/app-sidebarEtud-layout';
import CalendarEmploieEtud from '@/components/ui/dashbord/Emploie_temps/CalenderEmploiEtud';

interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    etudiant: Etudiants
}

export default function Page() {

  const { etudiant } = usePage<CustomPageProps>().props;
    return (
        <AppSidebarLayoutEtudiant breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='text-center mb-4 text-3xl'>
                    Bonjour {etudiant.name} - {etudiant.prenom}
                </div>
                <div>
                    <span className='text-2xl text-slate-800 font-bold'>{etudiant.matricule}</span>
                </div>

                <div>

                    <Card className={`hover:shadow-lg  cursor-pointer`}>
                        <CardHeader className={`flex items-center justify-between p-4   text-black rounded-t-xl`}>


                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <div className="container mt-5">
                                <Card className={`hover:shadow-lg  cursor-pointer`}>
                                    <CardHeader className={`flex items-center justify-between p-4   text-black rounded-t-xl`}>


                                    </CardHeader>
                                    <CardContent className="p-4 text-center">
                                        <div className="container mt-5">
                                            <CalendarEmploieEtud />

                                        </div>
                                    </CardContent>
                                </Card>

                            </div>
                        </CardContent>
                    </Card>

                </div>


            </div>
        </AppSidebarLayoutEtudiant>
    );
}
