import { NavLink } from "react-router-dom";

function Navbar () {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex flex-wrap gap-6 items-center">
            <h1 className="text-xl font-bold mr-auto">CRM</h1>
            <NavLink 
            to="/"
            className={({ isActive }) =>
            isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-300'
                }
            >
                Dashboard
            </NavLink>
            <NavLink 
            to="/contacts"
            className={({ isActive }) =>
            isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-300'
                }
            >
                Contacts
            </NavLink>
            <NavLink
            to="/deals"
            className={({ isActive }) =>
            isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-300'
                }
            >
                Deals
            </NavLink>
            <NavLink
            to="/activities"
            className={({ isActive }) => 
            isActive ? 'text-blue-400 font-semibold' : 'hover:text-blue-300'
            }
            >
                Activities
            </NavLink>
        </nav>
    )
}
export default Navbar