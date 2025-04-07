import InputError from "@/components/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'New',
        href: '/dashboard/emploie-du-temps/new',
    },
];


interface messageFlash {
    flash: {
        success: string;
    };
}

interface CustomPageProps extends Record<string, unknown> {
    annees: { id: number; annee_scolaire: string }[];
    classes: { id: number; niveau: string }[];
    departement: { id: number; name: string }[];
    professeur: { id: number; name: string; prenom: string; matricule: string }[];
    salle: { id: number; salle: string; capacite: number }[];
    matiere: { id: number; nom: string; departements: number[] }[];
}
interface FormEmploie {
    annee_scolaire: string;
    departement: string;
    professeur: string;
    salle: string;
    matiere: string;
    niveau: string;
    heure_debut:string
    heure_fin:string,
    jours:string,
    module:string
    [key: string]: string | File | null;
}
export default function Page({ flash }: messageFlash) {
    const { annees, classes, departement, professeur, salle, matiere } = usePage<CustomPageProps>().props;
   const { data, setData, post, processing, errors, reset } = useForm<FormEmploie>({
    annee_scolaire: '',
    niveau: '',
    departement: '',
    professeur: '',
    salle: '',
    matiere: '',
    heure_debut: '',
    heure_fin: '',
    jours:'',
    module:''

    });





    const [search, setSearch] = useState('');

    const searchDepartement = (name: string) => {
        return departement.filter((dpt) =>
            dpt.name.toLowerCase().includes(name.toLowerCase())

        );
    };
const filteredDepartement = searchDepartement(search);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (flash?.success) {
            toast(flash.success);
        }
    }, [flash]);
    const HandleSubmit=(e: { preventDefault: () => void; })=>{
        e.preventDefault()
        post(route("dashboard.emploi.store"), {
            onSuccess: () => {
                reset(
                   // 'annee_scolaire',
                    //'niveau',
                    //'departement',
                    'professeur',
                    //'salle',
                    'matiere',
                    'heure_debut',
                    'heure_fin',
                    'jours',
                    //'module'
                    );
            },
            onError: () => {
                toast.error("Erreur lors de l'enregistrement");
            },
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Emploi du Temps" />
            <div className="container mt-5">
                <div className="p-6 bg-gray-50 min-h-screen">
                    <h1 className="text-3xl font-bold mb-6">Ajouter un Emploi du Temps</h1>

                    <form className="bg-white p-6 rounded-xl shadow-sm border border-gray-200" onSubmit={HandleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                            <div>
                                <label htmlFor="annee_scolaire" className="block text-sm font-medium text-gray-600 mb-2">
                                    Année scolaire
                                </label>
                                <select
                                    name="annee_scolaire"
                                    value={data.annee_scolaire}
                                    onChange={(e) => setData("annee_scolaire", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionner l'année scolaire</option>
                                    {annees.map((annee) => (
                                        <option key={annee.id} value={annee.id}>
                                            {annee.annee_scolaire}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.annee_scolaire}/>
                            </div>

                            <div>
                                <label htmlFor="module" className="block text-sm font-medium text-gray-600 mb-2">
                                    Module
                                </label>
                                <select
                                    name="module"
                                    value={data.module}
                                    onChange={(e) => setData("module", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionner Un Module</option>

                                    <option value="Premier Module">
                                        Premier Module
                                    </option>
                                    <option value="Deuxieme Module">
                                        Deuxieme Module
                                    </option>

                                </select>
                                <InputError message={errors.module}/>
                            </div>

                            <div>
                                <label htmlFor="classe" className="block text-sm font-medium text-gray-600 mb-2">
                                    Classe
                                </label>
                                <select
                                    name="classe"
                                    value={data.niveau}
                                    onChange={(e) => setData("niveau", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionner la classe</option>
                                    {classes.map((classe) => (
                                        <option key={classe.id} value={classe.id}>
                                            {classe.niveau}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.niveau}/>
                            </div>
                            <div>
                                <label htmlFor="matiere" className="block text-sm font-medium text-gray-600 mb-2">
                                    Matière
                                </label>
                                <select
                                    name="matiere"
                                    value={data.matiere}
                                    onChange={(e) => setData("matiere", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionner la matière</option>
                                    {matiere.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.nom}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.matiere}/>
                            </div>

                            <div className="md:col-span-2 border p-10 rounded">
                                <label htmlFor="departement" className="block text-xl font-medium text-gray-600 mb-2">
                                    Département
                                </label>
                                <Input type="text" placeholder="Rechercher...." className="m-5" value={search}
                                    onChange={handleSearchChange} />
                                <RadioGroup
                                    name="departement"
                                    className="flex flex-wrap gap-4"
                                    onValueChange={(value) => setData("departement", value)}
                                >
                                    {filteredDepartement.map((d) => (
                                        <div key={d.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={d.id.toString()} id={`departement-${d.id}`} />
                                            <Label htmlFor={`departement-${d.id}`} className="cursor-pointer">
                                                {d.name}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <InputError message={errors.departement} className="mt-5"/>
                            </div>
                            <div>
                                <label htmlFor="professeur" className="block text-sm font-medium text-gray-600 mb-2">
                                    Professeur
                                </label>
                                <select
                                    name="professeur"
                                    value={data.professeur}
                                    onChange={(e) => setData("professeur", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionner le professeur</option>
                                    {professeur.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} {p.prenom} ({p.matricule})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.professeur}/>
                            </div>
                            <div>
                                <label htmlFor="salle" className="block text-sm font-medium text-gray-600 mb-2">
                                    Salle
                                </label>
                                <select
                                    name="salle"
                                    value={data.salle}
                                    onChange={(e) => setData("salle", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionner la salle</option>
                                    {salle.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.salle} (Capacité : {s.capacite})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.salle}/>
                            </div>
                            <div>
                                <label htmlFor="jours" className="block text-sm font-medium text-gray-600 mb-2">
                                    Jours
                                </label>
                                <select
                                    name="jours"
                                    value={data.jours}
                                    onChange={(e) => setData("jours", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Sélectionner Jours</option>

                                    <option value="Lundi">
                                        Lundi
                                    </option>
                                    <option value="Mardi">
                                        Mardi

                                    </option>
                                    <option value="Mercredi">
                                        Mercredi
                                    </option>
                                    <option value="Jeudi">
                                        Jeudi
                                    </option>
                                    <option value="Vendredi">
                                        Vendredi
                                    </option>
                                    <option value="Samedi">
                                        Samedi
                                    </option>

                                </select>
                                <InputError message={errors.jours}/>
                            </div>
                            <div>
                                <label htmlFor="heure_debut" className="block text-sm font-medium text-gray-600 mb-2">
                                    Heure de début
                                </label>
                                <input
                                    type="time"
                                    name="heure_debut"
                                    value={data.heure_debut}
                                    onChange={(e) => setData("heure_debut", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                                <InputError message={errors.heure_debut}/>
                            </div>
                            <div>
                                <label htmlFor="heure_fin" className="block text-sm font-medium text-gray-600 mb-2">
                                    Heure de fin
                                </label>
                                <input
                                    type="time"
                                    name="heure_fin"
                                    value={data.heure_fin}
                                    onChange={(e) => setData("heure_fin", e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                                 <InputError message={errors.heure_fin}/>
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="mt-6 w-full lg:w-56 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                            disabled={processing}
                        >
                           {processing ? 'En cours...' : 'Enregistrer'}
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
