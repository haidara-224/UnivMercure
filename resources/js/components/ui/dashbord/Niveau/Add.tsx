import InputError from "@/components/input-error";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../dialog";

import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Label } from "../../label";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../select";
import { Button } from "../../button";
import { Departement } from "@/types";
interface ProposDialogue {
    openAddDialogue: boolean;
    onOpenAddChange: (open: boolean) => void;
    refresh: () => void,

    departement: Departement[]

}
interface formAdd {


    departement: number;
    chef?: number;
    faculty?: number;
    [key: string]: string | number | undefined;
}
enum Niveau {
    LICENCE_1 = "Licence 1",
    LICENCE_2 = "Licence 2",
    LICENCE_3 = "Licence 3",
    LICENCE_4 = "Licence 4",
    LICENCE_5 = "Licence 5",
    MASTER_1 = "Master 1",
    MASTER_2 = "Master 2"
}
const niveauxArray = Object.values(Niveau);
export function AddNiveau({ openAddDialogue, onOpenAddChange, refresh, departement }: ProposDialogue) {
    const { data, setData, post, processing, errors, reset } = useForm<formAdd>({
        departement: -1,
        niveau: "" as string // Doit être une chaîne car Niveau est un enum de type string
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
                        {/* Sélection du Département */}
                        <div>
                            <Label htmlFor="departement" className="mb-5">Département</Label>
                            <Select
                                value={data.departement.toString()}
                                onValueChange={(value) => setData("departement", parseInt(value))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Département" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Choisir un Département</SelectLabel>
                                        {departement.map((dpt) => (
                                            <SelectItem key={dpt.id} value={dpt.id.toString()}>
                                                {dpt.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.departement} />
                        </div>

                        {/* Sélection du Niveau */}
                        <div>
                            <Label htmlFor="niveau" className="mb-5">Choisir un Niveau</Label>
                            <Select
                                value={data.niveau as string}
                                onValueChange={(value) => setData("niveau", value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Niveau" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Choisir Un Niveau</SelectLabel>
                                        {niveauxArray.map((nv) => (
                                            <SelectItem key={nv} value={nv}>
                                                {nv}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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
