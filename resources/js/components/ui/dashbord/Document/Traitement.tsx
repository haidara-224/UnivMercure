import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { router, useForm } from "@inertiajs/react";
import {

    FileText,

} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Demandedocuments } from "@/types";
import { Label } from "@/components/ui/label";

import InputError from "@/components/input-error";

interface EditExamensModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document: Demandedocuments | null;

}

function TraitementModale({
    open,
    onOpenChange,
    document,
}: EditExamensModalProps) {


    const { data, setData, progress, errors } = useForm({
        demandedocument_id: document?.id || null,
        document: null as File | null,

    });

    const [fileName, setFileName] = useState<string | null>(null);

    const [isSubmited, setIsSubmited] = useState(false)


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setData("document", file);
        }
    };
    useEffect(() => {
        if (document) {
            setData({
                demandedocument_id: document.id,
                document: null, // Reset file input

            })


        }
    }, [document, setData]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();



        setIsSubmited(true)

        router.post(route("documentaliste.documents.store"), {
            demandedocument_id: data.demandedocument_id,
            document: data.document,


        }, {
            forceFormData: true,
            onSuccess: () => {
                toast('Document traité avec succès')

                setFileName(null);
                setIsSubmited(false)


                onOpenChange(false);
            },
            onError: (error) => {
                setIsSubmited(false)
                console.error(error)
                console.log(data)
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {document?.statut==='traité' ? "Modifier le document" : "Télecharger le document"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>

                        <Input
                            id="titre"
                            type="hidden"
                            value={Number(document?.id) || ""}
                            onChange={(e) => setData("demandedocument_id", Number(e.target.value))}
                        />
                        <InputError message={errors.demandedocument_id} />
                    </div>



                    <div>
                        <Label>Fichier (PDF, Word...)</Label>
                        <Input type="file"  onChange={handleFileChange} />
                        {fileName && (
                            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                {fileName}
                            </p>
                        )}
                        {progress && (
                            <progress className="mt-2 w-full" value={progress.percentage} max="100" />
                        )}
                        <InputError message={errors.document} />
                    </div>



                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmited}>
                            {isSubmited ? "Enregistrement..." : "Uploader le document"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { TraitementModale };
