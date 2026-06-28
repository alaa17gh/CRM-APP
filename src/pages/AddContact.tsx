import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useCRM } from '../context/CRMContext'

function AddContact () {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompany] = useState('')
    const [status, setStatus] = useState<'lead' | 'customer' | 'inactive'>('lead')
    const navigate = useNavigate()
    const { addContact } = useCRM()
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !email.trim() || !phone.trim() || !company.trim()) {
            alert('Please fill in all fields.')
        }
        const newContact = {
            id:uuidv4(),
            name,
            email,
            phone,
            company,
            status
        }
        addContact(newContact)
        navigate('/contacts')
    }

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Contact</h1>
            <form onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-4"
            />
            <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-4"
            />
            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-4"
            />
            <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border rounded px-3 py-2 w-full mb-4"
            />
            <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'lead' | 'customer' | 'inactive')}
            className="border rounded px-3 py-2 w-full mb-4"
            >
                <option value="lead">Lead</option>
                <option value="customer">Customer</option>
                <option value="inactive">Inactive</option>
            </select>
            <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Add Contact
            </button>
            </form>
        </div>
    )
}

export default AddContact