import TopicPreview from '@/components/LandingPage/Forum/TopicPreview';
import NavBar from '@/components/LandingPage/NavBar';
import { CategorySuject, Suject } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, MessageSquarePlus, ChevronDown, List } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    category: CategorySuject[];
    topics: Suject[];
    nbPost: number;
}

export default function ForumPage() {
    const { category, topics, nbPost } = usePage<CustomPageProps>().props;
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTopics = topics.filter(topic => {
        // Filtre par catégorie
        const matchesCategory = !activeCategory ||
                              (topic.categoryforum &&
                               topic.categoryforum.id.toString() === activeCategory);

        // Filtre par recherche
        const matchesSearch = searchQuery === '' ||
                            (topic.title &&
                             topic.title.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    const handleShowAll = () => {
        setActiveCategory(null);
        setSearchQuery('');
    };

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

                            <div className="flex gap-4">
                                <motion.button
                                    onClick={handleShowAll}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <List className="w-5 h-5 mr-2" />
                                    Tout afficher
                                </motion.button>

                                <motion.button
                                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <MessageSquarePlus className="w-5 h-5 mr-2" />
                                    Nouveau sujet
                                </motion.button>
                            </div>
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
                                    <li>
                                        <button
                                            onClick={handleShowAll}
                                            className={`w-full text-left px-3 py-2 rounded flex items-center ${!activeCategory ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                                        >
                                            <span className="mr-2">📋</span>
                                            Toutes les catégories
                                        </button>
                                    </li>
                                    {category.map(categori => (
                                        <li key={categori.id}>
                                            <button
                                                onClick={() => setActiveCategory(activeCategory === categori.id.toString() ? null : categori.id.toString())}
                                                className={`w-full text-left px-3 py-2 rounded flex items-center ${activeCategory === categori.id.toString() ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                                            >
                                                <span className="mr-2">{categori.emoji}</span>
                                                {categori.title}
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
                                        ? category.find(c => c.id.toString() === activeCategory)?.title
                                        : 'Tous les sujets'}
                                </h1>
                                <p className="text-gray-600">
                                    {filteredTopics.length} {filteredTopics.length === 1 ? 'sujet trouvé' : 'sujets trouvés'}
                                </p>
                            </motion.div>

                            {filteredTopics.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredTopics.map(topic => (
                                        <TopicPreview key={topic.id} topic={topic} nbPost={nbPost}/>
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
                                            : activeCategory
                                                ? 'Soyez le premier à créer un sujet dans cette catégorie'
                                                : 'Aucun sujet disponible pour le moment'}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
