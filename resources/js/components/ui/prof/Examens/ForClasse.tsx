import {
    Card, CardContent, CardDescription, CardFooter,
    CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    FileText, BookOpen, Clock,
    Building2, Landmark, FileSearch, Search,
    Edit,
    Loader2,
    Trash2,
    Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AddExamensForClasse } from "./AddExamenForClasse";
import { Departement, ExamensByClasse, Niveaux } from "@/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SubjectModal } from "./SujectModal";
import { Link, useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { ExamensClasseModal } from "./EditExamesnForClasse";

export default function ForClasse({
    departements,
    classes,
    examens,
}: {
    departements: Departement[];
    classes: Niveaux[];
    examens: ExamensByClasse[];
}) {
    const [search, setSearch] = useState("");
    const [openDialogue, setOpenDialogue] = useState(false);
    const [openDialogueEdit, setOpenDialogueEdit] = useState(false);
    const filteredExamens = examens.filter((ex) =>
        ex.titre.toLowerCase().includes(search.toLowerCase()) ||
        ex.departement?.name?.toLowerCase().includes(search.toLowerCase()) ||
        ex.classes?.niveau?.toLowerCase().includes(search.toLowerCase()) ||
        ex.annees_scolaire.annee_scolaire.toLowerCase().includes(search.toLowerCase())
    );
    const [selectedExament, setSelectedExamen] = useState<ExamensByClasse | null>(null);
    const [loadingExamens, setLoadingExamens] = useState<number | null>(null);
    const handleOpenSubjectModal = (examen: ExamensByClasse) => {
        setSelectedExamen(examen);
        setOpenDialogue(true);
    };
    const { delete: destroy } = useForm({});

    const handleEditTuto = (examen: ExamensByClasse) => {
        setSelectedExamen(examen);
        setOpenDialogueEdit(true);
    };

     const handleDeleteExamens = (id: number) => {
         const type="classe"
         const confirm = window.confirm("Êtes-vous sûr de vouloir supprimer ce Examens ?");
         if (confirm) {
             setLoadingExamens(id);
             destroy(route("prof.examens.delete", { type, id }), {
                 preserveScroll: true,
                 onFinish: () => setLoadingExamens(null),
                 onError: () => {
                     setLoadingExamens(null);
                     toast.error("Une erreur est survenue lors de la suppression");
                 },
                 onSuccess: () => {
                     toast.success("Tutoriel supprimé avec succès");
                 },
             });
         }
     };
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                        Examens par Classe
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Liste filtrable des examens créés selon votre emploi du temps.
                    </p>
                </div>
                <AddExamensForClasse departements={departements} classes={classes} />
            </div>


            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-3.5 text-muted-foreground h-4 w-4" />
                <Input
                    type="text"
                    placeholder="Rechercher par titre, classe, département..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>


            {filteredExamens.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 border border-dashed rounded-xl bg-muted/40">
                    <BookOpen className="w-10 h-10 mb-4 text-primary/50" />
                    <h3 className="text-lg font-semibold">Aucun résultat</h3>
                    <p className="text-muted-foreground text-center max-w-sm">
                        Aucun examen ne correspond à votre recherche. Essayez un autre mot-clé.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExamens.map((examen) => (
                        <Card key={examen.id} className="shadow-md hover:shadow-lg transition-all">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold line-clamp-1">
                                    {examen.titre}
                                </CardTitle>
                                <CardDescription className="mt-2 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="flex items-center gap-1.5">
                                        <Landmark className="h-3.5 w-3.5" />
                                        {examen.departement?.name}
                                    </Badge>
                                    <Badge variant="outline" className="flex items-center gap-1.5">
                                        <Building2 className="h-3.5 w-3.5" />
                                        {examen.classes?.niveau}
                                    </Badge>
                                    <Badge className="flex items-center gap-1.5 bg-primary/10 text-primary">
                                        <Clock className="h-3.5 w-3.5" />
                                        {examen.annees_scolaire.annee_scolaire}
                                    </Badge>
                                    <Badge className="flex items-center gap-1.5 bg-primary/10 text-primary">

                                        <Link href={`/prof/examens/reponse/class/${examen.id}`} className="flex items-center gap-1.5">
                                            <span className="text-sm">Voir Reponse</span>
                                        </Link>
                                    </Badge>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex items-center text-sm">
                                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                                    <span>
                                        {format(new Date(examen.date_debut), 'PP', { locale: fr })} -{' '}
                                        {format(new Date(examen.date_fin), 'PP', { locale: fr })}
                                    </span>
                                </div>

                                <div className="flex items-center text-sm">
                                    <Clock className="h-4 w-4 mr-2 text-primary" />
                                    <span>
                                        {format(new Date(examen.date_debut), 'p', { locale: fr })} à{' '}
                                        {format(new Date(examen.date_fin), 'p', { locale: fr })}
                                    </span>
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-between gap-2 pt-2 border-t">
                                {examen.fichier && (
                                    <Button asChild variant="outline" size="sm" className="gap-1.5">
                                        <a href={`/storage/${examen.fichier}`} target="_blank">
                                            <FileText className="h-4 w-4" />
                                            Fichier
                                        </a>
                                    </Button>
                                )}
                                {examen.sujet_explication && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-primary hover:bg-primary/5"
                                        onClick={() => handleOpenSubjectModal(examen)}
                                    >
                                        <FileSearch className="h-4 w-4 mr-1" />
                                        Sujet
                                    </Button>
                                )}
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 sm:flex-none"
                                        onClick={() => handleEditTuto(examen)}
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        <span>Modifier</span>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex-1 sm:flex-none text-white"
                                        onClick={() => handleDeleteExamens(examen.id)}
                                        disabled={loadingExamens === examen.id}
                                    >
                                        {loadingExamens === examen.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                <Trash2 className="h-4 w-4 mr-1 " />
                                                <span>Supprimer</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
            <SubjectModal open={openDialogue}
                onOpenChange={setOpenDialogue}
                examen={selectedExament} />
            <ExamensClasseModal open={openDialogueEdit} onOpenChange={setOpenDialogueEdit} examen={selectedExament} departements={departements} classes={classes} />
        </div>

    );
}
