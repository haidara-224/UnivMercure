

export default function SeetingForum() {
    return (
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
    )
}
