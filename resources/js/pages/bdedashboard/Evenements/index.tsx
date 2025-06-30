import Evenement from "@/components/ui/bde/Events/Evenement";
import AppSidebarLayoutBDE from "@/layouts/app/app-sidebarBDE-layout";
import { BreadcrumbItem, Evenements } from "@/types";
import { Head, usePage } from "@inertiajs/react";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evenements',
        href: '/bde/evenements',
    },

];
interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    evenements: Evenements[];
}


export default function Page() {
      const { evenements } = usePage<CustomPageProps>().props;
    return (
         <AppSidebarLayoutBDE breadcrumbs={breadcrumbs}>
            <Head title="Evenements" />
            <Evenement evenements={evenements} />
        </AppSidebarLayoutBDE>
    );
}
