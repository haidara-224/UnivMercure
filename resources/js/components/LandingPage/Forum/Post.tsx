import { motion } from "framer-motion";
import { Flag, MessageSquare, ThumbsUp, User } from "lucide-react";

import { Postforums,  } from "@/types";

import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
const Post = ({ post }: { post: Postforums }) => {
     const formatDate = (dateString: string | Date) => {
            const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
            return formatDistanceToNow(date, {
                addSuffix: true,
                locale: fr
            });
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

            <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
          </div>

          <div className="mt-2 text-gray-700">
            {post.content}
          </div>

          <div className="flex space-x-4 mt-3">
            <button className="flex items-center text-gray-500 hover:text-blue-600">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>J'aime ({post.total_likes})</span>
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
export {Post}
