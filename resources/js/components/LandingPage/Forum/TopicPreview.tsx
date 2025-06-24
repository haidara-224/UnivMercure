import { motion } from "framer-motion";
import { ChevronRight, Clock, MessageSquare, ThumbsUp, User } from "lucide-react";
import { Suject } from "@/types";
import { Link, router } from "@inertiajs/react";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import {  useState } from "react";

interface propsTopic {
    topic: Suject;
    nbPost: number;
}

const TopicPreview = ({ topic, nbPost }: propsTopic) => {
    const [isLoading, setIsLoading] = useState(false);
    const [localLikeStatus, setLocalLikeStatus] = useState({
        liked: !!topic.liked_by_auth, // Ensure boolean
        count: topic.total_likes
    });

    const formatDate = (dateString: string | Date) => {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return formatDistanceToNow(date, {
            addSuffix: true,
            locale: fr
        });
    };

    const handleLike = async (id: number) => {
        if (isLoading) return;

        setIsLoading(true);

        // Optimistic UI update
        const wasLiked = localLikeStatus.liked;
        const newCount = wasLiked ? localLikeStatus.count - 1 : localLikeStatus.count + 1;

        setLocalLikeStatus({
            liked: !wasLiked,
            count: newCount
        });

        try {
             router.put(`/forum/${id}`, {}, {
                preserveScroll: true,
                onFinish: () => setIsLoading(false)
            });
        } catch (error) {
            console.log(error)
            setLocalLikeStatus({
                liked: wasLiked,
                count: localLikeStatus.count
            });
            setIsLoading(false);
        }
    };

    return (
        <motion.article
            className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-all border border-gray-100"
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
                        <Link href={`/forum/details/${topic.id}`}>
                            {topic.title}
                        </Link>
                    </h3>
                    <div className="flex space-x-5">
                        <p className="text-gray-300">{topic.categoryforum.title}</p>
                        <p>{topic.categoryforum.emoji}</p>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                        <div className="flex items-center space-x-1">
                            <User className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm truncate">{topic.user.name}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{formatDate(topic.created_at)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-4 text-sm">
                    {/* Nb de commentaires */}
                    <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-full">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-700">{nbPost}</span>
                    </div>

                    {/* Bouton Like */}
                    <button
                        onClick={() => handleLike(topic.id)}
                        disabled={isLoading}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all duration-150 ${
                            localLikeStatus.liked ? 'bg-blue-50' : 'bg-gray-50'
                        } ${isLoading ? 'opacity-75' : 'hover:bg-gray-100'}`}
                    >
                        {isLoading ? (
                            <motion.div
                                className="w-4 h-4"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-3 h-3 border-2 border-gray-400 border-t-blue-500 rounded-full mx-auto" />
                            </motion.div>
                        ) : (
                            <ThumbsUp
                                className={`w-4 h-4 ${
                                    localLikeStatus.liked ? 'fill-blue-600 text-blue-600' : 'text-gray-600'
                                }`}
                            />
                        )}
                        <span
                            className={`font-medium ${
                                localLikeStatus.liked ? 'text-blue-600' : 'text-gray-700'
                            }`}
                        >
                            {localLikeStatus.count}
                        </span>
                    </button>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <Link
                    href={`/forum/details/${topic.id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center group font-medium"
                >
                    Voir le sujet
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </motion.article>
    );
};

export default TopicPreview;
