import { useState, useRef, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/input-error";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    EmojiPicker,
    EmojiPickerSearch,
    EmojiPickerContent,
    EmojiPickerFooter
} from "@/components/ui/emoji-picker";
import { SmilePlus } from "lucide-react";

interface FormData {
    title: string;
    description: string;
    emoji?: string;
    [key: string]: string | undefined;
}

export function AddCategoryForum() {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        title: '',
        description: '',
        emoji: ''
    });

    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.categoryForum.store"), {
            onSuccess: () => {
                reset();
                setIsDialogOpen(false);
            },
        });
    };

    const handleEmojiSelect = (emoji: string) => {
        setData('emoji', emoji);
        setIsEmojiPickerOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
            setIsEmojiPickerOpen(false);
        }
    };

    useEffect(() => {
        if (isEmojiPickerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEmojiPickerOpen]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="m-6">
                    Ajouter une catégorie
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
                    <DialogDescription>
                        Remplissez les champs pour ajouter une nouvelle catégorie au forum
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2 relative">
                        <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 min-w-[60px] h-10 justify-center">
                            {data.emoji ? (
                                <span className="text-2xl">{data.emoji}</span>
                            ) : (
                                <span className="text-gray-400 text-sm">Emoji</span>
                            )}
                        </div>

                        <Input
                            id="title"
                            placeholder="Titre de la catégorie"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            className="flex-1"
                        />

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEmojiPickerOpen(!isEmojiPickerOpen);
                            }}
                        >
                            <SmilePlus className="h-4 w-4" />
                        </Button>

                        <AnimatePresence>
                            {isEmojiPickerOpen && (
                                <motion.div
                                    ref={emojiPickerRef}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-12 z-50 w-[350px] bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <EmojiPicker
                                        className="h-[342px]"
                                        onEmojiSelect={(emojiObj) => {
                                            handleEmojiSelect(emojiObj.emoji);
                                        }}
                                    >
                                        <EmojiPickerSearch />
                                        <EmojiPickerContent
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <EmojiPickerFooter />
                                    </EmojiPicker>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <InputError message={errors.title} />
                         <InputError message={errors.emoji} />

                    <Textarea
                        id="description"
                        placeholder="Description (optionnelle)"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        rows={3}
                    />
                    <InputError message={errors.description} />

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || !data.title.trim()}
                        >
                            {processing ? "Enregistrement..." : "Sauvegarder"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
