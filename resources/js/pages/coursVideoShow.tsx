import { motion } from "framer-motion";
import { Headers } from "@/components/LandingPage/headersl";
import { Tutos } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import {
  Play, Clock, BookOpen, GraduationCap,
  User, ArrowLeft, Download
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PageProps {
  [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
  tuto: Tutos;
}

const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };
const slideUp = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function CoursVideoShow() {
  const { tuto } = usePage<CustomPageProps>().props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={stagger} className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Head title={`${tuto.titre} - Université Mercure International`}>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />
        <meta name="description" content={tuto.contenue} />
      </Head>

      <Headers />

      <div className="container mx-auto px-4 py-12">
        <motion.div variants={slideUp} className="mb-8">
          <a href="/cours-video" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour aux cours
          </a>
        </motion.div>
        {tuto.video && (
              <motion.div variants={fadeIn} className="bg-black rounded-xl overflow-hidden shadow-xl relative aspect-video">
          {tuto.video && (
            <video ref={videoRef} controls className="w-full h-full object-cover">
              <source src={`/storage/${tuto.video}`} type="video/mp4" />
            </video>
          )}

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
              >
                <Play className="w-8 h-8" />
              </motion.button>
            </div>
          )}
        </motion.div>
            )}

      <motion.div variants={slideUp} className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{tuto.titre}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>Publié le {new Date(tuto.created_at).toLocaleDateString()}</span>
            </div>

            {tuto.professeur && (
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-2" />
                <span>Par {tuto.professeur.name}</span>
              </div>
            )}

            {tuto.departement && (
              <div className="flex items-center text-gray-600">
                <GraduationCap className="w-5 h-5 mr-2" />
                <span>{tuto.departement.name}</span>
              </div>
            )}
          </div>

          {tuto.fichier && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`/storage/${tuto.fichier}`}
              download
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger les supports
            </motion.a>
          )}
        </motion.div>

        <motion.div variants={slideUp} className="prose max-w-none bg-white p-6 rounded-xl shadow-sm mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Contenu du cours
          </h2>
          <div dangerouslySetInnerHTML={{ __html: tuto.contenue }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
