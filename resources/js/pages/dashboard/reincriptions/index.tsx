import AppLayout from "@/layouts/app-layout";
import { AnnessScolaire, Departement, Niveaux, Parcours } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  School,
  BookOpen,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
const breadcrumbs = [
    {
        title: 'Réinscription',
        href: '/dashboard/reinscriptions',
    },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    parcours: Parcours[];
    departements: Departement[];
    classes: Niveaux[];
    annees:AnnessScolaire
}
interface messageFlash {
    flash: {
        success: string
    }
}

export default function Page({ flash }: messageFlash) {
    const { parcours, departements, classes,annees } = usePage<CustomPageProps>().props;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartement, setSelectedDepartement] = useState("");
    const [selectedClasse, setSelectedClasse] = useState("");
const { delete: destroy,  } = useForm({});
   const filteredParcours = parcours.filter(parcour => {

    if (!parcour.etudiant) return false;
    const matchesSearch = searchTerm === "" ||
        (parcour.etudiant.name && parcour.etudiant.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (parcour.etudiant.prenom && parcour.etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (parcour.etudiant.matricule && parcour.etudiant.matricule.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDepartement = selectedDepartement === "" ||
        (parcour.departement_id && parcour.departement_id.toString() === selectedDepartement);
    const matchesClasse = selectedClasse === "" ||
        (parcour.classes_id && parcour.classes_id.toString() === selectedClasse);

    return matchesSearch && matchesDepartement && matchesClasse;
});

    const totalEtudiants = filteredParcours.length;
    const totalClasses = new Set(filteredParcours.map(p => p.classes_id)).size;
    const totalDepartements = new Set(filteredParcours.map(p => p.departement_id)).size;
    const derniereAnnee = annees.annee_scolaire;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);
 const exportReinscriptionToPDF = () => {
        const doc = new jsPDF();


        doc.setFontSize(18);
        doc.text('Liste des Etudiant Reinscrit', 14, 22);


        const headers = [
            'Matricule',
            'Prenom et Nom',
            'Classes',
            'Departement',
            'Année Scolaire'
        ];


        const data = parcours.map(pr => [
            pr.etudiant.matricule,
           `${pr.etudiant.prenom} - ${pr.etudiant.name}` ,
            pr.classes.niveau,
            pr.departement.name,

            pr.annees_scolaire?.annee_scolaire || 'N/A'
        ]);


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
  const onDelete = (parcour:Parcours) => {

        const confirm = window.confirm(`Etes vous sure de vouloir Supprimé le parcours de l'etudiant ${parcour.etudiant.name} ${parcour.etudiant.prenom} ${parcour.etudiant.matricule} Niveau: ${parcour.classes.niveau} departement: ${parcour.departement.name} années scolaire ${parcour.annees_scolaire.annee_scolaire} `)
        if (confirm) {
            destroy(route('dashboard.parcours.delete', parcour.id), {
                preserveScroll: true,

            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Réinscriptions" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gestion des Réinscriptions</h1>
                        <p className="text-muted-foreground mt-2">
                            Gérez les réinscriptions des étudiants pour l'année {derniereAnnee}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                            <Plus className="w-4 h-4 mr-2" />
                            Nouvelle réinscription
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-600">
                                Étudiants
                            </CardTitle>
                            <Users className="h-4 w-4 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{totalEtudiants}</div>
                            <p className="text-xs text-blue-500 mt-1">
                                Étudiants correspondants aux filtres
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-gradient-to-r from-purple-50 to-purple-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-600">
                                Classes
                            </CardTitle>
                            <School className="h-4 w-4 text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{totalClasses}</div>
                            <p className="text-xs text-purple-500 mt-1">
                                Classes concernées
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-gradient-to-r from-green-50 to-green-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-600">
                                Départements
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{totalDepartements}</div>
                            <p className="text-xs text-green-500 mt-1">
                                Départements concernés
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input
                                placeholder="Rechercher un étudiant (nom, prénom ou matricule)..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedDepartement}
                                    onChange={(e) => setSelectedDepartement(e.target.value)}
                                >
                                    <option value="">Tous les départements</option>
                                    {departements.map((dep) => (
                                        <option key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedClasse}
                                    onChange={(e) => setSelectedClasse(e.target.value)}
                                >
                                    <option value="">Toutes les classes</option>
                                    {classes.map((classe) => (
                                        <option key={classe.id} value={classe.id}>
                                            {classe.niveau}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={exportReinscriptionToPDF} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                <Download className="h-4 w-4 mr-2" />
                                Exporter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tableau des réinscriptions */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[100px]">Matricule</TableHead>
                                <TableHead>Étudiant</TableHead>
                                <TableHead>Classe</TableHead>
                                <TableHead>Département</TableHead>
                                <TableHead>Année Scolaire</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredParcours.length > 0 ? (
                                filteredParcours.map((parcour) => (
                                    <TableRow key={parcour.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{parcour.etudiant.matricule}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                    <GraduationCap className="h-5 w-5 text-gray-500" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{parcour.etudiant.name}</div>
                                                    <div className="text-sm text-gray-500">{parcour.etudiant.prenom}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-blue-200 text-blue-600 bg-blue-50">
                                                {parcour.classes.niveau}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{parcour.departement.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                {parcour.annees_scolaire.annee_scolaire}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                Réinscrit
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <button className="text-red-600 hover:text-red-800 flex items-center gap-1" onClick={()=>onDelete(parcour)}>
                                                 <Trash2 className="h-4 w-4" />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24">
                                        Aucun étudiant trouvé avec les critères de recherche
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>


            </div>
        </AppLayout>
    )
}
