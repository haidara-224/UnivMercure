
import { Button } from "@/components/ui/button";
import { Role } from "@/components/ui/dashbord/Roles/roles";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Roles, User } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Utilisateurs',
        href: '/dashboard/users',
    },
];

interface messageFlash {
    flash: {
        success: string
    }
}
interface PageProps {
    [key: string]: unknown;
}
interface CustomPageProps extends PageProps {
    users: User[];
    roles: Roles[];

}
export default function Page({ flash }: messageFlash){
  const { users, roles } = usePage<CustomPageProps>().props;
  const [openDialogue, setOpenDialogue] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const HanddleOpenDialogue = () => {
        setOpenDialogue((prev) => !prev)
    }
     const HanddleRoles = (user: User) => {
            setSelectedUser(user)
            setOpenDialogue(true)
        }
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Utilisateurs" />
            <div className="container mt-5">

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>

                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>

                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.roles.map(role => role.name).join(', ')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                         <Button className="bg-green-500 hover:bg-green-600" onClick={() => HanddleRoles(user)}><Edit /></Button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Role openAddDialogue={openDialogue} onOpenAddChange={HanddleOpenDialogue} user={selectedUser} roles={roles} />
        </AppLayout>

    );
}
