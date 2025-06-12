import AppSidebarLayoutProf from "@/layouts/app/app-sidebarProf-layout";
import { BreadcrumbItem, examentclasseresponse } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";



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
    examansResponse: examentclasseresponse;
}

export default function Page() {
    const { examansResponse } = usePage<CustomPageProps>().props;

    useEffect(() => {
        console.log('Examens Responses:', examansResponse);
    }, [examansResponse]);

    return (
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="Réponses Examens" />

            <div className="p-6 space-y-6">
                {/* Header Section */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Réponse d'examen</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Détails de la réponse soumise par l'étudiant
                        </p>
                    </div>


                </div>

                {/* Student Info Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:px-6 flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 text-xl font-medium">
                                {examansResponse.etudiant.name?.charAt(0) + examansResponse.etudiant.prenom?.charAt(0)}
                            </span>

                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {examansResponse.etudiant.prenom} {examansResponse.etudiant.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Soumis le {new Date(examansResponse.created_at).toLocaleDateString()} à {new Date(examansResponse.created_at).toLocaleTimeString()}
                            </p>
                             <span className="text-blue-600 text-xl font-medium">
                                {examansResponse.etudiant.matricule}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Exam Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500">Examen</h4>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                            {examansResponse.examensclasse.titre}
                        </p>
                         <p className="mt-1 text-lg font-semibold text-gray-900">
                            {examansResponse.examensclasse.professeur?.name} {examansResponse.examensclasse.professeur?.prenom}
                        </p>
                    </div>


                    <div className="bg-white p-4 rounded-lg shadow">
                        <h4 className="text-sm font-medium text-gray-500">Fichier joint</h4>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                            {examansResponse.fichier ? (
                                <a href={`/storage/${examansResponse.fichier}`} className="text-blue-600 hover:underline">
                                    Voir le fichier
                                </a>
                            ) : 'Aucun fichier'}
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
                            dangerouslySetInnerHTML={{ __html: examansResponse?.reponse ?? "Aucune réponse textuelle" }}
                            className="prose max-w-none"
                        />
                    </div>
                </div>

                {/* Comment Section */}
                {examansResponse.commentaire && (
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-blue-50">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Votre correction
                            </h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {examansResponse.commentaire}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AppSidebarLayoutProf>
    );
}
