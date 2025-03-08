import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,

    DialogDescription,

    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";

import { Input } from "../input";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/components/input-error";

interface ProposDialogue {
    openAddDialogue: boolean;
    onOpenAddChange: (open: boolean) => void;

}
interface formAdd {
    name: string;
    [key: string]: unknown;
}
export default function AddFacultie({ openAddDialogue, onOpenAddChange,
}: ProposDialogue) {
    const { data, setData, post, processing, errors, reset } = useForm<formAdd>({
        name: '',

    });
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('dashboard.faculty.create'), {
            onFinish: () => reset('name'),
            onSuccess: () => {


                onOpenAddChange(false);
            },

        });
    }
    return (
        <Dialog open={openAddDialogue} onOpenChange={onOpenAddChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajouter une Faculté</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>

                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col">
                            <Label htmlFor="name" className="mb-5">
                                Nom
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                type="text"
                                className="col-span-3"
                                placeholder="Nom de la faculté"
                                autoComplete="off"
                            />
                            {/* Affichage des erreurs */}
                            <InputError message={errors.name} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-green-500 hover:bg-green-600"
                        >
                            {processing ? "Enregistrement..." : "Sauvegarder les modifications"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );

}
