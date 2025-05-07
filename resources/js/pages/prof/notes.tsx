import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { BreadcrumbItem, Departement, Niveaux, Parcours } from '@/types';
import AppSidebarLayoutProf from '@/layouts/app/app-sidebarProf-layout';

interface PageProps {
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'département et classes', href: '/prof/classe-departement' },
];

interface CustomPageProps extends PageProps {
    departements: Departement[];
    classes: Niveaux[];
    parcours: Parcours[];
}

export default function EtudiantsPage() {
    const { departements, classes, parcours } = usePage<CustomPageProps>().props;

    const [selectedDepartement, setSelectedDepartement] = useState('');
    const [selectedClasse, setSelectedClasse] = useState('');

    const [filteredData, setFilteredData] = useState<Parcours[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasFiltered, setHasFiltered] = useState(false); // ← Ajouté
    const [notes, setNotes] = useState<{ [key: string]: { note1: number; note2: number; note3: number; moyenne: number } }>({});

    const handleNoteChange = (etudiantId: number, field: 'note1' | 'note2' | 'note3', value: string) => {
        const note = Math.max(1, Math.min(20, Number(value))); // Clamp la valeur entre 1 et 20
        const prev = notes[etudiantId] || { note1: 0, note2: 0, note3: 0, moyenne: 0 };
        const updated = { ...prev, [field]: note };

        const moyenne = parseFloat(((updated.note1 + updated.note2 + updated.note3) / 3).toFixed(2));

        setNotes((prevNotes) => ({
            ...prevNotes,
            [etudiantId]: { ...updated, moyenne },
        }));
    };

    const handleFiltrer = () => {
        setLoading(true);
        setHasFiltered(true); // ← On indique qu'on a cliqué sur "Afficher"
        setTimeout(() => {
            const result = parcours
                .filter((p) =>
                    selectedDepartement ? p.departement.id === Number(selectedDepartement) : true
                )
                .filter((p) =>
                    selectedClasse ? p.classes.id === Number(selectedClasse) : true
                );
            setFilteredData(result);
            setLoading(false);
        }, 1000);
    };

    return (
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="Liste des étudiants" />
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Noter Vos Etudiants
                </h1>

                {/* Filtres */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                        <select
                            value={selectedDepartement}
                            onChange={(e) => setSelectedDepartement(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        >

                            <option>Sélectionnez un département</option>
                            {departements.map((d) => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                        <select
                            value={selectedClasse}
                            onChange={(e) => setSelectedClasse(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        >

                            <option>Sélectionnez une classe</option>
                            {classes.map((c) => (
                                <option key={c.id} value={c.id}>{c.niveau}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full md:w-1/3 flex items-center">
                        <Button
                            onClick={handleFiltrer}
                            className="w-fit mt-4"
                            disabled={!selectedDepartement || !selectedClasse || loading}
                        >
                            {loading && (
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            )}
                            Afficher les résultats
                        </Button>

                    </div>
                </div>

                {/* Tableau des résultats – seulement après clic */}
                {hasFiltered && (
                    <div className="mx-auto my-6 w-full max-w-6xl rounded border p-4 bg-white">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Photo</TableHead>
                                    <TableHead>Matricule</TableHead>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Prénom</TableHead>
                                    <TableHead>Classe</TableHead>
                                    <TableHead>Département</TableHead>
                                    <TableHead>Note 1</TableHead>
                                    <TableHead>Note 2</TableHead>
                                    <TableHead>Note 3</TableHead>
                                    <TableHead>Moyenne</TableHead>
                                    <TableHead>Action</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10">
                                            <Loader2 className="animate-spin mx-auto h-6 w-6 text-gray-500" />
                                            <div className="mt-2 text-gray-500">Chargement en cours...</div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData && filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center h-24">
                                            Aucun résultat trouvé.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData?.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell>{/* photo */}</TableCell>
                                            <TableCell>{p.etudiant.matricule}</TableCell>
                                            <TableCell>{p.etudiant.name}</TableCell>
                                            <TableCell>{p.etudiant.prenom}</TableCell>
                                            <TableCell>{p.classes.niveau}</TableCell>
                                            <TableCell>{p.departement.name}</TableCell>
                                            {['note1', 'note2', 'note3'].map((field) => (
                                                <TableCell key={field}>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={20}
                                                        value={notes[p.id]?.[field as keyof typeof notes[0]] ?? ''}
                                                        onChange={(e) => handleNoteChange( p.id, field as 'note1' | 'note2' | 'note3', parseInt(e.target.value, 10))}
                                                        className="border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md py-1 px-2 w-full bg-gray-50 shadow-sm"
                                                        placeholder={`Note ${field.slice(-1)}`}
                                                    />
                                                </TableCell>
                                            ))}
                                            <TableCell className="font-bold text-center">
                                                {notes[p.id]?.moyenne ?? '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => alert(`Notes enregistrées pour ${p.etudiant.name}`)}
                                                >
                                                    Enregistrer
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AppSidebarLayoutProf>
    );
}
