import { useState } from 'react';
import { BookA, Send } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../select';
import { Label } from '../label';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useForm } from '@inertiajs/react';
import { Button } from '../button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../dialog';
import InputError from '@/components/input-error';
import { toast } from 'sonner';
import { AnnessScolaire, Departement, Niveaux } from '@/types';
interface SendDemandeDocumentProps {
    classes: Niveaux[];
    departements: Departement[];
    annes_scolaire:AnnessScolaire[]
}
export function SendDemandeDocument({ classes, departements,annes_scolaire }: SendDemandeDocumentProps) {
    const [editorContent, setEditorContent] = useState("");
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        type_document: "",
        comment: "",
        classes_id: "",
        departement_id: "",
        annees_scolaire_id:""
    });
    const [errorsTypeDocument, setErrorsTypeDocument] = useState("");
    const [errorsTypeDocumentAutre, setErrorsTypeDocumentAutre] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (data.type_document === "autre" && !data.comment ) {
            setErrorsTypeDocumentAutre("Veuillez préciser votre demande.");
            return;
        }
        if (data.type_document === "releve de notes" && !data.classes_id && !data.annees_scolaire_id && !data.departement_id) {
            setErrorsTypeDocument("Veuillez préciser la classe, le département et l'année scolaire.");
            return;
        }
        if (data.type_document === "attestation d'inscription" && !data.classes_id && !data.annees_scolaire_id && !data.departement_id) {
            setErrorsTypeDocument("Veuillez préciser la classe, le département et l'année scolaire.");
            return;
        }

        post(route("etudiant.demande.document"), {
            onSuccess: () => {
                setEditorContent("");
                reset();
                setOpen(false);
            },
            onError: () => {
                toast.error("Une erreur s'est produite.");
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                    <span className="relative z-10">Faire une demande</span>
                    <BookA className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <BookA className="text-indigo-600" size={24} />
                        Demande de Document
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Type de document
                            </Label>
                            <Select
                                onValueChange={(val) => setData("type_document", val)}
                                value={data.type_document}
                            >
                                <SelectTrigger className="w-full h-12">
                                    <SelectValue placeholder="Sélectionnez un document" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="text-indigo-600 font-medium">
                                            Documents disponibles
                                        </SelectLabel>
                                        <SelectItem value="attestation d'inscription">
                                            Attestation d'inscription
                                        </SelectItem>
                                        <SelectItem value="releve de notes">
                                            Relevé de notes
                                        </SelectItem>
                                        <SelectItem value="certificat de fin d'études">
                                            Certificat de fin d'études
                                        </SelectItem>
                                        <SelectItem value="autre">
                                            Autre (précisez ci-dessous)
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.type_document} className="mt-2" />
                        </div>
                       <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Années Scolaire
                            </Label>
                            <Select
                                onValueChange={(val) => setData("annees_scolaire_id", val)}
                                value={data.annees_scolaire_id}
                            >
                                <SelectTrigger className="w-full h-12">
                                    <SelectValue placeholder="Sélectionnez une années Scolaire" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="text-indigo-600 font-medium">
                                            Années Scolaire
                                        </SelectLabel>
                                        {annes_scolaire.map((ann) => (
                                            <SelectItem key={ann.id} value={String(ann.id)}>
                                                {ann.annee_scolaire}
                                            </SelectItem>
                                        ))}


                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.classes_id} className="mt-2" />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Niveaux
                            </Label>
                            <Select
                                onValueChange={(val) => setData("classes_id", val)}
                                value={data.classes_id}
                            >
                                <SelectTrigger className="w-full h-12">
                                    <SelectValue placeholder="Sélectionnez un niveau" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="text-indigo-600 font-medium">
                                            Niveaux
                                        </SelectLabel>
                                        {classes.map((classe) => (
                                            <SelectItem key={classe.id} value={String(classe.id)}>
                                                {classe.niveau}
                                            </SelectItem>
                                        ))}


                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.classes_id} className="mt-2" />
                        </div>

                          <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Departement
                            </Label>
                            <Select
                                onValueChange={(val) => setData("departement_id", val)}
                                value={data.departement_id}
                            >
                                <SelectTrigger className="w-full h-12">
                                    <SelectValue placeholder="Sélectionnez un département" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel className="text-indigo-600 font-medium">
                                            Departement
                                        </SelectLabel>
                                        {departements.map((departement) => (
                                            <SelectItem key={departement.id} value={String(departement.id)}>
                                                {departement.name}
                                            </SelectItem>
                                        ))}


                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.departement_id} className="mt-2" />
                        </div>

                                         <p className="text-red-500 mt-2">{errorsTypeDocument}</p>
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                {data.type_document === "autre" &&
                                     "Décrivez votre demande"
                                 }
                            </Label>
                            <div className="border rounded-lg overflow-hidden">
                                <ReactQuill
                                    theme="snow"
                                    value={editorContent}
                                    onChange={(value) => {
                                        setEditorContent(value);
                                        setData("comment", value);
                                    }}
                                    className="h-64"
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [1, 2, false] }],
                                            ['bold', 'italic', 'underline'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link'],
                                            ['clean']
                                        ]
                                    }}
                                    placeholder="Écrivez votre message ici..."
                                />
                            </div>
                            <p className="text-red-500 mt-2">{errorsTypeDocumentAutre}</p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            {processing ? (
                                <span className="animate-spin mr-2">Envoi...</span>
                            ) : (
                                "Envoyer la demande"
                            )}
                            <Send className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
