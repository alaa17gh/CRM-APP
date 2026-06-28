import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useCRM } from '../context/CRMContext'

function AddActivity() {
    const navigate = useNavigate()
    const { contacts, addActivity } = useCRM()

    const [ type, setType] = useState<'call' | 'email' | 'meeting' | 'note'>('call')
    const [description, setDescription] = useState('')
    const [contactId, setContactId] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!description.trim() || !contactId || !date) {
            alert('Please fill in all fields.')
            return
        }
        addActivity({
            id: uuidv4(),
            type,
            description,
            contactId,
            date
        })
        navigate('/activities')
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Activity</h1>
            <form onSubmit={handleSubmit}>
                <select 
                value={type}
                onChange={(e) => setType(e.target.value as 'call' | 'email' | 'meeting' | 'note')}
                className="border rounded px-3 py-2 w-full mb-4"
                >
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="meeting">Meeting</option>
                    <option value="note">Note</option>
                </select>
                <input 
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-4"
                />
                <select
                value={contactId}
                onChange={(e) => setContactId(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-4"
                >
                    <option value="">Select a contact</option>
                    {contacts.map(c=> (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-4"
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Add Activity
                </button>
            </form>
        </div>
    )
}

export default AddActivity