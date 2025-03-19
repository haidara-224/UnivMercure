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
    matricule: string,
    name: string,
    prenom: string,
    telephone: string,
    photo: File | null,
    [key: string]: string | number | File | null | undefined;
}

export function AddProfesseur({ openAddDialogue, onOpenAddChange, refresh, }: ProposDialogue) {
    const { data, setData, post, processing, errors, reset, progress } = useForm<formAdd>({
        matricule: '',
        name: '',
        prenom: '',
        telephone: '',
        photo: null
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.prof.create"), {
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
                    <DialogTitle>Ajouter un Professeur</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Matricule */}
                        <div>
                            <Label htmlFor="matricule" className="mb-2">Matricule</Label>
                            <Input
                                id="matricule"
                                value={data.matricule}
                                onChange={(e) => setData("matricule", e.target.value)}
                                type="text"
                                className="col-span-3"
                                placeholder="Matricule"
                                autoComplete="off"
                            />
                            <InputError message={errors.matricule} />
                        </div>

                        {/* Nom */}
                        <div>
                            <Label htmlFor="name" className="mb-2">Nom</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                type="text"
                                className="col-span-3"
                                placeholder="Nom"
                                autoComplete="off"
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Prénom */}
                        <div>
                            <Label htmlFor="prenom" className="mb-2">Prénom</Label>
                            <Input
                                id="prenom"
                                value={data.prenom}
                                onChange={(e) => setData("prenom", e.target.value)}
                                type="text"
                                className="col-span-3"
                                placeholder="Prénom"
                                autoComplete="off"
                            />
                            <InputError message={errors.prenom} />
                        </div>

                        {/* Téléphone */}
                        <div>
                            <Label htmlFor="telephone" className="mb-2">Téléphone</Label>
                            <Input
                                id="telephone"
                                value={data.telephone}
                                onChange={(e) => setData("telephone", e.target.value)}
                                type="text"
                                className="col-span-3"
                                placeholder="Téléphone"
                                autoComplete="off"
                            />
                            <InputError message={errors.telephone} />
                        </div>


                        <div>
                            <Label htmlFor="photo" className="mb-2">Photo</Label>
                            <div className="flex items-center space-x-4">
                                <label
                                    htmlFor="photo"
                                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                >
                                    Choisir un fichier
                                </label>
                                <span className="text-gray-500">
                                    {data.photo ? data.photo.name : "Aucun fichier sélectionné"}
                                </span>
                            </div>
                            <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setData("photo", e.target.files ? e.target.files[0] : null)}
                            />
                            <InputError message={errors.photo} />
                        </div>
                        {progress && (
                            <div className="mt-2">
                                <progress value={progress.percentage} max="100" className="w-full h-2 rounded-lg bg-gray-200">
                                </progress>
                                <p className="text-sm text-gray-500 mt-1">{progress.percentage}%</p>
                            </div>
                        )}

                        {data.photo && (
                            <div className="mt-4 text-center">
                                <Label className="mb-2 block text-lg font-semibold">Aperçu</Label>
                                <img
                                    src={URL.createObjectURL(data.photo)}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg shadow-md mx-auto"
                                />
                            </div>
                        )}
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
