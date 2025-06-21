import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../../input";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/components/input-error";
interface form {
    title: string,
    description: string,
     [key: string]: string | null;

}
function AddCategoryForum() {
    const { data, setData, post, processing, errors, reset } = useForm<form>({
        title: '',
        description:''
    });
    const handleSubmit: FormEventHandler = (e) => {
            e.preventDefault();
            post(route("dashboard.categoryForum.store"), {
                onFinish: () => reset(),
                onSuccess: () => {

                },
            });
        };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="m-6">Ajouter une catégorie</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send us feedback</DialogTitle>
                    <DialogDescription>
                        Ajouter une Catégorie
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <Input id="titre" placeholder="Titre"
                    value={data.title}
                    onChange={(e)=>setData("title",e.target.value )}
                     />
                            <InputError message={errors.title} />
                    <Textarea
                        id="description"
                        placeholder="Ajouter Une Description (Champs Pas Obligatoire)"
                        aria-label="description"
                        value={data.description}
                    onChange={(e)=>setData("description",e.target.value )}
                    />
                    <InputError message={errors.description} />
                    <div className="flex flex-col sm:flex-row sm:justify-end">
                        <Button type="submit" disabled={processing}>
                            {processing ? "Enregistrement..." : "Sauvegarder"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { AddCategoryForum };
