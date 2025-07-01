import { Headers } from "@/components/LandingPage/headersl";
import { Departement, Niveaux, Tutos } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { FileText, Download, User, Clock, BookOpen, Search,  PlayCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    cours: Tutos[];
    niveau: Niveaux[];
    departement: Departement[];
}

export default function CoursVideo() {
    const { cours: initialCours, niveau, departement } = usePage<CustomPageProps>().props;
    const [filteredCours, setFilteredCours] = useState<Tutos[]>(initialCours);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDepartement, setSelectedDepartement] = useState('');
    const [selectedNiveau, setSelectedNiveau] = useState('');

    useEffect(() => {
        let results = initialCours;
        if (searchTerm) {
            results = results.filter(cours =>
                cours.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cours.contenue.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedDepartement) {
            results = results.filter(cours =>
                cours.departement_id?.toString() === selectedDepartement
            );
        }
        if (selectedNiveau) {
            results = results.filter(cours =>
                cours.classes_id?.toString() === selectedNiveau
            );
        }

        setFilteredCours(results);
    }, [searchTerm, selectedDepartement, selectedNiveau, initialCours]);



    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Cours Vidéo - Université Mercure International" >
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" rel="stylesheet" />

                <meta name="description" content="Découvrez les cours vidéo de l'Université Mercure International. Accédez à des ressources pédagogiques de qualité." />
            </Head>
            <Headers />


            <div className="relative bg-gradient-to-r from-blue-800 to-navy-900 py-20 pt-50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Ressources Pédagogiques</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Accédez aux cours vidéos et supports partagés par vos professeurs
                    </p>
                </div>
            </div>


            <div className="container mx-auto px-4 sm:px-6 py-12">

                <div className="mb-10 bg-white rounded-xl shadow-sm p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Rechercher un cours..."
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <select
                                className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={selectedDepartement}
                                onChange={(e) => setSelectedDepartement(e.target.value)}
                            >
                                <option value="">Tous les départements</option>
                                {departement.map((dept) => (
                                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                                ))}
                            </select>
                            <select
                                className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={selectedNiveau}
                                onChange={(e) => setSelectedNiveau(e.target.value)}
                            >
                                <option value="">Tous les niveaux</option>
                                {niveau.map((niv) => (
                                    <option key={niv.id} value={niv.id}>{niv.niveau}</option>
                                ))}
                            </select>

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredCours.map((cours) => {
                        const hasVideo = !!cours.video;
                        const hasFile = !!cours.fichier;
                        const videoUrl = hasVideo ? `/storage/${cours.video}` : null;
                        const fileUrl = hasFile ? `/storage/${cours.fichier}` : null;

                        return (
                            <div key={cours.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">

                                <div className={`relative h-48 ${hasVideo ? 'bg-gray-900' : 'bg-blue-50'}`}>
                                    {hasVideo ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900">
                                            <video
                                                src={videoUrl || ''}
                                                className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                muted
                                                loop
                                            />
                                            <PlayCircle className="h-12 w-12 text-white z-10" />
                                        </div>
                                    ) : hasFile ? (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <FileText className="h-12 w-12 text-blue-600" />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                            <BookOpen className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>


                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{cours.titre}</h3>
                                        {cours.departement && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {cours.departement.name}
                                            </span>
                                        )}
                                    </div>

                                    <div className="text-gray-600 text-sm mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: cours.contenue }} />

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center">
                                            <User className="h-4 w-4 mr-1" />
                                            <span>{cours.professeur?.name} {cours.professeur?.prenom}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>{new Date(cours.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>


                                    <div className="flex gap-2">
                                        {hasVideo && (
                                            <a
                                                href={videoUrl || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                                            >
                                                <PlayCircle className="h-4 w-4 mr-2" />
                                                Voir la vidéo
                                            </a>
                                        )}
                                        {hasFile && (
                                            <a
                                                href={fileUrl || '#'}
                                                download
                                                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                                            >
                                                <Download className="h-4 w-4 mr-2" />
                                                Télécharger
                                            </a>
                                        )}
                                        {!hasVideo && !hasFile && (
                                            <span className="inline-flex items-center px-4 py-2 text-sm text-gray-500">
                                                Aucune ressource disponible
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>


                {filteredCours.length === 0 && (
                    <div className="text-center py-16">
                        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun cours trouvé</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm || selectedDepartement || selectedNiveau
                                ? "Aucun résultat ne correspond à vos critères de recherche."
                                : "Les professeurs n'ont pas encore partagé de ressources."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
