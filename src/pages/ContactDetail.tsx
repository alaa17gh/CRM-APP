import { useParams, useNavigate } from 'react-router-dom'
import { useCRM } from '../context/CRMContext'


function ContactDetail () {

    const { id } = useParams()
    const navigate = useNavigate()
    const { contacts, deals, activities } = useCRM()
    const contact = contacts.find(c => c.id === id)
    const contactDeals = deals.filter(d => d.contactId === id)
    const contactActivities = activities.filter(a => a.contactId === id)

    if (!contact) return <p className="p-6">Contact not found.</p>

    return (
        <div className="p-6">
            <button onClick={() => navigate('/contacts')} 
                className="mb-4 text-sm text-blue-600 hover:underline"
                >
                    ← Back to Contacts
            </button>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                        {contact.name[0]}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{contact.name}</h1>
                        <p className="text-gray-500 text-sm">{contact.company}</p>
                    </div>
                </div>
                    <p className="text-gray-500">📧 {contact.email}</p>
                    <p className="text-gray-500">📞 {contact.phone}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Deals</h2>
                {contactDeals.length === 0 ? (
                    <p className="text-gray-500">No deals found.</p>
                ) : (
                    contactDeals.map(d =>(
                        <div key={d.id} className="bg-white rounded-xl shadow p-4 mb-3">
                            <p className="font-semibold">{d.title}</p>
                            <p className="text-gray-500 text-sm">${d.value.toLocaleString()} - {d.stage}</p>
                        </div>
                    ))
                    )}
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Activities</h2>
                {contactActivities.length === 0 ? (
                    <p className="text-gray-500">No activities found.</p>
                ) : (
                    contactActivities.map(a => (
                        <div key={a.id} className="bg-white rounded-xl shadow p-4 mb-3 flex items-center justify-between">
                            <div>
                                <p className="text-gray-800 text-sm">{a.description}</p>
                                <p className="text-gray-400 text-xs mt-1">{a.date}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                a.type === 'call' ? 'bg-blue-100 text-blue-700' :
                                a.type === 'email' ? 'bg-purple-100 text-purple-700' :
                                a.type === 'meeting' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-600'
                            }`}>
                                {a.type}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ContactDetail
