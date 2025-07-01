
import ForumAdmin from '@/components/ui/dashbord/Forum/forum';

import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem,  Suject } from '@/types';
import { Head, usePage } from '@inertiajs/react'
import { useEffect } from 'react';
import { toast } from 'sonner';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/dashboard/forum',
    },
];
interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    sujet: Suject[];
    nbForum:number,
    nbPost:number,
    nbPostUser:number,

}
interface messageFlash {
    flash: {
        success: string
    }
}
export default function Page({ flash }: messageFlash) {
        const { sujet,nbForum,nbPost,nbPostUser } = usePage<CustomPageProps>().props;
        useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

  return (
     <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="container mt-5">


            <ForumAdmin sujet={sujet} nbForum={nbForum} nbPost={nbPost} nbPostUser={nbPostUser}/>

            </div>
        </AppLayout>
  )
}
