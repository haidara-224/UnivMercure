interface propsStatistique{
    nbForum:number,
    nbPost:number,
    nbPostUser:number
}
export default function StatistiqueForum({nbForum,nbPost,nbPostUser}:propsStatistique) {
     const forumStats = {
    sujet: nbForum,
    posts: nbPost,
    users: nbPostUser,

  };
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Object.entries(forumStats).map(([key, value]) => (
            <div key={key} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                    <div className="h-6 w-6 text-white">
                      {/* Icône */}
                      {key === 'sujet' && <span>📌</span>}
                      {key === 'posts' && <span>💬</span>}
                      {key === 'users' && <span>👥</span>}

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
  )
}
