import AppLayout from "@/layouts/app-layout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface Parcours {
    id:string
    etudiant_id : string
    classes_id:string
    departement_id: string
    annees_scolaire_id :string
    created_at:Date
    updated_at:Date
    niveau:string
    departement_name:string
    etudiant_matricule:string
    etudiant_name:string
    etudiant_prenom:string
    etudiant_sexe:string
    etudiant_photo:string | null
}
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
    const { delete: destroy, } = useForm({});
    const [filteredStudent, setFilteredStudent] = useState(groupedEtudiants);
    const [search, setSeach] = useState('')
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);
    const onDelete = (parcours: Parcours) => {
        const confirm = window.confirm(`Attention : L'étudiant ne sera pas supprimé de la base de données, mais sera retiré de l'année scolaire en cours, du niveau ${parcours?.niveau} ainsi que du département ${parcours.departement_name}. Confirmez-vous cette action ?`);

        if (confirm) {
            destroy(route('dashboard.etud.delete', parcours.id), {
                preserveScroll: true,
                onFinish: () => refreshParcours(),
            });
        }
    }
    const refreshParcours = () => {
        router.visit('/dashboard/etudiants', { only: ["groupedEtudiants"] })
    }
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeach(e.target.value);
        const filtered = groupedEtudiants.filter((etd) =>
            etd.etudiant_matricule.toLowerCase().includes(e.target.value.toLowerCase()) ||
            etd.etudiant_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            etd.etudiant_prenom.toLowerCase().includes(e.target.value.toLowerCase()) ||
            etd.niveau.toLowerCase().includes(e.target.value.toLowerCase()) ||
            etd.departement_name.toLowerCase().includes(e.target.value.toLowerCase())

        );

        setFilteredStudent(filtered);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Etudiant" />

            <div className="w-full overflow-x-auto px-4 lg:px-8">
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
                    value={search}
                    onChange={onSearch}
                    className="col-span-3 mb-5 w-1/2"
                    placeholder="Rechercher....."
                    autoComplete="off"
                />

                {/* Section du tableau avec responsive design */}
                <div className="overflow-x-auto w-full">
                    <Table className="table-auto w-full min-w-max border border-gray-300 dark:border-gray-700 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                <TableHead>Matricule</TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead>Prénom</TableHead>
                                <TableHead className="hidden xl:table-cell">Genre</TableHead>
                                <TableHead className="hidden xl:table-cell">Niveau</TableHead>
                                <TableHead className="hidden xl:table-cell">Département</TableHead>
                                <TableHead className="hidden xl:table-cell">Photo</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {groupedEtudiants.length > 0 ? (
                                filteredStudent.map((etud) => (
                                    <TableRow key={etud.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <TableCell>{etud.etudiant_matricule || 'N/A'}</TableCell>
                                        <TableCell>{etud.etudiant_name || 'N/A'}</TableCell>
                                        <TableCell>{etud.etudiant_prenom || 'N/A'}</TableCell>
                                        <TableCell className="hidden xl:table-cell">{etud.etudiant_sexe || 'N/A'}</TableCell>
                                        <TableCell className="hidden xl:table-cell">{etud.niveau || 'N/A'}</TableCell>
                                        <TableCell className="hidden xl:table-cell">{etud.departement_name || 'N/A'}</TableCell>

                                        <TableCell>
                                            {etud.etudiant_photo ? (
                                                <img
                                                    src={`/storage/${etud.etudiant_photo}`}
                                                    alt="Photo de l'étudiant"
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-500">Pas de photo</span>
                                            )}
                                        </TableCell>

                                        <TableCell className="space-x-2 flex  justify-center items-center">
                                            <Link href={`/dashboard/etudiants/${etud.id}/edit`} className="bg-green-500 hover:bg-green-600 p-2 rounded-2xl"><Edit /></Link>
                                            <Button className="bg-red-500 hover:bg-red-600" onClick={() => onDelete(etud)}><Trash2 /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-4">Aucun étudiant trouvé.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>


        </AppLayout>
    );
}
