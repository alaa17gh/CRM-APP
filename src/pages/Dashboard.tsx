import { useCRM } from '../context/CRMContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function Dashboard() {
  const { contacts, deals } = useCRM()

  const totalContacts = contacts.length
  const totalDeals = deals.length
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0)
  const wonDeals = deals.filter(d => d.stage === 'closed-won').length
  const lostDeals = deals.filter(d => d.stage === 'closed-lost').length
  const recentContacts = [...contacts].slice(-3).reverse()

  const stageData = [
    { stage: 'Prospecting', count: deals.filter(d => d.stage === 'prospecting').length },
    { stage: 'Proposal', count: deals.filter(d => d.stage === 'proposal').length },
    { stage: 'Negotiation', count: deals.filter(d => d.stage === 'negotiation').length },
    { stage: 'Closed Won', count: deals.filter(d => d.stage === 'closed-won').length },
    { stage: 'Closed Lost', count: deals.filter(d => d.stage === 'closed-lost').length },

  ]
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Total Contacts</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalContacts}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Total Deals</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalDeals}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{totalValue}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Won Deals</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{wonDeals}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
            <p className="text-sm text-gray-500">Lost Deals</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{lostDeals}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Deals by Stage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Contacts</h2>
        {recentContacts.map(c => (
          <div key={c.id} className="flex items-center justify-between py-3 border-b last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                {c.name[0]}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                <p className="text-gray-500 text-xs">{c.company}</p>
              </div>
            </div>
            <span className={`p-2 py-1 rounded-full text-xs font-semibold ${
              c.status === 'lead' ? 'bg-blue-100 text-blue-700' :
              c.status === 'customer' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard