import React, { useEffect, useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../dialog";
import { Label } from "../../label";
import { Button } from "../../button";
import { Input } from "../../input";
import InputError from "@/components/input-error";
import { CategorySuject } from "@/types";
import { Textarea } from "../../textarea";
import { SmilePlus } from "lucide-react";
import {
    EmojiPicker,
    EmojiPickerSearch,
    EmojiPickerContent,
    EmojiPickerFooter
} from "@/components/ui/emoji-picker";

interface EditDialogueAnneesProps {
    open: boolean;
    onClose: () => void;
    categoryForum: CategorySuject | null;
}

const EditDialogueForumCategory: React.FC<EditDialogueAnneesProps> = ({ open, onClose, categoryForum }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: categoryForum?.title || '',
        description: categoryForum?.description || '',
        emoji: categoryForum?.emoji || ''
    });

    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (categoryForum) {
            setData({
                title: categoryForum.title ?? '',
                description: categoryForum.description ?? '',
                emoji: categoryForum.emoji ?? ''
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
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEmojiPickerOpen]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md w-full">
                <DialogHeader>
                    <DialogTitle>Modifier la Catégorie</DialogTitle>
                    <DialogDescription>{categoryForum?.title}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Titre</Label>
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
                                    name="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    type="text"
                                    className="flex-1"
                                    placeholder="Nom de la catégorie"
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
                                                onEmojiSelect={(emojiObj) => handleEmojiSelect(emojiObj.emoji)}
                                            >
                                                <EmojiPickerSearch />
                                                <EmojiPickerContent onClick={(e) => e.stopPropagation()} />
                                                <EmojiPickerFooter />
                                            </EmojiPicker>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <InputError message={errors.title} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Description (optionnelle)"
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                rows={3}
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600"
                            disabled={processing}
                        >
                            {processing ? 'En cours...' : 'Sauvegarder'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditDialogueForumCategory;
