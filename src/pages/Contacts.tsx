import { useCRM } from '../context/CRMContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'


function Contacts() {
  const [search, setSearch] = useState('')
  const { contacts, deleteContact } = useCRM()
  return (
    <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Contacts</h1>
            <Link
            to="/contacts/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
                + Add Contact
            </Link>
        </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b">
          <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          />
        </div>
        <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-900 text-white text-left">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.filter(c =>   
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            c.company.toLowerCase().includes(search.toLowerCase())
           ).length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12 text-gray-400">
                No contacts found. Add your first contact!
              </td>
            </tr>
          ) : (
            contacts.filter(c =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.email.toLowerCase().includes(search.toLowerCase()) ||
              c.company.toLowerCase().includes(search.toLowerCase())
            ).map((c) => (
              <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <Link to={`/contacts/${c.id}`} className="text-blue-600 hover:underline">
                    {c.name}
                  </Link>
                </td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.company}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      c.status === 'lead' ? 'bg-blue-100 text-blue-700' :
                      c.status === 'customer' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Link to={`/contacts/edit/${c.id}`} className="text-blue-500 hover:text-blue-700 text-sm">
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this contact?')) {
                          deleteContact(c.id)
                        }
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  )
}

export default Contacts
