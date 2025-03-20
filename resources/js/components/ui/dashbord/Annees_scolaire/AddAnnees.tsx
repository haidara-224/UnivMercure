import InputError from "@/components/input-error";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../dialog";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Label } from "../../label";
import { Button } from "../../button";

import { Input } from "../../input";
interface ProposDialogue {
    openAddDialogue: boolean;
    onOpenAddChange: (open: boolean) => void;
     refresh: () => void,
}
interface formAdd {
    annees_scolaire: string,
    Date_debut: Date,
    Date_fin: Date,
    [key: string]: string | null | Date | undefined;
}

export function AddAnnees({ openAddDialogue, onOpenAddChange, refresh}: ProposDialogue) {
    const { data, setData, post, processing, errors, reset } = useForm<formAdd>({
        annees_scolaire: '',
        Date_debut: new Date(),
        Date_fin: new Date(),

    });
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let value = e.target.value;
        if (!/^\d{0,4}-?\d{0,4}$/.test(value)) return;
        if (value.length === 4 && !value.includes('-')) {
            value += '-';
        }

        setData("annees_scolaire", value);
        const isValid = /^\d{4}-\d{4}$/.test(value);
        if (!isValid) {
            errors.annees_scolaire = "Le format doit être YYYY-YYYY (ex: 2021-2022)";
        } else {
            errors.annees_scolaire = "";
        }
    };


    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.ann_scolaire.create"), {
            onFinish: () => reset(),
            onSuccess: () => {
                refresh();
                onOpenAddChange(false);
            },
        });
    };

    return (
        <Dialog open={openAddDialogue} onOpenChange={onOpenAddChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Ajouter une Années Scolaire</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div>
                            <Label htmlFor="matricule" className="mb-2">Années Scolaire</Label>
                            <Input
                                id="annees_scolaire"
                                value={data.annees_scolaire}
                                onChange={handleChange}
                                type="text"
                                className="col-span-3"
                                placeholder="2021-2022"
                                autoComplete="off"
                                maxLength={9}
                            />
                        </div>
                        <InputError message={errors.annees_scolaire} />
                    </div>
                    <div>
                        <Label htmlFor="date_debut" className="mb-2">Début de l'années Scolaire</Label>
                        <Input
                            id="date_debut"
                            type="date"
                            value={data.Date_debut.toISOString().split('T')[0]}
                            className="col-span-3"
                            onChange={(e) => setData("Date_debut", new Date(e.target.value))}
                            autoComplete="off"

                        />
                        <InputError message={errors.Date_debut} />

                    </div>
                    <div>
                        <Label htmlFor="date_fin" className="mb-2">Fin de l'années Scolaire</Label>
                        <Input
                            id="date_fin"
                            type="date"
                            value={data.Date_fin.toISOString().split('T')[0]}
                            className="col-span-3"
                            onChange={(e) => setData("Date_fin", new Date(e.target.value))}
                            autoComplete="off"

                        />
                         <InputError message={errors.Date_fin} />

                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-green-500 hover:bg-green-600 mt-5"
                        >
                            {processing ? "Enregistrement..." : "Sauvegarder"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );

}
