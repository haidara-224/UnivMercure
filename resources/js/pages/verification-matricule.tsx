import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";
import { LockKeyhole, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FormData {
  matricule: string;
  [key: string]: string | number;
}

interface PageProps {
  flash?: {
    error?: string;
  };
}

export default function VerificationPage({ flash }: PageProps) {
  const { data, setData, post, processing, errors, reset } = useForm<FormData>({
    matricule: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (flash?.error) {
      setMessage(flash.error);
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route("verifcation.store"), {
      onFinish: () => reset(),
    });
  };

  return (
    <>
      <Head title="Verification Matricule" />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Notification d'erreur */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-lg shadow-md text-center"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carte de formulaire */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* En-tête */}
            <div className="bg-blue-600 dark:bg-blue-800 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <LockKeyhole className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white">Vérification de Matricule</h1>
              <p className="text-blue-100 dark:text-blue-200 mt-2">
                Entrez votre numéro de matricule pour continuer
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label htmlFor="matricule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Numéro de Matricule
                </label>
                <Input
                  id="matricule"
                  type="text"
                  value={data.matricule}
                  onChange={(e) => setData("matricule", e.target.value)}
                  placeholder="Ex: ABC12345"
                  className="py-6 px-4 text-lg border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <InputError message={errors.matricule} className="mt-2" />
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Vérification en cours...
                  </>
                ) : (
                  "Vérifier le Matricule"
                )}
              </Button>
            </form>
          </div>

          {/* Pied de page */}
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
            En cas de problème, contactez l'administration
          </p>
        </motion.div>
      </div>
    </>
  );
}
