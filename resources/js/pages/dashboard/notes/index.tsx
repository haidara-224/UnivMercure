import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Download, RefreshCw } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Etudiants, Matiere, Notes } from "@/types";

const breadcrumbs = [
    {
        title: 'Professeurs',
        href: '/dashboard/professeurs',
    },
    {
        title: 'Gestion des Notes',
        href: '/dashboard/notes',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface GroupedNotes {
    annee_scolaire: string;
    departement: string;
    classe: string;
    notes: {
        etudiant: Etudiants;
        matiere: Matiere;
        note: Notes;
    }[];
}

interface PageProps {
    notesGroupes: GroupedNotes[];
    departements: { id: number; name: string }[];
    niveaux: { id: number; niveau: string }[];
    anneesScolaire: { id: number; annee_scolaire: string; isActive?: boolean }[];
}

export default function Page() {
    const { notesGroupes, departements, niveaux, anneesScolaire } = usePage<PageProps>().props;
    const [filteredGroups, setFilteredGroups] = useState<GroupedNotes[]>(notesGroupes);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({
        anneeId: 'all',
        classeId: 'all',
        departementId: 'all',
        search: ''
    });

    useEffect(() => {
        setIsLoading(true);

        let result = [...notesGroupes];
        if (filters.anneeId !== "all") {
            result = result.filter(group =>
                anneesScolaire.find(a => a.id.toString() === filters.anneeId)?.annee_scolaire === group.annee_scolaire
            );
        }
        if (filters.classeId !== "all") {
            result = result.filter(group =>
                niveaux.find(n => n.id.toString() === filters.classeId)?.niveau === group.classe
            );
        }

        if (filters.departementId !== "all") {
            result = result.filter(group =>
                departements.find(d => d.id.toString() === filters.departementId)?.name === group.departement
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            result = result.filter(group =>
                group.notes.some(note =>
                    note.etudiant.name.toLowerCase().includes(searchTerm) ||
                    note.etudiant.matricule.toLowerCase().includes(searchTerm) ||
                    note.matiere.nom.toLowerCase().includes(searchTerm)
                )
            );
        }

        setFilteredGroups(result);
        setTimeout(() => setIsLoading(false), 300);
    }, [filters, notesGroupes, anneesScolaire, niveaux, departements]);

    const handleResetFilters = () => {
        setFilters({
            anneeId: 'all',
            classeId: 'all',
            departementId: 'all',
            search: ''
        });
    };

    const getActiveAnnee = anneesScolaire.find(a => a.isActive);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Notes" />

            <div className="space-y-6">
                <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold text-gray-900">
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Tableau de Bord des Notes
                                </span>
                            </CardTitle>
                            {getActiveAnnee && (
                                <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                                    Année active: {getActiveAnnee.annee_scolaire}
                                </Badge>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                            <div className="relative md:col-span-2">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Rechercher par matière ou étudiant ou Matricule..."
                                    className="pl-10 pr-4 py-2 rounded-lg border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                />
                            </div>
                            <Select
                                value={filters.anneeId}
                                onValueChange={(value) => setFilters({ ...filters, anneeId: value })}
                            >
                                <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Toutes les années" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les années</SelectItem>
                                    {anneesScolaire.map((annee) => (
                                        <SelectItem key={annee.id} value={annee.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                {annee.annee_scolaire}
                                                {annee.isActive && (
                                                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                )}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Filtre par classe */}
                            <Select
                                value={filters.classeId}
                                onValueChange={(value) => setFilters({ ...filters, classeId: value })}
                            >
                                <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Toutes les classes" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Toutes les classes</SelectItem>
                                    {niveaux.map((niveau) => (
                                        <SelectItem key={niveau.id} value={niveau.id.toString()}>
                                            {niveau.niveau}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Filtre par département */}
                            <Select
                                value={filters.departementId}
                                onValueChange={(value) => setFilters({ ...filters, departementId: value })}
                            >
                                <SelectTrigger className="rounded-lg">
                                    <SelectValue placeholder="Tous les départements" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tous les départements</SelectItem>
                                    {departements.map((departement) => (
                                        <SelectItem key={departement.id} value={departement.id.toString()}>
                                            {departement.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="h-5 w-5 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                    {filteredGroups.flatMap(g => g.notes).length} résultat{filteredGroups.flatMap(g => g.notes).length !== 1 ? 's' : ''} trouvé{filteredGroups.flatMap(g => g.notes).length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={handleResetFilters}
                                    className="flex items-center space-x-2"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    <span>Réinitialiser</span>
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2"
                                    disabled={filteredGroups.length === 0}
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Exporter</span>
                                </Button>
                            </div>
                        </div>

                        {/* Tableau */}
                        {filteredGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="mb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg">{group.annee_scolaire}</h3>
                                    <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                                        {group.departement}
                                    </Badge>
                                    <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
                                        {group.classe}
                                    </Badge>
                                </div>
                                <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
                                    <Table>
                                        <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <TableRow>
                                                <TableHead className="w-[200px]">Étudiant</TableHead>
                                                <TableHead>Matière</TableHead>
                                                <TableHead className="text-center">Note 1</TableHead>
                                                <TableHead className="text-center">Note 2</TableHead>
                                                <TableHead className="text-center">Note 3</TableHead>
                                                <TableHead className="text-center">Moyenne</TableHead>
                                                <TableHead className="text-center">Moyenne Littéraire</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {group.notes.map((note, noteIndex) => (
                                                <TableRow key={noteIndex} className="hover:bg-gray-50/50">
                                                    <TableCell className="font-medium flex flex-col">
                                                        {note.etudiant.name} {note.etudiant.prenom}
                                                        <span>{note.etudiant.matricule}</span>
                                                    </TableCell>
                                                    <TableCell>{note.matiere.nom}</TableCell>
                                                    <TableCell className="text-center">
                                                        {note.note.note1?.toFixed(2) || '-'}
                                                    </TableCell>
                                                     <TableCell className="text-center">
                                                        {note.note.note2?.toFixed(2) || '-'}
                                                    </TableCell>
                                                     <TableCell className="text-center">
                                                        {note.note.note3?.toFixed(2) || '-'}
                                                    </TableCell>
                                                     <TableCell className="text-center">
                                                        {note.note.moyenne || '-'}
                                                    </TableCell>
                                                     <TableCell className="text-center">
                                                        {note.note.moyenne_literaire || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        ))}

                        {filteredGroups.length === 0 && !isLoading && (
                            <div className="border rounded-xl overflow-hidden shadow-sm bg-white p-8 text-center text-gray-500">
                                Aucune note ne correspond à vos critères de recherche
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
