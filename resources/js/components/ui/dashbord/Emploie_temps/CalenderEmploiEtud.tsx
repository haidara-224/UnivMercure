import { useState, useMemo } from "react";
import {  usePage } from "@inertiajs/react";
import { AnnessScolaire } from "@/types";
import * as XLSX from "xlsx";
import {  Sheet} from "lucide-react";



interface PageProps { [key: string]: unknown }

interface EventRaw {
    id: number;
    jour: string;
    heure_debut: string;
    heure_fin: string;
    title: string;
    professeur: string;
    module: string;
    salle: string;
    departement: string;
    classe: string;
}



interface CustomPageProps extends PageProps {
    eventsByDay: Record<string, EventRaw[]>;
    lastAnneesScolaire: AnnessScolaire;

}

const HOURS = Array.from({ length:  15 }, (_, i) => 8 + i);
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export default function CalendarEmploieEtud() {
    const { eventsByDay, lastAnneesScolaire } =
        usePage<CustomPageProps>().props;
    const [selectedModule, setSelectedModule] = useState('Premier Module');


    const allEvents = useMemo(() => {
        return Object.entries(eventsByDay).flatMap(([day, evs]) =>
            evs.filter((e) => {
                return (

                    (e.module === selectedModule)
                );
            }).map((e) => ({
                ...e,
                jour: day,
                startHour: +e.heure_debut.split(":")[0],
                endHour: +e.heure_fin.split(":")[0],
            }))
        );
    }, [eventsByDay,  selectedModule]);
    const exportToExcel = () => {
        const data = allEvents.map(event => ({
            Jour: event.jour,
            "Heure Début": event.heure_debut,
            "Heure Fin": event.heure_fin,
            "Titre": event.title,
            "Professeur": event.professeur,
            "Module": event.module,
            "Salle": event.salle,
            "Département": event.departement,
            "Classe": event.classe,
        }));

        const worksheet = XLSX.utils.json_to_sheet([]);


        XLSX.utils.sheet_add_aoa(worksheet, [[`Emploie du Temps : ${selectedModule}- ${lastAnneesScolaire.annee_scolaire}`]], { origin: "A1" });


        XLSX.utils.sheet_add_json(worksheet, data, {
            origin: "A3",
            skipHeader: false,
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Emploi du temps");

        XLSX.writeFile(workbook, `emploi_du_temps_${selectedModule.replace(' ', '_')}.xlsx`);
    };


    return (
        <>
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold mb-4">
                    Emploi du temps – {lastAnneesScolaire.annee_scolaire}
                </h1>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">


                    <button
                        onClick={exportToExcel}
                        className="px-4 py-2 m-5 bg-green-600 text-white rounded-lg hover:bg-green-700 float-end cursor-pointer"
                    >
                        <Sheet className="inline mr-2" />
                    </button>
                    <div className="mt-4">

                        <div className="flex gap-4">
                            <label>
                                <input type="radio" name="module" value="Premier Module" checked={selectedModule === 'Premier Module'} onChange={() => setSelectedModule('Premier Module')} /> Premier Module
                            </label>
                            <label>
                                <input type="radio" name="module" value="Deuxieme Module" checked={selectedModule === 'Deuxieme Module'} onChange={() => setSelectedModule('Deuxieme Module')} /> Deuxieme Module
                            </label>
                        </div>

                    </div>



                </div>

            </div>


            <div className="max-w-7xl mx-auto overflow-x-auto border rounded-lg shadow-lg bg-white">


                <table className="min-w-full table-fixed border-collapse">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className=" md:table-cell w-16 py-2 md:py-3 border-r">Heure</th>
                            {DAYS.map((d) => (
                                <th
                                    key={d}
                                    className={`py-2 md:py-3 border-r ${d === "Samedi" ? " lg:table-cell" : ""}`}
                                >
                                    {d}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {HOURS.map((hour) => (
                            <tr key={hour} className="even:bg-gray-100">
                                <td className=" md:table-cell text-center font-medium py-2 border-r">
                                    {hour}h
                                </td>
                                {DAYS.map((day) => {
                                    const evs = allEvents.filter(
                                        (ev) => ev.jour === day && ev.startHour === hour
                                    );
                                    return (
                                        <td
                                            key={day}
                                            className={`border-r h-32 p-1 align-top ${day === "Samedi" ? "hidden lg:table-cell" : ""}`}
                                        >
                                            {evs.length > 0 && (
                                                <div className="flex flex-col space-y-1 h-full overflow-y-auto pr-1">
                                                    {evs.map((ev, i) => (
                                                        <div
                                                            key={i}
                                                            className="bg-blue-50 p-2 rounded-lg shadow-inner text-xs"
                                                        >

                                                            <h4 className="font-semibold text-blue-800 leading-tight">
                                                                {ev.title} - {ev.heure_debut} - {ev.heure_fin}
                                                            </h4>
                                                            <p className="text-gray-600 truncate">{ev.professeur}</p>
                                                            <p className="text-gray-600 truncate">{ev.salle}</p>
                                                            <p className="text-gray-500 text-[10px]">
                                                                {ev.departement} • {ev.classe}
                                                            </p>
                                                            <p className="text-gray-500 text-[10px]">
                                                                {ev.module}
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
        </>
    );
}
