import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { faculty } from "@/types";
import { Label } from "../label";
import { Input } from "../input";
import { useForm,  } from "@inertiajs/react";
import { useEffect } from "react";

interface ProposDialogue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faculty: faculty | null;
}

export function EditDialogueFaculty({
  open,
  onOpenChange,
  faculty,
}: ProposDialogue) {
  const { data, setData, errors, put, processing } =
    useForm({
      name: faculty?.name || "",
    });


    useEffect(() => {
        if (faculty) {
          setData("name", faculty.name);
        }
      }, [faculty, setData]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/dashboard/faculty/${faculty?.id}`, {
      onSuccess: () => {


        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Édition d'une Faculté</DialogTitle>

          <DialogDescription>
            Modifier {faculty?.name}
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
                placeholder="Nom de la faculté"
                autoComplete="off"
              />
              {/* Affichage des erreurs */}
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
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
