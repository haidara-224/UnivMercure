import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Examens',
        href: '/dashboard/examens',
    },
];

export default function Page() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exams" />
            <div className="">
                <Link href="/dashboard/examens/create" className="bg-blue-600 p-3 rounded-xl text-white float-end m-5">Reaprtir les Etudiants</Link>
            </div>

        </AppLayout>
    )
}
