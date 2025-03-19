import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { professeur, type BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AddProfesseur } from "@/components/ui/dashbord/Professeur/AddProfesseur";
import { UpdateProfesseur } from "@/components/ui/dashbord/Professeur/UpdateProfesseur";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Professeurs',
        href: '/dashboard/professeurs',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    professeurs: professeur[];


}
interface messageFlash {
    flash: {
        success: string
    }
}
export default function Page({ flash }: messageFlash) {
    const { professeurs } = usePage<CustomPageProps>().props;
    const [search, setSeach] = useState('')
    const [filter, setFilter] = useState(professeurs)
    const { delete: destroy, } = useForm({});
    const [openAddDialogue, setOpenAddDialogue] = useState(false)
    const [openDialogue, setOpenDialogue] = useState(false)
     const [selectedProfesseur, setSelectedProfesseur] = useState<professeur | null>(null)
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeach(e.target.value);
        const filtered = professeurs.filter((fc) =>
            fc.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            fc.matricule.toLowerCase().includes(e.target.value.toLowerCase()) ||
            fc.prenom.toLowerCase().includes(e.target.value.toLowerCase())

        );

        setFilter(filtered);
    };
    const refreshFaculty = () => {
        router.visit('/dashboard/professeurs', { only: ["professeurs"] })

    };
    const HanddleOpenAddDialogue = () => {
        setOpenAddDialogue((prev) => !prev)
    }
    const HanddleOpenDialogue = () => {
        setOpenDialogue((prev) => !prev)
    }
    const onDelete = (prof: professeur) => {

        const confirm = window.confirm(`Etes vous sure de vouloir Supprimé  ${prof.name} ${prof.prenom} : matricule: ${prof.matricule} ? `)
        if (confirm) {
            destroy(route('dashboard.prof.delete', prof.id), {
                preserveScroll: true,
                onFinish: () => refreshFaculty(),
            });
        }
    }
    const HanddleEdit = (pr: professeur) => {
        setSelectedProfesseur(pr)

        setOpenDialogue(true)
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Professeur" />
            <div className="w-full overflow-x-auto px-[5%] lg:px-[2%] max-[460px]:px-[1%] ">
                <h1 className="text-2xl font-bold mb-4 py-9 dark:text-white text-slate-800 font-stretch-ultra-condensed">Liste des Professeurs</h1>

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

                    <Table className="w-full min-w-max border border-gray-300 dark:border-gray-700 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                        <TableHeader>
                            <TableRow className="bg-gray-100 dark:bg-gray-800">
                                <TableHead>Matricule</TableHead>
                                <TableHead>Prenom</TableHead>
                                <TableHead>Nom</TableHead>
                                <TableHead>Téléphone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Photo</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filter.map((pr) => (
                                <TableRow key={pr.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <TableCell>{pr.matricule}</TableCell>
                                    <TableCell>{pr.name}</TableCell>
                                    <TableCell>{pr.prenom}</TableCell>
                                    <TableCell>{pr.telephone}</TableCell>
                                    <TableCell>{pr?.user?.email ? pr?.user?.email : 'Pas de compte Associé'
                                    }</TableCell>
                                    <TableCell>
                                        {pr.photo ? (
                                            <img
                                                src={`/storage/${pr.photo}`}
                                                alt="Photo du professeur"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-500">Pas de photo</span>
                                        )}
                                    </TableCell>
                                    <TableCell className=" space-x-2">

                                             <Button className="bg-green-500 hover:bg-green-600" onClick={() => HanddleEdit(pr)}><Edit /></Button>


                                        <Button className="bg-red-500 hover:bg-red-600" onClick={() => onDelete(pr)}><Trash2 /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <AddProfesseur openAddDialogue={openAddDialogue} onOpenAddChange={HanddleOpenAddDialogue} refresh={refreshFaculty} />

                        <UpdateProfesseur openDialogue={openDialogue} onOpenChange={HanddleOpenDialogue} professeur={selectedProfesseur} refresh={refreshFaculty} />

                </div>
            </div>
        </AppLayout>
    )
}
