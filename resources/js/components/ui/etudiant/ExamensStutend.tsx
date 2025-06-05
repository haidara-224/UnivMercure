import { ExamensByEtudiant } from '@/types';
import React, { useState } from 'react'
import { Input } from '../input';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { usePage } from '@inertiajs/react';
import { Button } from '../button';
import { BookOpen, Calendar, Clock, FileSearch, FileText, User } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SubjectModalEtudiant } from '../prof/Examens/SujectModalEtudiant';
import { Badge } from '../badge';
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    examensEtd: ExamensByEtudiant[]
}

export default function ExamensStutend() {
    const { examensEtd } = usePage<CustomPageProps>().props;
    const [selectedExament, setSelectedExamen] = useState<ExamensByEtudiant | null>(null);

    const [openDialogue, setOpenDialogue] = useState(false);


    const handleOpenSubjectModal = (examen: ExamensByEtudiant) => {
        setSelectedExamen(examen);
        setOpenDialogue(true);
    };

    const [search, setSearch] = useState("");




    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                        Examens par Étudiant
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        Consultez tous les examens qui vous sont assignés. Vous pouvez voir les détails de chaque examen, y compris les dates, les sujets.
                    </p>
                </div>

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
                                    <Badge variant="outline">
                                        {examen.annees_scolaire?.annee_scolaire}
                                    </Badge>
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

                                                <Badge variant="outline">
                                                    {examen.professeur?.name} {examen.professeur?.prenom}
                                                </Badge>

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
