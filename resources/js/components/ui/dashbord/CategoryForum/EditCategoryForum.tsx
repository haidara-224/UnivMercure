import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../dialog";
import { Label } from "../../label";
import { Button } from "../../button";
import { Input } from "../../input";
import InputError from "@/components/input-error";
import { CategorySuject } from "@/types";
import { Textarea } from "../../textarea";

interface EditDialogueAnneesProps {
    open: boolean;
    onClose: () => void;
    categoryForum: CategorySuject | null;

}

const EditDialogueForumCategory: React.FC<EditDialogueAnneesProps> = ({ open, onClose, categoryForum }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: categoryForum?.title || '',
        description: categoryForum?.description || '',

    });



    useEffect(() => {
        if (categoryForum) {
            setData({
                title: categoryForum.title ?? '',
                description: categoryForum.description ?? ''
            });
        }
    }, [categoryForum, setData]);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryForum) {
            put(route('dashboard.categoryForum.update', categoryForum.id), {
                onSuccess: () => {

                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle>Modifier la Categorie</DialogTitle>
                    <DialogDescription>{categoryForum?.title}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="titre">Titre</Label>
                            <Input
                                id="title"
                                name="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                type="text"
                                className="w-full"
                                placeholder="Ex: 2023-2024"
                            />
                          <InputError message={errors.title} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Ajouter Une Description (Champs Pas Obligatoire)"
                                aria-label="description"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={processing}>
                            {processing ? 'En cours...' : 'Sauvegarder'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialogueForumCategory;
