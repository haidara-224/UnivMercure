import { SalleData } from "@/components/ui/dashbord/Salle/salleDataTable";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salles De Classe',
        href: '/dashboard/salles',
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
            <Head title="Salles" />
            <div className="container mt-5">

                <SalleData />
            </div>
        </AppLayout>

    );
}
