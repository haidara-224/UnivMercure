
import { Input } from "../../input";
import { Label } from "../../label";
import { FormEventHandler, useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import InputError from "@/components/input-error";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../dialog";
import { Button } from "../../button";
import { Salle } from "@/types";


interface ProposDialogue {
    openDialogue: boolean;
    onOpenChange: (open: boolean) => void;
    salle: Salle | null;
    //refresh: () => void;
}
function EditSalle({ openDialogue, onOpenChange, salle }: ProposDialogue) {
    const [salles, setSalle] = useState<string>(salle?.salle || "");
    const [capacite, setCapacite] = useState<number>(salle?.capacite || 1);

    const [processing, setIsProcessing] = useState(false)
    const { errors } = usePage().props;

   const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
         e.preventDefault();
         setIsProcessing(true);
         router.post(route("dashboard.salle.update", salle?.id), {
             _method: "put",
             salles,
             capacite,

         }, {
             onSuccess: () => {

                 setIsProcessing(false);

             },
             onError: () => {
                 setIsProcessing(false);
             }
         });
     };


     useEffect(() => {
         if (salle) {
             setSalle(salle.salle);
             setCapacite(salle.capacite);

         }
     }, [salle]);
    return (
        <Dialog open={openDialogue} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Editer</DialogTitle>
                    <DialogDescription>Remplissez les champs pour mettre à jour les information de la salle.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">

                        <div>
                            <Label htmlFor="salle" className="mb-2">Nom de la Salle</Label>
                            <Input
                                id="salle"
                                value={salles}
                                onChange={(e) => setSalle(e.target.value)}
                                type="text"
                                placeholder="Salle 101"
                                className="w-full"
                            />

                            <InputError message={errors.salle} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="capacite" className="mb-2">Capacité</Label>
                            <Input
                                id="capacite"
                                value={capacite}
                                onChange={(e) => setCapacite( e.target.valueAsNumber || 1)}
                                type="number"
                                placeholder="30"
                                className="w-full"
                            />
                            <InputError message={errors.capacite} className="mt-2" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={processing}>
                            {processing ? 'En Cours de sauvagarde' : 'Sauvegarder'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}


export { EditSalle }


