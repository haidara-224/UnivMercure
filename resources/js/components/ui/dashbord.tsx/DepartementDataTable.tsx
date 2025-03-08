import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Departement } from "@/types";

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    departements: Departement[];
}

export default function DepartementDataTable() {
    const { departements } = usePage<CustomPageProps>().props;

    useEffect(() => {
        //console.log(departements);
    }, [departements]);

    return (
        <div className="w-full overflow-x-auto">
        <h1 className="text-xl font-bold mb-4">Liste des Départements</h1>

        <Table className="w-full border border-gray-300  dark:border-gray-700 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
            <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableHead>Departement</TableHead>
                    <TableHead className="hidden sm:table-cell">Matricule Chef Dpt</TableHead>
                    <TableHead>Chef</TableHead>
                    <TableHead className="hidden lg:table-cell">Numéro du Chef Dpt</TableHead>
                    <TableHead className="hidden xl:table-cell">Faculté</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {departements.map((dept) => (
                    <TableRow key={dept.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                        <TableCell className="max-w-[100px] lg:max-w-full">
                            <div className="line-clamp-2 lg:line-clamp-0">{dept.name}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{dept.professeur.matricule}</TableCell>
                        <TableCell>{dept.professeur.name} {dept.professeur.prenom}</TableCell>
                        <TableCell className="hidden lg:table-cell">{dept.professeur.telephone}</TableCell>
                        <TableCell className="hidden xl:table-cell">{dept.faculty.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>

    );
}
