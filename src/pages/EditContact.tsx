import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCRM } from '../context/CRMContext'

function EditContact() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { contacts, updateContact } = useCRM()
    const contact = contacts.find(c => c.id === id)

    
    const [name, setName] =useState(contact?.name ?? '')
    const [email, setEmail] = useState(contact?.email ?? '')
    const [phone, setPhone] = useState(contact?.phone ?? '')
    const [company, setCompany] = useState(contact?.company ?? '')
    const [status, setStatus] = useState<'lead' | 'customer' | 'inactive'>(contact?.status ?? 'lead')

    
    if (!contact) return <p className="p-6">Contact not found.</p>

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        updateContact({
            id: contact.id,
            name,
            email,
            phone,
            company,
            status
        })
        navigate('/contacts')
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border rounded px-3 py-2 w-full mb-4" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded px-3 py-2 w-full mb-4" />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded px-3 py-2 w-full mb-4" />
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="border rounded px-3 py-2 w-full mb-4" />
                <select value={status} onChange={(e) => setStatus(e.target.value as 'lead' | 'customer' | 'inactive')} className="border rounded px-3 py-2 w-full mb-4">
                    <option value="lead">Lead</option>
                    <option value="customer">Customer</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
    )
}
export default EditContact
