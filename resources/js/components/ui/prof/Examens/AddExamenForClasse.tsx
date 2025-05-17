import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "@inertiajs/react";
import {
  CalendarIcon,
  FileText,
  Landmark,
  FilePlus,
  Building2Icon,

} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Departement, Niveaux } from "@/types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import InputError from "@/components/input-error";

function AddExamensForClasse({
  departements,
  classes,
}: {
  departements: Departement[];
  classes: Niveaux[];
}) {
  const [editorContent, setEditorContent] = useState("");

  const { data, setData, post, processing, reset, progress,errors } = useForm({
    titre: "",
    fichier: null as File | null,
    date_debut: "",
    date_fin: "",
    sujet_explication: "",
    type:'classe',
    departement: "",
    niveaux: "",
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setData("fichier", file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dateDebut = new Date(data.date_debut);
    const dateFin = new Date(data.date_fin);
    if (dateFin <= dateDebut) {
      alert("La date de fin doit être supérieure à la date de début.");
      return;
    }
    const hasFile = data.fichier instanceof File;
    const hasSujet = data.sujet_explication && data.sujet_explication.trim().length > 0;

    if (!hasFile && !hasSujet) {
      alert("Veuillez fournir un fichier ou saisir un sujet écrit.");
      return;
    }

    post(route("prof.examens.create.classe"), {
      forceFormData: true,
      onSuccess: () => {
        toast.success("Examen créé avec succès");
        reset();
        setEditorContent('');
        setFileName(null);
      },
      onError: () => {
        toast.error("Une erreur s’est produite.");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <FilePlus size={16} />
          Programmer un examen
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-52 max-h-[90vh] overflow-y-auto rounded-lg p-8 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Nouvelle évaluation pour une classe
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          {/* Titre */}
          <div>
          <Input
          type="hidden"
              id="type"

              value={data.titre}
              onChange={(e) => setData("type", e.target.value)}
            />

            <Label htmlFor="titre">Titre de l'examen</Label>
            <Input
              id="titre"
              placeholder="Ex : Contrôle de Java -classes Abstraite"
              value={data.titre}
              onChange={(e) => setData("titre", e.target.value)}
            />
          </div>
           <InputError message={errors.titre} className="mt-2" />

          {/* Département et Classe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Département</Label>
              <Select onValueChange={(val) => setData("departement", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un département" />
                </SelectTrigger>
                <SelectContent>
                  {departements.map((d) => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      <Landmark className="w-4 h-4 mr-2" />
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.departement} className="mt-2" />
            </div>

            <div>
              <Label>Classe</Label>
              <Select onValueChange={(val) => setData("niveaux", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une classe" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      <Building2Icon className="w-4 h-4 mr-2" />
                      {c.niveau}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.niveaux} className="mt-2" />
            </div>
          </div>


          {/* Date limite */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Date et heure Debut</Label>
            <div className="relative">
              <CalendarIcon className="absolute top-3 left-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="datetime-local"
                className="pl-10"
                value={data.date_debut}
                onChange={(e) => setData("date_debut", e.target.value)}
              />
            </div>
            <InputError message={errors.date_debut} className="mt-2" />
          </div>

          <div>
            <Label>Date et heure Fin</Label>
            <div className="relative">
              <CalendarIcon className="absolute top-3 left-3 w-4 h-4 text-muted-foreground" />
              <Input
                type="datetime-local"
                className="pl-10"
                value={data.date_fin}
                onChange={(e) => setData("date_fin", e.target.value)}
              />
            </div>
            <InputError message={errors.date_fin} className="mt-2" />
          </div>


          </div>


          {/* Fichier */}
          <div>
            <Label>Fichier de l'examen (PDF, Word...)</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            {fileName && (
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                {fileName}
              </p>
            )}
            {progress && (
              <progress
                className="mt-2 w-full"
                value={progress.percentage}
                max="100"
              />
            )}
          </div>
          <InputError message={errors.fichier} className="mt-2" />
          {/* Éditeur de contenu (sujet écrit) */}
          <div className="space-y-2">
            <Label>
              Sujet de l'examen ou Quelque instruction du sujet (facultatif)
            </Label>
            <div className="border rounded-md overflow-hidden h-[400px]">
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={(value) => {
                  setEditorContent(value);
                  setData("sujet_explication", value);
                }}
                className="h-[350px]"
              />
            </div>
          </div>
          <InputError message={errors.sujet_explication} className="mt-2" />
          {/* Bouton submit */}
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={processing}>
              {processing ? "Envoi en cours..." : "Créer l'examen"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { AddExamensForClasse };
