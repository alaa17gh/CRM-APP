import { useParams, useNavigate } from 'react-router-dom'
import { useCRM } from '../context/CRMContext'

function DealDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { deals, contacts } = useCRM()

    const deal = deals.find(d => d.id === id)
    const contact = contacts.find(c => c.id === deal?.contactId)

    if (!deal) return <p className="p-6">Deal not found.</p>

    return (
        <div className="p-6">
            <button
             onClick={() => navigate('/deals')}
             className="mb-4 text-sm text-blue-600 hover:underline"
            >
                ← Back to Deals
            </button>
            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{deal.title}</h1>
                <p className="text-gray-600">💰 ${deal.value.toLocaleString()}</p>
                <p className="text-gray-600">📅 {deal.createdAt}</p>
                <p className="text-gray-600">👤 {contact?.name}</p>
           <div className="mt-3">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    deal.stage === 'closed-won' ? 'bg-green-100 text-green-700' :
                    deal.stage === 'closed-lost' ? 'bg-red-100 text-red-700' :
                    deal.stage === 'proposal' ? 'bg-blue-100 text-blue-700' :
                    deal.stage === 'negotiation' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                }`}>
                    {deal.stage}
                </span>
            </div>
         </div>
        </div>
    )
}

export default DealDetail