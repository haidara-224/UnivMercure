import { motion } from "framer-motion";
import { ChevronRight, Clock, MessageSquare, ThumbsUp, User } from "lucide-react";
import RoleBadge from "./BadgeRole";
import { Topic } from "@/types";
import { Link } from "@inertiajs/react";

const TopicPreview = ({ topic }: { topic: Topic }) => {
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
            <span className="text-sm text-gray-600">{topic.author}</span>
            <RoleBadge role={topic.role} />
          </div>
        </div>

        <div className="flex space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>{topic.replies}</span>
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
          <span>{topic.lastActivity}</span>
        </div>
        <Link href="/forum/details" className="text-blue-600 hover:text-blue-800 flex items-center">
          Voir le sujet <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </motion.article>
  );
};
export default TopicPreview
