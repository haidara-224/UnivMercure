import { useState, useMemo } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { AnnessScolaire } from "@/types";
import * as XLSX from "xlsx";
import { Edit, PlusCircleIcon, Sheet, Trash } from "lucide-react";
import { Button } from "../../button";


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
    dpt: { id: number; name: string }[];
    salles: { id: number; salle: string }[];
    classe: { id: number; niveau: string }[];
}

const HOURS = Array.from({ length: 15 }, (_, i) => 8 + i);
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

export default function CalendarEmploie() {
    const { eventsByDay, lastAnneesScolaire, dpt, salles, classe } =
        usePage<CustomPageProps>().props;

    const [filters, setFilters] = useState({
        departement: "",
        salle: "",
        classe: "",
    });
    const { delete: destroy, } = useForm({});
    const [selectedModule, setSelectedModule] = useState('Premier Module');
    const [isDeleted, setIsDeleted] = useState(false);

    const allEvents = useMemo(() => {
        return Object.entries(eventsByDay).flatMap(([day, evs]) =>
            evs.filter((e) => {
                return (
                    (!filters.departement || e.departement === filters.departement) &&
                    (!filters.salle || e.salle === filters.salle) &&
                    (!filters.classe || e.classe === filters.classe) &&
                    (e.module === selectedModule)
                );
            }).map((e) => ({
                ...e,
                jour: day,
                startHour: +e.heure_debut.split(":")[0],
                endHour: +e.heure_fin.split(":")[0],
            }))
        );
    }, [eventsByDay, filters, selectedModule]);
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
    const HandleDelete = (emploi: EventRaw) => {

        setIsDeleted(true);
        const confirm = window.confirm(`Etes vous sure de vouloir Supprimé ? `)
        if (confirm) {
            destroy(route('dashboard.emploi.delete', emploi.id), {
                preserveScroll: true,
                onFinish: () => {
                    setIsDeleted(false);
                }

            });

        }

    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold mb-4">
                    Emploi du temps – {lastAnneesScolaire.annee_scolaire}
                </h1>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtres</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Département
                            </label>
                            <select
                                value={filters.departement}
                                onChange={(e) =>
                                    setFilters((f) => ({ ...f, departement: e.target.value }))
                                }
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Tous les départements</option>
                                {dpt.map((d) => (
                                    <option key={d.id} value={d.name}>{d.name}</option>
                                ))}
                            </select>
                        </div>

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
                                    <option key={s.id} value={s.salle}>{s.salle}</option>
                                ))}
                            </select>
                        </div>

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
                                    <option key={c.id} value={c.niveau}>{c.niveau}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={exportToExcel}
                        className="px-4 py-2 m-5 bg-green-600 text-white rounded-lg hover:bg-green-700 float-end cursor-pointer"
                    >
                        <Sheet className="inline mr-2" />
                    </button>
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Module</h4>
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
                <div className="px-4 py-2 m-5">
                    <Link href="/dashboard/emploie-du-temps/new"><PlusCircleIcon /></Link>
                </div>

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
                                                            <div className="flex justify-end">
                                                                <Button variant={'ghost'} className="text-red-500 cursor-pointer" onClick={() => HandleDelete(ev)}>
                                                                    {isDeleted ? (
                                                                        <span className="w-4 h-4 border-2 border-t-transparent border-black dark:border-white rounded-full animate-spin inline-block"></span>
                                                                    ) : (
                                                                        <Trash />
                                                                    )}

                                                                </Button>
                                                                <Link href={`/dashboard/emploie-du-temps/${ev.id}/edit`} className="ml-2">
                                                                    <Button variant={'ghost'} className="text-green-800 cursor-pointer"><Edit /></Button>
                                                                </Link>
                                                            </div>
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
        </div>
    );
}
