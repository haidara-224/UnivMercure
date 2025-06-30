
import AppSidebarLayoutBDE from '@/layouts/app/app-sidebarBDE-layout';
import { BreadcrumbItem, Suject } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum BDE',
        href: '/bde/forums/',
    },
    {
        title: 'Détail du sujet',
        href: '#',
    },
];

interface PageProps {
    [key: string]: unknown;
}

interface CustomPageProps extends PageProps {
    sujet: Suject;
    totalLikesForum:number
}

function formatNumber(num: number): string {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'md';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}
interface messageFlash {
    flash: {
        success: string
    }
}
export default function Page({ flash }: messageFlash) {
    const { sujet,totalLikesForum } = usePage<CustomPageProps>().props;
    const [filter, setFilter] = useState<'all' | 'recent' | 'flagged'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const { delete: destroy, } = useForm({});
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

    }, [flash]);


    const filteredPosts = sujet.postforums.filter(post => {
        if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    const handleDeletePost = (postId: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce sujet et toutes ses réponses ?')) {


            destroy(route('bde.post.delete', postId), {
                preserveScroll: true,

            });
        }
    };



    return (
        <AppSidebarLayoutBDE breadcrumbs={breadcrumbs}>
            <Head title={`BDE - ${sujet.title}`} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-6 bg-white shadow rounded-lg p-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 text-sm font-medium rounded-md ${filter === 'all' ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            Toutes les réponses
                        </button>

                    </div>

                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Rechercher dans les réponses..."
                            className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                    <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{sujet.title}</h1>
                            <div className="mt-2 flex items-center space-x-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                    {sujet.categoryforum.title}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Posté {formatDistanceToNow(new Date(sujet.created_at), { addSuffix: true, locale: fr })}
                                </span>

                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="text-center">
                                <span className="block text-sm font-medium text-gray-500">Réponses</span>
                                <span className="block text-lg font-semibold text-gray-900">{formatNumber(sujet.postforums.length)}</span>
                            </div>

                        </div>
                    </div>
                    <div className="px-6 py-5">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src={sujet.user.avatar || `https://ui-avatars.com/api/?name=${sujet.user.name}&background=random`}
                                    alt={sujet.user.name}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">
                                        {sujet.user.name}
                                        <span className="ml-2 text-xs text-gray-500">{sujet.user.email}</span>
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        Membre depuis {new Date(sujet.user.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>

                                <div className="mt-4 flex items-center space-x-4">
                                    <span className="inline-flex items-center text-sm text-gray-600">
                                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        {formatNumber(totalLikesForum)} J'aime
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">
                            {filteredPosts.length} {filteredPosts.length > 1 ? 'Réponses' : 'Réponse'} {filter !== 'all' && `(filtrées)`}
                        </h2>
                        {filteredPosts.length !== sujet.postforums.length && (
                            <button
                                onClick={() => {
                                    setFilter('all');
                                    setSearchQuery('');
                                }}
                                className="text-sm text-amber-600 hover:text-amber-900"
                            >
                                Réinitialiser les filtres
                            </button>
                        )}
                    </div>

                    {filteredPosts.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {filteredPosts.map((post) => (
                                <div key={post.id} className="px-6 py-5" >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={post.user?.avatar || `https://ui-avatars.com/api/?name=${post.user.name}&background=random`}
                                                alt={post.user.name}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {post.user.name}
                                                    {post.user.id === sujet.user.id && (
                                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                            Auteur
                                                        </span>
                                                    )}

                                                </p>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs text-gray-500">
                                                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: fr })}
                                                    </span>
                                                    <button
                                                        onClick={() => handleDeletePost(post.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Supprimer cette réponse"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-700">
                                                {post.content}
                                            </div>
                                            <div className="mt-3 flex items-center space-x-4">
                                                <span className="inline-flex items-center text-xs text-gray-600">
                                                    <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                    </svg>
                                                    {formatNumber(post.total_likes)} J'aime
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune réponse trouvée</h3>
                            <p className="mt-1 text-sm text-gray-500">Aucune réponse ne correspond à vos critères de recherche.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppSidebarLayoutBDE>
    )
}
