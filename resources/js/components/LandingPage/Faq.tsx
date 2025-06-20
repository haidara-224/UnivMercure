import * as React from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface FAQItem {
    question: string
    answer: string
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    const faqs: FAQItem[] = [

        {
            question: "Quelles sont les filières disponibles ?",
            answer: "Nous proposons des formations en Informatique, Droit, Gestion, Logistique, Sciences Politiques et plusieurs autres domaines. Consultez notre catalogue des formations pour plus de détails."
        },
        {
            question: "Quels sont les frais de scolarité ?",
            answer: "Les frais varient selon la filière et le niveau d'étude. Contactez notre service des admissions pour obtenir une grille tarifaire détaillée."
        },
        {
            question: "Puis-je obtenir un document administratif depuis la plateforme (attestation d'inscription,releve de notes,certificat de fin d'études,autres..) ?",
            answer: "Oui, il vous suffit de vous connecter. Si vous n’avez pas encore de compte, vous pouvez vous inscrire en renseignant votre matricule. Une fois inscrit, vous serez automatiquement redirigé vers votre tableau de bord."
        },
      {
  question: "Que faire si mon matricule ne fonctionne pas lors de l'inscription ?",
  answer: "Si votre matricule ne fonctionne pas, cela signifie que vous n'êtes pas encore enregistré dans notre base de données. Veuillez contacter l'administration afin qu'elle puisse vous ajouter en tant qu'étudiant ou professeur, selon votre statut."
}

    ]

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Foire Aux Questions
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Trouvez des réponses aux questions les plus fréquentes sur notre université
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className={cn(
                                    "flex items-center justify-between w-full p-6 text-left",
                                    "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
                                    "focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                )}
                            >
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    className={cn(
                                        "h-5 w-5 text-gray-500 transition-transform",
                                        openIndex === index ? "rotate-180" : ""
                                    )}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Vous ne trouvez pas réponse à votre question ?
                    </p>
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors">
                        Contactez notre service administratif
                    </button>
                </motion.div>
            </div>
        </section>
    )
}
