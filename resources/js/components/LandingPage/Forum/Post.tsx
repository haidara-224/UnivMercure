import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Flag, MessageSquare, ThumbsUp, User, Trash2 } from "lucide-react";
import { Postforums, RepliesPost, SharedData } from "@/types";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import RoleBadge from "./BadgeRole";

const Post = ({ post }: { post: Postforums}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { auth, } = usePage<SharedData>().props;
    const [localLikeStatus, setLocalLikeStatus] = useState({
        liked: !!post.liked_by_auth,
        count: post.total_likes
    });
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [replies, setReplies] = useState<RepliesPost[]>(post.replieposts || []);
    const [nestedReplyStates, setNestedReplyStates] = useState<Record<number, boolean>>({});
    const [collapsedReplies, setCollapsedReplies] = useState<Record<number, boolean>>({});

    const formatDate = (dateString: string | Date) => {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return formatDistanceToNow(date, {
            addSuffix: true,
            locale: fr
        });
    };

    const toggleCollapseReply = (replyId: number) => {
        setCollapsedReplies(prev => ({
            ...prev,
            [replyId]: !prev[replyId]
        }));
    };

    const handleLike = async (id: number) => {
        if (isLoading) return;
        setIsLoading(true);

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
            console.log(error);
            setLocalLikeStatus({
                liked: wasLiked,
                count: localLikeStatus.count
            });
            setIsLoading(false);
        }
    };

    const handleDeletePost = () => {
        if (confirm("Voulez-vous vraiment supprimer ce post ?")) {
            router.delete(`/forum/details/${post.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Gérer la suppression dans l'UI si nécessaire
                }
            });
        }
    };

    const handleDeleteReply = (replyId: number) => {
        if (confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
            router.delete(`/forum/replies/${replyId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Mise à jour optimiste
                    const deleteReply = (repliesList: RepliesPost[]): RepliesPost[] => {
                        return repliesList
                            .filter(reply => reply.id !== replyId)
                            .map(reply => ({
                                ...reply,
                                replies: reply.replies ? deleteReply(reply.replies) : []
                            }));
                    };
                    setReplies(deleteReply(replies));
                }
            });
        }
    };

    const handleReplySubmit = (parentId: number, isNestedReply = false, replyToId?: number) => {
        if (!replyContent.trim()) return;

        const payload = {
            content: replyContent,
            postforum_id: parentId,
            parent_id: isNestedReply ? replyToId : null
        };

        router.post('/forum/replies', payload, {
            preserveScroll: true,
            onSuccess: () => {
                setReplyContent("");
                if (!isNestedReply) {
                    setShowReplyForm(false);
                } else if (replyToId) {
                    setNestedReplyStates(prev => ({ ...prev, [replyToId]: false }));
                }

                const newReply: RepliesPost = {
                    id: Date.now(),
                    postforum_id: parentId,
                    postforum: post,
                    user_id: auth.user.id,
                    user: { ...post.user, name: "Vous" },
                    parent_id: isNestedReply ? replyToId : null,
                    parent: {} as RepliesPost,
                    replies: [],
                    content: replyContent,
                    created_at: new Date(),
                    updated_at: new Date()
                };

                if (isNestedReply && replyToId) {
                    const updateReplies = (repliesList: RepliesPost[]): RepliesPost[] => {
                        return repliesList.map(reply => {
                            if (reply.id === replyToId) {
                                return {
                                    ...reply,
                                    replies: [...(reply.replies || []), newReply]
                                };
                            }
                            if (reply.replies?.length) {
                                return {
                                    ...reply,
                                    replies: updateReplies(reply.replies)
                                };
                            }
                            return reply;
                        });
                    };
                    setReplies(updateReplies(replies));
                } else {
                    setReplies([...replies, newReply]);
                }
            }
        });
    };

    const toggleNestedReplyForm = (replyId: number) => {
        setNestedReplyStates(prev => ({
            ...prev,
            [replyId]: !prev[replyId]
        }));
    };

    const renderReplies = (replyList: RepliesPost[], depth = 0) => {
        return replyList.map((reply) => {
            const isCollapsed = collapsedReplies[reply.id];
            const hasReplies = reply.replies && reply.replies.length > 0;
            const showReplies = hasReplies && !isCollapsed;
            const isAuthor = reply.user_id === auth.user.id;





            return (
                <motion.div
                    key={reply.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`mt-3 pl-${Math.min(depth * 4, 12)}`}
                    style={{ marginLeft: `${Math.min(depth * 2, 6)}rem` }}
                >
                    <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                            <User className="w-5 h-5 text-blue-800" />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-blue-900 text-sm">{reply.user.name}</h4>

                                    <span className="text-xs text-gray-500">{formatDate(reply.created_at)}</span>
                                </div>
                                {isAuthor && (
                                    <button
                                        onClick={() => handleDeleteReply(reply.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        title="Supprimer ce commentaire"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="mt-1 text-gray-700 text-sm">
                                {reply.content}
                            </div>

                            <div className="flex space-x-3 mt-2">
                                <button
                                    onClick={() => toggleNestedReplyForm(reply.id)}
                                    className="flex items-center text-gray-500 hover:text-blue-600 text-xs"
                                >
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    <span>Répondre</span>
                                </button>

                                {hasReplies && (
                                    <button
                                        onClick={() => toggleCollapseReply(reply.id)}
                                        className="flex items-center text-gray-500 hover:text-blue-600 text-xs"
                                    >
                                        {isCollapsed ? (
                                            <>
                                                <ChevronDown className="w-3 h-3 mr-1" />
                                                <span>Afficher les réponses ({reply.replies?.length})</span>
                                            </>
                                        ) : (
                                            <>
                                                <ChevronUp className="w-3 h-3 mr-1" />
                                                <span>Masquer les réponses</span>
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                            {nestedReplyStates[reply.id] && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-2"
                                >
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded text-sm"
                                        rows={2}
                                        placeholder="Votre réponse..."
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                    />
                                    <div className="flex justify-end space-x-2 mt-1">
                                        <button
                                            onClick={() => toggleNestedReplyForm(reply.id)}
                                            className="px-3 py-1 text-sm bg-gray-100 rounded"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={() => handleReplySubmit(post.id, true, reply.id)}
                                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Envoyer
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {showReplies && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-2"
                                >
                                    {renderReplies(reply.replies ?? [], depth + 1)}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            );
        });
    };

    const isPostAuthor = post.user_id === auth.user.id;
    return (
        <motion.article
            className="bg-white p-4 rounded-lg shadow mb-4 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {isPostAuthor && (
                <button
                    onClick={handleDeletePost}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                    title="Supprimer ce post"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            )}

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
                        <button
                            onClick={() => setShowReplyForm(!showReplyForm)}
                            className="flex items-center text-gray-500 hover:text-blue-600"
                        >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            <span>Répondre</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-red-600">
                            <Flag className="w-4 h-4 mr-1" />
                            <span>Signaler</span>
                        </button>
                    </div>

                    {showReplyForm && (
                        <div className="mt-3">
                            <textarea
                                className="w-full p-3 border border-gray-300 rounded"
                                rows={3}
                                placeholder="Écrivez votre réponse..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2 mt-2">
                                <button
                                    onClick={() => setShowReplyForm(false)}
                                    className="px-4 py-2 bg-gray-100 rounded"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    onClick={() => handleReplySubmit(post.id)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    )}

                    {replies.length > 0 && (
                        <div className="mt-4 border-t pt-3">
                            {renderReplies(replies)}
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

export { Post };
