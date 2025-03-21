import { MultiformStep } from "@/components/MultiStep";
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from '@/types';
import { Head } from "@inertiajs/react"
import { useEffect } from "react";
import { toast } from "sonner";
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Etudiants', href: '/dashboard/etudiants' },
];
interface messageFlash {
    flash: {
        success: string
    }
}
export default function ({ flash }: messageFlash) {
      useEffect(() => {
            if (flash?.success) toast.success(flash.success);
        }, [flash]);

    return <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="New Etudiant" />
        <h1 className="text-center font-bold text-2xl mt-5">Ajouter Un Nouvel Etudiant</h1>
        <MultiformStep/>
    </AppLayout>
}
