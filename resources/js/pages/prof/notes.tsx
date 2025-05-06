import AppSidebarLayoutProf from '@/layouts/app/app-sidebarProf-layout';
import { BreadcrumbItem, Departement, Niveaux, Parcours  } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    departements: Departement[];
    classes: Niveaux[];
    parcours: Parcours[];

}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notes',
        href: '/prof/notes',
    },
];
export default function Notes() {
    const { departements, classes, parcours } = usePage<CustomPageProps>().props;
    const [selectedDepartement, setSelectedDepartement] = useState('');
    const [selectedClasse, setSelectedClasse] = useState('');

    const filteredParcours = parcours.filter((p) => {
        return (
            (selectedDepartement ? p.departement.id === Number(selectedDepartement) : true) &&
            (selectedClasse ? p.classes.id === Number(selectedClasse) : true)
        );
    });

    return (
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
          <Head title="Classes et Départements" />
          <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Liste des étudiants</h1>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Département</label>
                <select
                  value={selectedDepartement}
                  onChange={(e) => setSelectedDepartement(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Tous</option>
                  {departements.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                <select
                  value={selectedClasse}
                  onChange={(e) => setSelectedClasse(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Toutes</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.niveau}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matricule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classe</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Département</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredParcours.map((p) => (
                    <tr key={p.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {p.etudiant.photo ? (
                                                <img
                                                    src={`/storage/${p.etudiant.photo}`}
                                                    alt="Photo de l'étudiant"
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-500">Pas de photo</span>
                                            )}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.etudiant.matricule}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.etudiant.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.etudiant.prenom}</td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.classes.niveau}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.departement.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </AppSidebarLayoutProf>
      );

}
