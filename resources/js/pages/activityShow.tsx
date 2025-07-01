
import { Evenements } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Calendar, Clock, Users, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
interface PageProps {
    [key: string]: unknown;
}
interface PageProps {
    evenement: Evenements;
}

export default function ActivityShow() {
    const { evenement } = usePage<PageProps>().props;

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("fr-FR", {
            weekday: 'long',
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <>

            <Head title="Événements - Université Mercure International" >
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />

                <meta name="description" content="Découvrez les événements passionnants de l'Université Mercure International." />
            </Head>
            <div className="min-h-screen bg-gray-50">

                <div className="relative h-80 md:h-96 w-full overflow-hidden">
                    {evenement.images.length > 0 ? (
                        <img
                            src={`/storage/${evenement.images[0].url}`}
                            alt={evenement.title}
                            className="w-full h-full object-cover object-center"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-white" />
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 sm:px-6 pb-8">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="max-w-3xl">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="mb-4 text-white hover:text-white hover:bg-white/10"
                                >
                                    <Link href="/activity">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Retour aux événements
                                    </Link>
                                </Button>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                                        {evenement.badge}
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {evenement.title}
                                </h1>

                                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm md:text-base">
                                    <div className="flex items-center text-white/90">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>
                                            {formatDate(evenement.start_date)}
                                            {evenement.start_date !== evenement.end_date && ` → ${formatDate(evenement.end_date)}`}
                                        </span>
                                    </div>

                                    <div className="flex items-center text-white/90">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span>
                                            {formatTime(evenement.start_date)} - {formatTime(evenement.end_date)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>


                <div className="container mx-auto px-4 sm:px-6 py-12 -mt-10">
                    <motion.div
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="grid md:grid-cols-3 gap-0 md:gap-8">

                            <div className="md:col-span-2 p-6 md:p-8">
                                <div className="prose max-w-none">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Description</h2>
                                    <p className="text-gray-600 mb-6 whitespace-pre-line">
                                        {evenement.description}
                                    </p>
                                </div>


                                {evenement.images.length > 1 && (
                                    <div className="mt-8">
                                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Galerie</h2>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {evenement.images.map((image, index) => (
                                                <motion.div
                                                    key={index}
                                                    whileHover={{ scale: 1.03 }}
                                                    className="aspect-square overflow-hidden rounded-lg shadow-sm border border-gray-100"
                                                >
                                                    <img
                                                        src={`/storage/${image.url}`}
                                                        alt={`${evenement.title} - Image ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>


                            <div className="bg-gray-50 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200">
                                <div className="sticky top-6 space-y-6">

                                    <Button className="w-full py-5 text-base font-medium bg-amber-500 hover:bg-amber-600">
                                        Participer à cet événement
                                    </Button>


                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b">Détails</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-amber-100 p-2 rounded-lg">
                                                    <Calendar className="h-5 w-5 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Date</p>
                                                    <p className="text-gray-700 font-medium">
                                                        {formatDate(evenement.start_date)}
                                                        {evenement.start_date !== evenement.end_date && (
                                                            <span className="block text-sm mt-1">
                                                                jusqu'au {formatDate(evenement.end_date)}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="bg-amber-100 p-2 rounded-lg">
                                                    <Clock className="h-5 w-5 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Horaire</p>
                                                    <p className="text-gray-700 font-medium">
                                                        {formatTime(evenement.start_date)} - {formatTime(evenement.end_date)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="bg-amber-100 p-2 rounded-lg">
                                                    <Users className="h-5 w-5 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Type d'événement</p>
                                                    <p className="text-gray-700 font-medium capitalize">
                                                        {evenement.badge.toLowerCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <h3 className="text-lg font-semibold text-gray-800 pb-2 border-b">Partager</h3>
                                        <div className="flex gap-4 mt-3 justify-center">
                                            <button
                                                onClick={() => window.open(
                                                    `https://api.whatsapp.com/send?text=${encodeURIComponent(evenement.title)}%0A${encodeURIComponent(window.location.href)}`,
                                                    '_blank',
                                                    'width=600,height=400'
                                                )}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-green-100 text-green-600 hover:text-green-700 transition-colors"
                                                aria-label="Partager sur WhatsApp"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => window.open(
                                                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                                                    '_blank',
                                                    'width=600,height=400'
                                                )}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors"
                                                aria-label="Partager sur Facebook"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                                </svg>
                                            </button>


                                            <button
                                                onClick={() => {
                                                    const text = `Découvrez "${evenement.title}" à l'Université Mercure International`;
                                                    window.open(
                                                        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
                                                        '_blank',
                                                        'width=600,height=400'
                                                    );
                                                }}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-blue-400 hover:text-blue-500 transition-colors"
                                                aria-label="Partager sur Twitter"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </button>


                                            <button
                                                onClick={() => window.open(
                                                    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(evenement.title)}&summary=${encodeURIComponent(evenement.description.substring(0, 200))}`,
                                                    '_blank',
                                                    'width=600,height=400'
                                                )}
                                                className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors"
                                                aria-label="Partager sur LinkedIn"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
