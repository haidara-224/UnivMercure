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
            onFinish: () => reset(),
            onError:()=>router.reload()
        });
    };

    return (
        <>
            <ProgresseBars curentstep={step} steps={steps} />
            <form className="p-6 space-y-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
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
                                <Label htmlFor="matricule">Matricule</Label>
                                <Input
                                    id="matricule"
                                    type="text"
                                    value={data.matricule}
                                    onChange={(e) => setData("matricule", e.target.value)}
                                    placeholder="Matricule"
                                    className="w-full p-3 border rounded-lg"
                                />
                                <InputError message={errors.matricule} />
                            </div>
                            <div>
                                <Label htmlFor="nom">Nom</Label>
                                <Input
                                    id="nom"
                                    type="text"
                                    value={data.nom}
                                    onChange={(e) => setData("nom", e.target.value)}
                                    placeholder="Nom"
                                    className="w-full p-3 border rounded-lg"
                                />
                                <InputError message={errors.nom} />
                            </div>
                            <div>
                                <Label htmlFor="prenom">Prénom</Label>
                                <Input
                                    id="prenom"
                                    type="text"
                                    value={data.prenom}
                                    onChange={(e) => setData("prenom", e.target.value)}
                                    placeholder="Prénom"
                                    className="w-full p-3 border rounded-lg"
                                />
                                <InputError message={errors.prenom} />
                            </div>
                            <div>
                                <Label htmlFor="telephone">Téléphone</Label>
                                <Input
                                    id="telephone"
                                    type="text"
                                    value={data.telephone}
                                    onChange={(e) => setData("telephone", e.target.value)}
                                    placeholder="Téléphone"
                                    className="w-full p-3 border rounded-lg"
                                />
                                <InputError message={errors.telephone} />
                            </div>
                            <div>
                                <Label htmlFor="photo">Photo</Label>
                                <Input
                                    id="photo"
                                    type="file"
                                    onChange={(e) => setData("photo", e.target.files ? e.target.files[0] : null)}
                                    className="w-full p-3 border rounded-lg"
                                />
                                <InputError message={errors.photo} />
                            </div>
                            <div>
                                <Label htmlFor="genre">Genre</Label>
                                <Select onValueChange={(value) => setData("genre", value)}>
                                    <SelectTrigger className="w-full p-3 border rounded-lg">
                                        <SelectValue placeholder="Sélectionner le Genre" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Genre</SelectLabel>
                                            <SelectItem value="masculin">Masculin</SelectItem>
                                            <SelectItem value="feminin">Féminin</SelectItem>
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
                                <Label htmlFor="annees_scolaire">Année Scolaire</Label>
                                <Select onValueChange={(value) => setData("annees_scolaire", value)}>
                                    <SelectTrigger className="w-full p-3 border rounded-lg">
                                        <SelectValue placeholder="Sélectionner l'année Scolaire" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Années Scolaire</SelectLabel>
                                            {annees.map((an) => (
                                                <SelectItem key={an.id} value={an.id.toString()}>{an.annee_scolaire}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.annees_scolaire} />
                            </div>

                            <div className="w-full p-6 rounded-xl bg-gray-100 shadow-md">
                                <h1 className="text-lg font-semibold mb-4">Sélectionner un Niveau</h1>
                                <RadioGroup
                                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                                    onValueChange={(value) => setData("niveau", value)}
                                >
                                    {niveau.map((nv) => (
                                        <div key={nv.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value={nv.id.toString()} id={`niveau-${nv.id}`} />
                                                <Label htmlFor={`niveau-${nv.id}`}>{nv.niveau}</Label>
                                            </div>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <InputError message={errors.niveau} />
                            </div>

                            <div className="w-full p-6 rounded-xl bg-gray-100 shadow-md">
                                <h1 className="text-lg font-semibold mb-4">Sélectionner un Département</h1>
                                <RadioGroup
                                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                                    onValueChange={(value) => setData("departement", value)}
                                >
                                    {departement.map((dpt) => (
                                        <div key={dpt.id} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value={dpt.id.toString()} id={`depat-${dpt.id}`} />
                                                <Label htmlFor={`depat-${dpt.id}`}>{dpt.name}</Label>
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
