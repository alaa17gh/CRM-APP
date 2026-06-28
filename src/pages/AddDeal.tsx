import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useCRM } from '../context/CRMContext'

function AddDeal () {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState<number>(0)
    const [stage, setStage] = useState<'prospecting' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'>('prospecting')
    const [contactId , setContactId ] = useState('')
    const navigate = useNavigate()
    const { contacts, addDeal } = useCRM()
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !contactId || value <= 0) {
            alert('Please fill in all fields.')
            return
        }
        const newDeal = {
            id:uuidv4(),
            title,
            value,
            stage,
            contactId,
            createdAt: new Date().toISOString().split('T')[0]
        }
        addDeal(newDeal)
        navigate('/deals')
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Deal</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text" 
                placeholder="Title"
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-4"
                />
                <input
                type="number" 
                placeholder="Value"
                value={value} 
                onChange={(e) => setValue(Number(e.target.value))}
                className="border rounded px-3 py-2 w-full mb-4"
                />
                <select
                value={stage}
                onChange={(e) => setStage (e.target.value as 'prospecting' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost')}
                className="border rounded px-3 py-2 w-full mb-4"
                >
                    <option value="prospecting">Prospecting</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed-won">Closed Won</option>
                    <option value="closed-lost">Closed Lost</option>
                </select>
                <select
                value={contactId}
                onChange={(e) => setContactId(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-4"
                >
                    <option value="">Select a contact</option>
                    {contacts.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Add Deal
                </button>
            </form>
        </div>
    )

}
export default AddDeal