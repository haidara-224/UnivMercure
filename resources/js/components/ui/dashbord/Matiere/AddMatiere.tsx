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
  import { Checkbox } from "@/components/ui/checkbox";

  interface Form {
    nom: string;
    departement_id: number[];
    [key: string]: string | number | number[];
  }

  interface Departement {
    id: number;
    name: string;
  }

  interface AddMatiereProps {
    departements: Departement[];
  }

  function AddMatiere({ departements }: AddMatiereProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Form>({
      nom: "",
      departement_id: [],
    });

    const handleSubmit: FormEventHandler = (e) => {
      e.preventDefault();
      post(route("dashboard.matiere.create"), {
        onFinish: () => reset(),
      });
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <Plus />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ajouter une Matière</AlertDialogTitle>
            <AlertDialogDescription>
              Veuillez renseigner les informations ci-dessous.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            {/* Champ Matière */}
            <div>
              <Label htmlFor="nom" className="mb-2">
                Matière
              </Label>
              <Input
                id="nom"
                value={data.nom}
                onChange={(e) => setData("nom", e.target.value)}
                type="text"
                placeholder="Ex: Mathématiques"
                className="w-full"
              />
              <InputError message={errors.nom as string} className="mt-2" />
            </div>
            {/* Sélection des départements */}
            <div>
              <Label className="mb-2">Département(s)</Label>
              <div className="grid grid-cols-3 gap-5">
                {departements.map((dept) => (
                  <div key={dept.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`departement-${dept.id}`}
                      value={dept.id}
                      checked={data.departement_id.includes(dept.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setData("departement_id", [...data.departement_id, dept.id]);
                        } else {
                          setData(
                            "departement_id",
                            data.departement_id.filter((id) => id !== dept.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`departement-${dept.id}`}>{dept.name}</Label>
                  </div>
                ))}
              </div>
              <InputError
                message={errors.departement_id as string}
                className="mt-2"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              disabled={processing}
              className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200 focus:ring-2 focus:ring-offset-2 rounded-md"
            >
              {processing ? "Enregistrement..." : "Sauvegarder"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  export { AddMatiere };
