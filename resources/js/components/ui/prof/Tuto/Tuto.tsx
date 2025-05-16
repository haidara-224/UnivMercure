import { Link, useForm, usePage } from "@inertiajs/react";
import { AddTuto } from "./AddTuto";
import { Departement, Niveaux, Tutos } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Video, User, Clock, BookOpen, Building, Loader2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { useState } from "react";
import { EditTuto } from "./EditTuto";

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    departement: Departement[],
    niveau: Niveaux[],
    tutos: Tutos[]
}

export function TutoComponent() {
    const { departement, niveau, tutos } = usePage<CustomPageProps>().props;

    const [loadingTuto, setLoadingTuto] = useState<number | null>(null);
    const [selectedTuto, setSelectedTuto] = useState<Tutos | null>(null)
    const [openDialogue, setOpenDialogue] = useState(false)
    const { delete: destroy, } = useForm({});
    const onOpenDialogue = () => {
        setOpenDialogue((prev) => !prev);

    };
    const isSelectedTuto = (tuto: Tutos) => {
        setSelectedTuto(tuto)
        setOpenDialogue(true)
    }
    const onDelete = (id: number) => {


        const confirm = window.confirm(`Etes vous sure de vouloir Supprimé ce tuto ? `)
        if (confirm) {
            setLoadingTuto(id)
            destroy(route('prof.cours.delete', id), {
                preserveScroll: true,
                onFinish: () => {
                    setLoadingTuto(null)

                },
                onError: (error) => {

                    setLoadingTuto(null)
                    console.error(error)
                },
                onSuccess: () => {

                    setLoadingTuto(null)
                    toast('Tutoriel supprimé avec succès.')
                }

            });

        }


    }

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
                    📚 Tutoriels disponibles
                </h1>
                <AddTuto departement={departement} niveau={niveau} />
                <EditTuto departement={departement} niveau={niveau} open={openDialogue} onOpenChange={onOpenDialogue} tuto={selectedTuto} />
            </div>

            {tutos.length === 0 ? (
                <div className="text-center py-24">
                    <BookOpen className="mx-auto h-14 w-14 text-gray-400" />
                    <h3 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">Aucun tutoriel</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Commencez par publier un nouveau tuto pour vos étudiants.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutos.map((tuto) => (
                        <Card key={tuto.id} className="hover:shadow-xl transition-all border rounded-xl">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl font-semibold line-clamp-1">{tuto.titre}</CardTitle>
                                        <CardDescription className="mt-1 text-sm text-muted-foreground flex items-center gap-1">

                                            <User className="h-4 w-4" />
                                            {tuto.professeur?.name || "Auteur inconnu"}


                                        </CardDescription>
                                    </div>
                                    {tuto.classes && (
                                        <Badge variant="secondary">{tuto.classes.niveau}</Badge>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm">
                                <div className="prose dark:prose-invert max-w-none line-clamp-4"
                                    dangerouslySetInnerHTML={{ __html: tuto.contenue }} />
                                <div className="flex flex-wrap gap-2">

                                    {tuto.departement && (
                                        <Badge variant="outline" className="text-xs ">
                                            <Building className="h-3 w-3 mr-1" />

                                            <p className="line-clamp-1">{tuto.departement.name}</p>
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {format(new Date(tuto.created_at), 'PPP', { locale: fr })}
                                    </Badge>
                                    <div>
                                        <Link href={`/prof/cours/${tuto.id}`}><Eye /></Link>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col lg:flex-row justify-between items-center gap-2">
                                <div className="flex flex-col lg:flex-row gap-2">
                                    {tuto.fichier && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a
                                                href={`/storage/${tuto.fichier}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1"
                                            >
                                                <FileText className="h-4 w-4" />
                                                PDF
                                            </a>
                                        </Button>
                                    )}
                                    {tuto.video && (
                                        <Button variant="outline" size="sm" asChild>
                                            <a
                                                href={`/storage/${tuto.video}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1"
                                            >
                                                <Video className="h-4 w-4" />
                                                Vidéo
                                            </a>
                                        </Button>
                                    )}
                                </div>

                                <div className="flex flex-col lg:flex-row gap-2">
                                    <Button size={'sm'} variant="outline" className="gap-2" onClick={() => isSelectedTuto(tuto)}>
                                        ✏️ Éditer
                                    </Button>
                                    <Button size="sm" variant="destructive" className="text-white" onClick={() => onDelete(tuto.id)}>
                                        {
                                            loadingTuto === tuto.id ? (
                                                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                            ) : '🗑️ Supprimer'
                                        }

                                    </Button>

                                </div>
                            </CardFooter>

                        </Card>
                    ))}
                </div>
            )}
        </div>

    );
}
