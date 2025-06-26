import InputError from "@/components/input-error";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategorySuject } from "@/types";
import { useForm } from "@inertiajs/react";
import {  useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import "react-quill-new/dist/quill.snow.css";

import ReactQuill from "react-quill-new";
interface ProposDialogue {
    openDialogue: boolean;
    onOpenChange: (open: boolean) => void;
    catgory: CategorySuject[];
}

interface Form {
    titre: string;
    content: string;
    category: string;
    [key: string]: string | number | number[];
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const dialogVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { y: 50, opacity: 0 }
};

function AddSubject({ openDialogue, onOpenChange, catgory }: ProposDialogue) {

    const { data, setData, post, processing, errors, reset } = useForm<Form>({
        titre: '',
        content: '',
        category: ""
    });

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        post(route('subjects.store'), {
            onSuccess: () => {
                reset();
                onOpenChange(false);
            }
        });
    };
    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ]
    }), []);

    return (
        <AnimatePresence>
            {openDialogue && (
                <Dialog open={openDialogue} onOpenChange={onOpenChange}>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    />

                    <motion.div
                        variants={dialogVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed z-50"
                    >
                        <DialogContent className="w-full max-w-4xl h-[90vh] max-h-[800px] rounded-lg shadow-xl flex flex-col">
                            <DialogHeader>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <DialogTitle className="text-2xl font-bold text-gray-800">
                                        Créer un nouveau sujet
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-600">
                                        Partagez vos idées avec la communauté
                                    </DialogDescription>
                                </motion.div>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                                <div className="space-y-6 py-4 flex-1 overflow-y-auto">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
                                            Titre du sujet
                                        </Label>
                                        <Input
                                            id="titre"
                                            value={data.titre}
                                            onChange={(e) => setData('titre', e.target.value)}
                                            type="text"
                                            placeholder="Donnez un titre clair à votre sujet"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <InputError message={errors.titre} className="mt-1 text-sm text-red-600" />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                                            Catégorie
                                        </Label>
                                        <Select onValueChange={(val) => setData("category", val)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner une Categorie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {catgory.map((c) => (
                                                    <SelectItem key={c.id} value={c.id.toString()}>

                                                        {c.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.category} className="mt-1 text-sm text-red-600" />

                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex-1 flex flex-col"
                                    >
                                        <Label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contenu
                                        </Label>
                                        <div className="flex-1 flex flex-col min-h-[300px]">
                                            <ReactQuill
                                                theme="snow"
                                                value={data.content}
                                                onChange={(value) => setData('content', value)}
                                                modules={modules}
                                                placeholder="Développez votre idée ici..."
                                                className="flex-1 border border-gray-300 rounded-lg overflow-hidden h-auto"
                                            />
                                        </div>
                                        <InputError message={errors.content} className="mt-1 text-sm text-red-600" />
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="pt-4 border-t border-gray-200"
                                >
                                    <motion.button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
                                        disabled={processing}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center">
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="inline-block mr-2"
                                                >
                                                    ⏳
                                                </motion.span>
                                                Publication en cours...
                                            </span>
                                        ) : (
                                            "Publier le sujet"
                                        )}
                                    </motion.button>
                                </motion.div>
                            </form>
                        </DialogContent>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}

export { AddSubject };
