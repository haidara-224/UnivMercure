import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, usePage } from "@inertiajs/react";
import {
    FilePlus,

} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import InputError from "@/components/input-error";
import { Departement, Niveaux, Parcours } from "@/types";

interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    dptProf: Departement[];
    clsProf: Niveaux[];
    parcours: Parcours[];
}

function AddExamensForStudents() {
    const { dptProf, clsProf, parcours } = usePage<CustomPageProps>().props;

    const [editorContent, setEditorContent] = useState("");
    const [hasFiltered, setHasFiltered] = useState(false);

    const [selectedDepartement, setSelectedDepartement] = useState("");
    const [selectedClasse, setSelectedClasse] = useState("");
    const [selectedEtudiants, setSelectedEtudiants] = useState<number[]>([]);
    const [fileName, setFileName] = useState<string | null>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        titre: "",
        fichier: null as File | null,
        date_debut: "",
        date_fin: "",
        sujet_explication: "",
        type: "etudiant",
        etudiants: [] as number[],
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setData("fichier", file);
        }
    };

    const handleFiltrer = () => {
        setHasFiltered(true);
    };

    const handleEtudiantSelect = (id: number) => {
        const updated = selectedEtudiants.includes(id)
            ? selectedEtudiants.filter((eid) => eid !== id)
            : [...selectedEtudiants, id];
        setSelectedEtudiants(updated);
        setData("etudiants", updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dateDebut = new Date(data.date_debut);
        const dateFin = new Date(data.date_fin);

        if (dateFin <= dateDebut) {
            alert("La date de fin doit être supérieure à la date de début.");
            return;
        }

        const hasFile = data.fichier instanceof File;
        const hasSujet = data.sujet_explication && data.sujet_explication.trim().length > 0;

        if (!hasFile && !hasSujet) {
            alert("Veuillez fournir un fichier ou saisir un sujet écrit.");
            return;
        }

        if (selectedEtudiants.length === 0) {
            alert("Veuillez sélectionner au moins un étudiant.");
            return;
        }

        post(route("prof.examens.create.classe"), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Examen créé avec succès");
                reset();
                setEditorContent("");
                setFileName(null);
                setSelectedEtudiants([]);
            },
            onError: () => {
                toast.error("Une erreur s’est produite.");
            },
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="gap-2">
                    <FilePlus size={16} /> Programmer un examen
                </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-screen-lg !w-full !h-screen overflow-y-auto rounded-none p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Créer un examen pour des étudiants
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="titre">Titre de l'examen</Label>
                        <Input
                            id="titre"
                            placeholder="Ex : Test de réseaux"
                            value={data.titre}
                            onChange={(e) => setData("titre", e.target.value)}
                        />
                        <InputError message={errors.titre} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <Label>Département</Label>
                            <select
                                value={selectedDepartement}
                                onChange={(e) => setSelectedDepartement(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            >
                                <option value="">Tous les départements</option>
                                {dptProf.map((d) => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Classe</Label>
                            <select
                                value={selectedClasse}
                                onChange={(e) => setSelectedClasse(e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            >
                                <option value="">Toutes les classes</option>
                                {clsProf.map((c) => (
                                    <option key={c.id} value={c.id}>{c.niveau}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <Button type="button" onClick={handleFiltrer} disabled={ !selectedClasse || !selectedDepartement}>
                                 la liste
                            </Button>
                        </div>
                    </div>

                    {hasFiltered && (
                        <div className="border rounded-md p-4 bg-muted/30">
                            <h4 className="font-semibold mb-3">Étudiants filtrés :</h4>
                            <ul className="space-y-2">
                                {parcours
                                    .filter((p) => !selectedDepartement || p.departement.id === Number(selectedDepartement))
                                    .filter((p) => !selectedClasse || p.classes.id === Number(selectedClasse))
                                    .map((p) => (
                                        <li key={p.id} className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedEtudiants.includes(Number(p.etudiant.id))}
                                                onChange={() => handleEtudiantSelect(Number(p.etudiant.id))}
                                                className="form-checkbox"
                                            />
                                            <span className="text-sm">{p.etudiant?.matricule} - {p.etudiant?.name} {p.etudiant?.prenom}</span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Date de début</Label>
                            <Input
                                type="datetime-local"
                                value={data.date_debut}
                                onChange={(e) => setData("date_debut", e.target.value)}
                            />
                            <InputError message={errors.date_debut} className="mt-2" />
                        </div>
                        <div>
                            <Label>Date de fin</Label>
                            <Input
                                type="datetime-local"
                                value={data.date_fin}
                                onChange={(e) => setData("date_fin", e.target.value)}
                            />
                            <InputError message={errors.date_fin} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <Label>Fichier de l'examen</Label>
                        <Input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                        {fileName && <p className="text-sm text-muted-foreground mt-1">📎 {fileName}</p>}
                    </div>

                    <div>
                        <Label>Instructions / Sujet</Label>
                        <div className="border rounded-md overflow-hidden h-[300px]">
                            <ReactQuill
                                theme="snow"
                                value={editorContent}
                                onChange={(value) => {
                                    setEditorContent(value);
                                    setData("sujet_explication", value);
                                }}
                                className="h-[250px]"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? "Envoi en cours..." : "Créer l'examen"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { AddExamensForStudents };
