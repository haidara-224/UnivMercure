import AppLayout from "@/layouts/app-layout";
import { Head, router, useForm, usePage } from "@inertiajs/react"
import { faculty, type BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditDialogueFaculty } from "@/components/ui/dashbord/EditFaculty";
import { toast } from "sonner";
import AddFacultie from "@/components/ui/dashbord/AddFaculty";
import { Input } from "@/components/ui/input";



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Faculty',
        href: '/dashboard/faculty',
    },
];
interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    faculty: faculty[];
}
interface messageFlash {
    flash: {
        success: string
    }
}
export default function Page({ flash }: messageFlash) {
    const { faculty } = usePage<CustomPageProps>().props;
    const [openDialogue, setOpenDialogue] = useState(false)
    const [openAddDialogue, setOpenAddDialogue] = useState(false)
    const [selectedFaculty, setSelectedFaculty] = useState<faculty | null>(null)
    const [filteredFaculty, setFilteredFaculty] = useState(faculty);
    const [search, setSeach] = useState('')
    const { delete: destroy,  } = useForm({});
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);


    const onOpenDialogue = () => {
        setOpenDialogue((prev) => !prev);

    };
    const HanddleEdit = (fc: faculty) => {
        setSelectedFaculty(fc)

        setOpenDialogue(true)
    }
    useEffect(() => { }, [faculty]);
    const HanddleOpenAddDialogue = () => {
        setOpenAddDialogue((prev) => !prev)

    }
    const onDelete = (faculty: faculty) => {

        const confirm = window.confirm(`Etes vous sure de vouloir Supprimé la faculté ${faculty.name} ? `)
        if (confirm) {
            destroy(route('dashboard.faculty.delete', faculty.id), {
                preserveScroll: true,
                onFinish: () => refreshFaculty(),
            });
        }
    }
    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeach(e.target.value);
        const filtered = faculty.filter((fc) =>
            fc.name.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setFilteredFaculty(filtered);
    };
    const refreshFaculty = () => {
        router.visit('/dashboard/faculty',{only:["faculty"]})

    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Faculty" />

            <div className="w-full overflow-x-auto px-[5%] lg:px-[2%] max-[460px]:px-[1%] ">
                <h1 className="text-2xl font-bold mb-4 py-9 dark:text-white text-slate-800 font-stretch-ultra-condensed">Liste des Faculté</h1>
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
                                <TableHead>Faculty Name</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFaculty.map((fc) => (
                                <TableRow key={fc.id} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <TableCell>{fc.name}</TableCell>
                                    <TableCell className=" space-x-2">
                                        <Button className="bg-green-500 hover:bg-green-600" onClick={() => HanddleEdit(fc)}><Edit /></Button>
                                        <Button className="bg-red-500 hover:bg-red-600" onClick={() => onDelete(fc)}><Trash2 /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <EditDialogueFaculty open={openDialogue} onOpenChange={onOpenDialogue} faculty={selectedFaculty} refresh={refreshFaculty} />
                    <AddFacultie openAddDialogue={openAddDialogue} onOpenAddChange={HanddleOpenAddDialogue} refresh={refreshFaculty} />
                </div>
            </div>
        </AppLayout>
    );
}
