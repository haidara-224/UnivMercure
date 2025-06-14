import AppLayout from "@/layouts/app-layout";
import { AnnessScolaire, BreadcrumbItem, Departement, Etudiants, Matiere, Niveaux, Salle } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "@inertiajs/react";
import { CalendarIcon, ClockIcon, Loader2 } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Examens',
        href: '/dashboard/examens',
    },
    {
        title: 'Nouvel Examen',
        href: '/dashboard/examens/create',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    matieres: Matiere[];
    departements: Departement[];
    classes: Niveaux[];
    salles: Salle[];
    anneeActive: AnnessScolaire;
    etudiants: Etudiants[];
}

export default function Page() {
    const { matieres, departements, classes, salles, anneeActive, etudiants: initialEtudiants } = usePage<CustomPageProps>().props;
    const [etudiants, setEtudiants] = useState<Etudiants[]>(initialEtudiants);
    const [loadingEtudiants, setLoadingEtudiants] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        module: "",
        matiere_id: "",
        departement_id: "",
        classe_id: "",
        annees_scolaire_id: anneeActive?.id || "",
        date_examen: "",
        heure_debut: "",
        heure_fin: "",
        salle_id: "",
        etudiants_ids: [] as string[],
    });

    const fetchEtudiants = () => {
        if (!data.classe_id || !data.departement_id || !data.annees_scolaire_id) {
            setEtudiants([]);
            return;
        }

        setLoadingEtudiants(true);
        router.reload({
            only: ['etudiants'],
            data: {
                classe_id: data.classe_id,
                departement_id: data.departement_id,
                annee_scolaire_id: data.annees_scolaire_id
            },

            onFinish: () => setLoadingEtudiants(false)
        });
    };

    useEffect(() => {
        setEtudiants(initialEtudiants);
    }, [initialEtudiants]);

    useEffect(() => {
        fetchEtudiants();
    }, [data.classe_id, data.departement_id, data.annees_scolaire_id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("examens.store"));
    };

    const resetForm = () => {
        setData({
            module: "",
            matiere_id: "",
            departement_id: "",
            classe_id: "",
            annees_scolaire_id: anneeActive?.id || "",
            date_examen: "",
            heure_debut: "",
            heure_fin: "",
            salle_id: "",
            etudiants_ids: [] as string[],
        });
        setEtudiants([]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Créer un Examen" />

            <div className="w-full">
                <Card className="border-0 shadow-none">
                    <CardHeader className="text-center px-0">
                        <CardTitle className="text-3xl font-bold">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Planifier un Nouvel Examen
                            </span>
                        </CardTitle>
                        <CardDescription className="text-gray-500">
                            Remplissez tous les champs requis pour planifier un nouvel examen
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <h3 className="text-lg font-semibold text-gray-900">Informations Générales</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="space-y-2">
                                        <Label htmlFor="module" className="text-gray-700">Module *</Label>

                                        <Select
                                            onValueChange={(value) => setData("module", value)}
                                            value={data.module}
                                        >
                                            <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                                                <SelectValue placeholder="Choisissez un Module" />
                                            </SelectTrigger>
                                            <SelectContent>

                                                    <SelectItem  value="Premier Module">
                                                        Premier Module
                                                    </SelectItem>
                                                      <SelectItem  value="Deuxieme Module">
                                                        Deuxieme Module
                                                    </SelectItem>

                                            </SelectContent>
                                        </Select>
                                        {errors.module && (
                                            <p className="text-sm text-red-500 mt-1">{errors.module}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="matiere_id" className="text-gray-700">Matière *</Label>
                                        <Select
                                            onValueChange={(value) => setData("matiere_id", value)}
                                            value={data.matiere_id}
                                        >
                                            <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                                                <SelectValue placeholder="Choisissez une matière" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {matieres.map((matiere) => (
                                                    <SelectItem key={matiere.id} value={matiere.id.toString()}>
                                                        {matiere.nom}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.matiere_id && (
                                            <p className="text-sm text-red-500 mt-1">{errors.matiere_id}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">

                                    <div className="space-y-2">
                                        <Label htmlFor="departement_id" className="text-gray-700">Département *</Label>
                                        <Select
                                            onValueChange={(value) => setData("departement_id", value)}
                                            value={data.departement_id}
                                        >
                                            <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                                                <SelectValue placeholder="Sélectionnez un département" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {departements.map((departement) => (
                                                    <SelectItem key={departement.id} value={departement.id.toString()}>
                                                        {departement.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.departement_id && (
                                            <p className="text-sm text-red-500 mt-1">{errors.departement_id}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="classe_id" className="text-gray-700">Classe *</Label>
                                        <Select
                                            onValueChange={(value) => setData("classe_id", value)}
                                            value={data.classe_id}
                                        >
                                            <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                                                <SelectValue placeholder="Sélectionnez une classe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {classes.map((classe) => (
                                                    <SelectItem key={classe.id} value={classe.id.toString()}>
                                                        {classe.niveau}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.classe_id && (
                                            <p className="text-sm text-red-500 mt-1">{errors.classe_id}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="annees_scolaire_id" className="text-gray-700">Année Scolaire *</Label>
                                        <Select
                                            onValueChange={(value) => setData("annees_scolaire_id", value)}
                                            value={data.annees_scolaire_id?.toString() ?? ""}
                                        >
                                            <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                                                <SelectValue placeholder="Sélectionnez une année" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={anneeActive.id.toString()}>
                                                    {anneeActive.annee_scolaire} (Active)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.annees_scolaire_id && (
                                            <p className="text-sm text-red-500 mt-1">{errors.annees_scolaire_id}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <h3 className="text-lg font-semibold text-gray-900">Lieu et Participants</h3>
                                </div>

                                <div className="grid grid-cols-1  gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="salle_id" className="text-gray-700">Salle *</Label>
                                        <Select
                                            onValueChange={(value) => setData("salle_id", value)}
                                            value={data.salle_id}
                                        >
                                            <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                                                <SelectValue placeholder="Choisissez une salle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {salles.map((salle) => (
                                                    <SelectItem key={salle.id} value={salle.id.toString()}>
                                                        {salle.salle} ({salle.capacite})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.salle_id && (
                                            <p className="text-sm text-red-500 mt-1">{errors.salle_id}</p>
                                        )}
                                    </div>
                                    <div className="space-y-6 p-6 bg-white rounded-xl border border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <h3 className="text-xl font-semibold text-gray-800">Participants</h3>
                                        </div>

                                        {loadingEtudiants ? (
                                            <div className="flex justify-center items-center p-8">
                                                <Loader2 className="animate-spin h-8 w-8 text-blue-500 mr-3" />
                                                <span className="text-gray-600">Chargement des étudiants...</span>
                                            </div>
                                        ) : !data.classe_id || !data.departement_id || !data.annees_scolaire_id ? (
                                            <div className="p-6 text-center bg-gray-50 rounded-lg">
                                                <p className="text-gray-500">
                                                    Veuillez sélectionner une classe, un département et une année scolaire
                                                </p>
                                            </div>
                                        ) : etudiants.length === 0 ? (
                                            <div className="p-6 text-center bg-gray-50 rounded-lg">
                                                <p className="text-gray-500">Aucun étudiant trouvé pour ces critères</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <Label className="text-gray-700">
                                                        {etudiants.length} étudiant(s) trouvé(s)
                                                    </Label>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                            const allIds = etudiants.map(e => e.id.toString());
                                                            setData("etudiants_ids",
                                                                data.etudiants_ids.length === allIds.length ? [] : allIds
                                                            );
                                                        }}
                                                        className="text-blue-600 hover:text-blue-700"
                                                    >
                                                        {data.etudiants_ids.length === etudiants.length ?
                                                            "Tout désélectionner" : "Tout sélectionner"}
                                                    </Button>
                                                </div>

                                                <div className="border rounded-lg overflow-hidden">
                                                    <div className="grid grid-cols-12 bg-gray-50 p-3 border-b">
                                                        <div className="col-span-1 font-medium text-sm text-gray-500">#</div>
                                                        <div className="col-span-7 font-medium text-sm text-gray-500">Étudiant</div>
                                                        <div className="col-span-3 font-medium text-sm text-gray-500">Matricule</div>
                                                        <div className="col-span-1 flex justify-end">
                                                            <input
                                                                type="checkbox"
                                                                checked={data.etudiants_ids.length === etudiants.length}
                                                                onChange={() => {
                                                                    const allIds = etudiants.map(e => e.id.toString());
                                                                    setData("etudiants_ids",
                                                                        data.etudiants_ids.length === allIds.length ? [] : allIds
                                                                    );
                                                                }}
                                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="divide-y max-h-[400px] overflow-y-auto">
                                                        {etudiants.map((etudiant, index) => (
                                                            <div
                                                                key={etudiant.id}
                                                                className="grid grid-cols-12 items-center p-3 hover:bg-gray-50"
                                                            >
                                                                <div className="col-span-1 text-sm text-gray-500">{index + 1}</div>
                                                                <div className="col-span-7">
                                                                    <p className="font-medium">{etudiant.name} </p>
                                                                </div>
                                                                <div className="col-span-3 text-sm text-gray-500">
                                                                    {etudiant.matricule}
                                                                </div>
                                                                <div className="col-span-1 flex justify-end">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={data.etudiants_ids.includes(etudiant.id.toString())}
                                                                        onChange={(e) => {
                                                                            const newIds = e.target.checked
                                                                                ? [...data.etudiants_ids, etudiant.id.toString()]
                                                                                : data.etudiants_ids.filter(id => id !== etudiant.id.toString());
                                                                            setData("etudiants_ids", newIds);
                                                                        }}
                                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <h3 className="text-lg font-semibold text-gray-900">Date et Heure</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="date_examen" className="text-gray-700">Date *</Label>
                                        <div className="relative">
                                            <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="date_examen"
                                                type="date"
                                                value={data.date_examen}
                                                onChange={(e) => setData("date_examen", e.target.value)}
                                                className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500"
                                            />
                                        </div>
                                        {errors.date_examen && (
                                            <p className="text-sm text-red-500 mt-1">{errors.date_examen}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="heure_debut" className="text-gray-700">Heure de début *</Label>
                                        <div className="relative">
                                            <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="heure_debut"
                                                type="time"
                                                value={data.heure_debut}
                                                onChange={(e) => setData("heure_debut", e.target.value)}
                                                className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500"
                                            />
                                        </div>
                                        {errors.heure_debut && (
                                            <p className="text-sm text-red-500 mt-1">{errors.heure_debut}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="heure_fin" className="text-gray-700">Heure de fin *</Label>
                                        <div className="relative">
                                            <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="heure_fin"
                                                type="time"
                                                value={data.heure_fin}
                                                onChange={(e) => setData("heure_fin", e.target.value)}
                                                className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500"
                                            />
                                        </div>
                                        {errors.heure_fin && (
                                            <p className="text-sm text-red-500 mt-1">{errors.heure_fin}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                                >
                                    Réinitialiser
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 text-md font-medium shadow-md transition-all"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
                                            Enregistrement...
                                        </span>
                                    ) : (
                                        "Planifier l'examen"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
