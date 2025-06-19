import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
const NavBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.header
            className="bg-blue-900 text-white shadow-lg sticky top-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="bg-white text-white p-2 rounded-lg">
                            <img
                                src="/mercure.jpeg"
                                alt="Mercure"
                                className="w-6 h-6 rounded-full  object-contain"
                            />
                        </div>
                        <span className="text-xl font-bold">Forum Universitaire</span>
                    </div>

                    <nav className="hidden md:flex space-x-6 items-center">
                        <Link href="/forum" className="hover:text-amber-300 transition">Accueil Forum</Link>
                        <Link href="/categories" className="hover:text-amber-300 transition">Catégories</Link>
                        <Link href="/nouveau-sujet" className="hover:text-amber-300 transition">Créer un sujet</Link>
                    </nav>

                    <button
                        className="md:hidden focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Menu mobile */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="md:hidden bg-blue-800"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto px-6 py-3 flex flex-col space-y-3">
                            <Link href="/forum" className="py-2 hover:text-amber-300 transition">Accueil Forum</Link>
                            <Link href="/categories" className="py-2 hover:text-amber-300 transition">Catégories</Link>
                            <Link href="/nouveau-sujet" className="py-2 hover:text-amber-300 transition">Créer un sujet</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
export default NavBar
