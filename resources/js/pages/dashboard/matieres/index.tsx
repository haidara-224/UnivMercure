
import { Matieres } from "@/components/ui/dashbord/Matiere/matiereDataTable";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Matiere',
        href: '/dashboard/matieres',
    },
];

interface messageFlash {
    flash: {
        success: string
    }
}
export default function Page({ flash }: messageFlash){

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Matieres" />
            <div className="container mt-5">

            <Matieres/>

            </div>
        </AppLayout>

    );
}
