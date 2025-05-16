import React, { useEffect, useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { AnnessScolaire, BreadcrumbItem, Departement, EmploieTemps, Niveaux, Notes, Parcours } from '@/types';
import AppSidebarLayoutProf from '@/layouts/app/app-sidebarProf-layout';
import { toast } from 'sonner';



interface PageProps {
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notation Etudiants', href: '/prof/notes' },
];



interface FormData {

    note1: number;
    note2: number;
    note3: number;
    matiere: number;
    module: string;
    annees_scolaire: number;
    classe: number;
    departement: number;
    etudiant: number;
    moyenne: number | null;
    moyenne_literaire: string | null;
    [key: string]: string | number | null
}

interface CustomPageProps extends PageProps {
    departements: Departement[];
    classes: Niveaux[];
    parcours: Parcours[];
    enseignements: EmploieTemps[];
    annees_scolaire: AnnessScolaire;
    notes: Record<number, Notes[]>;
}
interface messageFlash {
    flash: {
        success: string,

    }
}
export default function EtudiantsPage({ flash }: messageFlash) {
    const { departements, classes, parcours, enseignements, annees_scolaire, notes } = usePage<CustomPageProps>().props;

    const [selectedDepartement, setSelectedDepartement] = useState('');
    const [selectedClasse, setSelectedClasse] = useState('');
    const [filteredData, setFilteredData] = useState<Parcours[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasFiltered, setHasFiltered] = useState(false);
    const [isGenerate, setIsGenerate] = useState(false)
    const matiereCorrespondante = enseignements.find(
        (e) => e.departement_id === Number(selectedDepartement) && e.classes_id === Number(selectedClasse)
    )?.matiere;

    useEffect(() => {
        if (flash?.success) {
            toast(flash.success);
        }

    }, [flash]);



    const [studentNotes, setStudentNotes] = useState<Record<number, FormData>>({});

    const handleFiltrer = () => {
        setLoading(true);
        setHasFiltered(true);

        setTimeout(() => {
            const result = parcours
                .filter((p) => !selectedDepartement || p.departement.id === Number(selectedDepartement))
                .filter((p) => !selectedClasse || p.classes.id === Number(selectedClasse));

            const initialNotes: Record<number, FormData> = {};
            result.forEach(p => {
                const existingNote = notes[Number(p.etudiant.id)]?.[0];

                initialNotes[Number(p.etudiant.id)] = {
                    note1: existingNote?.note1 ?? 0,
                    note2: existingNote?.note2 ?? 0,
                    note3: existingNote?.note3 ?? 0,
                    moyenne: existingNote?.moyenne ?? null,
                    moyenne_literaire: existingNote?.moyenne_literaire ?? null,
                    matiere: Number(matiereCorrespondante?.id),
                    module: 'hello babe',
                    annees_scolaire: annees_scolaire.id,
                    classe: Number(selectedClasse),
                    departement: Number(selectedDepartement),
                    etudiant: Number(p.etudiant.id),
                };
            });


            setStudentNotes(initialNotes);
            setFilteredData(result);
            setLoading(false);
        }, 1000);
    };
    const generatePdf = () => {
        const doc = new jsPDF({
            orientation: 'landscape'
        });

        setIsGenerate(true)

        const headerColor = '#2c3e50';
        const evenRowColor = '#f8f9fa';
        const textColor = '#2c3e50';
        const borderColor = '#e0e0e0';

        const pageWidth = doc.internal.pageSize.width;

        const title1 = "Université Mercure International";
        const title2 = `Fiche de Notes - Année ${annees_scolaire.annee_scolaire}`;

        const centerText = (text: string) => (pageWidth - doc.getTextWidth(text)) / 2;

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(headerColor);

        doc.text(title1, centerText(title1), 10);
        doc.text(title2, centerText(title2), 20);
        autoTable(doc, {
            startY: 25,
            margin: { left: 50, right: 50 },
            tableWidth: 'auto',
            showHead: 'everyPage',
            pageBreak: 'auto',
            headStyles: {
                fillColor: headerColor,
                textColor: '#ffffff',
                fontStyle: 'bold',
                fontSize: 8,
                cellPadding: 2
            },
            bodyStyles: {
                textColor: textColor,
                fontSize: 7,
                cellPadding: 2,
                overflow: 'linebreak'
            },
            alternateRowStyles: {
                fillColor: evenRowColor
            },
            styles: {
                cellWidth: 'wrap',
                halign: 'center',
                lineColor: borderColor,
                lineWidth: 0.2,
                valign: 'middle'
            },
            columnStyles: {
                0: { cellWidth: 20, halign: 'left' },
                1: { cellWidth: 25, halign: 'left' },
                2: { cellWidth: 25, halign: 'left' },
                3: { cellWidth: 15 },
                4: { cellWidth: 25 },
                5: { cellWidth: 25 },
                6: { cellWidth: 12 },
                7: { cellWidth: 12 },
                8: { cellWidth: 12 },
                9: { cellWidth: 15 },
                10: { cellWidth: 15 }
            },
            didDrawPage: function (data) {

                doc.setFontSize(8);
                doc.setTextColor(100);
                const pageSize = doc.internal.pageSize;
                doc.text(
                    `Page ${data.pageNumber}`,
                    pageSize.width - 15,
                    pageSize.height - 10
                );
            },
            head: [[
                "Matricule", "Nom", "Prénom", "Classe",
                "Départ.", "Matière", "Note 1",
                "Note 2", "Note 3", "Moy.", "Litt."
            ]],
            body: filteredData?.map(etudiant => {
                const note = studentNotes[Number(etudiant.etudiant.id)];

                return [
                    etudiant.etudiant.matricule,
                    etudiant.etudiant.name.substring(0, 15),
                    etudiant.etudiant.prenom.substring(0, 15),
                    etudiant.classes.niveau,
                    etudiant.departement.name.substring(0, 15),
                    (matiereCorrespondante?.nom ?? '-').substring(0, 15),
                    note?.note1?.toFixed(2) ?? '-',
                    note?.note2?.toFixed(2) ?? '-',
                    note?.note3?.toFixed(2) ?? '-',
                    note?.moyenne?.toFixed(2) ?? '-',
                    note?.moyenne_literaire ?? '-'
                ];
            }) ?? []
        });
        setTimeout(() => {
            setIsGenerate(false);
            doc.save("fiche-notes.pdf");
        }, 3000); // ou même 0 ms si c'est juste pour attendre

    };


    const getMoyenneLitteraire = (moyenne: number): string => {
        if (moyenne >= 18) return 'A+';
        if (moyenne >= 16) return 'A';
        if (moyenne >= 15) return 'A-';
        if (moyenne >= 14) return 'B+';
        if (moyenne >= 13) return 'B';
        if (moyenne >= 12) return 'B-';
        if (moyenne >= 11) return 'C+';
        if (moyenne >= 10) return 'C';
        if (moyenne >= 9) return 'C-';
        if (moyenne >= 8) return 'D+';
        if (moyenne >= 7) return 'D';
        if (moyenne >= 6) return 'D-';
        if (moyenne >= 5) return 'E';
        return 'F';
    };

    const handleNoteChange = (etudiantId: number, field: keyof FormData, value: number) => {

        if (value < 0 || value > 20) return;

        setStudentNotes(prev => {
            const updated = { ...prev };
            const current = updated[etudiantId];

            if (!current) return prev;

            current[field] = value;

            const moyenne = parseFloat(((current.note1 + current.note2 + current.note3) / 3).toFixed(2));
            current.moyenne = moyenne;
            current.moyenne_literaire = getMoyenneLitteraire(moyenne);

            return { ...updated, [etudiantId]: current };
        });
    };

    const [loadingEtudiant, setLoadingEtudiant] = useState<number | null>(null);



    const handleSubmit = (etudiantId: number) => {
        const payload = studentNotes[etudiantId];
        if (!payload) return;
        setLoadingEtudiant(etudiantId);

        const formData = {
            etudiant: etudiantId,
            note1: payload.note1,
            note2: payload.note2,
            note3: payload.note3,
            moyenne: payload.moyenne,
            moyenne_literaire: payload.moyenne_literaire,
            matiere: payload.matiere,
            module: payload.module,
            annees_scolaire: payload.annees_scolaire,
            classe: payload.classe,
            departement: payload.departement
        };
        router.post(route('prof.notes.store'), formData, {
            onError: () => {
                alert("Erreur lors de l'enregistrement des notes");
                setLoadingEtudiant(null);
            },
            onSuccess: () => {


                setLoadingEtudiant(null);
                setTimeout(() => {

                }, 2000);


            }
        });

    };

    return (
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="Liste des étudiants" />


            <div className="p-6 bg-gray-100 min-h-screen">

                <h1 className='text-center text-2xl text-slate-800 mb-5'>Année Scolaire : {annees_scolaire.annee_scolaire}</h1>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                        <select
                            value={selectedDepartement}
                            onChange={(e) => setSelectedDepartement(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        >
                            <option value="">Sélectionnez un département</option>
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
                            <option value="">Sélectionnez une classe</option>
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
                            {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}Afficher la Liste
                        </Button>
                    </div>
                </div>
                {hasFiltered && filteredData?.length !== 0 && (
                    <Button disabled={isGenerate} onClick={generatePdf} className="flex items-center gap-2">
                        {isGenerate ? (
                            <>
                                <Loader2 className="animate-spin w-4 h-4" />
                                Génération en cours...
                            </>
                        ) : (
                            'Générer un PDF'
                        )}
                    </Button>
                )}


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
                                    <TableHead>Matière</TableHead>
                                    <TableHead>credits</TableHead>
                                    <TableHead>Note 1</TableHead>
                                    <TableHead>Note 2</TableHead>
                                    <TableHead>Note 3</TableHead>
                                    <TableHead>Moyenne</TableHead>
                                    <TableHead>Moyenne Littéraire</TableHead>

                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={13} className="text-center py-10">
                                            <Loader2 className="animate-spin mx-auto h-6 w-6 text-gray-500" />
                                            <div className="mt-2 text-gray-500">Chargement en cours...</div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData && filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={13} className="text-center h-24">Aucun résultat trouvé.</TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData?.map((p) => {


                                        return (
                                            <TableRow key={p.id}>
                                                <TableCell>
                                                    {p.etudiant.photo ? (
                                                        <img
                                                            src={`/storage/${p.etudiant.photo}`}
                                                            alt="Photo de l'étudiant"
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-gray-500">Pas de photo</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>{p.etudiant.matricule}</TableCell>
                                                <TableCell>{p.etudiant.name}</TableCell>
                                                <TableCell>{p.etudiant.prenom}</TableCell>
                                                <TableCell>{p.classes.niveau}</TableCell>
                                                <TableCell>{p.departement.name}</TableCell>
                                                <TableCell>{matiereCorrespondante?.nom || '-'}</TableCell>
                                                <TableCell>{matiereCorrespondante?.credits || '-'}</TableCell>

                                                <TableCell>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={20}
                                                        step="0.01"
                                                        value={studentNotes[parseFloat(p.etudiant.id)]?.note1 ?? 0}
                                                        onChange={(e) => handleNoteChange(parseFloat(p.etudiant.id), 'note1', parseFloat(e.target.value))}
                                                        className="border border-gray-300 rounded-md px-2 py-1 text-center"
                                                    />

                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={20}
                                                        step="0.01"
                                                        value={studentNotes[parseFloat(p.etudiant.id)]?.note2 ?? 0}
                                                        onChange={(e) => handleNoteChange(parseFloat(p.etudiant.id), 'note2', parseFloat(e.target.value))}
                                                        className="border border-gray-300 rounded-md px-2 py-1 text-center"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={20}
                                                        step="0.01"
                                                        value={studentNotes[parseFloat(p.etudiant.id)]?.note3 ?? 0}
                                                        onChange={(e) => handleNoteChange(parseFloat(p.etudiant.id), 'note3', parseFloat(e.target.value))}
                                                        className="border border-gray-300 rounded-md px-2 py-1 text-center"
                                                    />


                                                </TableCell>
                                                <TableCell>{studentNotes[Number(p.etudiant.id)]?.moyenne ?? '-'}</TableCell>
                                                <TableCell>{studentNotes[Number(p.etudiant.id)]?.moyenne_literaire ?? '-'}</TableCell>

                                                <TableCell>


                                                    <Button
                                                        onClick={() => handleSubmit(Number(p.etudiant.id))}

                                                        disabled={!studentNotes[Number(p.etudiant.id)]?.note1 || !studentNotes[Number(p.etudiant.id)]?.note2 || !studentNotes[Number(p.etudiant.id)]?.note3 || !matiereCorrespondante?.id}
                                                    >
                                                        {loadingEtudiant === Number(p.etudiant.id) ? (
                                                            <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                                        ) : 'Enregistrer'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </AppSidebarLayoutProf>
    );
}
