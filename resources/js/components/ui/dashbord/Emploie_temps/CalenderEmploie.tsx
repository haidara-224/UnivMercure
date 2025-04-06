import { useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { AnnessScolaire } from "@/types";
import { BookOpen, Home, Users } from "lucide-react";

interface PageProps { [key: string]: unknown }

interface EventRaw {
  jour: string;
  heure_debut: string;
  heure_fin: string;
  title: string;
  professeur: string;
  salle: string;
  departement: string;
  classe: string;
}

interface Event extends EventRaw {
  startHour: number;
  endHour: number;
}

interface CustomPageProps extends PageProps {
  eventsByDay: Record<string, EventRaw[]>;
  lastAnneesScolaire: AnnessScolaire;
  dpt: { id: number; name: string }[];
  salles: { id: number; salle: string }[];
  classe: { id: number; niveau: string }[];
}

const HOURS = Array.from({ length: 11 }, (_, i) => 8 + i); // 8h–18h
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export default function CalendarEmploie() {
  const { eventsByDay, lastAnneesScolaire, dpt, salles, classe } =
    usePage<CustomPageProps>().props;

  const [filters, setFilters] = useState({
    departement: "",
    salle: "",
    classe: "",
  });

  // Aplatit, convertit et filtre les événements
  const allEvents = useMemo<Event[]>(() => {
    return Object.entries(eventsByDay).flatMap(([day, evs]) =>
      evs
        .filter((e) =>
          (!filters.departement || e.departement === filters.departement) &&
          (!filters.salle || e.salle === filters.salle) &&
          (!filters.classe || e.classe === filters.classe)
        )
        .map((e) => ({
          ...e,
          jour: day,
          startHour: +e.heure_debut.split(":")[0],
          endHour: +e.heure_fin.split(":")[0],
        }))
    );
  }, [eventsByDay, filters]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* En-tête + Filtres */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Emploi du temps – {lastAnneesScolaire.annee_scolaire}
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtres</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Département */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Département
              </label>
              <select
                value={filters.departement}
                onChange={(e) =>
                  setFilters((f) => ({
                    ...f,
                    departement: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les départements</option>
                {dpt.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Salle */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Salle
              </label>
              <select
                value={filters.salle}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, salle: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Toutes les salles</option>
                {salles.map((s) => (
                  <option key={s.id} value={s.salle}>
                    {s.salle}
                  </option>
                ))}
              </select>
            </div>

            {/* Classe */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Classe
              </label>
              <select
                value={filters.classe}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, classe: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Toutes les classes</option>
                {classe.map((c) => (
                  <option key={c.id} value={c.niveau}>
                    {c.niveau}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau horaire responsive */}
      <div className="max-w-7xl mx-auto overflow-x-auto border rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="hidden md:table-cell w-16 py-2 md:py-3 border-r">
                Heure
              </th>
              {DAYS.map((d) => (
                <th
                  key={d}
                  className={`py-2 md:py-3 border-r ${
                    d === "Samedi" ? "hidden lg:table-cell" : ""
                  }`}
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOURS.map((hour) => (
              <tr key={hour} className="even:bg-gray-100">
                <td className="hidden md:table-cell text-center font-medium py-2 border-r">
                  {hour}h
                </td>
                {DAYS.map((day) => {
                  const evs = allEvents.filter(
                    (ev) => ev.jour === day && ev.startHour === hour
                  );
                  return (
                    <td
                      key={day}
                      className={`border-r h-32 p-1 align-top ${
                        day === "Samedi" ? "hidden lg:table-cell" : ""
                      }`}
                    >
                      {evs.length > 0 && (
                        <div className="flex flex-col space-y-1 h-full overflow-y-auto pr-1">
                          {evs.map((ev, i) => (
                            <div
                              key={i}
                              className="bg-blue-50 p-2 rounded-lg shadow-inner text-xs"
                            >
                              <h4 className="font-semibold text-blue-800 leading-tight">
                                {ev.title}- {ev.heure_debut} - {ev.heure_fin}
                              </h4>
                              <p className="flex items-center text-gray-600 truncate text-xl">

                                {ev.professeur}
                              </p>
                              <p className="flex items-center text-gray-600 truncate">

                                {ev.salle}
                              </p>
                              <p className="flex items-center text-gray-500 text-[10px]">

                                {ev.departement} • {ev.classe}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
