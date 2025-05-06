
import { professeur, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Professeur',
        href: '/prof',
    },
];


import { Card, CardHeader, CardContent } from '@/components/ui/card';
import AppSidebarLayoutProf from '@/layouts/app/app-sidebarProf-layout';
import CalendarEmploieProf from '@/components/ui/dashbord/Emploie_temps/CalenderEmploieProf';
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    prof: professeur
}

export default function Page() {
    const { prof } = usePage<CustomPageProps>().props;

    return (
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className='text-center'>Bonjour <span className='text-2xl text-slate-800 font-bold'>{prof.name} {prof.prenom}-{prof.matricule}</span></h1>
                </div>

                <div>

                    <Card className={`hover:shadow-lg hover:animate-pulse transition-all cursor-pointer`}>
                        <CardHeader className={`flex items-center justify-between p-4   text-black rounded-t-xl`}>


                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <div className="container mt-5">
                                <CalendarEmploieProf />

                            </div>
                        </CardContent>
                    </Card>

                </div>


            </div>
        </AppSidebarLayoutProf>
    );
}
