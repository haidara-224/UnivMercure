import { AddCategoryForum } from '@/components/ui/dashbord/CategoryForum/AddCategoryForum';
import EditDialogueForumCategory from '@/components/ui/dashbord/CategoryForum/EditCategoryForum';
import { Input } from '@/components/ui/input';
import AppSidebarLayoutBDE from '@/layouts/app/app-sidebarBDE-layout';

import { BreadcrumbItem, CategorySuject } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react'
import { PencilIcon, TrashIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/bde/forum/category',
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
    const { delete: destroy } = useForm({});
    const [openDialogue, setOpenDialogue] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategorySuject | null>(null);
    const [search, setSearch] = useState('');

    const [filter, setFilter] = useState<CategorySuject[]>(category);

    useEffect(() => {
        setFilter(category);
    }, [category]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                position: 'top-right',
                duration: 3000,
            });
        }
    }, [flash]);

    const onOpenDialogue = () => {
        setOpenDialogue((prev) => !prev);
    };

    const handleEdit = (ct: CategorySuject) => {
        setSelectedCategory(ct);
        setOpenDialogue(true);
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (!value) {
            setFilter(category);
            return;
        }

        const filtered = category.filter((c) =>
            c.title.toLowerCase().includes(value.toLowerCase()) ||
            (c.description && c.description.toLowerCase().includes(value.toLowerCase()))
        );
        setFilter(filtered);
    };

    const handleDeleteCategory = (id: number) => {
        toast('Voulez-vous vraiment supprimer cette catégorie ?', {
            action: {
                label: 'Confirmer',
                onClick: () => {
                    destroy(route('dashboard.categoryForum.delete', id), {
                        preserveScroll: true,
                        onSuccess: () => {
                            toast.success('Catégorie supprimée avec succès');
                        },
                        onError: () => {
                            toast.error('Erreur lors de la suppression');
                        }
                    });
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
        <AppSidebarLayoutBDE breadcrumbs={breadcrumbs}>
            <Head title="Catégories Forum" />
            <EditDialogueForumCategory
                open={openDialogue}
                onClose={onOpenDialogue}
                categoryForum={selectedCategory}
            />

            <div className="space-y-6">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h1>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

                        <AddCategoryForum  />
                    </div>
                </div>
                <div className="relative flex-1 m-5">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                id="search"
                                value={search}
                                onChange={onSearch}
                                type="text"
                                placeholder="Rechercher une catégorie..."
                                className="pl-10 w-full"
                            />
                        </div>

                {/* Tableau */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden m-5">
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
         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Eloji
                                    </th>

                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filter.length > 0 ? (
                                    filter.map((ct) => (
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
                                                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
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
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs line-clamp-2">
                                                    {ct.emoji || 'Aucun emoji'}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(ct)}
                                                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCategory(ct.id)}
                                                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                            {search ?
                                                "Aucune catégorie ne correspond à votre recherche" :
                                                "Aucune catégorie disponible"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pied de tableau */}
                    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                            Affichage de <span className="font-medium">1</span> à <span className="font-medium">{filter.length}</span> sur <span className="font-medium">{category.length}</span> catégories
                        </div>
                        {filter.length > 0 && (
                            <nav className="flex space-x-2">
                                <button
                                    className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
                                    disabled
                                >
                                    Précédent
                                </button>
                                <button
                                    className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 disabled:opacity-50"
                                    disabled
                                >
                                    Suivant
                                </button>
                            </nav>
                        )}
                    </div>
                </div>
            </div>
        </AppSidebarLayoutBDE>
    )
}
