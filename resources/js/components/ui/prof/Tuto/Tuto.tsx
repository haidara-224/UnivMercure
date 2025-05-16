import { Link, useForm, usePage } from "@inertiajs/react";
import { AddTuto } from "./AddTuto";
import { Departement, Niveaux, Tutos } from "@/types";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Video,
    User,
    Clock,
    BookOpen,
    Building,
    Loader2,
    Eye,
    Search,
    Landmark,
    Building2,
    Edit,
    Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { useState } from "react";
import { EditTuto } from "./EditTuto";
import { Input } from "../../input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../select";

export function TutoComponent() {
    const { departement, niveau, tutos } = usePage<{
        departement: Departement[];
        niveau: Niveaux[];
        tutos: Tutos[];
    }>().props;

    const [loadingTuto, setLoadingTuto] = useState<number | null>(null);
    const [selectedTuto, setSelectedTuto] = useState<Tutos | null>(null);
    const [openDialogue, setOpenDialogue] = useState(false);

    const [search, setSearch] = useState("");
    const [classeFilter, setClasseFilter] = useState("");
    const [departementFilter, setDepartementFilter] = useState("");

    const filteredTutos = tutos.filter((tuto) => {
        const titreMatch = tuto.titre.toLowerCase().includes(search.toLowerCase());
        const classeMatch = classeFilter ? tuto.classes?.id.toString() === classeFilter : true;
        const deptMatch = departementFilter ? tuto.departement?.id.toString() === departementFilter : true;
        return titreMatch && classeMatch && deptMatch;
    });

    const { delete: destroy } = useForm({});

    const handleEditTuto = (tuto: Tutos) => {
        setSelectedTuto(tuto);
        setOpenDialogue(true);
    };

    const handleDeleteTuto = (id: number) => {
        const confirm = window.confirm("Êtes-vous sûr de vouloir supprimer ce tutoriel ?");
        if (confirm) {
            setLoadingTuto(id);
            destroy(route("prof.cours.delete", id), {
                preserveScroll: true,
                onFinish: () => setLoadingTuto(null),
                onError: () => {
                    setLoadingTuto(null);
                    toast.error("Une erreur est survenue lors de la suppression");
                },
                onSuccess: () => {
                    toast.success("Tutoriel supprimé avec succès");
                },
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                        Tutoriels pédagogiques
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Ressources pédagogiques pour vos étudiants
                    </p>
                </div>
                <div className="flex gap-2">
                    <AddTuto departement={departement} niveau={niveau} />
                </div>
            </div>

            {/* Filtres */}
            <div className="bg-muted/50 p-4 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-1 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Select value={departementFilter} onValueChange={setDepartementFilter}>
                        <SelectTrigger>
                            <Landmark className="h-4 w-4 mr-2 opacity-50" />
                            <SelectValue placeholder="Département" />
                        </SelectTrigger>
                        <SelectContent>

                            <SelectItem value="all">Toutes</SelectItem>
                            {departement.map((d) => (
                                <SelectItem key={d.id} value={d.id.toString()}>
                                    {d.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={classeFilter} onValueChange={setClasseFilter}>
                        <SelectTrigger>
                            <Building2 className="h-4 w-4 mr-2 opacity-50" />
                            <SelectValue placeholder="Classe" />
                        </SelectTrigger>
                        <SelectContent>

                            <SelectItem value="all">Toutes</SelectItem>
                            {niveau.map((n) => (
                                <SelectItem key={n.id} value={n.id.toString()}>
                                    {n.niveau}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        onClick={() => {
                            setSearch("");
                            setClasseFilter("");
                            setDepartementFilter("");
                        }}
                        className="h-full"
                    >
                        Réinitialiser
                    </Button>
                </div>
            </div>

            {/* Liste des tutoriels */}
            {filteredTutos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-dashed bg-muted/20">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-1">Aucun tutoriel trouvé</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                        {search || classeFilter || departementFilter
                            ? "Aucun résultat pour vos critères de recherche"
                            : "Commencez par créer votre premier tutoriel"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTutos.map((tuto) => (
                        <Card key={tuto.id} className="hover:shadow-lg transition-all group overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start gap-2">
                                    <CardTitle className="text-lg font-semibold line-clamp-2">
                                        {tuto.titre}
                                    </CardTitle>
                                    {tuto.classes && (
                                        <Badge variant="secondary" className="shrink-0">
                                            {tuto.classes.niveau}
                                        </Badge>
                                    )}
                                </div>
                                <CardDescription className="flex items-center gap-2 mt-2">
                                    <User className="h-4 w-4" />
                                    <span className="text-sm">{tuto.professeur?.name || "Auteur inconnu"}</span>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pb-4">
                                <div
                                    className="prose prose-sm dark:prose-invert max-w-none line-clamp-3 text-muted-foreground mb-4"
                                    dangerouslySetInnerHTML={{ __html: tuto.contenue }}
                                />

                                <div className="flex flex-wrap gap-2">
                                    {tuto.departement && (
                                        <Badge variant="outline" className="text-xs">
                                            <Building className="h-3 w-3 mr-1" />
                                            {tuto.departement.name}
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {format(new Date(tuto.created_at), "PPP", { locale: fr })}
                                    </Badge>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex-1 sm:flex-none"
                                        asChild
                                    >
                                        <Link href={`/prof/cours/${tuto.id}`}>
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only sm:not-sr-only ml-2">Voir</span>
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-0 border-t">
                                <div className="flex gap-2 w-full sm:w-auto mt-2">
                                    {tuto.fichier && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 sm:flex-none"
                                            asChild
                                        >
                                            <a
                                                href={`/storage/${tuto.fichier}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <FileText className="h-4 w-4" />
                                                <span className="sr-only sm:not-sr-only">PDF</span>
                                            </a>
                                        </Button>
                                    )}
                                    {tuto.video && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 sm:flex-none"
                                            asChild
                                        >
                                            <a
                                                href={`/storage/${tuto.video}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2"
                                            >
                                                <Video className="h-4 w-4" />
                                                <span className="sr-only sm:not-sr-only">Vidéo</span>
                                            </a>
                                        </Button>
                                    )}

                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1 sm:flex-none"
                                        onClick={() => handleEditTuto(tuto)}
                                    >
                                        <Edit className="h-4 w-4 mr-1" />
                                        <span>Modifier</span>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex-1 sm:flex-none text-white"
                                        onClick={() => handleDeleteTuto(tuto.id)}
                                        disabled={loadingTuto === tuto.id}
                                    >
                                        {loadingTuto === tuto.id ? (
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

            <EditTuto
                departement={departement}
                niveau={niveau}
                open={openDialogue}
                onOpenChange={setOpenDialogue}
                tuto={selectedTuto}
            />
        </div>
    );
}
