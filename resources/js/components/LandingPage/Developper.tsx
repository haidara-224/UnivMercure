import { Github, Mail } from "lucide-react"

export function DeveloperCredit() {
  return (
    <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500">
            <img
              src="https://www.facebook.com/photo.php?fbid=1196400098951664&set=pb.100057450541852.-2207520000&type=3"
              alt="[Votre Nom] - Développeur de l'application"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">
              Application développée par
            </p>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Haidara Sidy Mohamed Chérif
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Étudiant en Génie Logiciel à UMI
            </p>
          </div>
        </div>

        <div className="flex gap-4">

          <a
            href="https://github.com/haidara-224"
            aria-label="Profil GitHub"
            className="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="mailto:sidymohamedcherifhaidara02@gmail.com"
            aria-label="Envoyer un email"
            className="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  )
}


