import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  Dialog, DialogClose, DialogContent, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useId, useState } from "react";
import { Upload, Video, FileText, X } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Departement, Niveaux } from "@/types";
import { toast } from "sonner";

interface Props {
  departement: Departement[];
  niveau: Niveaux[];
}

function AddTuto({ departement, niveau }: Props) {
  const [editorContent, setEditorContent] = useState('');
  const [filePreview, setFilePreview] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<File | null>(null);
  const id = useId();

  const { data, setData, post, processing, progress, reset } = useForm({
    titre: '',
    contenue: '',
    fichier: null as File | null,
    video: null as File | null,
    departement: '',
    niveaux: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('prof.cours.create'), {
      forceFormData: true,
      onSuccess: () => {
        toast('Tutoriel ajouté avec succès.')
        reset();
        setFilePreview(null);
        setVideoPreview(null);
        setEditorContent('');
      },
      onError:(error)=>{
        console.error(error)
        console.log(data)
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilePreview(file);
      setData('fichier', file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file ) {
      setVideoPreview(file);

      setData('video', file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload size={16} /> Ajouter un Tuto
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-none !w-screen !h-screen p-0 flex flex-col">
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-8 space-y-6" encType="multipart/form-data">
          <DialogHeader>
            <DialogTitle className="text-xl mb-6">Ajouter un Tutoriel</DialogTitle>
          </DialogHeader>

          <div>
            <Label htmlFor="titre">Titre</Label>
            <Input id="titre" value={data.titre} onChange={(e) => setData('titre', e.target.value)} />
          </div>

          <div>
            <Label htmlFor="fichier">Fichier PDF/Word/PPT</Label>
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={handleFileChange}
            />
            {filePreview && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <FileText size={16} />
                {filePreview.name}
                <button onClick={() => { setFilePreview(null); setData('fichier', null); }} className="ml-auto hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="video">Vidéo (optionnelle)</Label>
            <Input
  type="file"
  accept="video/mp4,video/avi,video/mpeg,video/quicktime,video/x-ms-wmv"
  onChange={handleVideoChange}
/>
            {videoPreview && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Video size={16} />
                {videoPreview.name}
                <button onClick={() => { setVideoPreview(null); setData('video', null); }} className="ml-auto hover:text-red-500">
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {progress && (
            <div className="mt-4">
              <progress className="w-full" value={progress.percentage} max="100" />
              <p className="text-xs text-muted-foreground text-right mt-1">{progress.percentage}%</p>
            </div>
          )}

          <div className="space-y-2 min-w-[300px]">
            <Label htmlFor={`${id}-departement`}>Département</Label>
            <Select onValueChange={(val) => setData('departement', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un département" />
              </SelectTrigger>
              <SelectContent>
                {departement.map((dpt) => (
                  <SelectItem key={dpt.id} value={dpt.id.toString()}>{dpt.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 min-w-[300px]">
            <Label htmlFor={`${id}-classe`}>Classe</Label>
            <Select onValueChange={(val) => setData('niveaux', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une classe" />
              </SelectTrigger>
              <SelectContent>
                {niveau.map((nv) => (
                  <SelectItem key={nv.id} value={nv.id.toString()}>{nv.niveau}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Contenu du cours</Label>
            <div className="rounded-md border border-border bg-white h-[400px]">
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={(value) => {
                  setEditorContent(value);
                  setData('contenue', value);
                }}
                className="h-[350px]"
              />
            </div>
          </div>

          <DialogFooter className="p-6 border-t">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" disabled={processing}>
              {processing ? 'Envoi en cours...' : 'Valider'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { AddTuto };
