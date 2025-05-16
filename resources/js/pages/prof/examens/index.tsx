import { Departement, ExamensByClasse, Niveaux, type BreadcrumbItem } from '@/types';
import AppSidebarLayoutProf from "@/layouts/app/app-sidebarProf-layout";
import { Head, usePage, } from "@inertiajs/react";


import { NavTabsExamens } from '@/components/navTabsExamens';
import ForClasse from '@/components/ui/prof/Examens/ForClasse';
import ForStudents from '@/components/ui/prof/Examens/ForStudents';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Examens',
        href: '/prof/examens',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    departements: Departement[];
    Niveau: Niveaux[];
    examens:ExamensByClasse[]

}
export default function Page() {
  const { departements, Niveau,examens } = usePage<CustomPageProps>().props;
    return (<>
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="Prof Examens" />
            <NavTabsExamens
                childrenByTab={{
                    'nav-1': <ForClasse departements={departements} classes={Niveau} examens={examens} />,
                    'nav-2': <ForStudents />,
                }}
            />



        </AppSidebarLayoutProf>
    </>)
}
