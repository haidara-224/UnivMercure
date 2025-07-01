import { Headers } from '@/components/LandingPage/headersl';
import { Head } from '@inertiajs/react';
import { MapPin, Phone, Mail, Clock, School, Send, ChevronRight, Github } from 'lucide-react';

export default function Contact() {
    const UMI_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.238927476104!2d-13.6477865!3d9.6011443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd6737bf8b07f%3A0xc41cd7d40604ad66!2sUniversit%C3%A9%20Mercure%20International!5e1!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus";

    return (
        <>
            <Head title="Contactez-nous - Université Mercure International" >
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />

                <meta name="description" content="Contactez l'Université Mercure International pour toute question ou information. Nous sommes là pour vous aider." />
            </Head>
            <div className="min-h-screen bg-white">
                <Headers />

                <div className="relative bg-gradient-to-r from-blue-900 to-navy-900 py-20 pt-50">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contactez Notre Université</h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Une question ? Notre équipe se tient à votre disposition pour vous répondre.
                        </p>
                    </div>
                </div>


                <div className="container mx-auto px-6 py-16">
                    <div className="flex flex-col lg:flex-row gap-12">

                        <div className="lg:w-1/2">
                            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                                <h2 className="text-3xl font-bold text-navy-900 mb-6">Écrivez-nous</h2>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 mb-2">Prénom</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-gray-50 rounded-t-lg"
                                                placeholder="Votre prénom"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Nom</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-gray-50 rounded-t-lg"
                                                placeholder="Votre nom"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-gray-50 rounded-t-lg"
                                            placeholder="votre@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Sujet</label>
                                        <div className="relative">
                                            <select
                                                className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-gray-50 rounded-t-lg appearance-none"
                                            >
                                                <option value="">Choisir un sujet</option>
                                                <option value="admission">Admission</option>
                                                <option value="programme">Programme d'études</option>
                                                <option value="partenariat">Partenariat</option>
                                            </select>
                                            <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2">Message</label>
                                        <textarea
                                            rows={5}
                                            className="w-full px-4 py-3 border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-gray-50 rounded-t-lg"
                                            placeholder="Votre message..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
                                    >
                                        <Send className="mr-2" size={18} />
                                        Envoyer le message
                                    </button>
                                </form>
                            </div>
                        </div>


                        <div className="lg:w-1/2 space-y-8">
                            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                                <h2 className="text-3xl font-bold text-navy-900 mb-8">Nos Coordonnées</h2>

                                <div className="space-y-6">

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <School className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Université Mercure International</h3>
                                            <p className="text-gray-600 mt-1">Établissement d'enseignement supérieur</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <MapPin className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Adresse</h3>
                                            <p className="text-gray-600 mt-1">
                                                BP 1234, kipé<br />
                                                Conakry, République de Guinée
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">À côté du Ministère de la cité des Medecins</p>
                                        </div>
                                    </div>


                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <Phone className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Téléphone</h3>
                                            <p className="text-gray-600 mt-1">+224 623 00 00 00</p>
                                            <p className="text-gray-600">+224 664 00 00 00</p>
                                        </div>
                                    </div>


                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <Mail className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                                            <p className="text-gray-600 mt-1">contact@umi.edu.gn</p>
                                            <p className="text-gray-600">admissions@umi.edu.gn</p>
                                        </div>
                                    </div>


                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <Clock className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Horaires</h3>
                                            <p className="text-gray-600 mt-1">Lundi - Vendredi : 8h - 17h</p>
                                            <p className="text-gray-600">Samedi : 9h - 13h</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                                <iframe
                                    title="Localisation Université Mercure International"
                                    src={UMI_MAPS_EMBED}
                                    width="100%"
                                    height="300"
                                    className="border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    aria-label="Carte de l'université"
                                />
                            </div>
                        </div>
                    </div>
                </div>


              <footer className="bg-blue-900/80 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Université Mercure International</h2>
            <p className="text-blue-200 text-lg mb-6">"L'excellence au service du développement"</p>
          </div>


          <div className="mt-12 pt-6 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
                  <img
                    src="https://scontent.fcky3-1.fna.fbcdn.net/v/t39.30808-6/504956147_1196400102284997_669251336571211682_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=6_w7OVsm8C0Q7kNvwF6hRMa&_nc_oc=AdluGglbNkd3LBTWaAcnSAvt88RNadeMpZ5jS2Xchv-XjlxhcN-oopxJ98qbkEN3W34&_nc_zt=23&_nc_ht=scontent.fcky3-1.fna&_nc_gid=jIApS1QifS19ZkbwWvcmcA&oh=00_AfO0H1lTumReYV3HT1wiIiI3XT6kFQ16Ds2bbBe252Qilw&oe=685B577E"
                    alt="Haidara Sidy Mohamed Chérif - Développeur de l'application"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-blue-200">
                    Application développée par
                  </p>
                  <h4 className="text-lg font-semibold text-white">
                    Haidara Sidy Mohamed Chérif
                  </h4>
                  <p className="text-sm text-blue-300">
                    Étudiant en Génie Logiciel à l'UMI
                  </p>
                </div>
              </div>


              <div className="flex gap-6 text-blue-200">
                <a
                  href="https://github.com/haidara-224"
                  aria-label="Profil GitHub"
                  className="hover:text-amber-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:sidymohamedcherifhaidara02@gmail.com"
                  aria-label="Envoyer un email"
                  className="hover:text-amber-400 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="tel:+224625421335"
                  aria-label="Appeler Haidara Sidy Mohamed"
                  className="hover:text-amber-400 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>


          <div className="mt-8 text-center">
            <p className="text-blue-100 text-sm">
              © {new Date().getFullYear()} Université Mercure International - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
            </div>
        </>
    );
}
