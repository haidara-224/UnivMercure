import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Departement, faculty, professeur } from "@/types";
import { Label } from "../label";
import { Input } from "../input";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../select";
import InputError from "@/components/input-error";


interface ProposDialogue {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    departement: Departement | null;
    refresh: () => void,
    chefdpt: professeur[],
    faculty: faculty[]
}

export function EditDialogueDepartement({
    open,
    onOpenChange,
    departement,
    refresh,
    chefdpt,
    faculty
}: ProposDialogue) {
    const { data, setData, errors, put, processing } = useForm({
        name: departement?.name || "",
        chef: departement?.professeur.id || "",
        faculty: departement?.faculty.id || ""
    });

    useEffect(() => {
        if (departement) {
            setData("name", departement.name);
            setData("chef", departement.professeur.id); // ID of chef
            setData("faculty", departement.faculty.id); // ID of faculty
        }
    }, [departement, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/dashboard/departement/${departement?.id}`, {
            onSuccess: () => {
                refresh();
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Édition d'un Département</DialogTitle>
                    <DialogDescription>
                        Modifier {departement?.name}
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
                                placeholder="Nom du département"
                                autoComplete="off"
                            />
                            {/* Affichage des erreurs */}
                            {errors.name && (
                                <span className="text-red-500 text-sm">{errors.name}</span>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="chef" className="mb-5">Chef de département</Label>
                            <Select
                                value={data.chef.toString()}
                                onValueChange={(value) => setData("chef", parseInt(value))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choisir un chef de département" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Choisir un chef de département</SelectLabel>
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
                            {processing ? "Enregistrement..." : "Sauvegarder les modifications"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
