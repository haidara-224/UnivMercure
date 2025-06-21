

export default function RepportForum() {
      const reportedPosts = [
    { id: 1, content: "Ce message contient des propos inappropriés...", reason: "Langage offensant", reporter: "Modérateur1", status: "En attente" },
    { id: 2, content: "Spam répété dans plusieurs discussions", reason: "Spam", reporter: "Modérateur2", status: "Traité" },
  ];

  return (
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
  )
}
