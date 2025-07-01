import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Calendar, X, Check, ChevronDown, ArrowBigLeft } from 'lucide-react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { Evenements } from '@/types';

const badgeOptions = [
    'À venir', 'en cours', 'terminé', 'Important', 'Annulé', 'Reporté',
    'En attente', 'Prévu', 'Confirmé', 'En cours de planification',
    'En cours de préparation', 'En cours de réalisation', 'En cours de suivi'
];

type FormData = {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    badge: string;
    images: File[];
};
interface MessageFlash {
    flash: {
        success: string;
    };
}
interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    evenement: Evenements;
}
const EditEvent = ({ flash }: MessageFlash) => {
        const { evenement } = usePage<CustomPageProps>().props;
    const { data, setData,  processing, errors, reset } = useForm<FormData>({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        badge: '',
        images: []
    });

    const [isDragging, setIsDragging] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [previewImages, setPreviewImages] = useState<{ file: File; preview: string }[]>([]);
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                position: 'top-right',
                duration: 3000,
            });
        }
    }, [flash]);
    useEffect(() => {
        if (evenement) {
            setData({
                title: evenement.title,
                description: evenement.description,
                start_date: evenement.start_date,
                end_date: evenement.end_date,
                badge: evenement.badge,
                images: []
            } as unknown as FormData);
         if (evenement.images && Array.isArray(evenement.images)) {
    setPreviewImages(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        evenement.images.map((img: any) => ({
            file: undefined as unknown as File,
            preview: typeof img === 'string'
                ? (img.startsWith('http') ? img : `/storage/${img}`)
                : (typeof img.url === 'string'
                    ? (img.url.startsWith('http') ? img.url : `/storage/${img.url}`)
                    : '')
        }))
    );
}
        }
    }, [evenement,setData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof FormData, value);
    };

    const handleBadgeSelect = (badge: string) => {
        setData('badge', badge);
        setIsDropdownOpen(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        handleFiles(files);
    };

    const handleFiles = (files: File[]) => {
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length === 0) return;

        const newPreviews = imageFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setPreviewImages(prev => [...prev, ...newPreviews]);
        setData('images', [...data.images, ...imageFiles]);
    };

    const removeImage = (index: number) => {
        const newPreviews = [...previewImages];
        URL.revokeObjectURL(newPreviews[index].preview);
        newPreviews.splice(index, 1);

        const newFiles = [...data.images];
        newFiles.splice(index, 1);

        setPreviewImages(newPreviews);
        setData('images', newFiles);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(route("bde.evenements.update", evenement.id), {
            _method: "put",
            title: data.title,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date,
            badge: data.badge,
            images: data.images,


        }, {
            onSuccess: () => {
                 reset();
                setPreviewImages([]);
                setTimeout(() => {
                    router.get(route('bde.evenements.index'),);
                }, 3000);

            },
            forceFormData: true

        });


    };

    return (
        <>
            <Head title="Créer un événement" />
            <div className='m-5 bg-blue-950 rounded p-2 text-white w-12 flex flex-col'>

                <Link href={route('bde.evenements.index')}><ArrowBigLeft/></Link>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un nouvel événement</h2>

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                            <div className="relative">
                                <input
                                    type="datetime-local"
                                    name="start_date"
                                    value={data.start_date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"

                                />
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                            <div className="relative">
                                <input
                                    type="datetime-local"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                                />
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>}
                        </div>
                    </div>


                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-left"
                        >
                            {data.badge || "Sélectionnez un statut"}
                            <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                        </button>
                        {errors.badge && <p className="mt-1 text-sm text-red-600">{errors.badge}</p>}

                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 max-h-60 overflow-auto"
                            >
                                {badgeOptions.map((badge) => (
                                    <div
                                        key={badge}
                                        onClick={() => handleBadgeSelect(badge)}
                                        className={`px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center ${data.badge === badge ? 'bg-blue-50 text-blue-600' : ''}`}
                                    >
                                        {data.badge === badge && <Check className="h-4 w-4 mr-2" />}
                                        {badge}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => {
                                const input = document.getElementById('file-input');
                                if (input) (input as HTMLInputElement).click();
                            }}
                            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
                        >
                            <div className="flex flex-col items-center justify-center space-y-2">
                                <Upload className="h-10 w-10 text-gray-400" />
                                <p className="text-sm text-gray-600">
                                    {isDragging ? 'Déposez les images ici' : 'Glissez-déposez des images ou cliquez pour sélectionner'}
                                </p>
                                <p className="text-xs text-gray-500">Formats supportés: JPG, PNG, GIF</p>
                            </div>
                            <input
                                id="file-input"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileInput}
                                className="hidden"
                            />
                        </div>
                        {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}


                        {previewImages.length > 0 && (
                            <div className="mt-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {previewImages.map((img, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="relative group rounded-lg overflow-hidden border border-gray-200"
                                        >
                                            <img
                                                src={img.preview}
                                                alt={`Preview ${index}`}
                                                className="w-full h-24 object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeImage(index);
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">{previewImages.length} image(s) sélectionnée(s)</p>
                            </div>
                        )}
                    </div>


                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-70"
                    >
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </motion.button>
                </form>
            </motion.div>
        </>
    );
};

export default EditEvent;
