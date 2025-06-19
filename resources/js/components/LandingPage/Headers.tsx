import { SharedData } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";
import { Button } from "../ui/button";
import UserButton from "./UserButton";

export function Headers() {
    const { auth, authUsers } = usePage<SharedData>().props;
    const { post } = useForm({});
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('logout'))
    };

    return (
        <>
            <motion.header
                className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-6">
  <div className="flex items-center justify-between">
                        {/* Logo animé */}
                        <motion.div
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className={`p-1 rounded-full ${scrolled ? '' : 'bg-white'}`}
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                <img
                                    src="/mercure.jpeg"
                                    alt="Mercure"
                                    className="w-16 h-16 rounded-full  object-contain"
                                />
                            </motion.div>
                            <span className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                                Université Mercure International
                            </span>
                        </motion.div>


                        {/* Navigation desktop */}
                        <nav className="hidden md:flex space-x-8 items-center">
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="#" className={`font-medium ${scrolled ? 'text-gray-900 hover:text-amber-500' : 'text-white hover:text-amber-300'} transition`}>Accueil</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="#" className={`font-medium ${scrolled ? 'text-gray-600 hover:text-amber-500' : 'text-gray-200 hover:text-amber-300'} transition`}>Formations</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="#" className={`font-medium ${scrolled ? 'text-gray-600 hover:text-amber-500' : 'text-gray-200 hover:text-amber-300'} transition`}>Admissions</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="#" className={`font-medium ${scrolled ? 'text-gray-600 hover:text-amber-500' : 'text-gray-200 hover:text-amber-300'} transition`}>Campus</Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Link href="#" className={`font-medium ${scrolled ? 'text-gray-600 hover:text-amber-500' : 'text-gray-200 hover:text-amber-300'} transition`}>Contact</Link>
                            </motion.div>

                            {/* Boutons de connexion */}
                            {auth.user ? (
                                <>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        {
                                            authUsers?.map((r) => (
                                                r.name == 'super admin' && <Link key={r.id}
                                                    href={route('dashboard.index')}
                                                    className="inline-block rounded-md bg-amber-500 px-5 py-1.5 text-sm font-medium leading-normal text-white hover:bg-amber-600 transition"
                                                >
                                                    Dashboard
                                                </Link>
                                            ))

                                        }

                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        {
                                            authUsers?.map((r) => (
                                                r.name == 'etudiant' && <Link key={r.id}
                                                    href={route('etudiant.index')}
                                                    className="inline-block rounded-md bg-amber-500 px-5 py-1.5 text-sm font-medium leading-normal text-white hover:bg-amber-600 transition"
                                                >
                                                    Mon Espace
                                                </Link>
                                            ))

                                        }

                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        {
                                            authUsers?.map((r) => (
                                                r.name == 'personnel' && <Link key={r.id}

                                                    href={route('prof.index')}
                                                    className="inline-block rounded-md bg-amber-500 px-5 py-1.5 text-sm font-medium leading-normal text-white hover:bg-amber-600 transition"
                                                >
                                                    Mon Espace
                                                </Link>
                                            ))

                                        }

                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        {
                                            authUsers?.map((r) => (
                                                r.name == 'documentaliste' && <Link key={r.id}

                                                    href={route('documentaliste.index')}
                                                    className="inline-block rounded-md bg-amber-500 px-5 py-1.5 text-sm font-medium leading-normal text-white hover:bg-amber-600 transition"
                                                >
                                                    Mon Espace
                                                </Link>
                                            ))

                                        }

                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        <UserButton />

                                    </motion.div>



                                </>
                            ) : (
                                <>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        <Link
                                            href={route('login')}
                                            className="inline-block rounded-md border border-amber-500 px-5 py-1.5 text-sm font-medium leading-normal text-amber-500 hover:bg-amber-500 hover:text-white transition"
                                        >
                                            Se connecter
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        <Link
                                            href={route('verifcation.verif')}
                                            className="inline-block rounded-md bg-amber-500 px-5 py-1.5 text-sm font-medium leading-normal text-white hover:bg-amber-600 transition"
                                        >
                                            Créer un compte
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </nav>

                        {/* Bouton menu mobile */}
                        <button
                            className="md:hidden focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className={`w-6 h-6 cursor-pointer ${scrolled ? 'text-gray-900' : 'text-white'}`} />
                            ) : (
                                <Menu className={`w-6 h-6 cursor-pointer ${scrolled ? 'text-gray-900' : 'text-white'}`} />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-90 z-40 pt-20 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="container mx-auto px-6 py-4">
                            <nav className="flex flex-col space-y-6">
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-2xl font-medium text-white hover:text-amber-300 transition"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Accueil
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-2xl font-medium text-gray-300 hover:text-amber-300 transition"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Formations
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-2xl font-medium text-gray-300 hover:text-amber-300 transition"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Admissions
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-2xl font-medium text-gray-300 hover:text-amber-300 transition"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Campus
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Link
                                        href="#"
                                        className="text-2xl font-medium text-gray-300 hover:text-amber-300 transition"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Contact
                                    </Link>
                                </motion.div>

                                <div className="pt-8 border-t border-gray-700 mt-4">
                                    {auth.user ? (
                                        <div className="flex flex-col space-y-4">
                                            <motion.div
                                                initial={{ x: -50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <Link
                                                    href={route('dashboard.index')}
                                                    className="inline-block w-full text-center rounded-md bg-amber-500 px-5 py-3 text-lg font-medium leading-normal text-white hover:bg-amber-600 transition"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Mon Espace
                                                </Link>
                                            </motion.div>
                                            <motion.div
                                                initial={{ x: -50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                <UserButton />
                                                <Button
                                                    type='submit'
                                                    onClick={(e) => {
                                                        submit(e);
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className="w-full bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white text-lg py-3"
                                                >
                                                    Déconnexion
                                                </Button>
                                            </motion.div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-4">
                                            <motion.div
                                                initial={{ x: -50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <Link
                                                    href={route('login')}
                                                    className="inline-block w-full text-center rounded-md border border-amber-500 px-5 py-3 text-lg font-medium leading-normal text-amber-500 hover:bg-amber-500 hover:text-white transition"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Se connecter
                                                </Link>
                                            </motion.div>
                                            <motion.div
                                                initial={{ x: -50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                <Link
                                                    href={route('verifcation.verif')}
                                                    className="inline-block w-full text-center rounded-md bg-amber-500 px-5 py-3 text-lg font-medium leading-normal text-white hover:bg-amber-600 transition"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Créer un compte
                                                </Link>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>


    )
}
