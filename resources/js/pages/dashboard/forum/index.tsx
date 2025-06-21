import ForumAdmin from '@/components/ui/dashbord/Forum/forum';

import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react'
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/dashboard/forum',
    },
];

export default function Page() {
  return (
     <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="container mt-5">

            <ForumAdmin/>

            </div>
        </AppLayout>
  )
}
