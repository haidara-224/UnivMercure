import { SendDemandeDocument } from "@/components/ui/etudiant/SendDemandeDocument";
import AppSidebarLayoutEtudiant from "@/layouts/app/app-sidebarEtud-layout";
import { BreadcrumbItem, Demandedocuments } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { FileText, CheckCircle2, Clock, Download, Trash } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Accueil", href: "/" },
    { title: "Mes Documents", href: "/etudiant/documents" },
];

interface PageProps {
    [key: string]: unknown;
}

interface messageFlash {
    flash: {
        success: string,
    }
}

interface CustomPageProps extends PageProps {
    documents: Demandedocuments[];
}

export default function Documents({ flash }: messageFlash) {
    const { documents } = usePage<CustomPageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                position: 'top-right',
                duration: 3000
            });
        }
    }, [flash]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'traité':
                return (
                    <Badge className="gap-1 bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle2 size={14} /> Traité
                    </Badge>
                );
            case 'non traité':
                return (
                    <Badge variant="outline" className="gap-1">
                        <Clock size={14} /> Non traité
                    </Badge>
                );
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const getDocumentIcon = (type: string) => {
        const typeLower = type.toLowerCase();

        if (typeLower.includes('attestation')) {
            return <FileText className="text-blue-500" size={18} />;
        }
        if (typeLower.includes('releve') || typeLower.includes('notes')) {
            return <FileText className="text-green-500" size={18} />;
        }
        if (typeLower.includes('certificat') || typeLower.includes('fin')) {
            return <FileText className="text-purple-500" size={18} />;
        }
        return <FileText className="text-gray-500" size={18} />;
    };

    return (
        <AppSidebarLayoutEtudiant breadcrumbs={breadcrumbs}>
            <Head title="Mes Documents" />

            <div className="space-y-4 p-2 sm:p-4 md:p-6">

                {/* Header avec bouton */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Mes Demandes de Documents</h1>
                    <SendDemandeDocument />
                </div>

                {/* Cartes statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total des demandes</h3>
                        <p className="text-xl sm:text-2xl font-semibold mt-1">{documents.length}</p>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Demandes traitées</h3>
                        <p className="text-xl sm:text-2xl font-semibold mt-1 text-green-600">
                            {documents.filter(d => d.statut === 'traité').length}
                        </p>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Non traitées</h3>
                        <p className="text-xl sm:text-2xl font-semibold mt-1 text-amber-500">
                            {documents.filter(d => d.statut === 'non traité').length}
                        </p>
                    </div>
                </div>

                {/* Tableau responsive */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Commentaire</th>
                                    <th scope="col" className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.length > 0 ? (
                                    documents.map((document) => (
                                        <tr key={document.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 sm:gap-3">
                                                    {getDocumentIcon(document.type_document)}
                                                    <span className="capitalize text-sm sm:text-base">{document.type_document}</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                                                {format(new Date(document.created_at), 'PPP', { locale: fr })}
                                            </td>
                                            <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                                                {getStatusBadge(document.statut)}
                                            </td>
                                            <td className="px-3 py-3 sm:px-4 sm:py-4 hidden md:table-cell" dangerouslySetInnerHTML={{ __html: document.comment }}>
                                            </td>
                                            <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {document.statut === 'traité' && (
                                                        <a
                                                            href={`/storage/${document.traitement?.document}`}
                                                            target="_blank"
                                                            className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-xs sm:text-sm"
                                                        >
                                                            <Download size={14} className="shrink-0" />
                                                            <span className="hidden xs:inline">Télécharger</span>
                                                        </a>
                                                    )}
                                                    {document.statut === 'non traité' && (
                                                        <button
                                                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                                            onClick={() => {
                                                                if (confirm("Êtes-vous sûr de vouloir supprimer cette demande de document ?")) {
                                                                    router.delete(route("etudiant.demande.destroy", document.id), {
                                                                        preserveScroll: true,
                                                                    });
                                                                }
                                                            }}
                                                        >
                                                            <Trash size={14} className="shrink-0" />
                                                            <span className="hidden xs:inline">Supprimer</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <FileText className="h-8 w-8 text-gray-400" />
                                                <p className="text-sm sm:text-base">Aucune demande de document pour le moment</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </AppSidebarLayoutEtudiant>
    );
}
