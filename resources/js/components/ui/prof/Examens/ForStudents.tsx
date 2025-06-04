import React, {  useState } from 'react'
import { AddExamensForStudents } from './AddExamensForStudents';
import { toast } from 'sonner';
import { useForm, usePage } from '@inertiajs/react';
import { ExamensByEtudiant } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, BookOpen, User, FileText, FileSearch,  Loader2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SubjectModalEtudiant } from './SujectModalEtudiant';
import { Input } from '../../input';

interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    examensEtd: ExamensByEtudiant[]
}


export default function ForStudents() {
    const { examensEtd } = usePage<CustomPageProps>().props;
    const [selectedExament, setSelectedExamen] = useState<ExamensByEtudiant | null>(null);

    const [openDialogue, setOpenDialogue] = useState(false);


    const handleOpenSubjectModal = (examen: ExamensByEtudiant) => {
        setSelectedExamen(examen);
        setOpenDialogue(true);
    };
    const { delete: destroy } = useForm({});
    const [search, setSearch] = useState("");


    const [loadingExamens, setLoadingExamens] = useState<number | null>(null);
    const handleDeleteExamens = (id: number) => {
        const type="etudiant"
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
                        Examens par Étudiant
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Consultez tous les examens assignés à vos étudiants
                    </p>
                </div>
                <AddExamensForStudents />
            </div>
            <div className="w-full md:w-1/3">
  <Input
    placeholder="🔍 Rechercher un examen..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mt-4"
  />
</div>


            {examensEtd.length === 0 ? (
                <Card className="text-center p-8">
                    <p className="text-lg text-muted-foreground">
                        Aucun examen n'a été assigné à vos étudiants pour le moment.
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {examensEtd
  .filter((examen) =>
    examen.titre.toLowerCase().includes(search.toLowerCase())
  )
  .map((examen) => (
                        <Card key={examen.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between gap-2 pt-2 border-t">
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
                                </div>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl line-clamp-2">
                                        {examen.titre}
                                    </CardTitle>

                                </div>
                                {examen.professeur && (
                                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                                        <User className="h-4 w-4 mr-1" />
                                        {examen.professeur.name} {examen.professeur.prenom}
                                    </div>
                                )}
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

                                <div className="text-sm">
                                    <div className="flex items-start">
                                        <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                                        <p className="text-muted-foreground line-clamp-3">
                                            {examen.sujet_explication}
                                        </p>
                                    </div>
                                </div>



                                {examen.etudiants && examen.etudiants.length > 0 && (
                                    <div className="pt-2">
                                        <p className="text-sm font-medium mb-1">Étudiants concernés:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {examen.etudiants.map((etudiant) => (
                                                <Badge key={etudiant.id} variant="outline">
                                                    {etudiant.name} {etudiant.prenom}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
             <SubjectModalEtudiant open={openDialogue}
                onOpenChange={setOpenDialogue}
                examen={selectedExament} />
        </div>
    )
}
