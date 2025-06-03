import { Demandedocuments, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { FileText, CheckCircle2, Clock, Download, Search, Filter, RotateCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Documentaliste Dashboard',
        href: '/documentaliste',
    },
];

import AppSidebarLayoutDocumentaliste from '@/layouts/app/app-documentaliste-layout';

interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    documents: Demandedocuments[]
}

export default function Page() {
    const { documents } = usePage<CustomPageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);



    const filteredDocuments = documents.filter(doc =>
        doc.etudiant.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.etudiant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.type_document.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.statut.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRefresh = () => {
        setIsRefreshing(true);
        window.location.reload();
    };

    return (
        <AppSidebarLayoutDocumentaliste breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Documentaliste" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header avec stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Total Demandes</h3>
                        <p className="text-2xl font-bold mt-1">{documents.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">En cours</h3>
                        <p className="text-2xl font-bold mt-1 text-blue-600">
                            {documents.filter(d => d.statut === 'non traité').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <h3 className="text-sm font-medium text-gray-500">Traités</h3>
                        <p className="text-2xl font-bold mt-1 text-green-600">
                            {documents.filter(d => d.statut === 'traité').length}
                        </p>
                    </div>

                </div>

                {/* Barre de contrôle */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Rechercher par étudiant, type ou statut..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filtrer
                        </Button>
                        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                            <RotateCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Actualiser
                        </Button>
                    </div>
                </div>

                {/* Contenu principal */}
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all">Toutes ({documents.length})</TabsTrigger>
                        <TabsTrigger value="pending">En cours ({documents.filter(d => d.statut === 'non traité').length})</TabsTrigger>
                        <TabsTrigger value="completed">Traités ({documents.filter(d => d.statut === 'traité').length})</TabsTrigger>

                    </TabsList>

                    <TabsContent value="all">
                        <DocumentTable documents={filteredDocuments} />
                    </TabsContent>
                    <TabsContent value="pending">
                        <DocumentTable documents={filteredDocuments.filter(d => d.statut === 'non traité')} />
                    </TabsContent>
                    <TabsContent value="completed">
                        <DocumentTable documents={filteredDocuments.filter(d => d.statut === 'traité')} />
                    </TabsContent>

                </Tabs>
            </div>
        </AppSidebarLayoutDocumentaliste>
    );
}

const DocumentTable = ({ documents }: { documents: Demandedocuments[] }) => {
     const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'traité':
                return <Badge className="gap-1 bg-green-100 text-green-800">
                    <CheckCircle2 size={14} /> Traité
                </Badge>;
            case 'non traité':
                return <Badge className="gap-1 bg-blue-100 text-blue-800">
                    <Clock size={14} /> En cours
                </Badge>;

            default:
                return <Badge>{status}</Badge>;
        }
    };

    const getDocumentIcon = (type: string) => {
        const typeLower = type.toLowerCase();
        if (typeLower.includes('attestation')) return <FileText className="text-blue-500" />;
        if (typeLower.includes('releve')) return <FileText className="text-green-500" />;
        if (typeLower.includes('certificat')) return <FileText className="text-purple-500" />;
        return <FileText className="text-gray-500" />;
    };
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiant</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents.length > 0 ? (
                            documents.map((document) => (
                                <tr key={document.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-4">
                                                <div className="font-medium text-gray-900">
                                                    {document.etudiant.prenom} {document.etudiant.prenom}
                                                </div>
                                                <div className="text-sm text-gray-500">{document.etudiant.matricule}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {getDocumentIcon(document.type_document)}
                                            <span className="capitalize">{document.type_document}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(document.created_at), 'PPP', { locale: fr })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(document.statut)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                Détails
                                            </Button>
                                            {document.statut === 'traité' && (
                                                <Button variant="default" size="sm" className="gap-1">
                                                    <Download size={16} />
                                                    Télécharger
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <FileText className="h-8 w-8 text-gray-400" />
                                        <p>Aucune demande trouvée</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
