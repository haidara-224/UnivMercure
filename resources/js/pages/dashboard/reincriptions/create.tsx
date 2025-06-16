import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { AnnessScolaire, Departement, Niveaux, Parcours } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";

import { Filter, CheckCheck, ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const breadcrumbs = [
    {
        title: 'Réinscription Create',
        href: '/dashboard/reinscriptions/create',
    },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    parcours: Parcours[];
    departements: Departement[];
    classes: Niveaux[];
    annees: AnnessScolaire[];
}
interface messageFlash {
    flash: {
        success: string,
        error: string
    }
}
export default function Page({ flash }: messageFlash) {
    const { parcours, departements, classes, annees } = usePage<CustomPageProps>().props;
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedDepartement, setSelectedDepartement] = useState("");
    const [selectedClasse, setSelectedClasse] = useState("");
    const [selectedAnnees, setSelectedAnnees] = useState("");


    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
         if (flash?.error) {
            alert(flash.error)
            toast.error(flash.error);
        }
    }, [flash]);


    const { data, setData, post, processing, errors } = useForm({

        etudiants: [] as string[],
        classe: "",
        departement: "",
        annees_scolaire: ""
    });
    const filteredParcours = parcours.filter(parcour => {
        if (!parcour.etudiant) return false;
        const matchesSearch = searchTerm === "" ||
            (parcour.etudiant.name && parcour.etudiant.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (parcour.etudiant.prenom && parcour.etudiant.prenom.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (parcour.etudiant.matricule && parcour.etudiant.matricule.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDepartement = selectedDepartement === "" ||
            parcour.departement_id.toString() === selectedDepartement;

        const matchesClasse = selectedClasse === "" ||
            parcour.classes_id.toString() === selectedClasse;

        const matchesAnnes = selectedAnnees === "" ||
            parcour.annees_scolaire_id.toString() === selectedAnnees;

        return matchesSearch && matchesAnnes && matchesDepartement && matchesClasse;
    });

    const toggleStudentSelection = (etudiantId: string) => {
        const currentEtudiants = data.etudiants as string[];
        const newEtudiants = currentEtudiants.includes(etudiantId)
            ? currentEtudiants.filter((id: string) => id !== etudiantId)
            : [...currentEtudiants, etudiantId];
        setData('etudiants', newEtudiants);
    };

    const handleReinscription = (e: React.FormEvent) => {
        e.preventDefault();

        if (data.etudiants.length === 0 || !data.departement || !data.classe) {
            toast.error("Veuillez sélectionner au moins un étudiant et spécifier le nouveau département et classe");
            return;
        }

        post(route('dashboard.parcours.store'), {

            onError: () => {
                toast.error("Une erreur est survenue lors de la réinscription");
            }
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Réinscriptions" />
            <form onSubmit={handleReinscription}>
                <div className="space-y-6 p-6">
                    <h1 className="text-2xl font-bold text-gray-800">Formulaire de Réinscription</h1>

                    {/* Filtres de recherche */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="font-medium text-lg mb-4">Filtrer les étudiants</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedDepartement}
                                    onChange={(e) => setSelectedDepartement(e.target.value)}
                                >
                                    <option value="">Tous les départements</option>
                                    {departements.map((dep) => (
                                        <option key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedClasse}
                                    onChange={(e) => setSelectedClasse(e.target.value)}
                                >
                                    <option value="">Toutes les classes</option>
                                    {classes.map((classe) => (
                                        <option key={classe.id} value={classe.id}>
                                            {classe.niveau}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Filter className="h-4 w-4 text-gray-400" />
                                </div>
                                <select
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedAnnees}
                                    onChange={(e) => setSelectedAnnees(e.target.value)}
                                >
                                    <option value="">Toutes les années</option>
                                    {annees.map((ann) => (
                                        <option key={ann.id} value={ann.id}>
                                            {ann.annee_scolaire}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Liste des étudiants avec cases à cocher */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="font-medium text-lg">
                                Étudiants à réinscrire ({filteredParcours.length} trouvés)
                            </h2>
                            <p className="text-sm text-gray-500">
                                Cochez les étudiants que vous souhaitez réinscrire
                            </p>
                        </div>
                        <div className="relative flex-grow m-5">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <Input
                                placeholder="Rechercher un étudiant (nom, prénom ou matricule)..."
                                className="pl-10 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {errors.etudiants && (
                            <p className="text-sm text-red-500 mt-1">{errors.etudiants}</p>
                        )}
                        <div className="overflow-y-auto max-h-96">
                            {filteredParcours.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-blue-600 rounded"
                                                    checked={data.etudiants.length === filteredParcours.length}
                                                    onChange={() => {
                                                        if (data.etudiants.length === filteredParcours.length) {
                                                            setData('etudiants', []);

                                                        } else {
                                                            setData('etudiants', filteredParcours.map(p => p.etudiant.id));
                                                        }
                                                    }}
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matricule</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classe actuelle</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département actuel</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Années Scolaire actuel</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredParcours.map((parcour) => (
                                            <tr key={parcour.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 text-blue-600 rounded"
                                                        checked={data.etudiants.includes(parcour.etudiant.id)}
                                                        onChange={() => toggleStudentSelection(parcour.etudiant.id)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {parcour.etudiant.matricule}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {parcour.etudiant.name} {parcour.etudiant.prenom}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {parcour.classes.niveau}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {parcour.departement.name}
                                                </td>
                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {parcour.annees_scolaire.annee_scolaire}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    Aucun étudiant trouvé avec les critères sélectionnés
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sélection de la nouvelle affectation */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h2 className="font-medium text-lg mb-4">Nouvelle affectation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau département</label>
                                <select
                                    className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.departement}
                                    onChange={(e) => setData("departement", e.target.value)}
                                >
                                    <option value="">Sélectionnez un département</option>
                                    {departements.map((dep) => (
                                        <option key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.departement && (
                                <p className="text-sm text-red-500 mt-1">{errors.departement}</p>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nouvelle classe</label>
                                <select
                                    className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.classe}
                                    onChange={(e) => setData('classe', e.target.value)}
                                >
                                    <option value="">Sélectionnez une classe</option>
                                    {classes.map((classe) => (
                                        <option key={classe.id} value={classe.id}>
                                            {classe.niveau}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.classe && (
                                <p className="text-sm text-red-500 mt-1">{errors.classe}</p>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Années Scolaire</label>
                                <select
                                    className="w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={data.annees_scolaire}
                                    onChange={(e) => setData('annees_scolaire', e.target.value)}
                                >
                                    <option value="">Sélectionnez une années scolaire</option>
                                    {annees.map((ann) => (
                                        <option key={ann.id} value={ann.id}>
                                            {ann.annee_scolaire}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.annees_scolaire && (
                                <p className="text-sm text-red-500 mt-1">{errors.annees_scolaire}</p>
                            )}
                        </div>
                    </div>

                    {/* Bouton de validation */}
                    <div className="flex justify-end">
                        <button
                            type="submit"

                            disabled={processing || data.etudiants.length === 0 || !data.departement || !data.classe || !data.annees_scolaire}
                            className={`flex items-center px-6 py-3 rounded-md text-white font-medium ${data.etudiants.length === 0 || !data.departement || !data.classe || !data.annees_scolaire
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            <CheckCheck className="h-5 w-5 mr-2" />
                            Réinscrire {data.etudiants.length} étudiant(s) sélectionné(s)
                            <ArrowRight className="h-5 w-5 ml-2" />
                        </button>
                    </div>
                </div>
            </form>

        </AppLayout>
    );
}
