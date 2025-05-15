import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Matiere } from "@/types";
import { FormEventHandler, useEffect, useState } from "react";
import { Checkbox } from "../../checkbox";
import InputError from "@/components/input-error";
import { router, usePage } from "@inertiajs/react";

interface EditMatiereProps {
    matiere: Matiere | null;
    departement: {
        id: number;
        name: string;
    }[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditMatiere({
    matiere,
    departement,
    onOpenChange,
    open,
}: EditMatiereProps) {
    const [data, setData] = useState({
        nom: "",
        credits: 0,
        departement_id: [] as number[],
    });
    const { errors } = usePage().props;
    const [processing, setIsProcessing] = useState(false)
    useEffect(() => {
        if (matiere) {
            setData({
                nom: matiere.nom,
                credits: matiere.credits,
                departement_id: matiere.departements.map((dept) => dept.id),
            });
        }
    }, [matiere, departement]);
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        router.post(route("dashboard.matiere.update", matiere?.id), {
            _method: "put",
            nom: data?.nom,
            credits: data?.credits,
            departement_id: data?.departement_id,

        }, {
            onSuccess: () => {

                setIsProcessing(false);
                onOpenChange(false);
            },
            onError: () => {
                setIsProcessing(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg rounded-2xl shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-gray-800">
                        Modifier la matière
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        Faites les modifications souhaitées puis cliquez sur "Enregistrer".
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Nom de la matière
                            </Label>
                            <Input
                                id="name"
                                value={data.nom}

                                onChange={(e) =>
                                    setData((prev) => ({ ...prev, nom: e.target.value }))
                                }
                                className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="Ex : Mathématiques"
                            />
                        </div>
                        <InputError message={errors.nom as string} className="mt-2" />
                        <div className="grid gap-2">
                            <Label htmlFor="credit" className="text-sm font-medium text-gray-700">
                                Credit
                            </Label>
                            <Input
                                id="credit"
                                type="number"
                                min={1}
                                max={4}
                                value={data.credits}

                                onChange={(e) =>
                                    setData((prev) => ({ ...prev, credits: Number(e.target.value) }))
                                }
                                className="rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="credits"
                            />
                        </div>
                        <InputError message={errors.nom as string} className="mt-2" />

                        <div className="grid gap-2">
                            <Label
                                htmlFor="departement"
                                className="text-sm font-medium text-gray-700"
                            >
                                Départements liés
                            </Label>
                            <div className="max-h-52 overflow-y-auto pr-1 rounded-lg border border-gray-200 bg-gray-50">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3">
                                    {departement.map((dept) => (
                                        <div
                                            key={dept.id}
                                            className="flex items-center space-x-2 rounded-md px-2 py-1 bg-white hover:bg-gray-100 transition"
                                        >
                                            <Checkbox
                                                id={`departement-${dept.id}`}
                                                value={dept.id}
                                                checked={data.departement_id.includes(dept.id)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setData((prev) => ({
                                                            ...prev,
                                                            departement_id: [...prev.departement_id, dept.id],
                                                        }));
                                                    } else {
                                                        setData((prev) => ({
                                                            ...prev,
                                                            departement_id: prev.departement_id.filter(
                                                                (id) => id !== dept.id
                                                            ),
                                                        }));
                                                    }
                                                }}
                                            />
                                            <Label
                                                htmlFor={`departement-${dept.id}`}
                                                className="text-sm text-gray-700"
                                            >
                                                {dept.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <InputError
                            message={errors.departement_id as string}
                            className="mt-2"
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            disabled={processing}
                            type="submit"
                            className="w-full sm:w-auto rounded-xl bg-primary text-white hover:bg-primary/90 transition"
                        >
                            {processing ? "En Cours d'édition" : 'Sauvegarder'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
