import AppSidebarLayoutProf from "@/layouts/app/app-sidebarProf-layout";
import { BreadcrumbItem, examentclasseresponse } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Examens Responses',
        href: '/prof/examens',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    examansResponses: examentclasseresponse[];

}

export default function Page() {
    const { examansResponses } = usePage<CustomPageProps>().props;

    return (
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="Reponses Examens" />

            <div className="p-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-blue-600 text-white">
                        <h2 className="text-xl font-semibold">Réponses des étudiants</h2>
                        <p className="text-sm opacity-90">Liste des réponses soumises pour cet examen</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departement</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classe</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annees scolaire</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Soumission</th>

                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reponse</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    examansResponses.map((response, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{response.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">

                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{response.etudiant.name}</div>
                                                        <div className="text-sm text-gray-500">{response.etudiant.matricule}</div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{response.examensclasse?.departement?.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{response.examensclasse?.classes?.niveau}</div>
                                            </td>
                                         <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{response.examensclasse?.annees_scolaire?.annee_scolaire}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(response.created_at).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {response.reponse && response.reponse.length > 0 &&
                                                <Link href={`/prof/examens/reponse/class/student/${response.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                                    Voir Reponse
                                                </Link>
                                                }

                                                {
                                                    response.fichier && response.fichier.length > 0 ? (
                                                        <a href={`/storage/${response.fichier}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                                                            Télécharger
                                                        </a>
                                                    ) : <span className="text-red-500">Aucun fichier</span>
                                                }

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
