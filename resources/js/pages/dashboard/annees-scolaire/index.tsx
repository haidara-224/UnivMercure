import { Button } from "@/components/ui/button";
import { AddAnnees } from "@/components/ui/dashbord/Annees_scolaire/AddAnnees";
import EditDialogueAnnees from "@/components/ui/dashbord/Annees_scolaire/EditDialogueAnnees";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { AnnessScolaire, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Années Scolaire',
        href: '/dashboard/annees-scolaire',
    },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    annees: AnnessScolaire[];
}

interface messageFlash {
    flash: {
        success: string;
    };
}

export default function Page({ flash }: messageFlash) {
    const { annees } = usePage<CustomPageProps>().props;
    const [openAddDialogue, setOpenAddDialogue] = useState(false)
    const [openDialogue, setOpenDialogue] = useState(false)
    const [selectedAnnees, setSelectedAnnees] = useState<AnnessScolaire | null>(null)
    const [filteredAnnees, setFilteredAnnees] = useState(annees);
    const [search, setSeach] = useState('')
    const { delete: destroy, } = useForm({});

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);
      const HanddleEdit = (ann: AnnessScolaire) => {
            setSelectedAnnees(ann)

            setOpenDialogue(true)
        }
    const HanddleOpenAddDialogue = () => {
        setOpenAddDialogue((prev) => !prev)

    }
    const onOpenDialogue = () => {
        setOpenDialogue((prev) => !prev);

    };
    const refresh = () => {
        router.visit('/dashboard/annees-scolaire', { only: ["annees"] })

    };
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeach(e.target.value);
        const filtered = annees.filter((ann) =>
            ann.annee_scolaire.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredAnnees(filtered);
    };
    const onDelete = (annee_scolaire: AnnessScolaire) => {

        const confirm = window.confirm(`Etes vous sure de vouloir Supprimé c'ette années Scolaire ${annee_scolaire.annee_scolaire} ? `)
        if (confirm) {
            destroy(route('dashboard.ann_scolaire.destroy', annee_scolaire.id), {
                preserveScroll: true,
                onFinish: () => refresh(),
            });
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Années Scolaire" />
            <div className="w-full overflow-x-auto px-[5%] lg:px-[2%] max-[460px]:px-[1%] ">
                <h1 className="text-2xl font-bold mb-4 py-9 dark:text-white text-slate-800 font-stretch-ultra-condensed">Liste des Departements</h1>
                <Button className="mb-2" size='lg' onClick={HanddleOpenAddDialogue}><Plus /></Button>
                <Input
                    id="name"
                    value={search}
                    onChange={onSearch}
                    type="text"
                    className="col-span-3 mb-5 w-full lg:w-1/2"
                    placeholder="Rechercher....."
                    autoComplete="off"
                />
                <div className="overflow-x-auto w-full">
                    <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                <TableHead>Années Scolaire</TableHead>
                                <TableHead>Début de l'année</TableHead>
                                <TableHead>Fin de l'année</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAnnees.map((ann) => (
                                <TableRow key={ann.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <TableCell>{ann.annee_scolaire}</TableCell>
                                    <TableCell>{new Date(ann.date_debut).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
                                    }</TableCell>
                                    <TableCell>{new Date(ann.date_fin).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
                                    }</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button className="bg-red-500 hover:bg-red-600" onClick={()=>onDelete(ann)}>
                                            <Trash2 />
                                        </Button>
                                        <Button className="bg-green-500 hover:bg-green-600" onClick={() => HanddleEdit(ann)}>
                                            <Edit />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                  <EditDialogueAnnees open={openDialogue} onClose={onOpenDialogue} anneeScolaire={selectedAnnees} refresh={refresh}  />
                <AddAnnees openAddDialogue={openAddDialogue} onOpenAddChange={HanddleOpenAddDialogue} refresh={refresh} />
            </div>

        </AppLayout>
    );
}
