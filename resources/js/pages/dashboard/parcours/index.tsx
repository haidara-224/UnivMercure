import AppLayout from "@/layouts/app-layout";
import { AnnessScolaire, Departement, Niveaux, Parcours } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {

    Users,
    School,
    BookOpen,
    Calendar,
    Search,
    Filter,
    Download,
    Trash2,
    ChevronDown,
    ChevronUp
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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const breadcrumbs = [
    {
        title: 'Parcours',
        href: '/dashboard/Parcours',
    },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    parcours: Parcours[];
    departements: Departement[];
    classes: Niveaux[];
    annees: AnnessScolaire[]
}
interface messageFlash {
    flash: {
        success: string
    }
}

export default function Page({ flash }: messageFlash) {
    const { parcours, departements, classes, annees } = usePage<CustomPageProps>().props;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartement, setSelectedDepartement] = useState("all");
    const [selectedClasse, setSelectedClasse] = useState("all");
    const [selectedAnnees, setSelectedAnnees] = useState("all");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
    const { delete: destroy } = useForm({});

    const filteredParcours = parcours.filter(parcour => {
        if (!parcour.etudiant) return false;
        const matchesSearch = searchTerm === "" ||
            (parcour.etudiant.name && parcour.etudiant.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (parcour.etudiant.prenom && parcour.etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (parcour.etudiant.matricule && parcour.etudiant.matricule.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesDepartement = selectedDepartement === "all" ||
            (parcour.departement_id && parcour.departement_id.toString() === selectedDepartement);
        const matchesClasse = selectedClasse === "all" ||
            (parcour.classes_id && parcour.classes_id.toString() === selectedClasse);
        const matchesAnnee = selectedAnnees === "all" ||
            (parcour.annees_scolaire_id && parcour.annees_scolaire_id.toString() === selectedAnnees);

        return matchesSearch && matchesDepartement && matchesClasse && matchesAnnee;
    });

    const sortedParcours = [...filteredParcours].sort((a, b) => {
        if (!sortConfig) return 0;

        const aEtudiant = a.etudiant;
        const bEtudiant = b.etudiant;
        const aValue = aEtudiant ? aEtudiant[sortConfig.key as keyof typeof aEtudiant] : undefined;
        const bValue = bEtudiant ? bEtudiant[sortConfig.key as keyof typeof bEtudiant] : undefined;

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (bValue == null) return sortConfig.direction === 'ascending' ? 1 : -1;

        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const totalEtudiants = filteredParcours.length;
    const totalClasses = new Set(filteredParcours.map(p => p.classes_id)).size;
    const totalDepartements = new Set(filteredParcours.map(p => p.departement_id)).size;
    const totalAnnees = new Set(filteredParcours.map(p => p.annees_scolaire?.annee_scolaire)).size;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const exportReinscriptionToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Liste des Parcours Etudiants', 14, 22);

        const headers = [
            'Matricule',
            'Prénom et Nom',
            'Classe',
            'Département',
            'Année Scolaire'
        ];

        const data = parcours.map(pr => [
            pr.etudiant.matricule,
            `${pr.etudiant.prenom} ${pr.etudiant.name}`,
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
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
            }
        });

        doc.save('liste_parcours_etudiants.pdf');
    };

    const onDelete = (parcour: Parcours) => {
        const confirm = window.confirm(`Êtes-vous sûr de vouloir supprimer le parcours de l'étudiant ${parcour.etudiant.name} ${parcour.etudiant.prenom} (${parcour.etudiant.matricule}) - Niveau: ${parcour.classes.niveau}, Département: ${parcour.departement.name}, Année scolaire: ${parcour.annees_scolaire.annee_scolaire} ?`);
        if (confirm) {
            destroy(route('dashboard.parcours.delete', parcour.id), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Parcours des Étudiants" />

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-2xl font-bold tracking-tight">Parcours des Étudiants</h1>
                    <div className="flex items-center gap-2">
                        <Button onClick={exportReinscriptionToPDF} variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Exporter PDF
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

                    <Card className="border-0 shadow-sm bg-gradient-to-r from-fuchsia-50 to-fuchsia-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-fuchsia-600">
                                Années Scolaires
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-fuchsia-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-fuchsia-600">{totalAnnees}</div>
                            <p className="text-xs text-fuchsia-500 mt-1">
                                Années scolaires concernées
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-0 shadow-sm">
                    <CardHeader>
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

                            <div className="flex gap-2 flex-wrap">
                                <Select value={selectedDepartement} onValueChange={setSelectedDepartement}>
                                    <SelectTrigger className="w-[180px]">
                                        <div className="flex items-center gap-2">
                                            <Filter className="h-4 w-4 text-gray-400" />
                                            <SelectValue placeholder="Département" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les départements</SelectItem>
                                        {departements.map((dep) => (
                                            <SelectItem key={dep.id} value={dep.id.toString()}>
                                                {dep.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedClasse} onValueChange={setSelectedClasse}>
                                    <SelectTrigger className="w-[180px]">
                                        <div className="flex items-center gap-2">
                                            <Filter className="h-4 w-4 text-gray-400" />
                                            <SelectValue placeholder="Classe" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toutes les classes</SelectItem>
                                        {classes.map((classe) => (
                                            <SelectItem key={classe.id} value={classe.id.toString()}>
                                                {classe.niveau}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={selectedAnnees} onValueChange={setSelectedAnnees}>
                                    <SelectTrigger className="w-[180px]">
                                        <div className="flex items-center gap-2">
                                            <Filter className="h-4 w-4 text-gray-400" />
                                            <SelectValue placeholder="Année scolaire" />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toutes les années</SelectItem>
                                        {annees.map((ann) => (
                                            <SelectItem key={ann.id} value={ann.id.toString()}>
                                                {ann.annee_scolaire}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                         <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSearchTerm('');
                              setSelectedDepartement('all');
                              setSelectedClasse('all');
                              setSelectedAnnees('all');
                            }}
                          >
                            Réinitialiser les filtres
                          </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader className="bg-gray-50">
                                    <TableRow>
                                        <TableHead className="w-[120px]">
                                            <button
                                                type="button"
                                                className="flex items-center gap-1"
                                                onClick={() => requestSort('matricule')}
                                            >
                                                Matricule
                                                {sortConfig?.key === 'matricule' && (
                                                    sortConfig.direction === 'ascending' ?
                                                        <ChevronUp className="h-4 w-4" /> :
                                                        <ChevronDown className="h-4 w-4" />
                                                )}
                                            </button>
                                        </TableHead>
                                        <TableHead>
                                            <button
                                                type="button"
                                                className="flex items-center gap-1"
                                                onClick={() => requestSort('name')}
                                            >
                                                Étudiant
                                                {sortConfig?.key === 'name' && (
                                                    sortConfig.direction === 'ascending' ?
                                                        <ChevronUp className="h-4 w-4" /> :
                                                        <ChevronDown className="h-4 w-4" />
                                                )}
                                            </button>
                                        </TableHead>
                                        <TableHead>Classe</TableHead>
                                        <TableHead>Département</TableHead>
                                        <TableHead>Année Scolaire</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedParcours.length > 0 ? (
                                        sortedParcours.map((parcour) => (
                                            <TableRow key={parcour.id} className="hover:bg-gray-50/50">
                                                <TableCell className="font-medium">
                                                    <Badge variant="secondary" className="font-mono">
                                                        {parcour.etudiant.matricule}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-9 w-9">
                                                            <AvatarImage src={parcour?.etudiant?.photo ?? undefined} alt={`${parcour.etudiant.name} ${parcour.etudiant.prenom}`} />
                                                            <AvatarFallback>
                                                                {parcour.etudiant.name.charAt(0)}{parcour.etudiant.prenom.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{parcour.etudiant.name} {parcour.etudiant.prenom}</div>
                                                            <div className="text-sm text-gray-500">{parcour.etudiant.user?.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-blue-200 text-blue-600 bg-blue-50">
                                                        {parcour.classes.niveau}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">
                                                        {parcour.departement.name}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="outline" className="border-purple-200 text-purple-600 bg-purple-50">
                                                            <Calendar className="h-3 w-3 mr-1" />
                                                            {parcour.annees_scolaire.annee_scolaire}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                                                    onClick={() => onDelete(parcour)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>Supprimer ce parcours</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center h-24">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <School className="h-8 w-8 text-gray-400" />
                                                    <p className="text-gray-500">Aucun étudiant trouvé avec les critères de recherche</p>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSearchTerm('');
                                                            setSelectedDepartement('all');
                                                            setSelectedClasse('all');
                                                            setSelectedAnnees('all');
                                                        }}
                                                    >
                                                        Réinitialiser les filtres
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
