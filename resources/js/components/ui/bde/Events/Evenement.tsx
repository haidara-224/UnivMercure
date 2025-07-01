import { motion } from "framer-motion";
import { Calendar, Clock, Image as ImageIcon, Edit, Trash2, Plus, ChevronLeft, ChevronRight, Filter, Search, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Evenements } from "@/types";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useForm } from "@inertiajs/react";

interface EvenementProps {
    evenements: Evenements[];
}

export default function Evenement({ evenements }: EvenementProps) {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBadge, setSelectedBadge] = useState<string>('Tous');
    const [currentPage, setCurrentPage] = useState(1);
    const { delete: destroy,  } = useForm({});
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
            <div className="relative group">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {images.map((image, index) => (
                            <div className="flex-[0_0_100%] min-w-0" key={index}>
                                <img
                                    src={`/storage/${image.url}`}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {images.length > 1 && (
                    <>
                        <button
                            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => emblaApi?.scrollPrev()}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => emblaApi?.scrollNext()}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
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
    const handleDelete = (id: number) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
            destroy(route('bde.evenements.delete', id), {
                preserveScroll: true,

            });
         }
    }
    return (
        <div className="container mx-auto px-4 py-8">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-gray-900 dark:text-white"
                >
                    Gestion des Événements
                </motion.h1>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Rechercher..."
                            className="pl-10"
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
                        <SelectTrigger className="w-full md:w-40">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                <SelectValue placeholder="Filtrer" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {badgeOptions.map((badge) => (
                                <SelectItem key={badge} value={badge}>
                                    {badge}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Link href="/bde/evenements/create" className="cursor-pointer">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Créer un événement
                        </Button>
                    </Link>

                </div>
            </div>
            {filteredEvents.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 rounded-lg border border-dashed border-gray-200 dark:border-gray-700"
                >
                    <p className="text-gray-500">Aucun événement trouvé</p>
                    <Link href="/bde/evenements/create" className="cursor-pointer mt-5">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Créer un événement
                        </Button>
                    </Link>
                </motion.div>
            ) : (
                <>
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {paginatedEvents.map((event) => (
                            <motion.div key={event.id} variants={item} whileHover={{ y: -5 }}>
                                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800 overflow-hidden">
                                    <div className="relative">
                                        {event.images.length > 0 ? (
                                            <ImageCarousel images={event.images} />
                                        ) : (
                                            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-lg flex items-center justify-center">
                                                <ImageIcon className="h-12 w-12 text-gray-400" />
                                            </div>
                                        )}
                                        <Badge className="absolute top-2 left-2">
                                            {event.badge}
                                        </Badge>
                                    </div>

                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold">
                                            {event.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                            {event.description}
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-2">
                                                <Calendar className="h-4 w-4 mt-0.5 text-gray-500" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Date</p>
                                                    <p>
                                                        {formatDate(event.start_date)} - {formatDate(event.end_date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Clock className="h-4 w-4 mt-0.5 text-gray-500" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Heure</p>
                                                    <p>
                                                        {formatTime(event.start_date)} - {formatTime(event.end_date)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800">
                                      <Link href={`/bde/evenements/${event.id}/edit`} className="cursor-pointer">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Edit className="h-4 w-4 text-gray-600" />
                                                Modifier
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" className="gap-2" onClick={() => {handleDelete(event.id)}}>
                                            <Trash2 className="h-4 w-4 text-white" />
                                            Supprimer
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>

                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-8">
                            <div className="text-sm text-gray-500">
                                Affichage de {(currentPage - 1) * itemsPerPage + 1} à{' '}
                                {Math.min(currentPage * itemsPerPage, filteredEvents.length)} sur{' '}
                                {filteredEvents.length} événements
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <div className="flex items-center px-4">
                                    Page {currentPage} sur {totalPages}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
