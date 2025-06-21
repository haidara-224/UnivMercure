import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ForumAdmin() {
  const [activeTab, setActiveTab] = useState('topics');
  const [searchQuery, setSearchQuery] = useState('');

  // Données simulées
  const forumStats = {
    topics: 1243,
    posts: 5689,
    users: 842,
    reports: 12,
  };

  const recentTopics = [
    { id: 1, title: 'Problème avec les inscriptions', author: 'Jean Dupont', date: '2023-05-15', replies: 24, views: 156, pinned: true },
    { id: 2, title: 'Question sur les cours de mathématiques', author: 'Marie Curie', date: '2023-05-14', replies: 12, views: 89, pinned: false },
    { id: 3, title: 'Bug dans le système de notation', author: 'Pierre Admin', date: '2023-05-13', replies: 8, views: 120, pinned: true },
  ];

  const reportedPosts = [
    { id: 1, content: "Ce message contient des propos inappropriés...", reason: "Langage offensant", reporter: "Modérateur1", status: "En attente" },
    { id: 2, content: "Spam répété dans plusieurs discussions", reason: "Spam", reporter: "Modérateur2", status: "Traité" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head title="Administration du Forum" />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Administration du Forum</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Statistiques */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(forumStats).map(([key, value]) => (
            <div key={key} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                    <div className="h-6 w-6 text-white">
                      {/* Icône */}
                      {key === 'topics' && <span>📌</span>}
                      {key === 'posts' && <span>💬</span>}
                      {key === 'users' && <span>👥</span>}
                      {key === 'reports' && <span>⚠️</span>}
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate capitalize">
                      {key}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {value}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Barre d'onglets */}
        <Link href='/category-forum'>Category Forum</Link>
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['topics', 'users', 'reports', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              className="focus:ring-amber-500 focus:border-amber-500 block w-full pl-4 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
              placeholder={`Rechercher ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">🔍</span>
            </div>
          </div>
        </div>

        {/* Contenu des onglets */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {activeTab === 'topics' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sujet
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Auteur
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Réponses
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vues
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTopics.map((topic) => (
                    <tr key={topic.id} className={topic.pinned ? 'bg-amber-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {topic.pinned && (
                            <span className="mr-2 text-amber-500">📌</span>
                          )}
                          <div className="text-sm font-medium text-gray-900">{topic.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {topic.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {topic.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {topic.replies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {topic.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-amber-600 hover:text-amber-900 mr-3">
                          Éditer
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-4 p-6">
              {reportedPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Signalement #{post.id}</h3>
                      <p className="text-sm text-gray-500">Raison: {post.reason}</p>
                      <p className="mt-2 text-gray-700">{post.content}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
                      Ignorer
                    </button>
                    <button className="px-3 py-1 bg-amber-500 text-white rounded-md text-sm">
                      Modérer
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-6">
              <p className="text-gray-500">Gestion des utilisateurs du forum</p>
              {/* Contenu pour la gestion des utilisateurs */}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres du forum</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                    Activer les notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                    Modération avant publication
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
