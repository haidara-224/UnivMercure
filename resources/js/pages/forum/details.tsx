
import { Post } from "@/components/LandingPage/Forum/Post";
import { ReplyForm } from "@/components/LandingPage/Forum/ReplyMessage";
import NavBar from "@/components/LandingPage/NavBar";
import { Suject } from "@/types";
import { Head,  usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Flag, ThumbsUp, User } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import WelcomeLayout from "@/layouts/WelcomeLayout";
import { useEffect } from "react";
import { toast } from "sonner";


interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    post: Suject
}
interface PageProps {
    flash?: {
        success?: string;
    };
}
export default function TopicDetailPage({ flash }: PageProps) {
    const { post } = usePage<CustomPageProps>().props;

    const formatDate = (dateString: string | Date) => {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return formatDistanceToNow(date, {
            addSuffix: true,
            locale: fr
        });
    };
 useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success)
        }
    }, [flash]);
    return (
        <WelcomeLayout>
            <Head>
                <title>Forum Details</title>
                <meta name="description" content="Forum de l'université Mercure International" />
            </Head>
            <div className="min-h-screen bg-gray-50">
                <NavBar />

                <main className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.section
                            className="bg-white p-6 rounded-lg shadow mb-6"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <User className="w-8 h-8 text-blue-800" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-2">
                                        <h1 className="text-2xl font-bold text-blue-900 mr-2">{post.title}</h1>

                                    </div>

                                    <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
                                        <span>Par {post.user.name}</span>
                                        <span>•</span>
                                        <span>{formatDate(post.created_at)}</span>
                                    </div>

                                    <div className="mt-4 text-gray-700">
                                        {post.comment}
                                    </div>

                                    <div className="flex space-x-4 mt-6">
                                        <button className="flex items-center text-gray-500 hover:text-blue-600">
                                            <ThumbsUp className={`w-5 h-5 mr-1 ${post.liked_by_auth ? 'fill-blue-600 text-blue-600' : 'text-gray-600'
                                                }`} />
                                            <span>J'aime ({post.total_likes})</span>
                                        </button>
                                        <button className="flex items-center text-gray-500 hover:text-red-600">
                                            <Flag className="w-5 h-5 mr-1" />
                                            <span>Signaler</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                        <motion.section
                            className="mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >

                            <h2 className="text-xl font-semibold text-blue-900 mb-4">
                                {post.postforums.length} {post.postforums.length === 1 ? 'Réponse' : 'Réponses'}
                            </h2>

                            <div className="space-y-4">
                                {post.postforums.map(reply => (
                                    <Post key={reply.id} post={reply} />
                                ))}
                            </div>
                        </motion.section>
                        <ReplyForm />
                    </div>
                </main>
            </div>
        </WelcomeLayout>

    );
};


