import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "../../input";
import { Label } from "../../label";
import { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/components/input-error";

interface form {
    salle: string,
    capacite: number,

    [key: string]: string | number
}
function AddSalle() {
    const { data, setData, post, processing, errors, reset } = useForm<form>({
      salle: '',
      capacite: 1,
    });

    const handleSubmit: FormEventHandler = (e) => {
      e.preventDefault();
      post(route("dashboard.salle.create"), {
        onFinish: () => reset(),
      });
    };

    return (
      <form onSubmit={handleSubmit}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline"><Plus /></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ajouter Une Salle de Classe</AlertDialogTitle>
            </AlertDialogHeader>
        <AlertDialogDescription>Salle de Classes</AlertDialogDescription>
            {/* Formulaire déplacé ici */}
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="salle" className="mb-2">Nom de la Salle</Label>
                <Input
                  id="salle"
                  value={data.salle}
                  onChange={(e) => setData("salle", e.target.value)}
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
                  value={data.capacite}
                  onChange={(e) =>
                    setData("capacite", e.target.valueAsNumber || 1)
                  }
                  type="number"
                  placeholder="30"
                  className="w-full"
                />
                <InputError message={errors.capacite} className="mt-2" />
              </div>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit} disabled={processing} className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 focus:ring-2 focus:ring-offset-2 rounded-md">
                            {processing ? "Enregistrement..." : "Sauvegarder"}
                        </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    );
  }


export { AddSalle }


