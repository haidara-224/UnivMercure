import AppLayout from "@/layouts/app-layout";
import { AnnessScolaire, BreadcrumbItem, Departement, Etudiants, Matiere, Niveaux, Salle } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@inertiajs/react";
import { CalendarIcon, ClockIcon, Loader2 } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Examens',
    href: '/dashboard/examens',
  },
  {
    title: 'Nouvel Examen',
    href: '/dashboard/examens/create',
  },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
  matieres: Matiere[];
  departements: Departement[];
  classes: Niveaux[];
  salles: Salle[];
  anneeActive: AnnessScolaire;
  etudiants: Etudiants[];
}

export default function Page() {
  const { matieres, departements, classes, salles, anneeActive, etudiants: initialEtudiants } = usePage<CustomPageProps>().props;
  const [etudiants, setEtudiants] = useState<Etudiants[]>(initialEtudiants);
  const [loadingEtudiants, setLoadingEtudiants] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    module: "",
    matiere_id: "",
    departement_id: "",
    classe_id: "",
    annees_scolaire_id: anneeActive?.id || "",
    date_examen: "",
    heure_debut: "",
    heure_fin: "",
    salle_id: "",
    etudiant_id: "",
  });

  // Fonction pour charger les étudiants via Inertia
  const fetchEtudiants = () => {
    if (!data.classe_id || !data.departement_id || !data.annees_scolaire_id) {
      setEtudiants([]);
      return;
    }

    setLoadingEtudiants(true);
    router.reload({
      only: ['etudiants'],
      data: {
        classe_id: data.classe_id,
        departement_id: data.departement_id,
        annee_scolaire_id: data.annees_scolaire_id
      },

      onFinish: () => setLoadingEtudiants(false)
    });
  };

  // Mettre à jour la liste des étudiants quand les props changent
  useEffect(() => {
    setEtudiants(initialEtudiants);
  }, [initialEtudiants]);

  // Charger automatiquement quand les filtres changent
  useEffect(() => {
    fetchEtudiants();
  }, [data.classe_id, data.departement_id, data.annees_scolaire_id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route("examens.store"));
  };

  const resetForm = () => {
    setData({
      module: "",
      matiere_id: "",
      departement_id: "",
      classe_id: "",
      annees_scolaire_id: anneeActive?.id || "",
      date_examen: "",
      heure_debut: "",
      heure_fin: "",
      salle_id: "",
      etudiant_id: "",
    });
    setEtudiants([]);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Créer un Examen" />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/50">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Planifier un Nouvel Examen
              </span>
            </CardTitle>
            <CardDescription className="text-gray-500">
              Remplissez tous les champs requis pour planifier un nouvel examen
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section Informations Générales */}
              <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Informations Générales</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Module */}
                  <div className="space-y-2">
                    <Label htmlFor="module" className="text-gray-700">Module *</Label>
                    <Input
                      id="module"
                      value={data.module}
                      onChange={(e) => setData("module", e.target.value)}
                      placeholder="Entrez le nom du module"
                      className="focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                    {errors.module && (
                      <p className="text-sm text-red-500 mt-1">{errors.module}</p>
                    )}
                  </div>

                  {/* Matière */}
                  <div className="space-y-2">
                    <Label htmlFor="matiere_id" className="text-gray-700">Matière *</Label>
                    <Select
                      onValueChange={(value) => setData("matiere_id", value)}
                      value={data.matiere_id}
                    >
                      <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                        <SelectValue placeholder="Choisissez une matière" />
                      </SelectTrigger>
                      <SelectContent>
                        {matieres.map((matiere) => (
                          <SelectItem key={matiere.id} value={matiere.id.toString()}>
                            {matiere.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.matiere_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.matiere_id}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {/* Département */}
                  <div className="space-y-2">
                    <Label htmlFor="departement_id" className="text-gray-700">Département *</Label>
                    <Select
                      onValueChange={(value) => setData("departement_id", value)}
                      value={data.departement_id}
                    >
                      <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez un département" />
                      </SelectTrigger>
                      <SelectContent>
                        {departements.map((departement) => (
                          <SelectItem key={departement.id} value={departement.id.toString()}>
                            {departement.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.departement_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.departement_id}</p>
                    )}
                  </div>

                  {/* Classe */}
                  <div className="space-y-2">
                    <Label htmlFor="classe_id" className="text-gray-700">Classe *</Label>
                    <Select
                      onValueChange={(value) => setData("classe_id", value)}
                      value={data.classe_id}
                    >
                      <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((classe) => (
                          <SelectItem key={classe.id} value={classe.id.toString()}>
                            {classe.niveau}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.classe_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.classe_id}</p>
                    )}
                  </div>

                  {/* Année Scolaire */}
                  <div className="space-y-2">
                    <Label htmlFor="annees_scolaire_id" className="text-gray-700">Année Scolaire *</Label>
                    <Select
                      onValueChange={(value) => setData("annees_scolaire_id", value)}
                      value={data.annees_scolaire_id?.toString() ?? ""}
                    >
                      <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez une année" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={anneeActive.id.toString()}>
                          {anneeActive.annee_scolaire} (Active)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.annees_scolaire_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.annees_scolaire_id}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Date et Heure */}
              <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Date et Heure</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Date Examen */}
                  <div className="space-y-2">
                    <Label htmlFor="date_examen" className="text-gray-700">Date *</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="date_examen"
                        type="date"
                        value={data.date_examen}
                        onChange={(e) => setData("date_examen", e.target.value)}
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    </div>
                    {errors.date_examen && (
                      <p className="text-sm text-red-500 mt-1">{errors.date_examen}</p>
                    )}
                  </div>

                  {/* Heure Début */}
                  <div className="space-y-2">
                    <Label htmlFor="heure_debut" className="text-gray-700">Heure de début *</Label>
                    <div className="relative">
                      <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="heure_debut"
                        type="time"
                        value={data.heure_debut}
                        onChange={(e) => setData("heure_debut", e.target.value)}
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    </div>
                    {errors.heure_debut && (
                      <p className="text-sm text-red-500 mt-1">{errors.heure_debut}</p>
                    )}
                  </div>

                  {/* Heure Fin */}
                  <div className="space-y-2">
                    <Label htmlFor="heure_fin" className="text-gray-700">Heure de fin *</Label>
                    <div className="relative">
                      <ClockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="heure_fin"
                        type="time"
                        value={data.heure_fin}
                        onChange={(e) => setData("heure_fin", e.target.value)}
                        className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    </div>
                    {errors.heure_fin && (
                      <p className="text-sm text-red-500 mt-1">{errors.heure_fin}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Lieu et Participants */}
              <div className="space-y-4 p-6 bg-white rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Lieu et Participants</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Salle */}
                  <div className="space-y-2">
                    <Label htmlFor="salle_id" className="text-gray-700">Salle *</Label>
                    <Select
                      onValueChange={(value) => setData("salle_id", value)}
                      value={data.salle_id}
                    >
                      <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                        <SelectValue placeholder="Choisissez une salle" />
                      </SelectTrigger>
                      <SelectContent>
                        {salles.map((salle) => (
                          <SelectItem key={salle.id} value={salle.id.toString()}>
                            {salle.salle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.salle_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.salle_id}</p>
                    )}
                  </div>

                  {/* Étudiant */}
                  <div className="space-y-2">
                    <Label htmlFor="etudiant_id" className="text-gray-700">Étudiant *</Label>
                    <Select
                      onValueChange={(value) => setData("etudiant_id", value)}
                      value={data.etudiant_id}
                      disabled={loadingEtudiants || !data.classe_id || !data.departement_id || !data.annees_scolaire_id}
                    >
                      <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500">
                        {loadingEtudiants ? (
                          <span className="flex items-center">
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Chargement des étudiants...
                          </span>
                        ) : (
                          <SelectValue placeholder={
                            !data.classe_id || !data.departement_id || !data.annees_scolaire_id
                              ? "Sélectionnez d'abord classe, département et année"
                              : "Choisissez un étudiant"
                          } />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {etudiants.length > 0 ? (
                          etudiants.map((etudiant) => (
                            <SelectItem key={etudiant.id} value={etudiant.id.toString()}>
                              {etudiant.name} ({etudiant.matricule})
                            </SelectItem>
                          ))
                        ) : (
                          <div className="py-2 px-4 text-sm text-gray-500">
                            {data.classe_id && data.departement_id && data.annees_scolaire_id
                              ? "Aucun étudiant trouvé pour ces critères"
                              : "Sélectionnez les filtres pour voir les étudiants"}
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    {errors.etudiant_id && (
                      <p className="text-sm text-red-500 mt-1">{errors.etudiant_id}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Réinitialiser
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 text-md font-medium shadow-md transition-all"
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
                      Enregistrement...
                    </span>
                  ) : (
                    "Planifier l'examen"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
