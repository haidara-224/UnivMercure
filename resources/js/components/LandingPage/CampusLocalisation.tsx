import { MapPin, Building2, School, Library, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const CampusSection = () => {
  const [activeFilter, setActiveFilter] = useState('batiments');

 const campusPhotos = [
  // Bâtiments (6)
  {
    id: 1,
    title: "Bâtiment administratif UMI",
    category: "batiments",
    url: "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 2,
    title: "Faculté des Sciences",
    category: "batiments",
    url: "https://images.unsplash.com/photo-1575467678971-7cd5c2937dc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY3VsdGUlMjBzY2llbmNlfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    title: "Faculté de Droit",
    category: "batiments",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 4,
    title: "Centre de recherche",
    category: "batiments",
    url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 5,
    title: "Entrée principale",
    category: "batiments",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 6,
    title: "Bâtiment des archives",
    category: "batiments",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },

  // Amphithéâtres (6)
  {
    id: 7,
    title: "Amphi Cheikh Anta Diop",
    category: "amphis",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 8,
    title: "Amphi Nelson Mandela",
    category: "amphis",
    url: "https://images.unsplash.com/photo-1640416639872-93aabd8d91d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW1waGlzfGVufDB8fDB8fHww"
  },
  {
    id: 9,
    title: "Amphi Thomas Sankara",
    category: "amphis",
    url: "https://images.unsplash.com/photo-1568219656418-15c329312bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 10,
    title: "Amphi modulable",
    category: "amphis",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 11,
    title: "Amphi informatique",
    category: "amphis",
    url: "https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW1waGlzJTIwaW5mb3JtYXRpcXVlfGVufDB8fDB8fHww"
  },
  {
    id: 12,
    title: "Petit amphi",
    category: "amphis",
    url: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },

  // Salles de cours (6)
  {
    id: 13,
    title: "Salle de cours type",
    category: "salles",
    url: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
  },
  {
    id: 14,
    title: "Laboratoire de chimie",
    category: "salles",
    url: "https://plus.unsplash.com/premium_photo-1721921134127-d836717619eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1waGlzfGVufDB8fDB8fHww"
  },
  {
    id: 15,
    title: "Salle informatique",
    category: "salles",
    url: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 16,
    title: "Salle de conférence",
    category: "salles",
    url: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 17,
    title: "Salle de travail",
    category: "salles",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 18,
    title: "Salle de langue",
    category: "salles",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },

  // Sport (6)
  {
    id: 19,
    title: "Complexe sportif",
    category: "sport",
    url: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 20,
    title: "Terrain de football",
    category: "sport",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 21,
    title: "Salle de gym",
    category: "sport",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 22,
    title: "Court de tennis",
    category: "sport",
    url: "https://plus.unsplash.com/premium_photo-1685088255984-f672021dee19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNwb3J0JTIwdW5pdmVyc2l0YWlyZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 23,
    title: "Piste d'athlétisme",
    category: "sport",
    url: "https://images.unsplash.com/photo-1710429026709-bc8bd40685c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnQlMjB1bml2ZXJzaXRhaXJlfGVufDB8fDB8fHww"
  },
  {
    id: 24,
    title: "Dojo",
    category: "sport",
    url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  }
];
  // Lien Google Maps exact pour UMI Conakry
  const UMI_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.238927476104!2d-13.6477865!3d9.6011443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd6737bf8b07f%3A0xc41cd7d40604ad66!2sUniversit%C3%A9%20Mercure%20International!5e1!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus";

  const filteredPhotos = activeFilter === 'batiments'
    ? campusPhotos.slice(0, 6)
    : campusPhotos.filter(photo => photo.category === activeFilter);


  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            <MapPin className="inline-block mr-2 text-amber-500" />
            Localisation du Campus UMI
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Situé à Conakry, découvrez notre campus moderne et nos infrastructures
          </p>
        </motion.div>

        {/* Carte Google Maps exacte */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-16 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <iframe
            title="Localisation exacte Université Mercure International Conakry"
            src={UMI_MAPS_EMBED}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full"
            aria-label="Carte de localisation de l'Université Mercure International"
          ></iframe>
          <div className="bg-white dark:bg-gray-800 p-4 text-center border-t border-gray-100 dark:border-gray-700">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              <Building2 className="inline-block mr-2 text-amber-500" />
              Université Mercure International, Conakry, Guinée
            </p>
          </div>
        </motion.div>

        {/* Galerie photos avec filtres améliorés */}
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Découvrez nos infrastructures
          </h3>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[

              { id: 'batiments', icon: <Building2 />, label: 'Bâtiments' },
              { id: 'amphis', icon: <School />, label: 'Amphis' },
              { id: 'salles', icon: <Library />, label: 'Salles' },
              { id: 'sport', icon: <Activity />, label: 'Sport' }
            ].map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{filter.icon}</span>
                {filter.label}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-xl shadow-lg"
              >
                <img
                  src={photo.url}
                  alt={`${photo.title} - UMI Conakry`}
                  className="w-full h-64 object-cover transition duration-500 group-hover:opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white font-medium text-lg">{photo.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

    </section>
  );
};

export default CampusSection;
