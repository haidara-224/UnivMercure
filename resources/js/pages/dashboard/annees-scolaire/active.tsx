import AppLayout from "@/layouts/app-layout";
import { AnnessScolaire, BreadcrumbItem } from "@/types";
import { Head, router,  usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Années Scolaire',
        href: '/dashboard/annees-scolaire/active',
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
    const [activeYears, setActiveYears] = useState<AnnessScolaire[]>(annees);


    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    const toggleActive = (id: number) => {
        router.patch(`/dashboard/annees-scolaire/active/${id}`)
         setActiveYears(prev =>
            prev.map(year => ({
                ...year,
                isActive: year.id === id
            }))
        );

    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Années Scolaire" />

            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Gestion des Années Scolaires</h2>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead className="w-[200px]">Année Scolaire</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {activeYears.map((annee) => (
                                <TableRow key={annee.id}>
                                    <TableCell className="font-medium">
                                        {annee.annee_scolaire}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={annee.isActive ? "default" : "secondary"}
                                            className={annee.isActive ? "bg-green-500 hover:bg-green-600" : ""}
                                        >
                                            {annee.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Switch
                                            checked={annee.isActive}
                                            onCheckedChange={() => toggleActive(annee.id)}
                                            className="data-[state=checked]:bg-green-500"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    <p>Utilisez le switch pour activer ou désactiver une année scolaire.</p>
                </div>
            </div>
        </AppLayout>
    )
}
