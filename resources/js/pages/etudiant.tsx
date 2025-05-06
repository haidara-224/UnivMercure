
import {  type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Etudiant',
        href: '/prof',
    },
];


import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import AppSidebarLayoutEtudiant from '@/layouts/app/app-sidebarEtud-layout';



export default function Page() {


    return (
        <AppSidebarLayoutEtudiant breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <Card className={`hover:shadow-lg hover:animate-pulse transition-all cursor-pointer`}>
                            <CardHeader className={`flex items-center justify-between p-4   text-black rounded-t-xl`}>
                                <CardTitle>hello</CardTitle>

                            </CardHeader>
                            <CardContent className="p-4 text-center">
                                <h1 className="text-3xl font-bold text-black">je suis etudiant</h1>
                            </CardContent>
                        </Card>

                </div>


            </div>
        </AppSidebarLayoutEtudiant>
    );
}
