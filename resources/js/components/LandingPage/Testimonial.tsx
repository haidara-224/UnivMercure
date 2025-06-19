import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import React from 'react'

export default function Testimonial() {
    const testimonials = [
        {
            name: "Condé Hadja",
            role: "Étudiant en Informatique",
            quote: "L'Université Mercure International m'a offert des opportunités uniques avec des équipements de pointe et des professeurs internationaux.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
        },
        {
            name: "Kabinet Condé",
            role: "Diplômé en Droit",
            quote: "La qualité de l'enseignement et le soutien des professeurs ont dépassé toutes mes attentes. Je recommande vivement!",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        },
        {
            name: "Fatoumata Binta Sow",
            role: "Étudiante en Logistique et Transport",
            quote: "Les enseignements sont directement connectés aux réalités du terrain, grâce aux visites d’entreprise, aux études de cas et aux partenariats avec les acteurs du transport.",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        }

    ];
    return (
        <>
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Ils parlent de nous</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Découvrez ce que nos étudiants et diplômés disent de leur expérience
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <motion.div
                        className="flex"
                        animate={{
                            x: ["0%", "-100%"],
                        }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
                            >
                                <div className="bg-gray-50 p-8 rounded-xl h-full">
                                    <div className="flex items-center mb-4">
                                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900">{testimonial.name}</h4>
                                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <Quote className="text-gray-300 mr-2 flex-shrink-0" />
                                        <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    )
}
