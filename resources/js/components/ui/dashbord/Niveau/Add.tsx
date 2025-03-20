import InputError from "@/components/input-error";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../dialog";

import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Label } from "../../label";

;
import { Button } from "../../button";

import { Input } from "../../input";
interface ProposDialogue {
    openAddDialogue: boolean;
    onOpenAddChange: (open: boolean) => void;
    refresh: () => void,


}
interface formAdd {


    niveau:string
    [key: string]: string | number | undefined;
}


export function AddNiveau({ openAddDialogue, onOpenAddChange, refresh }: ProposDialogue) {
    const { data, setData, post, processing, errors, reset } = useForm<formAdd>({
        niveau: ""
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.niveau.create"), {
            onFinish: () => reset(),
            onSuccess: () => {
                refresh();
                onOpenAddChange(false);
            },
        });
    };

    return (
        <Dialog open={openAddDialogue} onOpenChange={onOpenAddChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajouter un Niveau</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">

                        <div>
                            <Label htmlFor="niveau" className="mb-5">Ajouter un Niveau</Label>
                            <Input
                                id="niveau"
                                value={data.niveau}
                                onChange={(e) => setData("niveau", e.target.value)}
                                type="text"
                                className="col-span-3"
                                placeholder="Niveau"
                                autoComplete="off"
                            />
                            <InputError message={errors.niveau} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-green-500 hover:bg-green-600"
                        >
                            {processing ? "Enregistrement..." : "Sauvegarder"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
