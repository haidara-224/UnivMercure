import { Input } from "@/components/ui/input";
import AppSidebarLayoutEtudiant from "@/layouts/app/app-sidebarEtud-layout";
import { AnnessScolaire, BreadcrumbItem, Departement, Niveaux, Notes } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    departements: Departement[];
    classes: Niveaux[];
    annes_scolaire: AnnessScolaire[];
    notes: Notes[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Notes", href: "/Notes" },
];

const TABLE_COLUMNS = [
    "Matière", "Note 1", "Note 2", "Note 3",
    "Moyenne", "Moyenne Littéraire", "Classe",
    "Département", "Année"
];

export default function NotesPage() {
    const { departements, classes, notes, annes_scolaire } = usePage<CustomPageProps>().props;
    const [filters, setFilters] = useState({
        departement: '',
        classe: '',
        annee: ''
    });
    const [showTable, setShowTable] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            const matchesDepartement = filters.departement
                ? note.departement?.name === filters.departement
                : true;
            const matchesClasse = filters.classe
                ? note.classes?.niveau === filters.classe
                : true;
            const matchesAnnee = filters.annee
                ? note.annees_scolaire?.annee_scolaire === filters.annee
                : true;

            return matchesDepartement && matchesClasse && matchesAnnee;
        });
    }, [notes, filters]);

    useEffect(() => {
        const hasFilters = Object.values(filters).some(Boolean);

        if (hasFilters) {
            setLoading(true);
            setShowTable(false);

            const timeout = setTimeout(() => {
                setLoading(false);
                setShowTable(true);
            }, 1000);

            return () => clearTimeout(timeout);
        } else {
            setShowTable(false);
        }
    }, [filters]);

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Mes Notes", 14, 15);

        const tableData = filteredNotes.map(note => [
            note.matiere?.nom || '-',
            note.note1?.toString() || '-',
            note.note2?.toString() || '-',
            note.note3?.toString() || '-',
            note.moyenne || '-',
            note.moyenne_literaire || '-',
            note.classes?.niveau || '-',
            note.departement?.name || '-',
            note.annees_scolaire?.annee_scolaire || '-'
        ]);

        autoTable(doc, {
            head: [TABLE_COLUMNS],
            body: tableData,
            startY: 20,
            styles: {
                cellPadding: 4,
                fontSize: 10,
                valign: 'middle'
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            }
        });

        doc.save(`mes-notes-${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    const renderTable = () => {
        if (loading) {
            return (
                <div className="text-center mt-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Chargement des notes...</p>
                </div>
            );
        }

        if (!showTable) return null;

        if (filteredNotes.length === 0) {
            return (
                <p className="text-center text-gray-500 mt-6">
                    Aucune note trouvée pour cette combinaison.
                </p>
            );
        }

        return (
            <>
                {/* Version desktop (tableau) */}
                <div className="hidden md:block overflow-x-auto mt-4 border rounded-lg">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                {TABLE_COLUMNS.map((col) => (
                                    <th key={col} className="p-3 text-left text-sm">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredNotes.map((note) => (
                                <tr key={note.id} className="hover:bg-gray-50">
                                    <td className="p-3 text-sm">{note.matiere?.nom || '-'}</td>
                                    <td className="p-3 font-bold text-sm">{note.note1 || '-'}</td>
                                    <td className="p-3 text-sm">{note.note2 || '-'}</td>
                                    <td className="p-3 text-sm">{note.note3 || '-'}</td>
                                    <td className="p-3 text-sm">{note.moyenne || '-'}</td>
                                    <td className="p-3 text-sm">{note.moyenne_literaire || '-'}</td>
                                    <td className="p-3 text-sm">{note.classes?.niveau || '-'}</td>
                                    <td className="p-3 text-sm">{note.departement?.name || '-'}</td>
                                    <td className="p-3 text-sm">{note.annees_scolaire?.annee_scolaire || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Version mobile (cartes) */}
                <div className="md:hidden space-y-3 mt-4">
                    {filteredNotes.map((note) => (
                        <div key={note.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-800">{note.matiere?.nom || 'Matière inconnue'}</h3>
                                    <p className="text-sm text-gray-500">{note.classes?.niveau || '-'} • {note.departement?.name || '-'}</p>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    {note.annees_scolaire?.annee_scolaire || '-'}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-3">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Note 1</p>
                                    <p className="font-bold">{note.note1 || '-'}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Note 2</p>
                                    <p className="font-bold">{note.note2 || '-'}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Note 3</p>
                                    <p className="font-bold">{note.note3 || '-'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Moyenne</p>
                                    <p className="font-bold">{note.moyenne || '-'}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500">Moy. Litt.</p>
                                    <p className="font-bold">{note.moyenne_literaire || '-'}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <AppSidebarLayoutEtudiant breadcrumbs={breadcrumbs}>
            <Head title="Mes Notes" />
            <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Mes Notes</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div>
                        <Input
                            placeholder="Département"
                            list="departements"
                            value={filters.departement}
                            onChange={(e) => handleFilterChange('departement', e.target.value)}
                            className="w-full"
                        />
                        <datalist id="departements">
                            {departements.map((d) => (
                                <option key={d.id} value={d.name} />
                            ))}
                        </datalist>
                    </div>

                    <div>
                        <Input
                            placeholder="Classe"
                            list="classes"
                            value={filters.classe}
                            onChange={(e) => handleFilterChange('classe', e.target.value)}
                            className="w-full"
                        />
                        <datalist id="classes">
                            {classes.map((c) => (
                                <option key={c.id} value={c.niveau} />
                            ))}
                        </datalist>
                    </div>

                    <div>
                        <Input
                            placeholder="Année scolaire"
                            list="annes_scolaire"
                            value={filters.annee}
                            onChange={(e) => handleFilterChange('annee', e.target.value)}
                            className="w-full"
                        />
                        <datalist id="annes_scolaire">
                            {annes_scolaire.map((a) => (
                                <option key={a.id} value={a.annee_scolaire} />
                            ))}
                        </datalist>
                    </div>
                </div>

                <div className="flex justify-end mt-2 sm:mt-0">
                    <Button
                        className="flex gap-2 items-center"
                        onClick={exportPDF}
                        disabled={filteredNotes.length === 0}
                        size="sm"
                    >
                        <FileDown size={16} />
                        <span className="hidden sm:inline">Exporter en PDF</span>
                        <span className="sm:hidden">PDF</span>
                    </Button>
                </div>

                {renderTable()}
            </div>
        </AppSidebarLayoutEtudiant>
    );
}
