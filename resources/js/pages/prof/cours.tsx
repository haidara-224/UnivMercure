import { type BreadcrumbItem } from '@/types';
import AppSidebarLayoutProf from "@/layouts/app/app-sidebarProf-layout";
import { Head, } from "@inertiajs/react";
import { NavTabs } from '@/components/navTabs';
import { TutoComponent } from '@/components/ui/prof/Tuto/Tuto';
import { ProgressionComponent } from '@/components/ui/prof/Progression';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'cours',
        href: '/prof/cours',
    },
];

export default function Page() {

    return (<>
        <AppSidebarLayoutProf breadcrumbs={breadcrumbs}>
            <Head title="cours" />
            <NavTabs
                childrenByTab={{
                    'nav-1': <TutoComponent />,
                    'nav-2': <ProgressionComponent />,
                }}
            />



        </AppSidebarLayoutProf>
    </>)
}
