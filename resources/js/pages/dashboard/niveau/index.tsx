import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { Niveaux, type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import {  Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Niveau',
        href: '/dashboard/niveau',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    niveau: Niveaux[];
}
interface messageFlash {
    flash: {
        success: string
    }
}
export default function Page({ flash }: messageFlash) {
    const { niveau } = usePage<CustomPageProps>().props;
        const [search, setSeach] = useState('')
        const [filteredNiveau, setFilteredNiveau] = useState(niveau);
        const { delete: destroy,  } = useForm({});
        useEffect(() => {
            if (flash?.success) {
                toast.success(flash.success);
            }
        }, [flash]);
          const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
                setSeach(e.target.value);
                const filtered = niveau.filter((fc) =>
                    fc.niveau.toLowerCase().includes(e.target.value.toLowerCase()) ||
                fc.departement.name.toLowerCase().includes(e.target.value.toLowerCase())

                );

                setFilteredNiveau(filtered);
            };
            const refreshFaculty = () => {
                router.visit('/dashboard/faculty',{only:["faculty"]})

            };
            const onDelete = (niveau: Niveaux) => {

                const confirm = window.confirm(`Etes vous sure de vouloir Supprimé le niveau ${niveau.niveau} ? `)
                if (confirm) {
                    destroy(route('dashboard.niveau.delete', niveau.id), {
                        preserveScroll: true,
                        onFinish: () => refreshFaculty(),
                    });
                }
            }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Faculty" />
            <div className="w-full overflow-x-auto px-[5%] lg:px-[2%] max-[460px]:px-[1%] ">
                <h1 className="text-4xl font-bold mb-4 py-9 dark:text-white text-slate-800 font-stretch-ultra-condensed">Liste des Faculté</h1>
                {
                    /*
                <Button className="mb-2" size='lg' onClick={HanddleOpenAddDialogue}><Plus /></Button>

                    */
                }
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

                    <Table className="w-full min-w-max border border-gray-300 dark:border-gray-700 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                <TableHead>Niveau</TableHead>
                                <TableHead>Departement</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredNiveau.map((nv) => (
                                <TableRow key={nv.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <TableCell>{nv.niveau}</TableCell>
                                    <TableCell>{nv.departement.name}</TableCell>
                                    <TableCell className=" space-x-2">
                                        {
                                            /*
                                             <Button className="bg-green-500 hover:bg-green-600" onClick={() => HanddleEdit(fc)}><Edit /></Button>
                                            */
                                        }

                                        <Button className="bg-red-500 hover:bg-red-600" onClick={() => onDelete(nv)}><Trash2 /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {
                        /*
                        <EditDialogueFaculty open={openDialogue} onOpenChange={onOpenDialogue} faculty={selectedFaculty} refresh={refreshFaculty} />
                    <AddFacultie openAddDialogue={openAddDialogue} onOpenAddChange={HanddleOpenAddDialogue} refresh={refreshFaculty} />
                     </div>
                        */
                    }

                </div>
                </div>
        </AppLayout>
    )
}


