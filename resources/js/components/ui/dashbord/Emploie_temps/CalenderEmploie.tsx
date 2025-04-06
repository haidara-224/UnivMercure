import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { AnnessScolaire } from "@/types";

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    eventsByDay: {
        [key: string]: Array<{
            start: { year: number; month: number; day: number; hour: number; minute: number; second: number };
            end: { year: number; month: number; day: number; hour: number; minute: number; second: number };
            title: string;
            module: string;
            professeur: string;
            heure_debut: string;
            heure_fin: string;
            departement: string;
            classe: string;
            salle: string;
        }>;
    };
    lastAnneesScolaire: AnnessScolaire;

}

function CalendarEmploie() {
    const { eventsByDay,lastAnneesScolaire } = usePage<CustomPageProps>().props;

    const [filters, setFilters] = useState({
        departement: "",
        salle: "",
        classe: "",
    });

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const filteredData = Object.keys(eventsByDay).map((day) => {
        const events = eventsByDay[day].filter((event) => {
            const departement = event.departement || "";
            const salle = event.salle || "";
            const classe = event.classe || "";

            return (
                (filters.departement === "" || departement === filters.departement) &&
                (filters.salle === "" || salle === filters.salle) &&
                (filters.classe === "" || classe === filters.classe)
            );
        });

        return { day, events };
    });

    const uniqueDepartements = Array.from(new Set(
        Object.values(eventsByDay).flat().map(e => e.departement || "").filter(Boolean)
    ));
    const uniqueSalles = Array.from(new Set(
        Object.values(eventsByDay).flat().map(e => e.salle || "").filter(Boolean)
    ));
    const uniqueClasses = Array.from(new Set(
        Object.values(eventsByDay).flat().map(e => e.classe || "").filter(Boolean)
    ));

    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* En-tête et Filtres */}
            <div className="mb-8 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Emploi du temps {lastAnneesScolaire.annee_scolaire}</h1>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtres</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Département</label>
                            <select
                                value={filters.departement}
                                onChange={(e) => handleFilterChange("departement", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Tous les départements</option>
                                {uniqueDepartements.map((departement) => (
                                    <option key={departement} value={departement}>
                                        {departement}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Salle</label>
                            <select
                                value={filters.salle}
                                onChange={(e) => handleFilterChange("salle", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Toutes les salles</option>
                                {uniqueSalles.map((salle) => (
                                    <option key={salle} value={salle}>
                                        {salle}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">Classe</label>
                            <select
                                value={filters.classe}
                                onChange={(e) => handleFilterChange("classe", e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Toutes les classes</option>
                                {uniqueClasses.map((classe) => (
                                    <option key={classe} value={classe}>
                                        {classe}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Calendrier */}
            <div className="max-w-7xl mx-auto mb-8">
                {/* Affichage des jours de la semaine */}
                <div className="lg:flex space-x-4 mb-6 justify-center hidden">
                    {daysOfWeek.map((day) => (
                        <div
                            key={day}
                            className="text-center py-3 px-6 bg-blue-100 rounded-lg shadow-md text-blue-800 font-semibold"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                        <p className="text-gray-500">Aucun événement trouvé avec ces filtres</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 ">
                        {filteredData.map(({ day, events }, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden w-full"
                            >
                                <div className="bg-blue-50 p-4 border-b border-blue-200">
                                    <h4 className="text-md font-semibold text-blue-800 text-center">{day}</h4>
                                </div>

                                <div className="p-4 space-y-4 min-h-[180px]  w-full flex flex-col justify-center items-center">
                                    {events.length > 0 ? (
                                        events.map((event, eventIndex) => (
                                            <div
                                                key={eventIndex}
                                                className="p-4 bg-gray-50 rounded-lg border border-gray-800 hover:bg-blue-50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex flex-col">
                                                        <h5 className="text-sm font-medium text-gray-900">{event.title}</h5>

                                                    </div>
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                                        {event.salle}
                                                    </span>
                                                </div>
                                            <div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                            {event.heure_debut} - {event.heure_fin}
                                                        </p>
                                            </div>
                                                <div className="mt-3 space-y-1">
                                                    <div className="flex items-center text-xs text-gray-600">

                                                        Prof: {event.professeur}
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-600">

                                                        Dpt: {event.departement}
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-600">
                                                        Niveau:  {event.classe}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-3 text-center text-gray-400 text-sm">
                                            Aucun cours
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                )}
            </div>
        </div>
    );
}

export default CalendarEmploie;
