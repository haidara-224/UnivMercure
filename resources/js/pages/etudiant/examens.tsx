
import { NavTabsExams } from "@/components/NavTabsExam";
import ExamensClass from "@/components/ui/etudiant/ExamensClass";
import ExamensStutend from "@/components/ui/etudiant/ExamensStutend";
import AppSidebarLayoutEtudiant from "@/layouts/app/app-sidebarEtud-layout";
import { BreadcrumbItem, ExamensByClasse } from "@/types";
import { Head, usePage } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Accueil", href: "/" },
    { title: "Examens", href: "/etudiant/examens" },
];
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {

    examens:ExamensByClasse[]

}
export default function Examens() {
    const { examens } = usePage<CustomPageProps>().props;
    return (
        <AppSidebarLayoutEtudiant breadcrumbs={breadcrumbs}>
            <Head title="Mes Examens" />
            <NavTabsExams
                childrenByTab={{
                    'nav-1': <ExamensClass examens={examens} />,
                    'nav-2': <ExamensStutend />,
                }}
            />
        </AppSidebarLayoutEtudiant>
    );
}
