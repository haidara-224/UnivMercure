import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CalendarDays, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Evenements, } from "@/types";
import Autoplay from 'embla-carousel-autoplay';
import { Link } from '@inertiajs/react';

interface EventProp {
    events: Evenements[];
}

const NewsEventCard = ({ events }: EventProp) => {
    return (
        <section className="py-16 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        Actualités & Événements
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Restez informé des dernières nouvelles et événements de notre université
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link href='activity'>
                    <Button variant="ghost" className="text-amber-600 dark:text-amber-400">
                        Voir toutes les actualités
                        <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

const EventCard = ({ event }: { event: Evenements }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false })
    ]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const hasImages = event.images?.length > 0;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-900"
        >
            <div className="relative h-56">
                {hasImages ? (
                    <>
                        <div className="embla h-full" ref={emblaRef}>
                            <div className="embla__container h-full flex">
                                {event.images.map((image, index) => (
                                    <div className="embla__slide flex-[0_0_100%] min-w-0" key={index}>
                                        <img
                                            src={image.url.startsWith('http') ? image.url : `/storage/${image.url}`}
                                            alt={`${event.title} - Image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/placeholder-event.jpg';
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {event.images.length > 1 && (
                            <>
                                <button
                                    onClick={scrollPrev}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all"
                                    aria-label="Image précédente"
                                >
                                    <ChevronLeft className="h-5 w-5 text-gray-800 dark:text-white" />
                                </button>
                                <button
                                    onClick={scrollNext}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all"
                                    aria-label="Image suivante"
                                >
                                    <ChevronRight className="h-5 w-5 text-gray-800 dark:text-white" />
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <span className="text-gray-400">Aucune image</span>
                    </div>
                )}
            </div>


            <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                    <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(event.start_date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </span>
                    {event.badge && (
                        <Badge variant="secondary" className="ml-auto">
                            {event.badge}
                        </Badge>
                    )}
                </div>

                <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {event.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {event.description}
                </p>
                    <Link href={`/activity/${event.id}`}>
                    <Button variant="outline" className="w-full">
                        En savoir plus
                    </Button>
                    </Link>
            </div>
        </motion.div>
    );
};

export default NewsEventCard;
