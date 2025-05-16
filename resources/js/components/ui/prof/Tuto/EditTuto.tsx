import { Button } from "@/components/ui/button";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
    Dialog, DialogClose, DialogContent, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { FormEventHandler, useEffect, useId, useState } from "react";
import { Video, FileText, X } from "lucide-react";
import { router, useForm } from "@inertiajs/react";
import { Departement, Niveaux, Tutos } from "@/types";
import { toast } from "sonner";
import InputError from "@/components/input-error";


interface ProposDialogue {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tuto: Tutos | null;

    departement: Departement[];
    niveau: Niveaux[];
}
function EditTuto({ departement, niveau, open, onOpenChange, tuto }: ProposDialogue) {
    const [editorContent, setEditorContent] = useState(tuto?.contenue);
    const [filePreview, setFilePreview] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<File | null>(null);
    const id = useId();

    const { data, setData, processing, progress, reset, errors } = useForm({
        titre: '',
        contenue: '',
        fichier: null as File | null,
        video: null as File | null,
        departement: '',
        niveaux: '',
    });
    useEffect(() => {
        if (tuto) {
            setData({
                titre: tuto.titre || '',
                contenue: tuto.contenue || '',
                fichier: null,
                video: null,
                departement: tuto.departement?.id?.toString() || '',
                niveaux: tuto.classes?.id?.toString() || '',
            });

            setEditorContent(tuto.contenue || '');

            if (tuto.fichier) {
                if (tuto.video) {
                    setVideoPreview(new File([], tuto.video));
                }

            }

            if (tuto.video) {
                setVideoPreview(new File([], tuto.video));
            }
        }
    }, [tuto, setData]);


       const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
            e.preventDefault();

            router.post(route("prof.cours.update", tuto?.id), {
                _method: "put",
                titre: data?.titre,
                contenue: data?.contenue,
                fichier:data.fichier,
                video:data.video,
                departement: data?.departement,
                niveaux:data.niveaux,


            }, {
                forceFormData:true,
                onSuccess: () => {
                    toast('Tutoriel ajouté avec succès.')
                    reset();
                    setFilePreview(null);
                    setVideoPreview(null);
                    setEditorContent('');

                    onOpenChange(false);
                },
                onError: (error) => {
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
    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(URL.createObjectURL(videoPreview));
            }
        };
    }, [videoPreview]);

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideoPreview(file);

            setData('video', file);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>


            <DialogContent className="!max-w-none !w-screen !h-screen p-0 flex flex-col">
                <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-8 space-y-6" encType="multipart/form-data">
                    <DialogHeader>
                        <DialogTitle className="text-xl mb-6">Ajouter un Tutoriel</DialogTitle>
                    </DialogHeader>

                    <div>
                        <Label htmlFor="titre">Titre</Label>
                        <Input id="titre" value={data.titre} onChange={(e) => setData('titre', e.target.value)} />
                        <InputError message={errors.titre} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="fichier">Fichier PDF/Word/PPT (optionnelle)</Label>
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
                        <InputError message={errors.fichier} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="video">Vidéo (optionnelle)</Label>
                        <Input
                            type="file"
                            accept="video/mp4,video/avi,video/mpeg,video/quicktime,video/x-ms-wmv"
                            onChange={handleVideoChange}
                        />

                        {videoPreview && (
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Video size={16} />
                                    {videoPreview.name}
                                    <button
                                        onClick={() => {
                                            setVideoPreview(null);
                                            setData('video', null);
                                        }}
                                        className="ml-auto hover:text-red-500"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>


                                <video
                                    src={
                                        `/storage/${tuto?.video}`
                                    }
                                    controls
                                    className="w-64 h-28 rounded-md border"
                                    onError={() => toast.error('Impossible de lire la vidéo')}
                                />

                            </div>
                        )}
                    </div>


                    {progress && (
                        <div className="mt-4">
                            <progress className="w-full" value={progress.percentage} max="100" />
                            <p className="text-xs text-muted-foreground text-right mt-1">{progress.percentage}%</p>
                        </div>
                    )}
                    <InputError message={errors.video} className="mt-2" />
                    <div className="space-y-2 min-w-[300px]">
                        <Label htmlFor={`${id}-departement`}>Département</Label>
                        <Select value={data.departement} onValueChange={(val) => setData('departement', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir un département" />
                            </SelectTrigger>
                            <SelectContent>
                                {departement.map((dpt) => (
                                    <SelectItem key={dpt.id} value={dpt.id.toString()}>
                                        {dpt.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.departement} className="mt-2" />
                    </div>

                    <div className="space-y-2 min-w-[300px]">
                        <Label htmlFor={`${id}-classe`}>Classe</Label>
                        <Select value={data.niveaux} onValueChange={(val) => setData('niveaux', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir une classe" />
                            </SelectTrigger>
                            <SelectContent>
                                {niveau.map((nv) => (
                                    <SelectItem key={nv.id} value={nv.id.toString()}>
                                        {nv.niveau}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError message={errors.niveaux} className="mt-2" />
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
                        <InputError message={errors.contenue} className="mt-2" />
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

export { EditTuto };
