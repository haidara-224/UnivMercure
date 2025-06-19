import TopicPreview from '@/components/LandingPage/Forum/TopicPreview';
import NavBar from '@/components/LandingPage/NavBar';
import { Topic } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, MessageSquarePlus, ChevronDown, Cpu, HeartPulse, Scale, Megaphone, ClipboardList, Users } from 'lucide-react';
import { useState } from 'react';

export default function ForumPage() {

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Données fictives
    const categories = [
        { id: 'informatique', name: 'Informatique', icon: <Cpu className="w-5 h-5" /> },
        { id: 'medecine', name: 'Médecine', icon: <HeartPulse className="w-5 h-5" /> },
        { id: 'droit', name: 'Droit', icon: <Scale className="w-5 h-5" /> },
        { id: 'announcements', name: 'Annonces', icon: <Megaphone className="w-5 h-5" /> },
        { id: 'exams', name: 'Examens', icon: <ClipboardList className="w-5 h-5" /> },
        { id: 'student-life', name: 'Vie étudiante', icon: <Users className="w-5 h-5" /> },
    ];

    const topics: Topic[] = [
        {
            id: 1,
            title: 'Projet de fin d\'études en IA',
            author: 'Jean Dupont',
            role: 'student',
            category: 'informatique',
            replies: 12,
            likes: 8,
            lastActivity: 'Il y a 2 heures',
            content: 'Je cherche des conseils pour mon projet de fin d\'études sur l\'application de l\'IA en médecine...'
        },
        // Plus de sujets...
    ];

    const filteredTopics = topics.filter(topic => {
        const matchesCategory = !activeCategory || topic.category === activeCategory;
        const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Head>
                <title>Forum</title>
                <meta name="description" content="Forum de l'université Mercure International" />
            </Head>
            <div className="min-h-screen bg-gray-50">
                <NavBar />

                <main className="container mx-auto px-4 py-8">
                    {/* Section de recherche et création */}
                    <section className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="relative flex-1 max-w-2xl">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher des sujets..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <motion.button
                                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <MessageSquarePlus className="w-5 h-5 mr-2" />
                                Nouveau sujet
                            </motion.button>
                        </div>
                    </section>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <aside className="lg:w-1/4">
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="font-semibold text-lg text-blue-900 mb-4 flex items-center">
                                    <ChevronDown className="w-5 h-5 mr-2" />
                                    Catégories
                                </h2>

                                <ul className="space-y-2">
                                    {categories.map(category => (
                                        <li key={category.id}>
                                            <button
                                                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                                                className={`w-full text-left px-3 py-2 rounded flex items-center ${activeCategory === category.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                                            >
                                                <span className="mr-2">{category.icon}</span>
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </aside>

                        <div className="lg:w-3/4">
                            <motion.div
                                className="bg-white p-4 rounded-lg shadow mb-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h1 className="text-2xl font-bold text-blue-900">
                                    {activeCategory
                                        ? categories.find(c => c.id === activeCategory)?.name
                                        : 'Tous les sujets'}
                                </h1>
                                <p className="text-gray-600">
                                    {filteredTopics.length} {filteredTopics.length === 1 ? 'sujet trouvé' : 'sujets trouvés'}
                                </p>
                            </motion.div>


                            {filteredTopics.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredTopics.map(topic => (
                                        <TopicPreview key={topic.id} topic={topic} />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    className="bg-white p-8 rounded-lg shadow text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <h3 className="text-lg font-medium text-gray-700">Aucun sujet trouvé</h3>
                                    <p className="text-gray-500 mt-2">
                                        {searchQuery
                                            ? 'Essayez avec d\'autres termes de recherche'
                                            : 'Soyez le premier à créer un sujet dans cette catégorie'}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>

    );
};


