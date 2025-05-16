import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { router, useForm } from "@inertiajs/react";
import {
  CalendarIcon,
  FileText,
  Landmark,
  Building2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Departement, ExamensByClasse, Niveaux } from "@/types";
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

interface EditExamensModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  examen: ExamensByClasse | null;
  departements: Departement[];
  classes: Niveaux[];
}

function ExamensClasseModal({
  open,
  onOpenChange,
  examen,
  departements,
  classes,
}: EditExamensModalProps) {
  const [editorContent, setEditorContent] = useState("");

  const { data, setData, progress, errors } = useForm({
    titre: "",
    fichier: null as File | null,
    date_debut: "",
    date_fin: "",
    sujet_explication: "",
    departement: "",
    niveaux: "",
  });

  const [fileName, setFileName] = useState<string | null>(null);

const [isSubmited,setIsSubmited]=useState(false)


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setData("fichier", file);
    }
  };
  useEffect(() => {
    if (examen) {
        setData({
            titre: examen?.titre || "",
            sujet_explication: examen.sujet_explication || "",
            fichier: null,
            departement: examen.departement?.id?.toString() || "",
            niveaux: examen.classes?.id?.toString() || "",
            date_debut: examen.date_debut,
            date_fin: examen.date_fin,
          })

      setEditorContent(examen.sujet_explication || "");
    }
  }, [examen,setData]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dateDebut = new Date(data.date_debut);
    const dateFin = new Date(data.date_fin);

    if (dateFin <= dateDebut) {
      toast.error("La date de fin doit être supérieure à la date de début.");
      return;
    }

    const hasFile = data.fichier instanceof File;
    const hasSujet = data.sujet_explication && data.sujet_explication.trim().length > 0;

    if (!hasFile && !hasSujet) {
      toast.error("Veuillez fournir un fichier ou un sujet écrit.");
      return;
    }

setIsSubmited(true)

    router.post(route("prof.examens.update.classe", examen?.id), {
                   _method: "put",
                   titre: data?.titre ,
                   sujet_explication: data.sujet_explication,
                   fichier: data.fichier,
                   departement: data.departement,
                   niveaux: data.niveaux,
                   date_debut: data.date_debut,
                   date_fin: data.date_fin,


               }, {
                   forceFormData:true,
                   onSuccess: () => {
                       toast('Tutoriel Editer avec succès.')

                       setFileName(null);
                       setIsSubmited(false)
                       setEditorContent('');

                       onOpenChange(false);
                   },
                   onError: (error) => {
                    setIsSubmited(false)
                       console.error(error)
                       console.log(data)
                   }
               });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {examen ? "Modifier l'examen" : "Créer un examen pour une classe"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Titre */}
          <div>
            <Label htmlFor="titre">Titre</Label>
            <Input
              id="titre"
              value={data.titre}
              onChange={(e) => setData("titre", e.target.value)}
            />
            <InputError message={errors.titre} />
          </div>

          {/* Département & Classe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Département</Label>
              <Select value={data.departement} onValueChange={(val) => setData("departement", val)}>
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
              <InputError message={errors.departement} />
            </div>

            <div>
              <Label>Classe</Label>
              <Select value={data.niveaux} onValueChange={(val) => setData("niveaux", val)}>
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
              <InputError message={errors.niveaux} />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Date de début</Label>
              <div className="relative">
                <CalendarIcon className="absolute top-3 left-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="datetime-local"
                  className="pl-10"
                  value={data.date_debut}
                  onChange={(e) => setData("date_debut", e.target.value)}
                />
              </div>
              <InputError message={errors.date_debut} />
            </div>

            <div>
              <Label>Date de fin</Label>
              <div className="relative">
                <CalendarIcon className="absolute top-3 left-3 w-4 h-4 text-muted-foreground" />
                <Input
                  type="datetime-local"
                  className="pl-10"
                  value={data.date_fin}
                  onChange={(e) => setData("date_fin", e.target.value)}
                />
              </div>
              <InputError message={errors.date_fin} />
            </div>
          </div>

          {/* Fichier */}
          <div>
            <Label>Fichier (PDF, Word...)</Label>
            <Input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            {fileName && (
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                {fileName}
              </p>
            )}
            {progress && (
              <progress className="mt-2 w-full" value={progress.percentage} max="100" />
            )}
            <InputError message={errors.fichier} />
          </div>

          {/* Sujet (éditeur) */}
          <div>
            <Label>Sujet ou instructions</Label>
            <div className="rounded-md border h-[400px] bg-white">
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
            <InputError message={errors.sujet_explication} />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmited}>
              {isSubmited ? "Enregistrement..." : "Valider l'examen"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { ExamensClasseModal };
