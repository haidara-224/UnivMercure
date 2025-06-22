import { motion } from "framer-motion";
import {  ChevronRight, Clock, MessageSquare, ThumbsUp, User } from "lucide-react";
import { Suject } from "@/types";
import { Link } from "@inertiajs/react";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface propsTopic {
    topic: Suject,
    nbPost: number
}

const TopicPreview = ({ topic, nbPost }: propsTopic) => {
    const formatDate = (dateString: string | Date) => {
        const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
        return formatDistanceToNow(date, {
            addSuffix: true,
            locale: fr
        });
    };

    return (
        <motion.article
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">{topic.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{topic.user.name}</span>

                    </div>
                </div>

                <div className="flex space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{nbPost}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{topic.likes}</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-3 text-sm">
                <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(topic.created_at)}</span>
                </div>
                <Link
                    href={`/forum/details/${topic.id}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                    Voir le sujet <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </motion.article>
    );
};

export default TopicPreview;
