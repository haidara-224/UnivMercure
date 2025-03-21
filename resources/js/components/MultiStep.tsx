import { FormEventHandler, useState } from "react";
import ProgresseBars from "./ProgressBar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { AnnessScolaire, Departement, Niveaux } from '@/types';
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { router, useForm, usePage } from "@inertiajs/react";
import InputError from "./input-error";

const steps = [
    { title: "Information", description: "Information de l'étudiant" },
    { title: "Inscription/Reinscription", description: "Information sur l'inscription" },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    annees: AnnessScolaire[],
    niveau: Niveaux[],
    departement: Departement[]
}

interface FormStudent {
    matricule: string;
    nom: string;
    prenom: string;
    telephone: string;
    genre: string;
    photo: File | null;
    annees_scolaire: string;
    niveau: string;
    departement: string;
    [key: string]: string | File | null;
}

export function MultiformStep() {
    const { data, setData, post, processing, errors, reset } = useForm<FormStudent>({
        matricule: '',
        nom: '',
        prenom: '',
        telephone: '',
        genre: '',
        photo: null,
        annees_scolaire: '',
        niveau: '',
        departement: ''
    });

    const [step, setStep] = useState(1);
    const { annees, niveau, departement } = usePage<CustomPageProps>().props;

    const NextSteper = (next: number) => {
        setStep(next);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.etud.store"), {
            onFinish: () =>{
                reset();
                router.visit('/dashboard/etudiants');
            } ,
            onError:()=>router.reload()
        });
    };

    return (
        <>
            <ProgresseBars curentstep={step} steps={steps} />
            <form className="p-6 space-y-6 w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                >
                    {step === 1 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="matricule" className="text-gray-700 dark:text-gray-300">Matricule</Label>
                                <Input
                                    id="matricule"
                                    type="text"
                                    value={data.matricule}
                                    onChange={(e) => setData("matricule", e.target.value)}
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
                                    value={data.nom}
                                    onChange={(e) => setData("nom", e.target.value)}
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
                                    value={data.prenom}
                                    onChange={(e) => setData("prenom", e.target.value)}
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
                                    value={data.telephone}
                                    onChange={(e) => setData("telephone", e.target.value)}
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
                                    onChange={(e) => setData("photo", e.target.files ? e.target.files[0] : null)}
                                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                                />
                                <InputError message={errors.photo} />
                            </div>
                            <div>
                                <Label htmlFor="genre" className="text-gray-700 dark:text-gray-300">Genre</Label>
                                <Select onValueChange={(value) => setData("genre", value)}>
                                    <SelectTrigger className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                                        <SelectValue placeholder="Sélectionner le Genre" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800">
                                        <SelectGroup>
                                            <SelectLabel className="text-gray-700 dark:text-gray-300">Genre</SelectLabel>
                                            <SelectItem value="masculin" className="text-gray-700 dark:text-gray-300">Masculin</SelectItem>
                                            <SelectItem value="feminin" className="text-gray-700 dark:text-gray-300">Féminin</SelectItem>
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
                                <Select onValueChange={(value) => setData("annees_scolaire", value)}>
                                    <SelectTrigger className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                                        <SelectValue placeholder="Sélectionner l'année Scolaire" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800">
                                        <SelectGroup>
                                            <SelectLabel className="text-gray-700 dark:text-gray-300">Années Scolaire</SelectLabel>
                                            {annees.map((an) => (
                                                <SelectItem key={an.id} value={an.id.toString()} className="text-gray-700 dark:text-gray-300">{an.annee_scolaire}</SelectItem>
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
                                    onValueChange={(value) => setData("niveau", value)}
                                >
                                    {niveau.map((nv) => (
                                        <div key={nv.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value={nv.id.toString()} id={`niveau-${nv.id}`} />
                                                <Label htmlFor={`niveau-${nv.id}`} className="text-gray-700 dark:text-gray-300">{nv.niveau}</Label>
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <InputError message={errors.niveau} />
                            </div>

                            <div className="w-full p-6 rounded-xl bg-gray-100 dark:bg-gray-700 shadow-md">
                                <h1 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Sélectionner un Département</h1>
                                <RadioGroup
                                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                                    onValueChange={(value) => setData("departement", value)}
                                >
                                    {departement.map((dpt) => (
                                        <div key={dpt.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value={dpt.id.toString()} id={`depat-${dpt.id}`} />
                                                <Label htmlFor={`depat-${dpt.id}`} className="text-gray-700 dark:text-gray-300">{dpt.name}</Label>
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
        </>
    );
}
