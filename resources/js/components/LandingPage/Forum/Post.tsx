import { motion } from "framer-motion";
import { Flag, MessageSquare, ThumbsUp, User } from "lucide-react";

import { Postforums, } from "@/types";

import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from "react";
import { router } from "@inertiajs/react";
import RoleBadge from "./BadgeRole";

const Post = ({ post }: { post: Postforums }) => {
     const [isLoading, setIsLoading] = useState(false);
    const [localLikeStatus, setLocalLikeStatus] = useState({
        liked: !!post.liked_by_auth,
        count: post.total_likes
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
             router.put(`/forum/details/${id}`, {}, {
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
            className="bg-white p-4 rounded-lg shadow mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                    <User className="w-6 h-6 text-blue-800" />
                </div>

                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-blue-900">{post.user.name}</h4>
                        <RoleBadge role={post.role} />
                        <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
                    </div>

                    <div className="mt-2 text-gray-700">
                        {post.content}
                    </div>

                    <div className="flex space-x-4 mt-3">
                      <button
                        onClick={() => handleLike(post.id)}
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
                        <button className="flex items-center text-gray-500 hover:text-blue-600">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            <span>Répondre</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-red-600">
                            <Flag className="w-4 h-4 mr-1" />
                            <span>Signaler</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};
export { Post }
