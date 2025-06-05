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
    { title: "Mes Documents", href: "#" },
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

            <div className="space-y-8 p-4 md:p-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <SendDemandeDocument />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Total des demandes</h3>
                        <p className="text-2xl font-semibold mt-1">{documents.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Demandes traitées</h3>
                        <p className="text-2xl font-semibold mt-1 text-green-600">
                            {documents.filter(d => d.statut === 'traité').length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Non traitées</h3>
                        <p className="text-2xl font-semibold mt-1 text-amber-500">
                            {documents.filter(d => d.statut === 'non traité').length}
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commentaire</th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.length > 0 ? (
                                    documents.map((document) => (
                                        <tr key={document.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    {getDocumentIcon(document.type_document)}
                                                    <span className="capitalize">{document.type_document}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {format(new Date(document.created_at), 'PPP', { locale: fr })}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {getStatusBadge(document.statut)}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: document.comment }}>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                                {document.statut === 'traité' && (
                                                    <button className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1">
                                                        <Download size={16} />
                                                        <a href={`/storage/${document.traitement?.document}`} target="_blank">
                                                            <FileText className="h-4 w-4" />
                                                            Fichier
                                                        </a>
                                                    </button>
                                                )}
                                                {document.statut === 'non traité' && (
                                                    <button className="text-red-600 hover:text-red-900 flex items-center gap-1" onClick={() => {
                                                        if (confirm("Êtes-vous sûr de vouloir supprimer cette demande de document ?")) {
                                                            router.delete(route("etudiant.demande.destroy", document.id), {
                                                                preserveScroll: true,

                                                            });
                                                        }
                                                    }}>
                                                       <Trash size={24} />

                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <FileText className="h-8 w-8 text-gray-400" />
                                                <p>Aucune demande de document pour le moment</p>
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
