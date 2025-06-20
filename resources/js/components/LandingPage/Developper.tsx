import { Github, Mail, Phone } from "lucide-react";

export function DeveloperCredit() {
  return (
    <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
        {/* Profil */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
            <img
              src="https://scontent.fcky3-1.fna.fbcdn.net/v/t39.30808-6/504956147_1196400102284997_669251336571211682_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=6_w7OVsm8C0Q7kNvwF6hRMa&_nc_oc=AdluGglbNkd3LBTWaAcnSAvt88RNadeMpZ5jS2Xchv-XjlxhcN-oopxJ98qbkEN3W34&_nc_zt=23&_nc_ht=scontent.fcky3-1.fna&_nc_gid=jIApS1QifS19ZkbwWvcmcA&oh=00_AfO0H1lTumReYV3HT1wiIiI3XT6kFQ16Ds2bbBe252Qilw&oe=685B577E"
              alt="Haidara Sidy Mohamed Chérif - Développeur de l'application"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">
              Application développée par
            </p>
            <h4 className="text-lg font-semibold text-white dark:text-white">
              Haidara Sidy Mohamed Chérif
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Étudiant en Génie Logiciel à l’UMI
            </p>
          </div>
        </div>

        {/* Liens de contact */}
        <div className="flex gap-6 text-gray-700 dark:text-gray-300">
          <a
            href="https://github.com/haidara-224"
            aria-label="Profil GitHub"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="mailto:sidymohamedcherifhaidara02@gmail.com"
            aria-label="Envoyer un email"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="tel:+224626301985"
            aria-label="Appeler Haidara Sidy Mohamed"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <Phone className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
