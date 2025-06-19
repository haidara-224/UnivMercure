import { Link } from '@inertiajs/react'
import { motion } from 'framer-motion'
import React from 'react'

export default function ElementDecoratif() {
  return (
     <>
                {/* Éléments décoratifs animés */}
                <motion.div
                    className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Prêt à rejoindre notre communauté académique ?
                    </motion.h2>
                    <motion.p
                        className="text-xl mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Postulez dès maintenant et commencez votre parcours vers l'excellence
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="#"
                                className="inline-block bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition duration-300 shadow-lg"
                            >
                                Postuler maintenant
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="#"
                                className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-amber-600 transition duration-300"
                            >
                                Visiter le campus
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </>

  )
}
