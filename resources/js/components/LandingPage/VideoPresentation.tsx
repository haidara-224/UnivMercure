import { PlayCircle, Award, Users, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

import { useState } from "react"

const VideoPresentation = () => {
    const [showVideo, setShowVideo] = useState(false)

    const stats = [
        { value: "95%", label: "Taux de réussite", icon: <Award className="h-6 w-6" /> },
        { value: "5000+", label: "Étudiants", icon: <Users className="h-6 w-6" /> },
        { value: "15+", label: "Filières", icon: <BookOpen className="h-6 w-6" /> }
    ]

    return (
        <section className="relative py-16 bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-blue-500/10" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Découvrez Mercure International
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        Une université d'excellence au cœur de Conakry
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-2/3 min-h-[300px]"
                    >
                        <div className="relative rounded-xl overflow-hidden shadow-2xl w-full h-full min-h-[300px]">
                            {!showVideo ? (
                                <>
                                    <img
                                        src="/images/video-thumbnail.jpg"
                                        alt="Miniature vidéo présentation UMI"
                                        className="w-full h-full min-h-[300px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <button
                                            onClick={() => setShowVideo(true)}
                                            className="inline-flex items-center justify-center p-4 rounded-full bg-amber-500 hover:bg-amber-600 transition-all"
                                        >
                                            <PlayCircle className="h-16 w-16 text-white" />
                                            <span className="sr-only">Lire la vidéo</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/uXkccZz2Ywk?autoplay=1&mute=1&loop=1&playlist=uXkccZz2Ywk"
                                    title="Présentation Université Mercure International"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full min-h-[300px]"
                                ></iframe>

                            )}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/3 space-y-8"
                    >
                        <h3 className="text-2xl font-semibold text-white">
                            Une université tournée vers l'avenir
                        </h3>

                        <p className="text-gray-300">
                            Notre vidéo de présentation vous emmène à la découverte du campus, des infrastructures modernes,
                            et de l'ambiance unique qui fait la réputation de Mercure International.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center border border-white/10"
                                >
                                    <div className="text-amber-400 flex justify-center mb-2">
                                        {stat.icon}
                                    </div>
                                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                                    <p className="text-sm text-gray-300">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>


                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default VideoPresentation
