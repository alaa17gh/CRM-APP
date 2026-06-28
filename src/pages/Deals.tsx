import { useCRM } from '../context/CRMContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function Deals() {
  const [search, setSearch] = useState('')
  const { contacts, deals, deleteDeal } = useCRM()
  return (    
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Deals</h1>
            <Link
              to="/deals/add"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              + Add Deal
            </Link>
        </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search Deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-900 text-white text-left">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Value</th>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Created At</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.filter(d => {
            const contact = contacts.find(c => c.id === d.contactId)
            return (
              d.title.toLowerCase().includes(search.toLowerCase()) ||
              d.stage.toLowerCase().includes(search.toLowerCase()) ||
              contact?.name.toLowerCase().includes(search.toLowerCase())
            )
          }).length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12 text-gray-400">
                No deals found. Add your first deal!
              </td>
            </tr>
          ) : (
            deals.filter(d => {
              const contact = contacts.find(c => c.id === d.contactId)
              return (
                d.title.toLowerCase().includes(search.toLowerCase()) ||
                d.stage.toLowerCase().includes(search.toLowerCase()) ||
                contact?.name.toLowerCase().includes(search.toLowerCase())
              )
            }).map((d) => {
              const contact = contacts.find(c => c.id === d.contactId)
              return (
                <tr key={d.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link to={`/deals/${d.id}`} className="text-blue-600 hover:underline">
                      {d.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">${d.value.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      d.stage === 'closed-won' ? 'bg-green-100 text-green-700' :
                      d.stage === 'closed-lost' ? 'bg-red-100 text-red-700' :
                      d.stage === 'proposal' ? 'bg-blue-100 text-blue-700' :
                      d.stage === 'negotiation' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {d.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3">{contact?.name}</td>
                  <td className="px-4 py-3">{d.createdAt}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link to={`/deals/edit/${d.id}`} className="text-blue-500 hover:text-blue-700 text-sm">
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this deal?')) {
                          deleteDeal(d.id)
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
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

export default Deals
