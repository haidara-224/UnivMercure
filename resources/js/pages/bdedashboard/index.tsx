
import Dashboard from "@/components/ui/bde/dashboard";
import AppSidebarLayoutBDE from "@/layouts/app/app-sidebarBDE-layout";
import { BreadcrumbItem, Postforums, Suject } from "@/types";
import { Head, usePage } from "@inertiajs/react";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'BDE Dashboard',
        href: '/bde',
    },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    posts:Postforums[];
    forums:Suject[];
}
export default function BDEDashboard() {
   const { posts, forums } = usePage<CustomPageProps>().props;
    return (
          <AppSidebarLayoutBDE breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Documentaliste" />
            <Dashboard forums={forums} posts={posts} />
          </AppSidebarLayoutBDE>

    );
}
