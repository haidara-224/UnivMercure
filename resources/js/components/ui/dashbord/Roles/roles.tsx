import { Roles, User } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../dialog";
import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";

interface ProposDialogue {
    openAddDialogue: boolean;
    onOpenAddChange: (open: boolean) => void;
    user: User | null;
    roles: Roles[];
}

export function Role({ openAddDialogue, onOpenAddChange, user, roles }: ProposDialogue) {
    const [localUser, setLocalUser] = useState<User | null>(user);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLocalUser(user);
    }, [user]);

    const handleRoleChange = async (roleId: number, isChecked: boolean) => {
        if (!localUser) return;
        setLoading(true);

        router.post(
            route("dashboard.users.roles"),
            {
                _method: "put",
                user_id: localUser.id,
                role_id: roleId,
                action: isChecked ? "add" : "revoke",
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setLoading(false);

                    // mettre à jour localement
                    if (isChecked) {
                        const roleToAdd = roles.find((r) => Number(r.id) === Number(roleId));
                        if (roleToAdd && !localUser.roles.some((r) => Number(r.id) === Number(roleId))) {
                            setLocalUser({
                                ...localUser,
                                roles: [...localUser.roles, roleToAdd],
                            });
                        }
                    } else {
                        setLocalUser({
                            ...localUser,
                            roles: localUser.roles.filter((r) => Number(r.id) !== Number(roleId)),
                        });
                    }
                },
            }
        );
    };

    return (
        <Dialog open={openAddDialogue} onOpenChange={onOpenAddChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Gérer les rôles de {localUser?.name}</DialogTitle>
                    <DialogDescription>Attribuez ou révoquez les rôles de l'utilisateur.</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-2">
                    {roles.map((role) => {
                        const hasRole = localUser?.roles.some((r) => r.id === role.id) ?? false;

                        return (
                            <label key={role.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={hasRole}
                                    disabled={loading}
                                    onChange={(e) => handleRoleChange(Number(role.id), e.target.checked)}
                                />
                                <span>{role.name}</span>
                            </label>
                        );
                    })}
                </div>
            </DialogContent>
        </Dialog>
    );
}
