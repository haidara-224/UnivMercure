import  CalendarEmploi  from "@/components/ui/dashbord/Emploie_temps/CalenderEmploie";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

import { useEffect } from "react";
import { toast } from "sonner";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Emploie Du Temps',
        href: '/dashboard/emploie-du-temps',

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
            <Head title="Emploie du Temps" />
            <div className="container mt-5">
                <CalendarEmploi/>

            </div>
        </AppLayout>

    );
}
