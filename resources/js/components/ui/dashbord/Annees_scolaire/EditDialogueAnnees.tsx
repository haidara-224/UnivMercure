import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../dialog";
import { Label } from "../../label";
import { Button } from "../../button";
import { Input } from "../../input";
import InputError from "@/components/input-error";
import { AnnessScolaire } from "@/types";

interface EditDialogueAnneesProps {
    open: boolean;
    onClose: () => void;
    anneeScolaire: AnnessScolaire | null;
    refresh: () => void;
}

const EditDialogueAnnees: React.FC<EditDialogueAnneesProps> = ({ open, onClose, anneeScolaire, refresh }) => {
    const { data, setData, put, processing, errors } = useForm({
        annees_scolaire: anneeScolaire?.annee_scolaire || '',
        date_debut: anneeScolaire?.date_debut || '',
        date_fin: anneeScolaire?.date_fin || '',
    });

    const [inputError, setInputError] = useState<string | null>(null);

    useEffect(() => {
        if (anneeScolaire) {
            setData({
                annees_scolaire: anneeScolaire.annee_scolaire,
                date_debut: anneeScolaire.date_debut,
                date_fin: anneeScolaire.date_fin,
            });
        }
    }, [anneeScolaire, setData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as "annees_scolaire" | "date_debut" | "date_fin", value);

        if (name === "annees_scolaire") {
            const regex = /^\d{4}-\d{4}$/;
            setInputError(regex.test(value) ? null : "Le format doit être YYYY-YYYY (ex: 2023-2024).");
        }
    };

    const formatDateToLocal = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        date.setMinutes(date.getMinutes());
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (anneeScolaire && !inputError) {
            put(route('dashboard.ann_scolaire.update', anneeScolaire.id), {
                onSuccess: () => {
                    refresh();
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle>Modifier l'année scolaire</DialogTitle>
                    <DialogDescription>hello</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="annee">Année</Label>
                            <Input
                                id="annee"
                                name="annees_scolaire"
                                value={data.annees_scolaire}
                                onChange={handleChange}
                                type="text"
                                className="w-full"
                                placeholder="Ex: 2023-2024"
                            />
                            {(inputError || errors.annees_scolaire) && <InputError message={inputError || errors.annees_scolaire} />}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date_debut">Date Début</Label>
                            <Input
                                id="date_debut"
                                name="date_debut"
                                value={typeof data.date_debut === 'string' ? formatDateToLocal(data.date_debut) : ''}
                                onChange={handleChange}
                                type="date"
                                className="w-full"
                            />
                            {errors.date_debut && <InputError message={errors.date_debut} />}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="date_fin">Date Fin</Label>
                            <Input
                                id="date_fin"
                                name="date_fin"
                                value={typeof data.date_fin === 'string' ? formatDateToLocal(data.date_fin) : ''}
                                onChange={handleChange}
                                type="date"
                                className="w-full"
                            />
                            {errors.date_fin && <InputError message={errors.date_fin} />}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={processing || !!inputError}>
                            {processing ? 'En cours...' : 'Sauvegarder'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialogueAnnees;
