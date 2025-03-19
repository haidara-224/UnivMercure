import InputError from "@/components/input-error";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../dialog";
import React, { FormEventHandler, useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Label } from "../../label";
import { Button } from "../../button";
import { Input } from "../../input";
import { professeur } from "@/types";


interface ProposDialogue {
    openDialogue: boolean;
    onOpenChange: (open: boolean) => void;
    professeur: professeur | null;
    refresh: () => void;
}

export function UpdateProfesseur({ openDialogue, onOpenChange, refresh, professeur }: ProposDialogue) {
    const [matricule, setMatricule] = useState<string>(professeur?.matricule || "");
    const [name, setName] = useState<string>(professeur?.name || "");
    const [prenom, setPrenom] = useState<string>(professeur?.prenom || "");
    const [telephone, setTelephone] = useState<string>(professeur?.telephone || "");
    const [photo, setPhoto] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [processing,setIsProcessing]=useState(false)
    const { errors } = usePage().props;

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setIsProcessing(true);
        router.post(route("dashboard.prof.update", professeur?.id), {
            _method: "put",
            matricule,
            name,
            prenom,
            telephone,
            photo,
        }, {
            onSuccess: () => {
                refresh();
                setIsProcessing(false);
            },
            onError: () => {
                setIsProcessing(false);
            }
        });
    };


    useEffect(() => {
        if (professeur) {
            setMatricule(professeur.matricule);
            setName(professeur.name);
            setPrenom(professeur.prenom);
            setTelephone(professeur.telephone);
        }
    }, [professeur]);

    return (
        <Dialog open={openDialogue} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Ajouter un Professeur</DialogTitle>
                    <DialogDescription>Remplissez les champs pour mettre à jour les informations du professeur.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="matricule">Matricule</Label>
                            <Input id="matricule" name="matricule" value={matricule} onChange={(e) => setMatricule(e.target.value)} type="text" className="w-full" placeholder="Matricule" />
                            {errors?.matricule && <InputError message={errors.matricule} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Nom</Label>
                            <Input id="name" value={name} name="name" onChange={(e) => setName(e.target.value)} type="text" className="w-full" placeholder="Nom" />
                            {errors?.name && <InputError message={errors.name} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="prenom">Prénom</Label>
                            <Input id="prenom" value={prenom} name="prenom" onChange={(e) => setPrenom(e.target.value)} type="text" className="w-full" placeholder="Prénom" />
                            {errors?.prenom && <InputError message={errors.prenom} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="telephone">Téléphone</Label>
                            <Input id="telephone" value={telephone} name="telephone" onChange={(e) => setTelephone(e.target.value)} type="text" className="w-full" placeholder="Téléphone" />
                            {errors?.telephone && <InputError message={errors.telephone} />}
                        </div>

                        <div>
                            <Label htmlFor="photo" className="mb-2">Photo</Label>
                            <Input id="photo" name="photo" onChange={handleUpload} type="file" className="w-full" placeholder="Choisissez une image" />
                            {errors?.photo && <InputError message={errors.photo} />}
                            {imagePreview && <img src={imagePreview} alt="preview" className="w-10 h-10 rounded-full object-cover" />}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={processing}>
                            {processing ? 'En Cours de sauvagarde' :'Sauvegarder'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
