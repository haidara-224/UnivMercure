import { Suject } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { useState } from "react";

interface PropsSuject {
    Sujet: Suject[];

}

export default function Topics({ Sujet }: PropsSuject) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const paginatedData = Sujet.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
const { delete: destroy, } = useForm({});
    const totalPages = Math.ceil(Sujet.length / itemsPerPage);


    function formatDate(dateInput: unknown): string {
        try {
            let date: Date;

            if (dateInput instanceof Date) {
                date = dateInput;
            } else if (typeof dateInput === 'string' || typeof dateInput === 'number') {
                date = new Date(dateInput);
            } else {
                return 'Date invalide';
            }

            if (isNaN(date.getTime())) {
                return 'Date invalide';
            }

            return date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Erreur de formatage de date:', error);
            return 'Date invalide';
        }
    }

    function formatNumber(num: number): string {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'md';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }
const handleDeleteTopic = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce sujet et toutes ses réponses ?')) {


        destroy(route('dashboard.forum.delete', id), {
            preserveScroll: true,

        });
    }
}



return (
    <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Sujet
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Auteur
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Catégorie
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Likes
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Réponses
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {paginatedData.map((topic) => (
                            <tr key={topic.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 max-w-xs truncate">
                                    {topic.title}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="font-medium">{topic.user.name}</div>
                                    <div className="text-gray-400">{topic.user.email}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {formatDate(topic.created_at)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                        {topic.categoryforum.title}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                    {formatNumber(topic.likes)}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                    {formatNumber(topic.postforums.length)}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <Link href={`/dashboard/forum/post/${topic.id}`} className="text-amber-600 hover:text-amber-900 mr-4">
                                        Voir réponses
                                    </Link>
                                    <button onClick={()=>handleDeleteTopic(topic.id)} className="text-red-600 hover:text-red-900">
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 items-center justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Affichage <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> à{' '}
                        <span className="font-medium">{Math.min(currentPage * itemsPerPage, Sujet.length)}</span> sur{' '}
                        <span className="font-medium">{Sujet.length}</span> résultats
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                            <span className="sr-only">Première</span>
                            «
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === page
                                        ? 'z-10 bg-amber-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                            <span className="sr-only">Dernière</span>
                            »
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </div>
)
}
