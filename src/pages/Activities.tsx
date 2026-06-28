import { useCRM } from '../context/CRMContext'
import { Link } from 'react-router-dom'

function Activities() {
    const { activities, contacts } = useCRM()

    return(
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
                <Link
                    to="/activities/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                >
                    + Add Activity
                </Link>
            </div>
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-900 text-white text-left">
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Contact</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-12 text-gray-400">
                                    No activities yet.
                                </td>
                            </tr>
                        ) : (
                            activities.map(a => {
                                const contact = contacts.find(c =>c.id === a.contactId)
                                return (
                                    <tr key={a.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                              a.type === 'call' ? 'bg-blue-100 text-blue-700' :
                                              a.type === 'email' ? 'bg-purple-100 text-purple-700' :
                                              a.type === 'meeting' ? 'bg-yellow-100 text-yellow-700' :
                                              'bg-gray-100 text-gray-600'
                                            }`}>
                                                {a.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{a.description}</td>
                                        <td className="px-4 py-3">{contact?.name}</td>
                                        <td className="px-4 py-3">{a.date}</td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Activities
