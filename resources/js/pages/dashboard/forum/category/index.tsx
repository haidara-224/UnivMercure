import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, CategorySuject } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react'
import {  PencilIcon, TrashIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/dashboard/forum/category',
    },
    {
        title: 'Catégories',
        href: '#',
    },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    category: CategorySuject[];
}

interface MessageFlash {
    flash: {
        success: string;
    };
}

export default function Page({ flash }: MessageFlash) {
    const { category } = usePage<CustomPageProps>().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                position: 'top-right',
                duration: 3000,
            });
        }
    }, [flash]);

    const handleDeleteCategory = (id: number) => {
        toast('Voulez-vous vraiment supprimer cette catégorie ?', {
            action: {
                label: 'Confirmer',
                onClick: () => {
                    // Ajoutez ici votre logique de suppression
                    console.log('Suppression de la catégorie', id);
                    toast.success('Catégorie supprimée avec succès');
                },
            },
            cancel: {
                label: 'Annuler',
                onClick: () => {}
            },
            duration: 10000,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catégories Forum" />

            <div className="space-y-6">
                {/* En-tête avec bouton d'ajout */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h1>
                    <Link
                        href="/dashboard/forum/category/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                        Ajouter une catégorie
                    </Link>
                </div>

                {/* Tableau amélioré */}
                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Titre
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Auteur
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {category.map((ct) => (
                                    <tr key={ct.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-medium">
                                                    {ct.title.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{ct.title}</div>
                                                    <div className="text-sm text-gray-500">ID: {ct.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs line-clamp-2">
                                                {ct.description || 'Aucune description'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {ct.user?.avatar ? (
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={ct.user.avatar}
                                                        alt={ct.user.name}
                                                    />
                                                ) : (
                                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                                                        {ct.user?.name?.charAt(0).toUpperCase() || '?'}
                                                    </div>
                                                )}
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {ct.user?.name || "Auteur inconnu"}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {ct.user?.email || ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">

                                                <Link
                                                    href={`/dashboard/forum/category/${ct.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                                    title="Modifier"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteCategory(ct.id)}
                                                    className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                                    title="Supprimer"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pied de tableau */}
                <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200 rounded-b-xl">
                    <div className="text-sm text-gray-500">
                        Affichage de <span className="font-medium">1</span> à <span className="font-medium">{category.length}</span> sur <span className="font-medium">{category.length}</span> catégories
                    </div>
                    <nav className="flex space-x-2">
                        <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Précédent
                        </button>
                        <button className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Suivant
                        </button>
                    </nav>
                </div>
            </div>
        </AppLayout>
    )
}
