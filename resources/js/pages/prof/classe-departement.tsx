import {  type BreadcrumbItem } from '@/types';
import AppSidebarLayoutProf from "@/layouts/app/app-sidebarProf-layout";
import { Head,  } from "@inertiajs/react";
import { SalleData } from '@/components/ui/prof/classeDptTable';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'departement et classes',
        href: '/prof/classe-departement',
    },
];

export default function Page() {

    return (<>
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="classes et departements" />

            <SalleData/>
        </AppSidebarLayoutProf>
    </>)
}
