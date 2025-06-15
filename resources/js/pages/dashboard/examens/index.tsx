import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Exam, ExamsEtudiantsSalle, Salle } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Filter,
    Calendar,
    Clock,
    GraduationCap,
    Users,
    Search,

    FileOutput,
    BookOpen,
    School,
    User,
    DatabaseBackup,
    DatabaseZap,
    Trash
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Examens',
        href: '/dashboard/examens',
    },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    exam: Exam[];
    examsEtudiants: ExamsEtudiantsSalle[];
    salle: Salle[];
}

export default function Page() {
    const { exam, examsEtudiants, salle } = usePage<CustomPageProps>().props;
    const [filterModule, setFilterModule] = useState<string>("");
    const [filterSalle, setFilterSalle] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"exams" | "repartition">("exams");
    const modules = [...new Set(exam.map(e => e.module))];
     const { delete: destroy,  } = useForm({});
    const sallesDisponibles = [...new Set(salle.map(s => s.salle))];
    const filteredExams = exam.filter(e => {
        const matchesModule = filterModule ? e.module === filterModule : true;
        const matchesSearch = searchTerm ?
            e.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (e.matiere?.nom?.toLowerCase().includes(searchTerm.toLowerCase())) : true;
        return matchesModule && matchesSearch;
    });
    const filteredRepartitions = examsEtudiants.filter(r => {
        const matchesSalle = filterSalle ? r.salle?.salle === filterSalle : true;
        const matchesSearch = searchTerm ?
            (r.etudiant?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (r.etudiant?.prenom?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (r.etudiant?.matricule?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (r.exam?.module?.toLowerCase().includes(searchTerm.toLowerCase())) : true;
        return matchesSalle && matchesSearch;
    });

    const formatDate = (dateString: string) => {
        if (!dateString) return "Non défini";
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const totalEtudiantsRepartis = exam.reduce((acc, e) => acc + (e.repartitions?.length || 0), 0);
    const sallesUtilisees = [...new Set(exam.flatMap(e =>
        e.repartitions?.map(r => r.salle?.salle)).filter(Boolean)
    )];

    const exportExamsToPDF = () => {
        const doc = new jsPDF();

        // Titre du document
        doc.setFontSize(18);
        doc.text('Liste des Examens', 14, 22);

        // En-tête du tableau
        const headers = [
            'Module',
            'Matière',
            'Date',
            'Heure',
            'Année Scolaire'
        ];

        // Données du tableau
        const data = exam.map(exam => [
            exam.module,
            exam.matiere?.nom || 'N/A',
            formatDate(exam.date_examen),
            `${exam.heure_debut} - ${exam.heure_fin}`,
            exam.annees_scolaire?.annee_scolaire || 'N/A'
        ]);

        // Génération du tableau
        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 30,
            styles: {
                cellPadding: 3,
                fontSize: 10,
                valign: 'middle'
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            }
        });

        doc.save('liste_examens.pdf');
    };

    const exportRepartitionsToPDF = () => {
        const doc = new jsPDF();

        // Titre du document
        doc.setFontSize(18);
        doc.text('Répartition des Étudiants', 14, 22);

        // En-tête du tableau
        const headers = [
            'Étudiant',
            'Matricule',
            'Module',
            'Matière',
            'Date',
            'Heure',
            'Salle',
            'Années Scolaire'
        ];


        const data = examsEtudiants.map(rep => {
            const examData = rep.exam || exam.find(e => e.id === rep.exam_id);

            return [
                `${rep.etudiant?.name || ''} ${rep.etudiant?.prenom || ''}`,
                rep.etudiant?.matricule || 'N/A',
                examData?.module || 'N/A',
                examData?.matiere?.nom || 'N/A',
                examData ? formatDate(examData.date_examen) : 'N/A',
                examData ? `${examData.heure_debut} - ${examData.heure_fin}` : 'N/A',
                rep.salle?.salle || 'N/A',
                examData?.annees_scolaire?.annee_scolaire || 'N/A',
            ];
        });


        autoTable(doc, {
            head: [headers],
            body: data,
            startY: 30,
            styles: {
                cellPadding: 3,
                fontSize: 9,
                valign: 'middle'
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold'
            },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
                2: { cellWidth: 'auto' },
                3: { cellWidth: 'auto' },
                4: { cellWidth: 'auto' },
                5: { cellWidth: 'auto' },
                6: { cellWidth: 'auto' }
            }
        });

        doc.save('repartition_etudiants.pdf');
    };
  const onDelete = (id:number) => {

        const confirm = window.confirm(`Etes vous sure de vouloir Supprimé l'examen  `)
        if (confirm) {
            destroy(route('dashboard.exam.delete', id), {
                preserveScroll: true,

            });
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Exams" />

            <div className="container mx-auto px-4 py-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Gestion des Examens</h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <Link
                            href="/dashboard/examens/create"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                            <Users className="w-4 h-4" />
                            <span>Répartir les Étudiants</span>
                        </Link>

                    </div>
                </div>

                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`px-4 py-2 font-medium ${activeTab === "exams" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("exams")}
                    >
                        Liste des Examens
                    </button>
                    <button
                        className={`px-4 py-2 font-medium ${activeTab === "repartition" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                        onClick={() => setActiveTab("repartition")}
                    >
                        Répartition des Étudiants
                    </button>
                </div>


                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="text-gray-400 w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {activeTab === "exams" ? (
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Filter className="text-gray-400 w-4 h-4" />
                                    </div>
                                    <select
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                        value={filterModule}
                                        onChange={(e) => setFilterModule(e.target.value)}
                                    >
                                        <option value="">Tous les modules</option>
                                        {modules.map((module) => (
                                            <option key={module} value={module}>{module}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="text-gray-400 w-4 h-4" />
                                </div>
                                <select
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    value={filterSalle}
                                    onChange={(e) => setFilterSalle(e.target.value)}
                                >
                                    <option value="">Toutes les salles</option>
                                    {sallesDisponibles.map((salle, index) => (
                                        <option key={index} value={salle}>{salle}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>


                <div className="flex justify-end gap-3 mb-4">

                    <button
                        onClick={activeTab === "exams" ? exportExamsToPDF : exportRepartitionsToPDF}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        <FileOutput className="w-4 h-4" /> Exporter PDF
                    </button>
                </div>


                {activeTab === "exams" && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matière</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiants</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salles</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Années Scolaire</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredExams.length > 0 ? (
                                        filteredExams.map((exam) => (
                                            <tr key={exam.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{exam.module}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-gray-900 flex items-center gap-1">
                                                        <BookOpen className="w-4 h-4 text-blue-500" />
                                                        {exam.matiere?.nom || "Non spécifié"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-gray-900 flex items-center gap-1">
                                                        <Calendar className="text-blue-500 w-4 h-4" />
                                                        {formatDate(exam.date_examen)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-gray-900 flex items-center gap-1">
                                                        <Clock className="text-blue-500 w-4 h-4" />
                                                        {exam.heure_debut || "--"} - {exam.heure_fin || "--"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        {exam.repartitions?.slice(0, 3).map((rep) => (
                                                            <div key={rep.id} className="flex items-center gap-2">
                                                                <User className="w-4 h-4 text-gray-400" />
                                                                <span className="text-sm">
                                                                    {rep.etudiant?.name} {rep.etudiant?.prenom}
                                                                </span>
                                                            </div>
                                                        ))}
                                                        {exam.repartitions && exam.repartitions.length > 3 && (
                                                            <span className="text-xs text-gray-500">
                                                                +{exam.repartitions.length - 3} autres...
                                                            </span>
                                                        )}
                                                        {!exam.repartitions?.length && (
                                                            <span className="text-sm text-gray-400">Aucun étudiant</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {[...new Set(exam.repartitions?.map(r => r.salle?.salle))].map((salle, i) => (
                                                            salle && (
                                                                <span key={i} className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                                                                    <School className="w-3 h-3" />
                                                                    {salle}
                                                                </span>
                                                            )
                                                        ))}
                                                        {!exam.repartitions?.length && (
                                                            <span className="text-sm text-gray-400">Aucune salle</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                  <div className="text-gray-900 flex items-center gap-1">
                                                        <DatabaseBackup className="text-blue-500 w-4 h-4" />
                                                        {exam.annees_scolaire?.annee_scolaire}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                  <div className="text-gray-900 flex items-center gap-1">

                                                        <button type="submit" onClick={()=>onDelete(exam.id)}><Trash className="text-red-800 w-4 h-4 " /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                                Aucun examen trouvé
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


                {activeTab === "repartition" && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Étudiant</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matière</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salle</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Années Scolaire</th>


                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRepartitions.length > 0 ? (
                                        filteredRepartitions.map((repartition) => {

                                            const examData = repartition.exam ||
                                                exam.find(e => e.id === repartition.exam_id);

                                            return (
                                                <tr key={repartition.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                                <GraduationCap className="text-blue-500 w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900">
                                                                    {repartition.etudiant?.name || "Inconnu"} {repartition.etudiant?.prenom || ""}
                                                                </div>
                                                                <div className="text-gray-500 text-sm">
                                                                    {repartition.etudiant?.matricule || "Non spécifié"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-gray-900">
                                                            {examData?.module || "Non spécifié"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-gray-900 flex items-center gap-1">
                                                            <BookOpen className="w-4 h-4 text-blue-500" />
                                                            {examData?.matiere?.nom || "Non spécifié"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-gray-900 flex items-center gap-1">
                                                            <Calendar className="text-blue-500 w-4 h-4" />
                                                            {examData ? formatDate(examData.date_examen) : "Non spécifié"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-gray-900 flex items-center gap-1">
                                                            <Clock className="text-blue-500 w-4 h-4" />
                                                            {examData?.heure_debut || "--"} - {examData?.heure_fin || "--"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                                                            <School className="w-3 h-3" />
                                                            {repartition.salle?.salle || "Non attribuée"}
                                                        </span>
                                                    </td>
                                                      <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 flex items-center gap-1">
                                                            <DatabaseZap className="w-3 h-3" />
                                                            {examData?.annees_scolaire?.annee_scolaire}
                                                        </span>
                                                    </td>
                                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">

                                                </td>

                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                                Aucune répartition trouvée
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-gray-500 text-sm font-medium">Total Examens</div>
                        <div className="text-2xl font-bold text-blue-600">{exam.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-gray-500 text-sm font-medium">Étudiants Répartis</div>
                        <div className="text-2xl font-bold text-green-600">{totalEtudiantsRepartis}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-gray-500 text-sm font-medium">Salles Utilisées</div>
                        <div className="text-2xl font-bold text-purple-600">{sallesUtilisees.length}</div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
