import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from '@/types';
import { Head } from "@inertiajs/react"
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Etudiants', href: '/dashboard/etudiants' },
];
export default function () {
    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="New Etudiant" />
        <h1 className="text-center font-bold text-3xl mt-5">Ajouter Un Nouvel Etudiant</h1>
    </AppLayout>
}
