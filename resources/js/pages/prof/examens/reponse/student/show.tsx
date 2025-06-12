import AppSidebarLayoutProf from "@/layouts/app/app-sidebarProf-layout";
import { BreadcrumbItem, examenstudentresponse } from "@/types";
import { Head, usePage } from "@inertiajs/react";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Examens',
        href: '/prof/examens',
    },
    {
        title: 'Réponses',
        href: '#',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    response: examenstudentresponse;

}
export default function Page() {
     const { response } = usePage<CustomPageProps>().props;
    return (
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="Réponses Examens" />
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Réponses des étudiants</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Liste des réponses pour l'examen
                        </p>
                    </div>
                </div>
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Réponse de l'étudiant
                        </h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <div
                            dangerouslySetInnerHTML={{ __html: response?.reponse ?? "Aucune réponse textuelle" }}
                            className="prose max-w-none"
                        />
                    </div>
                </div>
            </div>
        </AppSidebarLayoutProf>
    );
}
