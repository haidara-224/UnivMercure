import { Button } from "@/components/ui/button";
import {  Bell, BellRing, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {  usePage, router } from "@inertiajs/react";
import { Badge } from "./ui/badge";

// Type pour les notifications
type Notification = {
    id: number;
    data: {
       etudiant_id: number;
       etudiant_nom: string;
       type_document: string;
       comment: string;
       statut: string;
       message: string;
       time: string;


    };
    read_at: string | null;
    created_at: string;
};
interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    notifications: Notification[];
}

export function NotificationButton() {

    const { notifications } = usePage<CustomPageProps>().props;

    const [, setNotifications] = useState<Notification[]>(notifications || []);
    useEffect(() => {
        setNotifications(notifications || []);

    }, [notifications]);

    const unreadCount = notifications.filter(n => n.read_at === null).length;

    const markAsRead = (id: number) => {
        router.post(`/documentaliste/${id}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setNotifications(notifications.map(n =>
                    n.id === id ? { ...n, read_at: new Date().toISOString() } : n
                ));
            }
        });
    };


    return (
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="flex w-full items-center justify-end gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="relative">
                            {unreadCount > 0 ? (
                                <BellRing className="h-5 w-5" />
                            ) : (
                                <Bell className="h-5 w-5" />
                            )}
                            {unreadCount > 0 && (
                                <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center rounded-full p-0">
                                    {unreadCount}
                                </Badge>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end" forceMount>
                        <div className="flex items-center justify-between border-b px-4 py-3">
                            <h4 className="text-sm font-medium">Notifications</h4>

                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                            {notifications.length > 0 ? (
                                [...notifications]
                                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                                    .map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-start border-b p-4 ${!notification.read_at ? 'bg-muted/50' : ''}`}
                                        >
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm" >{notification.data.type_document} -{notification.data.etudiant_nom}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            {!notification.read_at && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => markAsRead(notification.id)}
                                                >
                                                    <X className="h-3 w-3 opacity-50" />
                                                </Button>
                                            )}
                                        </div>
                                    ))
                            ) : (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    Aucune notification
                                </div>
                            )}
                        </div>

                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
