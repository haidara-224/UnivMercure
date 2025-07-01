import { motion } from "framer-motion";
import { Calendar, Clock, Image as ImageIcon, ChevronLeft, ChevronRight, Filter, Search, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Evenements } from "@/types";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Head, Link } from "@inertiajs/react";
import { Headers } from "@/components/LandingPage/headersl";

interface EvenementProps {
    evenements: Evenements[];
}

export default function Evenement({ evenements }: EvenementProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBadge, setSelectedBadge] = useState<string>('Tous');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("fr-FR", {
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

    const filteredEvents = evenements.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBadge = selectedBadge === 'Tous' || event.badge === selectedBadge;
        return matchesSearch && matchesBadge;
    });

    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const badgeOptions = ['Tous', ...new Set(evenements.map(event => event.badge))];

    const ImageCarousel = ({ images }: { images: { url: string }[] }) => {
        const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
        const [selectedIndex, setSelectedIndex] = useState(0);
        const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

        const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

        const onSelect = useCallback(() => {
            if (!emblaApi) return;
            setSelectedIndex(emblaApi.selectedScrollSnap());
        }, [emblaApi]);

        useEffect(() => {
            if (!emblaApi) return;
            onSelect();
            setScrollSnaps(emblaApi.scrollSnapList());
            emblaApi.on("select", onSelect);
            return () => {
                emblaApi.off("select", onSelect);
            };
        }, [emblaApi, onSelect]);

        return (
            <div className="relative group rounded-t-lg overflow-hidden">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {images.map((image, index) => (
                            <div className="flex-[0_0_100%] min-w-0" key={index}>
                                <img
                                    src={`/storage/${image.url}`}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                            onClick={() => emblaApi?.scrollPrev()}
                        >
                            <ChevronLeft className="h-4 w-4 text-gray-800" />
                        </button>
                        <button
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                            onClick={() => emblaApi?.scrollNext()}
                        >
                            <ChevronRight className="h-4 w-4 text-gray-800" />
                        </button>

                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <>
            <Head title="Evenement - Université Mercure International">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />
                <meta name="description" content="Découvrez les événements de l'Université Mercure International, une institution dédiée à l'excellence académique et à l'innovation." />
            </Head>
            <Headers />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-30 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                            Nos Événements
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Découvrez les activités passionnantes de notre communauté
                        </p>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8"
                    >
                        <div className="flex flex-col md:flex-row gap-3 items-center">
                            <div className="relative flex-grow w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Rechercher un événement..."
                                    className="pl-10 h-11 text-base"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>

                            <Select
                                value={selectedBadge}
                                onValueChange={(value) => {
                                    setSelectedBadge(value);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="h-11 w-full md:w-40 text-base">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        <SelectValue placeholder="Filtrer" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="text-base">
                                    {badgeOptions.map((badge) => (
                                        <SelectItem key={badge} value={badge} className="text-base">
                                            {badge}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </motion.div>

                    {/* Events Grid */}
                    {filteredEvents.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        >
                            <div className="text-4xl mb-3">😕</div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Aucun événement trouvé
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Essayez de modifier vos critères de recherche
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {paginatedEvents.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        variants={item}
                                        whileHover={{ y: -5 }}
                                        className="transition-all duration-300"
                                    >
                                        <Card className="h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                                            {event.images.length > 0 ? (
                                                <ImageCarousel images={event.images} />
                                            ) : (
                                                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                                    <ImageIcon className="h-12 w-12 text-blue-300 dark:text-gray-600" />
                                                </div>
                                            )}

                                            <Badge className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-600">
                                                {event.badge}
                                            </Badge>

                                            <CardHeader className="pb-2 px-4 pt-4">
                                                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                                                    {event.title}
                                                </CardTitle>
                                            </CardHeader>

                                            <CardContent className="flex-grow px-4 py-2">
                                                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                                                    {event.description}
                                                </p>

                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-2">
                                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-md">
                                                            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Date</p>
                                                            <p className="text-sm font-medium">
                                                                {formatDate(event.start_date)} {event.start_date !== event.end_date && `- ${formatDate(event.end_date)}`}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-2">
                                                        <div className="bg-purple-100 dark:bg-purple-900/30 p-1.5 rounded-md">
                                                            <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Heure</p>
                                                            <p className="text-sm font-medium">
                                                                {formatTime(event.start_date)} - {formatTime(event.end_date)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>

                                            <CardFooter className="px-4 pb-4 pt-2">
                                                <Button className="w-full h-10 text-sm" asChild>
                                                    <Link href={`/activity/${event.id}`}>
                                                        Voir les détails
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>


                            {totalPages > 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-3"
                                >
                                    <div className="text-sm text-gray-600 dark:text-gray-300">
                                        Affichage <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredEvents.length)}</span> sur <span className="font-medium">{filteredEvents.length}</span> événements
                                    </div>

                                    <div className="flex gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(1)}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10"
                                        >
                                            <ChevronsLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-10 h-10"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>

                                        <div className="flex items-center px-3 text-sm font-medium">
                                            Page {currentPage} sur {totalPages}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage(totalPages)}
                                            disabled={currentPage === totalPages}
                                            className="w-10 h-10"
                                        >
                                            <ChevronsRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
