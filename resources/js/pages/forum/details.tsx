import RoleBadge from "@/components/LandingPage/Forum/BadgeRole";
import { Post } from "@/components/LandingPage/Forum/Post";
import { ReplyForm } from "@/components/LandingPage/Forum/ReplyMessage";
import NavBar from "@/components/LandingPage/NavBar";
import { PostType } from "@/types";
import { motion } from "framer-motion";
import { Flag, ThumbsUp, User } from "lucide-react";

export default function TopicDetailPage () {
  const topic: {
    id: number;
    title: string;
    author: string;
    role: 'student' | 'teacher' | 'admin';
    category: string;
    content: string;
    date: string;
    likes: number;
    replies: PostType[];
  } = {
    id: 1,
    title: 'Projet de fin d\'études en IA',
    author: 'Jean Dupont',
    role: 'student',
    category: 'informatique',
    content: 'Je cherche des conseils pour mon projet de fin d\'études sur l\'application de l\'IA en médecine. Plus précisément, je travaille sur un système de diagnostic assisté par ordinateur. Si quelqu\'un a des ressources ou des conseils à partager, je suis preneur !',
    date: 'Publié le 15 mars 2023',
    likes: 8,
    replies: [
      {
        id: 1,
        author: 'Prof. Martin',
        role: 'teacher',
        content: 'Je vous recommande de consulter les travaux récents de l\'équipe du Pr. Dupuis à Polytechnique. Ils ont publié des résultats intéressants dans ce domaine l\'année dernière.',
        date: 'Il y a 2 jours',
        likes: 3
      },
      // Plus de réponses...
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête du sujet */}
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
                  <h1 className="text-2xl font-bold text-blue-900 mr-2">{topic.title}</h1>
                  <RoleBadge role={topic.role} />
                </div>

                <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
                  <span>Par {topic.author}</span>
                  <span>•</span>
                  <span>{topic.date}</span>
                </div>

                <div className="mt-4 text-gray-700">
                  {topic.content}
                </div>

                <div className="flex space-x-4 mt-6">
                  <button className="flex items-center text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="w-5 h-5 mr-1" />
                    <span>J'aime ({topic.likes})</span>
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-red-600">
                    <Flag className="w-5 h-5 mr-1" />
                    <span>Signaler</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Réponses */}
          <motion.section
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              {topic.replies.length} {topic.replies.length === 1 ? 'Réponse' : 'Réponses'}
            </h2>

            <div className="space-y-4">
              {topic.replies.map(reply => (
                <Post key={reply.id} post={reply} />
              ))}
            </div>
          </motion.section>

          {/* Formulaire de réponse */}
          <ReplyForm />
        </div>
      </main>
    </div>
  );
};


