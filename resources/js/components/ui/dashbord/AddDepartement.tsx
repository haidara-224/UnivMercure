import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,

    DialogDescription,

    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


import { Input } from "../input";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/components/input-error";
import { Label } from "../label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select";
import { faculty, professeur } from "@/types";

interface ProposDialogue {
    openAddDialogue: boolean;
    onOpenAddChange: (open: boolean) => void;
    refresh: () => void,
    chefdpt: professeur[],
    faculty: faculty[]

}
interface formAdd {
    name: string;
    chef: number;
    faculty: number;
    [key: string]: unknown;
}
export default function AddDepartement({ openAddDialogue, onOpenAddChange, refresh, chefdpt, faculty
}: ProposDialogue) {
    const { data, setData, post, processing, errors, reset } = useForm<formAdd>({
        name: '',
        chef: -1,
        faculty: -1


    });
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('dashboard.departement.create'), {
            onFinish: () => reset(), // Réinitialisation complète
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
                    <DialogTitle>Ajouter un Departement</DialogTitle>
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
                                placeholder="Nom du departement"
                                autoComplete="off"
                            />

                            <InputError message={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="chef" className="mb-5">Chef de departement</Label>
                            <Select
                                value={data.chef.toString()}
                                onValueChange={(value) => setData("chef", parseInt(value))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir un chef de departement" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Choisir un chef de departement</SelectLabel>
                                        {chefdpt.map((chef) => (
                                            <SelectItem key={chef.id} value={chef.id.toString()}>
                                                {chef.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.chef} />

                        </div>
                        <div>
                            <Label htmlFor="faculty" className="mb-5">Choisir une faculté</Label>
                            <Select
                                value={data.faculty.toString()}
                                onValueChange={(value) => setData("faculty", parseInt(value))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir une faculté" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Choisir une faculté</SelectLabel>
                                        {faculty.map((fac) => (
                                            <SelectItem key={fac.id} value={fac.id.toString()}>
                                                {fac.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.faculty} />

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
