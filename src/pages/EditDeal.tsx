import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCRM } from '../context/CRMContext'

function EditDeal() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { deals, contacts, updateDeal } = useCRM()

    const deal = deals.find(d => d.id ===id)

    const [title, setTitle] = useState(deal?.title ?? '')
    const [value, setValue] = useState<number>(deal?.value ?? 0)
    const [stage, setStage] = useState<'prospecting' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'>(deal?.stage ?? 'prospecting')
    const [contactId, setContactId] = useState(deal?.contactId ?? '')

    if (!deal) return <p className="p-6">Deal not found.</p>

    const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault()
       updateDeal({ id: deal.id, title, value, stage, contactId, createdAt: deal.createdAt })
       navigate('/deals')
    }

     return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Deal</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded px-3 py-2 w-full mb-4" />
        <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="border rounded px-3 py-2 w-full mb-4" />
        <select value={stage} onChange={(e) => setStage(e.target.value as 'prospecting' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost')} className="border rounded px-3 py-2 w-full mb-4">
          <option value="prospecting">Prospecting</option>
          <option value="proposal">Proposal</option>
          <option value="negotiation">Negotiation</option>
          <option value="closed-won">Closed Won</option>
          <option value="closed-lost">Closed Lost</option>
        </select>
        <select value={contactId} onChange={(e) => setContactId(e.target.value)} className="border rounded px-3 py-2 w-full mb-4">
          {contacts.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </div>
  )

}

export default EditDeal