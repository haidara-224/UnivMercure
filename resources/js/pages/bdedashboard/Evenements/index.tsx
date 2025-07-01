import Evenement from "@/components/ui/bde/Events/Evenement";
import AppSidebarLayoutBDE from "@/layouts/app/app-sidebarBDE-layout";
import { BreadcrumbItem, Evenements } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Evenements',
        href: '/bde/evenements',
    },

];
interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    evenements: Evenements[];
}
interface MessageFlash {
    flash: {
        success: string;
    };
}

export default function Page({ flash }: MessageFlash) {
      const { evenements } = usePage<CustomPageProps>().props;
        useEffect(() => {
              if (flash?.success) {
                  toast.success(flash.success, {
                      position: 'top-right',
                      duration: 3000,
                  });
              }
          }, [flash]);
    return (
         <AppSidebarLayoutBDE breadcrumbs={breadcrumbs}>
            <Head title="Evenements" />
            <Evenement evenements={evenements} />
        </AppSidebarLayoutBDE>
    );
}
