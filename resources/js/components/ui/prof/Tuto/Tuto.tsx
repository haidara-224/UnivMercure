import { usePage } from "@inertiajs/react";
import { AddTuto } from "./AddTuto";
import { Departement, Niveaux } from "@/types";
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    departement: Departement[],
    niveau:Niveaux[]

}
export function TutoComponent() {
     const { departement,niveau } = usePage<CustomPageProps>().props;
    return (
        <>
           <section>
            <AddTuto departement={departement} niveau={niveau}/>
           </section>
        </>
    )
}
