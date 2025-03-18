import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Departement, faculty, professeur, type BreadcrumbItem } from '@/types';

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddDepartement from "@/components/ui/dashbord/AddDepartement";
import { EditDialogueDepartement } from "@/components/ui/dashbord/EditDepartement";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Departement',
        href: '/dashboard/departement',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    departement: Departement[];
    chefdpt:professeur[],
    faculty:faculty[]
}
interface messageFlash {
    flash: {
        success: string
    }
}
export default function Page({ flash }: messageFlash) {
    const { departement,chefdpt,faculty } = usePage<CustomPageProps>().props;
  const [openDialogue, setOpenDialogue] = useState(false)
      const [openAddDialogue, setOpenAddDialogue] = useState(false)
      const [selectedFaculty, setSelectedFaculty] = useState<Departement | null>(null)
      const [filteredFaculty, setFilteredFaculty] = useState(departement);

      const [search, setSeach] = useState('')
      const { delete: destroy,  } = useForm({});
      useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);
    useEffect(() => { }, [departement]);
    const onOpenDialogue = () => {
        setOpenDialogue((prev) => !prev);

    };
    const HanddleEdit = (dpt: Departement) => {
        setSelectedFaculty(dpt)

        setOpenDialogue(true)
    }
    useEffect(() => { }, [departement]);
    const HanddleOpenAddDialogue = () => {
        setOpenAddDialogue((prev) => !prev)

    }
    const onDelete = (departement: Departement) => {

        const confirm = window.confirm(`Etes vous sure de vouloir Supprimé le departement ${departement.name} ? `)
        if (confirm) {
            destroy(route('dashboard.departement.delete', departement.id), {
                preserveScroll: true,
                onFinish: () => refreshFaculty(),
            });
        }
    }
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeach(e.target.value);
        const filtered = departement.filter((dpt) =>
            dpt.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            dpt.professeur.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            dpt.faculty.name.toLowerCase().includes(e.target.value.toLowerCase())

        );

        setFilteredFaculty(filtered);
    };
       const refreshFaculty = () => {
            router.visit('/dashboard/departement',{only:["departement"]})

        };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Departement" />
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
                                <TableHead>Departement Name</TableHead>
                                <TableHead className="hidden xl:table-cell">Chef Dept</TableHead>
                                <TableHead className="hidden lg:table-cell">Faculty</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFaculty.map((dpt) => (
                                <TableRow key={dpt.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <TableCell>{dpt.name}</TableCell>
                                    <TableCell className="hidden xl:table-cell">{dpt.professeur.name}</TableCell>
                                    <TableCell className="hidden xl:table-cell">{dpt.faculty.name}</TableCell>

                                    <TableCell className="space-x-2">
                                        <Button className="bg-green-500 hover:bg-green-600" onClick={() => HanddleEdit(dpt)}><Edit /></Button>
                                        <Button className="bg-red-500 hover:bg-red-600" onClick={() => onDelete(dpt)}><Trash2 /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                         <EditDialogueDepartement open={openDialogue} onOpenChange={onOpenDialogue} departement={selectedFaculty} refresh={refreshFaculty} chefdpt={chefdpt} faculty={faculty} />
                    <AddDepartement openAddDialogue={openAddDialogue} onOpenAddChange={HanddleOpenAddDialogue} refresh={refreshFaculty} chefdpt={chefdpt} faculty={faculty}/>




                </div>
            </div>
        </AppLayout>
    )


}
