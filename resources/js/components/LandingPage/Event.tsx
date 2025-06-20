import { CalendarDays,  School, Award, BookOpen, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const NewsEventCard = () => {
  const events = [
    {
      id: 1,
      title: "Journée Portes Ouvertes 2024",
      date: "15 Mars 2024",
      type: "evenement",
      description: "Découvrez notre campus, rencontrez nos enseignants et étudiants, et obtenez toutes les informations sur nos formations.",
      icon: <School className="h-5 w-5" />,
      badge: "Nouveau"
    },
    {
      id: 2,
      title: "Concours d'Entrée en Médecine",
      date: "22 Avril 2024",
      type: "concours",
      description: "Inscriptions ouvertes pour le concours d'entrée en première année de médecine. Date limite : 10 Avril.",
      icon: <Award className="h-5 w-5" />,
      badge: "Important"
    },
    {
      id: 3,
      title: "Soutenance de Thèses",
      date: "5 Mai 2024",
      type: "academique",
      description: "Assistez aux soutenances publiques de nos doctorants en Sciences Politiques et Relations Internationales.",
      icon: <BookOpen className="h-5 w-5" />,
      badge: null
    },
    {
      id: 4,
      title: "Forum des Métiers",
      date: "18 Mai 2024",
      type: "evenement",
      description: "Rencontrez des professionnels et découvrez les opportunités de carrière après vos études à Mercure International.",
      icon: <School className="h-5 w-5" />,
      badge: "À venir"
    }
  ]

  const getTypeColor = (type: string) => {
    switch(type) {
      case "evenement": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "concours": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "academique": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Actualités & Événements
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Restez informé des dernières nouvelles et événements de notre université
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ y: -5 }}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getTypeColor(event.type)}`}>
                    {event.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        {event.date}
                      </span>
                      {event.badge && (
                        <Badge variant="outline" className="ml-2">
                          {event.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mt-2 text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>
                <Button variant="outline" className="mt-6 w-full">
                  En savoir plus
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="ghost" className="text-amber-600 dark:text-amber-400">
            Voir toutes les actualités
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsEventCard
