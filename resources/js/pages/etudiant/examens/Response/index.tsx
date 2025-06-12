import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubjectModalEtudiant } from "@/components/ui/prof/Examens/SujectModalEtudiant";
import AppSidebarLayoutEtudiant from "@/layouts/app/app-sidebarEtud-layout";
import { BreadcrumbItem, ExamensByEtudiant, examenstudentresponse } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FileSearch, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Accueil", href: "/" },
    { title: "Examens", href: "/etudiant/examens/responses" },
];
interface PageProps {
    [key: string]: unknown;
}



interface CustomPageProps extends PageProps {
    examen: ExamensByEtudiant;
    response: examenstudentresponse
}
export default function Page() {
    const [editorContent, setEditorContent] = useState("");
    const { examen, response } = usePage<CustomPageProps>().props;
    const { data, setData, post, processing, progress, errors } = useForm({
        response: "",
        fichier: null as File | null,

    });
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setData("fichier", file);
        }
    };
    useEffect(() => {
        if (response) {
            setEditorContent(response?.reponse || '');
            setData("response", response?.reponse ?? '');
            setFileName(response?.fichier ? response.fichier : null);

        }
    }, [response, setData]);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const hasFile = data.fichier instanceof File;
        const hasSujet = data.response && data.response.trim().length > 0;

        if (!hasFile && !hasSujet) {
            alert("Veuillez fournir un fichier ou saisir la réponse.");
            return;
        }

        post(route("etudiant.examens.store.response", examen.id), {
            forceFormData: true,
            onSuccess: () => {
                toast.success("Examen créé avec succès");

            },
            onError: () => {
                toast.error("Une erreur s’est produite.");
            },
        });
    };
    const [openDialogue, setOpenDialogue] = useState(false);

const handleOpenSubjectModal = () => {

        setOpenDialogue(true);
    };


    return (
        <AppSidebarLayoutEtudiant breadcrumbs={breadcrumbs}>
            <Head title="Reponses Au Examens" />
            <div className="px-8 py-5">
                <Button
                    size="sm"
                    variant="ghost"
                    className="text-primary hover:bg-primary/5"
                    onClick={ handleOpenSubjectModal}
                >
                    <FileSearch className="h-4 w-4 mr-1" />
                    Voir Sujet
                </Button>
                <SubjectModalEtudiant open={openDialogue}
                    onOpenChange={setOpenDialogue}
                    examen={examen} />
                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                    <div>
                        <div>
                            <Label>Fichier de l'examen (PDF, Word...)</Label>
                            <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                            />
                            {fileName && (
                                <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                    <FileText className="w-4 h-4" />
                                    {fileName}
                                </p>
                            )}
                            {progress && (
                                <progress
                                    className="mt-2 w-full"
                                    value={progress.percentage}
                                    max="100"
                                />
                            )}
                        </div>
                        <InputError message={errors.fichier} className="mt-2" />
                        {response?.fichier && (
                            <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                <a
                                    href={`/storage/${response.fichier}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    Voir le fichier déjà soumis
                                </a>
                            </div>
                        )}


                    </div>


                    <div className="space-y-2">
                        <Label>
                            Respone Au sujet (facultatif)
                        </Label>
                        <div className="border rounded-md overflow-hidden h-[400px]">
                            <ReactQuill
                                theme="snow"
                                value={editorContent}
                                onChange={(value) => {
                                    setEditorContent(value);
                                    setData("response", value);
                                }}
                                className="h-[400px]"
                            />
                        </div>
                    </div>
                    <InputError message={errors.response} className="mt-2" />

                    <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? "Envoi en cours..." : "Soumettre Votre réponse"}
                        </Button>
                    </div>
                </form>
            </div>
        </AppSidebarLayoutEtudiant>
    )
}
