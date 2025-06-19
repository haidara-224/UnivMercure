import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, LibraryBig, Truck } from 'lucide-react';
import React from 'react'

export default function ProgramPopular() {
     const popularPrograms = [
        {
            title: "Informatique Avancée",
            description: "Formation d'excellence en intelligence artificielle et développement logiciel.",
            icon: <Briefcase className="w-6 h-6 text-amber-500" />,
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        },
 {
  title: "Logistique & Transport",
  description: "Maîtrisez la chaîne d'approvisionnement, l'optimisation des flux et les spécificités du transport en Afrique et à l'international.",
  icon: <Truck className="w-6 h-6 text-amber-500" />,
  image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
},
        {
            title: "Droit International",
            description: "Approfondissez les enjeux juridiques contemporains dans un contexte africain.",
            icon: <LibraryBig className="w-6 h-6 text-amber-500" />,
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "Gestion d'Entreprise",
            description: "Masterisez les stratégies de management et d'innovation entrepreneuriale.",
            icon: <GraduationCap className="w-6 h-6 text-amber-500" />,
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        }
    ];
  return (
    <>
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <motion.h2
                            className="text-3xl font-bold text-blue-900 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Nos Formations d'Excellence
                        </motion.h2>
                        <motion.p
                            className="text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Des programmes conçus pour répondre aux besoins du marché africain et international
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularPrograms.map((program, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                            >
                                <div className="h-40 overflow-hidden">
                                    <img
                                        src={program.image}
                                        alt={program.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                            {program.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-blue-900">{program.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-4">{program.description}</p>
                                    <Link
                                        href="#"
                                        className="inline-flex items-center text-amber-500 hover:text-amber-600 font-medium group"
                                    >
                                        En savoir plus
                                        <svg
                                            className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </>
  )
}
