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
import { TraitementModale } from '@/components/ui/dashbord/Document/Traitement';

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

            <div className="flex flex-col gap-4 p-2 sm:p-4 md:p-6">
                {/* Header avec stats - version mobile first */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total</h3>
                        <p className="text-xl sm:text-2xl font-bold mt-1">{documents.length}</p>
                    </div>
                    <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">En cours</h3>
                        <p className="text-xl sm:text-2xl font-bold mt-1 text-blue-600">
                            {documents.filter(d => d.statut === 'non traité').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Traités</h3>
                        <p className="text-xl sm:text-2xl font-bold mt-1 text-green-600">
                            {documents.filter(d => d.statut === 'traité').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-sm border border-gray-200">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Actions</h3>
                        <Button variant="outline" size="sm" className="mt-1 w-full" onClick={handleRefresh} disabled={isRefreshing}>
                            <RotateCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                            <span className="text-xs sm:text-sm">Actualiser</span>
                        </Button>
                    </div>
                </div>

                {/* Barre de contrôle - version empilée sur mobile */}
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 items-stretch sm:items-center justify-between bg-white p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
                    <div className="relative w-full">
                        <Search className="absolute left-2 sm:left-3 top-2 sm:top-3 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <Input
                            placeholder="Rechercher..."
                            className="pl-7 sm:pl-10 text-xs sm:text-sm h-8 sm:h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-1 sm:gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Filtrer</span>
                        </Button>
                    </div>
                </div>

                {/* Contenu principal - tabs responsive */}
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-10 sm:h-auto">
                        <TabsTrigger value="all" className="text-xs sm:text-sm p-1 sm:p-2">Toutes ({documents.length})</TabsTrigger>
                        <TabsTrigger value="pending" className="text-xs sm:text-sm p-1 sm:p-2">En cours ({documents.filter(d => d.statut === 'non traité').length})</TabsTrigger>
                        <TabsTrigger value="completed" className="text-xs sm:text-sm p-1 sm:p-2">Traités ({documents.filter(d => d.statut === 'traité').length})</TabsTrigger>
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
      const [selectedDocument, setSelectedDocument] = useState<Demandedocuments | null>(null);
    const [openDialogue, setOpenDialogue] = useState(false);
    const handleOpenDialogue = (document: Demandedocuments) => {
        setSelectedDocument(document);
        setOpenDialogue(true);
    };
    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'traité':
                return <Badge className="gap-1 bg-green-100 text-green-800 text-xs">
                    <CheckCircle2 size={12} /> Traité
                </Badge>;
            case 'non traité':
                return <Badge className="gap-1 bg-blue-100 text-blue-800 text-xs">
                    <Clock size={12} /> En cours
                </Badge>;
            default:
                return <Badge className="text-xs">{status}</Badge>;
        }
    };

    const getDocumentIcon = (type: string) => {
        const typeLower = type.toLowerCase();
        if (typeLower.includes('attestation')) return <FileText className="text-blue-500 h-4 w-4" />;
        if (typeLower.includes('releve')) return <FileText className="text-green-500 h-4 w-4" />;
        if (typeLower.includes('certificat')) return <FileText className="text-purple-500 h-4 w-4" />;
        return <FileText className="text-gray-500 h-4 w-4" />;
    };

    return (
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiant</th>
                            <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="hidden sm:table-cell px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            <th className="hidden md:table-cell px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                            <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents.length > 0 ? (
                            documents.map((document) => (
                                <tr key={document.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="ml-1 sm:ml-2">
                                                <div className="font-medium text-gray-900 text-xs sm:text-sm">
                                                    {document.etudiant.prenom} {document.etudiant.name}
                                                </div>
                                                <div className="text-gray-500 text-xs">{document.etudiant.matricule}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                                        <div className="flex items-center gap-1">
                                            {getDocumentIcon(document.type_document)}
                                            <span className="capitalize text-xs sm:text-sm hidden sm:inline">{document.type_document}</span>
                                            <span className="capitalize text-xs sm:hidden">
                                                {document.type_document.split(' ')[0]}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="hidden sm:table-cell px-4 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                        {format(new Date(document.created_at), 'PP', { locale: fr })}
                                    </td>
                                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                                        {getStatusBadge(document.statut)}
                                    </td>
                                    <td className="hidden md:table-cell px-4 py-3 text-xs sm:text-sm text-gray-500 max-w-xs truncate" dangerouslySetInnerHTML={{ __html: document.comment }} />
                                    <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-xs sm:text-sm font-medium">
                                        <div className="flex gap-1">
                                            {/**
                                             *   <Button variant="outline" size="sm" className="h-6 sm:h-9">
                                                <span className="hidden sm:inline">Détails</span>
                                                <span className="sm:hidden">...</span>
                                            </Button>
                                             */}


                                                <Button variant="default" size="sm" className="h-6 sm:h-9 gap-1" onClick={() => handleOpenDialogue(document)}>
                                                    <Download size={12}  />
                                                    <span className="hidden sm:inline">{document.statut=="non traité" ? 'Télécharger le document' : 'Modifier le document'}</span>
                                                </Button>

                                        </div>
                                    </td>
                                    <TraitementModale open={openDialogue} onOpenChange={setOpenDialogue} document={selectedDocument} />
                                </tr>

                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <FileText className="h-6 w-6 text-gray-400" />
                                        <p className="text-sm">Aucune demande trouvée</p>
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
