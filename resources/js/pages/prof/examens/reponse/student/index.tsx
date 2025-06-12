import AppSidebarLayoutProf from "@/layouts/app/app-sidebarProf-layout";
import { BreadcrumbItem, examenstudentresponse } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

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
    responses: examenstudentresponse[];
    examenInfo: {
        titre: string;
        professeur: string;
        date_fin: string;
    };
}

export default function Page() {
    const { responses, examenInfo } = usePage<CustomPageProps>().props;

    return (
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="Réponses Examens" />

            <div className="p-6 space-y-6">

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Réponses des étudiants</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Liste des réponses pour l'examen: {examenInfo.titre}
                        </p>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500">Examen</h4>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                            {examenInfo.titre}
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500">Professeur</h4>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                            {examenInfo.professeur}
                        </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500">Date limite</h4>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                            {new Date(examenInfo.date_fin).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matricule</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Soumission</th>

                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fichier</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {responses.map((response) => (
                                    <tr key={response.etudiant_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-600 font-medium">
                                                        {response.etudiant?.name?.charAt(0)}{response.etudiant?.prenom?.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {response.etudiant?.prenom} {response.etudiant?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {response.etudiant?.matricule}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(response.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {response.fichier ? (
                                                <a
                                                    href={`/storage/${response.fichier}`}
                                                    className="text-blue-600 hover:underline flex items-center"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                    Voir
                                                </a>
                                            ) : 'Aucun'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/prof/examens/reponse/student/show/${response.examensstudents_id}/${response.etudiant_id}`}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Détails
                                            </Link>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </AppSidebarLayoutProf>
    );
}
