import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from "@inertiajs/react";
import { AnnessScolaire, Departement, Niveaux, Parcours, type BreadcrumbItem } from '@/types';
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ProgresseBars from "@/components/ProgressBar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Etudiants Edit', href: '/dashboard/etudiants' },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    flash: { success?: string };
    annees: AnnessScolaire[],
    nv: Niveaux[],
    dpt: Departement[],
    parcours: Parcours
}

interface messageFlash {
    flash: {
        success: string,
    }
}

const steps = [
    { title: "Information", description: "" },
    { title: "I/R", description: "" },
];

export default function Page({ flash }: messageFlash) {
    const { annees, nv, dpt, parcours } = usePage<CustomPageProps>().props;
    const [step, setStep] = useState(1);
    const [matricule, setMatricule] = useState(parcours.etudiant.matricule || "")
    const [nom, setName] = useState(parcours.etudiant.name || "")
    const [prenom, setPrenom] = useState(parcours.etudiant.prenom || "")
    const [telephone, setTelephone] = useState(parcours.etudiant.telephone || "")
    const [genre, setGenre] = useState(parcours.etudiant.sexe || "")
    const [annees_scolaire, setAnneesScolaire] = useState(parcours.annees_scolaire.id || "")
    const [niveaux, setNiveau] = useState(parcours.classes.id || "")
    const [departement, setDepartement] = useState(parcours.departement.id || "")
    const [photo, setPhoto] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [processing, setIsProcessing] = useState(false)
    const { errors } = usePage().props;

    const NextSteper = (next: number) => {
        setStep(next);
    };

    const title = `Etudiant ${parcours.etudiant.name} ${parcours.etudiant.prenom}`;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(route("dashboard.etud.update", parcours.id), {
            _method: "put",
            matricule,
            nom,
            prenom,
            genre,
            telephone,
            photo,
            annees_scolaire,
            niveaux,
            departement

        }, {
            onSuccess: () => {
                setIsProcessing(false);
            },
            onError: () => {
                setIsProcessing(false);
            }
        });
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <ProgresseBars curentstep={step} steps={steps} />
            <form className="p-6 space-y-6 max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                >
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="matricule" className="text-gray-700 dark:text-gray-300">Matricule</Label>
                                <Input
                                    id="matricule"
                                    type="text"
                                    value={matricule}
                                    onChange={(e) => setMatricule(e.target.value)}
                                    placeholder="Matricule"
                                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                                />
                                <InputError message={errors.matricule} />
                            </div>
                            <div>
                                <Label htmlFor="nom" className="text-gray-700 dark:text-gray-300">Nom</Label>
                                <Input
                                    id="nom"
                                    type="text"
                                    value={nom}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nom"
                                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                                />
                                <InputError message={errors.nom} />
                            </div>
                            <div>
                                <Label htmlFor="prenom" className="text-gray-700 dark:text-gray-300">Prénom</Label>
                                <Input
                                    id="prenom"
                                    type="text"
                                    value={prenom}
                                    onChange={(e) => setPrenom(e.target.value)}
                                    placeholder="Prénom"
                                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                                />
                                <InputError message={errors.prenom} />
                            </div>
                            <div>
                                <Label htmlFor="telephone" className="text-gray-700 dark:text-gray-300">Téléphone</Label>
                                <Input
                                    id="telephone"
                                    type="text"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                    placeholder="Téléphone"
                                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                                />
                                <InputError message={errors.telephone} />
                            </div>
                            <div>
                                <Label htmlFor="photo" className="text-gray-700 dark:text-gray-300">Photo</Label>
                                <Input
                                    id="photo"
                                    type="file"
                                    onChange={handleUpload}
                                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                                />
                                {errors?.photo && <InputError message={errors.photo} />}
                                {imagePreview && <img src={imagePreview} alt="preview" className="w-10 h-10 rounded-full object-cover" />}
                                {parcours.etudiant?.photo && (
                                    <div className="mt-4">
                                        <Label className="text-gray-700 dark:text-gray-300">Photo actuelle</Label>
                                        <img
                                            src={`/storage/${parcours.etudiant.photo}`}
                                            alt={`Photo de ${parcours.etudiant.name} ${parcours.etudiant.prenom}`}
                                            className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-700 mt-2"
                                        />
                                    </div>
                                )}
                                <InputError message={errors.photo} />
                            </div>
                            <div>
                                <Label htmlFor="genre" className="text-gray-700 dark:text-gray-300">Genre</Label>
                                <Select
                                    onValueChange={(value) => setGenre(value)}
                                    defaultValue={genre} // Définit la valeur par défaut
                                >
                                    <SelectTrigger className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                                        <SelectValue placeholder="Sélectionner le Genre" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800">
                                        <SelectGroup>
                                            <SelectLabel className="text-gray-700 dark:text-gray-300">Genre</SelectLabel>
                                            <SelectItem
                                                value="masculin"
                                                className="text-gray-700 dark:text-gray-300"
                                            >
                                                Masculin
                                            </SelectItem>
                                            <SelectItem
                                                value="feminin"
                                                className="text-gray-700 dark:text-gray-300"
                                            >
                                                Féminin
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.genre} />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <div>
                                <Label htmlFor="annees_scolaire" className="text-gray-700 dark:text-gray-300">Année Scolaire</Label>
                                <Select defaultValue={annees_scolaire.toString()} onValueChange={(value) => setAnneesScolaire(value)}>
                                    <SelectTrigger className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                                        <SelectValue placeholder="Sélectionner l'année Scolaire">{annees.find(a => a.id === annees_scolaire)?.annee_scolaire}</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800">
                                        <SelectGroup>
                                            <SelectLabel className="text-gray-700 dark:text-gray-300">Années Scolaire</SelectLabel>
                                            {annees.map((an) => (
                                                <SelectItem key={an.id} value={an.id.toString()} className="text-gray-700 dark:text-gray-300">
                                                    {an.annee_scolaire}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.annees_scolaire} />
                            </div>

                            <div className="w-full p-6 rounded-xl bg-gray-100 dark:bg-gray-700 shadow-md">
                                <h1 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Sélectionner un Niveau</h1>
                                <RadioGroup
                                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                                    onValueChange={(value) => setNiveau(value) }
                                    defaultValue={niveaux.toString()} // Valeur par défaut
                                >
                                    {nv.map((nv) => (
                                        <div
                                            key={nv.id}
                                            className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                                        >
                                            <RadioGroupItem
                                                value={nv.id.toString()}
                                                id={`niveau-${nv.id}`}
                                                checked={niveaux.toString() === nv.id.toString()} // Coche l'élément correspondant
                                            />
                                            <Label htmlFor={`niveau-${nv.id}`} className="text-gray-700 dark:text-gray-300">
                                                {nv.niveau}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <InputError message={errors.niveau} />
                            </div>

                            <div className="w-full p-6 rounded-xl bg-gray-100 dark:bg-gray-700 shadow-md">
                                <h1 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Sélectionner un Département</h1>
                                <RadioGroup
                                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                                    value={departement.toString()} // Sélection par défaut
                                    onValueChange={(value) => setDepartement(value) }
                                >
                                    {dpt.map((dpt) => (
                                        <div
                                            key={dpt.id}
                                            className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value={dpt.id.toString()}
                                                    id={`departement-${dpt.id}`}
                                                    checked={departement.toString() === dpt.id.toString()} // Pré-cocher l'option
                                                />
                                                <Label htmlFor={`departement-${dpt.id}`} className="text-gray-700 dark:text-gray-300">
                                                    {dpt.name}
                                                </Label>
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <InputError message={errors.departement} />
                            </div>
                        </>
                    )}
                </motion.div>

                <div className="flex justify-between mt-4">
                    {step > 1 && (
                        <Button type="button" onClick={() => NextSteper(step - 1)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                            Précédent
                        </Button>
                    )}
                    {step < 2 ? (
                        <button
                            type="button"
                            onClick={() => NextSteper(step + 1)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Suivant
                        </button>
                    ) : (
                        <Button type="submit" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg" disabled={processing}>
                            <CheckCircle className="w-5 h-5" /> {processing ? "Enregistrement..." : "Valider"}
                        </Button>
                    )}
                </div>
            </form>
        </AppLayout>
    );
}
