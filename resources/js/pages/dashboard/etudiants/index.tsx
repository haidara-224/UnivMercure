import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Parcours, type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect } from "react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Etudiants', href: '/dashboard/etudiants' },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    groupedEtudiants: Parcours[];
    flash: { success?: string };
}
interface messageFlash {
    flash: {
        success: string,

    }
}
export default function Page({ flash }: messageFlash) {
    const { groupedEtudiants } = usePage<CustomPageProps>().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Etudiant" />

            <div className="w-full overflow-x-auto px-[5%] lg:px-[2%] max-[460px]:px-[1%]">
                <h1 className="text-2xl font-bold mb-4 py-9 dark:text-white text-slate-800 font-stretch-ultra-condensed">
                    Liste des Etudiants
                </h1>

                <Link href="/dashboard/etudiants/new">
                    <Button className="bg-primary mb-5 p-5 rounded-2xl text-white cursor-pointer dark:text-slate-800">
                        <Plus />
                    </Button>
                </Link>


                <Input
                    id="name"
                    type="text"
                    className="col-span-3 mb-5 w-full lg:w-1/2"
                    placeholder="Rechercher....."
                    autoComplete="off"
                />

                <div className="overflow-x-auto w-full">
                    <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                <TableHead>Matricule</TableHead>
                                <TableHead >Nom</TableHead>
                                <TableHead >Prénom</TableHead>
                                <TableHead >Genre</TableHead>
                                <TableHead >Niveau</TableHead>
                                <TableHead >Département</TableHead>
                                <TableHead >Photo</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {groupedEtudiants.length > 0 ? (
                                groupedEtudiants.map((etud) => (
                                    <TableRow key={etud.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <TableCell>{etud.etudiant?.matricule || 'N/A'}</TableCell>
                                        <TableCell >{etud.etudiant?.name || 'N/A'}</TableCell>
                                        <TableCell >{etud.etudiant?.prenom || 'N/A'}</TableCell>
                                        <TableCell >{etud.etudiant?.sexe || 'N/A'}</TableCell>
                                        <TableCell >{etud.classes?.niveau || 'N/A'}</TableCell>
                                        <TableCell >{etud.departement?.name || 'N/A'}</TableCell>
                                        <TableCell>
                                        {etud.etudiant.photo ? (
                                            <img
                                                src={`/storage/${etud.etudiant.photo}`}
                                                alt="Photo du professeur"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-500">Pas de photo</span>
                                        )}
                                        </TableCell>
                                        <TableCell className="space-x-2">
                                            <Button className="bg-green-500 hover:bg-green-600"><Edit /></Button>
                                            <Button className="bg-red-500 hover:bg-red-600"><Trash2 /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">Aucun étudiant trouvé.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
