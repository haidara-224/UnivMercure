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
            }, 1000); // Réduit à 1 seconde pour une meilleure UX

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
            <div className="overflow-x-auto mt-4 border rounded-lg">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            {TABLE_COLUMNS.map((col) => (
                                <th key={col} className="p-3 text-left">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredNotes.map((note) => (
                            <tr key={note.id} className="hover:bg-gray-50">
                                <td className="p-3">{note.matiere?.nom || '-'}</td>
                                <td className="p-3 font-bold">{note.note1 || '-'}</td>
                                <td className="p-3">{note.note2 || '-'}</td>
                                <td className="p-3">{note.note3 || '-'}</td>
                                <td className="p-3">{note.moyenne || '-'}</td>
                                <td className="p-3">{note.moyenne_literaire || '-'}</td>
                                <td className="p-3">{note.classes?.niveau || '-'}</td>
                                <td className="p-3">{note.departement?.name || '-'}</td>
                                <td className="p-3">{note.annees_scolaire?.annee_scolaire || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <AppSidebarLayoutEtudiant breadcrumbs={breadcrumbs}>
            <Head title="Mes Notes" />
            <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800">Mes Notes</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        placeholder="Département"
                        list="departements"
                        value={filters.departement}
                        onChange={(e) => handleFilterChange('departement', e.target.value)}
                    />
                    <datalist id="departements">
                        {departements.map((d) => (
                            <option key={d.id} value={d.name} />
                        ))}
                    </datalist>

                    <Input
                        placeholder="Classe"
                        list="classes"
                        value={filters.classe}
                        onChange={(e) => handleFilterChange('classe', e.target.value)}
                    />
                    <datalist id="classes">
                        {classes.map((c) => (
                            <option key={c.id} value={c.niveau} />
                        ))}
                    </datalist>

                    <Input
                        placeholder="Année scolaire"
                        list="annes_scolaire"
                        value={filters.annee}
                        onChange={(e) => handleFilterChange('annee', e.target.value)}
                    />
                    <datalist id="annes_scolaire">
                        {annes_scolaire.map((a) => (
                            <option key={a.id} value={a.annee_scolaire} />
                        ))}
                    </datalist>
                </div>

                <div className="flex justify-end">
                    <Button
                        className="flex gap-2 items-center"
                        onClick={exportPDF}
                        disabled={filteredNotes.length === 0}
                    >
                        <FileDown size={18} />
                        Exporter en PDF
                    </Button>
                </div>

                {renderTable()}
            </div>
        </AppSidebarLayoutEtudiant>
    );
}
